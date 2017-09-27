#!/bin/bash

COMPONENT=$(grep -m1 name package.json | tr -d '\r' | awk -F: '{print $2}' | sed 's/[", ]//g')
VERSION=$(grep -m1 version package.json | tr -d '\r' | awk -F: '{print $2}' | sed 's/[", ]//g')
IMAGE1="krdmitriy/${COMPONENT}:${VERSION}"
IMAGE2="krdmitriy/${COMPONENT}:latest"
TAG="v${VERSION}-${BUILD_NUMBER-0}"

# Any subsequent(*) commands which fail will cause the shell script to exit immediately
set -e
set -o pipefail

# Set tag on git repo
#git tag $TAG
#git push --tags 

# Push production image to docker repository
docker login -u $DOCKER_USER -p $DOCKER_PASS
docker push $IMAGE1
docker push $IMAGE2

