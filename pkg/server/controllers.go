package server

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/k0kubun/pp"
)

// SetControllerRequest - Create / Update controller request
type SetControllerRequest struct {
	//Aircon *aircon.Controller
	Name string `json:"name" validate:"required" example:"Bedroom Airconditioner"`
	Kind string `json:"kind" validate:"required" eaxmple:"REMOTE"`

	// Controllers (nill will be ignore)
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

// Controller - Controller response
type Controller struct {
}

// Get Controllers
// @Summary Get controllers
// @Router /api/v1/controllers [get]
// @tags controller
// @Success 200 {object} []Controllers
// @Produce json
func (h *httpServer) getControllers(c *gin.Context) {
	return
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

	// TODO: Get Controller from name
	pp.Println(req)
}
