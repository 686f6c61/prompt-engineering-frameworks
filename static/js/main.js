// Global variables
let selectedFrameworks = [];
let tokenCount = 0;
let maxTokensDisplay = 4000; // Valor predeterminado de tokens máximos para modelo gpt-4o-mini

// Field translations
const fieldTranslations = {
    // Existing translations
    role: 'Rol',
    task: 'Tarea',
    format: 'Formato',
    action: 'Acción',
    goal: 'Meta',
    before: 'Antes',
    after: 'Después',
    bridge: 'Puente',
    context: 'Contexto',
    result: 'Resultado',
    example: 'Ejemplo',
    input: 'Entrada',
    steps: 'Pasos',
    expectation: 'Expectativa',
    // New translations for additional frameworks
    define: 'Definir',
    explore: 'Explorar',
    scope: 'Alcance',
    ideate: 'Idear',
    guide: 'Guiar',
    reduce: 'Reducir',
    visualize: 'Visualizar',
    identify: 'Identificar',
    structure: 'Estructurar',
    implement: 'Implementar',
    optimize: 'Optimizar',
    navigate: 'Navegar',
    intent: 'Intención',
    message: 'Mensaje',
    purpose: 'Propósito',
    audience: 'Audiencia',
    channel: 'Canal',
    timing: 'Tiempo',
    mission: 'Misión',
    strategy: 'Estrategia',
    tactics: 'Tácticas',
    execution: 'Ejecución',
    review: 'Revisión',
    outcome: 'Resultado',
    why: 'Por qué',
    resources: 'Recursos',
    layout: 'Diseño',
    objective: 'Objetivo',
    guidelines: 'Directrices',
    implementation: 'Implementación',
    criteria: 'Criterios',
    coreNeed: 'Necesidad Core',
    core_need: 'Necesidad Core',
    obstacles: 'Obstáculos',
    plan: 'Plan',
    evaluation: 'Evaluación',
    frame: 'Marco',
    constraints: 'Restricciones',
    understanding: 'Comprensión',
    solution: 'Solución',
    expertise: 'Experiencia',
    results: 'Resultados',
    testing: 'Pruebas',
    limitations: 'Limitaciones',
    approach: 'Enfoque',
    requirements: 'Requerimientos',
    timeline: 'Cronograma',
    yield: 'Rendimiento',
    performance: 'Rendimiento',
    specific: 'Específico',
    measurable: 'Medible',
    achievable: 'Alcanzable',
    relevant: 'Relevante',
    timeBound: 'Temporal',
    time_bound: 'Temporal',
    endResult: 'Resultado Final',
    end_result: 'Resultado Final',
    style: 'Estilo',
    situation: 'Situación',
    question: 'Pregunta',
    qualification: 'Calificación',
    answerFormat: 'Formato de Respuesta',
    answer_format: 'Formato de Respuesta',
    attention: 'Atención',
    interest: 'Interés',
    desire: 'Deseo',
    assessment: 'Evaluación',
    experience: 'Experiencia',
    qualifiers: 'Calificadores',
    qualifications: 'Calificaciones',
    details: 'Detalles',
    examples: 'Ejemplos',
    perspective: 'Perspectiva',
    environment: 'Entorno',
    metrics: 'Métricas',
    level: 'Nivel',
    expectations: 'Expectativas',
    parameters: 'Parámetros',
    reality: 'Realidad',
    options: 'Opciones',
    way: 'Camino',
    way_forward: 'Camino a seguir',
    problem: 'Problema',
    implication: 'Implicación',
    needPayoff: 'Necesidad',
    need_payoff: 'Necesidad',
    focus: 'Enfoque',
    tone: 'Tono',
    history: 'Historia',
    insights: 'Insights',
    nextSteps: 'Siguientes Pasos',
    next_steps: 'Siguientes Pasos',
    knowledge: 'Conocimiento',
    verification: 'Verificación',
    research: 'Investigación',
    monitoring: 'Monitoreo',
    analysis: 'Análisis',
    progress: 'Progreso',
    baseline: 'Línea Base',
    base: 'Base',
    learning: 'Aprendizaje',
    delivery: 'Entrega',
    features: 'Características',
    capabilities: 'Capacidades',
    evolution: 'Evolución',
    topic: 'Tema',
    exploration: 'Exploración',
    direction: 'Dirección',
    validation: 'Validación',
    completion: 'Finalización',
    completeness: 'Completitud',
    handover: 'Entrega',
    navigation: 'Navegación',
    planning: 'Planificación',
    user: 'Usuario',
    target: 'Objetivo',
    horizon: 'Horizonte',
    framework: 'Framework',
    intention: 'Intención',
    design: 'Diseño',
    development: 'Desarrollo',
    reason: 'Razón',
    opportunities: 'Oportunidades',
    relevance: 'Relevancia',
    information: 'Información',
    driver: 'Driver',
    approver: 'Approver',
    contributor: 'Contributor',
    informed: 'Informado',
    responsable: 'Responsable',
    accountable: 'Accountable',
    consultado: 'Consultado',
    felicidad: 'Felicidad',
    compromiso: 'Compromiso',
    adopcion: 'Adopción',
    retencion: 'Retención',
    exito_en_tareas: 'Éxito en tareas',
    mutuamente_exclusivo: 'Mutuamente Exclusivo',
    colectivamente_exhaustivo: 'Colectivamente Exhaustivo',
    observar: 'Observar',
    orientar: 'Orientar',
    decidir: 'Decidir',
    actuar: 'Actuar',
    planificar: 'Planificar',
    hacer: 'Hacer',
    verificar: 'Verificar',
    tactica: 'Táctica',
    fortalezas: 'Fortalezas',
    debilidades: 'Debilidades',
    amenazas: 'Amenazas',
    awareness: 'Awareness',
    ability: 'Ability',
    reinforcement: 'Reinforcement',
    objectives: 'Objectives',
    key_results: 'Key Results',
    what: 'What',
    where: 'Where',
    when: 'When',
    who: 'Who',
    how: 'How',
    how_much: 'How much',
    man: 'Man',
    machine: 'Machine',
    material: 'Material',
    method: 'Method',
    measurement: 'Measurement',
    mother_nature: 'Mother Nature',
    product: 'Product',
    price: 'Price',
    place: 'Place',
    promotion: 'Promotion',
    reach: 'Reach',
    confidence: 'Confidence',
    effort: 'Effort',
    ease: 'Ease',
    supportive: 'Supportive',
    // Nuevas traducciones
    complication: 'Complicación',
    strengths: 'Fortalezas',
    opportunities: 'Oportunidades',
    aspirations: 'Aspiraciones',
    results: 'Resultados',
    framing: 'Encuadre',
    task: 'Tarea',
    action: 'Acción',
    result: 'Resultado',
    problem: 'Problema',
    analysis: 'Análisis',
    conclusion: 'Conclusión',
    execution: 'Ejecución',
    features: 'Características',
    advantages: 'Ventajas',
    benefits: 'Beneficios',
    outcome: 'Resultado',
    reflection: 'Reflexión',
    recommendation: 'Recomendación',
    goal: 'Meta',
    expectation: 'Expectativa',
    approach: 'Enfoque',
    background: 'Antecedentes',
    requirement: 'Requisito',
    insight: 'Insight',
    decision: 'Decisión',
    guidance: 'Guía',
    challenge: 'Desafío',
    location: 'Ubicación',
    exposure: 'Exposición'
};

