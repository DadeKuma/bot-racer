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

    # Sort the original JSON content and the sorted list
    original_list=$(jq . "$json_file")
    sorted_list=$(jq -S 'map(ascii_downcase) | sort_by(.)' "$json_file")

    # Compare the sorted list with the original list
    if [ "$original_list" != "$sorted_list" ]; then
        echo "The list in the JSON file $json_file is not in alphabetical order (case-insensitive)."
        is_sorted=false  # If the lists are not equal, set the flag to false
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
