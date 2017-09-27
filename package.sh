#!/bin/bash

COMPONENT=$(grep -m1 name package.json | tr -d '\r' | awk -F: '{print $2}' | sed 's/[", ]//g')
VERSION=$(grep -m1 version package.json | tr -d '\r' | awk -F: '{print $2}' | sed 's/[", ]//g')
IMAGE1="krdmitriy/${COMPONENT}:${VERSION}-${BUILD_NUMBER-0}"
IMAGE2="krdmitriy/${COMPONENT}:latest"

# Any subsequent(*) commands which fail will cause the shell script to exit immediately
set -e
set -o pipefail

# build docker image
docker build -f Dockerfile -t ${IMAGE1} -t ${IMAGE2} .