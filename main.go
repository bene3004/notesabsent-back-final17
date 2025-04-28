package main

import (
	"github.com/gin-gonic/gin"
	"restapi/config"
	"restapi/controllers"
	"restapi/middleware"
)

func main() {
	config.ConnectToDatabase()

	router := gin.Default()

	router.POST("/signup", controllers.SignUp)
	router.POST("/login", controllers.LogIn)
	router.GET("/validate", controllers.Validate)

	protected := router.Group("/notes")
	protected.Use(middleware.Auth())
	{
		protected.GET("/notes", controllers.GetAllNotes)
		protected.POST("/notes", controllers.AddNote)
		protected.GET("/notes/:nid", controllers.GetNoteByID)
		protected.PUT("/notes/:nid", controllers.UpdateNote)
		protected.DELETE("/notes/:nid", controllers.DeleteNote)
	}

	router.Run(":8080")
}
