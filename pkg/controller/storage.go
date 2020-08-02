package controller

import (
	"errors"
	"os"

	"github.com/dash-app/dash-home/pkg/storage"
	"github.com/google/uuid"
)

type Storage struct {
	Path    string
	Entries map[string]*Entry
}

type Entry struct {
	ID     string  `json:"id,omitempty"`
	Name   string  `json:"name"`
	Kind   string  `json:"kind"`
	Type   string  `json:"type"`
	Remote *Remote `json:"remote"`
	Aircon *Aircon `json:"aircon,omitempty"`
}

func NewStorage(basePath string) (*Storage, error) {
	store := &Storage{
		Path: basePath + "/" + "controllers.json",
	}
	if _, err := os.Stat(store.Path); os.IsNotExist(err) {
		store.Entries = make(map[string]*Entry)
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
	return storage.Load(s.Path, s.Entries)
}

func (s *Storage) Save() error {
	return storage.Save(s.Path, s.Entries)
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

// Create - Create new controller
func (s *Storage) CreateRemote(name, kind, vendor, model string) (*Entry, error) {
	if e, err := s.GetByName(name); err != nil && err.Error() != "not found" {
		return nil, err
	} else if e != nil {
		return nil, errors.New("already exists")
	}

	id, _ := uuid.NewUUID()
	s.Entries[id.String()] = &Entry{
		ID:   id.String(),
		Name: name,
		Kind: kind,
		Type: "REMOTE",
		Remote: &Remote{
			Vendor: vendor,
			Model:  model,
		},
	}

	// TODO: Put default state for aircon etc.

	return s.Entries[id.String()], s.Save()
}
