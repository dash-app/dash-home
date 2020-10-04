package controller

import (
	"context"
	"errors"
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

func (c *Controller) PushAircon(id string, ac *aircon.Entry) (*aircon.Entry, error) {
	ctx, cancel := context.WithTimeout(context.Background(), 3*time.Second)
	defer cancel()

	entry, err := c.Storage.GetByID(id)
	if err != nil {
		return nil, err
	}

	if entry.Kind != "AIRCON" {
		return nil, errors.New("that controller does not setup for air conditioner")
	}

	switch entry.Type {
	case "REMOTE":
		// Get remote provider
		acRemote, err := entry.Remote.GetAircon()
		if err != nil {
			return nil, err
		}

		// Validate
		if err := ac.Validate(acRemote.Remote.Template()); err != nil {
			return nil, err
		}

		// Generate
		code, err := acRemote.Remote.Generate(ac)
		if err != nil {
			return nil, err
		}

		// Send
		if err := c.Agent.SendIR(ctx, code); err != nil {
			logrus.WithError(err).Errorf("[Send] Failed Send IR")
			return nil, err
		}

		// Update
		updated, err := entry.Aircon.UpdateFromEntry(ac, acRemote.Remote.Template())
		if err != nil {
			return nil, err
		}

		// Insert
		entry.Aircon = updated
		if err := c.Storage.Save(); err != nil {
			return nil, err
		}

		return updated.ToEntry(), nil
	default:
		return nil, errors.New("unsupported type provided")
	}
}
