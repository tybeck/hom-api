#!/bin/bash

echo "Database started"

if ! command -v mongosh &> /dev/null
then
    echo "Could not find mongosh shell; please install mongosh cli"
    exit
fi

mongosh < ../dist-scripts/init-db.js

echo "Database finished"