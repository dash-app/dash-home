package stream

import (
	"github.com/sirupsen/logrus"
)

type Hub struct {
	Clients    map[string]*Client
	Register   chan *Client
	Unregister chan *Client

	receive chan *Publish
	publish chan *Publish
}

type Publish struct {
	Target string
	Entry  *StreamEntry
}

func NewHub() *Hub {
	return &Hub{
		Clients:    make(map[string]*Client),
		Register:   make(chan *Client),
		Unregister: make(chan *Client),
		receive:    make(chan *Publish),
		publish:    make(chan *Publish),
	}
}

// Run Receivers
func (h *Hub) Run() {
	for {
		select {
		case client := <-h.Register:
			// when clients already registered?
			if val, ok := h.Clients[client.ID]; ok {
				val.Send <- &StreamEntry{
					Message: "WARN: Already exists. reconnected?",
				}
				h.Clients[client.ID] = client
			} else {
				logrus.Infof("[Hub] New clients registered")
				h.Clients[client.ID] = client
			}
		case client := <-h.Unregister:
			if _, ok := h.Clients[client.ID]; ok {
				delete(h.Clients, client.ID)
				close(client.Send)
			}
		case publish := <-h.publish:
			logrus.Infof("[Hub] Send -> %v", publish)
			for clientID, _ := range h.Clients {
				if val, ok := h.Clients[clientID]; ok {
					val.Send <- publish.Entry
				}
			}
		case bc := <-h.receive:
			logrus.Infof("[Hub] broadcast -> %v %v", bc.Target, bc.Entry)
		}
	}
}

func (h *Hub) PublishMessage(msg string) {
	h.publish <- &Publish{
		Target: "test",
		Entry: &StreamEntry{
			Message: msg,
		},
	}
}
