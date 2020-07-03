package storage

import (
	"encoding/json"
	"io/ioutil"
	"os"

	"github.com/jinzhu/gorm"
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
	Address string `json:"address" example:"localhost:8081"`

	// Online - Check online
	Online bool `json:"online,omitempty"`
}

func NewAgentStore(basePath string) (*AgentStore, error) {
	store := &AgentStore{
		Path: basePath + "/" + AGENT_FILE,
	}

	if _, err := os.Stat(store.Path); os.IsNotExist(err) {
		// TODO: Generate default settings?

		// Create File
		if err := store.Save(); err != nil {
			return nil, err
		}
	} else if err == nil {
		// Load
		if err := store.Load(); err != nil {
			return nil, err
		}
	} else {
		return nil, err
	}

	return store, nil
}

func (as *AgentStore) Create(address string) error {
	as.Agent = &Agent{
		ID:      "agent",
		Address: address,
		Online:  false,
	}

	return nil
}

// Load - load from local storage
func (as *AgentStore) Load() error {
	db, err := gorm.Open("sqlite3", as.Path)
	if err != nil {
		return err
	}
	defer db.Close()
	return nil
}

// Save - sync to local storage
func (as *AgentStore) Save() error {
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
