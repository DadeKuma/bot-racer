#!/bin/bash

# Flag to track success or failure
successful=true

for file in public/data/races/*.json; do
    valid_file=true
    # Read JSON file
    data=$(<"$file")

    # Read valid_names.json
    valid_bot_names=$(<public/data/bots.json)
    valid_judge_names=$(<public/data/judges.json)

    # Extract bot_names from data.json, remove empty values
    bot_names=$(echo "$data" | jq -r '.[].data | .winner[], .A[], .B[], .C[]' | grep -v '^$')
    judge_names=$(echo "$data" | jq -r '.[].data | .judge' | grep -v '^$')

    # Check if all bot_names are valid
    invalid_bot_names=""
    for name in $bot_names; do
        if [ -n "$name" ]; then  # Check if the name is not empty
            if ! echo "$valid_bot_names" | grep -q "$name"; then
                invalid_bot_names+=" $name"
                successful=false
            fi
        fi
    done

    # Check if all judge_names are valid
    invalid_judge_names=""
    for name in $judge_names; do
        if [ -n "$name" ]; then  # Check if the name is not empty
            if ! echo "$valid_judge_names" | grep -q "$name"; then
                invalid_judge_names+=" $name"
                successful=false
            fi
        fi
    done

    # Remove duplicate names and empty strings
    unique_invalid_bot_names=$(echo "$invalid_bot_names" | tr ' ' '\n' | awk '!seen[$0]++' | grep -v '^$' | tr '\n' ' ')
    unique_invalid_judge_names=$(echo "$invalid_judge_names" | tr ' ' '\n' | awk '!seen[$0]++' | grep -v '^$' | tr '\n' ' ')
    
    # Output error message if there are invalid names
    if [ "$successful" = false ]; then
        if [ -n "$unique_invalid_bot_names" ]; then
            echo "Invalid bot_names found in $file: $unique_invalid_bot_names"
        fi

        if [ -n "$unique_invalid_judge_names" ]; then
            echo "Invalid judge_names found in $file: $unique_invalid_judge_names"
        fi
    fi
done

# Output overall success or failure
if [ "$successful" = false ]; then
    exit 1
fi
