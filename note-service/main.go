package main

import (
	"github.com/gin-gonic/gin"
	"restapi/config"
	"restapi/controllers"
)

func main() {
	config.ConnectToDatabase()

	router := gin.Default()

	router.GET("/notes", controllers.GetAllNotes)
	router.POST("/notes", controllers.AddNote)
	router.GET("/notes/:id", controllers.GetNoteByID)
	router.PUT("/notes/:id", controllers.UpdateNote)
	router.DELETE("/notes/:id", controllers.DeleteNote)

	router.Run(":8081")
}
