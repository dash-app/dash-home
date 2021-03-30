package agent

import (
	"errors"

	"github.com/dash-app/dash-home/pkg/status"
)

// ErrNotFound - When agent does not exists
var ErrNotFound = &status.Error{
	Error: errors.New("agent not found"),
	Code:  "ERR_AGENT_NOT_FOUND",
}

// ErrAlreadyExists - When already exists
var ErrAlreadyExists = &status.Error{
	Error: errors.New("already exists"),
	Code:  "ERR_AGENT_ALREADY_EXISTS",
}

// ErrNoAgent - When there is no agent
var ErrNoAgent = &status.Error{
	Error: errors.New("no agents"),
	Code:  "ERR_NO_AGENT",
}

// ErrAmbientNotFetched - When ambient not fetched
var ErrAmbientNotFetched = &status.Error{
	Error: errors.New("ambient not fetched"),
	Code:  "ERR_AMBIENT_NOT_FETCHED",
}
