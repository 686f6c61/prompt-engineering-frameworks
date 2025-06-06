"""
Módulo auxiliar para interactuar con la API de OpenAI.

Este módulo proporciona funcionalidades para:
1. Gestión de clientes de OpenAI (por defecto y personalizados)
2. Selección automática de modelos según configuración del usuario
3. Optimización de prompts basados en frameworks predefinidos
4. Conteo de tokens en textos
5. Recomendación de frameworks adecuados según objetivos

El diseño permite alternar fácilmente entre el modelo gratuito (DEFAULT_MODEL)
y un modelo premium (PREMIUM_MODEL) cuando el usuario proporciona su propia API key.
Además, incluye un amplio catálogo de frameworks de prompting y sus plantillas.
"""

import os
from dotenv import load_dotenv
from openai import OpenAI
from console import console
from flask import session

# ===================================
# CONFIGURACIÓN INICIAL
# ===================================

# Cargar variables de entorno
load_dotenv()

# Configuraciones de modelos
DEFAULT_MODEL = "gpt-4o-mini"
PREMIUM_MODEL = "gpt-4o"
MAX_TOKENS = {
    "gpt-4o-mini": 4000,
    "gpt-4o": 8000
}

# ===================================
# GESTIÓN DE CLIENTES DE OPENAI
# ===================================

def create_default_client():
    """
    Crea un cliente OpenAI utilizando la API key por defecto del sistema.
    
    La API key se obtiene de las variables de entorno cargadas por dotenv.
    Esta función se utiliza cuando el usuario no ha proporcionado su propia API key.
    
    Returns:
        OpenAI: Cliente configurado con la API key por defecto
    """
    return OpenAI(
    api_key=os.getenv('OPENAI_API_KEY')
)

def create_custom_client(api_key):
    """
    Crea un cliente OpenAI utilizando una API key personalizada.
    
    Esta función permite a los usuarios proporcionar su propia API key
    para acceder a modelos premium o evitar limitaciones de uso.
    
    Args:
        api_key (str): API key personal proporcionada por el usuario
        
    Returns:
        OpenAI: Cliente configurado con la API key personalizada
    """
    return OpenAI(
        api_key=api_key
    )

def get_openai_client():
    """
    Obtiene el cliente OpenAI apropiado basado en la configuración actual.
    
    Verifica si hay una API key personalizada en la sesión del usuario y,
    en caso afirmativo, crea un cliente personalizado. De lo contrario,
    utiliza el cliente con la API key por defecto del sistema.
    
    Returns:
        OpenAI: Cliente de OpenAI configurado según la sesión actual
    """
    # Verificar si hay una API key personalizada en la sesión
    if session.get('use_custom_api_key', False) and session.get('api_key'):
        return create_custom_client(session.get('api_key'))
    else:
        return create_default_client()

def get_model_to_use():
    """
    Determina qué modelo de OpenAI usar según la configuración de la sesión.
    
    Si el usuario está utilizando su propia API key, se selecciona el modelo premium.
    De lo contrario, se utiliza el modelo por defecto (gratuito).
    
    Returns:
        str: Identificador del modelo a utilizar (DEFAULT_MODEL o PREMIUM_MODEL)
    """
    if session.get('use_custom_api_key', False) and session.get('api_key'):
        return PREMIUM_MODEL
    else:
        return DEFAULT_MODEL

# Inicializar cliente por defecto para compatibilidad con código existente
openai_client = create_default_client()

# ===================================
# FRAMEWORKS Y PLANTILLAS
# ===================================

"""
Lista de todos los frameworks de prompting disponibles en el sistema.
Cada framework tiene un formato específico y está diseñado para diferentes tipos de solicitudes.
"""
AVAILABLE_FRAMEWORKS = [
    'rtf', 'tag', 'bab', 'care', 'rise', 'peas', 'star', 'qcqa', 
    'aida', 'para', 'smart', 'erq', 'code', 'pros', 'team', 
    'idea', 'fast', 'leap', 'grow', 'spin',
    'design', 'vision', 'impact', 'master', 'power',
    'logic', 'scope', 'focus', 'expert', 'clarity',
    'guide', 'path', 'learn', 'solve', 'prime', 'adapt', 'build', 'craft', 'scale', 'think', 'quest', 'drive', 'shape', 'reach', 'blend', 'spark', 'pulse', 'bolt_lovable',
    'daci', 'raci', 'heart', 'mece', 'ooda', 'pdca', 'vmost', 'swot', 'adkar', 'okr', '5w2h', '6m', '4p', 'rice', 'ice', 'rasci',
    'create', 'flow', 'bolt', 'pace', 'agile', 'seed', 'shift', 'lift', 'paths', 'faster', 'value', 'smarter', 'grit', 'glide', 'pivot', 'epic',
    'scqa', 'soar', 'cft', 'tar', 'pace2', 'fab', 'aor', 'spqa', 'sara', 'gear', 'bridge', 'clear'
]

