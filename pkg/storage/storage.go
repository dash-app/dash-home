package storage

import (
	"os"

	"github.com/sirupsen/logrus"
)

type Storage struct {
	Path string

	// Store
	agent *AgentStore
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

	return &Storage{
		Path:  path,
		agent: agent,
	}, nil
}

func (s *Storage) GetAgent() {

}
