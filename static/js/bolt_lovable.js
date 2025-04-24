// Variables globales
let selectedFramework = '';
let generatedPrompt = '';
let rawPrompt = '';
let frameworkFormData = {}; // Para almacenar los datos del formulario de framework
let aestheticFormData = {}; // Para almacenar los datos del formulario de estética

// Definición de los frameworks web recomendados
const webFrameworks = {
    'rtf': {
        name: 'RTF (Rol-Tarea-Formato)',
        description: 'Ideal para proyectos web con roles específicos y entregables estructurados',
        fields: ['role', 'task', 'format']
    },
    'code': {
        name: 'CODE (Contexto-Objetivo-Detalles-Ejemplos)',
        description: 'Perfecto para documentación técnica y guías de desarrollo web',
        fields: ['context', 'objective', 'details', 'examples']
    },
    'clarity': {
        name: 'CLARITY',
        description: 'Óptimo para proyectos web complejos con timeline y requisitos detallados',
        fields: ['context', 'limitations', 'approach', 'requirements', 'implementation', 'timeline', 'yield']
    },
    'guide': {
        name: 'GUIDE',
        description: 'Excelente para desarrollo de productos y servicios web enfocados al usuario',
        fields: ['goal', 'user', 'implementation', 'delivery', 'evaluation']
    }
};

// Traducciones de campos
const fieldTranslations = {
    'role': 'Rol (equipo de desarrollo)',
    'task': 'Tarea principal del proyecto',
    'format': 'Formato de entrega',
    'context': 'Contexto del proyecto',
    'objective': 'Objetivo principal',
    'details': 'Detalles técnicos',
    'examples': 'Ejemplos o referencias',
    'limitations': 'Limitaciones o restricciones',
    'approach': 'Enfoque metodológico',
    'requirements': 'Requisitos específicos',
    'implementation': 'Implementación técnica',
    'timeline': 'Cronograma estimado',
    'yield': 'Resultados esperados',
    'goal': 'Meta del proyecto',
    'user': 'Usuario objetivo',
    'delivery': 'Entrega final',
    'evaluation': 'Criterios de evaluación'
};

// Placeholders para cada campo
const fieldPlaceholders = {
    'role': 'Ej: Equipo de desarrollo frontend especializado en React',
    'task': 'Ej: Desarrollo de una plataforma e-commerce responsive con panel de administración',
    'format': 'Ej: Aplicación web con diseño adaptable, documentación técnica y manual de usuario',
    'context': 'Ej: Tienda online actual con problemas de rendimiento y diseño anticuado',
    'objective': 'Ej: Crear una experiencia de compra fluida que aumente las conversiones en un 30%',
    'details': 'Ej: Sistema de carrito con persistencia, integración de pasarelas de pago, optimización SEO',
    'examples': 'Ej: Referentes como Amazon, Shopify o sitios similares en el sector',
    'limitations': 'Ej: Presupuesto limitado, plazo de 3 meses, compatibilidad con sistemas legacy',
    'approach': 'Ej: Desarrollo ágil con sprints de 2 semanas y entregas incrementales',
    'requirements': 'Ej: Debe soportar 1000 usuarios concurrentes, tiempo de carga < 2s, compatible con IE11+',
    'implementation': 'Ej: Frontend en React, backend en Node.js, base de datos MongoDB',
    'timeline': 'Ej: Diseño (2 semanas), desarrollo (8 semanas), pruebas (2 semanas)',
    'yield': 'Ej: Aumento de conversiones del 30%, reducción del 50% en tiempo de carga',
    'goal': 'Ej: Crear una plataforma e-commerce líder en experiencia de usuario y conversión',
    'user': 'Ej: Compradores de 25-45 años familiarizados con compras online',
    'delivery': 'Ej: Código fuente, documentación, despliegue en producción y capacitación',
    'evaluation': 'Ej: Métricas de conversión, velocidad, satisfacción de usuario, SEO'
};

// Valores predeterminados de Lovable
const lovableDefaults = {
    colors: {
        primary: '#3a86ff',
        secondary: '#8338ec',
        accent: '#ff006e',
        style: 'colorful'
    },
    typography: {
        headingFont: 'display',
        bodyFont: 'sans-serif',
        fontSize: 'medium',
        style: 'modern'
    },
    design: {
        componentStyle: 'rounded',
        density: 'balanced',
        effects: 'subtle',
        animation: 'subtle'
    },
    references: {
        designStyle: 'material'
    }
};

