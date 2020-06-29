package server

import (
	"net/http"

	"github.com/dash-app/dash-home/internal/logger"
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

type httpServer struct {
}

// NewHTTPServer - Start HTTP Server
func NewHTTPServer() *gin.Engine {
	h := httpServer{}

	r := gin.Default()
	r.Use(cors.Default())
	r.Use(logger.SetLogger())

	r.GET("/healthz", h.getHealthz)

	return r
}

func (h *httpServer) getHealthz(c *gin.Context) {
	c.String(http.StatusOK, "OK")
}
