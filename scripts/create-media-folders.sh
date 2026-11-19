#!/usr/bin/env bash
# Create photo directories for training, service, and schedule slugs.
set -euo pipefail
ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
TRAINING_DIR="${ROOT_DIR}/public/images/training"
SERVICE_DIR="${ROOT_DIR}/public/images/service"
SCHEDULE_DIR="${ROOT_DIR}/public/images/schedule"
usage() { cat <<'USAGE'
Usage: scripts/create-media-folders.sh [options]
Options:
  --training-file FILE  Training slug list (one per line; CSV first column accepted)
  --service-file FILE   Service slug list
  --schedule-file FILE  Schedule slug list
  --training SLUG...   Create training folders
  --service SLUG...    Create service folders
  --schedule SLUG...   Create schedule folders
  --help               Show help
USAGE
}
create_slug_dir() {
  local kind="$1" slug="$2" target
  if [[ ! "$slug" =~ ^[a-z0-9]+([a-z0-9-]*[a-z0-9])?$ ]]; then echo "Skipping invalid slug: $slug" >&2; return 1; fi
  case "$kind" in training) target="${TRAINING_DIR}/${slug}" ;; service) target="${SERVICE_DIR}/${slug}" ;; schedule) target="${SCHEDULE_DIR}/${slug}" ;; *) echo "Unknown category: $kind" >&2; return 1 ;; esac
  mkdir -p "$target"
  printf 'Created/verified: %s\n' "${target#"$ROOT_DIR"/}"
}
read_slug_file() {
  local kind="$1" file="$2" line slug
  [[ -f "$file" ]] || { echo "File not found: $file" >&2; return 1; }
  while IFS= read -r line || [[ -n "$line" ]]; do
    line="${line%%#*}"; line="${line//$'\r'/}"
    [[ -z "${line//[[:space:]]/}" ]] && continue
    slug="${line%%,*}"; slug="${slug#\"}"; slug="${slug%\"}"; slug="${slug#\'}"; slug="${slug%\'}"
    slug="$(printf '%s' "$slug" | tr -d '[:space:]')"
    [[ "$slug" == "slug" || "$slug" == "TrainingSlug" || "$slug" == "serviceSlug" || "$slug" == "scheduleSlug" ]] && continue
    create_slug_dir "$kind" "$slug"
  done < "$file"
}
[[ $# -gt 0 ]] || { usage; exit 0; }
while [[ $# -gt 0 ]]; do
  case "$1" in
    --training-file|--service-file|--schedule-file)
      option="$1"; [[ $# -ge 2 ]] || { echo "Missing file for $option" >&2; exit 2; }
      case "$option" in --training-file) read_slug_file training "$2";; --service-file) read_slug_file service "$2";; --schedule-file) read_slug_file schedule "$2";; esac
      shift 2;;
    --training|--service|--schedule)
      option="$1"; shift
      [[ $# -gt 0 ]] || { echo "Supply slugs for $option" >&2; exit 2; }
      case "$option" in --training) kind=training;; --service) kind=service;; --schedule) kind=schedule;; esac
      while [[ $# -gt 0 && "$1" != --* ]]; do create_slug_dir "$kind" "$1"; shift; done;;
    --help|-h) usage; exit 0;;
    *) echo "Unknown option: $1" >&2; usage >&2; exit 2;;
  esac
done
