package agent

import (
	"context"
	"errors"
	"time"

	"github.com/dash-app/remote-go/hex"
)

func (as *agentService) SendIR(ctx context.Context, hex *hex.HexCode) error {
	ctx, cancel := context.WithTimeout(ctx, 10*time.Second)
	defer cancel()

	if as.store.Agent == nil {
		return errors.New("agent not initialized")
	}

	// TODO: Request to Pigent (with context)

}
