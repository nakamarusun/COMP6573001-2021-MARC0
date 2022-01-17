#!/bin/sh
# Run this file to create a configmap updated with the current .env file then
# apply all resources
kubectl apply -f kubernetes/
kubectl create configmap marc0-config --from-env-file=.env -n marc0-namespace