// Framework definitions
const frameworks = {
    'tag': ['task', 'action', 'goal'],
    'rtf': ['role', 'task', 'format'],
    'bab': ['before', 'after', 'bridge'],
    'care': ['context', 'action', 'result', 'example'],
    'rise': ['relevance', 'information', 'solution', 'evaluation'],
    'peas': ['purpose', 'end_result', 'audience', 'style'],
    'star': ['situation', 'task', 'action', 'result'],
    'qcqa': ['question', 'context', 'qualification', 'answer_format'],
    'aida': ['attention', 'interest', 'desire', 'action'],
    'para': ['problem', 'approach', 'reason', 'action'],
    'smart': ['specific', 'measurable', 'achievable', 'relevant', 'time_bound'],
    'erq': ['experience', 'requirements', 'qualifications'],
    'code': ['context', 'objective', 'development', 'evaluation'],
    'pros': ['perspective', 'requirements', 'outcome', 'scope'],
    'team': ['task', 'environment', 'approach', 'metrics'],
    'idea': ['identify', 'define', 'execute', 'assess'],
    'fast': ['focus', 'audience', 'scope', 'tone'],
    'leap': ['level', 'expectations', 'approach', 'parameters'],
    'grow': ['goal', 'reality', 'options', 'way_forward'],
    'spin': ['situation', 'problem', 'implication', 'need_payoff'],
    'design': ['define', 'explore', 'scope', 'ideate', 'guide', 'reduce'],
    'vision': ['visualize', 'identify', 'structure', 'implement', 'optimize', 'navigate'],
    'impact': ['intention', 'message', 'purpose', 'audience', 'channel', 'timing'],
    'master': ['mission', 'approach', 'strategy', 'tactics', 'execution', 'review'],
    'power': ['problem', 'opportunities', 'why', 'execution', 'resources'],
    'logic': ['layout', 'objective', 'guidelines', 'implementation', 'criteria'],
    'scope': ['situation', 'core_need', 'obstacles', 'plan', 'evaluation'],
    'focus': ['frame', 'objective', 'constraints', 'understanding', 'solution'],
    'expert': ['expertise', 'context', 'purpose', 'execution', 'results', 'testing'],
    'clarity': ['context', 'limitations', 'approach', 'requirements', 'implementation', 'timeline', 'performance'],
    'guide': ['goal', 'user', 'implementation', 'delivery', 'evaluation'],
    'path': ['purpose', 'approach', 'target', 'horizon'],
    'learn': ['level', 'experience', 'approach', 'resources', 'next_steps'],
    'solve': ['situation', 'options', 'limitations', 'verification', 'execution'],
    'prime': ['problem', 'research', 'implementation', 'monitoring', 'evaluation'],
    'adapt': ['analyze', 'design', 'approach', 'progress', 'testing'],
    'build': ['base', 'understanding', 'implementation', 'learning', 'delivery'],
    'craft': ['context', 'requirements', 'approach', 'features', 'testing'],
    'scale': ['strategy', 'capabilities', 'action', 'learning', 'evolution'],
    'think': ['topic', 'history', 'insights', 'next_steps', 'knowledge'],
    'quest': ['question', 'understanding', 'exploration', 'solution', 'testing'],
    'drive': ['direction', 'resources', 'implementation', 'validation', 'evolution'],
    'shape': ['situation', 'history', 'analyze', 'plan', 'execution'],
    'reach': ['requirements', 'evaluation', 'approach', 'completeness', 'handover'],
    'blend': ['base', 'learning', 'evolution', 'navigation', 'delivery'],
    'spark': ['strategy', 'planning', 'action', 'results', 'knowledge'],
    'pulse': ['purpose', 'understanding', 'learning', 'strategy', 'evaluation'],
    'daci': ['driver', 'approver', 'contributor', 'informed'],
    'raci': ['responsable', 'accountable', 'consultado', 'informed'],
    'heart': ['felicidad', 'compromiso', 'adopcion', 'retencion', 'exito_en_tareas'],
    'mece': ['mutuamente_exclusivo', 'colectivamente_exhaustivo'],
    'ooda': ['observar', 'orientar', 'decidir', 'actuar'],
    'pdca': ['planificar', 'hacer', 'verificar', 'actuar'],
    'vmost': ['vision', 'mission', 'objectives', 'strategy', 'tactica'],
    'swot': ['fortalezas', 'debilidades', 'oportunidades', 'amenazas'],
    'adkar': ['awareness', 'desire', 'knowledge', 'ability', 'reinforcement'],
    'okr': ['objectives', 'key_results'],
    '5w2h': ['what', 'why', 'where', 'when', 'who', 'how', 'how_much'],
    '6m': ['man', 'machine', 'material', 'method', 'measurement', 'mother_nature'],
    '4p': ['product', 'price', 'place', 'promotion'],
    'rice': ['reach', 'impact', 'confidence', 'effort'],
    'ice': ['impact', 'confidence', 'ease'],
    'rasci': ['responsable', 'accountable', 'supportive', 'consulted', 'informed'],
    'scqa': ['situation', 'complication', 'question', 'answer'],
    'soar': ['strengths', 'opportunities', 'aspirations', 'results'],
    'cft': ['context', 'framing', 'task'],
    'tar': ['task', 'action', 'result'],
    'pace2': ['problem', 'analysis', 'conclusion', 'execution'],
    'fab': ['features', 'advantages', 'benefits'],
    'aor': ['action', 'outcome', 'reflection'],
    'spqa': ['situation', 'problem', 'question', 'answer'],
    'sara': ['situation', 'analysis', 'recommendation', 'action'],
    'gear': ['goal', 'expectation', 'approach', 'result'],
    'bridge': ['background', 'requirement', 'insight', 'decision', 'guidance', 'execution'],
    'clear': ['challenge', 'location', 'exposure', 'action', 'result']
};

// Movido después de la definición de frameworks
let totalFrameworks = Object.keys(frameworks).length; // Número total de frameworks disponibles

