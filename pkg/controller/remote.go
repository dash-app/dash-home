package controller

import (
	remotego "github.com/dash-app/remote-go"
)

// Remote - Declare Remote controller
type Remote struct {
	Vendor string `json:"vendor"`
	Model  string `json:"model"`
}

func (r *Remote) GetAircon() (*remotego.Aircon, error) {
	return remotego.AirconFromName(r.Vendor, r.Model)
}
