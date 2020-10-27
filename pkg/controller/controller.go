package controller

import (
	"context"
	"errors"
	"time"

	"github.com/dash-app/dash-home/pkg/agent"
	remotego "github.com/dash-app/remote-go"
	"github.com/dash-app/remote-go/aircon"
	"github.com/sirupsen/logrus"
)

type Controller struct {
	Storage *Storage
	Agent   agent.Agent
	Remotes *remotego.Remote
}

func New(basePath string, agent agent.Agent) (*Controller, error) {
	// Initialize remotes
	remotes := remotego.Init()

	store, err := NewStorage(basePath, remotes)
	if err != nil {
		return nil, err
	}

	c := &Controller{
		Storage: store,
		Agent:   agent,
		Remotes: remotes,
	}

	return c, nil
}

func (c *Controller) RaiseSwitchBot(id string) error {
	ctx, cancel := context.WithTimeout(context.Background(), 3*time.Second)
	defer cancel()

	entry, err := c.Storage.GetByID(id)
	if err != nil {
		return err
	}

	if entry.Kind != "SWITCHBOT" && entry.Type != "SWITCHBOT" {
		return errors.New("that controller does not setup for switchbot")
	}

	// Get SwitchBot Provider
	if err := c.Agent.PostSwitch(ctx, entry.SwitchBot.Mac, entry.SwitchBot.Command); err != nil {
		return err
	}

	return nil
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
		acRemote, err := c.Remotes.GetAircon(entry.Remote.Vendor, entry.Remote.Model)
		if err != nil {
			return nil, err
		}

		// Validate
		if err := ac.Validate(acRemote.Template()); err != nil {
			return nil, err
		}

		// Generate
		code, err := acRemote.Generate(ac)
		if err != nil {
			return nil, err
		}

		// Send
		if err := c.Agent.SendIR(ctx, code); err != nil {
			logrus.WithError(err).Errorf("[Send] Failed Send IR")
			return nil, err
		}

		// Update
		updated, err := entry.Aircon.UpdateFromEntry(ac, acRemote.Template())
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
