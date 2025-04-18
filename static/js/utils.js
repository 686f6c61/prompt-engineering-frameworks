/**
 * @file utils.js
 * @description Utilidades compartidas para toda la aplicación
 * @version 1.0.0
 *
 * Este módulo proporciona funcionalidades comunes que pueden ser utilizadas
 * por diferentes secciones de la aplicación, incluyendo:
 *
 * 1. Gestión de información de uso de la API
 * 2. Funciones de copiado y formateo
 * 3. Sistema de notificaciones
 * 4. Utilidades para manipulación de prompts
 */

// ===================================
// SISTEMA DE MONITOREO Y CUOTAS
// ===================================

/**
 * Actualiza información de uso basada en respuesta de API
 * @function updateUsageInfoFromResponse
 * @param {Object} data - Datos de respuesta que contienen información de uso
 * @description Extrae y muestra información de límites de uso desde respuesta de API
 */
function updateUsageInfoFromResponse(data) {
    if (data && data.usage) {
        updateUsageDisplay({
            remaining: data.usage.remaining,
            reset_time: data.usage.reset_time,
            limited: data.usage.remaining <= 0
        });
    }
}

/**
 * Renderizador de información de uso
 * @function updateUsageDisplay
 * @param {Object} usageInfo - Datos de uso actual
 * @description Actualiza la UI con información de cuotas y límites
 */
function updateUsageDisplay(usageInfo) {
    const usageContainer = document.getElementById('usage-info-container');
    
    if (!usageContainer) return;
    
    if (usageInfo.remaining !== undefined) {
        let messageClass = 'alert-info';
        let message = '';
        let icon = 'bi-info-circle';
        
        if (usageInfo.limited || usageInfo.remaining <= 0) {
            messageClass = 'alert-danger';
            icon = 'bi-exclamation-triangle';
            message = `Has alcanzado el límite de 10 usos por hora para GPT-3.5. Podrás realizar más solicitudes en: ${usageInfo.reset_time}`;
        } else if (usageInfo.remaining <= 3) {
            messageClass = 'alert-warning';
            icon = 'bi-exclamation-circle';
            message = `Atención: Te quedan solo ${usageInfo.remaining} usos de GPT-3.5 para esta hora.`;
        } else {
            icon = 'bi-lightning';
            message = `Usos disponibles de GPT-3.5: ${usageInfo.remaining}/10 para esta hora.`;
        }
        
        usageContainer.innerHTML = `<div class="row"><div class="col-12 col-md-10 col-lg-8 mx-auto"><div class="alert ${messageClass}"><i class="bi ${icon}"></i>${message}</div></div></div>`;
        usageContainer.style.display = 'block';
    } else {
        usageContainer.style.display = 'none';
    }
}

/**
 * Sistema de verificación de límites de uso
 * @function checkUsageLimit
 * @description Consulta API para obtener info actual sobre límites de uso
 */
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

/**
 * Sistema de notificaciones mediante modales
 * @function showAnnouncement
 * @param {string} title - Título del anuncio
 * @param {string} message - Mensaje detallado
 * @description Muestra notificaciones modales con formato consistente
 */
function showAnnouncement(title, message) {
    const modal = document.getElementById('announcementModal');
    const titleElement = document.getElementById('announcementTitle');
    const messageElement = document.getElementById('announcementMessage');
    
    titleElement.textContent = title;
    messageElement.textContent = message;
    
    const modalInstance = new bootstrap.Modal(modal);
    modalInstance.show();
}

/**
 * Muestra confirmación de copiado
 * @function showCopyConfirmation
 * @param {string} message - Mensaje de confirmación
 * @description Muestra un toast de confirmación al copiar al portapapeles
 */
function showCopyConfirmation(message) {
    const toastEl = document.getElementById('copyToast');
    const toastBody = document.getElementById('copy-toast-body');
    
    if (toastEl && toastBody) {
        toastBody.textContent = message;
        const toast = new bootstrap.Toast(toastEl);
        toast.show();
    } else {
        alert(message);
    }
}

// Exportar funciones para uso global
window.updateUsageInfoFromResponse = updateUsageInfoFromResponse;
window.updateUsageDisplay = updateUsageDisplay;
window.checkUsageLimit = checkUsageLimit;
window.showAnnouncement = showAnnouncement;
window.showCopyConfirmation = showCopyConfirmation; 