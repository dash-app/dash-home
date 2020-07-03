package server

import (
	"net/http"

	"github.com/dash-app/dash-home/internal/logger"
	"github.com/dash-app/dash-home/pkg/storage"
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

type httpServer struct {
	storage *storage.Storage
}

// NewHTTPServer - Start HTTP Server
// @title Dash-Home API
// @version 1.0
// @name Dash-Home
// @license.name MIT License
// @license.url https://opensource.org/licenses/MIT
func NewHTTPServer(storage *storage.Storage) *gin.Engine {
	h := httpServer{
		storage: storage,
	}

	r := gin.Default()
	r.Use(cors.Default())
	r.Use(logger.SetLogger())

	r.GET("/healthz", h.getHealthz)

	r.GET("/api/v1/room", h.getRoom)
	r.GET("/api/v1/agent", h.getAgent)

	return r
}

// Health Check
// @Summary Check API Response for Health Check
// @Router /healthz [get]
// @Success 200 {string} OK
func (h *httpServer) getHealthz(c *gin.Context) {
	c.String(http.StatusOK, "OK")
}
