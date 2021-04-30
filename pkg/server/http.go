package server

import (
	"net/http"
	"os"

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
	Agent      *agent.AgentService
	Room       *room.RoomService
	Controller *controller.Controller
}

type httpServer struct {
	agent      *agent.AgentService
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

	if len(os.Getenv("DEBUG")) == 0 {
		gin.SetMode(gin.ReleaseMode)
	}

	r := gin.New()
	r.Use(cors.Default())
	r.Use(logger.SetLogger())

	r.GET("/healthz", h.getHealthz)

	// Agent
	apiGroup := r.Group("/api/v1")
	apiGroup.GET("agents", h.getAgents)
	apiGroup.POST("agents", h.postAgent)
	apiGroup.GET("agents/:id", h.getAgentByID)
	apiGroup.PATCH("agents/:id", h.patchAgentByID)

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
	apiGroup.POST("controllers/:id/light", h.postLightByID)

	// Controller template
	apiGroup.GET("controllers/:id/template", h.getControllerTemplateByID)

	// Remotes
	apiGroup.GET("remotes", h.getRemotes)

	// Handle Frontend
	statikFS, err := fs.New()
	if err != nil {
		logrus.WithError(err).Error("[Static]")
	}
	if statikFS == nil {
		logrus.Warn("[Static] Static Serving disabled.")
	} else {
		r.Use(static.Serve("/", &statikFileSystem{
			statikFS,
		}))

		r.NoRoute(static.Serve("/", &statikFileSystem{
			statikFS,
		}))

		r.NoRoute(func(c *gin.Context) {
			c.FileFromFS("/", statikFS)
		})
	}

	return r
}

// Health Check
// @Summary Check API Response for Health Check
// @Router /healthz [get]
// @Success 200 {string} OK
func (h *httpServer) getHealthz(c *gin.Context) {
	c.String(http.StatusOK, "OK")
}
