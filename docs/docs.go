// GENERATED BY THE COMMAND ABOVE; DO NOT EDIT
// This file was generated by swaggo/swag

package docs

import (
	"bytes"
	"encoding/json"
	"strings"

	"github.com/alecthomas/template"
	"github.com/swaggo/swag"
)

var doc = `{
    "schemes": {{ marshal .Schemes }},
    "swagger": "2.0",
    "info": {
        "description": "{{.Description}}",
        "title": "{{.Title}}",
        "contact": {},
        "license": {
            "name": "MIT License",
            "url": "https://opensource.org/licenses/MIT"
        },
        "version": "{{.Version}}"
    },
    "host": "{{.Host}}",
    "basePath": "{{.BasePath}}",
    "paths": {
        "/api/v1/agent": {
            "get": {
                "produces": [
                    "application/json"
                ],
                "tags": [
                    "agent"
                ],
                "summary": "Get Agent entry",
                "responses": {
                    "200": {
                        "description": "OK",
                        "schema": {
                            "$ref": "#/definitions/storage.Agent"
                        }
                    }
                }
            },
            "post": {
                "consumes": [
                    "application/json"
                ],
                "produces": [
                    "application/json"
                ],
                "tags": [
                    "agent"
                ],
                "summary": "Add Agent entry",
                "parameters": [
                    {
                        "description": "Add new agent",
                        "name": "entry",
                        "in": "body",
                        "required": true,
                        "schema": {
                            "$ref": "#/definitions/server.UpdateAgentRequest"
                        }
                    }
                ],
                "responses": {
                    "200": {
                        "description": "OK",
                        "schema": {
                            "$ref": "#/definitions/storage.Agent"
                        }
                    }
                }
            }
        },
        "/api/v1/agent/sensors": {
            "get": {
                "produces": [
                    "application/json"
                ],
                "tags": [
                    "agent"
                ],
                "summary": "Get Sensors status form agent",
                "responses": {
                    "200": {
                        "description": "OK",
                        "schema": {
                            "$ref": "#/definitions/agent.Ambient"
                        }
                    }
                }
            }
        },
        "/api/v1/controllers": {
            "get": {
                "produces": [
                    "application/json"
                ],
                "tags": [
                    "controller"
                ],
                "summary": "Get controllers",
                "responses": {
                    "200": {
                        "description": "OK",
                        "schema": {
                            "type": "array",
                            "items": {
                                "$ref": "#/definitions/controller.Entry"
                            }
                        }
                    }
                }
            },
            "post": {
                "consumes": [
                    "application/json"
                ],
                "produces": [
                    "application/json"
                ],
                "tags": [
                    "controller"
                ],
                "summary": "Add new controller",
                "parameters": [
                    {
                        "description": "Add new controller",
                        "name": "entry",
                        "in": "body",
                        "required": true,
                        "schema": {
                            "$ref": "#/definitions/server.SetControllerRequest"
                        }
                    }
                ],
                "responses": {
                    "200": {
                        "description": "OK",
                        "schema": {
                            "$ref": "#/definitions/controller.Entry"
                        }
                    }
                }
            }
        },
        "/api/v1/controllers/:id": {
            "get": {
                "produces": [
                    "application/json"
                ],
                "tags": [
                    "controller"
                ],
                "summary": "Get controller by ID",
                "responses": {
                    "200": {
                        "description": "OK",
                        "schema": {
                            "$ref": "#/definitions/controller.Entry"
                        }
                    }
                }
            },
            "delete": {
                "produces": [
                    "application/json"
                ],
                "tags": [
                    "controller"
                ],
                "summary": "Delete controller by ID",
                "responses": {
                    "200": {}
                }
            },
            "patch": {
                "produces": [
                    "application/json"
                ],
                "tags": [
                    "controller"
                ],
                "summary": "Patch controller by ID",
                "responses": {
                    "200": {
                        "description": "OK",
                        "schema": {
                            "$ref": "#/definitions/controller.Entry"
                        }
                    }
                }
            }
        },
        "/api/v1/controllers/:id/aircon": {
            "post": {
                "produces": [
                    "application/json"
                ],
                "tags": [
                    "controller"
                ],
                "summary": "Post Aircon by ID",
                "responses": {
                    "200": {
                        "description": "OK",
                        "schema": {
                            "$ref": "#/definitions/aircon.Entry"
                        }
                    }
                }
            }
        },
        "/api/v1/controllers/:id/switchbot": {
            "post": {
                "produces": [
                    "application/json"
                ],
                "tags": [
                    "controller"
                ],
                "summary": "Post SwitchBot by ID",
                "responses": {
                    "200": {}
                }
            }
        },
        "/api/v1/controllers/:id/template": {
            "get": {
                "produces": [
                    "application/json"
                ],
                "tags": [
                    "controller"
                ],
                "summary": "Get controller template by ID",
                "responses": {
                    "200": {
                        "description": "OK",
                        "schema": {
                            "$ref": "#/definitions/template.Template"
                        }
                    }
                }
            }
        },
        "/api/v1/remotes": {
            "get": {
                "produces": [
                    "application/json"
                ],
                "tags": [
                    "controller"
                ],
                "summary": "Get remote controllers",
                "responses": {
                    "200": {
                        "description": "OK",
                        "schema": {
                            "$ref": "#/definitions/server.GetRemotesResponse"
                        }
                    }
                }
            }
        },
        "/api/v1/room": {
            "get": {
                "produces": [
                    "application/json"
                ],
                "tags": [
                    "room"
                ],
                "summary": "Get Room entry",
                "responses": {
                    "200": {
                        "description": "OK",
                        "schema": {
                            "$ref": "#/definitions/room.Room"
                        }
                    }
                }
            },
            "post": {
                "consumes": [
                    "application/json"
                ],
                "produces": [
                    "application/json"
                ],
                "tags": [
                    "room"
                ],
                "summary": "Craete Room entry",
                "parameters": [
                    {
                        "description": "Create new room",
                        "name": "entry",
                        "in": "body",
                        "required": true,
                        "schema": {
                            "$ref": "#/definitions/server.CreateRoomRequest"
                        }
                    }
                ],
                "responses": {
                    "200": {
                        "description": "OK",
                        "schema": {
                            "$ref": "#/definitions/room.Entry"
                        }
                    }
                }
            }
        },
        "/healthz": {
            "get": {
                "summary": "Check API Response for Health Check",
                "responses": {
                    "200": {
                        "description": "OK",
                        "schema": {
                            "type": "string"
                        }
                    }
                }
            }
        }
    },
    "definitions": {
        "agent.Ambient": {
            "type": "object",
            "properties": {
                "humid": {
                    "description": "Humid - Humidity (percent)",
                    "type": "number",
                    "example": 50.3
                },
                "last_fetch": {
                    "description": "LastFetch - Fetched date",
                    "type": "string",
                    "example": "2020-01-01 01:02:03 UTC"
                },
                "pressure": {
                    "description": "Pressure - Pressure (hpa)",
                    "type": "number",
                    "example": 1009.4
                },
                "temp": {
                    "description": "Temp - Temperature (celsius)",
                    "type": "number",
                    "example": 27.5
                }
            }
        },
        "agent.SwitchBot": {
            "type": "object",
            "properties": {
                "mac": {
                    "type": "string",
                    "example": "xx:xx:xx:xx:xx:xx"
                },
                "state": {
                    "type": "string",
                    "example": "ON"
                },
                "type": {
                    "type": "string",
                    "example": "TOGGLE"
                }
            }
        },
        "aircon.Entry": {
            "type": "object",
            "properties": {
                "fan": {
                    "type": "string",
                    "example": "auto"
                },
                "horizontal_vane": {
                    "type": "string",
                    "example": "auto"
                },
                "humid": {
                    "type": "string",
                    "example": "50%"
                },
                "mode": {
                    "type": "string",
                    "example": "cool"
                },
                "operation": {
                    "type": "boolean",
                    "example": false
                },
                "temp": {
                    "type": "object"
                },
                "vertical_vane": {
                    "type": "string",
                    "example": "auto"
                }
            }
        },
        "aircon.ModeEntry": {
            "type": "object",
            "properties": {
                "fan": {
                    "type": "string",
                    "example": "auto"
                },
                "horizontal_vane": {
                    "type": "string",
                    "example": "swing"
                },
                "humid": {
                    "type": "string",
                    "example": "50%"
                },
                "temp": {
                    "type": "object"
                },
                "vertical_vane": {
                    "type": "string",
                    "example": "swing"
                }
            }
        },
        "aircon.State": {
            "type": "object",
            "properties": {
                "mode": {
                    "type": "string",
                    "example": "cool"
                },
                "modes": {
                    "type": "object",
                    "additionalProperties": {
                        "$ref": "#/definitions/aircon.ModeEntry"
                    }
                },
                "operation": {
                    "type": "boolean",
                    "example": false
                }
            }
        },
        "controller.Entry": {
            "type": "object",
            "required": [
                "kind",
                "name",
                "type"
            ],
            "properties": {
                "aircon": {
                    "description": "Aircon - State of Aircon",
                    "type": "object",
                    "$ref": "#/definitions/aircon.State"
                },
                "id": {
                    "description": "ID - Generated ID",
                    "type": "string",
                    "example": "\u003cUNIQUE_ID\u003e"
                },
                "kind": {
                    "description": "Kind - AIRCON, LIGHT, SWITCHBOT...",
                    "type": "string",
                    "example": "AIRCON"
                },
                "name": {
                    "description": "Name - ex. Bedroom Airconditioner",
                    "type": "string",
                    "example": "Bedroom Airconditioner"
                },
                "remote": {
                    "description": "Remote - Remote Controller settings (required when type is REMOTE)",
                    "type": "object",
                    "$ref": "#/definitions/controller.Remote"
                },
                "switchbot": {
                    "description": "SwitchBot - SwitchBot settings (required when type is SWITCHBOT)",
                    "type": "object",
                    "$ref": "#/definitions/agent.SwitchBot"
                },
                "type": {
                    "description": "Type - type of controller (how to use?) / ex. REMOTE, SWITCHBOT...",
                    "type": "string",
                    "example": "REMOTE"
                }
            }
        },
        "controller.Remote": {
            "type": "object",
            "properties": {
                "model": {
                    "type": "string",
                    "example": "daikin01"
                },
                "vendor": {
                    "type": "string",
                    "example": "daikin"
                }
            }
        },
        "room.Entry": {
            "type": "object",
            "properties": {
                "id": {
                    "description": "ID - Room ID",
                    "type": "string"
                },
                "name": {
                    "description": "Name - Room name (ex: ` + "`" + `john's room` + "`" + `)",
                    "type": "string",
                    "example": "john's room"
                }
            }
        },
        "room.Room": {
            "type": "object",
            "properties": {
                "ambient": {
                    "description": "Ambient - Room ambient (from agent)",
                    "type": "object",
                    "$ref": "#/definitions/agent.Ambient"
                },
                "id": {
                    "description": "ID - Room ID",
                    "type": "string"
                },
                "name": {
                    "description": "Name - Room name (ex: ` + "`" + `john's room` + "`" + `)",
                    "type": "string",
                    "example": "john's room"
                }
            }
        },
        "server.CreateRoomRequest": {
            "type": "object",
            "properties": {
                "name": {
                    "type": "string",
                    "example": "john's room"
                }
            }
        },
        "server.GetRemotesResponse": {
            "type": "object",
            "properties": {
                "aircon": {
                    "type": "object",
                    "additionalProperties": {
                        "type": "array",
                        "items": {
                            "type": "string"
                        }
                    }
                }
            }
        },
        "server.RemoteController": {
            "type": "object",
            "required": [
                "model",
                "vendor"
            ],
            "properties": {
                "model": {
                    "type": "string",
                    "example": "daikin01"
                },
                "vendor": {
                    "type": "string",
                    "example": "daikin"
                }
            }
        },
        "server.SetControllerRequest": {
            "type": "object",
            "required": [
                "kind",
                "name",
                "type"
            ],
            "properties": {
                "kind": {
                    "description": "Kind - AIRCON, LIGHT, SWITCHBOT...",
                    "type": "string",
                    "example": "AIRCON"
                },
                "name": {
                    "description": "Name - ex. Bedroom Airconditioner",
                    "type": "string",
                    "example": "Bedroom Airconditioner"
                },
                "remote": {
                    "description": "Remote - Remote Controller settings (required when type is REMOTE)",
                    "type": "object",
                    "$ref": "#/definitions/server.RemoteController"
                },
                "switchbot": {
                    "description": "SwitchBot - SwitchBot settings (required when type is SWITCHBOT)",
                    "type": "object",
                    "$ref": "#/definitions/server.SwitchBotController"
                },
                "type": {
                    "description": "Type - type of controller (how to use?) / ex. REMOTE, SWITCHBOT...",
                    "type": "string",
                    "example": "REMOTE"
                }
            }
        },
        "server.SwitchBotController": {
            "type": "object",
            "required": [
                "mac",
                "type"
            ],
            "properties": {
                "mac": {
                    "type": "string",
                    "example": "FF:FF:FF:FF:FF:FF"
                },
                "type": {
                    "type": "string",
                    "example": "TOGGLE"
                }
            }
        },
        "server.UpdateAgentRequest": {
            "type": "object",
            "required": [
                "address"
            ],
            "properties": {
                "address": {
                    "description": "Address of Pigent",
                    "type": "string",
                    "example": "localhost:8081"
                }
            }
        },
        "storage.Agent": {
            "type": "object",
            "required": [
                "address"
            ],
            "properties": {
                "address": {
                    "description": "Address - Agent Address (ex. ` + "`" + `localhost:8081` + "`" + `)",
                    "type": "string",
                    "example": "localhost:8081"
                },
                "id": {
                    "description": "ID - Agent ID",
                    "type": "string",
                    "default": "\u003cUNIQUE_ID\u003e"
                },
                "online": {
                    "description": "Online - Check online",
                    "type": "boolean"
                }
            }
        },
        "template.Action": {
            "type": "object",
            "properties": {
                "default": {
                    "type": "object"
                },
                "list": {
                    "type": "array",
                    "items": {
                        "type": "object"
                    }
                },
                "multiple": {
                    "type": "array",
                    "items": {
                        "$ref": "#/definitions/template.Action"
                    }
                },
                "range": {
                    "type": "object",
                    "$ref": "#/definitions/template.Range"
                },
                "shot": {
                    "type": "object",
                    "$ref": "#/definitions/template.Shot"
                },
                "toggle": {
                    "type": "object",
                    "$ref": "#/definitions/template.Toggle"
                },
                "type": {
                    "type": "integer"
                }
            }
        },
        "template.Aircon": {
            "type": "object",
            "properties": {
                "modes": {
                    "type": "object",
                    "additionalProperties": {
                        "$ref": "#/definitions/template.AirconMode"
                    }
                },
                "operation": {
                    "type": "object",
                    "$ref": "#/definitions/template.Action"
                }
            }
        },
        "template.AirconMode": {
            "type": "object",
            "properties": {
                "fan": {
                    "type": "object",
                    "$ref": "#/definitions/template.Action"
                },
                "horizontal_vane": {
                    "type": "object",
                    "$ref": "#/definitions/template.Action"
                },
                "humid": {
                    "type": "object",
                    "$ref": "#/definitions/template.Action"
                },
                "temp": {
                    "type": "object",
                    "$ref": "#/definitions/template.Action"
                },
                "vertical_vane": {
                    "type": "object",
                    "$ref": "#/definitions/template.Action"
                }
            }
        },
        "template.Range": {
            "type": "object",
            "properties": {
                "from": {
                    "type": "number"
                },
                "prefix": {
                    "type": "string"
                },
                "step": {
                    "type": "number"
                },
                "suffix": {
                    "type": "string"
                },
                "to": {
                    "type": "number"
                }
            }
        },
        "template.Shot": {
            "type": "object",
            "properties": {
                "value": {
                    "type": "object"
                }
            }
        },
        "template.Template": {
            "type": "object",
            "properties": {
                "aircon": {
                    "type": "object",
                    "$ref": "#/definitions/template.Aircon"
                },
                "kind": {
                    "type": "string"
                },
                "model": {
                    "type": "string"
                },
                "vendor": {
                    "type": "string"
                }
            }
        },
        "template.Toggle": {
            "type": "object",
            "properties": {
                "off": {
                    "type": "object"
                },
                "on": {
                    "type": "object"
                }
            }
        }
    }
}`

type swaggerInfo struct {
	Version     string
	Host        string
	BasePath    string
	Schemes     []string
	Title       string
	Description string
}

// SwaggerInfo holds exported Swagger Info so clients can modify it
var SwaggerInfo = swaggerInfo{
	Version:     "1.0",
	Host:        "",
	BasePath:    "",
	Schemes:     []string{},
	Title:       "Dash-Home API",
	Description: "",
}

type s struct{}

func (s *s) ReadDoc() string {
	sInfo := SwaggerInfo
	sInfo.Description = strings.Replace(sInfo.Description, "\n", "\\n", -1)

	t, err := template.New("swagger_info").Funcs(template.FuncMap{
		"marshal": func(v interface{}) string {
			a, _ := json.Marshal(v)
			return string(a)
		},
	}).Parse(doc)
	if err != nil {
		return doc
	}

	var tpl bytes.Buffer
	if err := t.Execute(&tpl, sInfo); err != nil {
		return doc
	}

	return tpl.String()
}

func init() {
	swag.Register(swag.Name, &s{})
}
