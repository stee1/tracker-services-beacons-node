#!/bin/bash

COMPONENT=$(grep -m1 name package.json | tr -d '\r' | awk -F: '{print $2}' | sed 's/[", ]//g')
VERSION=$(grep -m1 version package.json | tr -d '\r' | awk -F: '{print $2}' | sed 's/[", ]//g')
BUILD_IMAGE="krdmitriy/${COMPONENT}:${VERSION}-build"
TEST_IMAGE="krdmitriy/${COMPONENT}:${VERSION}-test"
IMAGE1="krdmitriy/${COMPONENT}:${VERSION}-${BUILD_NUMBER-0}"
IMAGE2="krdmitriy/${COMPONENT}:${VERSION}-${BUILD_NUMBER-0}"


rm -rf ./node_modules
rm -rf ./obj

docker rmi $BUILD_IMAGE --force
docker rmi $TEST_IMAGE --force
docker rmi $IMAGE1 --force
docker rmi $IMAGE2 --force
docker image prune --force