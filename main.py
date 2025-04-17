"""
Punto de entrada principal de la aplicación Flask.
Este módulo configura y ejecuta el servidor web con las configuraciones
especificadas en las variables de entorno.

Environment Variables:
    FLASK_HOST: Host donde se ejecutará el servidor (default: "0.0.0.0")
    FLASK_PORT: Puerto para el servidor (default: 5000)
    FLASK_DEBUG: Modo debug habilitado/deshabilitado (default: True)
"""

from dotenv import load_dotenv
from app import app
import os
from console import console

# Cargar variables de entorno desde archivo .env
load_dotenv()

if __name__ == "__main__":
    # Configuración del servidor con valores por defecto si no existen en .env
    host = os.getenv("FLASK_HOST", "0.0.0.0")  # 0.0.0.0 permite conexiones externas
    port = int(os.getenv("FLASK_PORT", 5000))  # Puerto estándar para desarrollo Flask
    debug = os.getenv("FLASK_DEBUG", "True").lower() == "true"  # Modo debug para desarrollo
    
    # Logging de la configuración del servidor
    console.info("Iniciando servidor", {
        "host": host,
        "port": port,
        "debug": debug
    })
    
    # Iniciar el servidor Flask con la configuración especificada
    app.run(host=host, port=port, debug=debug)
