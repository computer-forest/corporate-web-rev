#!/usr/bin/env bash
# Download Figma MCP asset URLs into public/figma/<group>/.
#
# Usage: scripts/fetch-figma-assets.sh <group> <url> [<url> ...]
# Files are named <group>-NN.<ext> in the order given, so the order must match
# the layer order in the component's `layers` array.
set -euo pipefail

group="$1"; shift
out="public/figma/$group"
mkdir -p "$out"

i=0
for url in "$@"; do
  case "$url" in
    *.svg*) ext=svg ;;
    *)      ext=png ;;
  esac
  path=$(printf '%s/%s-%02d.%s' "$out" "$group" "$i" "$ext")
  curl -sSL --fail -o "$path" "$url"
  printf '%s  %s bytes\n' "$path" "$(wc -c <"$path")"
  i=$((i + 1))
done
