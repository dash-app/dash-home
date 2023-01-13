package room

import (
	"encoding/json"
	"io/ioutil"
	"os"

	"github.com/google/uuid"
)

// Storage - Store definition of Room
type Storage struct {
	Path string
	Room *Entry
}

// Entry - Store of Room
type Entry struct {
	// ID - Room ID
	ID string `json:"id"`

	// Name - Room name (ex: `john's room`)
	Name string `json:"name" example:"john's room"`
}

func NewStorage(basePath string) (*Storage, error) {
	store := &Storage{
		Path: basePath + "/" + "room.json",
	}
	if _, err := os.Stat(store.Path); os.IsNotExist(err) {
		// TODO: Generate default settings?
		// Create File
		//if err := store.Save(); err != nil {
		//	return nil, err
		//}
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

func (s *Storage) Create(name string) (*Entry, error) {
	if s.Room != nil {
		return nil, ErrAlreadyExists.Error
	}

	s.Room = &Entry{
		ID: func() string {
			r, _ := uuid.NewUUID()
			return r.String()
		}(),
		Name: name,
	}

	return s.Room, s.Save()
}

func (s *Storage) Get() (*Entry, error) {
	if s.Room == nil {
		return nil, ErrNotFound.Error
	}

	return s.Room, nil
}

func (s *Storage) Update(name string) (*Entry, error) {
	if s.Room == nil {
		return nil, ErrNotFound.Error
	}

	s.Room.Name = name

	return s.Room, s.Save()
}

func (s *Storage) Load() error {
	b, err := ioutil.ReadFile(s.Path)
	if err != nil {
		return err
	}
	if err := json.Unmarshal(b, &s.Room); err != nil {
		return err
	}
	return nil
}

func (s *Storage) Save() error {
	b, err := json.Marshal(s.Room)
	if err != nil {
		return err
	}

	// Do Save
	if err := ioutil.WriteFile(s.Path, b, os.ModePerm); err != nil {
		return err
	}

	return nil
}
