package models

// Room - room entry
type Room struct {
	// ID - Room ID
	ID string `json:"id"`

	// Name - Room name (ex: `john's room`)
	Name string `json:"name" example:"john's room"`

	// Owner - Room owner (ex: `john doe`)
	Owner string `json:"owner" example:"john doe"`

	// Status - Room Status
	Status RoomStatus `json:"status"`
}

// RoomStatus - room status
type RoomStatus struct {
	// Temp - Temperature (celsius)
	Temp float32 `json:"temp" example:"27.5"`

	// Humid - Humidity (percent)
	Humid float32 `json:"humid" example:"50.3"`

	// Pressure - Pressure (hpa)
	Pressure float32 `json:"pressure" example:"1009.4"`
}