// Placeholders for each framework
const frameworkPlaceholders = {
    'tag': {
        task: "Ej: Desarrollar una API de autenticación",
        action: "Ej: Implementar OAuth 2.0 con JWT",
        goal: "Ej: Reducir tiempo de login en un 40%"
    },
    'rtf': {
        role: "Ej: Arquitecto de Software Senior",
        task: "Ej: Diseñar sistema de microservicios",
        format: "Ej: Documento técnico con diagramas C4"
    },
    'bab': {
        before: "Ej: Sistema monolítico con 5s de respuesta",
        after: "Ej: Microservicios con respuesta < 100ms",
        bridge: "Ej: Plan de migración en 3 fases"
    },
    'care': {
        context: "Ej: E-commerce con 10k usuarios diarios",
        action: "Ej: Implementar caché distribuida",
        result: "Ej: Reducción de latencia del 60%",
        example: "Ej: Caso de éxito en proyecto similar"
    },
    'rise': {
        relevance: "Ej: Pérdida de usuarios en app móvil (25% en 3 meses)",
        information: "Ej: Análisis de embudos muestra abandono en proceso de registro",
        solution: "Ej: Simplificar flujo de registro reduciendo pasos de 5 a 3",
        evaluation: "Ej: Meta de aumentar conversión en registro del 45% al 70%"
    },
    'peas': {
        purpose: "Ej: Informar sobre nueva política de seguridad informática",
        end_result: "Ej: 100% del personal comprende y cumple las nuevas normas",
        audience: "Ej: Empleados no técnicos con acceso a datos sensibles",
        style: "Ej: Claro, conciso, con ejemplos prácticos e infografías"
    },
    'star': {
        situation: "Ej: Sistema legacy con problemas de rendimiento",
        task: "Ej: Optimizar consultas a base de datos",
        action: "Ej: Implementar índices y caché",
        result: "Ej: Mejora del 70% en tiempo de respuesta"
    },
    'qcqa': {
        question: "Ej: ¿Cómo mejorar el rendimiento?",
        context: "Ej: Sistema actual y limitaciones",
        qualification: "Ej: Experiencia en optimización",
        answer_format: "Ej: Plan detallado con métricas"
    },
    'aida': {
        attention: "Ej: Problema crítico de rendimiento",
        interest: "Ej: Impacto en el negocio",
        desire: "Ej: Solución propuesta",
        action: "Ej: Plan de implementación"
    },
    'para': {
        problem: "Ej: Baja velocidad de desarrollo",
        approach: "Ej: Implementar desarrollo en rama principal",
        reason: "Ej: Reduce conflictos de fusión y acelera integración",
        action: "Ej: Migración gradual por equipos de desarrollo"
    },
    'smart': {
        specific: "Ej: Reducir tiempo de carga a 200ms",
        measurable: "Ej: Métricas de rendimiento",
        achievable: "Ej: Plan realista",
        relevant: "Ej: Impacto en usuarios",
        time_bound: "Ej: Completar en 3 meses"
    },
    'erq': {
        experience: "Ej: 5 años en desarrollo backend",
        requirements: "Ej: Conocimientos específicos",
        qualifications: "Ej: Certificaciones relevantes"
    },
    'code': {
        context: "Ej: Necesidad de mejorar el rendimiento del sistema",
        objective: "Ej: Reducir el tiempo de carga en un 30%",
        development: "Ej: Optimización de consultas y refactorización de código",
        evaluation: "Ej: Comparación de métricas antes y después de la optimización"
    },
    'pros': {
        perspective: "Ej: Visión técnica del problema",
        requirements: "Ej: Necesidades del sistema",
        outcome: "Ej: Resultados esperados",
        scope: "Ej: Alcance del proyecto"
    },
    'team': {
        task: "Ej: Desarrollo de nueva funcionalidad",
        environment: "Ej: Stack tecnológico actual",
        approach: "Ej: Metodología de desarrollo",
        metrics: "Ej: KPIs del proyecto"
    },
    'idea': {
        identify: "Ej: Identificar problema principal",
        define: "Ej: Definir solución propuesta",
        execute: "Ej: Plan de ejecución",
        assess: "Ej: Evaluación de resultados"
    },
    'fast': {
        focus: "Ej: Objetivo principal",
        audience: "Ej: Usuarios objetivo",
        scope: "Ej: Alcance del proyecto",
        tone: "Ej: Enfoque técnico"
    },
    'leap': {
        level: "Ej: Nivel de complejidad",
        expectations: "Ej: Resultados esperados",
        approach: "Ej: Metodología",
        parameters: "Ej: Límites y restricciones"
    },
    'grow': {
        goal: "Ej: Objetivo del proyecto",
        reality: "Ej: Situación actual",
        options: "Ej: Alternativas disponibles",
        way_forward: "Ej: Plan de acción"
    },
    'spin': {
        situation: "Ej: Estado actual del sistema",
        problem: "Ej: Problemas identificados",
        implication: "Ej: Impacto en el negocio",
        need_payoff: "Ej: Beneficios de la solución"
    },
    'design': {
        define: "Ej: Definir requisitos",
        explore: "Ej: Explorar soluciones",
        scope: "Ej: Definir alcance",
        ideate: "Ej: Generar ideas",
        guide: "Ej: Guías de implementación",
        reduce: "Ej: Refinar solución"
    },
    'vision': {
        visualize: "Ej: Visión del proyecto",
        identify: "Ej: Identificar necesidades",
        structure: "Ej: Estructura de la solución",
        implement: "Ej: Plan de implementación",
        optimize: "Ej: Optimizaciones",
        navigate: "Ej: Gestión de obstáculos"
    },
    'impact': {
        intention: "Ej: Objetivo principal",
        message: "Ej: Mensaje clave",
        purpose: "Ej: Propósito del proyecto",
        audience: "Ej: Audiencia objetivo",
        channel: "Ej: Canales de implementación",
        timing: "Ej: Cronograma"
    },
    'master': {
        mission: "Ej: Misión del proyecto",
        approach: "Ej: Enfoque metodológico",
        strategy: "Ej: Estrategia de implementación",
        tactics: "Ej: Tácticas específicas",
        execution: "Ej: Plan de ejecución",
        review: "Ej: Proceso de revisión"
    },
    'power': {
        problem: "Ej: Tiempo de carga lento del sitio web",
        opportunities: "Ej: Mejora en conversiones y retención",
        why: "Ej: Cada segundo de retraso reduce conversiones un 7%",
        execution: "Ej: Plan de optimización de 3 semanas",
        resources: "Ej: Especialista en rendimiento y presupuesto para CDN"
    },
    'logic': {
        layout: "Ej: Estructura del sistema",
        objective: "Ej: Objetivo principal",
        guidelines: "Ej: Directrices técnicas",
        implementation: "Ej: Plan de implementación",
        criteria: "Ej: Criterios de éxito"
    },
    'scope': {
        situation: "Ej: Situación actual",
        core_need: "Ej: Necesidad principal",
        obstacles: "Ej: Obstáculos identificados",
        plan: "Ej: Plan de acción",
        evaluation: "Ej: Criterios de evaluación"
    },
    'focus': {
        frame: "Ej: Marco del proyecto",
        objective: "Ej: Objetivo principal",
        constraints: "Ej: Limitaciones",
        understanding: "Ej: Comprensión del problema",
        solution: "Ej: Solución propuesta"
    },
    'expert': {
        expertise: "Ej: Conocimientos requeridos",
        context: "Ej: Contexto del proyecto",
        purpose: "Ej: Propósito principal",
        execution: "Ej: Plan de ejecución",
        results: "Ej: Resultados esperados",
        testing: "Ej: Plan de pruebas"
    },
    'clarity': {
        context: "Ej: Contexto del proyecto",
        limitations: "Ej: Limitaciones técnicas",
        approach: "Ej: Enfoque metodológico",
        requirements: "Ej: Requisitos específicos",
        implementation: "Ej: Plan de implementación",
        timeline: "Ej: Cronograma detallado",
        performance: "Ej: Beneficios esperados"
    },
    'guide': {
        goal: "Ej: Objetivo principal",
        user: "Ej: Usuario objetivo",
        implementation: "Ej: Plan de implementación",
        delivery: "Ej: Entrega de resultados",
        evaluation: "Ej: Evaluación de resultados"
    },
    'path': {
        purpose: "Ej: Propósito del proyecto",
        approach: "Ej: Enfoque metodológico",
        target: "Ej: Objetivo específico",
        horizon: "Ej: Plazo de entrega"
    },
    'learn': {
        level: "Ej: Nivel de complejidad",
        experience: "Ej: Experiencia previa",
        approach: "Ej: Enfoque de aprendizaje",
        resources: "Ej: Recursos disponibles",
        next_steps: "Ej: Próximos pasos"
    },
    'solve': {
        situation: "Ej: Situación actual",
        options: "Ej: Alternativas disponibles",
        limitations: "Ej: Limitaciones identificadas",
        verification: "Ej: Verificación de soluciones",
        execution: "Ej: Plan de ejecución"
    },
    'prime': {
        problem: "Ej: Problema a resolver",
        research: "Ej: Investigación previa",
        implementation: "Ej: Plan de implementación",
        monitoring: "Ej: Monitoreo de resultados",
        evaluation: "Ej: Evaluación de resultados"
    },
    'adapt': {
        analyze: "Ej: Análisis de la situación",
        design: "Ej: Diseño de la solución",
        approach: "Ej: Enfoque de implementación",
        progress: "Ej: Monitoreo del progreso",
        testing: "Ej: Pruebas de la solución"
    },
    'build': {
        base: "Ej: Línea base del proyecto",
        understanding: "Ej: Comprensión del problema",
        implementation: "Ej: Plan de implementación",
        learning: "Ej: Aprendizaje durante el proyecto",
        delivery: "Ej: Entrega de resultados"
    },
    'craft': {
        context: "Ej: Contexto del proyecto",
        requirements: "Ej: Requisitos específicos",
        approach: "Ej: Enfoque de implementación",
        features: "Ej: Características de la solución",
        testing: "Ej: Pruebas de la solución"
    },
    'scale': {
        strategy: "Ej: Estrategia de escalabilidad",
        capabilities: "Ej: Capacidades del equipo",
        action: "Ej: Plan de acción",
        learning: "Ej: Aprendizaje durante el proyecto",
        evolution: "Ej: Evolución del proyecto"
    },
    'think': {
        topic: "Ej: Tema de investigación",
        history: "Ej: Historia del tema",
        insights: "Ej: Conocimientos adquiridos",
        next_steps: "Ej: Próximos pasos",
        knowledge: "Ej: Conocimientos aplicados"
    },
    'quest': {
        question: "Ej: Pregunta de investigación",
        understanding: "Ej: Comprensión del tema",
        exploration: "Ej: Exploración de alternativas",
        solution: "Ej: Solución propuesta",
        testing: "Ej: Pruebas de la solución"
    },
    'drive': {
        direction: "Ej: Dirección del proyecto",
        resources: "Ej: Recursos disponibles",
        implementation: "Ej: Plan de implementación",
        validation: "Ej: Validación de resultados",
        evolution: "Ej: Evolución del proyecto"
    },
    'shape': {
        situation: "Ej: Situación actual",
        history: "Ej: Historia del proyecto",
        analyze: "Ej: Análisis de la situación",
        plan: "Ej: Plan de acción",
        execution: "Ej: Plan de ejecución"
    },
    'reach': {
        requirements: "Ej: Requisitos específicos",
        evaluation: "Ej: Evaluación de resultados",
        approach: "Ej: Enfoque de implementación",
        completeness: "Ej: Finalización del proyecto",
        handover: "Ej: Entrega de resultados"
    },
    'blend': {
        base: "Ej: Línea base del proyecto",
        learning: "Ej: Aprendizaje durante el proyecto",
        evolution: "Ej: Evolución del proyecto",
        navigation: "Ej: Navegación del proyecto",
        delivery: "Ej: Entrega de resultados"
    },
    'spark': {
        strategy: "Ej: Estrategia del proyecto",
        planning: "Ej: Planificación del proyecto",
        action: "Ej: Plan de acción",
        results: "Ej: Resultados esperados",
        knowledge: "Ej: Conocimientos aplicados"
    },
    'pulse': {
        purpose: "Ej: Optimización de procesos",
        understanding: "Ej: Análisis de flujos actuales",
        learning: "Ej: Mejores prácticas del sector",
        strategy: "Ej: Plan de implementación ágil",
        evaluation: "Ej: KPIs de rendimiento"
    },
    'daci': {
        driver: "Ej: Líder técnico del proyecto",
        approver: "Ej: Comité de arquitectura",
        contributor: "Ej: Desarrolladores e ingenieros DevOps",
        informed: "Ej: Equipos de soporte y operaciones"
    },
    'raci': {
        responsable: "Ej: Desarrollador senior",
        accountable: "Ej: Gerente de proyecto",
        consultado: "Ej: Arquitecto de sistemas y usuario clave",
        informed: "Ej: Equipo de gestión y stakeholders"
    },
    'heart': {
        felicidad: "Ej: Encuestas de satisfacción NPS",
        compromiso: "Ej: Sesiones por usuario/mes",
        adopcion: "Ej: Activaciones de nuevas funciones",
        retencion: "Ej: Usuarios activos recurrentes",
        exito_en_tareas: "Ej: Tasa de conversión en funnel"
    },
    'mece': {
        mutuamente_exclusivo: "Ej: Segmentación de usuarios por rangos de edad no superpuestos",
        colectivamente_exhaustivo: "Ej: Cobertura de todos los posibles grupos de edad"
    },
    'ooda': {
        observar: "Ej: Monitoreo de métricas de sistema en tiempo real",
        orientar: "Ej: Análisis de patrones y comportamientos anómalos",
        decidir: "Ej: Selección de estrategia de mitigación",
        actuar: "Ej: Implementación de solución y ajustes"
    },
    'pdca': {
        planificar: "Ej: Diseñar proceso de CI/CD",
        hacer: "Ej: Implementar la infraestructura y flujos",
        verificar: "Ej: Medir tiempos de despliegue y fallos",
        actuar: "Ej: Optimizar cuellos de botella identificados"
    },
    'vmost': {
        vision: "Ej: Plataforma líder en procesamiento de datos",
        mission: "Ej: Ofrecer insights accionables en tiempo real",
        objectives: "Ej: Reducir latencia en un 50% en 6 meses",
        strategy: "Ej: Migración a arquitectura distribuida",
        tactica: "Ej: Implementar procesamiento en Edge"
    },
    'swot': {
        fortalezas: "Ej: Equipo técnico especializado, infraestructura robusta",
        debilidades: "Ej: Procesos manuales, deuda técnica acumulada",
        oportunidades: "Ej: Nuevas tecnologías disponibles, mercado en expansión",
        amenazas: "Ej: Competidores innovadores, regulaciones cambiantes"
    },
    'adkar': {
        awareness: "Ej: Comunicar razón para migrar a metodologías ágiles",
        desire: "Ej: Involucrar equipos en el diseño del nuevo proceso",
        knowledge: "Ej: Capacitación en Scrum y herramientas asociadas",
        ability: "Ej: Coaching y práctica guiada en primeros sprints",
        reinforcement: "Ej: Reconocimiento de mejoras y ajustes continuos"
    },
    'okr': {
        objectives: "Ej: Crear la mejor experiencia de usuario en nuestra categoría",
        key_results: "Ej: Aumentar NPS de 30 a 60, reducir tiempo de carga a <2s, incrementar retención en un 20%"
    },
    '5w2h': {
        what: "Ej: Implementación de un sistema de monitoreo en tiempo real",
        why: "Ej: Para detectar y responder proactivamente a incidentes",
        where: "Ej: En los servidores de producción y pre-producción",
        when: "Ej: Durante el próximo mes, con despliegue final el 15 de octubre",
        who: "Ej: Equipo de DevOps con apoyo del equipo de Seguridad",
        how: "Ej: Utilizando Prometheus y Grafana con alertas automatizadas",
        how_much: "Ej: Presupuesto de 20K para licencias y 15 días/persona de trabajo"
    },
    '6m': {
        man: "Ej: Falta de capacitación en nuevas herramientas",
        machine: "Ej: Servidores sobrecargados en horas pico",
        material: "Ej: Datos de entrada inconsistentes o corruptos",
        method: "Ej: Proceso de validación insuficiente",
        measurement: "Ej: Métricas imprecisas de rendimiento",
        mother_nature: "Ej: Interferencias de red en ciertas ubicaciones"
    },
    '4p': {
        product: "Ej: Plataforma SaaS de análisis de datos con IA integrada",
        price: "Ej: Modelo freemium con niveles premium por volumen de datos",
        place: "Ej: Distribución directa vía web y marketplace de integraciones",
        promotion: "Ej: Marketing de contenidos técnicos y demostraciones en vivo"
    },
    'rice': {
        reach: "Ej: 10.000 usuarios mensuales",
        impact: "Ej: 3 de 5 en escala definida",
        confidence: "Ej: 80%",
        effort: "Ej: 5 persona-semanas"
    },
    'ice': {
        impact: "Ej: 8/10 - Mejora significativa en retención",
        confidence: "Ej: 7/10 - Basado en datos de pruebas A/B previas",
        ease: "Ej: 6/10 - Implementación moderadamente compleja"
    },
    'rasci': {
        responsable: 'Quién es responsable de ejecutar la tarea',
        accountable: 'Quién rinde cuentas por el éxito/fracaso',
        supportive: 'Quién brinda recursos o apoyo',
        consulted: 'Quién debe ser consultado antes de tomar decisiones',
        informed: 'Quién debe ser informado después de tomar decisiones'
    },
    'scqa': {
        situation: 'La situación actual',
        complication: 'El problema o complicación que ha surgido',
        question: 'La pregunta clave que debemos responder',
        answer: 'La respuesta o solución propuesta'
    },
    'soar': {
        strengths: 'Fortalezas actuales',
        opportunities: 'Oportunidades disponibles',
        aspirations: 'Aspiraciones y metas deseadas',
        results: 'Resultados medibles que se buscan'
    },
    'cft': {
        context: 'El contexto o antecedentes de la situación',
        framing: 'El encuadre o perspectiva a considerar',
        task: 'La tarea específica a realizar'
    },
    'tar': {
        task: 'La tarea o responsabilidad asignada',
        action: 'Las acciones específicas que se tomaron',
        result: 'El resultado o impacto de las acciones'
    },
    'pace2': {
        problem: 'El problema que debe abordarse',
        analysis: 'Análisis detallado del problema',
        conclusion: 'Conclusiones derivadas del análisis',
        execution: 'Plan de ejecución para implementar la solución'
    },
    'fab': {
        features: 'Características o elementos técnicos',
        advantages: 'Ventajas comparativas',
        benefits: 'Beneficios para el usuario o cliente'
    },
    'aor': {
        action: 'Acción que fue tomada',
        outcome: 'Resultado obtenido',
        reflection: 'Reflexión sobre lo aprendido'
    },
    'spqa': {
        situation: 'La situación o contexto actual',
        problem: 'El problema específico a resolver',
        question: 'La pregunta central que debe responderse',
        answer: 'La respuesta o solución propuesta'
    },
    'sara': {
        situation: 'La situación o contexto actual',
        analysis: 'Análisis de la situación',
        recommendation: 'Recomendación basada en el análisis',
        action: 'Acciones específicas a tomar'
    },
    'gear': {
        goal: 'El objetivo principal a lograr',
        expectation: 'Las expectativas específicas',
        approach: 'El enfoque o método a utilizar',
        result: 'El resultado esperado'
    },
    'bridge': {
        background: 'Antecedentes o contexto de la situación',
        requirement: 'Requisitos o necesidades a satisfacer',
        insight: 'Insights o descubrimientos clave',
        decision: 'Decisión tomada basada en los insights',
        guidance: 'Orientación o directrices para la implementación',
        execution: 'Plan de ejecución'
    },
    'clear': {
        challenge: 'El desafío o problema a abordar',
        location: 'Dónde se encuentra o se manifiesta el desafío',
        exposure: 'Quién está expuesto al desafío y cómo',
        action: 'Acciones para abordar el desafío',
        result: 'Resultados esperados después de la acción'
    }
};

