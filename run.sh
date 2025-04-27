#!/bin/bash

# -----------------------------------------------------------------------------
# Script de inicialización del entorno de ejecución
# Objetivo: Detectar automáticamente el intérprete de Python, configurar 
# el entorno virtual y arrancar la aplicación con su punto de entrada adecuado.
# -----------------------------------------------------------------------------

# Estrategia de detección de Python: busca primero python3 (preferido para compatibilidad)
# y luego cae en python como fallback (potencialmente peligroso en sistemas donde python=python2)
PYTHON_BIN=$(command -v python3 || command -v python)
if [ -z "$PYTHON_BIN" ]; then
    echo "Python is not installed. Please install Python 3.7 or newer."
    exit 1
fi

# Verificación de la versión de Python mediante introspección del sistema
PYTHON_VERSION=$($PYTHON_BIN -c 'import sys; print(f"{sys.version_info.major}.{sys.version_info.minor}")')
echo "Using Python at $PYTHON_BIN (version $PYTHON_VERSION)"

# Creación condicional del entorno virtual (.venv)
# Se utiliza el módulo venv nativo de Python 3 para asegurar consistencia
if [ ! -d ".venv" ]; then
    echo "Creating virtual environment..."
    $PYTHON_BIN -m venv .venv
fi

# Activación del entorno virtual mediante sourcing del script de activación
# Este paso modifica las variables de entorno PATH y PYTHON_PATH para usar el intérprete aislado
source .venv/bin/activate

# Actualización de pip para evitar problemas de compatibilidad con dependencias recientes
pip install --upgrade pip

# Instalación de dependencias desde requirements.txt
# El archivo debe contener todas las dependencias con sus versiones exactas (pinning)
if [ -f requirements.txt ]; then
    pip install -r requirements.txt
else
    echo "requirements.txt not found!"
    deactivate  # Limpieza del entorno en caso de error
    exit 1
fi

# Detección del punto de entrada de la aplicación mediante estrategia de fallback
# Sigue convenciones estándar de nomenclatura para aplicaciones Python
if [ -f main.py ]; then
    ENTRY=main.py
elif [ -f app.py ]; then
    ENTRY=app.py
elif [ -f console.py ]; then
    ENTRY=console.py
else
    echo "No entrypoint (main.py, app.py, console.py) found!"
    deactivate  # Limpieza del entorno en caso de error
    exit 1
fi

# Carga de variables de entorno desde .env (para configuración específica del entorno)
# Se filtran líneas comentadas mediante grep y se exportan usando xargs
if [ -f .env ]; then
    export $(grep -v '^#' .env | xargs)
fi

# Ejecución de la aplicación con el intérprete de Python del entorno virtual
echo "Starting $ENTRY..."
$PYTHON_BIN $ENTRY
