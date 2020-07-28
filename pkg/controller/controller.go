package controller

type Controller interface {
}

type controllerService struct {
	// Store?
}

func New() Controller {
	return &controllerService{}
}
