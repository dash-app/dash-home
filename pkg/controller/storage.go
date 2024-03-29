package controller

import (
	"errors"
	"os"
	"strings"
	"unicode/utf8"

	"github.com/dash-app/dash-home/pkg/agent"
	"github.com/dash-app/dash-home/pkg/remote"
	"github.com/dash-app/dash-home/pkg/storage"
	remotego "github.com/dash-app/remote-go"
	"github.com/dash-app/remote-go/appliances"
	"github.com/google/uuid"
	"github.com/k0kubun/pp"
)

type Storage struct {
	Path       string
	Entries    map[string]*Entry
	Remotes    *remotego.Remote
	AgentStore *agent.Storage
}

type Entry struct {
	// ID - Generated ID
	ID string `json:"id,omitempty" example:"<UNIQUE_ID>"`

	// AgentID - Use for another agent
	AgentID string `json:"agent_id,omitempty" example:"<AGENT_ID>"`

	// Name - ex. Bedroom Airconditioner
	Name string `json:"name" validate:"required" example:"Bedroom Airconditioner"`

	// Kind - AIRCON, LIGHT, SWITCHBOT...
	Kind appliances.Kind `json:"kind" validate:"required" example:"AIRCON"`

	// Type - type of controller (how to use?) / ex. REMOTE, SWITCHBOT...
	Type string `json:"type" validate:"required" example:"REMOTE"`

	// Remote - Remote Controller settings (required when type is REMOTE)
	Remote *remote.Remote `json:"remote,omitempty"`

	// SwitchBot - SwitchBot settings (required when type is SWITCHBOT)
	SwitchBot *agent.SwitchBot `json:"switchbot,omitempty"`

	// Appliances - State of appliances
	Appliances *appliances.State `json:"appliances,omitempty"`
}

type Options struct {
	// Remote
	Remote *remote.Remote `json:"remote,omitempty"`

	// Switch....
	SwitchBot *agent.SwitchBot `json:"switchbot,omitempty"`

	// AgentID
	AgentID string `json:"agent_id,omitempty"`
}

func NewStorage(basePath string, remotes *remotego.Remote, agents *agent.Storage) (*Storage, error) {
	store := &Storage{
		Path:       basePath + "/" + "controllers.json",
		Entries:    make(map[string]*Entry),
		Remotes:    remotes,
		AgentStore: agents,
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
	return nil, ErrNotFound.Error
}

func (s *Storage) GetByID(id string) (*Entry, error) {
	e := s.Entries[id]
	if e != nil {
		return e, nil
	}
	return nil, ErrNotFound.Error
}

// Update - Update Controller
func (s *Storage) Update(id, name string, kind appliances.Kind, t string, opts *Options) (*Entry, error) {
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
			entry.Appliances = oldEntry.Appliances
		}
	}

	s.Entries[entry.ID] = entry
	return entry, s.Save()
}

// Create - Create new Controller
func (s *Storage) Create(name string, kind appliances.Kind, t string, opts *Options) (*Entry, error) {
	if e, err := s.GetByName(name); err != nil && !errors.Is(err, ErrNotFound.Error) {
		return nil, err
	} else if e != nil {
		return nil, ErrAlreadyExists.Error
	}

	// Trim space of first and end
	name = strings.TrimSpace(name)

	// name range check
	if utf8.RuneCountInString(name) > 20 {
		return nil, ErrNameTooLong.Error
	}

	id, _ := uuid.NewUUID()
	entry, err := s.newEntry(id.String(), name, kind, t, opts)
	if err != nil {
		return nil, err
	}

	s.Entries[id.String()] = entry
	pp.Println(s.Entries[id.String()])
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

func (s *Storage) newEntry(id, name string, kind appliances.Kind, t string, opts *Options) (*Entry, error) {
	entry := &Entry{
		ID:   id,
		Name: name,
	}

	// Set kind
	if kind != appliances.UNKNOWN {
		entry.Kind = kind
	} else {
		return nil, ErrUnsupportedKind.Error
	}

	// Set Type
	entry.Type = t

	// Set Agent ID (when provided)
	if opts.AgentID != "" {
		if s.AgentStore.GetByID(opts.AgentID) != nil {
			entry.AgentID = opts.AgentID
		} else {
			return nil, agent.ErrNotFound.Error
		}
	}

	switch t {
	case "REMOTE":
		if opts.Remote == nil {
			return nil, errors.New("remote is null")
		}

		entry.Remote = &remote.Remote{
			Vendor: opts.Remote.Vendor,
			Model:  opts.Remote.Model,
		}

		rs, err := s.Remotes.Get(entry.Kind, entry.Remote.Vendor, entry.Remote.Model)
		if err != nil {
			return nil, err
		}

		if err := entry.initRemote(rs.Template()); err != nil {
			return nil, err
		}
		pp.Println(entry)
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
			return nil, ErrInvalidType.Error
		}

		// Build struct
		entry.SwitchBot = &agent.SwitchBot{
			Mac:   strings.ToLower(opts.SwitchBot.Mac),
			Type:  opts.SwitchBot.Type,
			State: initialState,
		}

		// Call validate
		if ok := entry.SwitchBot.ValidateMacAddress(); !ok {
			return nil, ErrValidateMacAddress.Error
		}

	default:
		return nil, ErrUnsupportedType.Error
	}

	return entry, nil
}

// initRemote - Initialize Remote Controller (Inject default state)
func (e *Entry) initRemote(template *appliances.Template) error {
	if rs, err := appliances.NewState(template); err == nil {
		e.Appliances = rs.ToState()
	} else {
		return err
	}
	return nil
}
