package server

import (
	"errors"
	"net/http"

	"github.com/dash-app/dash-home/pkg/agent"
	_ "github.com/dash-app/dash-home/pkg/agent"
	"github.com/gin-gonic/gin"
)

// UpdateAgentRequest - Update Agent Request
type UpdateAgentRequest struct {
	// Address of Pigent
	Address string `json:"address" validate:"required" example:"localhost:8081"`

	// Default - Agent to use by mainly
	Default bool `json:"default,omitempty"`

	// Label - Agent label (optional)
	Label string `json:"label" example:"Bedroom"`
}

// Get Agent
// @Summary Get all agents
// @Router /api/v1/agents [get]
// @tags agent
// @Success 200 {object} agent.Agent
// @Produce json
func (h *httpServer) getAgents(c *gin.Context) {
	agents, err := h.agent.GetAll()
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, agents)
}

// Get Agent By ID
// @Summary Get agent by ID
// @Router /api/v1/agents/:id [get]
// @tags agent
// @Success 200 {object} agent.Agent
// @Produce json
func (h *httpServer) getAgentByID(c *gin.Context) {
	id := c.Param("id")
	r := h.agent.Storage.GetByID(id)
	if r == nil {
		c.JSON(http.StatusNotFound, agent.ErrNotFound)
	}
	c.JSON(http.StatusOK, r)
}

// Delete Agent By ID
// @Summary Delete agent by ID
// @Router /api/v1/agents/:id [delete]
// @tags agent
// @Success 200
func (h *httpServer) deleteAgentByID(c *gin.Context) {
	id := c.Param("id")
	r := h.agent.Storage.GetByID(id)
	if r == nil {
		c.JSON(http.StatusNotFound, agent.ErrNotFound)
		return
	}

	if err := h.agent.Storage.Remove(id); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, nil)
}

// Add Agent
// @Summary Add Agent entry
// @Router /api/v1/agents [post]
// @tags agent
// @Param entry body UpdateAgentRequest true "Add new agent"
// @Success 200 {object} agent.Agent
// @Accept json
// @Produce json
func (h *httpServer) postAgent(c *gin.Context) {
	var entry *UpdateAgentRequest

	if err := c.BindJSON(&entry); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if address := entry.Address; address != "" {
		if r, err := h.agent.Add(address, entry.Label); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		} else {
			c.JSON(http.StatusOK, r)
		}
	} else {
		c.JSON(http.StatusBadRequest, gin.H{"error": errors.New("address is not provided").Error()})
	}
}

// Patch Agent By ID
// @Summary Update agent by ID
// @Router /api/v1/agents/:id [patch]
// @tags agent
// @Success 200 {object} agent.Agent
// @Produce json
func (h *httpServer) patchAgentByID(c *gin.Context) {
	id := c.Param("id")

	var req *UpdateAgentRequest
	if err := c.BindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// Get old Entry
	oldEntry := h.agent.Storage.GetByID(id)
	if oldEntry == nil {
		c.JSON(http.StatusNotFound, agent.ErrNotFound)
	}

	oldEntry.Address = req.Address
	oldEntry.Label = req.Label
	oldEntry.Default = req.Default
	res, err := h.agent.Storage.Update(id, oldEntry)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, res)
}
