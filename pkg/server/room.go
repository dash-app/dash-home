package server

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

// Get Room
// @Summary Get Room entry
// @Router /api/v1/room [get]
// @tags room
// @Success 200 {object} models.Room
// @Produce json
func (h *httpServer) getRoom(c *gin.Context) {
	c.String(http.StatusNotImplemented, "Not Implemented Yet")
}
