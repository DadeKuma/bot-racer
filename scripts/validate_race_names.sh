#!/bin/bash

# Flag to track success or failure
successful=true

for file in public/data/races/*.json; do
    # Read JSON file
    data=$(<"$file")

    # Read valid_names.json
    valid_bot_names=$(<public/data/bots.json)
    valid_judge_names=$(<public/data/judges.json)

    # Extract bot_names from data.json
    bot_names=$(echo "$data" | jq -r '.[].data | .winner[], .A[], .B[], .C[]')
    judge_names=$(echo "$data" | jq -r '.[].data | .judge[]')

    # Check if all bot_names are valid
    invalid_bot_names=""
    for name in $bot_names; do
        if ! echo "$valid_bot_names" | grep -q "$name"; then
            invalid_bot_names+=" $name"
            successful=false
        fi
    done

    # Check if all judge_names are valid
    invalid_judge_names=""
    for name in $judge_names; do
        if ! echo "$valid_judge_names" | grep -q "$name"; then
            invalid_judge_names+=" $name"
            successful=false
        fi
    done

    # Remove duplicate names
    unique_invalid_bot_names=$(echo "$invalid_bot_names" | tr ' ' '\n' | awk '!seen[$0]++' | tr '\n' ' ')
    unique_invalid_judge_names=$(echo "$invalid_judge_names" | tr ' ' '\n' | awk '!seen[$0]++' | tr '\n' ' ')
    
    if [ -n "$unique_invalid_bot_names" ]; then
        echo "Invalid bot_names found in $file: $unique_invalid_bot_names"
    else
        echo "All bot_names in $file are valid"
    fi

    if [ -n "$unique_invalid_judge_names" ]; then
        echo "Invalid judge_names found in $file: $unique_invalid_judge_names"
    else
        echo "All judge_names in $file are valid"
    fi
done

# Output overall success or failure
if [ "$successful" = false ]; then
    exit 1
fi