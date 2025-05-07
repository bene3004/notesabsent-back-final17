package controllers

import (
	"net/http"
	"restapi/config"
	"restapi/models"
	"strconv"

	"github.com/gin-gonic/gin"
)

func GetAllStatus(c *gin.Context) {
	page := c.DefaultQuery("page", "1")
	limit := c.DefaultQuery("limit", "5")

	pageInt, _ := strconv.Atoi(page)
	limitInt, _ := strconv.Atoi(limit)

	offset := (pageInt - 1) * limitInt

	var status []models.Status
	var total int64

	config.DB.Model(&models.Status{}).Count(&total)

	result := config.DB.Model(&models.Status{}).
		Select("id, heading, description").
		Limit(limitInt).
		Offset(offset).
		Find(&status)
	if result.Error != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "failed to fetch status"})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"total": total,
		"page":  pageInt,
		"limit": limitInt,
		"data":  status,
	})
}

func GetStatusByID(c *gin.Context) {
	id := c.Param("id")
	var status models.Status

	if err := config.DB.First(&status, "id = ?", id).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "status not found"})
		return
	}

	c.JSON(http.StatusOK, status)
}

func AddStatus(c *gin.Context) {
	var status models.Status
	if err := c.ShouldBindJSON(&status); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "invalid input"})
		return
	}

	if err := config.DB.Create(&status).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "failed to add status"})
		return
	}

	c.JSON(http.StatusCreated, status)
}

func UpdateStatus(c *gin.Context) {
	id := c.Param("id")
	var status models.Status

	if err := config.DB.First(&status, "id = ?", id).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "status not found"})
		return
	}

	var input models.Status
	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "invalid input"})
		return
	}

	status.Heading = input.Heading
	status.Description = input.Description

	if err := config.DB.Save(&status).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "failed to update status"})
		return
	}

	c.JSON(http.StatusOK, status)
}

func DeleteStatus(c *gin.Context) {
	id := c.Param("id")
	var status models.Status

	if err := config.DB.First(&status, "id = ?", id).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "status not found"})
		return
	}

	if err := config.DB.Delete(&status).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "failed to delete status"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "status deleted"})
}
