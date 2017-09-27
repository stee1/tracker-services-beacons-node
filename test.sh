#!/bin/bash

COMPONENT=$(grep -m1 name package.json | tr -d '\r' | awk -F: '{print $2}' | sed 's/[", ]//g')
VERSION=$(grep -m1 version package.json | tr -d '\r' | awk -F: '{print $2}' | sed 's/[", ]//g')
IMAGE="krdmitriy/${COMPONENT}:${VERSION}-${BUILD_NUMBER-0}-test"
CONTAINER="${COMPONENT}"

# Any subsequent(*) commands which fail will cause the shell script to exit immediately
set -e
set -o pipefail

# workaround to remove dangling images
docker-compose -f ./docker-compose.test.yml down

export IMAGE
docker-compose -f ./docker-compose.test.yml up --build --abort-on-container-exit --exit-code-from test

# workaround to remove dangling images
docker-compose -f ./docker-compose.test.yml down