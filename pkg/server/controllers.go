package server

import (
	"errors"
	"net/http"

	"github.com/dash-app/dash-home/pkg/agent"
	"github.com/dash-app/dash-home/pkg/controller"
	"github.com/dash-app/dash-home/pkg/remote"
	"github.com/dash-app/remote-go/appliances"
	"github.com/gin-gonic/gin"
	"github.com/k0kubun/pp"
	"github.com/sirupsen/logrus"
)

// SetControllerRequest - Create / Update controller request
type SetControllerRequest struct {
	// Name - ex. Bedroom Airconditioner
	Name string `json:"name" validate:"required" example:"Bedroom Airconditioner"`

	// AgentID - Agent ID (optional)
	AgentID string `json:"agent_id,omitempty" example:"<AGENT_ID>"`

	// Kind - AIRCON, LIGHT, SWITCHBOT...
	Kind string `json:"kind" validate:"required" example:"AIRCON"`

	// Type - type of controller (how to use?) / ex. REMOTE, SWITCHBOT...
	Type string `json:"type" validate:"required" example:"REMOTE"`

	// Remote - Remote Controller settings (required when type is REMOTE)
	Remote *RemoteController `json:"remote,omitempty"`

	// SwitchBot - SwitchBot settings (required when type is SWITCHBOT)
	SwitchBot *SwitchBotController `json:"switchbot,omitempty"`
}

// RemoteController - as IR remote controller
type RemoteController struct {
	Vendor string `json:"vendor" validate:"required" example:"daikin"`
	Model  string `json:"model" validate:"required" example:"daikin01"`
}

// SwitchBotController - as SwitchBot controller
type SwitchBotController struct {
	Mac  string `json:"mac" validate:"required" example:"FF:FF:FF:FF:FF:FF"`
	Type string `json:"type" validate:"required" example:"TOGGLE"`
}

// PostSwitchBotRequest - post switchbot payload...
type PostSwitchBotRequest struct {
	Command string `json:"command" validate:"required" example:"ON"`
}

// Get Controllers
// @Summary Get controllers
// @Router /api/v1/controllers [get]
// @tags controller
// @Success 200 {object} []controller.Entry
// @Produce json
func (h *httpServer) getControllers(c *gin.Context) {
	c.JSON(http.StatusOK, h.controller.Storage.GetAll())
}

// Create Controller
// @Summary Add new controller
// @Router /api/v1/controllers [post]
// @tags controller
// @Param entry body SetControllerRequest true "Add new controller"
// @Success 200 {object} controller.Entry
// @Accept json
// @Produce json
func (h *httpServer) postControllers(c *gin.Context) {
	var req *SetControllerRequest

	if err := c.BindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// Set Options
	var opts controller.Options

	// AgentID
	if req.AgentID != "" {
		opts.AgentID = req.AgentID
	}

	// Remote/Switchbot
	if req.Type == "REMOTE" {

		//Remoteにデータが登録されていない場合エラーを返す処理(nil処理)
		if req.Remote == nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": errors.New("remote options must be satisfied").Error()})
			return
		}
		opts.Remote = &remote.Remote{
			Vendor: req.Remote.Vendor,
			Model:  req.Remote.Model,
		}
	} else if req.Type == "SWITCHBOT" {
		if req.SwitchBot == nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": errors.New("switchbot options must be satisfied").Error()})
			return
		}
		opts.SwitchBot = &agent.SwitchBot{
			Mac:  req.SwitchBot.Mac,
			Type: req.SwitchBot.Type,
		}
	}

	// Create Controller base
	e, err := h.controller.Storage.Create(req.Name, appliances.KindFromString(req.Kind), req.Type, &opts)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, e)
}

// Get Controller By ID
// @Summary Get controller by ID
// @Router /api/v1/controllers/:id [get]
// @tags controller
// @Success 200 {object} controller.Entry
// @Produce json
func (h *httpServer) getControllerByID(c *gin.Context) {
	id := c.Param("id")
	r, err := h.controller.Storage.GetByID(id)
	if err != nil {
		if err == controller.ErrNotFound.Error {
			c.JSON(http.StatusNotFound, controller.ErrNotFound)
		} else {
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		}
		return
	}
	c.JSON(http.StatusOK, r)
}