// Function definitions
async function generatePrompt() {
    const activeCard = document.querySelector('.framework-card.active');
    if (!activeCard) {
        showAnnouncement('Aviso', 'Por favor, selecciona un framework primero');
        return;
    }

    const framework = activeCard.dataset.framework;
    const formData = {};
    let hasEmptyFields = false;
    
    // Recolectar datos del formulario y validar campos vacíos
    document.querySelectorAll('#form-fields textarea').forEach(textarea => {
        if (!textarea.value.trim()) {
            hasEmptyFields = true;
        }
        formData[textarea.id] = textarea.value.trim();
    });

    if (hasEmptyFields) {
        showAnnouncement('Aviso', 'Por favor, completa todos los campos del formulario');
        return;
    }

    const generateBtn = document.getElementById('generate-btn');
    generateBtn.classList.add('btn-loading');
    generateBtn.disabled = true;

    try {
        const requestData = {
            frameworks: [framework],
            formData: formData,
            isCombined: false
        };
        console.log('DEBUG - Datos a enviar:', requestData);

        const response = await fetch('/api/generate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                frameworks: [framework],
                formData: formData,
                isCombined: false
            })
        });

        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.error || 'Error al generar el prompt');
        }

        if (data.success) {
            const promptPreview = document.getElementById('prompt-preview');
            // Display the formatted prompt with HTML instead of plain text
            promptPreview.innerHTML = marked.parse(data.prompt);
            
            // Store the raw text version for copying as plain markdown
            promptPreview.setAttribute('data-raw-prompt', data.raw_prompt);
            
            updateTokenCount();
            
            // Actualizar información de uso
            updateUsageInfoFromResponse(data);
        } else {
            throw new Error(data.error);
        }
    } catch (error) {
        console.error('Error en generatePrompt:', error);
        showAnnouncement('Error', error.message);
    } finally {
        generateBtn.classList.remove('btn-loading');
        generateBtn.disabled = false;
    }
}

