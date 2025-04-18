// Razonadores.js - Lógica de la página de razonamiento
document.addEventListener('DOMContentLoaded', function() {
    // Elementos del DOM
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
    
    // Variables para almacenar datos
    let currentTopic = '';
    let currentQuestions = [];
    let currentAnswers = {};
    let currentPrompt = '';
    let formattedPrompt = '';
    
    // Ejemplo de prompt base para razonamiento profundo
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
    
    // Cargar información de uso
    loadUsageInfo();
    
    // Evento para analizar el tema
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
    
    // Evento para volver al formulario inicial
    backToTopicBtn.addEventListener('click', function() {
        refinementQuestions.classList.add('d-none');
        initialForm.classList.remove('d-none');
    });
    
    // Evento para generar el prompt
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
    
    // Eventos para botones de acción del prompt
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
    
    // Función para generar preguntas basadas en el tema
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
    
    // Función para renderizar las preguntas en el DOM
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
    
    // Función para recolectar las respuestas
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
    
    // Función para generar el prompt de razonamiento
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
    
    // Función para generar un prompt de respaldo en caso de error
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
    
    // Función para regenerar el prompt
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
    
    // Función para abrir el modal de edición
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
    
    // Función para mostrar la confirmación de copiado
    function showCopyConfirmation() {
        const modal = new bootstrap.Modal(document.getElementById('copyModal'));
        modal.show();
        setTimeout(() => {
            modal.hide();
        }, 1500);
    }
    
    // Función para copiar al portapapeles
    function copyToClipboard(text) {
        navigator.clipboard.writeText(text).catch(err => {
            console.error('Error al copiar: ', err);
            showAlert('Error al copiar al portapapeles.');
        });
    }
    
    // Función para descargar archivo de texto
    function downloadText(text, filename) {
        const element = document.createElement('a');
        element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
        element.setAttribute('download', filename);
        element.style.display = 'none';
        document.body.appendChild(element);
        element.click();
        document.body.removeChild(element);
    }
    
    // Función para mostrar alertas
    function showAlert(message) {
        const modal = new bootstrap.Modal(document.getElementById('announcementModal'));
        document.getElementById('announcementMessage').textContent = message;
        modal.show();
    }
    
    // Función para cargar información de uso
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
    
    // Función para renderizar información de uso
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