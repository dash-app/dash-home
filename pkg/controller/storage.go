package controller

import (
	"errors"
	"os"

	"github.com/dash-app/dash-home/pkg/storage"
	remotego "github.com/dash-app/remote-go"
	"github.com/dash-app/remote-go/aircon"
	"github.com/dash-app/remote-go/template"
	"github.com/google/uuid"
)

type Storage struct {
	Path    string
	Entries map[string]*Entry
	Remotes *remotego.Remote
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

func NewStorage(basePath string, remotes *remotego.Remote) (*Storage, error) {
	store := &Storage{
		Path:    basePath + "/" + "controllers.json",
		Entries: make(map[string]*Entry),
		Remotes: remotes,
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
	oldEntry, err := s.GetByID(id)
	if err != nil {
		return nil, err
	}

	entry, err := s.newEntry(id, name, kind, t, opts)
	if err != nil {
		return nil, err
	}

	// Set Type
	switch t {
	case "REMOTE":
		if oldEntry.Kind == entry.Kind && oldEntry.Type == entry.Type && oldEntry.Remote.Vendor == entry.Remote.Vendor && oldEntry.Remote.Model == entry.Remote.Model {
			// Merge State (Aircon, Light etc...)
			entry.Aircon = oldEntry.Aircon
		}
	default:
		return nil, errors.New("unsupported kind")
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
	entry, err := s.newEntry(id.String(), name, kind, t, opts)
	if err != nil {
		return nil, err
	}

	s.Entries[id.String()] = entry
	return entry, s.Save()
}

func (s *Storage) newEntry(id, name, kind, t string, opts *Options) (*Entry, error) {
	entry := &Entry{
		ID:   id,
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
	entry.Type = t

	switch t {
	case "REMOTE":
		if opts.Remote == nil {
			return nil, errors.New("remote is null")
		}

		entry.Remote = &Remote{
			Vendor: opts.Remote.Vendor,
			Model:  opts.Remote.Model,
		}

		template, err := s.Remotes.GetTemplate(entry.Kind, entry.Remote.Vendor, entry.Remote.Model)
		if err != nil {
			return nil, err
		}

		if err := entry.initRemote(template); err != nil {
			return nil, err
		}
	default:
		return nil, errors.New("unsupported type")
	}

	return entry, nil
}

// initRemote - Initialize Remote Controller (Inject default state)
func (e *Entry) initRemote(template *template.Template) error {
	switch e.Kind {
	case "AIRCON":
		if state, err := aircon.DefaultState(template); err == nil {
			e.Aircon = state
		} else {
			return err
		}
	default:
		return errors.New("unsupported kind")
	}

	return nil
}
