package models

// Room - room entry
type Room struct {
	// ID - Room ID
	ID string `json:"id"`

	// Name - Room name (ex: `john's room`)
	Name string `json:"name" example:"john's room"`

	// Owner - Room owner (ex: `john doe`)
	Owner string `json:"owner" example:"john doe"`
}
