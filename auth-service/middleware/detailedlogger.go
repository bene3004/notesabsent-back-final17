package middleware

import (
	"bytes"
	"io"
	"io/ioutil"
	"log"
	"time"

	"github.com/gin-gonic/gin"
)

func DetailedLogger() gin.HandlerFunc {
	return func(c *gin.Context) {
		start := time.Now()

		// Request Body lesen und wiederherstellen
		var requestBody []byte
		if c.Request.Body != nil {
			requestBody, _ = ioutil.ReadAll(c.Request.Body)
			c.Request.Body = io.NopCloser(bytes.NewBuffer(requestBody)) // Body wieder einsetzen
		}

		// Response-Writer austauschen
		bodyWriter := &responseBodyWriter{body: bytes.NewBufferString(""), ResponseWriter: c.Writer}
		c.Writer = bodyWriter

		// Anfrage verarbeiten
		c.Next()

		// Loggen
		duration := time.Since(start)
		statusCode := c.Writer.Status()
		method := c.Request.Method
		url := c.Request.URL.String()
		clientIP := c.ClientIP()

		log.Printf("\n[REQUEST] %s %s | IP: %s | Duration: %v\nHeaders: %v\nQuery: %v\nBody: %s",
			method, url, clientIP, duration, c.Request.Header, c.Request.URL.Query(), string(requestBody),
		)

		log.Printf("[RESPONSE] %s %s | Status: %d | Duration: %v\nBody: %s\n",
			method, url, statusCode, duration, bodyWriter.body.String(),
		)
	}
}

type responseBodyWriter struct {
	gin.ResponseWriter
	body *bytes.Buffer
}

func (r *responseBodyWriter) Write(b []byte) (int, error) {
	r.body.Write(b) // speichert Antwort-Body
	return r.ResponseWriter.Write(b)
}
