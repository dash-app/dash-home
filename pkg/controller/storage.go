package controller

import (
	"errors"
	"os"
	"strings"

	"github.com/dash-app/dash-home/pkg/agent"
	"github.com/dash-app/dash-home/pkg/storage"
	remotego "github.com/dash-app/remote-go"
	"github.com/dash-app/remote-go/aircon"
	"github.com/dash-app/remote-go/light"
	"github.com/dash-app/remote-go/template"
	"github.com/google/uuid"
)

type Storage struct {
	Path    string
	Entries map[string]*Entry
	Remotes *remotego.Remote
}

type Entry struct {
	// ID - Generated ID
	ID string `json:"id,omitempty" example:"<UNIQUE_ID>"`

	// Name - ex. Bedroom Airconditioner
	Name string `json:"name" validate:"required" example:"Bedroom Airconditioner"`

	// Kind - AIRCON, LIGHT, SWITCHBOT...
	Kind string `json:"kind" validate:"required" example:"AIRCON"`

	// Type - type of controller (how to use?) / ex. REMOTE, SWITCHBOT...
	Type string `json:"type" validate:"required" example:"REMOTE"`

	// Remote - Remote Controller settings (required when type is REMOTE)
	Remote *Remote `json:"remote,omitempty"`

	// SwitchBot - SwitchBot settings (required when type is SWITCHBOT)
	SwitchBot *agent.SwitchBot `json:"switchbot,omitempty"`

	// Aircon - State of Aircon
	Aircon *aircon.State `json:"aircon,omitempty"`

	// Light - State of Light
	Light *light.State `json:"light,omitempty"`
}

type Options struct {
	// Remote
	Remote *Remote `json:"remote,omitempty"`

	// Switch....
	SwitchBot *agent.SwitchBot `json:"switchbot,omitempty"`
}

func NewStorage(basePath string, remotes *remotego.Remote) (*Storage, error) {
	store := &Storage{
		Path:    basePath + "/" + "controllers.json",
		Entries: make(map[string]*Entry),
		Remotes: remotes,
	}
	if _, err := os.Stat(store.Path); os.IsNotExist(err) {
		return store, store.Save()
	} else if err == nil {
		if err := store.Load(); err != nil {
			return nil, err
		}
	} else {
		return nil, err
	}
	return store, nil
}

func (s *Storage) Load() error {
	return storage.Load(s.Path, &s.Entries)
}

func (s *Storage) Save() error {
	return storage.Save(s.Path, &s.Entries)
}

// GetAll - Get all controllers
func (s *Storage) GetAll() map[string]*Entry {
	return s.Entries
}

// GetByName - Get Controller by Name
func (s *Storage) GetByName(name string) (*Entry, error) {
	for _, v := range s.Entries {
		if v.Name == name {
			return v, nil
		}
	}
	return nil, errors.New("not found")
}

func (s *Storage) GetByID(id string) (*Entry, error) {
	e := s.Entries[id]
	if e != nil {
		return e, nil
	}
	return nil, errors.New("not found")
}

// Update - Update Controller
func (s *Storage) Update(id string, name, kind, t string, opts *Options) (*Entry, error) {
	// Get By ID
	oldEntry, err := s.GetByID(id)
	if err != nil {
		return nil, err
	}

	// TODO: ↓ここで新しいデータを作らず、oldEntryに対してそれぞれ新しい情報を代入してあげれば良くない？
	// TODO: newEntryではValidateを通過させるためでしかないので、構造体内のデータにすべてSet関数を持たせて個別にValidateさせるほうが良いのでは？
	// NOTE: Validation済みのデータを取得する (Remoteの場合は必要なデータも生成される。)
	entry, err := s.newEntry(id, name, kind, t, opts)
	if err != nil {
		return nil, err
	}

	if t == "REMOTE" {
		// NOTE: VendorとModelがそれぞれ変更前と同一の場合は各Stateをコピーする。
		if oldEntry.Remote.Vendor == opts.Remote.Vendor && oldEntry.Remote.Model == opts.Remote.Model {
			// NOTE: Copy old state
			entry.Aircon = oldEntry.Aircon
		}
	}

	s.Entries[entry.ID] = entry
	return entry, s.Save()
}

// Create - Create new Controller
func (s *Storage) Create(name, kind, t string, opts *Options) (*Entry, error) {
	if e, err := s.GetByName(name); err != nil && errors.Is(err, errors.New("not found")) {
		return nil, err
	} else if e != nil {
		return nil, errors.New("already exists")
	}

	id, _ := uuid.NewUUID()
	entry, err := s.newEntry(id.String(), name, kind, t, opts)
	if err != nil {
		return nil, err
	}

	s.Entries[id.String()] = entry
	return entry, s.Save()
}

// Remove - Remove controller
func (s *Storage) Remove(id string) error {
	// Get By ID
	_, err := s.GetByID(id)
	if err != nil {
		return err
	}

	delete(s.Entries, id)
	return s.Save()
}

func (s *Storage) newEntry(id, name, kind, t string, opts *Options) (*Entry, error) {
	entry := &Entry{
		ID:   id,
		Name: name,
	}

	// Set kind
	switch kind {
	case "AIRCON", "LIGHT", "SWITCHBOT":
		entry.Kind = kind
	default:
		return nil, errors.New("unsupported kind")
	}

	// Set Type
	entry.Type = t

	switch t {
	case "REMOTE":
		if opts.Remote == nil {
			return nil, errors.New("remote is null")
		}

		entry.Remote = &Remote{
			Vendor: opts.Remote.Vendor,
			Model:  opts.Remote.Model,
		}

		template, err := s.Remotes.GetTemplate(entry.Kind, entry.Remote.Vendor, entry.Remote.Model)
		if err != nil {
			return nil, err
		}

		if err := entry.initRemote(template); err != nil {
			return nil, err
		}
	case "SWITCHBOT":
		if opts.SwitchBot == nil {
			return nil, errors.New("switchbot options does not satisfied")
		}

		var initialState string

		// Validate Type
		switch opts.SwitchBot.Type {
		case "TOGGLE":
			initialState = "OFF"
		case "PRESS":
			initialState = "PRESS"
		default:
			return nil, ErrInvalidType
		}

		// Build struct
		entry.SwitchBot = &agent.SwitchBot{
			Mac:   strings.ToLower(opts.SwitchBot.Mac),
			Type:  opts.SwitchBot.Type,
			State: initialState,
		}

		// Call validate
		if ok := entry.SwitchBot.ValidateMacAddress(); !ok {
			return nil, ErrValidateMacAddress
		}

	default:
		return nil, errors.New("unsupported type")
	}

	return entry, nil
}

// initRemote - Initialize Remote Controller (Inject default state)
func (e *Entry) initRemote(template *template.Template) error {
	switch e.Kind {
	case "AIRCON":
		if state, err := aircon.DefaultState(template); err == nil {
			e.Aircon = state
		} else {
			return err
		}
	case "LIGHT":
		if state, err := light.DefaultState(template); err == nil {
			e.Light = state
		} else {
			return err
		}
	default:
		return errors.New("unsupported kind")
	}

	return nil
}
