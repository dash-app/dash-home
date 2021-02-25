package agent

import (
	"context"
	"encoding/json"
	"errors"
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

// Get - Get agent entry
func (as *AgentService) Get() (*Agent, error) {
	r, err := as.Storage.Get()
	if err != nil {
		return nil, err
	}

	return r, nil
}

// Create - Create agent entry
func (as *AgentService) Create(address string) (*Agent, error) {
	r, err := as.Storage.Create(address)
	if err != nil {
		return nil, err
	}

	return r, nil
}

// InitPoll - Start Poll task
func (as *AgentService) InitPoll() {
	// NOTE: Must be use context

	go func() {
		// First Polling
		ctx, cancel := context.WithTimeout(context.Background(), 3*time.Second)
		if err := as.Poll(ctx); err != nil {
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
				if err := as.Poll(ctx); err != nil {
					logrus.WithError(err).Errorf("[Poll]")
				}
				cancel()
			case <-quit:
				ticker.Stop()
				return
			}
		}
	}()
}

// Poll - Execute Poll
func (as *AgentService) Poll(c context.Context) error {
	ctx, cancel := context.WithCancel(c)
	defer cancel()
	if as.Storage.Agent == nil {
		return errors.New("agent not found")
	}

	address := as.Storage.Agent.Address
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
			errCh <- err
			return
		}
		defer resp.Body.Close()
		b, _ := ioutil.ReadAll(resp.Body)
		var entry *Ambient
		if err := json.Unmarshal(b, &entry); err != nil {
			errCh <- err
			return
		}
		entry.LastFetch = time.Now().UTC()
		as.Ambient = entry
		logrus.Debugf("[Poll] Fetched: %v", pp.Sprint(entry))
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
		return nil, errors.New("ambient not fetched")
	}

	return as.Ambient, nil
}
