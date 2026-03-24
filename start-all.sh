#!/usr/bin/env bash
set -e

# Start both backend and frontend in parallel using concurrently
npx concurrently --kill-others-on-fail "npm --prefix astraos-backend run dev" "npm --prefix astraos-frontend run dev"
