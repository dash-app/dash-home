package server

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

type GetRemotesResponse struct {
	Aircon map[string][]string `json:"aircon"`
}

// Get remote controllers
// @Summary Get remote controllers
// @Router /api/v1/remotes [get]
// @tags controller
// @Success 200 {object} GetRemotesResponse
// @Produce json
func (h *httpServer) getRemotes(c *gin.Context) {
	c.JSON(http.StatusOK, &GetRemotesResponse{
		Aircon: h.controller.Remotes.AvailableAircons(),
	})
}
