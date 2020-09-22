package server

import (
	"net/http"

	"github.com/dash-app/dash-home/internal/logger"
	"github.com/dash-app/dash-home/pkg/agent"
	"github.com/dash-app/dash-home/pkg/controller"
	"github.com/dash-app/dash-home/pkg/room"
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

// Subset - HTTP Subset
type Subset struct {
	Agent      agent.Agent
	Room       room.Room
	Controller *controller.Controller
}

type httpServer struct {
	agent      agent.Agent
	room       room.Room
	controller *controller.Controller
}

// NewHTTPServer - Start HTTP Server
// @title Dash-Home API
// @version 1.0
// @name Dash-Home
// @license.name MIT License
// @license.url https://opensource.org/licenses/MIT
func NewHTTPServer(subset *Subset) *gin.Engine {
	h := httpServer{
		agent:      subset.Agent,
		room:       subset.Room,
		controller: subset.Controller,
	}

	r := gin.Default()
	r.Use(cors.Default())
	r.Use(logger.SetLogger())

	r.GET("/healthz", h.getHealthz)

	// Agent
	r.GET("/api/v1/agent", h.getAgent)
	r.POST("/api/v1/agent", h.postAgent)
	r.GET("/api/v1/agent/sensors", h.getAgentSensors)

	// Room
	r.GET("/api/v1/room", h.getRoom)
	r.POST("/api/v1/room", h.postRoom)

	// Controllers
	r.GET("/api/v1/controllers", h.getControllers)
	r.POST("/api/v1/controllers", h.postControllers)

	// Controllers -> ByID (individual)
	r.GET("/api/v1/controllers/:id", h.getControllerByID)
	r.POST("/api/v1/controllers/:id", h.postControllerByID)

	r.POST("/api/v1/controllers/:id/aircon", h.postAirconByID)

	r.GET("/api/v1/controllers/:id/template", h.getControllerTemplateByID)
	return r
}

// Health Check
// @Summary Check API Response for Health Check
// @Router /healthz [get]
// @Success 200 {string} OK
func (h *httpServer) getHealthz(c *gin.Context) {
	c.String(http.StatusOK, "OK")
}
