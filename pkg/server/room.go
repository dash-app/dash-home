package server

import (
	"errors"
	"net/http"

	"github.com/dash-app/dash-home/pkg/agent"
	"github.com/dash-app/dash-home/pkg/storage"
	"github.com/gin-gonic/gin"
)

// CreateRoomRequest - Create Room Request
type CreateRoomRequest struct {
	Name string `json:"name" example:"john's room"`
}

// RoomResponse - Room Response (Get, Post)
type RoomResponse struct {
	Room    *storage.Room  `json:"room"`
	Ambient *agent.Ambient `json:"ambient"`
}

// Get Room
// @Summary Get Room entry
// @Router /api/v1/room [get]
// @tags room
// @Success 200 {object} RoomResponse
// @Produce json
func (h *httpServer) getRoom(c *gin.Context) {
	room, err := h.room.Get()
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, &RoomResponse{
		Room: room,
		Ambient: func() *agent.Ambient {
			r, err := h.agent.GetAmbient()
			if err != nil {
				return nil
			}
			return r
		}(),
	})
}

// Create Room
// @Summary Craete Room entry
// @Router /api/v1/room [post]
// @tags room
// @Param entry body CreateRoomRequest true "Create new room"
// @Success 200 {object} storage.Room
// @Accept json
// @Produce json
func (h *httpServer) postRoom(c *gin.Context) {
	var entry *CreateRoomRequest

	if err := c.BindJSON(&entry); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if entry.Name != "" {
		if r, err := h.room.Create(entry.Name); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		} else {
			c.JSON(http.StatusOK, r)
		}
	} else {
		c.JSON(http.StatusBadRequest, gin.H{"error": errors.New("name is not provided").Error()})
	}
}
