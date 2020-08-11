#!/bin/bash
set -e
TARGET="localhost:8080"
CID="843b801d-db9c-11ea-a405-5a0dc9c53c1f"

#curl -X POST \
#    -d '{"operation": true, "mode": "cool", "temp": 26.5, "fan": "auto", "horizontal_vane": "auto", "vertical_vane": "center"}' \
#    "${TARGET}/api/v1/controllers/${CID}"

curl -X POST \
    -d '{"operation": true, "mode": "cool", "temp": 26.5, "fan": "auto", "horizontal_vane": "auto", "vertical_vane": "center"}' \
    "${TARGET}/api/v1/controllers/${CID}"
