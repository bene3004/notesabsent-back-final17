package controllers

import (
	"net/http"
	"restapi/config"
	"restapi/models"
	"strconv"

	"github.com/gin-gonic/gin"
)

func GetAllNotes(c *gin.Context) {
	page := c.DefaultQuery("page", "1")
	limit := c.DefaultQuery("limit", "5")

	pageInt, _ := strconv.Atoi(page)
	limitInt, _ := strconv.Atoi(limit)

	offset := (pageInt - 1) * limitInt

	var notes []models.Note
	var total int64

	config.DB.Model(&models.Note{}).Count(&total)

	result := config.DB.Model(&models.Note{}).
		Select("nid, heading, description").
		Limit(limitInt).
		Offset(offset).
		Find(&notes)
	if result.Error != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "failed to fetch notes"})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"total": total,
		"page":  pageInt,
		"limit": limitInt,
		"data":  notes,
	})
}

func GetNoteByID(c *gin.Context) {
	nid := c.Param("nid")
	var note models.Note

	if err := config.DB.First(&note, "nid = ?", nid).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "note not found"})
		return
	}

	c.JSON(http.StatusOK, note)
}

func AddNote(c *gin.Context) {
	var note models.Note
	if err := c.ShouldBindJSON(&note); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "invalid input"})
		return
	}

	if err := config.DB.Create(&note).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "failed to add note"})
		return
	}

	c.JSON(http.StatusCreated, note)
}

func UpdateNote(c *gin.Context) {
	nid := c.Param("nid")
	var note models.Note

	if err := config.DB.First(&note, "nid = ?", nid).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "note not found"})
		return
	}

	var input models.Note
	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "invalid input"})
		return
	}

	note.Heading = input.Heading
	note.Description = input.Description

	if err := config.DB.Save(&note).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "failed to update note"})
		return
	}

	c.JSON(http.StatusOK, note)
}

func DeleteNote(c *gin.Context) {
	nid := c.Param("nid")
	var note models.Note

	if err := config.DB.First(&note, "nid = ?", nid).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "note not found"})
		return
	}

	if err := config.DB.Delete(&note).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "failed to delete note"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "note deleted"})
}
