package models

// Agent - Agent Entry
type Agent struct {
	// ID - Agent ID
	ID string `json:"id"`

	// Address - Agent Address (ex. `localhost:8081`)
	Address string `json:"address" example:"localhost:8081"`

	// Online - Check online
	Online bool `json:"online"`
}
