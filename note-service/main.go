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

	/*router.POST("/signup", controllers.SignUp)
	router.POST("/login", controllers.LogIn)
	router.GET("/validate", controllers.Validate)
	*/

	protected := router.Group("/notes")
	protected.Use(middleware.Auth())
	{
		protected.GET("/", controllers.GetAllNotes)
		protected.POST("/", controllers.AddNote)
		protected.GET("/:nid", controllers.GetNoteByID)
		protected.PUT("/:nid", controllers.UpdateNote)
		protected.DELETE(":nid", controllers.DeleteNote)
	}

	protected1 := router.Group("/comments")
	protected1.Use(middleware.Auth())
	{
		protected1.GET("/", controllers.GetAllComments)
		protected1.POST("/", controllers.AddComment)
		protected1.GET("/:cid", controllers.GetCommentByID)
		protected1.PUT("/:cid", controllers.UpdateComment)
		protected1.DELETE(":cid", controllers.DeleteComment)
	}

	protected2 := router.Group("/status")
	protected2.Use(middleware.Auth())
	{
		protected2.GET("/", controllers.GetAllStatus)
		protected2.POST("/", controllers.AddStatus)
		protected2.GET("/:sid", controllers.GetStatusByID)
		protected2.PUT("/:sid", controllers.UpdateStatus)
		protected2.DELETE(":sid", controllers.DeleteStatus)
	}

	router.Run(":8081")
}
