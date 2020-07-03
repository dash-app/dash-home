package models

// UpdateAgentRequest - Update agent request
type UpdateAgentRequest struct {
	// Address - Agent Address (ex. `localhost:8081`)
	Address string `json:"address" validate:"required" example:"localhost:8081"`
}
