"""
Módulo para gestionar los límites de tasa de uso del modelo gratuito GPT-3.5.
Implementa limitación de 10 solicitudes por hora por usuario.

Este módulo proporciona:
1. Funciones para verificar límites de uso basados en ventanas de tiempo
2. Seguimiento de solicitudes realizadas por usuario mediante sesiones Flask
3. Incremento y gestión de contadores de uso
4. Formateo de tiempos restantes en formato legible
5. Soporte para bypass de limitaciones con API keys personales
6. Sistema de códigos para aumentar el límite de solicitudes

La implementación utiliza un sistema basado en ventanas deslizantes (sliding window)
que permite una gestión precisa de las solicitudes, eliminando automáticamente
las solicitudes antiguas y manteniendo un conteo exacto de uso por usuario.
"""

from flask import session
import time
from datetime import datetime, timedelta
from console import console

# ===================================
# CONSTANTES Y CONFIGURACIÓN
# ===================================

# Constantes para el límite de tasa
DEFAULT_RATE_LIMIT = 10  # Límite predeterminado de solicitudes por hora
ENHANCED_RATE_LIMIT = 30  # Límite aumentado con código válido
RATE_LIMIT_WINDOW = 3600  # Ventana de tiempo en segundos (1 hora)

# Códigos promocionales válidos para aumentar el límite
VALID_CODES = {
    "CLASEEVARISTOYSONIA",
    "CLASEIA",
}


# ===================================
# FUNCIONES PRINCIPALES
# ===================================

def is_valid_promo_code(code):
    """
    Verifica si un código promocional es válido.
    
    Args:
        code (str): El código promocional a verificar
        
    Returns:
        bool: True si el código es válido, False en caso contrario
    """
    if not code or code.strip() == "":
        return False
    
    # Normalizar el código (eliminar espacios y convertir a mayúsculas)
    normalized_code = code.strip().upper()
    
    # Comprobar si el código normalizado está en el conjunto de códigos válidos
    for valid_code in VALID_CODES:
        if normalized_code == valid_code.upper():
            return True
            
    # Si llegamos aquí, el código no es válido
    console.debug(f"Código promocional inválido: '{code}', normalizado: '{normalized_code}'")
    return False

def set_promo_code(code):
    """
    Establece un código promocional en la sesión del usuario.
    
    Args:
        code (str): El código promocional a establecer
        
    Returns:
        bool: True si el código es válido y se estableció correctamente, False en caso contrario
    """
    if is_valid_promo_code(code):
        session['promo_code'] = code
        return True
    return False

def get_rate_limit_max():
    """
    Obtiene el límite máximo de solicitudes aplicable al usuario actual.
    
    Returns:
        int: El límite máximo de solicitudes (10 por defecto, 30 con código válido)
    """
    # Si el usuario usa su propia API key, no hay límite aplicable
    if session.get('use_custom_api_key', False):
        return ENHANCED_RATE_LIMIT
    
    # Si el usuario tiene un código promocional válido, aplicar límite aumentado
    promo_code = session.get('promo_code', '')
    if is_valid_promo_code(promo_code):
        return ENHANCED_RATE_LIMIT
    
    # Caso por defecto: límite estándar
    return DEFAULT_RATE_LIMIT

def check_rate_limit():
    """
    Verifica si el usuario ha excedido el límite de solicitudes.
    
    Esta función examina los datos de uso almacenados en la sesión del usuario
    y determina si ha alcanzado el límite máximo de solicitudes permitidas
    en la ventana de tiempo actual. También realiza limpieza de solicitudes
    antiguas y reinicia el contador si es necesario.
    
    Funcionamiento:
    1. Si el usuario utiliza su API key personal, no se aplican límites
    2. Obtiene y limpia datos de sesión, eliminando solicitudes antiguas
    3. Reinicia el contador si la ventana de tiempo ha expirado
    4. Calcula solicitudes restantes y tiempo hasta reinicio
    
    Returns:
        tuple: Un tuple con tres elementos:
            - is_limited (bool): True si se ha alcanzado el límite de solicitudes
            - remaining (int): Número de solicitudes restantes en la ventana actual
            - reset_time_str (str): Tiempo restante hasta reinicio del contador en formato legible
    
    Ejemplo:
        >>> is_limited, remaining, reset_time = check_rate_limit()
        >>> if is_limited:
        >>>     return "Has alcanzado el límite de solicitudes. Espera " + reset_time
        >>> else:
        >>>     return f"Tienes {remaining} solicitudes restantes"
    """
    # Si el usuario usa su propia API key, no aplicar límite
    if session.get('use_custom_api_key', False):
        return False, get_rate_limit_max(), "N/A"
    
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
    # Usamos comprensión de listas para filtrar solicitudes dentro de la ventana actual
    requests = [req for req in usage_data.get('requests', []) 
                if current_time - req < RATE_LIMIT_WINDOW]
    
    # Verificar si necesitamos reiniciar el contador
    # Si ha pasado una hora completa desde el inicio, reiniciamos el contador
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
    rate_limit_max = get_rate_limit_max()
    remaining = rate_limit_max - used_count
    
    # Calcular tiempo hasta reinicio
    # Si hay solicitudes, el reinicio ocurrirá cuando expire la más antigua
    if used_count > 0:
        oldest_request = min(requests)
        reset_time = oldest_request + RATE_LIMIT_WINDOW - current_time
        reset_time_str = format_time_remaining(reset_time)
    else:
        # Si no hay solicitudes, el tiempo de reinicio es la duración total de la ventana
        reset_time_str = "1 hora"
    
    # Determinar si se ha alcanzado el límite
    is_limited = remaining <= 0
    
    return is_limited, remaining, reset_time_str

