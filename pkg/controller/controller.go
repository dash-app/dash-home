package controller

type Controller struct {
	Storage *Storage
}

func New(basePath string) (*Controller, error) {
	store, err := NewStorage(basePath)
	if err != nil {
		return nil, err
	}

	c := &Controller{
		Storage: store,
	}

	return c, nil
}
