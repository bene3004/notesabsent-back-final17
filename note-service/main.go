package main

import (
	"restapi/config"
	"restapi/controllers"
	"restapi/middleware1"

	"github.com/gin-gonic/gin"
)

func main() {
	config.ConnectToDatabase()

	router := gin.Default()

	protected := router.Group("/")
	protected.Use(middleware1.Auth1)
	{
		protected.GET("/notes", controllers.GetAllNotes)
		protected.POST("/notes", controllers.AddNote)
		protected.GET("/notes/:id", controllers.GetNoteByID)
		protected.PUT("/notes/:id", controllers.UpdateNote)
		protected.DELETE("/notes/:id", controllers.DeleteNote)
		protected.GET("/comments", controllers.GetAllComments)
		protected.POST("/comments", controllers.AddComment)
		protected.GET("/comments/:id", controllers.GetCommentByID)
		protected.PUT("/comments/:id", controllers.UpdateComment)
		protected.DELETE("/comments/:id", controllers.DeleteComment)
		protected.GET("/status", controllers.GetAllStatus)
		protected.POST("/status", controllers.AddStatus)
		protected.GET("/status/:id", controllers.GetStatusByID)
		protected.PUT("/status/:id", controllers.UpdateStatus)
		protected.DELETE("/status/:id", controllers.DeleteStatus)
	}

	router.Run(":8081")
}
