package models

import "gorm.io/gorm"

type Status struct {
	gorm.Model  `json:"-"`
	SID         uint   `json:"nid" gorm:"primary key,autoIncrement"`
	Heading     string `json:"heading" binding:"required"`
	Description string `json:"description" binding:"required"`
}
