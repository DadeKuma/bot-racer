#!/bin/bash

json_files=("public/data/bots.json" "public/data/judges.json")

# Function to check JSON list order
check_json_list() {
    local json_file=$1
    
    # Check if file exists
    if [ ! -f "$json_file" ]; then
        echo "File not found: $json_file"
        exit 1
    fi

    # Extract the list from JSON and sort it
    sorted_list=$(jq -r '.[]' "$json_file" | LC_ALL=C sort -f | uniq)

    # Compare the sorted list with the original list
    if ! diff -q <(jq -r '.[]' "$json_file") <(echo "$sorted_list") >/dev/null; then
        echo "The list in the JSON file $json_file is not in alphabetical order."
        echo "Diff:"
        diff <(jq -r '.[]' "$json_file") <(echo "$sorted_list")
        return 1
    fi
}

# Loop through the JSON files and check each one
error_flag=false
for json_file in "${json_files[@]}"; do
    if ! check_json_list "$json_file"; then
        error_flag=true
    fi
done

# Exit with error if any file fails the check
if [ "$error_flag" == true ]; then
    exit 1
fi
