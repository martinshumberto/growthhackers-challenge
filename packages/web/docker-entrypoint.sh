#!/bin/sh
set -e

yarn install

if [ -e .env ]; then
    echo 'Found .env'
else
    echo 'Not found .env, creating...'
    cp .env.example .env
fi

exec "$@"
