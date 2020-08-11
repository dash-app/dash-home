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

func (as *agentService) SendIR(ctx context.Context, hex []*hex.HexCode) error {
	ctx, cancel := context.WithTimeout(ctx, 10*time.Second)
	defer cancel()

	if as.store.Agent == nil {
		return errors.New("agent not initialized")
	}

	// TODO: Request to Pigent (with context)
	for _, code := range hex {
		if code.Interval != 0 {
			time.Sleep(time.Duration(code.Interval) * time.Millisecond)
		}

		// Get Agent from store (must be move...)
		agent, err := as.store.Get()
		if err != nil {
			return err
		}

		// NOTE: Not working?
		//if !agent.Online {
		//	return errors.New("agent is not online")
		//}

		payload := &IRCode{
			Code: aeha.SignalToCode(430, code.Code, 13300),
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
	}

	return nil
}
