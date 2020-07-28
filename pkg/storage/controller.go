package storage

import "github.com/dash-app/dash-home/pkg/controller"

const CONTROLLER_FILE = "controller.json"

// ControllerStore - Store definition of Controller
type ControllerStore struct {
	Path       string
	Controller *Controller
}

type Controller struct {
	Name   string
	Type   string
	Aircon *controller.Aircon
}
