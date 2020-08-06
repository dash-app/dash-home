package server

import (
	"errors"
	"net/http"

	"github.com/gin-gonic/gin"
)

// SetControllerRequest - Create / Update controller request
type SetControllerRequest struct {
	//Aircon *aircon.Controller
	Name string `json:"name" validate:"required" example:"Bedroom Airconditioner"`
	Kind string `json:"kind" validate:"required" eaxmple:"AIRCON"`
	Type string `json:"type" validate:"required" example:"REMOTE"`
	// Controllers (nil will be ignore)
	Remote *RemoteController `json:"remote,omitempty"`

	// TODO: Add Switchbot Controller
	//Switch *SwitchController `json:"switch,omitempty"`
}

// RemoteController - as IR remote controller
type RemoteController struct {
	Vendor string `json:"vendor" validate:"required" example:"daikin"`
	Model  string `json:"model" validate:"required" example:"daikin01"`
}

// CreateControllerResponse - Create controller response
type CreateControllerResponse struct {
}

// ControllerResponse - Controller response
type ControllerResponse struct {
}

// Get Controllers
// @Summary Get controllers
// @Router /api/v1/controllers [get]
// @tags controller
// @Success 200 {object} []Controllers
// @Produce json
func (h *httpServer) getControllers(c *gin.Context) {
	c.JSON(http.StatusOK, h.controller.Storage.GetAll())
}

// Create Controller
// @Summary Add new controller
// @Router /api/v1/controllers [post]
// @tags controller
// @Param entry body SetControllerRequest true "Add new controller"
// @Success 200 {object} CreateControllerResponse
// @Accept json
// @Produce json
func (h *httpServer) postControllers(c *gin.Context) {
	var req *SetControllerRequest

	if err := c.BindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	switch req.Type {
	case "REMOTE":
		r, err := h.controller.Storage.CreateRemote(req.Name, req.Kind, req.Remote.Vendor, req.Remote.Model)
		if err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}
		c.JSON(http.StatusOK, r)
	default:
		c.JSON(http.StatusBadRequest, gin.H{"error": "invalid type requested"})
	}
}

func (h *httpServer) getControllerByID(c *gin.Context) {
	id := c.Param("id")
	r, err := h.controller.Storage.GetByID(id)
	if err != nil {
		if err == errors.New("not found") {
			c.JSON(http.StatusNotFound, gin.H{"error": err.Error()})
		} else {
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		}
		return
	}
	c.JSON(http.StatusOK, r)
}

func (h *httpServer) postControllerByID(c *gin.Context) {
	id := c.Param("id")
	raw, err := c.GetRawData()
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// Try Scan & Generate & Send
	if err := h.controller.HandleRawEntry(id, raw, func(r interface{}) {
		// Return updated result with callback func
		c.JSON(http.StatusOK, r)
	}); err != nil {
		if err == errors.New("not found") {
			c.JSON(http.StatusNotFound, gin.H{"error": err.Error()})
		} else {
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		}
	}
}