// Mostrar anuncio modal
function showAnnouncement(title, message) {
    const modal = document.getElementById('announcementModal');
    const titleElement = document.getElementById('announcementTitle');
    const messageElement = document.getElementById('announcementMessage');
    
    titleElement.textContent = title;
    messageElement.textContent = message;
    
    const modalInstance = new bootstrap.Modal(modal);
    modalInstance.show();
}

// Mostrar confirmación de copiado
function showCopyConfirmation(message = '¡Prompt copiado con éxito!') {
    const modal = document.getElementById('copyModal');
    modal.querySelector('.modal-body p').textContent = message;
    const modalInstance = new bootstrap.Modal(modal);
    modalInstance.show();
    
    // Auto-cerrar después de un tiempo
    setTimeout(() => {
        modalInstance.hide();
    }, 1500);
}

// Recomendar framework basado en la descripción del proyecto
async function recommendFramework() {
    const description = document.getElementById('project-description').value.trim();
    
    if (!description) {
        showAnnouncement('Campo requerido', 'Por favor, describe tu proyecto web para recibir una recomendación.');
        return;
    }
    
    // Mostrar indicador de carga
    const recommendBtn = document.getElementById('recommend-framework-btn');
    recommendBtn.innerHTML = '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Analizando...';
    recommendBtn.disabled = true;
    
    try {
        const response = await fetch('/api/recommend-web-framework', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ description })
        });
        
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || 'Error al recomendar framework');
        }
        
        const data = await response.json();
        
        if (data.success) {
            // Seleccionar uno de los frameworks web disponibles que mejor se ajuste
            // En un caso real, esto vendría del backend, pero para simplificar usamos una lógica local
            const recommendedFramework = data.framework.toLowerCase();
            
            // Verificar si el framework recomendado está en nuestra lista
            let frameworkToUse = webFrameworks[recommendedFramework] || 
                               Object.values(webFrameworks)[Math.floor(Math.random() * Object.values(webFrameworks).length)];
            
            // Mostrar la recomendación
            document.getElementById('recommended-framework-name').textContent = frameworkToUse.name;
            document.getElementById('recommended-framework-description').textContent = frameworkToUse.description;
            
            // Guardar el framework seleccionado
            selectedFramework = Object.keys(webFrameworks).find(key => webFrameworks[key] === frameworkToUse);
            
            // Mostrar contenedor de recomendación y ocultar el inicial
            document.getElementById('initial-form-container').classList.add('d-none');
            document.getElementById('framework-recommendation-container').classList.remove('d-none');
            
            // Actualizar información de uso si está disponible
            if (data.usage) {
                updateUsageInfoFromResponse(data);
            }
        } else {
            throw new Error(data.error || 'No se pudo recomendar un framework');
        }
    } catch (error) {
        console.error('Error:', error);
        showAnnouncement('Error', error.message);
    } finally {
        recommendBtn.innerHTML = '<i class="bi bi-lightbulb me-2"></i>Recomendar Framework';
        recommendBtn.disabled = false;
    }
}

// Usar el framework recomendado
function useRecommendedFramework() {
    if (!selectedFramework || !webFrameworks[selectedFramework]) {
        showAnnouncement('Error', 'No se ha seleccionado un framework válido');
        return;
    }
    
    // Preparar el formulario con los campos del framework
    const framework = webFrameworks[selectedFramework];
    document.getElementById('form-framework-name').textContent = framework.name;
    
    // Generar campos de formulario
    const fieldsContainer = document.getElementById('framework-fields');
    fieldsContainer.innerHTML = '';
    
    framework.fields.forEach(field => {
        const fieldDiv = document.createElement('div');
        fieldDiv.className = 'mb-3';
        
        const label = document.createElement('label');
        label.htmlFor = `field-${field}`;
        label.className = 'form-label';
        label.textContent = fieldTranslations[field] || field;
        
        const textarea = document.createElement('textarea');
        textarea.className = 'form-control';
        textarea.id = `field-${field}`;
        textarea.rows = 3;
        textarea.placeholder = fieldPlaceholders[field] || `Ingresa ${field}...`;
        
        fieldDiv.appendChild(label);
        fieldDiv.appendChild(textarea);
        fieldsContainer.appendChild(fieldDiv);
    });
    
    // Mostrar el formulario del framework y ocultar la recomendación
    document.getElementById('framework-recommendation-container').classList.add('d-none');
    document.getElementById('framework-form-container').classList.remove('d-none');
}

// Volver a la descripción del proyecto
function changeFramework() {
    document.getElementById('framework-recommendation-container').classList.add('d-none');
    document.getElementById('initial-form-container').classList.remove('d-none');
    selectedFramework = '';
}

