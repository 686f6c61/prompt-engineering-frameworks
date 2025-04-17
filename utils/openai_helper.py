import os
from dotenv import load_dotenv
from openai import OpenAI
from console import console

# Cargar variables de entorno
load_dotenv()

# Inicializar cliente de OpenAI
openai_client = OpenAI(
    api_key=os.getenv('OPENAI_API_KEY')
)

AVAILABLE_FRAMEWORKS = [
    'rtf', 'tag', 'bab', 'care', 'rise', 'peas', 'star', 'qcqa', 
    'aida', 'para', 'smart', 'erq', 'code', 'pros', 'team', 
    'idea', 'fast', 'leap', 'grow', 'spin',
    'design', 'vision', 'impact', 'master', 'power',
    'logic', 'scope', 'focus', 'expert', 'clarity'
]

FRAMEWORK_EXAMPLES = {
    'peas': """
Propósito: Lanzamiento boletín tecnológico
Resultado Final: 1000 suscriptores en 3 meses
Audiencia: Desarrolladores con experiencia
Estilo: Técnico pero comprensible
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
"""
}

# Definir las plantillas para cada framework
framework_templates = {
    'tag': """
Task: {task}
Action: {action}
Goal: {goal}
""",
    'rtf': """
Role: {role}
Task: {task}
Format: {format}
""",
    'bab': """
Before: {before}
After: {after}
Bridge: {bridge}
""",
    'care': """
Context: {context}
Action: {action}
Result: {result}
Example: {example}
""",
    'rise': """
Role: {role}
Input: {input}
Steps: {steps}
Expectation: {expectation}
""",
    'peas': """
Purpose: {purpose}
EndResult: {endResult}
Audience: {audience}
Style: {style}
""",
    'star': """
Situation: {situation}
Task: {task}
Action: {action}
Result: {result}
""",
    'qcqa': """
Question: {question}
Context: {context}
Qualification: {qualification}
AnswerFormat: {answerFormat}
""",
    'aida': """
Attention: {attention}
Interest: {interest}
Desire: {desire}
Action: {action}
""",
    'para': """
Problem: {problem}
Approach: {approach}
Rationale: {rationale}
Action: {action}
""",
    'smart': """
Specific: {specific}
Measurable: {measurable}
Achievable: {achievable}
Relevant: {relevant}
TimeBound: {timeBound}
""",
    'erq': """
Experience: {experience}
Requirements: {requirements}
Qualifiers: {qualifiers}
""",
    'code': """
Context: {context}
Objective: {objective}
Details: {details}
Examples: {examples}
""",
    'pros': """
Perspective: {perspective}
Requirements: {requirements}
Outcome: {outcome}
Scope: {scope}
""",
    'team': """
Task: {task}
Environment: {environment}
Approach: {approach}
Metrics: {metrics}
""",
    'idea': """
Identify: {identify}
Define: {define}
Execute: {execute}
Assess: {assess}
""",
    'fast': """
Focus: {focus}
Audience: {audience}
Scope: {scope}
Tone: {tone}
""",
    'leap': """
Level: {level}
Expectations: {expectations}
Approach: {approach}
Parameters: {parameters}
""",
    'grow': """
Goal: {goal}
Reality: {reality}
Options: {options}
Way: {way}
""",
    'spin': """
Situation: {situation}
Problem: {problem}
Implication: {implication}
NeedPayoff: {needPayoff}
""",
    'design': """
Define: {define}
Explore: {explore}
Scope: {scope}
Ideate: {ideate}
Guide: {guide}
Narrow: {narrow}
""",
    'vision': """
Visualize: {visualize}
Identify: {identify}
Structure: {structure}
Implement: {implement}
Optimize: {optimize}
Navigate: {navigate}
""",
    'impact': """
Intent: {intent}
Message: {message}
Purpose: {purpose}
Audience: {audience}
Channel: {channel}
Timing: {timing}
""",
    'master': """
Mission: {mission}
Approach: {approach}
Strategy: {strategy}
Tactics: {tactics}
Execution: {execution}
Review: {review}
""",
    'power': """
Problem: {problem}
Outcome: {outcome}
Why: {why}
Execution: {execution}
Resources: {resources}
""",
    'logic': """
Layout: {layout}
Objective: {objective}
Guidelines: {guidelines}
Implementation: {implementation}
Criteria: {criteria}
""",
    'scope': """
Situation: {situation}
CoreNeed: {coreNeed}
Obstacles: {obstacles}
Plan: {plan}
Evaluation: {evaluation}
""",
    'focus': """
Frame: {frame}
Objective: {objective}
Constraints: {constraints}
Understanding: {understanding}
Solution: {solution}
""",
    'expert': """
Expertise: {expertise}
Context: {context}
Purpose: {purpose}
Execution: {execution}
Results: {results}
Testing: {testing}
""",
    'clarity': """
Context: {context}
Limitations: {limitations}
Approach: {approach}
Requirements: {requirements}
Implementation: {implementation}
Timeline: {timeline}
Yield: {yield}
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

    response = openai_client.chat.completions.create(
        model="gpt-4-turbo",
        messages=[
            {"role": "system", "content": formatted_message},
        ],
        max_tokens=3000
    )
    
    return response.choices[0].message.content

def count_tokens(text: str) -> int:
    """Count the number of tokens in a text using the OpenAI API."""
    response = openai_client.chat.completions.create(
        model="gpt-4-turbo",
        messages=[{"role": "user", "content": text}],
        max_tokens=100
    )
    return response.usage.prompt_tokens

def get_framework_recommendation(objective: str) -> dict:
    system_message = '''Eres un experto en frameworks de prompts en español. Tu tarea es analizar el objetivo del usuario y recomendar el framework más adecuado entre los siguientes frameworks disponibles:

    RTF, TAG, BAB, CARE, RISE, PEAS, STAR, QCQA, AIDA, PARA, SMART, ERQ, CODE, PROS, TEAM, IDEA, FAST, LEAP, GROW, SPIN, DESIGN, VISION, IMPACT, MASTER, POWER, LOGIC, SCOPE, FOCUS, EXPERT, CLARITY

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

    Proporciona una recomendación detallada en formato JSON con:
    {
        "framework": "NOMBRE_FRAMEWORK",
        "reason": "Explicación detallada de por qué este framework es el más adecuado para el objetivo específico, incluyendo ventajas clave y cómo se alinea con las necesidades",
        "example": "Un ejemplo concreto y detallado de cómo usar el framework para este objetivo específico, incluyendo cada componente del framework"
    }'''
    
    response = openai_client.chat.completions.create(
        model="gpt-4o",
        messages=[
            {"role": "system", "content": system_message},
            {"role": "user", "content": f"Objetivo del usuario: {objective}"}
        ],
        response_format={"type": "json_object"},
        max_tokens=4096,
        temperature=0.7
    )
    
    return response.choices[0].message.content
