#!/bin/bash
# @file Adds and removes '.gitkeep' files from empty directories.
# @author Riley Barabash <riley@rileybarabash.com>
#
# @tags
# #src
# #scripts
# #bash
# #utility
# #fs
# #git

# Capture the target directory from the first argument, defaulting to './src' if not provided.

TARGET_DIR=${1:-src}

# Adds '.gitkeep' to empty directories.

add_gitkeep() {

    # Find all directories within the target directory.

    for dir in $(find "$1" -type d); do

        # Check if the directory is empty.

        if [ -z "$(ls -A "$dir")" ]; then

            # If the directory is empty, create a '.gitkeep' file inside it.

            touch "$dir/.gitkeep"

            # Print a message indicating that a '.gitkeep' file was added.

            echo "Added '.gitkeep' to '$dir'"

        fi

    done

}

# Removes '.gitkeep' from non-empty directories.

remove_gitkeep() {

    # Find all '.gitkeep' files within the target directory.

    for file in $(find "$1" -name ".gitkeep"); do

        # Get the directory of the current '.gitkeep' file.

        dir=$(dirname "$file")

        # Check if the directory contains any files other than '.gitkeep'.

        if [ ! -z "$(ls -A "$dir" | grep -v '.gitkeep')" ]; then

            # If the directory is not empty, remove the '.gitkeep' file.

            rm "$file"

            # Print a message indicating that the '.gitkeep' file was removed.

            echo "Removed '.gitkeep' from '$dir'"

        fi

    done

}

# Run the `add_gitkeep` function on the target directory.

add_gitkeep "$TARGET_DIR"

# Run the `remove_gitkeep` function on the target directory.

remove_gitkeep "$TARGET_DIR"
