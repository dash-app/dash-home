package controller

import (
	"github.com/dash-app/remote-go/appliances"
)

// EntrySet - Combined remote-go entry (aircon, light etc.)
type EntrySet struct {
	Remote    appliances.Request `json:"remote,omitempty"`
	SwitchBot *SwitchBotEntry    `json:"switchbot,omitempty"`
}

// SwitchBotEntry - request entry of switchbot
type SwitchBotEntry struct {
	Command string `json:"command,omitempty"`
}

// PushResult - result of push
type PushResult struct {
	// Aircon - use entry (return current mode)
	Aircon *appliances.Aircon `json:"aircon,omitempty"`

	// Light - use state (return all values)
	Light *appliances.LightState `json:"light,omitempty"`

	// SwitchBot - use entry (return requested command)
	SwitchBot *SwitchBotEntry `json:"switchbot,omitempty"`
}
