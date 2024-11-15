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
    narrow: 'Reducir',
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
    'task': 'Tarea',
    'action': 'Acción',
    'goal': 'Objetivo',
    'role': 'Rol',
    'format': 'Formato',
    'before': 'Antes',
    'after': 'Después',
    'bridge': 'Puente',
    'context': 'Contexto',
    'result': 'Resultado',
    'example': 'Ejemplo',
    'input': 'Entrada',
    'steps': 'Pasos',
    'expectation': 'Expectativa',
    'purpose': 'Propósito',
    'endResult': 'Resultado Final',
    'audience': 'Audiencia',
    'style': 'Estilo',
    'situation': 'Situación',
    'question': 'Pregunta',
    'qualification': 'Calificación',
    'answerFormat': 'Formato de Respuesta'
};

// Framework definitions
const frameworks = {
    'tag': ['task', 'action', 'goal'],
    'rtf': ['role', 'task', 'format'],
    'bab': ['before', 'after', 'bridge'],
    'care': ['context', 'action', 'result', 'example'],
    'rise': ['role', 'input', 'steps', 'expectation'],
    'peas': ['purpose', 'endResult', 'audience', 'style'],
    'star': ['situation', 'task', 'action', 'result'],
    'qcqa': ['question', 'context', 'qualification', 'answerFormat'],
    'aida': ['attention', 'interest', 'desire', 'action'],
    'para': ['purpose', 'action', 'result', 'assessment'],
    'smart': ['specific', 'measurable', 'achievable', 'relevant', 'timeBound'],
    'erq': ['experience', 'requirements', 'qualifiers'],
    'code': ['context', 'objective', 'details', 'examples'],
    'pros': ['perspective', 'requirements', 'outcome', 'scope'],
    'team': ['task', 'environment', 'approach', 'metrics'],
    'idea': ['identify', 'define', 'execute', 'assess'],
    'fast': ['focus', 'audience', 'scope', 'tone'],
    'leap': ['level', 'expectations', 'approach', 'parameters'],
    'grow': ['goal', 'reality', 'options', 'way'],
    'spin': ['situation', 'problem', 'implication', 'needPayoff'],
    'design': ['define', 'explore', 'scope', 'ideate', 'guide', 'narrow'],
    'vision': ['visualize', 'identify', 'structure', 'implement', 'optimize', 'navigate'],
    'impact': ['intent', 'message', 'purpose', 'audience', 'channel', 'timing'],
    'master': ['mission', 'approach', 'strategy', 'tactics', 'execution', 'review'],
    'power': ['problem', 'outcome', 'why', 'execution', 'resources'],
    'logic': ['layout', 'objective', 'guidelines', 'implementation', 'criteria'],
    'scope': ['situation', 'coreNeed', 'obstacles', 'plan', 'evaluation'],
    'focus': ['frame', 'objective', 'constraints', 'understanding', 'solution'],
    'expert': ['expertise', 'context', 'purpose', 'execution', 'results', 'testing'],
    'clarity': ['context', 'limitations', 'approach', 'requirements', 'implementation', 'timeline', 'yield']
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
        endResult: "Ej: Reducción de tiempo de carga",
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
        answerFormat: "Ej: Plan detallado con métricas"
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
        timeBound: "Ej: Completar en 3 meses"
    },
    'erq': {
        experience: "Ej: 5 años en desarrollo backend",
        requirements: "Ej: Conocimientos específicos",
        qualifiers: "Ej: Certificaciones relevantes"
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
        way: "Ej: Plan de acción"
    },
    'spin': {
        situation: "Ej: Estado actual del sistema",
        problem: "Ej: Problemas identificados",
        implication: "Ej: Impacto en el negocio",
        needPayoff: "Ej: Beneficios de la solución"
    },
    'design': {
        define: "Ej: Definir requisitos",
        explore: "Ej: Explorar soluciones",
        scope: "Ej: Definir alcance",
        ideate: "Ej: Generar ideas",
        guide: "Ej: Guías de implementación",
        narrow: "Ej: Refinar solución"
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
        intent: "Ej: Objetivo principal",
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
        coreNeed: "Ej: Necesidad principal",
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
        yield: "Ej: Beneficios esperados"
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
            document.getElementById('prompt-preview').textContent = data.prompt;
            updateTokenCount();
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
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            const recommendation = JSON.parse(data.recommendation);
            
            recommendedFramework.textContent = recommendation.framework;
            recommendationReason.textContent = recommendation.reason;
            recommendationExample.textContent = recommendation.example;
            
            recommendationContainer.classList.remove('d-none');
            
            // Highlight recommended framework card
            document.querySelectorAll('.framework-card').forEach(card => {
                card.classList.remove('recommended');
            });
            
            const recommendedCard = document.querySelector(`.framework-card[data-framework="${recommendation.framework.toLowerCase()}"]`);
            if (recommendedCard) {
                recommendedCard.classList.add('recommended');
                recommendedCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        } else {
            throw new Error(data.error);
        }
    })
    .catch(error => {
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

    fetch('/api/get-example', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ framework })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            modalTitle.textContent = framework.toUpperCase();
            exampleContent.textContent = data.example;
            new bootstrap.Modal(exampleModal).show();
        } else {
            throw new Error(data.error);
        }
    })
    .catch(error => {
        alert('Error al cargar ejemplo: ' + error.message);
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
    const promptText = document.getElementById('prompt-preview').textContent;
    try {
        // Método alternativo de copiado
        const textArea = document.createElement('textarea');
        textArea.value = promptText;
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
    const promptText = document.getElementById('prompt-preview').textContent;
    try {
        // Convertir Markdown a HTML
        const htmlContent = marked.parse(promptText);
        
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
            await navigator.clipboard.writeText(promptText);
            showCopyConfirmation('¡Texto copiado (sin formato)!');
        } catch (err2) {
            showAnnouncement('Error', 'No se pudo copiar el texto formateado');
        }
    }
}

// Función para mostrar confirmación de copiado
function showCopyConfirmation(message) {
    const copyModal = document.getElementById('copyModal');
    const modalBody = copyModal.querySelector('.modal-body p');
    modalBody.textContent = message;
    const modal = new bootstrap.Modal(copyModal);
    modal.show();
    
    // Ocultar automáticamente después de 1.5 segundos
    setTimeout(() => {
        modal.hide();
    }, 1500);
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

// DOM Content Loaded Event Handler
document.addEventListener('DOMContentLoaded', function() {
    // Initialize tooltips
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });

    // Framework card click event
    document.querySelectorAll('.framework-card').forEach(card => {
        card.addEventListener('click', function() {
            // Desactivar todas las tarjetas
            document.querySelectorAll('.framework-card').forEach(c => {
                c.classList.remove('active');
            });
            
            // Activar solo la tarjeta seleccionada
            this.classList.add('active');
            
            // Limpiar el prompt anterior
            document.getElementById('prompt-preview').textContent = '';
            document.getElementById('token-count').textContent = '0';
            
            // Actualizar formulario
            updateFormFields(this.dataset.framework);

            // Scroll suave hasta el formulario con un pequeño retraso para que se vea la animación
            setTimeout(() => {
                const formFields = document.getElementById('form-fields');
                smoothScrollTo(formFields);
            }, 100);
        });
    });

    // Event listeners for buttons
    const generateBtn = document.getElementById('generate-btn');
    if (generateBtn) {
        generateBtn.addEventListener('click', generatePrompt);
    }

    const copyBtn = document.getElementById('copy-btn');
    if (copyBtn) {
        copyBtn.addEventListener('click', copyPrompt);
    }

    const searchBtn = document.getElementById('search-btn');
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

    // Example button event listeners
    document.querySelectorAll('.view-example-btn').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            showFrameworkExample(this.dataset.framework);
        });
    });

    // Event listeners para los botones de copiado
    const copyMarkdownBtn = document.getElementById('copy-markdown-btn');
    if (copyMarkdownBtn) {
        copyMarkdownBtn.addEventListener('click', copyMarkdown);
    }

    const copyFormattedBtn = document.getElementById('copy-formatted-btn');
    if (copyFormattedBtn) {
        copyFormattedBtn.addEventListener('click', copyFormatted);
    }
});

