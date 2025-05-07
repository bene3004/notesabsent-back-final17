package main

import (
	"restapi/config"
	"restapi/controllers"
	"restapi/middleware"

	"github.com/gin-gonic/gin"
)

func main() {
	config.ConnectToDatabase()

	router := gin.Default()

	protected := router.Group("/notes")
	protected.Use(middleware.Auth)
	{
		protected.GET("/", controllers.GetAllNotes)
		protected.POST("/", controllers.AddNote)
		protected.GET("/:id", controllers.GetNoteByID)
		protected.PUT("/:id", controllers.UpdateNote)
		protected.DELETE(":id", controllers.DeleteNote)
		protected.GET("/", controllers.GetAllComments)
		protected.POST("/", controllers.AddComment)
		protected.GET("/:id", controllers.GetCommentByID)
		protected.PUT("/:id", controllers.UpdateComment)
		protected.DELETE(":id", controllers.DeleteComment)
		protected.GET("/", controllers.GetAllStatus)
		protected.POST("/", controllers.AddStatus)
		protected.GET("/:id", controllers.GetStatusByID)
		protected.PUT("/:id", controllers.UpdateStatus)
		protected.DELETE(":id", controllers.DeleteStatus)
	}

	router.Run(":8081")
}