// Ir al formulario de personalización estética
function goToAestheticForm() {
    // Validar que todos los campos del framework estén completos
    const framework = webFrameworks[selectedFramework];
    let hasEmptyFields = false;
    
    frameworkFormData = {}; // Reiniciar datos de formulario
    
    framework.fields.forEach(field => {
        const value = document.getElementById(`field-${field}`).value.trim();
        if (!value) {
            hasEmptyFields = true;
        }
        frameworkFormData[field] = value;
    });
    
    if (hasEmptyFields) {
        showAnnouncement('Campos incompletos', 'Por favor, completa todos los campos del formulario para continuar.');
        return;
    }
    
    // Ocultar formulario del framework y mostrar formulario de estética
    document.getElementById('framework-form-container').classList.add('d-none');
    document.getElementById('aesthetic-form-container').classList.remove('d-none');
    
    // Sincronizar los valores de color con los campos de texto
    syncColorInputs();
}

// Volver al formulario del framework
function backToFrameworkForm() {
    document.getElementById('aesthetic-form-container').classList.add('d-none');
    document.getElementById('framework-form-container').classList.remove('d-none');
}

// Sincronizar inputs de color con campos de texto
function syncColorInputs() {
    // Color primario
    const primaryColor = document.getElementById('primary-color');
    const primaryColorHex = document.getElementById('primary-color-hex');
    primaryColorHex.value = primaryColor.value;
    
    primaryColor.addEventListener('input', function() {
        primaryColorHex.value = this.value;
    });
    
    primaryColorHex.addEventListener('input', function() {
        if (/^#[0-9A-F]{6}$/i.test(this.value)) {
            primaryColor.value = this.value;
        }
    });
    
    // Color secundario
    const secondaryColor = document.getElementById('secondary-color');
    const secondaryColorHex = document.getElementById('secondary-color-hex');
    secondaryColorHex.value = secondaryColor.value;
    
    secondaryColor.addEventListener('input', function() {
        secondaryColorHex.value = this.value;
    });
    
    secondaryColorHex.addEventListener('input', function() {
        if (/^#[0-9A-F]{6}$/i.test(this.value)) {
            secondaryColor.value = this.value;
        }
    });
    
    // Color de acento
    const accentColor = document.getElementById('accent-color');
    const accentColorHex = document.getElementById('accent-color-hex');
    accentColorHex.value = accentColor.value;
    
    accentColor.addEventListener('input', function() {
        accentColorHex.value = this.value;
    });
    
    accentColorHex.addEventListener('input', function() {
        if (/^#[0-9A-F]{6}$/i.test(this.value)) {
            accentColor.value = this.value;
        }
    });
}

// Aplicar valores predeterminados de Lovable
function applyLovableDefaults() {
    // Colores
    document.getElementById('primary-color').value = lovableDefaults.colors.primary;
    document.getElementById('primary-color-hex').value = lovableDefaults.colors.primary;
    
    document.getElementById('secondary-color').value = lovableDefaults.colors.secondary;
    document.getElementById('secondary-color-hex').value = lovableDefaults.colors.secondary;
    
    document.getElementById('accent-color').value = lovableDefaults.colors.accent;
    document.getElementById('accent-color-hex').value = lovableDefaults.colors.accent;
    
    document.getElementById('color-style').value = lovableDefaults.colors.style;
    
    // Tipografía
    document.getElementById('heading-font').value = lovableDefaults.typography.headingFont;
    document.getElementById('body-font').value = lovableDefaults.typography.bodyFont;
    document.getElementById('font-size').value = lovableDefaults.typography.fontSize;
    document.getElementById('typography-style').value = lovableDefaults.typography.style;
    
    // Elementos de diseño
    document.getElementById('component-style').value = lovableDefaults.design.componentStyle;
    document.getElementById('density').value = lovableDefaults.design.density;
    document.getElementById('effects').value = lovableDefaults.design.effects;
    document.getElementById('animation').value = lovableDefaults.design.animation;
    
    // Referencias
    document.getElementById('design-style').value = lovableDefaults.references.designStyle;
    document.getElementById('reference-urls').value = '';
    
    // Mostrar confirmación
    showAnnouncement('Valores predeterminados aplicados', 'Se han aplicado los valores estéticos predeterminados de Lovable a tu proyecto.');
}

