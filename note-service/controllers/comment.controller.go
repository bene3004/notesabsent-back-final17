package controllers

import (
	"net/http"
	"restapi/config"
	"restapi/models"
	"strconv"

	"github.com/gin-gonic/gin"
)

func GetAllComments(c *gin.Context) {
	page := c.DefaultQuery("page", "1")
	limit := c.DefaultQuery("limit", "5")

	pageInt, _ := strconv.Atoi(page)
	limitInt, _ := strconv.Atoi(limit)

	offset := (pageInt - 1) * limitInt

	var comments []models.Comment
	var total int64

	config.DB.Model(&models.Comment{}).Count(&total)

	result := config.DB.Model(&models.Comment{}).
		Select("cid, heading, description").
		Limit(limitInt).
		Offset(offset).
		Find(&comments)
	if result.Error != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "failed to fetch comments"})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"total": total,
		"page":  pageInt,
		"limit": limitInt,
		"data":  comments,
	})
}

func GetCommentByID(c *gin.Context) {
	cid := c.Param("cid")
	var comment models.Comment

	if err := config.DB.First(&comment, "cid = ?", cid).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "comment not found"})
		return
	}

	c.JSON(http.StatusOK, comment)
}

func AddComment(c *gin.Context) {
	var comment models.Comment
	if err := c.ShouldBindJSON(&comment); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "invalid input"})
		return
	}

	if err := config.DB.Create(&comment).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "failed to add comment"})
		return
	}

	c.JSON(http.StatusCreated, comment)
}

func UpdateComment(c *gin.Context) {
	cid := c.Param("cid")
	var comment models.Comment

	if err := config.DB.First(&comment, "cid = ?", cid).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "comment not found"})
		return
	}

	var input models.Comment
	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "invalid input"})
		return
	}

	comment.Heading = input.Heading
	comment.Description = input.Description

	if err := config.DB.Save(&comment).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "failed to update comment"})
		return
	}

	c.JSON(http.StatusOK, comment)
}

func DeleteComment(c *gin.Context) {
	cid := c.Param("cid")
	var comment models.Comment

	if err := config.DB.First(&comment, "cid = ?", cid).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "comment not found"})
		return
	}

	if err := config.DB.Delete(&comment).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "failed to delete comment"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "comment deleted"})
}
