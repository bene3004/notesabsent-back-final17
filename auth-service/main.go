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

	router.Use(middleware.DetailedLogger())

	router.POST("/signup", controllers.SignUp)
	router.POST("/login", controllers.LogIn)
	router.GET("/refresh-token", controllers.RefreshToken)
	router.GET("/validate", controllers.Validate)

	/*protected := router.Group("/notes")
	protected.Use(middleware.Auth())
	{
		protected.GET("/", controllers.GetAllNotes)
		protected.POST("/", controllers.AddNote)
		protected.GET("/:nid", controllers.GetNoteByID)
		protected.PUT("/:nid", controllers.UpdateNote)
		protected.DELETE(":nid", controllers.DeleteNote)
	}*/

	router.Run(":8080")
}
