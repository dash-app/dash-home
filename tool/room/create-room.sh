#!/bin/bash
set -e

# Create Room
curl -X POST -H 'Content-Type: application/json' -d '{"name":"taro house"}' \
    http://localhost:8080/api/v1/room | jq .

# Get Room
curl -X GET http://localhost:8080/api/v1/room | jq .
