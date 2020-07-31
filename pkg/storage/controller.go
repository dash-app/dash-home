package storage

import (
	"encoding/json"
	"io/ioutil"
	"os"

	"github.com/dash-app/dash-home/pkg/controller"
)

const CONTROLLER_FILE = "controller.json"

// ControllerStore - Store definition of Controller
type ControllerStore struct {
	Path       string
	Controller *Controller
}

type Controller struct {
	ID     string             `json:"id,omitempty"`
	Name   string             `json:"name"`
	Kind   string             `json:"kind"`
	Type   string             `json:"type"`
	Aircon *controller.Aircon `json:"aircon"`
}

func NewControllerStore(basePath string) (*ControllerStore, error) {
	store := &ControllerStore{
		Path: basePath + "/" + CONTROLLER_FILE,
	}

	if _, err := os.Stat(store.Path); !os.IsNotExist(err) && err == nil {
		// Load
		if err := store.load(); err != nil {
			return nil, err
		}
	} else {
		return nil, err
	}

	return store, nil
}

// Create - Create new controller
func (s *ControllerStore) Create(name string, kind string) {

}

func (s *ControllerStore) load() error {
	b, err := ioutil.ReadFile(s.Path)
	if err != nil {
		return err
	}
	if err := json.Unmarshal(b, &s.Controller); err != nil {
		return err
	}
	return nil
}

func (s *ControllerStore) save() error {
	b, err := json.Marshal(s.Controller)
	if err != nil {
		return err
	}
	if err := ioutil.WriteFile(s.Path, b, os.ModePerm); err != nil {
		return err
	}
	return nil
}
