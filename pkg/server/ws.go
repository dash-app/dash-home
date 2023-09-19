package server

import (
	"net/http"

	"github.com/dash-app/dash-home/pkg/stream"
	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
	"github.com/gorilla/websocket"
	"github.com/sirupsen/logrus"
)

var upgrader = websocket.Upgrader{
	CheckOrigin: func(r *http.Request) bool {
		return true
	},
}

func (h *httpServer) handleWebSocket(c *gin.Context) {
	ws, err := upgrader.Upgrade(c.Writer, c.Request, nil)
	if err != nil {
		logrus.WithError(err).Error("[Stream] Failed initialize websocket")
		return
	}

	id, err := uuid.NewUUID()
	if err != nil {
		logrus.WithError(err).Error("[Stream] Failed ensure UUID")
		return
	}

	client := &stream.Client{
		Hub:  h.hub,
		Conn: ws,
		Send: make(chan *stream.StreamEntry, 256),
		ID:   id.String(),
	}

	h.hub.Register <- client
	go client.ReadMessageFromPump()
	go client.WriteMessageToPump()
}
