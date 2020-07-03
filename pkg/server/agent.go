package server

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

// Get Agent
// @Summary Get Agent entry
// @Router /api/v1/agent [get]
// @tags agent
// @Success 200 {object} storage.Agent
// @Produce json
func (h *httpServer) getAgent(c *gin.Context) {
	c.String(http.StatusNotImplemented, "Not Implemented Yet")
}

// Add Agent
// @Summary Add Agent entry
// @Router /api/v1/agent [post]
// @tags agent
// @Param entry body models.UpdateAgentRequest true "Add new agent"
// @Success 200 {object} storage.Agent
// @Accept json
// @Produce json
func (h *httpServer) postAgent(c *gin.Context) {
	// TODO: Add
}

func (h *httpServer) test(c *gin.Context) {

}
