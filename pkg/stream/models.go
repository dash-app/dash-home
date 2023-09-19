package stream

type StreamType string

type StreamEntry struct {
	// Type - TEXT, CONTROLLER, AGENT
	Type StreamType `json:"type"`

	// Controller
	Controller interface{} `json:"controller,omitempty"`
	Agent      interface{} `json:"agent,omitempty"`

	// Message
	Message string `json:"message,omitempty"`
}
