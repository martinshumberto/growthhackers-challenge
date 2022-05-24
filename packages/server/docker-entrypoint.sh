#!/bin/sh
set -e

wait_for() {
    echo "Waiting $1 seconds for $2:$3"
    timeout $1 sh -c 'until nc -z $0 $1; do sleep 0.1; done' $2 $3 || return 1
    echo "$2:$3 available"
}

yarn install

if [ -e .env ]; then
    echo 'Found .env'
else
    echo 'Not found .env, creating...'
    cp .env.example .env
fi

wait_for 10 db 5432

yarn typeorm migration:run

yarn console seed

exec "$@"