// Función para actualizar el conteo de tokens
async function updateTokenCount() {
    const promptText = document.getElementById('prompt-preview').textContent;
    if (!promptText) return;

    try {
        const response = await fetch('/api/count-tokens', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ text: promptText })
        });

        const data = await response.json();
        if (data.success) {
            document.getElementById('token-count').textContent = data.count;
        }
    } catch (error) {
        console.error('Error al contar tokens:', error);
    }
}

// Función para mostrar anuncios en modal
function showAnnouncement(title, message) {
    const modal = document.getElementById('announcementModal');
    const titleElement = document.getElementById('announcementTitle');
    const messageElement = document.getElementById('announcementMessage');
    
    titleElement.textContent = title;
    messageElement.textContent = message;
    
    const modalInstance = new bootstrap.Modal(modal);
    modalInstance.show();
}

// Reemplazar los alerts existentes
function copyPrompt() {
    const copyBtn = document.getElementById('copy-btn');
    const promptPreview = document.getElementById('prompt-preview');
    
    if (!promptPreview.textContent) {
        showAnnouncement('Aviso', 'Por favor, genera un prompt primero');
        return;
    }

    try {
        copyBtn.classList.add('btn-loading');
        copyBtn.disabled = true;

        navigator.clipboard.writeText(promptPreview.textContent)
            .then(() => {
                // Cambiar el estado del botón
                copyBtn.classList.add('copied');
                copyBtn.innerHTML = '<i class="bi bi-check"></i> Copiado';
                
                // Mostrar el modal
                const copyModal = new bootstrap.Modal(document.getElementById('copyModal'));
                copyModal.show();
                
                // Restaurar el botón después de 2 segundos
                setTimeout(() => {
                    copyBtn.classList.remove('copied');
                    copyBtn.innerHTML = '<i class="bi bi-clipboard"></i> Copiar Prompt';
                }, 2000);
                
                // Cerrar el modal después de 1.5 segundos
                setTimeout(() => {
                    copyModal.hide();
                }, 1500);
            })
            .catch(error => {
                console.error('Error al copiar:', error);
                showAnnouncement('Error', 'Error al copiar el prompt');
            })
            .finally(() => {
                copyBtn.classList.remove('btn-loading');
                copyBtn.disabled = false;
            });
    } catch (error) {
        showAnnouncement('Error', 'Error al copiar el prompt: ' + error.message);
        copyBtn.classList.remove('btn-loading');
        copyBtn.disabled = false;
    }
}

function updateSelectedFrameworksList() {
    const selectedFrameworksContainer = document.getElementById('selected-frameworks');
    const listContainer = selectedFrameworksContainer.querySelector('.selected-frameworks-list');
    const combinationForm = document.getElementById('combination-form');
    const formFields = document.getElementById('form-fields');

    if (selectedFrameworks.length > 0) {
        selectedFrameworksContainer.classList.remove('d-none');
        listContainer.innerHTML = selectedFrameworks.map(framework => 
            `<span class="badge bg-primary me-2 mb-2">${framework.toUpperCase()}</span>`
        ).join('');

        if (selectedFrameworks.length > 1) {
            combinationForm.classList.remove('d-none');
            formFields.classList.add('d-none');
        } else {
            combinationForm.classList.add('d-none');
            formFields.classList.remove('d-none');
            updateFormFields(selectedFrameworks[0]);
        }
    } else {
        selectedFrameworksContainer.classList.add('d-none');
        combinationForm.classList.add('d-none');
        formFields.classList.remove('d-none');
        formFields.innerHTML = '<p class="text-center text-muted">Selecciona un framework para comenzar</p>';
    }
}

function searchFramework() {
    const searchBtn = document.getElementById('search-btn');
    const searchInput = document.getElementById('framework-search');
    const recommendationContainer = document.getElementById('recommendation-container');
    const recommendedFramework = document.getElementById('recommended-framework');
    const recommendationReason = document.getElementById('recommendation-reason');
    const recommendationExample = document.getElementById('recommendation-example');

    if (!searchInput.value.trim()) {
        alert('Por favor, ingresa tu objetivo');
        return;
    }

    // Limpiar el prompt anterior
    document.getElementById('prompt-preview').textContent = '';
    document.getElementById('token-count').textContent = '0';
    
    searchBtn.classList.add('btn-loading');
    searchBtn.disabled = true;

    fetch('/api/recommend-framework', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            objective: searchInput.value
        })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Error en la respuesta del servidor');
        }
        return response.json();
    })
    .then(data => {
        if (data.success) {
            try {
                const recommendationText = data.recommendation;
                
                // Extraer el framework usando expresiones regulares
                const frameworkMatch = recommendationText.match(/FRAMEWORK:\s*([^\n]+)/i);
                const framework = frameworkMatch ? frameworkMatch[1].trim() : "No disponible";
                
                // Extraer la explicación
                const reasonStart = recommendationText.indexOf('¿Por qué este framework?');
                const exampleStart = recommendationText.indexOf('Ejemplo de uso:');
                
                let reason = "No disponible";
                if (reasonStart !== -1 && exampleStart !== -1) {
                    reason = recommendationText.substring(
                        reasonStart + '¿Por qué este framework?'.length, 
                        exampleStart
                    ).trim();
                }
                
                // Extraer el ejemplo
                let example = "No disponible";
                if (exampleStart !== -1) {
                    example = recommendationText.substring(exampleStart + 'Ejemplo de uso:'.length).trim();
                }
                
                // Actualizar la interfaz
                recommendedFramework.textContent = framework;
                recommendationReason.textContent = reason;
                
                // Aplicar formato especial si es PEAS y contiene P:, E:, A:, S:
                if (framework.toLowerCase() === 'peas' && example.includes('P:') && example.includes('A:')) {
                    // Formatear el ejemplo PEAS para mejorar la visualización
                    let formattedExample = example
                        .replace(/P:/g, '<strong class="text-primary">P:</strong>')
                        .replace(/E:/g, '<strong class="text-success">E:</strong>')
                        .replace(/A:/g, '<strong class="text-danger">A:</strong>')
                        .replace(/S:/g, '<strong class="text-info">S:</strong>')
                        .replace(/(\d+\.)/g, '<strong>$1</strong>') // Números en negrita
                        .replace(/\n\n/g, '<br><br>') // Respetar saltos de línea dobles
                        .replace(/\n([^<])/g, '<br>$1'); // Saltos de línea simples
                    
                    recommendationExample.innerHTML = formattedExample;
                } else {
                    // Usar marked para otro contenido markdown
                    try {
                        if (typeof marked !== 'undefined') {
                            recommendationExample.innerHTML = marked.parse(example);
                        } else {
                            // Formateo básico si marked no está disponible
                            const formattedExample = example
                                .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') // Negrita
                                .replace(/\n/g, '<br>'); // Saltos de línea
                            recommendationExample.innerHTML = formattedExample;
                        }
                    } catch (markdownError) {
                        console.error("Error al formatear markdown:", markdownError);
                        recommendationExample.textContent = example;
                    }
                }
                
                recommendationContainer.classList.remove('d-none');
                
                // Highlight recommended framework card
                document.querySelectorAll('.framework-card').forEach(card => {
                    card.classList.remove('recommended');
                });
                
                // Buscar el nombre del framework sin mayúsculas
                const frameworkLower = framework.toLowerCase();
                const recommendedCard = document.querySelector(`.framework-card[data-framework="${frameworkLower}"]`);
                if (recommendedCard) {
                    recommendedCard.classList.add('recommended');
                    recommendedCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }
                
                // Actualizar información de uso
                updateUsageInfoFromResponse(data);
            } catch (e) {
                console.error("Error al procesar la recomendación:", e);
                alert("Error al procesar la recomendación: " + e.message);
            }
        } else {
            throw new Error(data.error || 'Error al obtener la recomendación');
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Error al buscar framework: ' + error.message);
    })
    .finally(() => {
        searchBtn.classList.remove('btn-loading');
        searchBtn.disabled = false;
    });
}

