package models

import "gorm.io/gorm"

type Comment struct {
	gorm.Model  `json:"-"`
	CID         uint   `json:"nid" gorm:"primary key,autoIncrement"`
	Heading     string `json:"heading" binding:"required"`
	Description string `json:"description" binding:"required"`
}
