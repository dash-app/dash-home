package server

import "github.com/dash-app/remote-go/remote"

// CreateRemoteRequest - Crewte new remote request
type CreateRemoteRequest struct {
	Name   string `json:"name" example:"Bedroom aircon"`
	Type   string `json:"type" example:"AIRCON"`
	Vendor string `json:"vendor" example:"daikin"`
	Model  string `json:"model" example:"daikin01"`
}

// CreateRemoteResponse - Create remote response
type CreateRemoteResponse struct {
	Remote remote.Aircon
}
