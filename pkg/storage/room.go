package storage

import (
	"encoding/json"
	"errors"
	"io/ioutil"
	"os"

	"github.com/google/uuid"
)

const ROOM_FILE = "room.json"

// RoomStore - Store definition of Room
type RoomStore struct {
	Path string
	Room *Room
}

// Room - Store of Room
type Room struct {
	// ID - Room ID
	ID string `json:"id"`

	// Name - Room name (ex: `john's room`)
	Name string `json:"name" example:"john's room"`

	// Remotes - Remote IDs
	Remotes []string `json:"remotes"`
}

func NewRoomStore(basePath string) (*RoomStore, error) {
	store := &RoomStore{
		Path: basePath + "/" + ROOM_FILE,
	}

	if _, err := os.Stat(store.Path); os.IsNotExist(err) {
		// TODO: Generate default settings?
		// Create File
		//if err := store.Save(); err != nil {
		//	return nil, err
		//}
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

func (rs *RoomStore) Create(name string) (*Room, error) {
	if rs.Room != nil {
		return nil, errors.New("room already exists")
	}

	rs.Room = &Room{
		ID: func() string {
			r, _ := uuid.NewUUID()
			return r.String()
		}(),
		Name: name,
	}

	return rs.Room, rs.save()
}

func (rs *RoomStore) Get() (*Room, error) {
	if rs.Room == nil {
		return nil, errors.New("room not found")
	}

	return rs.Room, nil
}

func (rs *RoomStore) load() error {
	b, err := ioutil.ReadFile(rs.Path)
	if err != nil {
		return err
	}
	if err := json.Unmarshal(b, &rs.Room); err != nil {
		return err
	}
	return nil
}

func (rs *RoomStore) save() error {
	b, err := json.Marshal(rs.Room)
	if err != nil {
		return err
	}

	// Do Save
	if err := ioutil.WriteFile(rs.Path, b, os.ModePerm); err != nil {
		return err
	}

	return nil
}
