package agent

import (
	"context"
	"encoding/json"
	"errors"
	"fmt"
	"io/ioutil"
	"net/http"
	"time"

	"github.com/dash-app/dash-home/pkg/storage"
	"github.com/dash-app/remote-go/hex"
	"github.com/k0kubun/pp"
	"github.com/sirupsen/logrus"
)

const (
	// PollingPeriod - Polling period seconds for fetch to agent
	PollingPeriod = 5000
)

// Subset - Agent subset
type Subset struct {
	Store *storage.AgentStore
}

type Agent interface {
	Get() (*storage.Agent, error)
	Create(string) (*storage.Agent, error)
	InitPoll()
	Poll(context.Context) error

	// Sensors
	GetAmbient() (*Ambient, error)

	// Remote
	SendIR(context.Context, []*hex.HexCode) error

	// SwitchBot
	PostSwitch(context.Context, string, string) error
}

type agentService struct {
	store   *storage.AgentStore
	ambient *Ambient
}

func New(subset *Subset) Agent {
	return &agentService{
		store: subset.Store,
	}
}

func (as *agentService) Get() (*storage.Agent, error) {
	r, err := as.store.Get()
	if err != nil {
		return nil, err
	}

	return r, nil
}

func (as *agentService) Create(address string) (*storage.Agent, error) {
	r, err := as.store.Create(address)
	if err != nil {
		return nil, err
	}

	return r, nil
}

func (as *agentService) InitPoll() {
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

// TODO: Add polling task
func (as *agentService) Poll(c context.Context) error {
	ctx, cancel := context.WithCancel(c)
	defer cancel()
	if as.store.Agent == nil {
		return errors.New("agent not found")
	}

	address := as.store.Agent.Address
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
		as.ambient = entry
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

func (as *agentService) GetAmbient() (*Ambient, error) {
	if as.ambient == nil {
		return nil, errors.New("ambient not fetched")
	}

	return as.ambient, nil
}
