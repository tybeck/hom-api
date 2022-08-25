#!/bin/bash

echo "Dependencies started"

if ! command -v mongosh &> /dev/null
then
    echo "Could not find mongosh, installing..."
    brew install mongosh
fi

echo "Dependencies finished"