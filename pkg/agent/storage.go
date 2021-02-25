package agent

import (
	"encoding/json"
	"errors"
	"io/ioutil"
	"os"

	"github.com/google/uuid"
)

type Storage struct {
	Path  string
	Agent *Agent
}

func NewStorage(basePath string) (*Storage, error) {
	store := &Storage{
		Path: basePath + "/" + "agent.json",
	}

	if _, err := os.Stat(store.Path); os.IsNotExist(err) {
		// Create default agent
		if _, err := store.Create("localhost:8081"); err != nil {
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

func (s *Storage) Create(address string) (*Agent, error) {
	if s.Agent != nil {
		return nil, errors.New("agent already exists")
	}

	s.Agent = &Agent{
		ID: func() string {
			r, _ := uuid.NewUUID()
			return r.String()
		}(),
		Address: address,
		Online:  false,
	}

	return s.Agent, s.save()
}

func (s *Storage) Get() (*Agent, error) {
	if s.Agent == nil {
		return nil, errors.New("agent not found")
	}

	return s.Agent, nil
}

// Load - load from local storage
func (s *Storage) load() error {
	b, err := ioutil.ReadFile(s.Path)
	if err != nil {
		return err
	}
	if err := json.Unmarshal(b, &s.Agent); err != nil {
		return err
	}
	return nil
}

// Save - sync to local storage
func (s *Storage) save() error {
	b, err := json.Marshal(s.Agent)
	if err != nil {
		return err
	}

	// Do Save
	if err := ioutil.WriteFile(s.Path, b, os.ModePerm); err != nil {
		return err
	}

	return nil
}
