"""
Módulo para gestionar los límites de tasa de uso del modelo gratuito GPT-3.5.
Implementa limitación de 10 solicitudes por hora por usuario.
"""

from flask import session
import time
from datetime import datetime, timedelta
from console import console

# Constantes para el límite de tasa
RATE_LIMIT_MAX = 10  # Máximo número de solicitudes permitidas por hora
RATE_LIMIT_WINDOW = 3600  # Ventana de tiempo en segundos (1 hora)

def check_rate_limit():
    """
    Verifica si el usuario ha excedido el límite de solicitudes.
    
    Returns:
        tuple: (is_limited, remaining, reset_time_str)
            - is_limited (bool): True si se ha alcanzado el límite
            - remaining (int): Número de solicitudes restantes
            - reset_time_str (str): Tiempo restante hasta reinicio del contador
    """
    # Si el usuario usa su propia API key, no aplicar límite
    if session.get('use_custom_api_key', False):
        return False, RATE_LIMIT_MAX, "N/A"
    
    # Obtener datos de uso actuales de la sesión
    current_time = int(time.time())
    usage_data = session.get('usage_data', {})
    
    # Si no hay datos previos, inicializar con valores por defecto
    if not usage_data:
        usage_data = {
            'count': 0,
            'start_time': current_time,
            'requests': []
        }
        
    # Limpiar solicitudes antiguas (más de 1 hora)
    requests = [req for req in usage_data.get('requests', []) 
                if current_time - req < RATE_LIMIT_WINDOW]
    
    # Verificar si necesitamos reiniciar el contador
    if current_time - usage_data.get('start_time', 0) >= RATE_LIMIT_WINDOW:
        usage_data = {
            'count': 0,
            'start_time': current_time,
            'requests': requests
        }
    
    # Actualizar la sesión con los datos limpios
    usage_data['requests'] = requests
    session['usage_data'] = usage_data
    
    # Calcular solicitudes restantes
    used_count = len(requests)
    remaining = RATE_LIMIT_MAX - used_count
    
    # Calcular tiempo hasta reinicio
    if used_count > 0:
        oldest_request = min(requests)
        reset_time = oldest_request + RATE_LIMIT_WINDOW - current_time
        reset_time_str = format_time_remaining(reset_time)
    else:
        reset_time_str = "1 hora"
    
    # Determinar si se ha alcanzado el límite
    is_limited = remaining <= 0
    
    return is_limited, remaining, reset_time_str

def increment_usage():
    """
    Incrementa el contador de uso después de una solicitud exitosa.
    
    Returns:
        tuple: (remaining, reset_time_str)
            - remaining (int): Número de solicitudes restantes
            - reset_time_str (str): Tiempo restante hasta reinicio del contador
    """
    # Si el usuario usa su propia API key, no contar
    if session.get('use_custom_api_key', False):
        return RATE_LIMIT_MAX, "N/A"
    
    # Obtener datos actuales
    current_time = int(time.time())
    usage_data = session.get('usage_data', {})
    
    # Si no hay datos previos, inicializar
    if not usage_data:
        usage_data = {
            'count': 0,
            'start_time': current_time,
            'requests': []
        }
    
    # Limpiar solicitudes antiguas
    requests = [req for req in usage_data.get('requests', []) 
                if current_time - req < RATE_LIMIT_WINDOW]
    
    # Añadir la solicitud actual
    requests.append(current_time)
    
    # Actualizar datos
    usage_data['count'] = len(requests)
    usage_data['requests'] = requests
    
    # Si es la primera solicitud, establecer el tiempo de inicio
    if 'start_time' not in usage_data:
        usage_data['start_time'] = current_time
    
    # Guardar en la sesión
    session['usage_data'] = usage_data
    
    # Calcular solicitudes restantes
    remaining = RATE_LIMIT_MAX - len(requests)
    
    # Calcular tiempo hasta reinicio
    if requests:
        oldest_request = min(requests)
        reset_time = oldest_request + RATE_LIMIT_WINDOW - current_time
        reset_time_str = format_time_remaining(reset_time)
    else:
        reset_time_str = "1 hora"
    
    return remaining, reset_time_str

def get_usage_info():
    """
    Obtiene información detallada sobre el uso actual.
    
    Returns:
        dict: Información sobre el uso actual
    """
    # Si el usuario usa su propia API key, no hay límite
    if session.get('use_custom_api_key', False):
        return {
            'limited': False,
            'premium': True,
            'remaining': RATE_LIMIT_MAX,
            'max': RATE_LIMIT_MAX,
            'reset_time': "N/A"
        }
    
    # Verificar límite actual
    is_limited, remaining, reset_time_str = check_rate_limit()
    
    return {
        'limited': is_limited,
        'premium': False,
        'remaining': remaining,
        'max': RATE_LIMIT_MAX,
        'reset_time': reset_time_str
    }

def format_time_remaining(seconds):
    """
    Formatea el tiempo restante en un formato legible.
    
    Args:
        seconds (int): Tiempo en segundos
        
    Returns:
        str: Tiempo formateado
    """
    if seconds < 60:
        return f"{seconds} segundos"
    elif seconds < 3600:
        minutes = seconds // 60
        return f"{minutes} minutos"
    else:
        hours = seconds // 3600
        minutes = (seconds % 3600) // 60
        if minutes > 0:
            return f"{hours} horas y {minutes} minutos"
        else:
            return f"{hours} horas" 