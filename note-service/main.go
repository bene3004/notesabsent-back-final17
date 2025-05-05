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
		protected.GET("/", controllers.GetAllComments)
		protected.POST("/", controllers.AddComment)
		protected.GET("/:nid", controllers.GetCommentByID)
		protected.PUT("/:nid", controllers.UpdateComment)
		protected.DELETE(":nid", controllers.DeleteComment)
		protected.GET("/", controllers.GetAllStatus)
		protected.POST("/", controllers.AddStatus)
		protected.GET("/:nid", controllers.GetStatusByID)
		protected.PUT("/:nid", controllers.UpdateStatus)
		protected.DELETE(":nid", controllers.DeleteStatus)
	}

	router.Run(":8081")
}
