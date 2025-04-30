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
		protected.GET("/", controllers.GetAllNotes)
		protected.POST("/", controllers.AddNote)
		protected.GET("/:nid", controllers.GetNoteByID)
		protected.PUT("/:nid", controllers.UpdateNote)
		protected.DELETE(":nid", controllers.DeleteNote)
	}

	router.Run(":8080")
}
