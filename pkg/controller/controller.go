package controller

import (
	"context"
	"errors"
	"strings"
	"time"

	"github.com/dash-app/dash-home/pkg/agent"
	remotego "github.com/dash-app/remote-go"
	"github.com/dash-app/remote-go/appliances"
	"github.com/sirupsen/logrus"
)

type Controller struct {
	Storage *Storage
	Agent   *agent.AgentService
	Remotes *remotego.Remote
}

func New(basePath string, agent *agent.AgentService) (*Controller, error) {
	// Initialize remotes
	remotes := remotego.Init()

	store, err := NewStorage(basePath, remotes, agent.Storage)
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

func (c *Controller) RaiseSwitchBot(id string, command string) error {
	ctx, cancel := context.WithTimeout(context.Background(), 3*time.Second)
	defer cancel()

	entry, err := c.Storage.GetByID(id)
	if err != nil {
		return err
	}

	if entry.Kind != appliances.SWITCHBOT && entry.Type != "SWITCHBOT" {
		return errors.New("that controller does not setup for switchbot")
	}

	// Get Agent
	agentID := entry.AgentID
	if agentID == "" {
		agent, err := c.Agent.Storage.GetDefaultAgent()
		if err != nil {
			return err
		}
		agentID = agent.ID
	}

	// Get SwitchBot Provider
	if err := c.Agent.PostSwitch(ctx, agentID, entry.SwitchBot.Mac, strings.ToLower(command)); err != nil {
		return err
	}

	// Update Database entry
	entry.SwitchBot.State = command

	// Save to storage
	if err := c.Storage.Save(); err != nil {
		return err
	}

	return nil
}

func (c *Controller) Push(id string, es *EntrySet) (*PushResult, error) {
	ctx, cancel := context.WithTimeout(context.Background(), 3*time.Second)
	defer cancel()

	// Get controller by ID (for check kind / type)
	ct, err := c.Storage.GetByID(id)
	if err != nil {
		return nil, err
	}

	switch ct.Type {
	case "REMOTE":
		// Get remote from vendor/model
		rmt, err := c.Remotes.Get(ct.Kind, ct.Remote.Vendor, ct.Remote.Model)
		if err != nil {
			return nil, err
		}

		// Agent
		agentID := ct.AgentID
		if agentID == "" {
			agent, err := c.Agent.Storage.GetDefaultAgent()
			if err != nil {
				return nil, err
			}
			agentID = agent.ID
		}

		code, err := rmt.Generate(&es.Remote)
		if err != nil {
			return nil, err
		}

		// Send
		if err := c.Agent.SendIR(ctx, agentID, code); err != nil {
			logrus.WithError(err).Errorf("[Send] Failed Send IR")
			return nil, err
		}

		// Update
		updated, err := ct.Appliances.Action().UpdateFromEntry(&es.Remote, rmt.Template())
		if err != nil {
			return nil, err
		}

		// Insert
		ct.Appliances = updated.ToState()
		if err := c.Storage.Save(); err != nil {
			return nil, err
		}

		return &PushResult{}, nil
		// === end
	case "SWITCHBOT":
		if err := c.RaiseSwitchBot(id, es.SwitchBot.Command); err != nil {
			return nil, err
		}
		return &PushResult{
			Aircon: nil,
			Light:  nil,
		}, nil
	default:
		return nil, ErrUnsupportedType.Error
	}
}