"""
Plantillas para cada framework que definen su estructura básica.
Cada plantilla contiene marcadores de posición (placeholders) que serán 
reemplazados con los datos específicos proporcionados por el usuario.
"""
framework_templates = {
    'rtf': "Rol: {role}\nTarea: {task}\nFormato: {format}",
    'tag': "Tarea: {task}\nAcción: {action}\nMeta: {goal}",
    'bab': "Antes: {before}\nDespués: {after}\nPuente: {bridge}",
    'care': "Contexto: {context}\nAcción: {action}\nResultado: {result}\nEjemplo: {example}",
    'rise': "Relevancia: {relevance}\nInformación: {information}\nSolución: {solution}\nEvaluación: {evaluation}",
    'peas': "Propósito: {purpose}\nResultado Final: {end_result}\nAudiencia: {audience}\nEstilo: {style}",
    'star': "Situación: {situation}\nTarea: {task}\nAcción: {action}\nResultado: {result}",
    'qcqa': "Pregunta: {question}\nContexto: {context}\nCalificación: {qualification}\nFormato Respuesta: {answer_format}",
    'aida': "Atención: {attention}\nInterés: {interest}\nDeseo: {desire}\nAcción: {action}",
    'para': "Problema: {problem}\nAproximación: {approach}\nRazón: {reason}\nAcción: {action}",
    'smart': "Específico: {specific}\nMedible: {measurable}\nAlcanzable: {achievable}\nRelevante: {relevant}\nTemporal: {time_bound}",
    'erq': "Experiencia: {experience}\nRequisitos: {requirements}\nCualificaciones: {qualifications}",
    'code': "Contexto: {context}\nObjetivo: {objective}\nDetalles: {details}\nEjemplos: {examples}",
    'pros': "Perspectiva: {perspective}\nRequisitos: {requirements}\nResultado: {outcome}\nSolución: {solution}",
    'team': "Tarea: {task}\nEntorno: {environment}\nAproximación: {approach}\nMétricas: {metrics}",
    'idea': "Identificar: {identify}\nDefinir: {define}\nEjecutar: {execute}\nAnalizar: {analyze}",
    'fast': "Enfoque: {focus}\nAudiencia: {audience}\nAlcance: {scope}\nTono: {tone}",
    'leap': "Nivel: {level}\nExpectativas: {expectations}\nAproximación: {approach}\nParámetros: {parameters}",
    'grow': "Meta: {goal}\nRealidad: {reality}\nOpciones: {options}\nCamino: {way_forward}",
    'spin': "Situación: {situation}\nProblema: {problem}\nImplicación: {implication}\nNecesidad-Beneficio: {need_payoff}",
    'design': "Definir: {define}\nExplorar: {explore}\nAlcance: {scope}\nIdear: {ideate}\nGuiar: {guide}\nReducir: {reduce}",
    'vision': "Visualizar: {visualize}\nIdentificar: {identify}\nEstructurar: {structure}\nImplementar: {implement}\nOptimizar: {optimize}\nNavegar: {navigate}",
    'impact': "Intención: {intention}\nMensaje: {message}\nPropósito: {purpose}\nAudiencia: {audience}\nCanal: {channel}\nTiempo: {timing}",
    'master': "Misión: {mission}\nAproximación: {approach}\nEstrategia: {strategy}\nTácticas: {tactics}\nEjecución: {execution}\nRevisión: {review}",
    'power': "Problema: {problem}\nResultado: {outcome}\nPor qué: {why}\nEjecución: {execution}\nRecursos: {resources}",
    'logic': "Diseño: {design}\nObjetivo: {objective}\nDirectrices: {guidelines}\nImplementación: {implementation}\nCriterios: {criteria}",
    'scope': "Situación: {situation}\nNecesidad Core: {core_need}\nObstáculos: {obstacles}\nPlan: {plan}\nEvaluación: {evaluation}",
    'focus': "Marco: {framework}\nObjetivo: {objective}\nRestricciones: {constraints}\nComprensión: {understanding}\nSolución: {solution}",
    'expert': "Experiencia: {experience}\nContexto: {context}\nPropósito: {purpose}\nEjecución: {execution}\nResultados: {results}\nPruebas: {tests}",
    'clarity': "Contexto: {context}\nLimitaciones: {limitations}\nAproximación: {approach}\nRequisitos: {requirements}\nImplementación: {implementation}\nCronograma: {timeline}\nRendimiento: {performance}",
    'guide': "Meta: {goal}\nUsuario: {user}\nImplementación: {implementation}\nEntrega: {delivery}\nEvaluación: {evaluation}",
    'path': "Propósito: {purpose}\nAproximación: {approach}\nObjetivo: {target}\nHorizonte: {horizon}",
    'learn': "Nivel: {level}\nExperiencia: {experience}\nAproximación: {approach}\nRecursos: {resources}\nSiguientesPasos: {next_steps}",
    'solve': "Situación: {situation}\nOpciones: {options}\nLimitaciones: {limitations}\nVerificación: {verification}\nEjecución: {execution}",
    'prime': "Problema: {problem}\nInvestigación: {research}\nImplementación: {implementation}\nMonitoreo: {monitoring}\nEvaluación: {evaluation}",
    'adapt': "Análisis: {analysis}\nDiseño: {design}\nAproximación: {approach}\nProgreso: {progress}\nPruebas: {testing}",
    'build': "Línea Base: {baseline}\nEntendimiento: {understanding}\nImplementación: {implementation}\nAprendizaje: {learning}\nEntrega: {delivery}",
    'craft': "Contexto: {context}\nRequisitos: {requirements}\nAproximación: {approach}\nFuncionalidades: {features}\nPruebas: {testing}",
    'scale': "Estrategia: {strategy}\nCapacidades: {capabilities}\nAcción: {action}\nAprendizaje: {learning}\nEvolución: {evolution}",
    'think': "Tema: {topic}\nHistoria: {history}\nInsights: {insights}\nSiguientesPasos: {next_steps}\nConocimiento: {knowledge}",
    'quest': "Pregunta: {question}\nEntendimiento: {understanding}\nExploración: {exploration}\nSolución: {solution}\nPruebas: {testing}",
    'drive': "Dirección: {direction}\nRecursos: {resources}\nImplementación: {implementation}\nValidación: {validation}\nEvolución: {evolution}",
    'shape': "Situación: {situation}\nHistoria: {history}\nAnálisis: {analysis}\nPlan: {plan}\nEjecución: {execution}",
    'reach': "Requisitos: {requirements}\nEvaluación: {evaluation}\nAproximación: {approach}\nCompletitud: {completeness}\nHandover: {handover}",
    'blend': "Base: {base}\nAprendizaje: {learning}\nEvolución: {evolution}\nNavegación: {navigation}\nEntrega: {delivery}",
    'spark': "Estrategia: {strategy}\nPlanificación: {planning}\nAcción: {action}\nResultados: {results}\nConocimiento: {knowledge}",
    'pulse': "Propósito: {purpose}\nEntendimiento: {understanding}\nAprendizaje: {learning}\nEstrategia: {strategy}\nEvaluación: {evaluation}",
    'bolt_lovable': "{context}",
    'daci': "Driver: {driver}\nApprover: {approver}\nContributor: {contributor}\nInformed: {informed}",
    'raci': "Responsable: {responsable}\nAccountable: {accountable}\nConsultado: {consultado}\nInformed: {informed}",
    'heart': "Felicidad: {felicidad}\nCompromiso: {compromiso}\nAdopción: {adopcion}\nRetención: {retencion}\nÉxito en tareas: {exito_en_tareas}",
    'mece': "Mutuamente Exclusivo: {mutuamente_exclusivo}\nColectivamente Exhaustivo: {colectivamente_exhaustivo}",
    'ooda': "Observar: {observar}\nOrientar: {orientar}\nDecidir: {decidir}\nActuar: {actuar}",
    'pdca': "Planificar: {planificar}\nHacer: {hacer}\nVerificar: {verificar}\nActuar: {actuar}",
    'vmost': "Visión: {vision}\nMisión: {mission}\nObjetivos: {objectives}\nEstrategia: {strategy}\nTáctica: {tactica}",
    'swot': "Fortalezas: {fortalezas}\nDebilidades: {debilidades}\nOportunidades: {oportunidades}\nAmenazas: {amenazas}",
    'adkar': "Awareness: {awareness}\nDesire: {desire}\nKnowledge: {knowledge}\nAbility: {ability}\nReinforcement: {reinforcement}",
    'okr': "Objectives: {objectives}\nKey Results: {key_results}",
    '5w2h': "What: {what}\nWhy: {why}\nWhere: {where}\nWhen: {when}\nWho: {who}\nHow: {how}\nHow much: {how_much}",
    '6m': "Man: {man}\nMachine: {machine}\nMaterial: {material}\nMethod: {method}\nMeasurement: {measurement}\nMother Nature: {mother_nature}",
    '4p': "Product: {product}\nPrice: {price}\nPlace: {place}\nPromotion: {promotion}",
    'rice': "Reach: {reach}\nImpact: {impact}\nConfidence: {confidence}\nEffort: {effort}",
    'ice': "Impact: {impact}\nConfidence: {confidence}\nEase: {ease}",
    'rasci': "Responsable: {responsable}\nAccountable: {accountable}\nSupportive: {supportive}\nConsulted: {consulted}\nInformed: {informed}",
    'create': "Concepto: {concept}\nRazón: {reason}\nExploración: {exploration}\nAcción: {action}\nTransformación: {transformation}\nEvaluación: {evaluation}",
    'flow': "Fundamentos: {fundamentals}\nLimitaciones: {limitations}\nOportunidades: {opportunities}\nObjetivos: {objectives}",
    'bolt': "Base: {base}\nObjetivo: {objective}\nLímites: {limits}\nTiempo: {time}",
    'pace': "Problema: {problem}\nAnálisis: {analysis}\nConsecuencias: {consequences}\nEjecución: {execution}",
    'agile': "Adaptabilidad: {adaptability}\nGeneración: {generation}\nIteración: {iteration}\nLigereza: {lightness}\nEvidencia: {evidence}",
    'seed': "Situación: {situation}\nExpectativas: {expectations}\nEjecución: {execution}\nDetalles: {details}",
    'shift': "Situación: {situation}\nHipótesis: {hypothesis}\nInsights: {insights}\nFoco: {focus}\nTransformación: {transformation}",
    'lift': "Limitaciones: {limitations}\nIdeas: {ideas}\nFundamentos: {fundamentals}\nTransformación: {transformation}",
    'paths': "Problema: {problem}\nAnálisis: {analysis}\nTransformación: {transformation}\nHabilitadores: {habilitadores}\nSolución: {solution}",
    'faster': "Foco: {focus}\nAnálisis: {analysis}\nSolución: {solution}\nTáctica: {tactics}\nEjecución: {execution}\nRevisión: {review}",
    'value': "Visión: {vision}\nAcción: {action}\nLiderazgo: {leadership}\nUnidad: {unity}\nEvaluación: {evaluation}",
    'smarter': "Específico: {specific}\nMedible: {measurable}\nAlcanzable: {achievable}\nRelevante: {relevant}\nTemporal: {time_bound}\nEvaluable: {evaluable}\nReajustable: {readjustable}",
    'grit': "Meta: {goal}\nRealismo: {realism}\nInfluencia: {influence}\nTiempo: {time}",
    'glide': "Meta: {goal}\nLímites: {limits}\nInsights: {insights}\nDecisiones: {decisions}\nEjecución: {execution}",
    'pivot': "Problema: {problem}\nImpacto: {impact}\nVisión: {vision}\nOpciones: {options}\nTácticas: {tactics}",
    'epic': "Exploración: {exploration}\nPropuesta: {proposal}\nImplementación: {implementation}\nConsolidación: {consolidation}",
    'clear': "Challenge: {challenge}\nLocation: {location}\nExposure: {exposure}\nAction: {action}\nResult: {result}",
    'bridge': "Background: {background}\nRequirement: {requirement}\nInsight: {insight}\nDecision: {decision}\nGuidance: {guidance}\nExecution: {execution}",
    'gear': "Goal: {goal}\nExpectation: {expectation}\nApproach: {approach}\nResult: {result}",
    'sara': "Situation: {situation}\nAnalysis: {analysis}\nRecommendation: {recommendation}\nAction: {action}",
    'spqa': "Situation: {situation}\nProblem: {problem}\nQuestion: {question}\nAnswer: {answer}",
    'aor': "Action: {action}\nOutcome: {outcome}\nReflection: {reflection}",
    'fab': "Features: {features}\nAdvantages: {advantages}\nBenefits: {benefits}",
    'pace2': "Problem: {problem}\nAnalysis: {analysis}\nConclusion: {conclusion}\nExecution: {execution}",
    'tar': "Task: {task}\nAction: {action}\nResult: {result}",
    'cft': "Context: {context}\nFraming: {framing}\nTask: {task}",
    'soar': "Strengths: {strengths}\nOpportunities: {opportunities}\nAspirations: {aspirations}\nResults: {results}",
    'scqa': "Situation: {situation}\nComplication: {complication}\nQuestion: {question}\nAnswer: {answer}"
}

