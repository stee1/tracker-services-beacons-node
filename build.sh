#!/bin/bash

COMPONENT=$(grep -m1 name package.json | tr -d '\r' | awk -F: '{print $2}' | sed 's/[", ]//g')
VERSION=$(grep -m1 version package.json | tr -d '\r' | awk -F: '{print $2}' | sed 's/[", ]//g')
IMAGE="krdmitriy/${COMPONENT}:${VERSION}-build"
CONTAINER="${COMPONENT}"

# Any subsequent(*) commands which fail will cause the shell script to exit immediately
set -e
set -o pipefail

#remove build file
rm -rf ./obj

# build docker image
docker build -f Dockerfile.build -t ${IMAGE} .

docker create --name ${CONTAINER} ${IMAGE}
docker cp ${CONTAINER}:app/obj ./obj
docker rm ${CONTAINER}