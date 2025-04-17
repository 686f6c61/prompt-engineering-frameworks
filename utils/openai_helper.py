import os
from dotenv import load_dotenv
from openai import OpenAI
from console import console
from flask import session

# Cargar variables de entorno
load_dotenv()

# Configuraciones de modelos
DEFAULT_MODEL = "gpt-3.5-turbo"
PREMIUM_MODEL = "gpt-4o-mini"
MAX_TOKENS = {
    "gpt-3.5-turbo": 4096,
    "gpt-4o-mini": 4096
}

# Crear un cliente OpenAI con la API key por defecto
def create_default_client():
    return OpenAI(
        api_key=os.getenv('OPENAI_API_KEY')
    )

# Crear un cliente OpenAI con una API key personalizada
def create_custom_client(api_key):
    return OpenAI(
        api_key=api_key
    )

# Obtener el cliente OpenAI basado en la configuración actual
def get_openai_client():
    # Verificar si hay una API key personalizada en la sesión
    if session.get('use_custom_api_key', False) and session.get('api_key'):
        return create_custom_client(session.get('api_key'))
    else:
        return create_default_client()

# Obtener el modelo a usar basado en la configuración
def get_model_to_use():
    if session.get('use_custom_api_key', False) and session.get('api_key'):
        return PREMIUM_MODEL
    else:
        return DEFAULT_MODEL

# Inicializar cliente por defecto para compatibilidad con código existente
openai_client = create_default_client()

AVAILABLE_FRAMEWORKS = [
    'rtf', 'tag', 'bab', 'care', 'rise', 'peas', 'star', 'qcqa', 
    'aida', 'para', 'smart', 'erq', 'code', 'pros', 'team', 
    'idea', 'fast', 'leap', 'grow', 'spin',
    'design', 'vision', 'impact', 'master', 'power',
    'logic', 'scope', 'focus', 'expert', 'clarity',
    'guide', 'path', 'learn', 'solve', 'prime', 'adapt', 'build', 'craft', 'scale', 'think', 'quest', 'drive', 'shape', 'reach', 'blend', 'spark', 'pulse', 'bolt_lovable'
]

