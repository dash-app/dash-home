package server

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

type GetRemotesResponse struct {
	Aircon map[string][]string `json:"aircon"`
	Light  map[string][]string `json:"light"`
}

// Get remote controllers
// @Summary Get remote controllers
// @Description Entries like as: `{"aircon": {"daikin": ["daikin01", "daikin02"]}}`...
// @Router /api/v1/remotes [get]
// @tags remotes
// @Success 200 {object} GetRemotesResponse
// @Produce json
func (h *httpServer) getRemotes(c *gin.Context) {
	c.JSON(http.StatusOK, &GetRemotesResponse{
		Aircon: h.controller.Remotes.AvailableAircons(),
		Light:  h.controller.Remotes.AvailableLights(),
	})
}