// Reemplazar la función showFrameworkExample completa con esta versión corregida
function showFrameworkExample(framework) {
    const exampleModal = document.getElementById('exampleModal');
    const modalTitle = document.getElementById('exampleModalLabel');
    const exampleContent = document.getElementById('framework-example');
    const btn = document.querySelector(`.view-example-btn[data-framework="${framework}"]`);
    
    if (!btn) {
        console.error(`Botón no encontrado para framework: ${framework}`);
        return;
    }
    
    btn.classList.add('btn-loading');
    btn.disabled = true;

    // Crear un mapa para relacionar el nombre corto del framework con el nombre completo del archivo
    const frameworkMap = {
        'rtf': 'RTF-Rol-Tarea-Formato',
        'para': 'PARA-Problema-Aproximacion-Razon-Accion',
        'smart': 'SMART-Especifico-Medible-Alcanzable-Relevante-Temporal',
        'erq': 'ERQ-Experiencia-Requisitos-Cualificaciones',
        'code': 'CODE-Contexto-Objetivo-Detalles-Ejemplos',
        'pros': 'PROS-Perspectiva-Requisitos-Resultado-Solucion',
        'team': 'TEAM-Tarea-Entorno-Aproximacion-Metricas',
        'idea': 'IDEA-Identificar-Definir-Ejecutar-Analizar',
        'care': 'CARE-Contexto-Accion-Resultado-Ejemplo',
        'rise': 'RISE-Relevancia-Informacion-Solucion-Evaluacion',
        'logic': 'LOGIC-Diseno-Objetivo-Directrices-Implementacion-Criterios',
        'scope': 'SCOPE-Situacion-Necesidad-Obstaculos-Plan-Evaluacion',
        'focus': 'FOCUS-Marco-Objetivo-Restricciones-Comprension-Solucion',
        'clarity': 'CLARITY-Contexto-Limitaciones-Aproximacion-Requisitos-Implementacion-Cronograma-Rendimiento',
        'expert': 'EXPERT-Experiencia-Contexto-Proposito-Ejecucion-Resultados-Pruebas',
        'guide': 'GUIDE-Meta-Usuario-Implementacion-Entrega-Evaluacion',
        'path': 'PATH-Proposito-Aproximacion-Objetivo-Horizonte',
        'learn': 'LEARN-Nivel-Experiencia-Aproximacion-Recursos-SiguientesPasos',
        'solve': 'SOLVE-Situacion-Opciones-Limitaciones-Verificacion-Ejecucion',
        'prime': 'PRIME-Problema-Investigacion-Implementacion-Monitoreo-Evaluacion',
        'adapt': 'ADAPT-Analisis-Diseno-Aproximacion-Progreso-Pruebas',
        'build': 'BUILD-LineaBase-Entendimiento-Implementacion-Aprendizaje-Entrega',
        'craft': 'CRAFT-Contexto-Requisitos-Aproximacion-Funcionalidades-Pruebas',
        'scale': 'SCALE-Estrategia-Capacidades-Accion-Aprendizaje-Evolucion',
        'think': 'THINK-Tema-Historia-Insights-SiguientesPasos-Conocimiento',
        'grow': 'GROW-Meta-Realidad-Opciones-Camino',
        'quest': 'QUEST-Pregunta-Entendimiento-Exploracion-Solucion-Pruebas',
        'drive': 'DRIVE-Direccion-Recursos-Implementacion-Validacion-Evolucion',
        'shape': 'SHAPE-Situacion-Historia-Analisis-Plan-Ejecucion',
        'reach': 'REACH-Requisitos-Evaluacion-Aproximacion-Completitud-Handover',
        'blend': 'BLEND-Base-Aprendizaje-Evolucion-Navegacion-Entrega',
        'spark': 'SPARK-Estrategia-Planificacion-Accion-Resultados-Conocimiento',
        'pulse': 'PULSE-Proposito-Entendimiento-Aprendizaje-Estrategia-Evaluacion',
        'fast': 'FAST-Enfoque-Audiencia-Alcance-Tono',
        'bab': 'BAB-Antes-Despues-Puente',
        'peas': 'PEAS-Proposito-Resultado-Audiencia-Estilo',
        'star': 'STAR-Situacion-Tarea-Accion-Resultado',
        'qcqa': 'QCQA-Pregunta-Contexto-Calificacion-Formato',
        'aida': 'AIDA-Atencion-Interes-Deseo-Accion',
        'leap': 'LEAP-Nivel-Expectativas-Aproximacion-Parametros',
        'spin': 'SPIN-Situacion-Problema-Implicacion-Necesidad',
        'design': 'DESIGN-Definir-Explorar-Alcance-Idear-Guiar-Reducir',
        'vision': 'VISION-Visualizar-Identificar-Estructurar-Implementar-Optimizar-Navegar',
        'impact': 'IMPACT-Intencion-Mensaje-Proposito-Audiencia-Canal-Tiempo',
        'master': 'MASTER-Mision-Aproximacion-Estrategia-Tacticas-Ejecucion-Revision',
        'power': 'POWER-Problema-Resultado-PorQue-Ejecucion-Recursos',
        'daci': 'DACI-Driver-Approver-Contributor-Informed',
        'raci': 'RACI-Responsable-Accountable-Consultado-Informado',
        'heart': 'HEART-Felicidad-Compromiso-Adopcion-Retencion-Exitoentareas',
        'mece': 'MECE-MutuamenteExclusivo-ColectivamenteExhaustivo',
        'ooda': 'OODA-Observar-Orientar-Decidir-Actuar',
        'pdca': 'PDCA-Planificar-Hacer-Verificar-Actuar',
        'vmost': 'VMOST-Vision-Mision-Objetivos-Estrategia-Tactica',
        'swot': 'SWOT-Fortalezas-Debilidades-Oportunidades-Amenazas',
        'adkar': 'ADKAR-Awareness-Desire-Knowledge-Ability-Reinforcement',
        'okr': 'OKR-Objectives-KeyResults',
        '5w2h': '5W2H-What-Why-Where-When-Who-How-Howmuch',
        '6m': '6M-Man-Machine-Material-Method-Measurement-MotherNature',
        '4p': '4P-Product-Price-Place-Promotion',
        'rice': 'RICE-Reach-Impact-Confidence-Effort',
        'ice': 'ICE-Impact-Confidence-Ease',
        'rasci': 'RASCI-Responsible-Accountable-Supportive-Consulted-Informed',
        'scqa': 'SCQA-Situacion-Complicacion-Pregunta-Respuesta',
        'soar': 'SOAR-Fortalezas-Oportunidades-Aspiraciones-Resultados',
        'cft': 'CFT-Contexto-Foco-Transformacion',
        'tar': 'TAR-Disparador-Accion-Resultado',
        'pace2': 'PACE2-ObjetivoPrincipal-Alternativas-Consecuencias-Entorno',
        'fab': 'FAB-Caracteristicas-Ventajas-Beneficios',
        'aor': 'AOR-Accion-Resultado-Reflexion',
        'spqa': 'SPQA-Situacion-Problema-Pregunta-Respuesta',
        'sara': 'SARA-Shock-Enojo-Resistencia-Aceptacion',
        'gear': 'GEAR-Meta-Ejecutar-Evaluar-Reflexionar',
        'bridge': 'BRIDGE-Antecedentes-Razon-Informacion-Decision-Meta-Evaluacion',
        'clear': 'CLEAR-Conectar-Escuchar-Explorar-Accion-Reflexionar',
        'epic': 'EPIC-Expectativa-Plan-Implementacion-Completacion',
        'glide': 'GLIDE-Meta-Limitaciones-Implementacion-Desarrollo-Evaluacion',
        'grit': 'GRIT-Meta-Recursos-Impedimentos-Tiempo',
        'pivot': 'PIVOT-Problema-Investigacion-Verificacion-Oportunidad-Transformacion',
        'agile': 'AGILE-Adaptable-Orientado-Iterativo-Ligero-Eficiente',
        'bolt': 'BOLT-Negocio-Operaciones-Legal-Tecnico',
        'faster': 'FASTER-Enfoque-Analisis-Solucion-Prueba-Evaluacion-Refinamiento',
        'flow': 'FLOW-Enfoque-Limites-Resultados-Trabajo',
        'lift': 'LIFT-Aprendizaje-Implementacion-Retroalimentacion-Transformacion',
        'pace': 'PACE-Proposito-Audiencia-Contenido-Expresion',
        'paths': 'PATHS-Problema-Alternativas-Compensaciones-Hipotesis-Solucion',
        'seed': 'SEED-Situacion-Expectativa-Ejecucion-Entrega',
        'shift': 'SHIFT-Situacion-Obstaculos-Innovacion-Marco-Transicion',
        'smarter': 'SMARTER-Especifico-Medible-Alcanzable-Relevante-Temporal-Evaluar-Reevaluar',
        'value': 'VALUE-Vision-Aproximacion-Aprovechamiento-Comprension-Ejecucion',
        'create': 'CREATE-Contexto-Requisitos-Ejemplos-Alternativas-Pruebas-Evaluacion',
        'tag': 'TAG-Tarea-Accion-Meta'
    };

    // Obtener el nombre completo del archivo
    let frameworkFileName = frameworkMap[framework.toLowerCase()];
    
    // Si no se encuentra el framework en el mapa, usar directamente el nombre en mayúsculas
    if (!frameworkFileName) {
        frameworkFileName = framework.toUpperCase();
    }
    
    exampleContent.innerHTML = `
        <div class="d-flex justify-content-center">
            <div class="spinner-border text-primary" role="status">
                <span class="visually-hidden">Cargando...</span>
            </div>
        </div>
        <p class="text-center">Cargando información del framework...</p>
    `;

    // Actualizar el título del modal
    modalTitle.textContent = framework.toUpperCase();
    
    // Mostrar el modal
    new bootstrap.Modal(exampleModal).show();

    console.log(`Intentando cargar: /static/frameworks/prompt-frameworks/${frameworkFileName}.txt`);
    
    // Cargar directamente el archivo txt desde la carpeta estática
    fetch(`/static/frameworks/prompt-frameworks/${frameworkFileName}.txt`)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Error al cargar el framework: ${response.status} ${response.statusText}`);
            }
            return response.text();
        })
        .then(text => {
            // Almacenar el texto sin formato como atributo para poder copiarlo después
            exampleContent.setAttribute('data-raw-example', text);
            
            // Formatear el contenido y mostrarlo
            exampleContent.innerHTML = marked.parse(text);
            console.log(`Framework cargado exitosamente: ${frameworkFileName}`);
        })
        .catch(error => {
            console.error('Error:', error);
            console.error('Framework solicitado:', frameworkFileName);
            
            // Intentar con otra ruta alternativa
            console.log(`Intentando ruta alternativa: frameworks/prompt-frameworks/${frameworkFileName}.txt`);
            
            fetch(`frameworks/prompt-frameworks/${frameworkFileName}.txt`)
                .then(response => {
                    if (!response.ok) {
                        throw new Error(`Error en ruta alternativa: ${response.status} ${response.statusText}`);
                    }
                    return response.text();
                })
                .then(text => {
                    exampleContent.setAttribute('data-raw-example', text);
                    exampleContent.innerHTML = marked.parse(text);
                    console.log(`Framework cargado exitosamente con ruta alternativa: ${frameworkFileName}`);
                })
                .catch(secondError => {
                    console.error('Error en ruta alternativa:', secondError);
            exampleContent.innerHTML = `
                <div class="alert alert-danger" role="alert">
                    <i class="bi bi-exclamation-triangle-fill me-2"></i>
                    Error al cargar la información del framework. Por favor, inténtalo de nuevo.
                </div>
                        <p class="text-center">Framework solicitado: ${frameworkFileName || framework}.txt</p>
                        <p class="text-center text-muted">Detalles del error: ${error.message}</p>
            `;
                });
        })
        .finally(() => {
            btn.classList.remove('btn-loading');
            btn.disabled = false;
        });
}

function updateFormFields(framework) {
    const formContainer = document.getElementById('form-fields');
    formContainer.innerHTML = '';

    if (!framework) {
        formContainer.innerHTML = '<p class="text-center text-muted">Selecciona un framework para comenzar</p>';
        return;
    }

    const fields = frameworks[framework.toLowerCase()];
    if (!fields) {
        console.error(`Framework '${framework}' no encontrado`);
        return;
    }

    fields.forEach(field => {
        const div = document.createElement('div');
        div.className = 'mb-3';
        div.innerHTML = `
            <label for="${field}" class="form-label text-capitalize">${fieldTranslations[field] || field}</label>
            <textarea 
                class="form-control" 
                id="${field}" 
                rows="3" 
                placeholder="${getFieldPlaceholder(framework, field)}"
            ></textarea>
        `;
        formContainer.appendChild(div);
    });
}

// Función para obtener placeholders
function getFieldPlaceholder(framework, field) {
    return frameworkPlaceholders[framework]?.[field] || `Ingresa ${field.toLowerCase()}...`;
}

// Función para copiar texto en Markdown
async function copyMarkdown() {
    const promptPreview = document.getElementById('prompt-preview');
    // Get the raw markdown version from the data attribute
    const promptText = promptPreview.getAttribute('data-raw-prompt') || promptPreview.textContent;
    
    try {
        // Asegurar que copiamos el texto con formato markdown (headings, bold, etc.)
        let markdownText = promptText;
        
        // Añadir formato a headings si no lo tienen ya (# para títulos, ## para subtítulos)
        markdownText = markdownText.replace(/^([A-Z][^:]+):\s*(.+)$/gm, function(match, p1, p2) {
            // Si la línea parece un título o subtítulo pero no tiene #, añadirlos
            if (p1.length < 25) { // Probablemente un título/encabezado si es corto
                return `## ${p1}\n\n${p2}`;
            }
            return match;
        });
        
        // Asegurar que los elementos en negrita permanecen con formato markdown
        markdownText = markdownText.replace(/\*\*([^*]+)\*\*/g, '**$1**');
        
        // Método alternativo de copiado
        const textArea = document.createElement('textarea');
        textArea.value = markdownText;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        
        showCopyConfirmation('¡Markdown copiado!');
    } catch (err) {
        console.error('Error al copiar markdown:', err);
        // Intenta el método alternativo si el primero falla
        try {
            await navigator.clipboard.writeText(promptText);
            showCopyConfirmation('¡Markdown copiado!');
        } catch (err2) {
            showAnnouncement('Error', 'No se pudo copiar el texto');
        }
    }
}

