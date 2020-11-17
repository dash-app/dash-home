#!/bin/bash
set -e
TARGET="localhost:8080"

curl -X GET \
    "${TARGET}/api/v1/controllers"
