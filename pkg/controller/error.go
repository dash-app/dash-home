package controller

import (
	"errors"

	"github.com/dash-app/dash-home/pkg/status"
)

// ErrValidateMacAddress - When error occurred while in validate mac address...
var ErrValidateMacAddress = &status.Error{
	Error: errors.New("invalid mac address"),
	Code:  "ERR_INVALID_MAC_ADDRESS",
}

// ErrInvalidType - When provided invalid type
var ErrInvalidType = &status.Error{
	Error: errors.New("invalid type provided"),
	Code:  "ERR_INVALID_TYPE",
}

// ErrNotFound - When controller does not exists
var ErrNotFound = &status.Error{
	Error: errors.New("controller not found"),
	Code:  "ERR_CONTROLLER_NOT_FOUND",
}

// ErrAlreadyExists - When already exists
var ErrAlreadyExists = &status.Error{
	Error: errors.New("already exists"),
	Code:  "ERR_CONTROLLER_ALREADY_EXISTS",
}

// ErrUnsupportedType - When provided unsupported Type
var ErrUnsupportedType = &status.Error{
	Error: errors.New("unsupported type"),
	Code:  "ERR_UNSUPPORTED_TYPE",
}

// ErrUnsupportedKind - When provided unsupported Kind
var ErrUnsupportedKind = &status.Error{
	Error: errors.New("unsupported kind"),
	Code:  "ERR_UNSUPPORTED_KIND",
}

// ErrNameTooLong - When name than 20 characters
var ErrNameTooLong = &status.Error{
	Error: errors.New("name too long"),
	Code:  "ERR_NAME_TOO_LONG",
}
