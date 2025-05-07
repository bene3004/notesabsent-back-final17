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
	router.GET("/comments", controllers.GetAllComments)
	router.POST("/comments", controllers.AddComment)
	router.GET("/comments/:id", controllers.GetCommentByID)
	router.PUT("/comments/:id", controllers.UpdateComment)
	router.DELETE("/comments/:id", controllers.DeleteComment)
	router.GET("/status", controllers.GetAllStatus)
	router.POST("/status", controllers.AddStatus)
	router.GET("/status/:id", controllers.GetStatusByID)
	router.PUT("/status/:id", controllers.UpdateStatus)
	router.DELETE("/status/:id", controllers.DeleteStatus)

	/*
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
		}*/

	router.Run(":8081")
}
