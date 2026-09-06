#!/bin/bash

set -o errexit
set -o nounset
set -o pipefail

if [ $# -eq 0 ]
  then
    echo "No arguments supplied"
    exit
fi

cd "$(dirname "$0")"

main() {
	convert $1 -resize 600x400 ${1%.*}_resized.jpg
}

main "$@"