// Recopilar datos del formulario de estética
function collectAestheticData() {
    aestheticFormData = {
        colors: {
            primary: document.getElementById('primary-color').value,
            secondary: document.getElementById('secondary-color').value,
            accent: document.getElementById('accent-color').value,
            style: document.getElementById('color-style').value
        },
        typography: {
            headingFont: document.getElementById('heading-font').value,
            bodyFont: document.getElementById('body-font').value,
            fontSize: document.getElementById('font-size').value,
            style: document.getElementById('typography-style').value
        },
        design: {
            componentStyle: document.getElementById('component-style').value,
            density: document.getElementById('density').value,
            effects: document.getElementById('effects').value,
            animation: document.getElementById('animation').value
        },
        references: {
            urls: document.getElementById('reference-urls').value,
            designStyle: document.getElementById('design-style').value
        }
    };
    
    return aestheticFormData;
}

// Generar prompt para Bolt/Lovable
async function generateBoltLovablePrompt() {
    if (!selectedFramework) {
        showAnnouncement('Error', 'No se ha seleccionado un framework');
        return;
    }
    
    // Si estamos en el formulario de framework, ir al de estética
    if (!document.getElementById('framework-form-container').classList.contains('d-none')) {
        goToAestheticForm();
        return;
    }
    
    // Recopilar datos del formulario de estética
    collectAestheticData();
    
    // Mostrar indicador de carga
    const generateBtn = document.getElementById('generate-bolt-lovable-btn');
    generateBtn.innerHTML = '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Generando...';
    generateBtn.disabled = true;
    
    try {
        const response = await fetch('/api/generate-bolt-lovable', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                framework_type: selectedFramework,
                form_data: frameworkFormData,
                aesthetic_data: aestheticFormData // Añadir datos estéticos
            })
        });
        
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || 'Error al generar el prompt');
        }
        
        const data = await response.json();
        
        if (data.success) {
            // Guardar el prompt generado
            generatedPrompt = data.prompt;
            rawPrompt = data.raw_prompt;
            
            // Mostrar el prompt en el área de resultado
            const promptPreview = document.getElementById('prompt-preview');
            promptPreview.innerHTML = marked.parse(data.prompt);
            
            // Actualizar contador de tokens si está disponible
            if (data.token_count) {
                document.getElementById('token-count').textContent = data.token_count;
            } else {
                updateTokenCount(data.prompt);
            }
            
            // Actualizar información de uso si está disponible
            if (data.usage) {
                updateUsageInfoFromResponse(data);
            }
            
            // Mostrar el contenedor de resultado y ocultar el formulario
            document.getElementById('aesthetic-form-container').classList.add('d-none');
            document.getElementById('result-container').classList.remove('d-none');
        } else {
            throw new Error(data.error || 'No se pudo generar el prompt');
        }
    } catch (error) {
        console.error('Error:', error);
        showAnnouncement('Error', error.message);
    } finally {
        generateBtn.innerHTML = '<i class="bi bi-magic me-2"></i>Generar Prompt Bolt/Lovable';
        generateBtn.disabled = false;
    }
}

// Actualizar contador de tokens
async function updateTokenCount(text) {
    if (!text) return;
    
    try {
        const response = await fetch('/api/count-tokens', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ text })
        });
        
        const data = await response.json();
        if (data.success) {
            document.getElementById('token-count').textContent = data.count;
        }
    } catch (error) {
        console.error('Error al contar tokens:', error);
    }
}

// Copiar prompt como Markdown
async function copyMarkdown() {
    if (!rawPrompt) {
        showAnnouncement('Error', 'No hay contenido para copiar');
        return;
    }
    
    try {
        // Asegurar que copiamos el texto con formato markdown (headings, bold, etc.)
        // Usamos expresiones regulares para añadir formateo markdown si no lo tiene ya
        let markdownText = rawPrompt;
        
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
        
        await navigator.clipboard.writeText(markdownText);
        showCopyConfirmation('¡Markdown copiado!');
    } catch (err) {
        // Método alternativo de copiado
        const textArea = document.createElement('textarea');
        textArea.value = rawPrompt;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        showCopyConfirmation('¡Markdown copiado!');
    }
}

// Copiar prompt con formato
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
        
        showCopyConfirmation('¡Contenido formateado copiado!');
    } catch (err) {
        // Fallback a copiar texto sin formato
        try {
            await navigator.clipboard.writeText(rawPrompt);
            showCopyConfirmation('¡Contenido copiado (sin formato)!');
        } catch (err2) {
            showAnnouncement('Error', 'No se pudo copiar el contenido');
        }
    }
}

