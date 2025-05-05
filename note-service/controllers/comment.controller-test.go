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

func setupCommentRouter() *gin.Engine {
	gin.SetMode(gin.TestMode)
	r := gin.Default()
	r.GET("/comments", GetAllComments)
	r.POST("/comments", AddComment)
	return r
}

func TestAddComment(t *testing.T) {
	config.ConnectToDatabase()

	comment := models.Comment{
		Heading:     "Test Comment",
		Description: "This is a test comment",
	}
	body, _ := json.Marshal(comment)

	req, _ := http.NewRequest("POST", "/comments", bytes.NewBuffer(body))
	req.Header.Set("Content-Type", "application/json")

	w := httptest.NewRecorder()
	router := setupCommentRouter()
	router.ServeHTTP(w, req)

	assert.Equal(t, http.StatusCreated, w.Code)
	var response models.Comment
	err := json.Unmarshal(w.Body.Bytes(), &response)
	assert.NoError(t, err)
	assert.Equal(t, comment.Heading, response.Heading)
}

func TestGetAllComments(t *testing.T) {
	config.ConnectToDatabase()

	req, _ := http.NewRequest("GET", "/comments?page=1&limit=2", nil)
	w := httptest.NewRecorder()

	router := setupCommentRouter()
	router.ServeHTTP(w, req)

	assert.Equal(t, http.StatusOK, w.Code)
}
