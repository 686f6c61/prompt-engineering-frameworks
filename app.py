"""
Módulo principal de la aplicación Flask.

Este módulo define las rutas y endpoints de la API, maneja las solicitudes HTTP
y coordina la lógica de negocio relacionada con los frameworks de prompts.

Environment Variables:
    FLASK_SECRET_KEY: Clave secreta para la aplicación Flask (default: "dev_key")
"""

import os
import secrets
from flask import Flask, render_template, request, jsonify, redirect, url_for, session
from utils.openai_helper import optimize_prompt, count_tokens, get_framework_recommendation, FRAMEWORK_EXAMPLES
from utils.openai_helper import DEFAULT_MODEL, PREMIUM_MODEL
from utils.prompt_formatter import format_prompt_markdown
from console import console

# Inicialización de la aplicación Flask
app = Flask(__name__)

# Configuración de seguridad
# Usar variable de entorno FLASK_SECRET_KEY o generar una clave si no existe
app.secret_key = os.environ.get('FLASK_SECRET_KEY', secrets.token_hex(16))
# Configurar sesión para que dure 30 días
app.config['PERMANENT_SESSION_LIFETIME'] = 60 * 60 * 24 * 30

@app.route('/')
def index():
    """
    Ruta principal que renderiza la página de inicio.
    
    Returns:
        template: Renderiza index.html
    """
    console.info("Acceso a la página principal")
    # Obtener el modelo actual para mostrarlo en la interfaz
    if session.get('use_custom_api_key', False):
        current_model = PREMIUM_MODEL
        is_custom = True
    else:
        current_model = DEFAULT_MODEL
        is_custom = False
        
    return render_template('index.html', 
                          current_model=current_model,
                          is_custom=is_custom)

@app.route('/configuracion', methods=['GET', 'POST'])
def configuracion():
    """
    Ruta para gestionar la configuración del modelo a usar.
    
    GET: Muestra la página de configuración.
    POST: Actualiza la configuración con los valores proporcionados.
    
    Returns:
        GET: template configuracion.html
        POST: redirect a la página principal
    """
    if request.method == 'POST':
        # Marcar la sesión como permanente para que dure 30 días
        session.permanent = True
        
        # Obtener la opción seleccionada
        model_option = request.form.get('model_option', 'free')
        
        if model_option == 'premium':
            api_key = request.form.get('api_key', '').strip()
            if api_key and api_key.startswith('sk-'):
                # Guardar la configuración en la sesión
                session['use_custom_api_key'] = True
                session['api_key'] = api_key
                console.info("Configuración actualizada: Usando modelo premium con API key personalizada")
            else:
                # Si la API key no es válida, usar el modelo gratuito
                session['use_custom_api_key'] = False
                session.pop('api_key', None)
                console.warn("API Key no válida, usando modelo gratuito")
        else:
            # Configurar para usar el modelo gratuito
            session['use_custom_api_key'] = False
            session.pop('api_key', None)
            console.info("Configuración actualizada: Usando modelo gratuito")
        
        # Redireccionar a la página principal
        return redirect(url_for('index'))
    
    # Para solicitudes GET, mostrar la página de configuración
    return render_template(
        'configuracion.html',
        use_custom_api_key=session.get('use_custom_api_key', False),
        api_key=session.get('api_key', ''),
        default_model=DEFAULT_MODEL,
        premium_model=PREMIUM_MODEL
    )

@app.route('/api/get-example', methods=['POST'])
def get_framework_example():
    """
    Endpoint para obtener ejemplos de uso de frameworks específicos.
    
    Expects:
        JSON: {
            "framework": string  # Nombre del framework solicitado
        }
    
    Returns:
        JSON: {
            "success": bool,
            "example": string,
            "error": string (opcional)
        }
    """
    data = request.json
    framework = data.get('framework', '').lower()
    console.debug("Solicitando ejemplo para framework", framework)
    try:
        example = FRAMEWORK_EXAMPLES.get(framework, 'Ejemplo no disponible')
        return jsonify({"success": True, "example": example})
    except Exception as e:
        console.error("Error al obtener ejemplo", str(e))
        return jsonify({"success": False, "error": str(e)}), 400

@app.route('/api/recommend-framework', methods=['POST'])
def recommend_framework():
    """
    Endpoint para recibir un objetivo y recomendar el framework más apropiado.
    
    Expects:
        JSON: {
            "objective": string  # Objetivo para el cual se necesita recomendación
        }
    
    Returns:
        JSON: {
            "success": bool,
            "recommendation": string,
            "error": string (opcional)
        }
    """
    data = request.json
    objective = data.get('objective', '')
    
    if not objective:
        return jsonify({"success": False, "error": "Objetivo no proporcionado"}), 400
    
    try:
        # Obtener la recomendación como texto plano
        recommendation_text = get_framework_recommendation(objective)
        
        # Verificar brevemente que el formato es válido
        if "FRAMEWORK:" not in recommendation_text:
            console.error("Formato de respuesta inválido")
            return jsonify({"success": False, "error": "Formato de respuesta inválido"}), 400
        
        return jsonify({"success": True, "recommendation": recommendation_text})
    except Exception as e:
        console.error("Error al obtener recomendación", str(e))
        return jsonify({"success": False, "error": str(e)}), 400

@app.route('/api/generate', methods=['POST'])
def generate_prompt():
    """
    Endpoint para generar prompts optimizados basados en frameworks seleccionados.
    
    Expects:
        JSON: {
            "frameworks": list,  # Lista de frameworks a utilizar
            "formData": dict,   # Datos del formulario
            "isCombined": bool  # Indica si se deben combinar múltiples frameworks
        }
    
    Returns:
        JSON: {
            "success": bool,
            "prompt": string,
            "error": string (opcional)
        }
    """
    data = request.json
    frameworks = data.get('frameworks', [])
    form_data = data.get('formData', {})
    is_combined = data.get('isCombined', False)
    
    try:
        if is_combined:
            result = optimize_prompt("combined", form_data, frameworks)
        else:
            result = optimize_prompt(frameworks[0], form_data)
        
        # Format the prompt with Markdown formatting
        formatted_result = format_prompt_markdown(result)
        
        return jsonify({"success": True, "prompt": formatted_result, "raw_prompt": result})
    except Exception as e:
        return jsonify({"success": False, "error": f"Error al generar el prompt: {str(e)}"}), 400

@app.route('/api/count-tokens', methods=['POST'])
def count_tokens_route():
    """
    Endpoint para contar tokens en un texto dado.
    
    Expects:
        JSON: {
            "text": string  # Texto para contar tokens
        }
    
    Returns:
        JSON: {
            "success": bool,
            "count": int,
            "error": string (opcional)
        }
    """
    data = request.json
    text = data.get('text', '')
    try:
        count = count_tokens(text)
        return jsonify({"success": True, "count": count})
    except Exception as e:
        return jsonify({"success": False, "error": str(e)}), 400

@app.route('/como-funciona')
def como_funciona():
    """
    Ruta que renderiza la página de explicación del funcionamiento.
    
    Returns:
        template: Renderiza como_funciona.html
    """
    return render_template('como_funciona.html')


# Configuración para ejecutar la aplicación en Render o localmente
if __name__ == "__main__":
    # Usar el puerto proporcionado por Render o el 5000 por defecto para desarrollo local
    port = int(os.environ.get("PORT", 5000))
    debug_mode = os.environ.get("FLASK_ENV", "development") != "production"
    
    # Ejecutar la aplicación
    app.run(host="0.0.0.0", port=port, debug=debug_mode)
