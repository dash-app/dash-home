package room

import "github.com/dash-app/dash-home/pkg/storage"

// Subset - Room subset
type Subset struct {
	Store *storage.RoomStore
}

type Room interface {
	Create(string) (*storage.Room, error)
	Get() (*storage.Room, error)
}

type roomService struct {
	store *storage.RoomStore
}

func New(subset *Subset) Room {
	return &roomService{
		store: subset.Store,
	}
}

func (rs *roomService) Get() (*storage.Room, error) {
	r, err := rs.store.Get()
	if err != nil {
		return nil, err
	}
	return r, nil
}

func (rs *roomService) Create(name string) (*storage.Room, error) {
	r, err := rs.store.Create(name)
	if err != nil {
		return nil, err
	}

	return r, nil
}
