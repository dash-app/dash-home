package task

import "time"

type Storage struct {
	Path    string
	Entries []*Entry
}

type Entry struct {
	// ID - Generated ID
	ID string `json:"id,omitempty" example:"<UNIQUE_ID>"`

	// When - time of emit event
	When time.Time `json:"when" example:"2020-01-01 01:02:03 UTC"`

	// Aircon ...
	// Light ....

	// State - Target controller state
	//State controller.State `json:"state"`

}
