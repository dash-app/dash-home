#!/bin/bash
set -e
TARGET="localhost:8080"
CID="b080f47a-d54d-11ea-8890-acde48001122"

curl -X POST \
    -d '{"operation": true, "mode": "cool", "temp": 25.5, "fan": "auto", "horizontal_vane": "keep", "vertical_vane": "keep"}' \
    "${TARGET}/api/v1/controllers/${CID}"
