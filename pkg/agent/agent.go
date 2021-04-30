package agent

import (
	"context"
	"encoding/json"
	"fmt"
	"io/ioutil"
	"net/http"
	"time"

	"github.com/k0kubun/pp"
	"github.com/sirupsen/logrus"
)

const (
	// PollingPeriod - Polling period seconds for fetch to agent
	PollingPeriod = 5000
)

// AgentService - Provide Agent calls
type AgentService struct {
	Storage *Storage
	Ambient *Ambient
}

// Agent - Store of Agent
type Agent struct {
	// ID - Agent ID
	ID string `json:"id" default:"<UNIQUE_ID>"`

	// Address - Agent Address (ex. `localhost:8081`)
	Address string `json:"address" validate:"required" example:"localhost:8081"`

	// Default - Agent to use by mainly
	Default bool `json:"default,omitempty"`

	// Label - Name of Agent (ex. `Bedroom`)
	Label string `json:"label,omitempty" example:"Bedroom"`

	// Online - Check online
	Online bool `json:"online,omitempty"`
}

// New - Initialize agent service
func New(basePath string) (*AgentService, error) {
	store, err := NewStorage(basePath)
	if err != nil {
		return nil, err
	}

	return &AgentService{
		Storage: store,
	}, nil
}

// GetAll - Get all agents
func (as *AgentService) GetAll() ([]Agent, error) {
	r, err := as.Storage.GetAll()
	if err != nil {
		return nil, err
	}

	return r, nil
}

// Add - Add agent
func (as *AgentService) Add(address string, label string) (*Agent, error) {
	r, err := as.Storage.Add(address, false, label)
	if err != nil {
		return nil, err
	}

	return r, nil
}

// InitPoll - Start Poll task
func (as *AgentService) InitPoll() {
	// NOTE: Must be use context
	for _, agent := range as.Storage.Agents {
		go func(agent Agent) {
			// First Polling
			ctx, cancel := context.WithTimeout(context.Background(), 3*time.Second)
			if err := as.Poll(ctx, agent); err != nil {
				logrus.WithError(err).Errorf("[Poll]")
			}
			cancel()

			// Loop Polling
			ticker := time.NewTicker(PollingPeriod * time.Millisecond)
			quit := make(chan struct{})
			for {
				select {
				case <-ticker.C:
					ctx, cancel := context.WithTimeout(context.Background(), 3*time.Second)
					if err := as.Poll(ctx, agent); err != nil {
						logrus.WithError(err).Errorf("[Poll]")
					}
					cancel()
				case <-quit:
					ticker.Stop()
					return
				}
			}
		}(agent)
	}
}

// Poll - Execute Poll
func (as *AgentService) Poll(c context.Context, agent Agent) error {
	ctx, cancel := context.WithCancel(c)
	defer cancel()
	if as.Storage.Agents == nil || len(as.Storage.Agents) == 0 {
		return ErrNotFound.Error
	}

	address := agent.Address
	req, err := http.NewRequest(
		"GET",
		fmt.Sprintf("http://%s/api/v1/sensors", address),
		nil,
	)
	if err != nil {
		return err
	}
	req.Header.Set("Content-Type", "application/json")

	client := http.DefaultClient
	errCh := make(chan error, 1)

	go func() {
		resp, err := client.Do(req)
		if err != nil {
			agent.Online = false
			if _, err := as.Storage.Update(agent.ID, &agent); err != nil {
				errCh <- err
				return
			}
			errCh <- err
			return
		}
		defer resp.Body.Close()
		if agent.Default {
			b, _ := ioutil.ReadAll(resp.Body)
			var entry *Ambient
			if err := json.Unmarshal(b, &entry); err != nil {
				errCh <- err
				return
			}
			entry.LastFetch = time.Now().UTC()
			as.Ambient = entry
			logrus.Debugf("[Poll] Fetched: %v", pp.Sprint(entry))
		}

		// Update Online status
		as.Storage.Update(agent.ID, &agent)
		agent.Online = true
		if _, err := as.Storage.Update(agent.ID, &agent); err != nil {
			errCh <- err
			return
		}

		errCh <- nil
	}()

	select {
	case err := <-errCh:
		if err != nil {
			return err
		}

	case <-ctx.Done():
		client.CloseIdleConnections()
		<-errCh
		return ctx.Err()
	}

	return nil
}

func (as *AgentService) GetAmbient() (*Ambient, error) {
	if as.Ambient == nil {
		return nil, ErrAmbientNotFetched.Error
	}

	return as.Ambient, nil
}
