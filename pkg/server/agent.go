package server

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

// Get Agent
// @Summary Get Agent entry
// @Router /api/v1/agent [get]
// @tags agent
// @Success 200 {object} models.Agent
// @Produce json
func (h *httpServer) getAgent(c *gin.Context) {
	c.String(http.StatusNotImplemented, "Not Implemented Yet")
}
