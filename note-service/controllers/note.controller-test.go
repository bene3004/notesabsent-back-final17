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

func setupNoteRouter() *gin.Engine {
	gin.SetMode(gin.TestMode)
	r := gin.Default()
	r.GET("/notes", GetAllNotes)
	r.POST("/notes", AddNote)
	return r
}

func TestAddNote(t *testing.T) {
	config.ConnectToDatabase()

	note := models.Note{
		Heading:     "Test Note",
		Description: "This is a test note",
	}
	body, _ := json.Marshal(note)

	req, _ := http.NewRequest("POST", "/notes", bytes.NewBuffer(body))
	req.Header.Set("Content-Type", "application/json")

	w := httptest.NewRecorder()
	router := setupNoteRouter()
	router.ServeHTTP(w, req)

	assert.Equal(t, http.StatusCreated, w.Code)
	var response models.Note
	err := json.Unmarshal(w.Body.Bytes(), &response)
	assert.NoError(t, err)
	assert.Equal(t, note.Heading, response.Heading)
}

func TestGetAllNotes(t *testing.T) {
	config.ConnectToDatabase()

	req, _ := http.NewRequest("GET", "/notes?page=1&limit=2", nil)
	w := httptest.NewRecorder()

	router := setupNoteRouter()
	router.ServeHTTP(w, req)

	assert.Equal(t, http.StatusOK, w.Code)
}
