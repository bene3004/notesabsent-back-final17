package middleware1

import (
	"net/http"
	"os"

	"github.com/gin-gonic/gin"
	"github.com/go-resty/resty/v2"
)

func Auth1(c *gin.Context) {
	cookie, err := c.Cookie("authorization")
	if err != nil {
		c.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{"error": "unauthorized"})
		return
	}

	authURL := os.Getenv("AUTH_SERVICE_URL")

	client := resty.New()
	resp, err := client.R().
		SetHeader("Cookie", "authorization="+cookie).
		Get(authURL)

	if err != nil || resp.StatusCode() != http.StatusOK {
		c.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{"error": "unauthorized"})
		return
	}

	c.Next()
}
