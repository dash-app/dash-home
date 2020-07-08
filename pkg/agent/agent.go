package agent

import (
	"encoding/json"
	"errors"
	"fmt"
	"io/ioutil"
	"net/http"
	"time"

	"github.com/dash-app/dash-home/pkg/storage"
	"github.com/sirupsen/logrus"
)

// Subset - Agent subset
type Subset struct {
	Store *storage.AgentStore
}

type Agent interface {
	Get() (*storage.Agent, error)
	Create(string) (*storage.Agent, error)
	InitPoll()
	Poll() error
	Sensors()
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

	// Start Poll Task
	ticker := time.NewTicker(3 * time.Second)
	quit := make(chan struct{})
	go func() {
		for {
			select {
			case <-ticker.C:
				// TODO: ping
				if err := as.Poll(); err != nil {
					logrus.WithError(err).Errorf("[Poll]")
				}

			case <-quit:
				ticker.Stop()
				return
			}
		}
	}()
}

// TODO: Add polling task
func (as *agentService) Poll() error {
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

	client := &http.Client{}
	resp, err := client.Do(req)
	if err != nil {
		return err
	}
	defer resp.Body.Close()
	b, _ := ioutil.ReadAll(resp.Body)
	var entry *Ambient
	if err := json.Unmarshal(b, &entry); err != nil {
		return err
	}
	entry.LastFetch = time.Now()
	as.ambient = entry

	return nil
}

func (as *agentService) Sensors() {
	// TODO

}