// Patch Controller By ID
// @Summary Patch controller by ID
// @Router /api/v1/controllers/:id [patch]
// @tags controller
// @Success 200 {object} controller.Entry
// @Produce json
func (h *httpServer) patchControllerByID(c *gin.Context) {
	id := c.Param("id")

	var req *SetControllerRequest
	if err := c.BindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	logrus.Debugf("[Controllers] Patch payload: %v", pp.Sprint(req))

	// Set Options
	var opts controller.Options

	// AgentID
	opts.AgentID = req.AgentID

	// Remote
	if req.Type == "REMOTE" {
		opts.Remote = &remote.Remote{
			Vendor: req.Remote.Vendor,
			Model:  req.Remote.Model,
		}
	}

	e, err := h.controller.Storage.Update(id, req.Name, appliances.KindFromString(req.Kind), req.Type, &opts)
	if err != nil {
		if err == controller.ErrNotFound.Error {
			c.JSON(http.StatusNotFound, controller.ErrNotFound)
		} else {
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		}
		return
	}

	c.JSON(http.StatusOK, e)
}

// Delete Controller By ID
// @Summary Delete controller by ID
// @Router /api/v1/controllers/:id [delete]
// @tags controller
// @Success 200
// @Produce json
func (h *httpServer) deleteControllerByID(c *gin.Context) {
	id := c.Param("id")

	err := h.controller.Storage.Remove(id)
	if err != nil {
		if err == controller.ErrNotFound.Error {
			c.JSON(http.StatusNotFound, controller.ErrNotFound)
		} else {
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		}
		return
	}

	c.JSON(http.StatusOK, nil)
}

// Post SwitchBot By ID
// @Summary Post SwitchBot by ID
// @Router /api/v1/controllers/:id/switchbot [post]
// @tags controller
// @Success 200
// @Produce json
func (h *httpServer) postSwitchBotByID(c *gin.Context) {
	var req *PostSwitchBotRequest
	id := c.Param("id")
	if err := c.BindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error(), "code": "ERR_INVALID_PAYLOAD"})
		return
	}

	if err := h.controller.RaiseSwitchBot(id, req.Command); err != nil {
		if err == controller.ErrNotFound.Error {
			c.JSON(http.StatusNotFound, controller.ErrNotFound)
		} else {
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		}
		return
	}
	c.JSON(http.StatusOK, nil)
}

// Post Aircon By ID
// @Summary Post Aircon by ID
// @Router /api/v1/controllers/:id/aircon [post]
// @tags controller
// @Success 200 {object} aircon.Entry
// @Produce json
func (h *httpServer) postAirconByID(c *gin.Context) {
	var req *appliances.Aircon
	id := c.Param("id")
	if err := c.BindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	pp.Println(req)
	// Try Push
	if r, err := h.controller.Push(id, &controller.EntrySet{Remote: *appliances.FromAircon(req)}); err != nil {
		if err == controller.ErrNotFound.Error {
			c.JSON(http.StatusNotFound, gin.H{"error": err.Error()})
		} else {
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		}
	} else {
		if e, err := h.controller.Storage.GetByID(id); err == nil {
			h.hub.PublishController(e)
		} else {
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return
		}

		c.JSON(http.StatusOK, r.Aircon)
	}
}

// Post Light By ID
// @Summary Post Light by ID
// @Router /api/v1/controllers/:id/light [post]
// @tags controller
// @Success 200 {object} light.State
// @Produce json
func (h *httpServer) postLightByID(c *gin.Context) {
	var req *appliances.Light
	id := c.Param("id")
	if err := c.BindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// Try Push
	if r, err := h.controller.Push(id, &controller.EntrySet{Remote: *appliances.FromLight(req)}); err != nil {
		if err == controller.ErrNotFound.Error {
			c.JSON(http.StatusNotFound, controller.ErrNotFound)
		} else {
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		}
	} else {
		c.JSON(http.StatusOK, r.Light)
	}
}

// Get Controller Template By ID
// @Summary Get controller template by ID
// @Router /api/v1/controllers/:id/template [get]
// @tags controller
// @Success 200 {object} appliances.Template
// @Produce json
func (h *httpServer) getControllerTemplateByID(c *gin.Context) {
	id := c.Param("id")
	r, err := h.controller.Storage.GetByID(id)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	rs, err := h.controller.Remotes.Get(r.Kind, r.Remote.Vendor, r.Remote.Model)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, rs.Template())
}
