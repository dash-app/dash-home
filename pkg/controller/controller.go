package controller

type Controller interface {
}

type controllerService struct {
	// Store?
}

// Remote - Declare Remote controller
type Remote struct {
	Vendor string `json:"vendor"`
	Model  string `json:"model"`
}

func New() Controller {
	return &controllerService{}
}
