#!/bin/bash
set -e

#AGENT="10.19.19.145:8081"
AGENT="localhost:8081"

# Create Agent
curl -X POST -H 'Content-Type: application/json' -d "{\"address\":\"${AGENT}\"}" \
    http://localhost:8080/api/v1/agent | jq .

# Get Agent
curl -X GET http://localhost:8080/api/v1/agent | jq .
