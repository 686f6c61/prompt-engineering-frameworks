"""
Módulo principal de la aplicación Flask.

Este módulo define las rutas y endpoints de la API, maneja las solicitudes HTTP
y coordina la lógica de negocio relacionada con los frameworks de prompts.

Environment Variables:
    FLASK_SECRET_KEY: Clave secreta para la aplicación Flask (default: "dev_key")
"""

import os
import secrets
from flask import Flask, render_template, request, jsonify, redirect, url_for, session, send_file
from utils.openai_helper import optimize_prompt, count_tokens, get_framework_recommendation, FRAMEWORK_EXAMPLES
from utils.openai_helper import DEFAULT_MODEL, PREMIUM_MODEL
from utils.prompt_formatter import format_prompt_markdown
from utils.rate_limiter import check_rate_limit, increment_usage, get_usage_info, set_promo_code
from utils.bolt_lovable_helper import generate_bolt_lovable_prompt
from console import console
import os.path  # Importar os.path para manejar rutas de archivos
import io
import zipfile
import requests  # Para hacer solicitudes a la API de Resend

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
        
        # Determinar qué formulario se envió
        form_type = request.form.get('form_type', '')
        
        # Si es el formulario de código promocional
        if form_type == 'promo_code':
            promo_code = request.form.get('promo_code', '').strip()
            console.debug(f"Intentando validar código promocional: '{promo_code}'")
            
            is_valid = set_promo_code(promo_code)
            
            if is_valid:
                console.info(f"Código promocional '{promo_code}' aplicado correctamente")
                # Guardar mensaje para mostrar en la página
                session['promo_message'] = "¡Código válido! Límite aumentado a 30 solicitudes por hora."
                session['promo_valid'] = True
            else:
                console.warn(f"Código promocional inválido: '{promo_code}'")
                # Guardar mensaje de error para mostrar
                session['promo_message'] = "Código no válido. Intenta con otro código."
                session['promo_valid'] = False
                
            # Redirigir a la página de configuración para mostrar el resultado
            return redirect(url_for('configuracion') + '#promo-code-section')
        
        # Si es el formulario de selección de modelo
        else:
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
    
    # Para solicitudes GET, mostrar la página de configuración con información del código promocional
    usage_info = get_usage_info()
    
    # Obtener mensajes de validación de la sesión
    promo_message = session.pop('promo_message', None)
    promo_valid = session.pop('promo_valid', None)
    
    return render_template(
        'configuracion.html',
        use_custom_api_key=session.get('use_custom_api_key', False),
        api_key=session.get('api_key', ''),
        default_model=DEFAULT_MODEL,
        premium_model=PREMIUM_MODEL,
        promo_code=session.get('promo_code', ''),
        has_promo=usage_info.get('has_promo', False),
        promo_message=promo_message,
        promo_valid=promo_valid
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
    
    # Verificar límite de uso
    is_limited, remaining, reset_time = check_rate_limit()
    if is_limited:
        return jsonify({
            "success": False, 
            "error": f"Has alcanzado el límite de {10} solicitudes por hora. Por favor, espera {reset_time} o usa tu propia API key."
        }), 429
    
    try:
        # Obtener la recomendación como texto plano
        recommendation_text = get_framework_recommendation(objective)
        
        # Incrementar contador de uso
        remaining, reset_time = increment_usage()
        
        # Verificar brevemente que el formato es válido
        if "FRAMEWORK:" not in recommendation_text:
            console.error("Formato de respuesta inválido")
            return jsonify({"success": False, "error": "Formato de respuesta inválido"}), 400
        
        # Verificar info de uso completa para enviarla en la respuesta
        usage_info = get_usage_info()
        
        return jsonify({
            "success": True, 
            "recommendation": recommendation_text,
            "usage": {
                "remaining": remaining,
                "reset_time": reset_time,
                "max": usage_info['max'],
                "has_promo": usage_info['has_promo']
            }
        })
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
    
    # Verificar límite de uso
    is_limited, remaining, reset_time = check_rate_limit()
    if is_limited:
        return jsonify({
            "success": False, 
            "error": f"Has alcanzado el límite de {10} solicitudes por hora. Por favor, espera {reset_time} o usa tu propia API key."
        }), 429
    
    try:
        if is_combined:
            result = optimize_prompt("combined", form_data, frameworks)
        else:
            result = optimize_prompt(frameworks[0], form_data)
        
        # Incrementar contador de uso
        remaining, reset_time = increment_usage()
        
        # Format the prompt with Markdown formatting
        formatted_result = format_prompt_markdown(result)
        
        # Verificar info de uso completa para enviarla en la respuesta
        usage_info = get_usage_info()
        
        return jsonify({
            "success": True,
            "prompt": formatted_result,
            "raw_prompt": result,
            "usage": {
                "remaining": remaining,
                "reset_time": reset_time,
                "max": usage_info['max'],
                "has_promo": usage_info['has_promo']
            }
        })
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

@app.route('/ayuda-faq')
def ayuda_faq():
    """
    Ruta que renderiza la página de ayuda y preguntas frecuentes.
    
    Returns:
        template: Renderiza ayuda_faq.html
    """
    return render_template('ayuda_faq.html')

@app.route('/terminos')
def terminos():
    """
    Ruta que renderiza la página de términos y condiciones.
    
    Returns:
        template: Renderiza terminos.html
    """
    return render_template('terminos.html')

@app.route('/razonadores')
def razonadores():
    """
    Ruta que renderiza la página de razonadores para prompts avanzados.
    
    Returns:
        template: Renderiza razonadores.html con un ejemplo de prompt
    """
    # Ejemplo de prompt de razonamiento
    ejemplo_razonamiento = """# Instrucciones para razonamiento profundo

Necesito que analices el siguiente problema de manera sistemática y exhaustiva. Por favor:

1. **Descompón el problema** en sus componentes fundamentales
2. **Examina las suposiciones** implícitas y explícitas
3. **Considera múltiples perspectivas** antes de formular conclusiones
4. **Identifica posibles sesgos** en tu razonamiento inicial
5. **Explora contraejemplos o contraargumentos** relevantes
6. **Evalúa la evidencia** disponible de manera crítica
7. **Utiliza razonamiento paso a paso**, explicando cada parte de tu proceso mental
8. **Señala las limitaciones** de tu análisis o áreas de incertidumbre
9. **Sintetiza tus conclusiones** de manera equilibrada y matizada

Cuando sea apropiado, usa herramientas complementarias como:
- Análisis matemático
- Diagramas mentales
- Métodos de evaluación de escenarios
- Razonamiento probabilístico
- Analogías clarificadoras

Por favor, proporciona tu análisis más riguroso y completo del siguiente problema:

[INSERTAR PROBLEMA/PREGUNTA AQUÍ]"""
    
    # Obtener el modelo actual para mostrarlo en la interfaz
    if session.get('use_custom_api_key', False):
        current_model = PREMIUM_MODEL
        is_custom = True
    else:
        current_model = DEFAULT_MODEL
        is_custom = False
    
    return render_template('razonadores.html',
                           current_model=current_model,
                           is_custom=is_custom,
                           ejemplo_razonamiento=ejemplo_razonamiento)

@app.route('/bolt-lovable')
def bolt_lovable():
    """
    Ruta que renderiza la página de generación de prompts para Bolt/Lovable.
    
    Returns:
        template: Renderiza bolt_lovable.html
    """
    # Obtener el modelo actual para mostrarlo en la interfaz
    if session.get('use_custom_api_key', False):
        current_model = PREMIUM_MODEL
        is_custom = True
    else:
        current_model = DEFAULT_MODEL
        is_custom = False
        
    return render_template('bolt_lovable.html', 
                          current_model=current_model,
                          is_custom=is_custom)

# Endpoint para recomendar un framework web
@app.route('/api/recommend-web-framework', methods=['POST'])
def recommend_web_framework():
    """
    Endpoint para recomendar un framework web basado en la descripción del proyecto.
    
    Expects:
        JSON: {
            "description": string  # Descripción del proyecto web
        }
    
    Returns:
        JSON: {
            "success": bool,
            "framework": string,
            "error": string (opcional)
        }
    """
    data = request.json
    description = data.get('description', '')
    
    if not description:
        return jsonify({"success": False, "error": "Descripción no proporcionada"}), 400
    
    # Verificar límite de uso
    is_limited, remaining, reset_time = check_rate_limit()
    if is_limited:
        return jsonify({
            "success": False, 
            "error": f"Has alcanzado el límite de {10} solicitudes por hora. Por favor, espera {reset_time} o usa tu propia API key."
        }), 429
    
    try:
        # Obtener la recomendación como texto plano
        recommendation_text = get_framework_recommendation(description, context="web")
        
        # Incrementar contador de uso
        remaining, reset_time = increment_usage()
        
        # Extraer el framework recomendado
        framework = "code"  # Valor por defecto
        
        if "RTF" in recommendation_text or "rol-tarea-formato" in recommendation_text.lower():
            framework = "rtf"
        elif "CODE" in recommendation_text or "contexto-objetivo-detalles-ejemplos" in recommendation_text.lower():
            framework = "code"
        elif "GUIDE" in recommendation_text:
            framework = "guide"
        elif "CLARITY" in recommendation_text:
            framework = "clarity"
        
        # Verificar info de uso completa para enviarla en la respuesta
        usage_info = get_usage_info()
        
        return jsonify({
            "success": True, 
            "framework": framework,
            "recommendation": recommendation_text,
            "usage": {
                "remaining": remaining,
                "reset_time": reset_time,
                "max": usage_info['max'],
                "has_promo": usage_info['has_promo']
            }
        })
    except Exception as e:
        console.error("Error al obtener recomendación", str(e))
        return jsonify({"success": False, "error": str(e)}), 400

# Endpoint para generar prompt para Bolt/Lovable
@app.route('/api/generate-bolt-lovable', methods=['POST'])
def generate_bolt_lovable():
    """
    Endpoint para generar prompts especializados para plataformas Bolt/Lovable.
    
    Expects:
        JSON: {
            "framework_type": string,   # Tipo de framework seleccionado
            "form_data": dict,          # Datos del formulario
            "aesthetic_data": dict      # Datos estéticos (opcional)
        }
    
    Returns:
        JSON: {
            "success": bool,
            "prompt": string,           # Prompt formateado con Markdown
            "raw_prompt": string,       # Prompt en texto plano
            "token_count": int,         # Contador de tokens
            "error": string (opcional)
        }
    """
    data = request.json
    framework_type = data.get('framework_type', '')
    form_data = data.get('form_data', {})
    aesthetic_data = data.get('aesthetic_data', {})
    
    if not framework_type or not form_data:
        return jsonify({
            "success": False, 
            "error": "Datos incompletos. Se requiere un framework y datos del formulario."
        }), 400
    
    # Verificar límite de uso
    is_limited, remaining, reset_time = check_rate_limit()
    if is_limited:
        return jsonify({
            "success": False, 
            "error": f"Has alcanzado el límite de {10} solicitudes por hora. Por favor, espera {reset_time} o usa tu propia API key."
        }), 429
    
    try:
        # Obtener la API key si el usuario usa la suya propia
        user_api_key = session.get('api_key') if session.get('use_custom_api_key', False) else None
        
        # Generar el prompt para Bolt/Lovable
        form_data['framework_type'] = framework_type
        
        # Añadir datos estéticos si existen
        if aesthetic_data:
            form_data['aesthetic_data'] = aesthetic_data
            
        result = generate_bolt_lovable_prompt(form_data, user_api_key)
        
        if not result['success']:
            return jsonify(result), 400
        
        # Incrementar contador de uso
        remaining, reset_time = increment_usage()
        
        # Contar tokens
        token_count = count_tokens(result['raw_prompt'])
        
        # Verificar info de uso completa para enviarla en la respuesta
        usage_info = get_usage_info()
        
        return jsonify({
            "success": True,
            "prompt": result['prompt'],
            "raw_prompt": result['raw_prompt'],
            "token_count": token_count,
            "usage": {
                "remaining": remaining,
                "reset_time": reset_time,
                "max": usage_info['max'],
                "has_promo": usage_info['has_promo']
            }
        })
    except Exception as e:
        console.error("Error al generar prompt Bolt/Lovable", str(e))
        return jsonify({"success": False, "error": str(e)}), 400

# Nuevo endpoint para obtener información de límite de uso
@app.route('/api/usage-info', methods=['GET'])
def get_usage_limit_info():
    """
    Endpoint para obtener información sobre el límite de uso actual.
    
    Returns:
        JSON: Información detallada sobre el uso y límites
    """
    try:
        usage_info = get_usage_info()
        return jsonify({"success": True, "usage_info": usage_info})
    except Exception as e:
        console.error("Error al obtener información de uso", str(e))
        return jsonify({"success": False, "error": str(e)}), 400

@app.route('/frameworks/<framework_name>')
def serve_framework(framework_name):
    """
    Ruta para servir archivos de frameworks directamente.
    
    Args:
        framework_name: Nombre del archivo de framework (incluyendo extensión)
    
    Returns:
        file: Archivo de framework solicitado
    """
    # Construir la ruta del archivo
    framework_path = os.path.join('static/frameworks/prompt-frameworks', framework_name)
    
    # Verificar si el archivo existe
    if not os.path.isfile(framework_path):
        return "Framework no encontrado", 404
    
    # Leer y retornar el contenido del archivo
    with open(framework_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Devolver el contenido como texto plano
    return content, 200, {'Content-Type': 'text/plain; charset=utf-8'}

# Ruta para descargar todos los frameworks como ZIP
@app.route('/download/frameworks')
def download_frameworks_zip():
    """
    Endpoint para descargar todos los frameworks en formato ZIP.
    
    Returns:
        file: Archivo ZIP con todos los frameworks
    """
    try:
        # Crear un objeto BytesIO en memoria para almacenar el ZIP
        memory_file = io.BytesIO()
        
        # Crear un archivo ZIP en memoria
        with zipfile.ZipFile(memory_file, 'w') as zf:
            # Ruta a la carpeta de frameworks
            frameworks_dir = os.path.join('static', 'frameworks', 'prompt-frameworks')
            
            # Recorrer todos los archivos en la carpeta
            for filename in os.listdir(frameworks_dir):
                # Solo incluir archivos de texto
                if filename.endswith('.txt'):
                    file_path = os.path.join(frameworks_dir, filename)
                    # Añadir el archivo al ZIP
                    zf.write(file_path, os.path.basename(file_path))
        
        # Mover el puntero al inicio del archivo
        memory_file.seek(0)
        
        # Devolver el archivo
        return send_file(
            memory_file,
            mimetype='application/zip',
            as_attachment=True,
            download_name='frameworks-prompt-engineering.zip'
        )
    except Exception as e:
        console.error("Error al crear el archivo ZIP", str(e))
        return jsonify({"success": False, "error": str(e)}), 500

# Rutas para Search Console
@app.route('/robots.txt')
def robots():
    """
    Ruta para servir el archivo robots.txt.
    
    Returns:
        file: Archivo robots.txt
    """
    return send_file('robots.txt')

@app.route('/sitemap.xml')
def sitemap():
    """
    Ruta para servir el archivo sitemap.xml.
    
    Returns:
        file: Archivo sitemap.xml
    """
    return send_file('sitemap.xml')

# Endpoint para enviar correos con Resend
@app.route('/api/enviar-correo', methods=['POST'])
def enviar_correo():
    """
    Endpoint para enviar correos utilizando la API de Resend.
    
    Expects:
        JSON: {
            "nombre": string,   # Nombre del remitente
            "email": string,    # Email del remitente
            "asunto": string,   # Asunto del correo
            "mensaje": string   # Contenido del mensaje
        }
    
    Returns:
        JSON: {
            "success": bool,
            "message": string,
            "error": string (opcional)
        }
    """
    # API Key de Resend
    RESEND_API_KEY = os.environ.get('RESEND_API_KEY')
    
    # Verificar que la API key existe
    if not RESEND_API_KEY:
        console.error("Error: RESEND_API_KEY no configurada en variables de entorno")
        return jsonify({
            "success": False,
            "error": "Error en la configuración del servidor. Por favor contacta al administrador."
        }), 500
    
    # Obtener datos del formulario
    data = request.json
    nombre = data.get('nombre', '')
    email = data.get('email', '')
    asunto = data.get('asunto', '')
    mensaje = data.get('mensaje', '')
    
    # Validar que todos los campos estén presentes
    if not all([nombre, email, asunto, mensaje]):
        return jsonify({
            "success": False,
            "error": "Por favor completa todos los campos del formulario."
        }), 400
    
    try:
        # Configurar la solicitud a la API de Resend
        headers = {
            'Authorization': f'Bearer {RESEND_API_KEY}',
            'Content-Type': 'application/json'
        }
        
        # Obtener variables de entorno para las direcciones de correo
        email_from = os.environ.get('EMAIL_FROM')
        email_to = os.environ.get('EMAIL_TO')
        
        # Verificar que las direcciones de correo estén configuradas
        if not email_from or not email_to:
            console.error("Error: Variables de entorno EMAIL_FROM o EMAIL_TO no configuradas")
            return jsonify({
                "success": False,
                "error": "Error en la configuración del servidor. Por favor contacta al administrador."
            }), 500
        
        payload = {
            'from': email_from,
            'to': [email_to],
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
            return jsonify({
                "success": True,
                "message": "Tu mensaje ha sido enviado correctamente. Te responderemos lo antes posible."
            })
        else:
            console.error(f"Error al enviar correo: {response.text}")
            return jsonify({
                "success": False,
                "error": "Error al enviar el mensaje. Por favor intenta de nuevo más tarde."
            }), 500
            
    except Exception as e:
        console.error(f"Error al enviar correo: {str(e)}")
        return jsonify({
            "success": False,
            "error": f"Error al enviar el mensaje: {str(e)}"
        }), 500

@app.route('/api/generar-preguntas', methods=['POST'])
def generar_preguntas():
    """
    Endpoint para generar preguntas personalizadas basadas en el tema proporcionado.
    
    Expects:
        JSON: {
            "topic": string  # Tema o solicitud del usuario
        }
    
    Returns:
        JSON: {
            "success": bool,
            "questions": list,  # Lista de preguntas generadas
            "error": string (opcional)
        }
    """
    data = request.json
    topic = data.get('topic', '')
    
    if not topic:
        return jsonify({"success": False, "error": "Tema no proporcionado"}), 400
    
    # Verificar límite de uso
    is_limited, remaining, reset_time = check_rate_limit()
    if is_limited:
        return jsonify({
            "success": False, 
            "error": f"Has alcanzado el límite de {10} solicitudes por hora. Por favor, espera {reset_time} o usa tu propia API key."
        }), 429
    
    try:
        # Obtener la API key si el usuario usa la suya propia
        user_api_key = session.get('api_key') if session.get('use_custom_api_key', False) else None
        
        # Determinar el modelo a usar
        model = PREMIUM_MODEL if session.get('use_custom_api_key', False) else DEFAULT_MODEL
        
        # Prompt para generar preguntas adaptadas al tema
        system_prompt = """Eres un asistente especializado en análisis de necesidades. 
Tu tarea es generar 5 preguntas relevantes y específicas basadas en el tema proporcionado por el usuario.

Las preguntas deben:
1. Adaptarse al tipo de solicitud (análisis, creación, asesoramiento, etc.)
2. Ayudar a obtener información importante para generar un prompt efectivo
3. Ser claras y directas
4. Cubrir diferentes aspectos relevantes para el tema
5. Estar formuladas en forma de pregunta con signos de interrogación

Por ejemplo:
- Si el tema es "Análisis de mercado para una startup de tecnología", las preguntas podrían centrarse en el sector específico, competidores, público objetivo, etc.
- Si el tema es "Crear un portfolio de desarrollo web", las preguntas podrían enfocarse en proyectos a destacar, tecnologías, estilo visual, etc.

Responde ÚNICAMENTE con una lista de 5 preguntas, sin introducción ni texto adicional."""
        
        # Preparar la solicitud a la API de OpenAI
        from openai import OpenAI
        
        client = OpenAI(api_key=user_api_key or os.environ.get('OPENAI_API_KEY'))
        
        response = client.chat.completions.create(
            model=model,
            messages=[
                {"role": "system", "content": system_prompt},
                {"role": "user", "content": topic}
            ],
            temperature=0.7,
            max_tokens=500
        )
        
        # Procesar la respuesta y extraer las preguntas
        response_content = response.choices[0].message.content.strip()
        
        # Extraer las preguntas del texto
        import re
        # Buscar preguntas con números o guiones al principio y signos de interrogación
        questions = re.findall(r'(?:^|\n)(?:\d+[\.\)]\s*|\-\s*)?(.+\?)', response_content)
        
        # Si no se encontraron preguntas con el regex, dividir por líneas
        if not questions or len(questions) < 3:
            questions = [line.strip() for line in response_content.split('\n') if '?' in line]
        
        # Limitar a 5 preguntas y asegurarse de que cada una termine con signo de interrogación
        questions = questions[:5]
        questions = [q if q.endswith('?') else f"{q}?" for q in questions]
        
        # Asegurarse de que tenemos al menos 3 preguntas
        if len(questions) < 3:
            # Preguntas por defecto si no se pudieron generar suficientes
            default_questions = [
                "¿Cuál es el objetivo principal de tu solicitud?",
                "¿Qué aspectos específicos te gustaría incluir?",
                "¿Hay algún contexto particular o requisitos importantes que debamos considerar?",
                "¿Prefieres un enfoque más teórico o práctico para este tema?",
                "¿Tienes alguna restricción o limitación que debamos tener en cuenta?"
            ]
            # Agregar preguntas por defecto si es necesario
            questions.extend(default_questions[:(5 - len(questions))])
        
        # Incrementar contador de uso
        remaining, reset_time = increment_usage()
        
        # Verificar info de uso completa para enviarla en la respuesta
        usage_info = get_usage_info()
        
        return jsonify({
            "success": True,
            "questions": questions,
            "usage": {
                "remaining": remaining,
                "reset_time": reset_time,
                "max": usage_info['max'],
                "has_promo": usage_info['has_promo']
            }
        })
    except Exception as e:
        console.error(f"Error al generar preguntas: {str(e)}")
        return jsonify({"success": False, "error": str(e)}), 500

@app.route('/api/generar-prompt-razonamiento', methods=['POST'])
def generar_prompt_razonamiento():
    """
    Endpoint para generar un prompt optimizado basado en el tema y las respuestas proporcionadas.
    
    Expects:
        JSON: {
            "topic": string,       # Tema principal
            "answers": dict,       # Respuestas a las preguntas
            "questions": list      # Lista de preguntas originales
        }
    
    Returns:
        JSON: {
            "success": bool,
            "prompt": string,      # Prompt generado
            "token_count": int,    # Contador de tokens
            "error": string (opcional)
        }
    """
    data = request.json
    topic = data.get('topic', '')
    answers = data.get('answers', {})
    questions = data.get('questions', [])
    
    if not topic or not answers:
        return jsonify({"success": False, "error": "Datos incompletos"}), 400
    
    # Verificar límite de uso
    is_limited, remaining, reset_time = check_rate_limit()
    if is_limited:
        return jsonify({
            "success": False, 
            "error": f"Has alcanzado el límite de {10} solicitudes por hora. Por favor, espera {reset_time} o usa tu propia API key."
        }), 429
    
    try:
        # Obtener la API key si el usuario usa la suya propia
        user_api_key = session.get('api_key') if session.get('use_custom_api_key', False) else None
        
        # Determinar el modelo a usar
        model = PREMIUM_MODEL if session.get('use_custom_api_key', False) else DEFAULT_MODEL
        
        # Construir el contexto para la generación del prompt
        context = f"Tema: {topic}\n\n"
        
        # Agregar las preguntas y respuestas
        for q_idx, question in enumerate(questions):
            if str(q_idx) in answers:
                answer = answers[str(q_idx)]
                context += f"Pregunta: {question}\nRespuesta: {answer}\n\n"
        
        # Prompt del sistema para generar el prompt adaptado
        system_prompt = """Eres un experto en la creación de prompts extremadamente detallados y estructurados para modelos de lenguaje avanzados.
Tu tarea es analizar la solicitud del usuario junto con sus respuestas a preguntas específicas, y generar un prompt excepcionalmente completo y detallado adaptado a sus necesidades.

El prompt que generes DEBE:
1. Tener al menos 15-20 puntos de instrucción o elementos detallados (tres veces más que un prompt estándar)
2. Adaptarse al tipo de solicitud (razonamiento, creación, análisis, etc.)
3. Incluir instrucciones detalladas, métricas, principios, recomendaciones y pasos específicos
4. Incorporar toda la información proporcionada por el usuario en sus respuestas
5. Estar optimizado para obtener resultados de la más alta calidad de modelos como GPT-4 u o4
6. Utilizar una estructura clara con secciones, subsecciones, numeración, viñetas y énfasis (negritas, cursivas)
7. Proporcionar ejemplos o mini-plantillas cuando sea relevante
8. Incluir criterios de evaluación o verificación 
9. Añadir consideraciones específicas del dominio relevantes para el tema

Para TODOS los prompts, utiliza este formato general pero adaptado al contenido específico:
```
# Instrucciones para [tipo específico de tarea]

Necesito que [verbo de acción: desarrolles/analices/crees] [tema específico] con un enfoque [adjetivo: sistemático/creativo/profesional] y [adjetivo: exhaustivo/innovador/detallado]. El resultado debe [descripción del resultado esperado en términos concretos].

## Contexto y objetivos
[Información detallada basada en las respuestas del usuario]
- Objetivo principal: [extraído de las respuestas]
- Contexto relevante: [extraído de las respuestas]
- Audiencia objetivo: [extraído de las respuestas o inferido]

## Instrucciones detalladas
Por favor, sigue estas instrucciones específicas:

1. **[Primera instrucción clave]**
   - Subpunto detallado
   - Subpunto detallado
   - Consideración específica

2. **[Segunda instrucción clave]**
   - Subpunto detallado
   - Ejemplo concreto: "[Ejemplo]"
   - Subpunto detallado

[Continúa con al menos 10-15 instrucciones numeradas con sus respectivos subpuntos]

## Consideraciones adicionales
- **[Consideración 1]**: [Explicación]
- **[Consideración 2]**: [Explicación]
- **[Consideración 3]**: [Explicación]
[Al menos 5-7 consideraciones adicionales]

## Formato y estructura
[Instrucciones detalladas sobre el formato, incluyendo secciones, subsecciones, estilo, tono, etc.]

## Criterios de éxito
El resultado debe cumplir con estos criterios:
- [Criterio 1]
- [Criterio 2]
- [Criterio 3]
[Al menos 5 criterios]

[Conclusión con recordatorio del objetivo principal y parámetros de calidad esperados]
```

IMPORTANTE: 
- El prompt DEBE ser EXTREMADAMENTE DETALLADO con al menos el triple de contenido que un prompt estándar
- Adapta todas las secciones al tipo específico de solicitud
- Incluye al menos 15-20 instrucciones/consideraciones específicas en total
- Utiliza markdown apropiadamente para estructurar (##, **, -, etc.)
- Mantén un tono profesional pero accesible
- NO incluyas placeholder genéricos como [Instrucción 3] - reemplaza TODOS los placeholders con contenido real y específico

Incluye ÚNICAMENTE el prompt final, sin explicaciones adicionales."""
        
        # Preparar la solicitud a la API de OpenAI
        from openai import OpenAI
        
        client = OpenAI(api_key=user_api_key or os.environ.get('OPENAI_API_KEY'))
        
        response = client.chat.completions.create(
            model=model,
            messages=[
                {"role": "system", "content": system_prompt},
                {"role": "user", "content": context}
            ],
            temperature=0.7,
            max_tokens=4000
        )
        
        # Obtener el prompt generado
        prompt = response.choices[0].message.content.strip()
        
        # Contar tokens
        token_count = count_tokens(prompt)
        
        # Incrementar contador de uso
        remaining, reset_time = increment_usage()
        
        # Verificar info de uso completa para enviarla en la respuesta
        usage_info = get_usage_info()
        
        return jsonify({
            "success": True,
            "prompt": prompt,
            "token_count": token_count,
            "usage": {
                "remaining": remaining,
                "reset_time": reset_time,
                "max": usage_info['max'],
                "has_promo": usage_info['has_promo']
            }
        })
    except Exception as e:
        console.error(f"Error al generar prompt de razonamiento: {str(e)}")
        return jsonify({"success": False, "error": str(e)}), 500

# Configuración para ejecutar la aplicación en Render o localmente
if __name__ == "__main__":
    # Usar el puerto proporcionado por Render o el 5000 por defecto para desarrollo local
    port = int(os.environ.get("PORT", 5000))
    debug_mode = os.environ.get("FLASK_ENV", "development") != "production"
    
    # Ejecutar la aplicación
    app.run(host="0.0.0.0", port=port, debug=debug_mode)
