package agent

import (
	"encoding/json"
	"io/ioutil"
	"os"

	"github.com/google/uuid"
)

type Storage struct {
	Path         string
	Agents       []Agent
	DefaultAgent *Agent
}

func NewStorage(basePath string) (*Storage, error) {
	store := &Storage{
		Path: basePath + "/" + "agents.json",
	}

	if _, err := os.Stat(store.Path); os.IsNotExist(err) {
		// Add default agent
		if _, err := store.Add("localhost:8081", true, "default"); err != nil {
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

func (s *Storage) Add(address string, isDefault bool, label string) (*Agent, error) {
	if s.GetByAddress(address) != nil {
		return nil, ErrAlreadyExists.Error
	}

	newAgent := &Agent{
		ID: func() string {
			r, _ := uuid.NewUUID()
			return r.String()
		}(),
		Address: address,
		Default: isDefault,
		Label:   label,
		Online:  false,
	}

	s.Agents = append(s.Agents, *newAgent)

	return newAgent, s.save()
}

// GetByAddress - Return agent by Address
func (s *Storage) GetByAddress(address string) *Agent {
	for _, a := range s.Agents {
		if a.Address == address {
			return &a
		}
	}
	return nil
}

// GetByID - Return agent by ID
func (s *Storage) GetByID(id string) *Agent {
	for _, a := range s.Agents {
		if a.ID == id {
			return &a
		}
	}
	return nil
}

// GetDefaultAgent - Return default agent
func (s *Storage) GetDefaultAgent() *Agent {
	if s.DefaultAgent == nil {
		for _, a := range s.Agents {
			if a.Default {
				s.DefaultAgent = &a
				return &a
			}
		}
		return nil
	}
	return s.DefaultAgent
}

// GetAll - Get all agents
func (s *Storage) GetAll() ([]Agent, error) {
	if s.Agents == nil || len(s.Agents) == 0 {
		return nil, ErrNoAgent.Error
	}

	return s.Agents, nil
}

// Load - load from local storage
func (s *Storage) load() error {
	b, err := ioutil.ReadFile(s.Path)
	if err != nil {
		return err
	}
	if err := json.Unmarshal(b, &s.Agents); err != nil {
		return err
	}
	return nil
}

// Save - sync to local storage
func (s *Storage) save() error {
	b, err := json.Marshal(s.Agents)
	if err != nil {
		return err
	}

	// Do Save
	if err := ioutil.WriteFile(s.Path, b, os.ModePerm); err != nil {
		return err
	}

	return nil
}
