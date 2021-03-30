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

	"github.com/dash-app/remote-go/aeha"
	"github.com/dash-app/remote-go/hex"
)

type IRCode struct {
	Code []int `json:"code"`
}

type Payload struct {
	Signal   []int `json:"signal"`
	Interval int   `json:"interval,omitempty"`
}

func (as *AgentService) SendIR(ctx context.Context, id string, h []*hex.HexCode) error {
	ctx, cancel := context.WithTimeout(ctx, 10*time.Second)
	defer cancel()

	if as.Storage.Agents == nil || len(as.Storage.Agents) == 0 {
		return errors.New("agent not initialized")
	}

	// Get Agent from store (must be move...)
	agent := as.Storage.GetByID(id)
	if agent == nil {
		return ErrNotFound.Error
	}

	// NOTE: Not working?
	//if !agent.Online {
	//	return errors.New("agent is not online")
	//}
	var payload []Payload
	for _, code := range h {
		switch code.Format {
		default:
			fallthrough
		case hex.AEHA:
			payload = append(payload, Payload{
				Signal:   aeha.SignalToCode(430, code.Code, 13300),
				Interval: code.Interval,
			})
		case hex.RAW:
			payload = append(payload, Payload{
				Signal:   code.Raw,
				Interval: code.Interval,
			})
		}
	}

	// Marshal codes
	b, err := json.Marshal(payload)
	if err != nil {
		return err
	}

	// Call API
	req, err := http.NewRequest(
		"POST",
		fmt.Sprintf("http://%s/api/v1/ir", agent.Address),
		bytes.NewBuffer(b),
	)
	if err != nil {
		return err
	}

	req.Header.Set("Content-Type", "application/json")

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
