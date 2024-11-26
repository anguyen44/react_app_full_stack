#!/usr/bin/env bash

echo "Updating the build.env properties..."

# Get the version from package.json
PACKAGE_VERSION=$(npm pkg get version | sed 's/"//g')

# Update build.env
 echo "VERSION=$PACKAGE_VERSION" >> build.env
