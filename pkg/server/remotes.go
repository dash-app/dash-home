package server

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

type GetRemotesResponse struct {
	Aircon map[string][]string `json:"aircon"`
}

func (h *httpServer) getRemotes(c *gin.Context) {
	c.JSON(http.StatusOK, &GetRemotesResponse{
		Aircon: h.controller.Remotes.AvailableAircons(),
	})
}
