package remote

type Remote struct {
	Name   string `json:"name" example:"Bedroom aircon"`
	Type   string `json:"type" example:"AIRCON"`
	Vendor string `json:"vendor" example:"daikin"`
	Model  string `json:"model" example:"daikin01"`
}
