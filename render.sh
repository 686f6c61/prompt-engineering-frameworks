#!/bin/bash

# Instalar dependencias
pip install -r requirements.txt

# Exportar variables de entorno desde .env si existe (para pruebas locales)
if [ -f .env ]; then
  echo "Cargando variables de entorno desde .env"
  export $(cat .env | grep -v '#' | awk '/=/ {print $1}')
fi

# Iniciar la aplicación con Gunicorn
echo "Iniciando servidor con Gunicorn..."
gunicorn --config=gunicorn.conf.py app:app
