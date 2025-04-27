#!/bin/bash

# -----------------------------------------------------------------------------
# Script de inicialización y despliegue para entorno Render.com
# Objetivo: Preparar e iniciar la aplicación en el servicio web de Render
# Este script se ejecuta como comando de inicio definido en render.yaml
# -----------------------------------------------------------------------------

# Asegurar que tenemos las dependencias actualizadas
# Esto es redundante con el buildCommand en render.yaml pero añade resiliencia
# por si el buildCommand falla o si el script se ejecuta manualmente
pip install -r requirements.txt

# Cargar variables de entorno desde archivo .env si existe
# Principalmente útil para desarrollo local y pruebas
# En producción Render.com inyecta las variables directamente
if [ -f .env ]; then
  echo "Cargando variables de entorno desde .env"
  # Filtramos comentarios y procesamos solo las líneas con formato KEY=VALUE
  export $(cat .env | grep -v '#' | awk '/=/ {print $1}')
fi

# Iniciar la aplicación utilizando Gunicorn como servidor WSGI
# Gunicorn proporciona paralelismo y mejor rendimiento que el servidor 
# de desarrollo de Flask para entornos de producción
echo "Iniciando servidor con Gunicorn..."
# Utilizamos un archivo de configuración separado para definir 
# workers, timeouts, logging, etc.
gunicorn --config=gunicorn.conf.py app:app
