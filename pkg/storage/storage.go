package storage

import (
	"encoding/json"
	"io/ioutil"
	"os"

	"github.com/sirupsen/logrus"
)

type Storage struct {
	Path string

	// Store
	*AgentStore
	*RoomStore
}

type Adapter interface {
	Load() error
	Save() error
}

func New(path string) (*Storage, error) {
	if _, err := os.Stat(path); os.IsNotExist(err) {
		logrus.Infof("[Storage] Directory not found. Creating...")
		if err := os.Mkdir(path, os.ModePerm); err != nil {
			return nil, err
		}
	}

	logrus.Infof("[Storage] Using local storage: %s", path)

	agent, err := NewAgentStore(path)
	if err != nil {
		return nil, err
	}

	room, err := NewRoomStore(path)
	if err != nil {
		return nil, err
	}

	return &Storage{
		Path:       path,
		AgentStore: agent,
		RoomStore:  room,
	}, nil
}

func Load(path string, entry interface{}) error {
	b, err := ioutil.ReadFile(path)
	if err != nil {
		return err
	}
	if err := json.Unmarshal(b, &entry); err != nil {
		return err
	}
	return nil
}

func Save(path string, entry interface{}) error {
	b, err := json.Marshal(entry)
	if err != nil {
		return err
	}
	if err := ioutil.WriteFile(path, b, os.ModePerm); err != nil {
		return err
	}
	return nil
}
