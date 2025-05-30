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
	router.GET("/validate", middleware.Auth, controllers.Validate)

	router.Run(":8080")
}
