package main

import (
	"os"

	"github.com/dash-app/dash-home/internal/logger"
	"github.com/dash-app/dash-home/pkg/agent"
	"github.com/dash-app/dash-home/pkg/room"
	"github.com/dash-app/dash-home/pkg/server"
	"github.com/dash-app/dash-home/pkg/storage"
	"github.com/sirupsen/logrus"
)

func startHTTPServer(port string, agent agent.Agent, room room.Room) error {
	logrus.Infof("[HTTP] HTTP Listening on %s...", port)
	return server.NewHTTPServer(&server.Subset{
		Agent: agent,
		Room:  room,
	}).Run(":" + port)
}

func main() {
	logger.Init()
	logrus.Infof("[Dash-Home] Starting Dash-Home Services...")

	// Initialize Storage...
	path := os.Getenv("STORAGE_PATH")
	if len(path) == 0 {
		dir, err := os.Getwd()
		if err != nil {
			panic(err)
		}
		path = dir + "/local"
	}

	storage, err := storage.New(path)
	if err != nil {
		logrus.Fatalf("[Storage] Failed ensure storage: %v", err)
		return
	}

	// Initialize Agent process...
	agent := agent.New(&agent.Subset{
		Store: storage.AgentStore,
	})
	agent.InitPoll()

	room := room.New(&room.Subset{
		Store: storage.RoomStore,
	})

	// Initialize HTTP Server...
	httpPort := os.Getenv("HTTP_PORT")
	if len(httpPort) == 0 {
		httpPort = "8080"
	}
	if err := startHTTPServer(httpPort, agent, room); err != nil {
		panic(err)
	}
}
