package controllers

import (
	"fmt"
	"net/http"
	"os"
	"restapi/config"
	"restapi/models"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/golang-jwt/jwt/v5"
	"golang.org/x/crypto/bcrypt"
)

func LogIn(c *gin.Context) {
	// get the login info from the request body
	var loginInfo struct {
		Username string `json:"username" binding:"required"`
		Password string `json:"password" binding:"required"`
	}
	if err := c.ShouldBindJSON(&loginInfo); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "invalid infos"})
		return
	}

	// look up requested user
	var user models.User
	config.DB.First(&user, "username = ?", loginInfo.Username)

	if user.UID == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "invalid username or password"})
		return
	}

	// compare sent in password with saved user hashed password
	err := bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(loginInfo.Password))

	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "invalid username or password"})
		return
	}

	// generate jwt token
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
		"uid": user.UID,
		"exp": time.Now().Add(time.Hour * 24).Unix(),
	})

	// sign and get the complete encoded token as a string using the secret
	tokenString, err := token.SignedString([]byte(os.Getenv("JWT_SECRET")))

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "failed to generate token"})
		return
	}

	// send it back
	c.SetSameSite(http.SameSiteLaxMode)
	c.SetCookie("authorization", tokenString, 3600*24, "/", "", true, true)
	c.JSON(http.StatusOK, gin.H{})
}
func SignUp(c *gin.Context) {
	// get the signup info from the request body
	var signupInfo struct {
		Username string `json:"username" binding:"required"`
		Password string `json:"password" binding:"required"`
	}
	if err := c.ShouldBindJSON(&signupInfo); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "invalid infos"})
		return
	}

	// hash the password
	hash, err := bcrypt.GenerateFromPassword([]byte(signupInfo.Password), bcrypt.DefaultCost)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "failed to hash password"})
		return
	}

	// create the user
	user := models.User{Username: signupInfo.Username, Password: string(hash)}
	result := config.DB.Create(&user)

	if result.Error != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "failed to create user"})
		return
	}

	// response
	c.JSON(http.StatusOK, gin.H{"message": "signup successful"})
}
func Validate(c *gin.Context) {
	user, _ := c.Get("user")
	c.JSON(http.StatusOK, gin.H{
		"message": user,
	})
}
func RefreshToken(c *gin.Context) {
	// Get the token from cookie
	tokenString, err := c.Cookie("authorization")
	if err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "unauthorized"})
		return
	}

	// Parse and validate the token
	token, err := jwt.Parse(tokenString, func(token *jwt.Token) (interface{}, error) {
		if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
			return nil, fmt.Errorf("unexpected signing method")
		}
		return []byte("secret"), nil
	})

	if err != nil || !token.Valid {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "unauthorized"})
		return
	}

	claims, ok := token.Claims.(jwt.MapClaims)
	if !ok {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "unauthorized"})
		return
	}

	// Get user UID from token
	uidFloat, ok := claims["uid"].(float64)
	if !ok {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "unauthorized"})
		return
	}
	uid := uint(uidFloat)

	// Lookup the user in DB
	var user models.User
	if err := config.DB.First(&user, uid).Error; err != nil || user.UID == 0 {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "unauthorized"})
		return
	}

	// Create new token
	newToken := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
		"uid": user.UID,
		"exp": time.Now().Add(24 * time.Hour).Unix(),
	})

	newTokenString, err := newToken.SignedString([]byte("secret"))
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "failed to generate token"})
		return
	}

	// Set new cookie
	c.SetSameSite(http.SameSiteLaxMode)
	c.SetCookie("authorization", newTokenString, 3600*24, "/", "", false, true)
	c.JSON(http.StatusOK, gin.H{"message": "token refreshed"})
}
