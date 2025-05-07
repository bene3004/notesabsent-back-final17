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
	protected.Use(middleware.Auth())
	{
		protected.GET("/", controllers.GetAllNotes)
		protected.POST("/", controllers.AddNote)
		protected.GET("/:id", controllers.GetNoteByID)
		protected.PUT("/:id", controllers.UpdateNote)
		protected.DELETE(":id", controllers.DeleteNote)
	}

	protected1 := router.Group("/comments")
	protected1.Use(middleware.Auth())
	{
		protected1.GET("/", controllers.GetAllComments)
		protected1.POST("/", controllers.AddComment)
		protected1.GET("/:id", controllers.GetCommentByID)
		protected1.PUT("/:id", controllers.UpdateComment)
		protected1.DELETE(":id", controllers.DeleteComment)
	}

	protected2 := router.Group("/status")
	protected2.Use(middleware.Auth())
	{
		protected2.GET("/", controllers.GetAllStatus)
		protected2.POST("/", controllers.AddStatus)
		protected2.GET("/:id", controllers.GetStatusByID)
		protected2.PUT("/:id", controllers.UpdateStatus)
		protected2.DELETE(":id", controllers.DeleteStatus)
	}

	router.Run(":8081")
}
