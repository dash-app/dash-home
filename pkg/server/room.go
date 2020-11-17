package server

import (
	"errors"
	"net/http"

	"github.com/dash-app/dash-home/pkg/room"
	"github.com/gin-gonic/gin"
)

// CreateRoomRequest - Create Room Request
type CreateRoomRequest struct {
	Name string `json:"name" example:"john's room"`
}

// Get Room
// @Summary Get Room entry
// @Router /api/v1/room [get]
// @tags room
// @Success 200 {object} room.Room
// @Produce json
func (h *httpServer) getRoom(c *gin.Context) {
	r, err := h.room.Get()
	if err != nil {
		if err == room.ErrNotFound {
			c.JSON(http.StatusNotFound, gin.H{"error": err.Error(), "code": "ROOM_NOT_FOUND"})
			return
		}
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, r)
}

// Create Room
// @Summary Craete Room entry
// @Router /api/v1/room [post]
// @tags room
// @Param entry body CreateRoomRequest true "Create new room"
// @Success 200 {object} room.Entry
// @Accept json
// @Produce json
func (h *httpServer) postRoom(c *gin.Context) {
	var entry *CreateRoomRequest

	if err := c.BindJSON(&entry); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if entry.Name != "" {
		if r, err := h.room.Storage.Create(entry.Name); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		} else {
			c.JSON(http.StatusOK, r)
		}
	} else {
		c.JSON(http.StatusBadRequest, gin.H{"error": errors.New("name is not provided").Error()})
	}
}