"""
Ejemplos predefinidos para cada framework, que sirven como referencia
y son utilizados para guiar la generación de nuevos prompts optimizados.
"""
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
""",
    'daci': """
Driver: Líder Técnico del Proyecto
Approver: Director de Tecnología
Contributor: Equipo de Desarrollo, QA
Informed: Stakeholders, Equipos de Soporte
""",
    'raci': """
Responsable: Equipo de Desarrollo Frontend
Accountable: Líder de Proyecto
Consultado: Equipo UX, Arquitecto de Software
Informed: Dirección, Otros Equipos
""",
    'heart': """
Felicidad: Encuestas de satisfacción NPS > 80
Compromiso: Visitas recurrentes semanales
Adopción: Activación 70% de nuevas funciones
Retención: Tasa de abandono < 5% mensual
Éxito en tareas: Conversión del funnel > 25%
""",
    'mece': """
Mutuamente Exclusivo: Segmentación por tipo de usuario
Colectivamente Exhaustivo: Cobertura de todas las casuísticas
""",
    'ooda': """
Observar: Monitorización en tiempo real
Orientar: Análisis de patrones detectados
Decidir: Selección de la mejor estrategia
Actuar: Implementación inmediata
""",
    'pdca': """
Planificar: Diseño de la arquitectura
Hacer: Implementación por fases
Verificar: Pruebas A/B y métricas
Actuar: Ajustes basados en feedback
""",
    'vmost': """