FRAMEWORK_EXAMPLES = {
    'peas': """
P: Propósito - Define el objetivo principal que se quiere lograr con la comunicación
E: Resultado Final - Establece el resultado concreto y medible que se espera obtener
A: Audiencia - Identifica las características del público al que va dirigido el mensaje
S: Estilo - Determina el tono, formato y enfoque apropiado para la comunicación
""",
    'star': """
Situación: Migración sistema heredado a la nube
Tarea: Modernizar arquitectura monolítica
Acción: Implementar microservicios y despliegue continuo
Resultado: 40% mejora en tiempo de implementación
""",
    'qcqa': """
Pregunta: ¿Cómo mejorar el rendimiento de la API?
Contexto: Sistema con 100 mil usuarios diarios
Calificación: Tiempo de respuesta actual mayor a 500ms
Formato Respuesta: Plan detallado con mediciones específicas
""",
    'aida': """
Atención: 70% de aplicaciones tienen fallos de seguridad
Interés: Nueva solución de seguridad integrada
Deseo: Detección automática de vulnerabilidades
Acción: Prueba gratuita por 14 días
""",
    'para': """
Problema: Baja velocidad de desarrollo
Aproximación: Implementar desarrollo en rama principal
Razón: Reduce conflictos de fusión y acelera integración
Acción: Migración gradual por equipos de desarrollo
""",
    'smart': """
Específico: Reducir tiempo de compilación
Medible: De 15 minutos a 5 minutos
Alcanzable: Pruebas en paralelo
Relevante: Mejora productividad desarrolladores
Temporal: Próximo sprint (2 semanas)
""",
    'erq': """
Experiencia: 5 años en desarrollo Python/Django
Requisitos: API REST, GraphQL, Servicios en la nube
Cualificaciones: Certificación en arquitectura cloud
""",
    'code': """
Contexto: Aplicación móvil de comercio electrónico
Objetivo: Sistema de pagos integrado
Detalles: API de pagos, webhooks, lógica de reintentos
Ejemplos: Incluye código de manejo de errores
""",
    'pros': """
Perspectiva: Modernización de infraestructura
Requisitos: Despliegue sin interrupciones
Resultado: 99.99% de disponibilidad
Solución: Despliegue azul-verde
""",
    'team': """
Tarea: Implementar banderas de características
Entorno: Microservicios en Kubernetes
Aproximación: Despliegues progresivos
Métricas: Presupuesto de errores, tasa de adopción
""",
    'idea': """
Identificar: Cuellos de botella en rendimiento
Definir: Objetivos de optimización
Ejecutar: Estrategia de caché
Analizar: Tiempo de respuesta y capacidad
""",
    'fast': """
Enfoque: Documentación de API
Audiencia: Desarrolladores frontend
Alcance: Endpoints REST versión 2
Tono: Técnico y conciso
""",
    'leap': """
Nivel: Equipo backend senior
Expectativas: Arquitectura limpia
Aproximación: Diseño guiado por dominio
Parámetros: Rendimiento y escalabilidad
""",
    'grow': """
Meta: Migrar monolito a microservicios
Realidad: Sistema crítico en producción
Opciones: Patrón estrangulador vs reescritura
Camino: Migración incremental 6 meses
""",
    'spin': """
Situación: Sistema heredado en Java 8
Problema: Alto coste de mantenimiento
Implicación: Riesgo de seguridad
Necesidad-Beneficio: Actualización a Java 17
""",
    'design': """
Definir: Objetivos del producto web
Explorar: Necesidades del usuario final
Alcance: Funcionalidades clave del MVP
Idear: Soluciones innovadoras
Guiar: Marco de desarrollo ágil
Reducir: Prioridades primer sprint
""",
    'vision': """
Visualizar: Futuro del mercado software
Identificar: Oportunidades clave
Estructurar: Arquitectura del sistema
Implementar: Plan trimestral
Optimizar: Indicadores de rendimiento
Navegar: Cambios tecnológicos
""",
    'impact': """
Intención: Transformación digital
Mensaje: Eficiencia operativa
Propósito: Automatización de procesos
Audiencia: Equipo de operaciones
Canal: Intranet corporativa
Tiempo: Lanzamiento primer trimestre 2024
""",
    'master': """
Misión: Migración a la nube
Aproximación: Priorizar serverless
Estrategia: Arquitectura de microservicios
Tácticas: Pipeline de integración continua
Ejecución: Sprints de 2 semanas
Revisión: Métricas semanales
""",
    'power': """
Problema: Latencia del sistema
Resultado: Reducción a 50ms
Por qué: Mejorar experiencia usuario
Ejecución: Optimización base de datos
Recursos: Equipo DevOps dedicado
""",
    'logic': """
Diseño: Arquitectura de API
Objetivo: Endpoints REST escalables
Directrices: Especificación OpenAPI 3.0
Implementación: Desarrollo en Node.js
Criterios: 99.9% tiempo activo
""",
    'scope': """
Situación: Sistema heredado crítico
Necesidad Core: Modernización tecnológica
Obstáculos: Deuda técnica acumulada
Plan: Refactorización por fases
Evaluación: Cobertura de pruebas
""",
    'focus': """
Marco: Diseño móvil primero
Objetivo: Aumentar conversión 30%
Restricciones: Soporte navegadores antiguos
Comprensión: Análisis de datos usuarios
Solución: Aplicación web progresiva
""",
    'expert': """
Experiencia: Backend Python avanzado
Contexto: API altamente escalable
Propósito: Sistema de microservicios
Ejecución: FastAPI con async
Resultados: 10mil transacciones/segundo
Pruebas: Integración y extremo a extremo
""",
    'clarity': """
Contexto: Migración de datos críticos
Limitaciones: Ventana de 4 horas
Aproximación: Despliegue azul-verde
Requisitos: Cero pérdida de datos
Implementación: Procesamiento por lotes
Cronograma: Fin de semana
Rendimiento: Validación post-migración
""",
    'rtf': """
Rol: Arquitecto de software senior
Tarea: Diseñar sistema de alta disponibilidad
Formato: Documento técnico detallado con diagramas
""",
    'tag': """
Tarea: Implementar autenticación OAuth2
Acción: Desarrollar flujo de autorización completo
Meta: Sistema seguro con múltiples proveedores
""",
    'bab': """
Antes: Sistema de monolito PHP
Después: Arquitectura de microservicios
Puente: Plan de migración gradual 6 meses
""",
    'care': """
Contexto: Aplicación crítica financiera
Acción: Implementar sistema de respaldos
Resultado: Recuperación en menos de 15 minutos
Ejemplo: Proceso detallado de restauración
""",
    'guide': """
Goal: Lanzar MVP en 2 meses
User: Equipo de desarrollo
Implementation: Definir requisitos y prototipos
Delivery: Desplegar versión beta
Evaluation: Recoger feedback y métricas de uso
""",
    'path': """
Purpose: Clarificar visión estratégica
Approach: Análisis de mercado
Target: 3 áreas clave
Horizon: 6 meses
""",
    'learn': """
Level: Principiante
Experience: Sin experiencia previa
Approach: Curso interactivo
Resources: Videos y documentación
NextSteps: Realizar ejercicios prácticos
""",
    'solve': """
Situation: Alto tiempo de respuesta
Options: Optimización de consultas o caching
Limitations: Presupuesto limitado
Verification: Pruebas de carga
Execution: Despliegue gradual
""",
    'prime': """
Problem: Baja tasa de conversión
Research: Análisis de datos de usuarios
Implementation: Mejoras en el funnel
Monitoring: KPIs de conversión
Evaluation: Informe de resultados
""",
    'adapt': """
Analysis: Evaluación de cambios de requisitos
Design: Arquitectura modular
Approach: Desarrollo iterativo
Progress: Revisión semanal
Testing: Pruebas unitarias y de integración
""",
    'build': """
Baseline: Estado actual del sistema
Understanding: Necesidades del usuario
Implementation: Desarrollo incremental
Learning: Feedback de usuarios
Delivery: Versión final en producción
""",
    'craft': """
Context: Proyecto a medida para cliente X
Requirements: Funcionalidad específica A y B
Approach: Diseño personalizado
Features: Módulos de gestión y análisis
Testing: Pruebas de aceptación con el cliente
""",
    'scale': """
Estrategia: Plan de escalabilidad cloud
Capacidades: Autoescalado y redundancia
Acción: Implementación de clusters K8s
Aprendizaje: Monitoreo y telemetría
Evolución: Mejora continua basada en datos
""",
    'think': """
Tema: Expansión mercado LATAM
Historia: Análisis previos de mercado
Insights: Oportunidades identificadas
Siguientes Pasos: Plan de entrada Q2 2024
Conocimiento: Regulaciones locales
""",
    'quest': """
Pregunta: Optimización de conversión
Entendimiento: Análisis de embudo actual
Exploración: Test A/B de landing pages
Solución: Rediseño basado en datos
Pruebas: Grupo piloto de usuarios
""",
    'drive': """
Dirección: Automatización de procesos
Recursos: Equipo DevOps y herramientas
Implementación: CI/CD y monitoreo
Validación: Métricas de rendimiento
Evolución: Iteraciones mensuales
""",
    'shape': """
Situación: Modernización tecnológica
Historia: Stack tecnológico actual
Análisis: Evaluación de alternativas
Plan: Migración por fases
Ejecución: Sprints de 2 semanas
""",
    'reach': """
Requisitos: Sistema de gestión de inventario
Evaluación: Análisis de requisitos y viabilidad
Aproximación: Desarrollo iterativo con Scrum
Completitud: Entregables y documentación
Handover: Plan de capacitación y soporte
""",
    'blend': """
Base: Sistema actual de ventas
Aprendizaje: Análisis de patrones de usuario
Evolución: Mejoras incrementales
Navegación: Interfaz intuitiva
Entrega: Despliegue por fases
""",
    'spark': """
Estrategia: Modernización de plataforma
Planificación: Roadmap técnico 6 meses
Acción: Implementación por módulos
Resultados: Métricas de rendimiento
Conocimiento: Documentación y capacitación
""",
    'pulse': """
Propósito: Optimización de procesos
Entendimiento: Análisis de flujos actuales
Aprendizaje: Mejores prácticas del sector
Estrategia: Plan de implementación ágil
Evaluación: KPIs de rendimiento
""",
    'bolt_lovable': """
# Proyecto Web Detallado: E-commerce de Productos Artesanales

## Resumen Ejecutivo
Plataforma digital especializada en la venta de productos artesanales locales, con enfoque en la experiencia de usuario y la promoción de artesanos regionales.

## Objetivos del Proyecto
- Crear una plataforma e-commerce funcional y atractiva
- Facilitar la conexión directa entre artesanos y compradores
- Implementar un sistema de gestión de inventario eficiente

## Público Objetivo
Compradores interesados en productos artesanales únicos, con poder adquisitivo medio-alto, principalmente en zonas urbanas y entre 25-55 años.

## Alcance del Proyecto
Incluye: Catálogo de productos, sistema de pagos, panel de administración, perfiles de artesanos.
No incluye: Aplicación móvil nativa, integración con puntos físicos.
"""
}

