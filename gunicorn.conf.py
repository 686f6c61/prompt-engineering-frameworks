#!/usr/bin/env python
# -----------------------------------------------------------------------------
# Configuración del servidor WSGI Gunicorn para entornos de producción
# Este archivo define parámetros óptimos para el despliegue de la aplicación Flask
# -----------------------------------------------------------------------------

import os

# Dirección IP y puerto de escucha
# Utiliza la variable PORT del entorno o 8000 como valor predeterminado
# Se vincula a todas las interfaces de red (0.0.0.0) para permitir conexiones externas
bind = f"0.0.0.0:{os.environ.get('PORT', '8000')}"

# Número de procesos worker independientes
# Recomendación: 2-4 × núcleos_CPU para cargas intensivas en CPU
# Un valor bajo es adecuado para aplicaciones con uso intensivo de API externas
workers = 2

# Número de hilos por worker
# Aumenta la concurrencia sin el overhead de procesos adicionales
# Útil para operaciones I/O bound como llamadas a API externas
threads = 2

# Tiempo máximo (en segundos) que un worker puede tardar en procesar una solicitud
# Valor elevado para permitir solicitudes largas a la API de OpenAI
timeout = 120

# Clase de worker: determina el modelo de concurrencia
# 'sync': Modelo sincrónico estándar, adecuado para aplicaciones Flask simples
# Alternativas: 'eventlet', 'gevent' (para mayor concurrencia en operaciones I/O)
worker_class = "sync"

# Configuración de logs
# "-" envía los logs a stdout/stderr, que Render.com captura automáticamente
accesslog = "-"  # Registro de solicitudes HTTP
errorlog = "-"   # Registro de errores del servidor
loglevel = "info"  # Nivel de detalle: debug, info, warning, error, critical
