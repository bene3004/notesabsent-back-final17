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

func setupStatusRouter() *gin.Engine {
	gin.SetMode(gin.TestMode)
	r := gin.Default()
	r.GET("/status", GetAllStatus)
	r.POST("/status", AddStatus)
	return r
}

func TestAddStatus(t *testing.T) {
	config.ConnectToDatabase()

	status := models.Status{
		Heading:     "Test Status",
		Description: "This is a test status",
	}
	body, _ := json.Marshal(status)

	req, _ := http.NewRequest("POST", "/status", bytes.NewBuffer(body))
	req.Header.Set("Content-Type", "application/json")

	w := httptest.NewRecorder()
	router := setupStatusRouter()
	router.ServeHTTP(w, req)

	assert.Equal(t, http.StatusCreated, w.Code)
	var response models.Status
	err := json.Unmarshal(w.Body.Bytes(), &response)
	assert.NoError(t, err)
	assert.Equal(t, status.Heading, response.Heading)
}

func TestGetAllStatus(t *testing.T) {
	config.ConnectToDatabase()

	req, _ := http.NewRequest("GET", "/status?page=1&limit=2", nil)
	w := httptest.NewRecorder()

	router := setupStatusRouter()
	router.ServeHTTP(w, req)

	assert.Equal(t, http.StatusOK, w.Code)
}