// Descargar como archivo TXT
function downloadAsTxt() {
    if (!rawPrompt) {
        showAnnouncement('Error', 'No hay contenido para descargar');
        return;
    }
    
    const blob = new Blob([rawPrompt], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'bolt_lovable_prompt.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

// Abrir editor de prompt
function openPromptEditor() {
    const textarea = document.getElementById('edit-prompt-textarea');
    textarea.value = rawPrompt;
    const modal = new bootstrap.Modal(document.getElementById('editPromptModal'));
    modal.show();
}

// Guardar cambios en el prompt editado
function saveEditedPrompt() {
    const textarea = document.getElementById('edit-prompt-textarea');
    rawPrompt = textarea.value;
    
    // Actualizar la vista previa
    const promptPreview = document.getElementById('prompt-preview');
    promptPreview.innerHTML = marked.parse(rawPrompt);
    
    // Actualizar contador de tokens
    updateTokenCount(rawPrompt);
    
    // Cerrar modal
    bootstrap.Modal.getInstance(document.getElementById('editPromptModal')).hide();
    
    showAnnouncement('Éxito', 'Los cambios han sido guardados.');
}

// Volver al paso de editar el framework
function editFrameworkData() {
    document.getElementById('result-container').classList.add('d-none');
    document.getElementById('framework-form-container').classList.remove('d-none');
}

// Regenerar el prompt
async function regeneratePrompt() {
    // Simplemente llama a la función de generación nuevamente
    await generateBoltLovablePrompt();
}

// Manejar información de uso en respuestas
function updateUsageInfoFromResponse(data) {
    if (data && data.usage) {
        updateUsageDisplay({
            remaining: data.usage.remaining,
            reset_time: data.usage.reset_time,
            limited: data.usage.remaining <= 0
        });
    }
}

// Función para actualizar la información de uso en la interfaz
function updateUsageDisplay(data) {
    const usageContainer = document.getElementById('usage-info-container');
    
    if (!usageContainer) return;
    
    if (data.remaining !== undefined) {
        let messageClass = 'alert-info';
        let message = '';
        let icon = 'bi-info-circle';
        
        if (data.limited || data.remaining <= 0) {
            messageClass = 'alert-danger';
            icon = 'bi-exclamation-triangle';
            message = `Has alcanzado el límite de 10 usos por hora para GPT-3.5. Podrás realizar más solicitudes en: ${data.reset_time}`;
        } else if (data.remaining <= 3) {
            messageClass = 'alert-warning';
            icon = 'bi-exclamation-circle';
            message = `Atención: Te quedan solo ${data.remaining} usos de GPT-3.5 para esta hora.`;
        } else {
            icon = 'bi-lightning';
            message = `Usos disponibles de GPT-3.5: ${data.remaining}/10 para esta hora.`;
        }
        
        usageContainer.innerHTML = `<div class="row"><div class="col-12 col-md-10 col-lg-8 mx-auto"><div class="alert ${messageClass}"><i class="bi ${icon}"></i>${message}</div></div></div>`;
        usageContainer.style.display = 'block';
    } else {
        usageContainer.style.display = 'none';
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
                    limited: usageInfo.limited
                });
            }
        })
        .catch(error => {
            console.error('Error al verificar el límite de uso:', error);
        });
}

// Registrar eventos al cargar el documento
document.addEventListener('DOMContentLoaded', function() {
    // Botones del formulario inicial
    document.getElementById('recommend-framework-btn').addEventListener('click', recommendFramework);
    
    // Botones de recomendación de framework
    document.getElementById('use-framework-btn').addEventListener('click', useRecommendedFramework);
    document.getElementById('change-framework-btn').addEventListener('click', changeFramework);
    
    // Botones de navegación entre formularios
    document.getElementById('next-aesthetic-btn').addEventListener('click', goToAestheticForm);
    document.getElementById('back-to-framework-btn').addEventListener('click', backToFrameworkForm);
    document.getElementById('use-lovable-defaults-btn').addEventListener('click', applyLovableDefaults);
    
    // Botón de generación
    document.getElementById('generate-bolt-lovable-btn').addEventListener('click', generateBoltLovablePrompt);
    
    // Botones de acciones en el resultado
    document.getElementById('copy-markdown-btn').addEventListener('click', copyMarkdown);
    document.getElementById('copy-formatted-btn').addEventListener('click', copyFormatted);
    document.getElementById('download-txt-btn').addEventListener('click', downloadAsTxt);
    document.getElementById('edit-prompt-btn').addEventListener('click', openPromptEditor);
    document.getElementById('regenerate-btn').addEventListener('click', regeneratePrompt);
    
    // Modal de edición
    document.getElementById('save-edited-prompt-btn').addEventListener('click', saveEditedPrompt);
    
    // Verificar información de uso
    checkUsageLimit();
    
    // Configurar marked para el renderizado de markdown
    marked.setOptions({
        breaks: true,
        gfm: true
    });
}); 