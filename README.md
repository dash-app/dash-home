# Dash-Home

[![Go Report Card](https://goreportcard.com/badge/github.com/dash-app/dash-home)](https://goreportcard.com/report/github.com/dash-app/dash-home)

Dashboard for Home, Dash-Home.

## Requirements
* **Go** 1.15+
* **Node.js** 10.13+
> Also, Required Pigent for Access Hardware (IR, Sensors etc.) \
> https://github.com/dash-app/pigent

## Build
```bash
make clean frontend build
```

## Environment Variables
| Environment Variables | Description      | Default |
|-----------------------|------------------|---------|
| `STORAGE_PATH` | Directory path of local data storage | `$(PWD)/local` |
| `HTTP_PORT` | Listen http port | `13105` |

