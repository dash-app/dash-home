package server

import (
	"context"
	"net/http"
	"time"

	"github.com/k0kubun/pp"

	"github.com/gin-gonic/gin"
)

type PostSwitchRequest struct {
	Mac     string `json:"mac" validate:"required" example:"FF:FF:FF:FF:FF:FF"`
	Command string `json:"command" validate:"required" example:"PRESS"`
}

func (h *httpServer) postSwitch(c *gin.Context) {
	ctx, cancel := context.WithTimeout(context.Background(), 3*time.Second)
	defer cancel()

	var req *PostSwitchRequest

	if err := c.BindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"errer": err.Error()})
		return
	}

	pp.Println(req)
	if err := h.agent.PostSwitch(ctx, req.Mac, req.Command); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"errer": err.Error()})
		return
	}

	c.String(http.StatusOK, "OK")

}
