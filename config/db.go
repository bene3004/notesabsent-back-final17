package config

import (
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
	"log"
)

var DB *gorm.DB

func ConnectToDatabase() {
	dsn := "host=localhost user=postgres password=postgres dbname=postgres port=1717 sslmode=disable"
	database, err := gorm.Open(postgres.Open(dsn), &gorm.Config{})
	if err != nil {
		log.Fatal("failed to connect to database:", err)
	}

	/* database.AutoMigrate(&models.Note{}, &models.User{}) */

	DB = database
}
