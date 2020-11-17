#!/bin/bash
set -e
TARGET="localhost:13105"

curl -X POST \
    -d '{"name": "すいっちくん", "kind": "AIRCON", "type": "SWITCHBOT", "switchbot": {"mac": "F2:F6:27:8F:4C:8F", "type": "PRESS"}}' \
    "${TARGET}/api/v1/controllers"
