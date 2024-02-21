#!/bin/bash

set -e  # Exit on errors

# Get previous and current tags
previous_tag="$1"
current_tag="$2"
output_file="$3"

# Identify previous release tag based on semver logic
# Extract major, minor, and patch versions as integers
# (adjust variable names if semantic-release is used)
major=$(echo "$previous_tag" | grep -Eo '[0-9]+' | head -n 1)
minor=$(echo "$previous_tag" | grep -Eo '[0-9]+' | sed -n '2p')
patch=$(echo "$previous_tag" | grep -Eo '[0-9]+' | sed -n '3p')

# Use sed to replace patch version with "x" to match any patch levels
previous_tag_semver="$major.$minor.x"

# Get all changes since the previous release based on semantic version tag
changes=$(git diff --name-only "$previous_tag_semver"..."$current_tag")

if [[ -z "$changes" ]]; then
  echo "No changes found since previous release." > "$output_file"
  exit 0
fi

# Calculate the new release tag based on changes (minor or patch increment)
# Use case and sed to identify change types (adjust based on your commit message pattern)
if [[ $(grep -o "feat" <<< "$changes") ]]; then
  release_tag="$major.$((minor + 1)).0"
elif [[ $(grep -o "fix" <<< "$changes") || $(grep -o "bug" <<< "$changes") ]]; then
  release_tag="$major.$minor.$((patch + 1))"
else
  # Handle edge cases or warn about unidentified change types
  echo "Warning: Unidentified change type. Using patch increment."
  release_tag="$major.$minor.$((patch + 1))"
fi

echo "# Release Notes for $release_tag" > "$output_file"

# Process each change and extract commit message for changelog
for change in $changes; do
  commit_message=$(git show -s --format=%B $previous_tag_semver^..$current_tag | grep -e "$change")
  echo "- $commit_message" >> "$output_file"
done

echo "Release notes have been generated in $output_file."
