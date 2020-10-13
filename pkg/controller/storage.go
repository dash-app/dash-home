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

type Options struct {
	// Remote
	Remote *Remote `json:"remote,omitempty"`

	// Switch....
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
func (s *Storage) Update(id string, name, kind, t string, opts *Options) (*Entry, error) {
	// Get By ID
	entry, err := s.GetByID(id)
	if err != nil {
		return nil, err
	}

	// Replace new values
	entry.Name = name

	// Rebuild struct when the kind / remote is different
	if entry.Remote != nil {
		entry.Kind = kind
		entry.Type = t

		// Purge when trying different kind / type
		if entry.Kind != kind || entry.Type != t {
			entry.Remote = nil
			entry.Aircon = nil
		}

		switch t {
		case "REMOTE":
			if opts.Remote == nil {
				return nil, errors.New("remote is null")
			}

			// When Update (not new)
			if entry.Remote != nil &&
				(entry.Remote.Vendor != opts.Remote.Vendor || entry.Remote.Model != opts.Remote.Model) {
				entry.Remote = &Remote{
					Vendor: opts.Remote.Vendor,
					Model:  opts.Remote.Model,
				}

				if err := entry.initRemote(); err != nil {
					return nil, err
				}
			}
		default:
			return nil, errors.New("unsupported kind")
		}
	}

	s.Entries[entry.ID] = entry
	return entry, s.Save()
}

// Create - Create new Controller
func (s *Storage) Create(name, kind, t string, opts *Options) (*Entry, error) {
	if e, err := s.GetByName(name); err != nil && errors.Is(err, errors.New("not found")) {
		return nil, err
	} else if e != nil {
		return nil, errors.New("already exists")
	}

	id, _ := uuid.NewUUID()
	entry := &Entry{
		ID:   id.String(),
		Name: name,
	}

	// Set kind
	switch kind {
	case "AIRCON":
		entry.Kind = kind
	default:
		return nil, errors.New("unsupported kind")
	}

	// Set Type
	switch t {
	case "REMOTE":
		entry.Type = t
		entry.Remote = &Remote{
			Vendor: opts.Remote.Vendor,
			Model:  opts.Remote.Model,
		}
		if err := entry.initRemote(); err != nil {
			return nil, err
		}
	default:
		return nil, errors.New("unsupported type")
	}

	s.Entries[id.String()] = entry
	return entry, s.Save()
}

// initRemote - Initialize Remote Controller (Inject default state)
func (e *Entry) initRemote() error {
	switch e.Kind {
	case "AIRCON":
		remote, err := e.Remote.GetAircon()
		if err != nil {
			return err
		}
		if state, err := aircon.DefaultState(remote.Remote.Template()); err == nil {
			e.Aircon = state
		} else {
			return err
		}
	default:
		return errors.New("unsupported kind")
	}

	return nil
}
