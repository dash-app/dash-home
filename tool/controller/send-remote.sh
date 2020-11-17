#!/bin/bash
set -e
TARGET="localhost:8080"

curl -X POST \
    -d '{"operation": true, "mode": "cool", "temp": 26, "fan": "auto", "horizontal_vane": "keep", "vertical_vane": "keep"}' \
    "${TARGET}/api/v1/controllers/3453ba10-d58b-11ea-a680-9699fc4db01a"
