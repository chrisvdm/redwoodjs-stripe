#!/bin/bash
#
# Run the CLI's setup command on a Redwood app.
#
# ```bash
# REDWOOD_APP=../my-app ./scripts/test_setup.sh
# # And if we should build this repo first...
# REDWOOD_APP=../my-app ./scripts/test_setup.sh --build
# ```

set -x

if [ -z "$REDWOOD_APP" ]; then
  echo "Set the REDWOOD_APP environment variable to the path of the app you want to test against."
  exit 1
fi

SCRIPT_PATH=$(readlink -f "$0")
SCRIPT_DIR=$(dirname "$SCRIPT_PATH")
BASE_DIR=$(dirname "$SCRIPT_DIR")

# Check for `--build`
BUILD=false

for arg in "$@"
do
  if [ "$arg" == "--build" ]; then
    BUILD=true
  fi
done

if $BUILD; then
  cd "$BASE_DIR" || exit 1
  yarn build
fi

cd "$REDWOOD_APP" || exit 1

node "${BASE_DIR}/cli/dist/cli.js" setup