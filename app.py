"""
Módulo principal de la aplicación Flask.

Este módulo define las rutas y endpoints de la API, maneja las solicitudes HTTP
y coordina la lógica de negocio relacionada con los frameworks de prompts.

Environment Variables:
    FLASK_SECRET_KEY: Clave secreta para la aplicación Flask (default: "dev_key")
"""

import os
from flask import Flask, render_template, request, jsonify
from utils.openai_helper import optimize_prompt, count_tokens, get_framework_recommendation, FRAMEWORK_EXAMPLES
from console import console

# Inicialización de la aplicación Flask
app = Flask(__name__)
app.secret_key = os.environ.get("FLASK_SECRET_KEY") or "dev_key"

@app.route('/')
def index():
    """
    Ruta principal que renderiza la página de inicio.
    
    Returns:
        template: Renderiza index.html
    """
    console.info("Acceso a la página principal")
    return render_template('index.html')

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
    try:
        recommendation = get_framework_recommendation(objective)
        return jsonify({"success": True, "recommendation": recommendation})
    except Exception as e:
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
        return jsonify({"success": True, "prompt": result})
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
