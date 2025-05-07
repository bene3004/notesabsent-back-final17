package models

import "gorm.io/gorm"

type Note struct {
	gorm.Model
	Heading     string `json:"heading" binding:"required"`
	Description string `json:"description" binding:"required"`
}
