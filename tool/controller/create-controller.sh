#!/bin/bash
set -e
TARGET="localhost:8080"

curl -X POST \
    -d '{"name": "寝室のエアコン", "kind": "AIRCON", "type": "REMOTE", "remote": {"vendor": "daikin", "model": "daikin01"}}' \
    "${TARGET}/api/v1/controllers"