def increment_usage():
    """
    Incrementa el contador de uso después de una solicitud exitosa.
    
    Esta función se utiliza después de procesar una solicitud válida para:
    1. Registrar la solicitud en el historial del usuario
    2. Actualizar el contador de uso
    3. Calcular las solicitudes restantes y el tiempo hasta reinicio
    
    Al igual que check_rate_limit(), esta función implementa la lógica de ventana
    deslizante, eliminando solicitudes antiguas y manteniendo un registro preciso
    de las solicitudes realizadas dentro de la ventana de tiempo actual.
    
    Returns:
        tuple: Un tuple con dos elementos:
            - remaining (int): Número de solicitudes restantes en la ventana actual
            - reset_time_str (str): Tiempo restante hasta reinicio del contador en formato legible
    
    Ejemplo:
        >>> remaining, reset_time = increment_usage()
        >>> console.info(f"Solicitud procesada. Restantes: {remaining}, Reinicio en: {reset_time}")
    
    Nota: 
        Esta función debe llamarse sólo cuando una solicitud ha sido procesada
        correctamente, para evitar contabilizar intentos fallidos.
    """
    # Si el usuario usa su propia API key, no contar
    if session.get('use_custom_api_key', False):
        return get_rate_limit_max(), "N/A"
    
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
    # Filtramos las solicitudes para mantener sólo las que están dentro de la ventana actual
    requests = [req for req in usage_data.get('requests', []) 
                if current_time - req < RATE_LIMIT_WINDOW]
    
    # Añadir la solicitud actual
    # Registramos el timestamp de la solicitud actual para control futuro
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
    rate_limit_max = get_rate_limit_max()
    remaining = rate_limit_max - len(requests)
    
    # Calcular tiempo hasta reinicio
    # El tiempo de reinicio se basa en cuándo expirará la solicitud más antigua
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
    
    Esta función proporciona un diccionario completo con toda la información
    relevante sobre el estado actual del límite de uso, incluyendo:
    - Si el usuario ha alcanzado el límite
    - Si está usando una cuenta premium (API key propia)
    - Número de solicitudes restantes
    - Número máximo de solicitudes permitidas
    - Tiempo hasta el reinicio del contador
    
    Returns:
        dict: Diccionario con la siguiente estructura:
            {
                'limited': bool,    # True si ha alcanzado el límite
                'premium': bool,    # True si usa API key propia
                'remaining': int,   # Solicitudes restantes
                'max': int,         # Máximo de solicitudes permitidas
                'reset_time': str   # Tiempo hasta reinicio en formato legible
                'has_promo': bool,  # True si tiene código promocional activo
            }
    
    Ejemplo:
        >>> info = get_usage_info()
        >>> if info['limited']:
        >>>     mensaje = "Has alcanzado el límite. Reinicio en " + info['reset_time']
        >>> else:
        >>>     mensaje = f"Tienes {info['remaining']} de {info['max']} solicitudes disponibles"
    """
    rate_limit_max = get_rate_limit_max()
    has_promo = session.get('promo_code', '') in VALID_CODES
    
    # Si el usuario usa su propia API key, no hay límite
    # Consideramos estos usuarios como 'premium' y no aplica límite
    if session.get('use_custom_api_key', False):
        return {
            'limited': False,
            'premium': True,
            'remaining': rate_limit_max,
            'max': rate_limit_max,
            'reset_time': "N/A",
            'has_promo': has_promo
        }
    
    # Verificar límite actual
    # Reutilizamos la función check_rate_limit para obtener el estado actual
    is_limited, remaining, reset_time_str = check_rate_limit()
    
    return {
        'limited': is_limited,
        'premium': False,
        'remaining': remaining,
        'max': rate_limit_max,
        'reset_time': reset_time_str,
        'has_promo': has_promo
    }

# ===================================
# FUNCIONES DE UTILIDAD
# ===================================

def format_time_remaining(seconds):
    """
    Formatea el tiempo restante en un formato legible para humanos.
    
    Esta función convierte un valor de tiempo en segundos a una cadena
    descriptiva en formato legible, ajustando automáticamente las unidades
    (segundos, minutos, horas) según la duración del tiempo.
    
    Args:
        seconds (int): Tiempo en segundos a formatear
        
    Returns:
        str: Tiempo formateado en una cadena legible como:
             - "X segundos" si es menos de un minuto
             - "X minutos" si es menos de una hora
             - "X horas y Y minutos" o "X horas" si es más de una hora
    
    Ejemplo:
        >>> format_time_remaining(30)
        "30 segundos"
        >>> format_time_remaining(125)
        "2 minutos"
        >>> format_time_remaining(3725)
        "1 horas y 2 minutos"
    """
    # Menos de un minuto: mostrar en segundos
    if seconds < 60:
        return f"{seconds} segundos"
    # Entre un minuto y una hora: mostrar en minutos
    elif seconds < 3600:
        minutes = seconds // 60
        return f"{minutes} minutos"
    # Más de una hora: mostrar en horas y minutos
    else:
        hours = seconds // 3600
        minutes = (seconds % 3600) // 60
        # Solo incluir minutos si son mayores que cero
        if minutes > 0:
            return f"{hours} horas y {minutes} minutos"
        else:
            return f"{hours} horas" 