package storage

import (
	"encoding/json"
	"errors"
	"io/ioutil"
	"os"

	"github.com/google/uuid"
)

const AGENT_FILE = "agent.json"

// AgentStore - Store definition of Agent
type AgentStore struct {
	Path  string
	Agent *Agent
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

func NewAgentStore(basePath string) (*AgentStore, error) {
	store := &AgentStore{
		Path: basePath + "/" + AGENT_FILE,
	}

	if _, err := os.Stat(store.Path); os.IsNotExist(err) {
		// Create default agent
		if _, err := store.Create("localhost:8081"); err != nil {
			return nil, err
		}
		if err := store.save(); err != nil {
			return nil, err
		}
	} else if err == nil {
		// Load
		if err := store.load(); err != nil {
			return nil, err
		}
	} else {
		return nil, err
	}

	return store, nil
}

func (as *AgentStore) Create(address string) (*Agent, error) {
	if as.Agent != nil {
		return nil, errors.New("agent already exists")
	}

	as.Agent = &Agent{
		ID: func() string {
			r, _ := uuid.NewUUID()
			return r.String()
		}(),
		Address: address,
		Online:  false,
	}

	return as.Agent, as.save()
}

func (as *AgentStore) Get() (*Agent, error) {
	if as.Agent == nil {
		return nil, errors.New("agent not found")
	}

	return as.Agent, nil
}

// Load - load from local storage
func (as *AgentStore) load() error {
	b, err := ioutil.ReadFile(as.Path)
	if err != nil {
		return err
	}
	if err := json.Unmarshal(b, &as.Agent); err != nil {
		return err
	}
	return nil
}

// Save - sync to local storage
func (as *AgentStore) save() error {
	b, err := json.Marshal(as.Agent)
	if err != nil {
		return err
	}

	// Do Save
	if err := ioutil.WriteFile(as.Path, b, os.ModePerm); err != nil {
		return err
	}

	return nil
}
