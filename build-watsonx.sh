#! /bin/bash

podman build -t quay.io/anchinna/watsonx:latest -f Dockerfile.watson .
podman push quay.io/anchinna/watsonx:latest
