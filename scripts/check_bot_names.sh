#!/bin/bash

for file in public/data/races/*.json; do
    # Read JSON file
    data=$(<"$file")

    # Read valid_names.json
    valid_bot_names=$(<public/data/bots.json)

    # Extract bot_names from data.json
    bot_names=$(echo "$data" | jq -r '.[].data | .winner[], .A[], .B[], .C[]')

    # Check if all bot_names are valid
    invalid_names=""
    for name in $bot_names; do
        if ! echo "$valid_bot_names" | grep -q "$name"; then
            invalid_names+=" $name"
        fi
    done

    # Remove duplicate names
    unique_invalid_names=$(echo "$invalid_names" | tr ' ' '\n' | awk '!seen[$0]++' | tr '\n' ' ')

    if [ -n "$unique_invalid_names" ]; then
        echo "Invalid bot_names found in $file: $unique_invalid_names"
        exit 1
    else
        echo "All bot_names in $file are valid"
    fi
done
