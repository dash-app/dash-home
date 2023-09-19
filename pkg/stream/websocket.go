package stream

import (
	"encoding/json"
	"time"

	"github.com/gorilla/websocket"
	"github.com/sirupsen/logrus"
)

const (
	// Time allowed to write the file to the client.
	writeWait = 10 * time.Second

	// Time allowed to read the next pong message from the client.
	pongWait = 60 * time.Second

	// Send pings to client with this period. Must be less than pongWait.
	pingPeriod = (pongWait * 9) / 10
)

type Client struct {
	Hub  *Hub
	Conn *websocket.Conn
	Send chan *StreamEntry

	// ID - ClientID
	ID string
}

func (c *Client) ReadMessageFromPump() {
	defer func() {
		c.Hub.Unregister <- c
		c.Conn.Close()
		logrus.Debug("[Stream] Websocket Connection was closed")
	}()

	c.Conn.SetReadDeadline(time.Now().Add(pongWait))
	c.Conn.SetPongHandler(func(string) error {
		return c.Conn.SetReadDeadline(time.Now().Add(pongWait))
	})

	for {
		_, message, err := c.Conn.ReadMessage()
		if err != nil {
			if websocket.IsUnexpectedCloseError(err, websocket.CloseGoingAway, websocket.CloseAbnormalClosure) {
				logrus.WithError(err).Errorf("[Stream] Socket error")
			}
			break
		}
		c.Hub.receive <- &Publish{
			Target: "Ya",
			Entry: &StreamEntry{
				Message: string(message),
			},
		}
	}
}

func (c *Client) WriteMessageToPump() {
	ticker := time.NewTicker(pingPeriod)
	defer func() {
		ticker.Stop()
		c.Conn.Close()
		logrus.Info("[Stream] Connection closed")
	}()

	for {
		select {
		case message, ok := <-c.Send:
			c.Conn.SetWriteDeadline(time.Now().Add(writeWait))
			if !ok {
				c.Conn.WriteMessage(websocket.CloseMessage, []byte{})
				return
			}

			w, err := c.Conn.NextWriter(websocket.TextMessage)
			if err != nil {
				logrus.WithError(err).Errorf("[Stream]")
				return
			}

			e, err := json.Marshal(message)
			if err != nil {
				logrus.WithError(err).Errorf("[Stream]")
				return
			}

			if _, err := w.Write(e); err != nil {
				logrus.WithError(err).Errorf("[Stream]")
				return
			}

			if err := w.Close(); err != nil {
				return
			}
		case <-ticker.C:
			c.Conn.SetWriteDeadline(time.Now().Add(writeWait))
			if err := c.Conn.WriteMessage(websocket.PingMessage, nil); err != nil {
				logrus.WithError(err).Errorf("[Stream] Ticker Error")
				return
			}
		}
	}
}
