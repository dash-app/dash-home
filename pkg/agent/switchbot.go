package agent

import (
	"bytes"
	"context"
	"encoding/json"
	"errors"
	"fmt"
	"io/ioutil"
	"net/http"
	"regexp"
	"time"
)

type SwitchBot struct {
	Mac   string `json:"mac" example:"xx:xx:xx:xx:xx:xx"`
	Type  string `json:"type" example:"TOGGLE"`
	State string `json:"state" example:"ON"`
}

type postPayload struct {
	Mac     string `json:"mac" example:"xx:xx:xx:xx:xx:xx"`
	Command string `json:"command" example:"ON"`
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
	payload := &postPayload{
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

// ValidateMacAddress - Check mac address range & format
func (sb *SwitchBot) ValidateMacAddress() bool {
	checkSize := 17 // (xx) + (:xx)*5 = 2 + (3*5)
	r := regexp.MustCompile(`[0-9a-f]{2}(:[0-9a-f]{2}){5}`)
	return (r.Match([]byte(sb.Mac)) && len(sb.Mac) == checkSize)
}