// Función para copiar texto formateado
async function copyFormatted() {
    const promptPreview = document.getElementById('prompt-preview');
    
    try {
        // Usar directamente el contenido ya formateado en HTML
        const htmlContent = promptPreview.innerHTML;
        
        // Crear elemento temporal y añadir estilos básicos
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = htmlContent;
        tempDiv.style.cssText = 'position: fixed; left: -9999px; top: 0;';
        document.body.appendChild(tempDiv);

        // Seleccionar el contenido
        const range = document.createRange();
        range.selectNode(tempDiv);
        window.getSelection().removeAllRanges();
        window.getSelection().addRange(range);

        // Copiar
        document.execCommand('copy');
        
        // Limpiar
        window.getSelection().removeAllRanges();
        document.body.removeChild(tempDiv);
        
        showCopyConfirmation('¡Texto formateado copiado!');
    } catch (err) {
        console.error('Error al copiar texto formateado:', err);
        // Intenta copiar al menos el texto plano si falla el formato
        try {
            // Get raw text as fallback
            const plainText = promptPreview.getAttribute('data-raw-prompt') || promptPreview.textContent;
            await navigator.clipboard.writeText(plainText);
            showCopyConfirmation('¡Texto copiado (sin formato)!');
        } catch (err2) {
            showAnnouncement('Error', 'No se pudo copiar el texto formateado');
        }
    }
}

// Función para mostrar confirmación de copiado
function showCopyConfirmation(message) {
    const modal = document.getElementById('copyModal');
    const modalInstance = new bootstrap.Modal(modal);
    modal.querySelector('.modal-body p').textContent = message;
    modalInstance.show();
    
    // Auto-close after a short time
    setTimeout(() => {
        modalInstance.hide();
    }, 1500);
}

