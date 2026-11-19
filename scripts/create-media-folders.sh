#!/usr/bin/env bash
# Create photo directories for training and service slugs.
# Slug list files: one slug per line, or CSV with slug in the first column.
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
TRAINING_DIR="${ROOT_DIR}/public/images/training"
SERVICE_DIR="${ROOT_DIR}/public/images/service"

usage() {
  cat <<'USAGE'
Usage:
  scripts/create-media-folders.sh [options]

Options:
  --training-file FILE   File containing training slugs (one per line; CSV first column also accepted)
  --service-file FILE    File containing service slugs (one per line; CSV first column also accepted)
  --training SLUG...    Create training directories for the listed slugs
  --service SLUG...     Create service directories for the listed slugs
  --help                Show this help

Directories are created under public/images/training/ and public/images/service/.
The script does not delete or modify existing files.
USAGE
}

create_slug_dir() {
  local kind="$1" slug="$2" target
  # Restrict slugs to safe path segments; reject traversal and unexpected characters.
  if [[ ! "$slug" =~ ^[a-z0-9]+([a-z0-9-]*[a-z0-9])?$ ]]; then
    echo "Skipping invalid slug: $slug" >&2
    return 1
  fi
  case "$kind" in
    training) target="${TRAINING_DIR}/${slug}" ;;
    service) target="${SERVICE_DIR}/${slug}" ;;
    *) echo "Unknown category: $kind" >&2; return 1 ;;
  esac
  mkdir -p "$target"
  printf 'Created/verified: %s\n' "${target#"$ROOT_DIR"/}"
}

read_slug_file() {
  local kind="$1" file="$2" line slug
  [[ -f "$file" ]] || { echo "File not found: $file" >&2; return 1; }
  while IFS= read -r line || [[ -n "$line" ]]; do
    line="${line%%#*}"
    line="${line//$'\r'/}"
    [[ -z "${line//[[:space:]]/}" ]] && continue
    slug="${line%%,*}"
    slug="${slug#\"}"; slug="${slug%\"}"
    slug="${slug#\'}"; slug="${slug%\'}"
    slug="$(printf '%s' "$slug" | tr -d '[:space:]')"
    [[ "$slug" == "slug" || "$slug" == "TrainingSlug" || "$slug" == "serviceSlug" ]] && continue
    create_slug_dir "$kind" "$slug"
  done < "$file"
}

if [[ $# -eq 0 ]]; then usage; exit 0; fi

while [[ $# -gt 0 ]]; do
  case "$1" in
    --training-file)
      [[ $# -ge 2 ]] || { echo "Missing file for --training-file" >&2; exit 2; }
      read_slug_file training "$2"; shift 2 ;;
    --service-file)
      [[ $# -ge 2 ]] || { echo "Missing file for --service-file" >&2; exit 2; }
      read_slug_file service "$2"; shift 2 ;;
    --training)
      shift
      [[ $# -gt 0 ]] || { echo "Supply at least one training slug" >&2; exit 2; }
      while [[ $# -gt 0 && "$1" != --* ]]; do create_slug_dir training "$1"; shift; done ;;
    --service)
      shift
      [[ $# -gt 0 ]] || { echo "Supply at least one service slug" >&2; exit 2; }
      while [[ $# -gt 0 && "$1" != --* ]]; do create_slug_dir service "$1"; shift; done ;;
    --help|-h) usage; exit 0 ;;
    *) echo "Unknown option: $1" >&2; usage >&2; exit 2 ;;
  esac
done
