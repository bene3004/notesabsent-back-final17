package models

import "gorm.io/gorm"

type Note struct {
	gorm.Model  `json:"-"`
	NID         uint   `json:"nid" gorm:"primary key,autoIncrement"`
	Heading     string `json:"heading" binding:"required"`
	Description string `json:"description" binding:"required"`
}