def optimize_prompt(framework: str, form_data: dict, frameworks: list = None) -> str:
    console.debug("DEBUG - Templates disponibles:", list(framework_templates.keys()))
    console.debug("DEBUG - Framework recibido:", framework)
    console.debug("DEBUG - Datos del formulario:", form_data)
    
    framework = framework.lower()
    if framework not in framework_templates:
        raise ValueError(f"No hay plantilla disponible para el framework '{framework}'")
    
    if framework not in FRAMEWORK_EXAMPLES:
        raise ValueError(f"No hay ejemplo disponible para el framework '{framework}'")
        
    try:
        raw_prompt = framework_templates[framework].format(**form_data)
    except KeyError as e:
        raise ValueError(f"Campo requerido faltante: {str(e)}")
        
    example = FRAMEWORK_EXAMPLES[framework]
    
    formatted_message = """Eres un experto en optimización de prompts en español, especializado en:
    1. Análisis detallado de objetivos y contexto
    2. Identificación de métricas clave y KPIs relevantes
    3. Desarrollo de estrategias basadas en datos
    4. Implementación de mejores prácticas por industria
    
    Para cada prompt, debes:
    1. Mantener la estructura original del framework
    2. Expandir el contenido con detalles relevantes y específicos
    3. Incluir métricas cuantificables y KPIs
    4. Agregar consideraciones especiales del sector
    5. Proponer mejores prácticas aplicables
    6. Sugerir ejemplos reales y referencias
    
    El prompt debe ser:
    - Específico y accionable
    - Medible y orientado a resultados
    - Realista y alcanzable
    - Relevante para el contexto
    - Con plazos definidos cuando aplique
    
    Usa el siguiente ejemplo como referencia para el nivel de detalle esperado:
    
    {example}
    
    Ahora, optimiza el siguiente prompt manteniendo su estructura pero añadiendo todos los elementos mencionados:
    
    {raw_prompt}""".format(example=example, raw_prompt=raw_prompt)

    response = get_openai_client().chat.completions.create(
        model=get_model_to_use(),
        messages=[
            {"role": "system", "content": formatted_message}
        ],
        max_tokens=MAX_TOKENS[get_model_to_use()]
    )
    
    return response.choices[0].message.content

