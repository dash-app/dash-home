package controller

import (
	"errors"

	remotego "github.com/dash-app/remote-go"
	"github.com/dash-app/remote-go/template"
)

// Remote - Declare Remote controller
type Remote struct {
	Vendor string `json:"vendor"`
	Model  string `json:"model"`
}

func (r *Remote) GetAircon() (*remotego.Aircon, error) {
	return remotego.AirconFromName(r.Vendor, r.Model)
}

func (r *Remote) GetTemplate(kind string) (*template.Template, error) {
	switch kind {
	case "AIRCON":
		aircon, err := remotego.AirconFromName(r.Vendor, r.Model)
		if err != nil {
			return nil, err
		}
		return aircon.Remote.Template(), nil
	default:
		return nil, errors.New("invalid kind provided")
	}
}
