package remote

import (
	"errors"

	remotego "github.com/dash-app/remote-go"
	"github.com/dash-app/remote-go/aircon"
)

type Remote struct {
	Name   string `json:"name" example:"Bedroom aircon"`
	Type   string `json:"type" example:"AIRCON"`
	Vendor string `json:"vendor" example:"daikin"`
	Model  string `json:"model" example:"daikin01"`
}

type ProvidedRemote struct {
	Aircon *aircon.Remote
	//Light *light.Remote
}

func GetRemote(t, vendor, model string) (*ProvidedRemote, error) {
	switch t {
	case "AIRCON":
		_, err := remotego.AirconFromName(vendor, model)
		if err != nil {
			return nil, err
		}

	}
	return nil, errors.New("unknown remote type")
}
