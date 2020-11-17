package controller

import "errors"

// ErrValidateMacAddress - When error occurred while in validate mac address...
var ErrValidateMacAddress = errors.New("invalid mac address")

// ErrInvalidType - When provided invalid type
var ErrInvalidType = errors.New("invalid type provided")
