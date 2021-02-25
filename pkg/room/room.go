package room

import "github.com/dash-app/dash-home/pkg/agent"

type RoomService struct {
	Storage *Storage
	Agent   *agent.AgentService
}

type Room struct {
	// ID - Room ID
	ID string `json:"id"`

	// Name - Room name (ex: `john's room`)
	Name string `json:"name" example:"john's room"`

	// Ambient - Room ambient (from agent)
	Ambient *agent.Ambient `json:"ambient"`
}

func New(basePath string, agent *agent.AgentService) (*RoomService, error) {
	store, err := NewStorage(basePath)
	if err != nil {
		return nil, err
	}

	return &RoomService{
		Storage: store,
		Agent:   agent,
	}, nil
}

func (rs *RoomService) Get() (*Room, error) {
	// Get Room Entry
	e, err := rs.Storage.Get()
	if err != nil {
		return nil, err
	}

	// Get Ambient
	ambient, err := rs.Agent.GetAmbient()
	if err != nil {
		return nil, err
	}

	return &Room{
		ID:      e.ID,
		Name:    e.Name,
		Ambient: ambient,
	}, nil
}
