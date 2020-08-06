package controller

import (
	"encoding/json"
	"errors"
	"fmt"
	"reflect"

	"github.com/dash-app/dash-home/pkg/agent"
	"github.com/dash-app/remote-go/aircon"
)

type Controller struct {
	Storage *Storage
	Agent   agent.Agent
}

func New(basePath string, agent agent.Agent) (*Controller, error) {
	store, err := NewStorage(basePath)
	if err != nil {
		return nil, err
	}

	c := &Controller{
		Storage: store,
		Agent:   agent,
	}

	return c, nil
}

func (c *Controller) HandleWithCallback(id string, fun func(e interface{})) error {
	entry, err := c.Storage.GetByID(id)
	if err != nil {
		return err
	}

	fun(entry)
	return nil
}

func (c *Controller) HandleRawEntry(id string, payload []byte, callback func(e interface{})) error {
	// NOTE: payload must be match target entry.
	// such as: aircon.Entry (remote-go)
	entry, err := c.Storage.GetByID(id)
	if err != nil {
		return err
	}

	// TODO: Move separated function
	switch entry.Kind {
	case "AIRCON":
		var ac *aircon.Entry
		if err := json.Unmarshal(payload, &ac); err != nil {
			return fmt.Errorf("failed parse payload: %s", reflect.TypeOf(payload))
		}

		// Get AC Provider
		acRemote, err := entry.Remote.GetAircon()
		if err != nil {
			return err
		}

		// Validate
		if err := ac.Validate(acRemote.Remote.Template()); err != nil {
			return err
		}

		// Generate
		//code, err := acRemote.Remote.Generate(ac)
		//if err != nil {
		//	return err
		//}

		// Send
		// TODO: Implement here

		// Update
		updated, err := entry.Aircon.UpdateFromEntry(ac, acRemote.Remote.Template())
		if err != nil {
			return err
		}

		callback(updated.ToEntry())
	default:
		return errors.New("invalid kind provided")
	}

	return nil
}
