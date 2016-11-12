#!/bin/bash
_tag=$1

if [ -z "${_tag}" ]; then
    source _VERSION
    _tag=${_VERSION}
fi

docker build --tag "orangesys/orangesys-srv:${_tag}" .
docker tag orangesys/orangesys-srv:${_tag} orangesys/orangesys-srv:latest