def count_tokens(text: str) -> int:
    """Count the number of tokens in a text using the OpenAI API."""
    response = get_openai_client().chat.completions.create(
        model=get_model_to_use(),
        messages=[
            {"role": "user", "content": text}
        ],
        max_tokens=100
    )
    return response.usage.prompt_tokens

def get_framework_recommendation(objective: str, context: str = "general") -> str:
    system_message = f'''Eres un experto en frameworks de prompts en español. Tu tarea es analizar el objetivo del usuario y recomendar ÚNICAMENTE uno de los siguientes frameworks disponibles. NO INVENTES FRAMEWORKS NUEVOS:

    RTF, TAG, BAB, CARE, RISE, PEAS, STAR, QCQA, AIDA, PARA, SMART, ERQ, CODE, PROS, TEAM, IDEA, FAST, LEAP, GROW, SPIN, DESIGN, VISION, IMPACT, MASTER, POWER, LOGIC, SCOPE, FOCUS, EXPERT, CLARITY, GUIDE, PATH, LEARN, SOLVE, PRIME, ADAPT, BUILD, CRAFT, SCALE, THINK, QUEST, DRIVE, SHAPE, REACH, BLEND, SPARK, PULSE

    IMPORTANTE: SOLO PUEDES RECOMENDAR UNO DE LOS FRAMEWORKS LISTADOS ARRIBA. No inventes nuevos frameworks como "RECIPE" u otros.

    Considera:
    1. Tipo de tarea:
       - Marketing y ventas (AIDA, SPIN, IMPACT)
       - Desarrollo de producto (DESIGN, VISION, FOCUS)
       - Gestión de proyectos (SMART, TEAM, MASTER)
       - Análisis y estrategia (PARA, PROS, POWER)
       - Comunicación y contenido (PEAS, FAST, CLARITY)
       - Transformación digital (LOGIC, EXPERT)
       - Expansión y crecimiento (SCOPE, GROW)
       - Innovación y desarrollo (DESIGN, VISION)

    2. Complejidad:
       - Simple (1-2 pasos): RTF, TAG, PEAS
       - Moderada (3-4 pasos): CARE, STAR, PARA
       - Compleja (5+ pasos): MASTER, CLARITY, EXPERT

    3. Enfoque principal:
       - Resultados medibles: SMART, POWER
       - Proceso estructurado: LOGIC, EXPERT
       - Transformación: VISION, IMPACT
       - Planificación: SCOPE, MASTER
       - Análisis: FOCUS, CLARITY

    4. Contexto específico:
       - B2B vs B2C: SPIN vs AIDA
       - Interno vs Externo: TEAM vs IMPACT
       - Corto vs Largo plazo: FAST vs VISION
       - Estratégico vs Táctico: MASTER vs LOGIC
    '''
    
    # Añadir contexto específico para desarrollo web
    if context.lower() == "web":
        system_message += f'''
    IMPORTANTE: El usuario está desarrollando un proyecto web, por lo que necesita un framework que se adapte específicamente a este contexto. 
    
    Considera prioritariamente los siguientes frameworks:
    - RTF: Ideal para proyectos web con roles específicos y entregables estructurados
    - CODE: Perfecto para documentación técnica y guías de desarrollo web
    - CLARITY: Óptimo para proyectos web complejos con timeline y requisitos detallados
    - GUIDE: Excelente para desarrollo de productos y servicios web enfocados al usuario
    '''
    
    system_message += f'''
    Para cada framework, debes explicar qué significa cada componente en general, no dar un ejemplo específico.

    Por ejemplo, para PEAS:
    P: Propósito - Define el objetivo principal de la comunicación
    E: Resultado Final - Establece el resultado concreto que se busca lograr
    A: Audiencia - Identifica el público objetivo al que va dirigido
    S: Estilo - Determina el tono y formato de la comunicación

    Proporciona tu recomendación exactamente con este formato:

    FRAMEWORK: [SOLO UN NOMBRE DE LOS FRAMEWORKS LISTADOS ARRIBA]

    ¿Por qué este framework?

    [Explicación detallada de por qué este framework es el más adecuado para el objetivo. Incluye sus ventajas específicas y cómo se alinea con las necesidades del usuario. Párrafo de 4-6 líneas.]

    Ejemplo de uso:

    [Explica qué significa cada letra del framework recomendado EN GENERAL, no un ejemplo concreto. Usa el formato exacto del framework con sus componentes explicando qué significa cada uno.]
    '''
    
    response = get_openai_client().chat.completions.create(
        model=get_model_to_use(),
        messages=[
            {"role": "system", "content": system_message},
            {"role": "user", "content": f"Objetivo del usuario: {objective}"}
        ],
        max_tokens=MAX_TOKENS[get_model_to_use()],
        temperature=0.7
    )
    
    recommendation_text = response.choices[0].message.content
    
    # Verificar que la respuesta contiene el formato esperado
    import re
    framework_match = re.search(r'FRAMEWORK:\s*([^\n]+)', recommendation_text, re.IGNORECASE)
    
    if not framework_match:
        # Si no tiene el formato esperado, usar formato genérico apropiado al contexto
        if context.lower() == "web":
            return """FRAMEWORK: CODE

¿Por qué este framework?

El framework CODE es ideal para proyectos de desarrollo web ya que permite estructurar de manera clara y completa toda la información necesaria para crear un sitio o aplicación web efectiva. Este enfoque asegura que se cubran todos los aspectos fundamentales: el contexto del proyecto, los objetivos concretos que se buscan alcanzar, los detalles técnicos necesarios y ejemplos de referencia que ayudan a clarificar expectativas. CODE es particularmente valioso para equipos técnicos que necesitan especificaciones claras, documentación técnica organizada y referencias visuales para implementar correctamente la visión del cliente.

Ejemplo de uso:

C: Contexto - Define el entorno, situación actual y antecedentes relevantes del proyecto web
O: Objetivo - Establece los resultados específicos y medibles que se esperan del desarrollo
D: Detalles - Especifica los requisitos técnicos, funcionalidades y especificaciones necesarias
E: Ejemplos - Proporciona referencias, inspiración o casos de uso que ilustran lo esperado
"""
        else:
            return """FRAMEWORK: PEAS

¿Por qué este framework?

El framework PEAS es ideal para estructurar cualquier tipo de comunicación de manera clara y efectiva. Este enfoque permite definir con precisión los cuatro elementos esenciales para transmitir un mensaje: propósito, resultado esperado, audiencia y estilo. PEAS es especialmente útil cuando necesitas asegurar que tu comunicación esté bien orientada, tenga objetivos claros y esté adaptada a quien va dirigida. La simplicidad y versatilidad de este framework lo hace aplicable a múltiples contextos, desde correos electrónicos hasta presentaciones o documentos técnicos.

Ejemplo de uso:

P: Propósito - Define el objetivo principal que se quiere lograr con la comunicación
E: Resultado Final - Establece el resultado concreto y medible que se espera obtener
A: Audiencia - Identifica las características del público al que va dirigido el mensaje
S: Estilo - Determina el tono, formato y enfoque apropiado para la comunicación
"""
    
    # Verificar que el framework recomendado está en la lista de frameworks disponibles
    framework_name = framework_match.group(1).strip().lower()
    if framework_name not in [f.lower() for f in AVAILABLE_FRAMEWORKS]:
        # Si no es un framework válido, usar formato genérico apropiado al contexto
        if context.lower() == "web":
            return """FRAMEWORK: CODE

¿Por qué este framework?

El framework CODE es ideal para proyectos de desarrollo web ya que permite estructurar de manera clara y completa toda la información necesaria para crear un sitio o aplicación web efectiva. Este enfoque asegura que se cubran todos los aspectos fundamentales: el contexto del proyecto, los objetivos concretos que se buscan alcanzar, los detalles técnicos necesarios y ejemplos de referencia que ayudan a clarificar expectativas. CODE es particularmente valioso para equipos técnicos que necesitan especificaciones claras, documentación técnica organizada y referencias visuales para implementar correctamente la visión del cliente.

Ejemplo de uso:

C: Contexto - Define el entorno, situación actual y antecedentes relevantes del proyecto web
O: Objetivo - Establece los resultados específicos y medibles que se esperan del desarrollo
D: Detalles - Especifica los requisitos técnicos, funcionalidades y especificaciones necesarias
E: Ejemplos - Proporciona referencias, inspiración o casos de uso que ilustran lo esperado
"""
        else:
            return """FRAMEWORK: PEAS

¿Por qué este framework?

El framework PEAS es ideal para estructurar cualquier tipo de comunicación de manera clara y efectiva. Este enfoque permite definir con precisión los cuatro elementos esenciales para transmitir un mensaje: propósito, resultado esperado, audiencia y estilo. PEAS es especialmente útil cuando necesitas asegurar que tu comunicación esté bien orientada, tenga objetivos claros y esté adaptada a quien va dirigida. La simplicidad y versatilidad de este framework lo hace aplicable a múltiples contextos, desde correos electrónicos hasta presentaciones o documentos técnicos.

Ejemplo de uso:

P: Propósito - Define el objetivo principal que se quiere lograr con la comunicación
E: Resultado Final - Establece el resultado concreto y medible que se espera obtener
A: Audiencia - Identifica las características del público al que va dirigido el mensaje
S: Estilo - Determina el tono, formato y enfoque apropiado para la comunicación
"""
    
    # Si es PEAS, asegurar que tiene el formato correcto de explicación
    if framework_name == 'peas' and 'ejemplo de uso:' in recommendation_text.lower():
        example_section = recommendation_text.lower().split('ejemplo de uso:')[1].strip()
        if 'propósito' not in example_section.lower() and 'purpose' not in example_section.lower():
            return """FRAMEWORK: PEAS

¿Por qué este framework?

El framework PEAS es ideal para estructurar cualquier tipo de comunicación de manera clara y efectiva. Este enfoque permite definir con precisión los cuatro elementos esenciales para transmitir un mensaje: propósito, resultado esperado, audiencia y estilo. PEAS es especialmente útil cuando necesitas asegurar que tu comunicación esté bien orientada, tenga objetivos claros y esté adaptada a quien va dirigida. La simplicidad y versatilidad de este framework lo hace aplicable a múltiples contextos, desde correos electrónicos hasta presentaciones o documentos técnicos.

Ejemplo de uso:

P: Propósito - Define el objetivo principal que se quiere lograr con la comunicación
E: Resultado Final - Establece el resultado concreto y medible que se espera obtener
A: Audiencia - Identifica las características del público al que va dirigido el mensaje
S: Estilo - Determina el tono, formato y enfoque apropiado para la comunicación
"""
    
    # Si la respuesta tiene el formato esperado, devolverla como está
    return recommendation_text