Visión: Liderazgo en procesamiento de datos
Misión: Proporcionar insights accionables
Objetivos: Reducir latencia 40% en 6 meses
Estrategia: Migración a arquitectura cloud
Táctica: Implementación de procesamiento distribuido
""",
    'swot': """
Fortalezas: Equipo experto, tecnología avanzada
Debilidades: Recursos limitados, deuda técnica
Oportunidades: Nuevos mercados, tecnologías emergentes
Amenazas: Competidores disruptivos, cambios regulatorios
""",
    'adkar': """
Awareness: Comunicación del cambio tecnológico
Desire: Beneficios para equipos y usuarios
Knowledge: Capacitación en nuevas tecnologías
Ability: Prácticas guiadas y ambiente de pruebas
Reinforcement: Soporte continuo y mejoras
""",
    'okr': """
Objectives: Mejorar experiencia de usuario
Key Results: NPS>60, Tiempo de carga<2s, Conversión+20%
""",
    '5w2h': """
What: Sistema de autenticación multifactor
Why: Mejorar seguridad de acceso a datos sensibles
Where: Aplicación web y móvil
When: Implementación en Q2 2024
Who: Equipo de seguridad con soporte DevOps
How: Desarrollo progresivo con pruebas continuas
How much: 3 sprint de desarrollo, $30K en infraestructura
""",
    '6m': """
