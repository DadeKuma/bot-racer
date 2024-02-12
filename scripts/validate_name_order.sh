#!/bin/bash

json_files=("public/data/bots.json" "public/data/judges.json")

# Function to check JSON list order
check_json_list() {
    local json_file=$1
    local is_sorted=true  # Initialize the boolean flag as true
    
    # Check if file exists
    if [ ! -f "$json_file" ]; then
        echo "File not found: $json_file"
        exit 1
    fi

    # Sort the array of strings ignoring case
    sorted_list=$(jq -r 'map(ascii_downcase) | sort_by(.) | join("\n")' "$json_file")

    # Compare the sorted list with the original list
    if [ "$(cat "$json_file" | jq -c '.')" != "$(echo "$sorted_list" | jq -c '.')" ]; then
        echo "The list in the JSON file $json_file is not in alphabetical order (case-insensitive)."
        is_sorted=false  # If the lists are not equal, set the flag to false
    else
        echo "The list in the JSON file $json_file is in alphabetical order (case-insensitive)."
    fi
    
    # Return the boolean flag
    echo $is_sorted
}

# Loop through the JSON files and check each one
error_flag=false  # Initialize overall error flag as false
for json_file in "${json_files[@]}"; do
    result=$(check_json_list "$json_file")
    if [ "$result" == "false" ]; then
        error_flag=true  # If any file is not sorted, set the overall error flag to true
    fi
done

# Exit with error if any file fails the check
if [ "$error_flag" == "true" ]; then
    exit 1
fi
