package agent

import "time"

// Ambient - Ambient sensor from BME280
type Ambient struct {
	// Temp - Temperature (celsius)
	Temp float32 `json:"temp" example:"27.5"`

	// Humid - Humidity (percent)
	Humid float32 `json:"humid" example:"50.3"`

	// Pressure - Pressure (hpa)
	Pressure float32 `json:"pressure" example:"1009.4"`

	// LastFetch - Fetched date
	LastFetch time.Time `json:"last_fetch"`
}
