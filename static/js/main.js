// Global variables
let selectedFrameworks = [];
let tokenCount = 0;

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
    analyze: 'Analizar',
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
    design: 'Diseño'
};

// Framework definitions
const frameworks = {
    'tag': ['task', 'action', 'goal'],
    'rtf': ['role', 'task', 'format'],
    'bab': ['before', 'after', 'bridge'],
    'care': ['context', 'action', 'result', 'example'],
    'rise': ['role', 'input', 'steps', 'expectation'],
    'peas': ['purpose', 'end_result', 'audience', 'style'],
    'star': ['situation', 'task', 'action', 'result'],
    'qcqa': ['question', 'context', 'qualification', 'answer_format'],
    'aida': ['attention', 'interest', 'desire', 'action'],
    'para': ['purpose', 'action', 'result', 'assessment'],
    'smart': ['specific', 'measurable', 'achievable', 'relevant', 'time_bound'],
    'erq': ['experience', 'requirements', 'qualifications'],
    'code': ['context', 'objective', 'details', 'examples'],
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
    'power': ['problem', 'outcome', 'why', 'execution', 'resources'],
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
    'adapt': ['analysis', 'design', 'approach', 'progress', 'testing'],
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
    'pulse': ['purpose', 'understanding', 'learning', 'strategy', 'evaluation']
};

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
        role: "Ej: Tech Lead del equipo backend",
        input: "Ej: Código base actual y requisitos",
        steps: "Ej: 1. Análisis, 2. POC, 3. Implementación",
        expectation: "Ej: Sistema escalable a 1M usuarios"
    },
    'peas': {
        purpose: "Ej: Mejorar experiencia de usuario",
        end_result: "Ej: Reducción de tiempo de carga",
        audience: "Ej: Usuarios móviles",
        style: "Ej: Diseño minimalista y eficiente"
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
        purpose: "Ej: Optimizar rendimiento del sistema",
        action: "Ej: Implementar caché y optimizaciones",
        result: "Ej: Mejora significativa de velocidad",
        assessment: "Ej: Métricas de éxito"
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
        context: "Ej: Sistema actual y necesidades",
        objective: "Ej: Meta del desarrollo",
        details: "Ej: Especificaciones técnicas",
        examples: "Ej: Casos de uso"
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
        problem: "Ej: Problema a resolver",
        outcome: "Ej: Resultado esperado",
        why: "Ej: Justificación",
        execution: "Ej: Plan de ejecución",
        resources: "Ej: Recursos necesarios"
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
        analysis: "Ej: Análisis de la situación",
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
        purpose: "Ej: Propósito del proyecto",
        understanding: "Ej: Comprensión del problema",
        learning: "Ej: Aprendizaje durante el proyecto",
        strategy: "Ej: Estrategia del proyecto",
        evaluation: "Ej: Evaluación de resultados"
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

function showFrameworkExample(framework) {
    const exampleModal = document.getElementById('exampleModal');
    const modalTitle = document.getElementById('exampleModalLabel');
    const exampleContent = document.getElementById('framework-example');
    const btn = document.querySelector(`.view-example-btn[data-framework="${framework}"]`);
    
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
        'tag': 'TAG-Tarea-Accion-Meta',
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
        'power': 'POWER-Problema-Resultado-PorQue-Ejecucion-Recursos'
    };

    // Obtener el nombre completo del archivo
    const frameworkFileName = frameworkMap[framework.toLowerCase()];
    
    exampleContent.innerHTML = `
        <div class="d-flex justify-content-center">
            <div class="spinner-border text-primary" role="status">
                <span class="visually-hidden">Cargando...</span>
            </div>
        </div>
        <p class="text-center">Cargando información del framework...</p>
    `;

    // Cargar directamente el archivo txt
    fetch(`/frameworks/${frameworkFileName}.txt`)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Error al cargar el framework: ${response.statusText}`);
            }
            return response.text();
        })
        .then(text => {
            // Almacenar el texto sin formato como atributo para poder copiarlo después
            exampleContent.setAttribute('data-raw-example', text);
            
            // Formatear el contenido y mostrarlo
            exampleContent.innerHTML = marked.parse(text);
            
            // Actualizar el título del modal
            modalTitle.textContent = framework.toUpperCase();
            
            // Mostrar el modal
            new bootstrap.Modal(exampleModal).show();
        })
        .catch(error => {
            console.error('Error:', error);
            exampleContent.innerHTML = `
                <div class="alert alert-danger" role="alert">
                    <i class="bi bi-exclamation-triangle-fill me-2"></i>
                    Error al cargar la información del framework. Por favor, inténtalo de nuevo.
                </div>
            `;
            
            // Mostrar el modal incluso si hay un error
            new bootstrap.Modal(exampleModal).show();
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
                    limited: usageInfo.limited
                });
            }
        })
        .catch(error => console.error('Error al obtener información de uso:', error));
}

// Manejar información de uso en respuestas
function updateUsageInfoFromResponse(data) {
    if (data && data.usage) {
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
                    limited: usageInfo.limited,
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
            message = `Has alcanzado el límite de ${maxLimit} usos por hora para GPT-3.5. Podrás realizar más solicitudes en: ${data.reset_time}`;
        } else if (data.remaining <= Math.max(3, maxLimit * 0.2)) { // Avisar cuando queden menos del 20%
            statusClass = 'text-warning';
            icon = 'bi-exclamation-circle';
            message = `Atención: Te quedan solo ${data.remaining} usos de GPT-3.5 para esta hora.`;
        } else {
            statusClass = 'text-success';
            icon = 'bi-lightning';
            message = `Usos disponibles de GPT-3.5: ${data.remaining}/${maxLimit} para esta hora.`;
            
            // Mostrar insignia de código promocional si está activo
            if (hasPromo) {
                message += ' <span class="badge bg-success ms-1">Código promocional activo</span>';
            }
        }
        
        usageContainer.innerHTML = `
            <div class="row">
                <div class="col-12 col-md-10 col-lg-8 mx-auto">
                    <div class="usage-status-container py-2 px-3 ${bgClass} rounded-pill d-inline-flex align-items-center border">
                        <i class="bi ${icon} ${statusClass} me-2"></i>
                        <span class="fw-medium">${message}</span>
                    </div>
                </div>
            </div>
        `;
        usageContainer.style.display = 'block';
    } else {
        usageContainer.style.display = 'none';
    }
}

// Actualizar el contador después de cada generación con GPT-3.5
function updateUsageCounter() {
    checkUsageLimit();
}

// DOM Content Loaded Event Handler
document.addEventListener('DOMContentLoaded', function() {
    // Initialize tooltips
    const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
    tooltipTriggerList.forEach(tooltipTriggerEl => {
        new bootstrap.Tooltip(tooltipTriggerEl);
    });
    
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
});