Man: Capacitación del equipo en nuevas tecnologías
Machine: Servidor de alta disponibilidad en la nube
Material: Bases de datos optimizadas y actualizadas
Method: Metodología ágil con integración continua
Measurement: Métricas de rendimiento en tiempo real
Mother Nature: Contingencias para interrupciones externas
""",
    '4p': """
Product: Plataforma SaaS de análisis predictivo
Price: Modelo freemium con planes por volumen
Place: Distribución directa y marketplace
Promotion: Webinars, casos de éxito y prueba gratuita
""",
    'rice': """
Reach: Impacto en 15mil usuarios activos
Impact: Mejora del 30% en métricas clave
Confidence: 80% basado en datos históricos
Effort: 2 sprints con equipo de 4 desarrolladores
""",
    'ice': """
Impact: 8/10 en retención de usuarios
Confidence: 7/10 basado en pruebas A/B
Ease: 6/10 complejidad de implementación
""",
    'rasci': """
Responsable: Equipo de Backend
Accountable: Arquitecto de Soluciones
Supportive: Equipo de QA y UX
Consulted: Seguridad y Compliance
Informed: Management y Stakeholders
""",
    'clear': {
        'challenge': 'Implementar un nuevo sistema de gestión de clientes',
        'location': 'Departamento de ventas',
        'exposure': 'Alta rotación de clientes y pérdida de información',
        'action': 'Desarrollo e implementación de CRM personalizado con capacitación al personal',
        'result': 'Reducción del 30% en pérdida de clientes y mejora del 25% en retención'
    },
    'bridge': {
        'background': 'Empresa en crecimiento con procesos de comunicación ineficientes',
        'requirement': 'Mejorar la comunicación interdepartamental',
        'insight': 'Los equipos trabajan en silos sin compartir información crítica',
        'decision': 'Implementar una plataforma de colaboración centralizada',
        'guidance': 'Capacitar a todos los equipos en el uso de la nueva plataforma',
        'execution': 'Lanzamiento por fases con retroalimentación constante para ajustes'
    },
    'gear': {
        'goal': 'Aumentar el tráfico del sitio web en un 50% durante el próximo trimestre',
        'expectation': 'Implementar estrategia SEO y campaña en redes sociales',
        'approach': 'Optimización de palabras clave, mejora de UX y contenido semanal de valor',
        'result': 'Aumento del 65% en tráfico orgánico y 40% de incremento en conversiones'
    },
    'sara': {
        'situation': 'Proceso de onboarding ineficiente para nuevos empleados',
        'analysis': 'El proceso actual toma 3 semanas y causa frustración en los nuevos contratados',
        'recommendation': 'Digitalizar el proceso y crear material de capacitación estructurado',
        'action': 'Implementar plataforma LMS con contenido personalizado por departamento'
    },
    'spqa': {
        'situation': 'Empresa con alta rotación de personal técnico',
        'problem': 'Pérdida de conocimiento institucional y altos costos de contratación',
        'question': '¿Cómo podemos mejorar la retención y transferencia de conocimiento?',
        'answer': 'Implementar programa de mentorías, documentación estructurada y mejora de compensaciones'
    },
    'aor': {
        'action': 'Implementación de sistema de trabajo remoto durante la pandemia',
        'outcome': 'Mantenimiento de productividad y mejora del balance vida-trabajo',
        'reflection': 'El modelo híbrido es viable a largo plazo y podría reducir costos operativos'
    },
    'fab': {
        'features': 'Plataforma con IA para análisis predictivo de datos de clientes',
        'advantages': 'Procesamiento en tiempo real y patrones de comportamiento personalizados',
        'benefits': 'Aumento de ventas cruzadas, mejor retención y experiencia de cliente mejorada'
    },
    'pace2': {
        'problem': 'Tiempos de carga lentos en aplicación móvil causando abandono de usuarios',
        'analysis': 'Consultas ineficientes a base de datos y recursos no optimizados',
        'conclusion': 'Necesidad de refactorizar el backend y optimizar activos frontend',
        'execution': 'Implementar caché, compresión de imágenes y rediseñar la arquitectura de datos'
    },
    'tar': {
        'task': 'Rediseñar la experiencia de checkout del ecommerce',
        'action': 'Análisis de embudos, pruebas A/B e implementación de diseño simplificado',
        'result': 'Aumento del 23% en tasa de conversión y reducción del 45% en abandonos'
    },
    'cft': {
        'context': 'Startup en fase de expansión con recursos limitados',
        'framing': 'Necesidad de priorizar mercados y funcionalidades del producto',
        'task': 'Desarrollar matriz de priorización basada en potencial de mercado y esfuerzo requerido'
    },
    'soar': {
        'strengths': 'Equipo técnico altamente cualificado y tecnología propietaria',
        'opportunities': 'Mercado emergente con pocos competidores establecidos',
        'aspirations': 'Convertirse en líder de mercado en soluciones de IA para salud',
        'results': 'Triplicar la base de clientes y establecer alianzas estratégicas en el sector'
    },
    'scqa': {
        'situation': 'Startup con producto innovador pero ventas estancadas',
        'complication': 'El mensaje de marketing no conecta con las necesidades reales del cliente',
        'question': '¿Cómo podemos reformular nuestro posicionamiento para aumentar conversiones?',
        'answer': 'Desarrollar nuevo mensaje basado en beneficios claros y casos de uso específicos'
    }
}

# ===================================
# FUNCIONES DE OPTIMIZACIÓN DE PROMPTS
# ===================================

def optimize_prompt(framework: str, form_data: dict, frameworks: list = None) -> str:
    """
    Optimiza un prompt básico utilizando uno de los frameworks predefinidos.
    
    Esta función toma los datos proporcionados por el usuario y los estructura
    según el framework elegido, luego envía este prompt base al modelo de OpenAI
    para que lo enriquezca con detalles, métricas y mejores prácticas específicas.
    
    Args:
        framework (str): Identificador del framework a utilizar (ej: 'rtf', 'peas')
        form_data (dict): Datos del formulario con los valores específicos para el framework
        frameworks (list, optional): Lista alternativa de frameworks disponibles
        
    Returns:
        str: Prompt optimizado y enriquecido por el modelo de OpenAI
        
    Raises:
        ValueError: Si el framework no está disponible o faltan datos requeridos
    """
    console.debug("DEBUG - Templates disponibles:", list(framework_templates.keys()))
    console.debug("DEBUG - Framework recibido:", framework)
    console.debug("DEBUG - Datos del formulario:", form_data)
    
    # Convertir a minúsculas para evitar problemas de coincidencia
    framework = framework.lower()
    if framework not in framework_templates:
        raise ValueError(f"No hay plantilla disponible para el framework '{framework}'")
    
    if framework not in FRAMEWORK_EXAMPLES:
        raise ValueError(f"No hay ejemplo disponible para el framework '{framework}'")
        
    try:
        # Generar el prompt básico usando la plantilla del framework y los datos del formulario
        raw_prompt = framework_templates[framework].format(**form_data)
    except KeyError as e:
        raise ValueError(f"Campo requerido faltante: {str(e)}")
        
    # Obtener el ejemplo para el framework seleccionado
    example = FRAMEWORK_EXAMPLES[framework]
    
    # Construir el mensaje para el modelo, definiendo su rol y objetivos
    formatted_message = """Eres un experto en optimización de prompts en español, especializado en:
    1. Análisis detallado de objetivos y contexto
    2. Identificación de métricas clave y KPIs relevantes
    3. Desarrollo de estrategias basadas en datos
    4. Implementación de mejores prácticas por industria
    5. Generación de contenido extenso, profundo y detallado
    
    Para cada prompt, debes:
    1. Mantener la estructura original del framework
    2. IMPORTANTE: Desarrollar cada sección con MÁXIMO detalle (mínimo 4-5 párrafos por sección)
    3. Incluir múltiples métricas cuantificables y KPIs con valores específicos
    4. Agregar consideraciones especiales del sector con referencias a tendencias actuales
    5. Proponer al menos 5-7 mejores prácticas aplicables con explicaciones detalladas
    6. Sugerir ejemplos reales, casos de uso y escenarios de implementación
    7. Incluir subsecciones adicionales como "Desafíos potenciales", "Recursos necesarios" y "Próximos pasos"
    8. Añadir contexto específico de la industria, tecnologías relevantes y stakeholders involucrados
    
    Tu respuesta DEBE ser extensa y exhaustiva, con un mínimo de 1500-2000 palabras en total.
    
    El prompt debe ser:
    - Extremadamente detallado y profundo
    - Específico y accionable, con múltiples recomendaciones prácticas
    - Medible con métricas concretas y objetivos cuantificables
    - Realista y alcanzable, pero ambicioso
    - Relevante para el contexto y alineado con tendencias actuales
    - Con plazos definidos cuando aplique, incluyendo hitos intermedios
    - Estructurado con subsecciones claras y desarrollo completo de ideas
    
    Usa el siguiente ejemplo como referencia para el nivel de detalle esperado, pero tu respuesta debe ser CONSIDERABLEMENTE MÁS EXTENSA:
    
    {example}
    
    Ahora, optimiza el siguiente prompt manteniendo su estructura pero desarrollando EXTENSAMENTE todos los puntos mencionados anteriormente:
    
    {raw_prompt}""".format(example=example, raw_prompt=raw_prompt)

    # Enviar la solicitud al modelo de OpenAI
    response = get_openai_client().chat.completions.create(
        model=get_model_to_use(),
        messages=[
            {"role": "system", "content": formatted_message}
        ],
        max_tokens=MAX_TOKENS[get_model_to_use()]
    )
    
    # Devolver el contenido optimizado generado por el modelo
    return response.choices[0].message.content

def count_tokens(text: str) -> int:
    """
    Cuenta el número de tokens en un texto utilizando la API de OpenAI.
    
    Esta función es útil para estimar el costo de una solicitud a la API
    o para verificar si un texto excede los límites de tokens de un modelo.
    
    Args:
        text (str): El texto cuyo conteo de tokens se desea conocer
        
    Returns:
        int: Número de tokens en el texto
    """
    response = get_openai_client().chat.completions.create(
        model=get_model_to_use(),
        messages=[
            {"role": "user", "content": text}
        ],
        max_tokens=1000
    )
    return response.usage.prompt_tokens

def get_framework_recommendation(objective: str, context: str = "general") -> str:
    """
    Recomienda un framework de prompt basado en el objetivo del usuario.
    
    Analiza el objetivo proporcionado por el usuario y determina cuál
    de los frameworks disponibles es más adecuado para estructurar su prompt.
    Considera factores como el tipo de tarea, complejidad, enfoque principal
    y contexto específico.
    
    Args:
        objective (str): Descripción del objetivo o necesidad del usuario
        context (str, optional): Contexto específico, por ejemplo "web" para desarrollo web
        
    Returns:
        str: Recomendación formateada con el framework elegido, explicación y ejemplo de uso
    """
    # Mensaje del sistema que guía al modelo en su tarea de recomendación
    system_message = f'''Eres un experto en frameworks de prompts en español. Tu tarea es analizar el objetivo del usuario y recomendar ÚNICAMENTE uno de los siguientes frameworks disponibles. NO INVENTES FRAMEWORKS NUEVOS:

    RTF, TAG, BAB, CARE, RISE, PEAS, STAR, QCQA, AIDA, PARA, SMART, ERQ, CODE, PROS, TEAM, IDEA, FAST, LEAP, GROW, SPIN, DESIGN, VISION, IMPACT, MASTER, POWER, LOGIC, SCOPE, FOCUS, EXPERT, CLARITY, GUIDE, PATH, LEARN, SOLVE, PRIME, ADAPT, BUILD, CRAFT, SCALE, THINK, QUEST, DRIVE, SHAPE, REACH, BLEND, SPARK, PULSE, DACI, RACI, HEART, MECE, OODA, PDCA, VMOST, SWOT, ADKAR, OKR, 5W2H, 6M, 4P, RICE, ICE, RASCI, CREATE, FLOW, BOLT, PACE, AGILE, SEED, SHIFT, LIFT, PATHS, FASTER, VALUE, SMARTER, GRIT, GLIDE, PIVOT, EPIC

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
       - Procesos creativos (CREATE, FLOW)
       - Desarrollo ágil (AGILE, FASTER)
       - Gestión del cambio (SHIFT, PIVOT)
       - Optimización (FLOW, VALUE)

    2. Complejidad:
       - Simple (1-2 pasos): RTF, TAG, PEAS
       - Moderada (3-4 pasos): CARE, STAR, PARA
       - Compleja (5+ pasos): MASTER, CLARITY, EXPERT, SMARTER

    3. Enfoque principal:
       - Resultados medibles: SMART, POWER, GRIT
       - Proceso estructurado: LOGIC, EXPERT, PATHS
       - Transformación: VISION, IMPACT, SHIFT
       - Planificación: SCOPE, MASTER, EPIC
       - Análisis: FOCUS, CLARITY, VALUE
       - Evaluación: ICE, RICE, MECE

    4. Contexto específico:
       - B2B vs B2C: SPIN vs AIDA
       - Interno vs Externo: TEAM vs IMPACT
       - Corto vs Largo plazo: FAST vs VISION
       - Estratégico vs Táctico: MASTER vs LOGIC
       - Ágil vs Tradicional: AGILE vs CLARITY
       - Innovación vs Optimización: CREATE vs FLOW
    '''
    
    # Añadir contexto específico para desarrollo web si aplica
    if context.lower() == "web":
        system_message += f'''
    IMPORTANTE: El usuario está desarrollando un proyecto web, por lo que necesita un framework que se adapte a este contexto. 
    
    Evalúa TODOS los frameworks de manera equitativa. No des prioridad a ningún framework específico - todos tienen la misma importancia. 
    Selecciona el framework que mejor se adapte al objetivo del usuario basándote exclusivamente en su descripción del problema, no en preferencias predefinidas.
    '''
    
    # Instrucciones sobre el formato de respuesta esperado
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
    
    # Generar la recomendación utilizando el modelo de OpenAI
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
    
    # Si no tiene el formato esperado, usar formato genérico apropiado al contexto
    if not framework_match:
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