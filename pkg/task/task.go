package task

type TaskService struct {
	Storage *Storage
}

func New(basePath string) (*TaskService, error) {
	t := &TaskService{}
	return t, nil
}
