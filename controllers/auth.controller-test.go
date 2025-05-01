package controllers

import (
	"bytes"
	"encoding/json"
	"net/http"
	"net/http/httptest"
	"restapi/config"
	"restapi/models"
	"testing"

	"github.com/gin-gonic/gin"
	"github.com/stretchr/testify/assert"
)

func setupRouter() *gin.Engine {
	gin.SetMode(gin.TestMode)
	r := gin.Default()
	r.POST("/signup", SignUp)
	r.POST("/login", LogIn)
	return r
}

func TestSignUp(t *testing.T) {
	config.ConnectToDatabase()

	payload := map[string]string{
		"username": "testuser123",
		"password": "testpassword",
	}
	body, _ := json.Marshal(payload)

	req, _ := http.NewRequest("POST", "/signup", bytes.NewBuffer(body))
	req.Header.Set("Content-Type", "application/json")

	w := httptest.NewRecorder()
	router := setupRouter()
	router.ServeHTTP(w, req)

	assert.Equal(t, http.StatusOK, w.Code)
}

func TestLogin(t *testing.T) {
	config.ConnectToDatabase()

	config.DB.Create(&models.User{
		Username: "testuser123",
		Password: "$2a$10$7lZ9RHDz.GOPuQSK9U3kTuxzEKYdcn4iF7fJUBmH4KbFkPbY03Zla",
	})

	payload := map[string]string{
		"username": "testuser123",
		"password": "testpassword",
	}
	body, _ := json.Marshal(payload)

	req, _ := http.NewRequest("POST", "/login", bytes.NewBuffer(body))
	req.Header.Set("Content-Type", "application/json")

	w := httptest.NewRecorder()
	router := setupRouter()
	router.ServeHTTP(w, req)

	assert.Equal(t, http.StatusOK, w.Code)
	cookie := w.Header().Get("Set-Cookie")
	assert.Contains(t, cookie, "authorization=")
}
