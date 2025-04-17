#!/bin/bash

# Detect Python version (prefer python3, fallback to python)
PYTHON_BIN=$(command -v python3 || command -v python)
if [ -z "$PYTHON_BIN" ]; then
    echo "Python is not installed. Please install Python 3.7 or newer."
    exit 1
fi

PYTHON_VERSION=$($PYTHON_BIN -c 'import sys; print(f"{sys.version_info.major}.{sys.version_info.minor}")')
echo "Using Python at $PYTHON_BIN (version $PYTHON_VERSION)"

# Create virtual environment if not exists
if [ ! -d ".venv" ]; then
    echo "Creating virtual environment..."
    $PYTHON_BIN -m venv .venv
fi

# Activate virtual environment
source .venv/bin/activate

# Upgrade pip
pip install --upgrade pip

# Install requirements
if [ -f requirements.txt ]; then
    pip install -r requirements.txt
else
    echo "requirements.txt not found!"
    deactivate
    exit 1
fi

# Detect main entrypoint (prefer main.py, then app.py, then console.py)
if [ -f main.py ]; then
    ENTRY=main.py
elif [ -f app.py ]; then
    ENTRY=app.py
elif [ -f console.py ]; then
    ENTRY=console.py
else
    echo "No entrypoint (main.py, app.py, console.py) found!"
    deactivate
    exit 1
fi

# Load environment variables from .env if it exists
if [ -f .env ]; then
    export $(grep -v '^#' .env | xargs)
fi

echo "Starting $ENTRY..."
$PYTHON_BIN $ENTRY
