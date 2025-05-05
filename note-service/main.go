package main

import (
	"restapi/config"
	"restapi/controllers"

	"github.com/gin-gonic/gin"
)

func main() {
	config.ConnectToDatabase()

	router := gin.Default()

	/*router.POST("/signup", controllers.SignUp)
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
	*/

	router.GET("/notes", controllers.GetAllNotes)
	router.POST("/notes", controllers.AddNote)
	router.GET("/notes/:nid", controllers.GetNoteByID)
	router.PUT("/notes/:nid", controllers.UpdateNote)
	router.DELETE("/notes/:nid", controllers.DeleteNote)

	router.Run(":8081")
}
