package controller

import (
	"context"
	"encoding/json"
	"errors"
	"fmt"
	"reflect"
	"time"

	"github.com/dash-app/dash-home/pkg/agent"
	"github.com/dash-app/remote-go/aircon"
	"github.com/sirupsen/logrus"
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

func (c *Controller) HandleRawEntry(id string, payload []byte, callback func(e interface{})) error {
	ctx, cancel := context.WithTimeout(context.Background(), 3*time.Second)
	defer cancel()

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
		code, err := acRemote.Remote.Generate(ac)
		if err != nil {
			return err
		}

		// Send
		if err := c.Agent.SendIR(ctx, code); err != nil {
			logrus.WithError(err).Errorf("[Send] Failed Send IR")
			return err
		}

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
