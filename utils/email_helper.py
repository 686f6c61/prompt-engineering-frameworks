"""
Módulo para el envío de correos electrónicos utilizando la API de Resend.

Este módulo proporciona funcionalidades para:
1. Envío de correos desde formularios de contacto
2. Configuración de remitentes y destinatarios desde variables de entorno
3. Manejo de errores y validación de parámetros
4. Formateo de contenido HTML para los correos

La implementación utiliza la API de Resend y soporta la configuración
mediante variables de entorno para mayor seguridad y flexibilidad.
"""

import os
import requests
from console import console

def send_contact_email(nombre, email, asunto, mensaje):
    """
    Envía un correo electrónico desde el formulario de contacto utilizando la API de Resend.
    
    Esta función maneja el proceso completo de envío de correos, incluyendo:
    - Verificación de la configuración de API
    - Validación de los datos de entrada
    - Formateo del mensaje HTML
    - Comunicación con la API de Resend
    - Manejo de errores y respuestas
    
    Args:
        nombre (str): Nombre del remitente
        email (str): Correo electrónico del remitente (para respuestas)
        asunto (str): Asunto del correo
        mensaje (str): Contenido del mensaje
        
    Returns:
        dict: Resultado de la operación con la siguiente estructura:
            {
                "success": bool,
                "message": str,  # Mensaje de éxito (opcional)
                "error": str     # Mensaje de error (opcional)
            }
    """
    # API Key de Resend
    RESEND_API_KEY = os.environ.get('RESEND_API_KEY')
    
    # Verificar que la API key existe
    if not RESEND_API_KEY:
        console.error("Error: RESEND_API_KEY no configurada en variables de entorno")
        return {
            "success": False,
            "error": "Error en la configuración del servidor. Por favor contacta al administrador."
        }
    
    # Validar que todos los campos estén presentes
    if not all([nombre, email, asunto, mensaje]):
        return {
            "success": False,
            "error": "Por favor completa todos los campos del formulario."
        }
    
    try:
        # Configurar la solicitud a la API de Resend
        headers = {
            'Authorization': f'Bearer {RESEND_API_KEY}',
            'Content-Type': 'application/json'
        }
        
        # Usar variables de entorno para las direcciones de correo
        if not os.environ.get('EMAIL_FROM') or not os.environ.get('EMAIL_TO'):
            console.error("Error: Variables de entorno EMAIL_FROM o EMAIL_TO no configuradas")
            return {"success": False, "error": "Configuración de email incompleta"}
            
        email_from = os.environ.get('EMAIL_FROM')
        email_to = os.environ.get('EMAIL_TO')
        
        # Crear la carga útil para la API
        payload = {
            'from': email_from,
            'to': [email_to],  # Correo destino desde variable de entorno
            'subject': f'[Formulario de contacto] {asunto}',
            'reply_to': email,
            'html': f"""
            <h2>Nuevo mensaje desde el formulario de contacto</h2>
            <p><strong>Nombre:</strong> {nombre}</p>
            <p><strong>Email:</strong> {email}</p>
            <p><strong>Asunto:</strong> {asunto}</p>
            <p><strong>Mensaje:</strong></p>
            <p>{mensaje}</p>
            """
        }
        
        # Enviar la solicitud a la API de Resend
        response = requests.post('https://api.resend.com/emails', 
                                headers=headers, 
                                json=payload)
        
        if response.status_code == 200 or response.status_code == 201:
            console.info(f"Correo enviado correctamente desde {email}")
            return {
                "success": True,
                "message": "Tu mensaje ha sido enviado correctamente. Te responderemos lo antes posible."
            }
        else:
            console.error(f"Error al enviar correo: {response.text}")
            return {
                "success": False,
                "error": "Error al enviar el mensaje. Por favor intenta de nuevo más tarde."
            }
            
    except Exception as e:
        console.error(f"Error al enviar correo: {str(e)}")
        return {
            "success": False,
            "error": f"Error al enviar el mensaje: {str(e)}"
        } 