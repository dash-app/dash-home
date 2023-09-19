package agent

import (
	"encoding/json"
	"io/ioutil"
	"os"
	"reflect"

	"github.com/google/uuid"
	"github.com/k0kubun/pp"
	"github.com/sirupsen/logrus"
)

type Storage struct {
	Path         string
	Agents       []*Agent
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

	s.Agents = append(s.Agents, newAgent)

	return newAgent, s.save()
}

// Remove - Remove agent
func (s *Storage) Remove(id string) error {
	// Get By ID
	if agent := s.GetByID(id); agent == nil {
		return ErrNotFound.Error
	} else if agent.Default {
		return ErrRemoveDefaultAgent.Error
	}

	targetPos := -1
	for i := range s.Agents {
		if s.Agents[i].ID == id {
			targetPos = i
		}
	}

	s.Agents = append(s.Agents[:targetPos], s.Agents[targetPos+1:]...)
	newAgents := make([]*Agent, len(s.Agents))
	copy(newAgents, s.Agents)

	return s.save()
}

// Update - Update agent settings
func (s *Storage) Update(id string, entry *Agent, whenUpdated func(Agent)) (*Agent, error) {
	oldEntry := s.GetByID(id)
	if oldEntry == nil {
		return nil, ErrNotFound.Error
	}

	// Check another default agent exists
	if oldEntry.Default && !entry.Default {
		foundDefault := false
		for i := range s.Agents {
			if s.Agents[i].ID != id && s.Agents[i].Default {
				foundDefault = true
			}
		}
		if !foundDefault {
			return nil, ErrDefaultAgentRequired.Error
		}
	}

	// Turn off another default agent
	if !oldEntry.Default && entry.Default {
		for i := range s.Agents {
			if s.Agents[i].Default {
				s.Agents[i].Default = false
			}
		}
	}

	logrus.Println("[Agent] Update requested")

	// Run Update
	for i := range s.Agents {
		if s.Agents[i].ID != id {
			continue
		}

		pp.Println(s.Agents[i])
		pp.Println(entry)

		// Run Update
		if ok := reflect.DeepEqual(s.Agents[i], entry); !ok {
			logrus.Debugf("[Agent] Update Agent entry")
			s.Agents[i] = entry
			whenUpdated(*entry)
			return entry, s.save()
		} else {
			logrus.Debugf("[Agent] Skipped")
		}

		return entry, nil
	}

	return entry, nil
}

// GetByAddress - Return agent by Address
func (s *Storage) GetByAddress(address string) *Agent {
	for _, a := range s.Agents {
		if a.Address == address {
			return a
		}
	}
	return nil
}

// GetByID - Return agent by ID
func (s *Storage) GetByID(id string) *Agent {
	var copiedAgent Agent
	for _, a := range s.Agents {
		if a.ID == id {
			copiedAgent = *a
			return &copiedAgent
		}
	}
	return nil
}

// GetDefaultAgent - Return default agent
func (s *Storage) GetDefaultAgent() (Agent, error) {
	if s.DefaultAgent == nil {
		for _, a := range s.Agents {
			if a.Default {
				s.DefaultAgent = a
				return *a, nil
			}
		}
		return Agent{}, ErrNotFound.Error
	}
	return *s.DefaultAgent, nil
}

// GetAll - Get all agents
func (s *Storage) GetAll() ([]Agent, error) {
	if s.Agents == nil || len(s.Agents) == 0 {
		return nil, ErrNoAgent.Error
	}

	var copiedAgents []Agent
	for _, agent := range s.Agents {
		copiedAgents = append(copiedAgents, *agent)
	}

	return copiedAgents, nil
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