// Función para copiar el texto de ejemplo del framework
function copyExampleText() {
    const exampleElement = document.getElementById('framework-example');
    // Usar el texto sin formato almacenado en el atributo data-raw-example
    const exampleText = exampleElement.getAttribute('data-raw-example') || exampleElement.textContent;
    const copyConfirmation = document.getElementById('copy-confirmation');
    
    navigator.clipboard.writeText(exampleText)
        .then(() => {
            // Mostrar mensaje de confirmación dentro del modal
            copyConfirmation.classList.remove('d-none');
            
            // Ocultar el mensaje después de 3 segundos
            setTimeout(() => {
                copyConfirmation.classList.add('d-none');
            }, 3000);
        })
        .catch(err => {
            console.error('Error al copiar el ejemplo:', err);
            // Método alternativo de copiado si falla el clipboard API
            const textarea = document.createElement('textarea');
            textarea.value = exampleText;
            document.body.appendChild(textarea);
            textarea.select();
            document.execCommand('copy');
            document.body.removeChild(textarea);
            
            copyConfirmation.classList.remove('d-none');
            setTimeout(() => {
                copyConfirmation.classList.add('d-none');
            }, 3000);
        });
}

// Configurar marked
marked.setOptions({
    breaks: true,
    gfm: true
});

// Función para scroll suave
function smoothScrollTo(element, offset = 50) {
    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - offset;

    window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
    });
}

// Función para obtener y mostrar información de límite de uso
function updateUsageInfo() {
    fetch('/api/usage-info')
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                const usageInfo = data.usage_info;
                
                // Usar updateUsageDisplay para mantener consistencia en el formato
                updateUsageDisplay({
                    remaining: usageInfo.remaining,
                    reset_time: usageInfo.reset_time,
                    limited: usageInfo.remaining <= 0,
                    max: usageInfo.max || 10,
                    has_promo: usageInfo.has_promo || false
                });
            }
        })
        .catch(error => console.error('Error al obtener información de uso:', error));
}

// Manejar información de uso en respuestas
function updateUsageInfoFromResponse(data) {
    if (data && data.usage) {
        // Actualizar el máximo de tokens si el modelo lo proporciona
        if (data.usage.max_tokens) {
            updateMaxTokensDisplay(data.usage.max_tokens);
        }
        
        updateUsageDisplay({
            remaining: data.usage.remaining,
            reset_time: data.usage.reset_time,
            limited: data.usage.remaining <= 0,
            max: data.usage.max || 10,
            has_promo: data.usage.has_promo || false
        });
    }
}

// Función para verificar el límite de uso
function checkUsageLimit() {
    fetch('/api/usage-info')
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                const usageInfo = data.usage_info;
                updateUsageDisplay({
                    remaining: usageInfo.remaining,
                    reset_time: usageInfo.reset_time,
                    limited: usageInfo.remaining <= 0,
                    max: usageInfo.max || 10,
                    has_promo: usageInfo.has_promo || false
                });
            }
        })
        .catch(error => {
            console.error('Error al verificar el límite de uso:', error);
        });
}

// Función para actualizar la información de uso en la interfaz
function updateUsageDisplay(data) {
    const usageContainer = document.getElementById('usage-info-container');
    
    if (!usageContainer) return;
    
    if (data.remaining !== undefined) {
        let statusClass = 'text-info';
        let message = '';
        let icon = 'bi-info-circle';
        let bgClass = 'bg-light';
        const maxLimit = data.max || 10;
        const hasPromo = data.has_promo || false;
        
        if (data.limited || data.remaining <= 0) {
            statusClass = 'text-danger';
            icon = 'bi-exclamation-triangle';
            message = `Has alcanzado el límite de ${maxLimit} usos por hora para Familia OpenAI 4o. Podrás realizar más solicitudes en: ${data.reset_time}`;
        } else if (data.remaining <= Math.max(3, maxLimit * 0.2)) { // Avisar cuando queden menos del 20%
            statusClass = 'text-warning';
            icon = 'bi-exclamation-circle';
            message = `Atención: Te quedan solo ${data.remaining} usos de Familia OpenAI 4o para esta hora.`;
        } else {
            statusClass = 'text-success';
            icon = 'bi-lightning';
            message = `Usos disponibles de Familia OpenAI 4o: ${data.remaining}/${maxLimit} para esta hora.`;
        }
            
        let promoHTML = '';
            if (hasPromo) {
            promoHTML = `
                <div class="text-center mt-2">
                    <div class="d-inline-block bg-success text-white px-4 py-2 rounded">
                        <i class="bi bi-gift me-2"></i>
                        Código promocional activo
                    </div>
                </div>
            `;
        }
        
        usageContainer.innerHTML = `
            <div class="row">
                <div class="col-12 col-md-10 col-lg-8 mx-auto">
                    <div class="usage-status-container py-2 px-3 ${bgClass} rounded-pill d-inline-flex align-items-center border">
                        <i class="bi ${icon} ${statusClass} me-2"></i>
                        <span class="fw-medium">${message}</span>
                    </div>
                    ${promoHTML}
                </div>
            </div>
        `;
        usageContainer.style.display = 'block';
    } else {
        usageContainer.style.display = 'none';
    }
}

// Actualizar el contador después de cada generación con Familia OpenAI 4o
function updateUsageCounter() {
    checkUsageLimit();
}

// Función para actualizar el máximo de tokens mostrado en la interfaz
function updateMaxTokensDisplay(max = 4000) {
    const maxTokensElement = document.getElementById('max-tokens');
    if (maxTokensElement) {
        maxTokensElement.textContent = max;
        maxTokensDisplay = max;
    }
}

// DOM Content Loaded Event Handler
document.addEventListener('DOMContentLoaded', function() {
    // Initialize tooltips
    const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
    tooltipTriggerList.forEach(tooltipTriggerEl => {
        new bootstrap.Tooltip(tooltipTriggerEl);
    });
    
    // Actualizar dinámicamente el número de frameworks
    const frameworkCountElements = document.querySelectorAll('.framework-count');
    if (frameworkCountElements.length > 0) {
        const totalFrameworks = Object.keys(frameworks).length;
        frameworkCountElements.forEach(el => {
            el.textContent = totalFrameworks;
        });
    }
    
    // Get DOM elements
    const searchBtn = document.getElementById('search-btn');
    const generateBtn = document.getElementById('generate-btn');
    const copyBtn = document.getElementById('copy-btn');
    const copyMarkdownBtn = document.getElementById('copy-markdown-btn');
    const copyFormattedBtn = document.getElementById('copy-formatted-btn');
    const copyExampleBtn = document.getElementById('copy-example-btn');

    // Event listeners for buttons
    if (generateBtn) {
        generateBtn.addEventListener('click', generatePrompt);
    }

    if (copyBtn) {
        copyBtn.addEventListener('click', copyPrompt);
    }

    if (searchBtn) {
        searchBtn.addEventListener('click', searchFramework);
    }

    const searchInput = document.getElementById('framework-search');
    if (searchInput) {
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                searchFramework();
            }
        });
    }

    // Add event listener to copy example button
    if (copyExampleBtn) {
        copyExampleBtn.addEventListener('click', copyExampleText);
    }

    // Event listeners para los botones de copiado
    if (copyMarkdownBtn) {
        copyMarkdownBtn.addEventListener('click', copyMarkdown);
    }

    if (copyFormattedBtn) {
        copyFormattedBtn.addEventListener('click', copyFormatted);
    }

    // Add event listener to each framework card
    document.querySelectorAll('.framework-card').forEach(card => {
        card.addEventListener('click', function() {
            document.querySelectorAll('.framework-card').forEach(c => c.classList.remove('active'));
            this.classList.add('active');
            
            // Limpiar el prompt anterior
            document.getElementById('prompt-preview').textContent = '';
            document.getElementById('token-count').textContent = '0';
            
            updateFormFields(this.dataset.framework);
            
            // Scroll suave hasta el formulario con un pequeño retraso para que se vea la animación
            setTimeout(() => {
                const formFields = document.getElementById('form-fields');
                smoothScrollTo(formFields);
            }, 100);
        });
    });
    
    // Example button event listeners
    document.querySelectorAll('.view-example-btn').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            showFrameworkExample(this.dataset.framework);
        });
    });

    // Cargar información de uso
    checkUsageLimit();

    // Inicializar el contador de tokens máximos
    updateMaxTokensDisplay();
});
