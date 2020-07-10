package server

import (
	"errors"
	"net/http"

	"github.com/gin-gonic/gin"
)

// UpdateAgentRequest - Update Agent Request
type UpdateAgentRequest struct {
	Address string `json:"address" validate:"required" example:"localhost:8081"`
}

// Get Agent
// @Summary Get Agent entry
// @Router /api/v1/agent [get]
// @tags agent
// @Success 200 {object} storage.Agent
// @Produce json
func (h *httpServer) getAgent(c *gin.Context) {
	agent, err := h.agent.Get()
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, agent)
}

// Add Agent
// @Summary Add Agent entry
// @Router /api/v1/agent [post]
// @tags agent
// @Param entry body UpdateAgentRequest true "Add new agent"
// @Success 200 {object} storage.Agent
// @Accept json
// @Produce json
func (h *httpServer) postAgent(c *gin.Context) {
	var entry map[string]string

	if err := c.BindJSON(&entry); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if address := entry["address"]; address != "" {
		if r, err := h.agent.Create(address); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		} else {
			c.JSON(http.StatusOK, r)
		}
	} else {
		c.JSON(http.StatusBadRequest, gin.H{"error": errors.New("address is not provided").Error()})
	}
}

// Get Sensors from agent
// @Summary Get Sensors status form agent
// @Router /api/v1/agent/sensors [get]
// @tags agent
// @Success 200 {object} agent.Ambient
// @Produce json
func (h *httpServer) getAgentSensors(c *gin.Context) {
	r, err := h.agent.GetAmbient()
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
	}
	c.JSON(http.StatusOK, r)
}
