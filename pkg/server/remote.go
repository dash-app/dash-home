package server

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

// CreateRemoteRequest - Crewte new remote request
type CreateRemoteRequest struct {
}

// CreateRemoteResponse - Create remote response
type CreateRemoteResponse struct {
	Remote remote.Aircon
}

// Create Remote
// @Summary Add new remote
// @Router /api/v1/remote [post]
// @tags remote
// @Param entry body CreateRemoteRequest true "Add new remote"
// @Success 200 {object} CreateRoomResponse
// @Accept json
// @Produce json
func (h *httpServer) postRemote(c *gin.Context) {
	var entry *remote.Remote

	if err := c.BindJSON(&entry); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// TODO: Get Remote from name
}
