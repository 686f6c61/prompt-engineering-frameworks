/**
 * @file razonadores.js
 * @description Controlador para la página de generación de prompts de razonamiento avanzado
 * @version 1.0.0
 * 
 * Este módulo implementa la funcionalidad para crear prompts optimizados para
 * razonamiento profundo con modelos avanzados. Proporciona:
 * 
 * 1. Análisis de temas específicos para generar preguntas de refinamiento
 * 2. Recolección estructurada de respuestas del usuario
 * 3. Generación de prompts altamente detallados para razonamiento
 * 4. Edición, copia y exportación de prompts generados
 * 5. Gestión de limitaciones de uso y manejo de errores
 */

// Razonadores.js - Lógica de la página de razonamiento
document.addEventListener('DOMContentLoaded', function() {
    // ===================================
    // INICIALIZACIÓN DE ELEMENTOS DOM
    // ===================================
    
    /**
     * Referencias a elementos DOM clave
     * @description Cacheamos referencias para optimizar rendimiento y legibilidad
     */
    const initialForm = document.getElementById('initial-form-container');
    const refinementQuestions = document.getElementById('refinement-questions-container');
    const resultContainer = document.getElementById('result-container');
    const reasoningTopic = document.getElementById('reasoning-topic');
    const analyzeTopicBtn = document.getElementById('analyze-topic-btn');
    const questionsContainer = document.getElementById('questions-container');
    const backToTopicBtn = document.getElementById('back-to-topic-btn');
    const generatePromptBtn = document.getElementById('generate-prompt-btn');
    const promptPreview = document.getElementById('prompt-preview');
    const tokenCount = document.getElementById('token-count');
    const copyMarkdownBtn = document.getElementById('copy-markdown-btn');
    const copyFormattedBtn = document.getElementById('copy-formatted-btn');
    const downloadTxtBtn = document.getElementById('download-txt-btn');
    const editPromptBtn = document.getElementById('edit-prompt-btn');
    const regenerateBtn = document.getElementById('regenerate-btn');
    const usageInfoContainer = document.getElementById('usage-info-container');
    const infoRazonadores = document.getElementById('infoRazonadores');
    
    // ===================================
    // VARIABLES DE ESTADO
    // ===================================
    
    /**
     * Variables para almacenar el estado de la aplicación
     * @description Mantienen los datos en memoria durante la sesión del usuario
     */
    let currentTopic = '';
    let currentQuestions = [];
    let currentAnswers = {};
    let currentPrompt = '';
    let formattedPrompt = '';
    
    /**
     * Plantilla base para prompts de razonamiento
     * @constant {string}
     * @description Template markdown con instrucciones estructuradas para análisis profundo
     */
    const basePromptTemplate = `# Instrucciones para razonamiento profundo

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

[PROBLEMA]`;
    
    // ===================================
    // INICIALIZACIÓN Y CONFIGURACIÓN
    // ===================================
    
    /**
     * Inicialización de la aplicación
     * @description Carga información inicial y configura elementos visuales
     */
    loadUsageInfo();
    
    // Mostrar información de modelos razonadores por defecto al cargar la página
    if (infoRazonadores) {
        // Abrir el panel de información automáticamente después de un breve retraso
        setTimeout(() => {
            new bootstrap.Collapse(infoRazonadores, {
                show: true
            });
        }, 500);
    }
    
    // ===================================
    // EVENTOS Y LISTENERS
    // ===================================
    
    /**
     * Evento para analizar el tema ingresado
     * @description Procesa el tema del usuario y genera preguntas relevantes
     */
    analyzeTopicBtn.addEventListener('click', function() {
        if (!reasoningTopic.value.trim()) {
            showAlert('Por favor, ingresa un tema o problema para analizar.');
            return;
        }
        
        currentTopic = reasoningTopic.value.trim();
        analyzeTopicBtn.innerHTML = '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Analizando...';
        analyzeTopicBtn.disabled = true;
        
        // Simular llamada al API (esto debe reemplazarse con una llamada real)
        setTimeout(() => {
            generateQuestions(currentTopic);
            initialForm.classList.add('d-none');
            refinementQuestions.classList.remove('d-none');
            analyzeTopicBtn.innerHTML = '<i class="bi bi-brain me-2"></i>Analizar tema';
            analyzeTopicBtn.disabled = false;
        }, 1500);
    });
    
    /**
     * Evento para volver al formulario inicial
     * @description Permite al usuario regresar a la pantalla de ingreso de tema
     */
    backToTopicBtn.addEventListener('click', function() {
        refinementQuestions.classList.add('d-none');
        initialForm.classList.remove('d-none');
    });
    
    /**
     * Evento para generar el prompt final
     * @description Recolecta respuestas y genera un prompt estructurado
     */
    generatePromptBtn.addEventListener('click', function() {
        // Recolectar todas las respuestas
        const allAnswered = collectAnswers();
        
        if (!allAnswered) {
            showAlert('Por favor, responde todas las preguntas para generar un prompt óptimo.');
            return;
        }
        
        generatePromptBtn.innerHTML = '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Generando...';
        generatePromptBtn.disabled = true;
        
        // Simular llamada al API (esto debe reemplazarse con una llamada real)
        setTimeout(() => {
            generateReasoningPrompt();
            refinementQuestions.classList.add('d-none');
            resultContainer.classList.remove('d-none');
            generatePromptBtn.innerHTML = '<i class="bi bi-lightbulb me-2"></i>Generar prompt de razonamiento';
            generatePromptBtn.disabled = false;
        }, 2000);
    });
    
    /**
     * Eventos para botones de acción del prompt
     * @description Configuración de listeners para interactuar con el prompt generado
     */
    copyMarkdownBtn.addEventListener('click', function() {
        copyToClipboard(currentPrompt);
        showCopyConfirmation();
    });
    
    copyFormattedBtn.addEventListener('click', function() {
        copyToClipboard(formattedPrompt);
        showCopyConfirmation();
    });
    
    downloadTxtBtn.addEventListener('click', function() {
        downloadText(formattedPrompt, 'razonamiento-prompt.txt');
    });
    
    editPromptBtn.addEventListener('click', function() {
        openEditModal(currentPrompt);
    });
    
    regenerateBtn.addEventListener('click', function() {
        regeneratePrompt();
    });
    
    // ===================================
    // FUNCIONES PRINCIPALES
    // ===================================
    
    /**
     * Genera preguntas basadas en el tema
     * @function generateQuestions
     * @param {string} topic - Tema principal ingresado por el usuario
     * @description Solicita al servidor preguntas contextuales para refinar el prompt
     */
    function generateQuestions(topic) {
        // Mostrar indicador de carga
        questionsContainer.innerHTML = `
            <div class="text-center py-4">
                <div class="spinner-border text-primary" role="status">
                    <span class="visually-hidden">Cargando...</span>
                </div>
                <p class="mt-2">Analizando tu tema y generando preguntas relevantes...</p>
            </div>
        `;
        
        // Realizar llamada a la API para generar preguntas específicas
        fetch('/api/generar-preguntas', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ topic: topic })
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                currentQuestions = data.questions;
                renderQuestions(data.questions);
            } else {
                // En caso de error, mostrar mensaje y utilizar preguntas predeterminadas
                console.error('Error al generar preguntas:', data.error);
                showAlert('Hubo un problema al generar preguntas específicas. Utilizando preguntas estándar.');
                
                // Preguntas de respaldo en caso de error
                const defaultQuestions = [
                    '¿Cuál es el objetivo principal de tu solicitud?',
                    '¿Qué aspectos específicos te gustaría incluir?',
                    '¿Hay algún contexto particular o requisitos importantes que debamos considerar?',
                    '¿Prefieres un enfoque más teórico o práctico para este tema?',
                    '¿Tienes alguna restricción o limitación que debamos tener en cuenta?'
                ];
                
                currentQuestions = defaultQuestions;
                renderQuestions(defaultQuestions);
            }
        })
        .catch(error => {
            console.error('Error en la solicitud:', error);
            showAlert('Error al comunicarse con el servidor. Utilizando preguntas estándar.');
            
            // Preguntas de respaldo en caso de error
            const defaultQuestions = [
                '¿Cuál es el objetivo principal de tu solicitud?',
                '¿Qué aspectos específicos te gustaría incluir?',
                '¿Hay algún contexto particular o requisitos importantes que debamos considerar?',
                '¿Prefieres un enfoque más teórico o práctico para este tema?',
                '¿Tienes alguna restricción o limitación que debamos tener en cuenta?'
            ];
            
            currentQuestions = defaultQuestions;
            renderQuestions(defaultQuestions);
        });
    }
    
    /**
     * Renderiza las preguntas en el DOM
     * @function renderQuestions
     * @param {Array} questions - Array de preguntas a mostrar
     * @description Genera elementos HTML para cada pregunta
     */
    function renderQuestions(questions) {
        questionsContainer.innerHTML = '';
        
        questions.forEach((question, index) => {
            const questionEl = document.createElement('div');
            questionEl.className = 'question-card';
            questionEl.innerHTML = `
                <label class="form-label fw-medium">${index + 1}. ${question}</label>
                <textarea class="form-control question-answer" data-index="${index}" rows="2"></textarea>
            `;
            questionsContainer.appendChild(questionEl);
        });
    }
    
    /**
     * Recolecta las respuestas del usuario
     * @function collectAnswers
     * @returns {boolean} - Indica si todas las preguntas fueron respondidas
     * @description Valida y almacena las respuestas ingresadas
     */
    function collectAnswers() {
        const answerElements = document.querySelectorAll('.question-answer');
        let allAnswered = true;
        currentAnswers = {};
        
        answerElements.forEach((el, index) => {
            const answer = el.value.trim();
            if (!answer) {
                el.classList.add('is-invalid');
                allAnswered = false;
            } else {
                el.classList.remove('is-invalid');
                currentAnswers[index] = answer;
            }
        });
        
        return allAnswered;
    }
    
    /**
     * Genera el prompt de razonamiento
     * @function generateReasoningPrompt
     * @description Solicita al servidor la creación de un prompt optimizado
     */
    function generateReasoningPrompt() {
        // Mostrar indicador de carga
        promptPreview.innerHTML = `
            <div class="text-center py-4">
                <div class="spinner-border text-primary" role="status">
                    <span class="visually-hidden">Cargando...</span>
                </div>
                <p class="mt-2">Generando el prompt óptimo para tu solicitud...</p>
            </div>
        `;
        
        // Construir el contexto con las respuestas
        let contextData = {
            topic: currentTopic,
            answers: currentAnswers,
            questions: currentQuestions
        };
        
        // Enviar al servidor para generar el prompt adaptado
        fetch('/api/generar-prompt-razonamiento', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(contextData)
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                // Actualizar con el prompt generado por el servidor
                currentPrompt = data.prompt;
                formattedPrompt = data.prompt;
                
                // Renderizar en el preview
                promptPreview.innerHTML = marked.parse(currentPrompt);
                
                // Actualizar contador de tokens
                tokenCount.textContent = data.token_count || Math.floor(currentPrompt.length / 4);
            } else {
                console.error('Error al generar prompt:', data.error);
                showAlert('Hubo un problema al generar el prompt. Por favor, intenta de nuevo.');
                
                // Generar un prompt de respaldo usando la plantilla base
                generateFallbackPrompt();
            }
        })
        .catch(error => {
            console.error('Error en la solicitud:', error);
            showAlert('Error al comunicarse con el servidor. Generando prompt básico.');
            
            // Generar un prompt de respaldo usando la plantilla base
            generateFallbackPrompt();
        });
    }
    
    /**
     * Genera un prompt de respaldo en caso de error
     * @function generateFallbackPrompt
     * @description Crea un prompt básico usando la plantilla predefinida
     */
    function generateFallbackPrompt() {
        // Construir el prompt basado en el tema y las respuestas
        let contextSection = `# Contexto\n\n`;
        contextSection += `**Tema principal**: ${currentTopic}\n\n`;
        
        // Agregar todas las respuestas disponibles
        Object.keys(currentAnswers).forEach(index => {
            const questionIndex = parseInt(index);
            if (currentQuestions[questionIndex]) {
                contextSection += `**${currentQuestions[questionIndex].replace('?', '')}**: ${currentAnswers[index]}\n\n`;
            }
        });
        
        // Combinar con la plantilla base
        currentPrompt = basePromptTemplate.replace('[PROBLEMA]', contextSection);
        
        // Crear versión formateada
        formattedPrompt = currentPrompt;
        
        // Renderizar en el preview
        promptPreview.innerHTML = marked.parse(currentPrompt);
        
        // Actualizar contador de tokens (simulado)
        tokenCount.textContent = Math.floor(currentPrompt.length / 4);
    }
    
    /**
     * Regenera el prompt con los mismos datos
     * @function regeneratePrompt
     * @description Solicita una nueva versión del prompt manteniendo la misma información
     */
    function regeneratePrompt() {
        regenerateBtn.innerHTML = '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Regenerando...';
        regenerateBtn.disabled = true;
        
        // Simular llamada al API (esto debe reemplazarse con una llamada real)
        setTimeout(() => {
            generateReasoningPrompt(); // Regenerar con la misma información
            regenerateBtn.innerHTML = '<i class="bi bi-arrow-clockwise me-2"></i>Regenerar';
            regenerateBtn.disabled = false;
        }, 1500);
    }
    
    // ===================================
    // FUNCIONES DE UTILIDAD
    // ===================================
    
    /**
     * Abre el modal para editar el prompt
     * @function openEditModal
     * @param {string} prompt - Contenido actual del prompt
     * @description Permite al usuario editar manualmente el prompt generado
     */
    function openEditModal(prompt) {
        const modal = new bootstrap.Modal(document.getElementById('editPromptModal'));
        const textarea = document.getElementById('edit-prompt-textarea');
        const saveBtn = document.getElementById('save-edited-prompt-btn');
        
        textarea.value = prompt;
        modal.show();
        
        // Evento para guardar cambios
        saveBtn.onclick = function() {
            currentPrompt = textarea.value;
            formattedPrompt = textarea.value;
            promptPreview.innerHTML = marked.parse(currentPrompt);
            tokenCount.textContent = Math.floor(currentPrompt.length / 4);
            modal.hide();
        };
    }
    
    /**
     * Muestra la confirmación de copiado
     * @function showCopyConfirmation
     * @description Presenta feedback visual al copiar al portapapeles
     */
    function showCopyConfirmation() {
        const modal = new bootstrap.Modal(document.getElementById('copyModal'));
        modal.show();
        setTimeout(() => {
            modal.hide();
        }, 1500);
    }
    
    /**
     * Copia texto al portapapeles
     * @function copyToClipboard
     * @param {string} text - Texto a copiar
     * @description Utiliza la API del navegador para copiar contenido
     */
    function copyToClipboard(text) {
        navigator.clipboard.writeText(text).catch(err => {
            console.error('Error al copiar: ', err);
            showAlert('Error al copiar al portapapeles.');
        });
    }
    
    /**
     * Descarga el prompt como archivo de texto
     * @function downloadText
     * @param {string} text - Contenido a descargar
     * @param {string} filename - Nombre del archivo
     * @description Crea y descarga un archivo de texto con el prompt
     */
    function downloadText(text, filename) {
        const element = document.createElement('a');
        element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
        element.setAttribute('download', filename);
        element.style.display = 'none';
        document.body.appendChild(element);
        element.click();
        document.body.removeChild(element);
    }
    
    /**
     * Muestra alertas al usuario
     * @function showAlert
     * @param {string} message - Mensaje a mostrar
     * @description Presenta información importante en un modal
     */
    function showAlert(message) {
        const modal = new bootstrap.Modal(document.getElementById('announcementModal'));
        document.getElementById('announcementMessage').textContent = message;
        modal.show();
    }
    
    /**
     * Carga información sobre limitaciones de uso
     * @function loadUsageInfo
     * @description Obtiene datos del servidor sobre el estado de uso del usuario
     */
    function loadUsageInfo() {
        fetch('/api/usage-info')
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    renderUsageInfo(data.usage_info);
                }
            })
            .catch(error => {
                console.error('Error al obtener información de uso:', error);
            });
    }
    
    /**
     * Renderiza información de uso en la interfaz
     * @function renderUsageInfo
     * @param {Object} usageInfo - Datos de uso del usuario
     * @description Presenta la información sobre límites de uso en la UI
     */
    function renderUsageInfo(usageInfo) {
        if (!usageInfo.is_limited && !usageInfo.using_custom_key) {
            usageInfoContainer.innerHTML = `
                <div class="alert alert-info d-flex align-items-center">
                    <i class="bi bi-info-circle-fill me-2"></i>
                    <div>
                        Tienes <strong>${usageInfo.remaining}</strong> solicitudes restantes en esta hora. 
                        El contador se reiniciará en <strong>${usageInfo.reset_time}</strong>.
                    </div>
                </div>
            `;
        } else if (usageInfo.is_limited) {
            usageInfoContainer.innerHTML = `
                <div class="alert alert-warning d-flex align-items-center">
                    <i class="bi bi-exclamation-triangle-fill me-2"></i>
                    <div>
                        Has alcanzado el límite de solicitudes por hora. El contador se reiniciará en <strong>${usageInfo.reset_time}</strong>.
                        Para uso ilimitado, configura tu <a href="/configuracion" class="alert-link">API Key personal</a>.
                    </div>
                </div>
            `;
        }
    }
}); 