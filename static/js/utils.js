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
            limited: data.usage.remaining <= 0,
            max: data.usage.max,
            has_promo: data.usage.has_promo
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
        const maxLimit = usageInfo.max || 10; // Obtener el límite máximo (10 o 30)
        const hasPromo = usageInfo.has_promo || false; // Verificar si hay código promocional activo
        
        if (usageInfo.limited || usageInfo.remaining <= 0) {
            messageClass = 'alert-danger';
            icon = 'bi-exclamation-triangle';
            message = `Has alcanzado el límite de ${maxLimit} usos por hora. Podrás realizar más solicitudes en: ${usageInfo.reset_time}`;
        } else if (usageInfo.remaining <= Math.max(3, maxLimit * 0.2)) { // Advertencia cuando queden 20% o menos de los usos
            messageClass = 'alert-warning';
            icon = 'bi-exclamation-circle';
            message = `Atención: Te quedan solo ${usageInfo.remaining} usos para esta hora.`;
        } else {
            icon = 'bi-lightning';
            message = `Usos disponibles: ${usageInfo.remaining}/${maxLimit} para esta hora.`;
            
            // Añadir badge de código promocional si está activo
            if (hasPromo) {
                message += ' <span class="badge bg-success ms-1">Código promocional activo</span>';
            }
        }
        
        usageContainer.innerHTML = `<div class="row"><div class="col-12 col-md-10 col-lg-8 mx-auto"><div class="alert ${messageClass}"><i class="bi ${icon} me-2"></i>${message}</div></div></div>`;
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
                    limited: usageInfo.limited,
                    max: usageInfo.max,
                    has_promo: usageInfo.has_promo
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