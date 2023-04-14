#!/usr/bin/env sh

#usage: ./apply-back-server.sh $namespace


kubectl apply -f back-server.yaml -n $1