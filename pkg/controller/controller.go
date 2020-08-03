package controller

import (
	"encoding/json"
	"fmt"
	"reflect"

	"github.com/dash-app/remote-go/aircon"
)

type Controller struct {
	Storage *Storage
}

func New(basePath string) (*Controller, error) {
	store, err := NewStorage(basePath)
	if err != nil {
		return nil, err
	}

	c := &Controller{
		Storage: store,
	}

	return c, nil
}

// SendAsRemote - Send IR Signal as Remote (Scan payload, Generate Code)
func (e *Entry) SendAsRemote(payload []byte) error {
	switch e.Kind {
	case "AIRCON":
		// Scan
		var ac *aircon.Entry
		if err := json.Unmarshal(payload, &ac); err != nil {
			return fmt.Errorf("failed recognize type: %s", reflect.TypeOf(payload))
		}
	}

	return nil
}
