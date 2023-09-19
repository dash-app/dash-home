package main

import (
	"os"

	"github.com/dash-app/dash-home/internal/logger"
	"github.com/dash-app/dash-home/pkg/agent"
	"github.com/dash-app/dash-home/pkg/controller"
	"github.com/dash-app/dash-home/pkg/room"
	"github.com/dash-app/dash-home/pkg/server"
	"github.com/dash-app/dash-home/pkg/stream"
	"github.com/sirupsen/logrus"
)

func startHTTPServer(port string, agent *agent.AgentService, room *room.RoomService, controller *controller.Controller, hub *stream.Hub) error {
	logrus.Infof("[HTTP] HTTP Listening on %s...", port)
	return server.NewHTTPServer(&server.Subset{
		Agent:      agent,
		Room:       room,
		Controller: controller,
		Hub:        hub,
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

	// Mkdir when not exists
	if _, err := os.Stat(path); os.IsNotExist(err) {
		if err := os.Mkdir(path, 0700); err != nil {
			panic(err)
		}
	}

	// storage, err := storage.New(path)
	// if err != nil {
	// 	logrus.Fatalf("[Storage] Failed ensure storage: %v", err)
	// 	return
	// }

	// Stream
	hub := stream.NewHub()
	go hub.Run()

	// Initialize Agent process...
	agent, err := agent.New(path, hub)
	if err != nil {
		panic(err)
	}
	agent.InitPoll()

	// Room
	room, err := room.New(path, agent)
	if err != nil {
		panic(err)
	}

	// Controller
	controller, err := controller.New(path, agent)
	if err != nil {
		panic(err)
	}

	// Initialize HTTP Server...
	httpPort := os.Getenv("HTTP_PORT")
	if len(httpPort) == 0 {
		httpPort = "13105"
	}
	if err := startHTTPServer(httpPort, agent, room, controller, hub); err != nil {
		panic(err)
	}
}
