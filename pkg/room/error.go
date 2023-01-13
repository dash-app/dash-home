package room

import (
	"errors"

	"github.com/dash-app/dash-home/pkg/status"
)

// ErrNotFound - When room does not exists
var ErrNotFound = &status.Error{
	Error: errors.New("room not found"),
	Code:  "ERR_ROOM_NOT_FOUND",
}

// ErrNameIsEmpty - When room name is empty
var ErrNameIsEmpty = &status.Error{
	Error: errors.New("room name is not provided"),
	Code:  "ERR_ROOM_NAME_IS_EMPTY",
}

// ErrAlreadyExists - When already exists
var ErrAlreadyExists = &status.Error{
	Error: errors.New("room already exists"),
	Code:  "ERR_ROOM_ALREADY_EXISTS",
}
