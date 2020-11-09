package server

import (
	"net/http"

	"github.com/dash-app/dash-home/internal/logger"
	"github.com/dash-app/dash-home/pkg/agent"
	"github.com/dash-app/dash-home/pkg/controller"
	"github.com/dash-app/dash-home/pkg/room"
	"github.com/gin-contrib/cors"
	"github.com/gin-contrib/static"
	"github.com/gin-gonic/gin"
	"github.com/rakyll/statik/fs"
	"github.com/sirupsen/logrus"
)

// Subset - HTTP Subset
type Subset struct {
	Agent      agent.Agent
	Room       *room.RoomService
	Controller *controller.Controller
}

type httpServer struct {
	agent      agent.Agent
	room       *room.RoomService
	controller *controller.Controller
}

type statikFileSystem struct {
	fs http.FileSystem
}

func (b *statikFileSystem) Open(name string) (http.File, error) {
	return b.fs.Open(name)
}

func (b *statikFileSystem) Exists(prefix string, filepath string) bool {
	if _, err := b.fs.Open(filepath); err != nil {
		return false
	}
	return true
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
	apiGroup := r.Group("/api/v1")
	apiGroup.GET("agent", h.getAgent)
	apiGroup.POST("agent", h.postAgent)
	apiGroup.GET("agent/sensors", h.getAgentSensors)

	// Room
	apiGroup.GET("room", h.getRoom)
	apiGroup.POST("room", h.postRoom)

	// Controllers
	apiGroup.GET("controllers", h.getControllers)
	apiGroup.POST("controllers", h.postControllers)

	// Controllers -> ByID (individual)
	apiGroup.GET("controllers/:id", h.getControllerByID)
	apiGroup.PATCH("controllers/:id", h.patchControllerByID)
	apiGroup.DELETE("controllers/:id", h.deleteControllerByID)

	// Controllers -> Appliances...
	apiGroup.POST("controllers/:id/switchbot", h.postSwitchBotByID)
	apiGroup.POST("controllers/:id/aircon", h.postAirconByID)

	// Controller template
	apiGroup.GET("controllers/:id/template", h.getControllerTemplateByID)

	// Remotes
	apiGroup.GET("remotes", h.getRemotes)

	// Handle Frontend
	r.Use(static.Serve("/", static.LocalFile("./public", true)))
	statikFS, err := fs.New()
	if err != nil {
		logrus.WithError(err).Fatal("[Static]")
	}
	r.Use(static.Serve("/", &statikFileSystem{
		statikFS,
	}))

	r.NoRoute(static.Serve("/", &statikFileSystem{
		statikFS,
	}))

	r.NoRoute(func(c *gin.Context) {
		c.FileFromFS("/", statikFS)
	})

	return r
}

// Health Check
// @Summary Check API Response for Health Check
// @Router /healthz [get]
// @Success 200 {string} OK
func (h *httpServer) getHealthz(c *gin.Context) {
	c.String(http.StatusOK, "OK")
}
