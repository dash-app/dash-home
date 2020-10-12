package controller

import (
	"errors"
	"os"

	"github.com/dash-app/dash-home/pkg/storage"
	"github.com/dash-app/remote-go/aircon"
	"github.com/google/uuid"
)

type Storage struct {
	Path    string
	Entries map[string]*Entry
}

type Entry struct {
	ID     string        `json:"id,omitempty"`
	Name   string        `json:"name"`
	Kind   string        `json:"kind"`
	Type   string        `json:"type"`
	Remote *Remote       `json:"remote,omitempty"`
	Aircon *aircon.State `json:"aircon,omitempty"`
}

func NewStorage(basePath string) (*Storage, error) {
	store := &Storage{
		Path:    basePath + "/" + "controllers.json",
		Entries: make(map[string]*Entry),
	}
	if _, err := os.Stat(store.Path); os.IsNotExist(err) {
		return store, store.Save()
	} else if err == nil {
		if err := store.Load(); err != nil {
			return nil, err
		}
	} else {
		return nil, err
	}
	return store, nil
}

func (s *Storage) Load() error {
	return storage.Load(s.Path, &s.Entries)
}

func (s *Storage) Save() error {
	return storage.Save(s.Path, &s.Entries)
}

// GetAll - Get all controllers
func (s *Storage) GetAll() map[string]*Entry {
	return s.Entries
}

// GetByName - Get Controller by Name
func (s *Storage) GetByName(name string) (*Entry, error) {
	for _, v := range s.Entries {
		if v.Name == name {
			return v, nil
		}
	}
	return nil, errors.New("not found")
}

func (s *Storage) GetByID(id string) (*Entry, error) {
	e := s.Entries[id]
	if e != nil {
		return e, nil
	}
	return nil, errors.New("not found")
}

// Update - Update Controller
func (s *Storage) Update(id string, e *Entry) (*Entry, error) {
	// Get By ID
	oldEntry, err := s.GetByID(id)
	if err != nil {
		return nil, err
	}

	// Rebuild struct when the kind / remote is different
	if oldEntry.Kind != e.Kind || oldEntry.Type != e.Type {
		newEntry := &Entry{
			ID:     e.ID,
			Name:   e.Name,
			Kind:   e.Kind,
			Type:   e.Type,
			Remote: e.Remote,
		}
		s.Entries[e.ID] = newEntry
		return newEntry, s.Save()
	}

	s.Entries[e.ID] = e
	return e, s.Save()
}

// create - Create new Controller
func (s *Storage) create(name, kind string) (*Entry, error) {
	if e, err := s.GetByName(name); err != nil && err.Error() != "not found" {
		return nil, err
	} else if e != nil {
		return nil, errors.New("already exists")
	}

	id, _ := uuid.NewUUID()
	entry := &Entry{
		ID:   id.String(),
		Name: name,
	}
	s.Entries[id.String()] = entry
	return entry, s.Save()
}

// CreateRemote - Create Remote Controller
func (s *Storage) CreateRemote(id, kind, vendor, model string) (*Entry, error) {
	e, err := s.GetByID(id)
	if err != nil {
		return nil, err
	}

	e.Type = "REMOTE"
	e.Remote = &Remote{
		Vendor: vendor,
		Model:  model,
	}

	switch e.Kind {
	case "AIRCON":
		remote, err := e.Remote.GetAircon()
		if err != nil {
			return nil, err
		}
		if state, err := aircon.DefaultState(remote.Remote.Template()); err == nil {
			e.Aircon = state
		} else {
			return nil, err
		}
	default:
		return nil, errors.New("invalid kind provided")
	}

	return s.Update(id, e)
}
