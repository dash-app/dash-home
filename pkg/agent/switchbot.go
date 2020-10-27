package agent

import (
	"bytes"
	"context"
	"encoding/json"
	"errors"
	"fmt"
	"io/ioutil"
	"net/http"
	"time"
)

type SwitchBot struct {
	Mac     string `json:"mac"`
	Command string `json:"command"`
}

func (as *agentService) PostSwitch(ctx context.Context, mac, command string) error {
	ctx, cancel := context.WithTimeout(ctx, 10*time.Second)
	defer cancel()

	if as.store.Agent == nil {
		return errors.New("agent not initialized")
	}
	agent, err := as.store.Get()
	if err != nil {
		return err
	}
	payload := &SwitchBot{
		Mac:     mac,
		Command: command,
	}

	b, err := json.Marshal(payload)
	if err != nil {
		return err
	}

	// Post Request
	req, err := http.NewRequest(
		"POST",
		fmt.Sprintf("http://%s/api/v1/switchbot", agent.Address),
		bytes.NewBuffer(b),
	)
	if err != nil {
		return err
	}

	// Create HTTP Client
	client := &http.Client{}
	resp, err := client.Do(req)
	if err != nil {
		return err
	}
	if resp.StatusCode != http.StatusOK {
		var r map[string]string
		body, _ := ioutil.ReadAll(resp.Body)
		if err := json.Unmarshal(body, &r); err != nil {
			return err
		}
		return errors.New(r["error"])
	}
	resp.Body.Close()
	return nil
}
