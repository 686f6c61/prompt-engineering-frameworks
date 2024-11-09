"""
Módulo de logging personalizado con formato y colores para mejor legibilidad.

Este módulo proporciona una clase Console que implementa diferentes niveles
de logging (error, warn, info, debug) con formato consistente, incluyendo
timestamp, ubicación del código y colores para mejor visualización.

Ejemplo de uso:
    from console import console
    
    console.info("Servidor iniciado")
    console.error("Error en la conexión", {"error": "timeout"})
"""

import inspect
import json
from datetime import datetime
from typing import Any

class Console:
    @staticmethod
    def log(*args: Any, label: str = None) -> None:
        """
        Método base para imprimir logs con formato.

        Args:
            *args: Argumentos variables a loggear. Pueden ser strings, dicts o listas.
            label: Etiqueta opcional para categorizar el log (e.g., "ERROR", "INFO").

        Formato del log:
            [timestamp] archivo:línea [LABEL] mensaje
        """
        timestamp = datetime.now().strftime("%H:%M:%S")
        caller = inspect.currentframe().f_back
        filename = caller.f_code.co_filename.split('/')[-1]
        line_number = caller.f_lineno
        
        # Formatear el mensaje para tipos complejos (dict, list)
        message = []
        for arg in args:
            if isinstance(arg, (dict, list)):
                message.append(json.dumps(arg, indent=2, ensure_ascii=False))
            else:
                message.append(str(arg))
        
        # Construir el log con colores ANSI
        log_parts = [
            f"\033[90m[{timestamp}]\033[0m",  # Timestamp en gris
            f"\033[36m{filename}:{line_number}\033[0m",  # Ubicación en cyan
        ]
        
        if label:
            log_parts.append(f"\033[35m[{label}]\033[0m")  # Label en magenta
            
        log_parts.extend(message)
        
        print(" ".join(log_parts))

    @staticmethod
    def error(*args: Any) -> None:
        """
        Imprime logs de nivel ERROR.
        Los mensajes de error se muestran con la etiqueta [ERROR].
        """
        Console.log(*args, label="ERROR")

    @staticmethod
    def warn(*args: Any) -> None:
        """
        Imprime logs de nivel WARNING.
        Las advertencias se muestran con la etiqueta [WARN].
        """
        Console.log(*args, label="WARN")

    @staticmethod
    def info(*args: Any) -> None:
        """
        Imprime logs de nivel INFO.
        Los mensajes informativos se muestran con la etiqueta [INFO].
        """
        Console.log(*args, label="INFO")

    @staticmethod
    def debug(*args: Any) -> None:
        """
        Imprime logs de nivel DEBUG.
        Los mensajes de debug se muestran con la etiqueta [DEBUG].
        """
        Console.log(*args, label="DEBUG")

# Crear una instancia global para uso en toda la aplicación
console = Console()
