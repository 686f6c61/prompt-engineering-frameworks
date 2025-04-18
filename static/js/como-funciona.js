// Script to auto-generate "Ver más" buttons for frameworks without one
// Extracted from inline script in como_funciona.html

document.addEventListener('DOMContentLoaded', function() {
  // Inicializar los botones de "Ver más" en las tarjetas si no existen
  document.querySelectorAll('.frameworks-section .card-body').forEach(function(body) {
    if (!body.querySelector('.btn-outline-primary')) {
      var title = body.querySelector('.card-title').textContent.trim();
      var frameworkName = title.split('.')[1].trim().split(' ')[0];
      
      // Crear un botón con solo el icono del ojo
      var btn = document.createElement('button');
      btn.className = 'btn btn-outline-primary btn-sm framework-details';
      btn.innerHTML = '<i class="bi bi-eye"></i>';
      
      // Buscar el nombre del archivo correspondiente
      let frameworkFileName = '';
      
      // Mapa para relacionar nombres de frameworks con sus respectivos archivos
      const frameworkMap = {
        'RTF': 'RTF-Rol-Tarea-Formato',
        'PARA': 'PARA-Problema-Aproximacion-Razon-Accion',
        'SMART': 'SMART-Especifico-Medible-Alcanzable-Relevante-Temporal',
        'ERQ': 'ERQ-Experiencia-Requisitos-Cualificaciones',
        'CODE': 'CODE-Contexto-Objetivo-Detalles-Ejemplos',
        'PROS': 'PROS-Perspectiva-Requisitos-Resultado-Solucion',
        'TEAM': 'TEAM-Tarea-Entorno-Aproximacion-Metricas',
        'IDEA': 'IDEA-Identificar-Definir-Ejecutar-Analizar',
        'CARE': 'CARE-Contexto-Accion-Resultado-Ejemplo',
        'RISE': 'RISE-Relevancia-Informacion-Solucion-Evaluacion',
        'LOGIC': 'LOGIC-Diseno-Objetivo-Directrices-Implementacion-Criterios',
        'SCOPE': 'SCOPE-Situacion-Necesidad-Obstaculos-Plan-Evaluacion',
        'FOCUS': 'FOCUS-Marco-Objetivo-Restricciones-Comprension-Solucion',
        'CLARITY': 'CLARITY-Contexto-Limitaciones-Aproximacion-Requisitos-Implementacion-Cronograma-Rendimiento',
        'EXPERT': 'EXPERT-Experiencia-Contexto-Proposito-Ejecucion-Resultados-Pruebas',
        'GUIDE': 'GUIDE-Meta-Usuario-Implementacion-Entrega-Evaluacion',
        'PATH': 'PATH-Proposito-Aproximacion-Objetivo-Horizonte',
        'LEARN': 'LEARN-Nivel-Experiencia-Aproximacion-Recursos-SiguientesPasos',
        'SOLVE': 'SOLVE-Situacion-Opciones-Limitaciones-Verificacion-Ejecucion',
        'PRIME': 'PRIME-Problema-Investigacion-Implementacion-Monitoreo-Evaluacion',
        'ADAPT': 'ADAPT-Analisis-Diseno-Aproximacion-Progreso-Pruebas',
        'BUILD': 'BUILD-LineaBase-Entendimiento-Implementacion-Aprendizaje-Entrega',
        'CRAFT': 'CRAFT-Contexto-Requisitos-Aproximacion-Funcionalidades-Pruebas',
        'SCALE': 'SCALE-Estrategia-Capacidades-Accion-Aprendizaje-Evolucion',
        'THINK': 'THINK-Tema-Historia-Insights-SiguientesPasos-Conocimiento',
        'GROW': 'GROW-Meta-Realidad-Opciones-Camino',
        'QUEST': 'QUEST-Pregunta-Entendimiento-Exploracion-Solucion-Pruebas',
        'DRIVE': 'DRIVE-Direccion-Recursos-Implementacion-Validacion-Evolucion',
        'SHAPE': 'SHAPE-Situacion-Historia-Analisis-Plan-Ejecucion',
        'REACH': 'REACH-Requisitos-Evaluacion-Aproximacion-Completitud-Handover',
        'BLEND': 'BLEND-Base-Aprendizaje-Evolucion-Navegacion-Entrega',
        'SPARK': 'SPARK-Estrategia-Planificacion-Accion-Resultados-Conocimiento',
        'PULSE': 'PULSE-Proposito-Entendimiento-Aprendizaje-Estrategia-Evaluacion',
        'FAST': 'FAST-Enfoque-Audiencia-Alcance-Tono',
        'T-A-G': 'TAG-Tarea-Accion-Meta',
        'B-A-B': 'BAB-Antes-Despues-Puente',
        'P-E-A-S': 'PEAS-Proposito-Resultado-Audiencia-Estilo',
        'S-T-A-R': 'STAR-Situacion-Tarea-Accion-Resultado',
        'Q-C-Q-A': 'QCQA-Pregunta-Contexto-Calificacion-Formato',
        'A-I-D-A': 'AIDA-Atencion-Interes-Deseo-Accion',
        'L-E-A-P': 'LEAP-Nivel-Expectativas-Aproximacion-Parametros',
        'S-P-I-N': 'SPIN-Situacion-Problema-Implicacion-Necesidad',
        'D-E-S-I-G-N': 'DESIGN-Definir-Explorar-Alcance-Idear-Guiar-Reducir',
        'V-I-S-I-O-N': 'VISION-Visualizar-Identificar-Estructurar-Implementar-Optimizar-Navegar',
        'I-M-P-A-C-T': 'IMPACT-Intencion-Mensaje-Proposito-Audiencia-Canal-Tiempo',
        'M-A-S-T-E-R': 'MASTER-Mision-Aproximacion-Estrategia-Tacticas-Ejecucion-Revision',
        'P-O-W-E-R': 'POWER-Problema-Resultado-PorQue-Ejecucion-Recursos'
      };
      
      // Obtener el nombre del archivo del framework
      frameworkFileName = frameworkMap[frameworkName];
      
      if (frameworkFileName) {
        btn.setAttribute('data-framework', frameworkFileName);
        body.appendChild(btn);
      }
    }
  });

  // Manejar los botones "Ver más" de la tabla de frameworks
  const frameworkModal = new bootstrap.Modal(document.getElementById('frameworkModal'));
  const frameworkContent = document.getElementById('frameworkContent');
  const modalTitle = document.getElementById('frameworkModalLabel');

  // Convertir el texto markdown a HTML
  function markdownToHtml(markdown) {
    // Implementación básica para convertir formatos markdown a HTML
    let html = markdown
      // Convertir encabezados
      .replace(/^# (.*$)/gm, '<h1>$1</h1>')
      .replace(/^## (.*$)/gm, '<h2>$1</h2>')
      .replace(/^### (.*$)/gm, '<h3>$1</h3>')
      // Convertir listas
      .replace(/^\- (.*$)/gm, '<li>$1</li>')
      .replace(/(<li>.*<\/li>\n)+/gm, '<ul>$&</ul>')
      // Convertir negrita
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      // Convertir bloques de código
      .replace(/```([\s\S]*?)```/g, '<pre><code>$1</code></pre>')
      // Convertir saltos de línea
      .replace(/\n/g, '<br>');

    // Limpiar los <br> adicionales dentro de las etiquetas
    html = html
      .replace(/<\/h1><br>/g, '</h1>')
      .replace(/<\/h2><br>/g, '</h2>')
      .replace(/<\/h3><br>/g, '</h3>')
      .replace(/<\/ul><br>/g, '</ul>')
      .replace(/<\/pre><br>/g, '</pre>');

    return html;
  }

  // Función para cargar el contenido del framework
  async function loadFrameworkContent(frameworkFileName) {
    try {
      frameworkContent.innerHTML = `
        <div class="d-flex justify-content-center">
          <div class="spinner-border text-primary" role="status">
            <span class="visually-hidden">Cargando...</span>
          </div>
        </div>
        <p class="text-center">Cargando información del framework...</p>
      `;

      const response = await fetch(`/frameworks/${frameworkFileName}.txt`);
      
      if (!response.ok) {
        throw new Error(`Error al cargar el framework: ${response.statusText}`);
      }
      
      const text = await response.text();
      
      // Formatear el contenido usando markdown
      const formattedContent = markdownToHtml(text);
      
      // Agregar clases de Bootstrap para mejorar el aspecto
      const enhancedContent = formattedContent
        .replace(/<h1>/g, '<h1 class="mb-4 text-primary">')
        .replace(/<h2>/g, '<h2 class="mt-4 mb-3 text-secondary">')
        .replace(/<h3>/g, '<h3 class="mt-3 mb-2">')
        .replace(/<pre>/g, '<pre class="bg-light p-3 rounded">')
        .replace(/<ul>/g, '<ul class="list-group list-group-flush mb-3">') 
        .replace(/<li>/g, '<li class="list-group-item">');
      
      frameworkContent.innerHTML = enhancedContent;
      
      // Extraer el nombre del framework para el título modal
      const frameworkName = frameworkFileName.split('-')[0];
      modalTitle.textContent = `Framework ${frameworkName}`;
      
    } catch (error) {
      console.error('Error:', error);
      frameworkContent.innerHTML = `
        <div class="alert alert-danger" role="alert">
          <i class="bi bi-exclamation-triangle-fill me-2"></i>
          Error al cargar la información del framework. Por favor, inténtalo de nuevo.
        </div>
      `;
    }
  }

  // Agregar event listeners a todos los botones de framework-details
  document.querySelectorAll('.framework-details').forEach(button => {
    button.addEventListener('click', function() {
      const frameworkFileName = this.getAttribute('data-framework');
      loadFrameworkContent(frameworkFileName);
      frameworkModal.show();
    });
  });

  // Función para exportar tabla a CSV
  const downloadCsvBtn = document.getElementById('downloadCsvBtn');
  if (downloadCsvBtn) {
    downloadCsvBtn.addEventListener('click', function() {
      exportTableToCSV('frameworks.csv');
    });
  }
});

// Función para mostrar detalles del framework en modal
function showFrameworkDetails(frameworkFile) {
  const frameworkModal = new bootstrap.Modal(document.getElementById('frameworkModal'));
  const frameworkContent = document.getElementById('frameworkContent');
  
  // Mostrar estado de carga
  frameworkContent.innerHTML = `
    <div class="d-flex justify-content-center">
      <div class="spinner-border text-primary" role="status">
        <span class="visually-hidden">Cargando...</span>
      </div>
    </div>
    <p class="text-center">Cargando información del framework...</p>
  `;
  
  frameworkModal.show();
  
  // Cargar el contenido del framework
  fetch(`/frameworks/${frameworkFile}.txt`)
    .then(response => {
      if (!response.ok) {
        throw new Error(`Error al cargar el framework: ${response.statusText}`);
      }
      return response.text();
    })
    .then(text => {
      // Formatear el contenido como Markdown
      frameworkContent.innerHTML = marked.parse(text);
    })
    .catch(error => {
      console.error('Error:', error);
      frameworkContent.innerHTML = `
        <div class="alert alert-danger" role="alert">
          <i class="bi bi-exclamation-triangle-fill me-2"></i>
          Error al cargar la información del framework. Por favor, inténtalo de nuevo.
        </div>
      `;
    });
}

// Función para exportar tabla a CSV
function exportTableToCSV(filename) {
  const table = document.getElementById('frameworksTable');
  if (!table) return;
  
  let csvContent = [];
  
  // Obtener encabezados
  const headers = [];
  const headerCells = table.querySelectorAll('thead th');
  headerCells.forEach(cell => {
    // Quitar los iconos y obtener solo el texto
    let headerText = cell.textContent.trim();
    // Quitar el último encabezado (columna de acciones)
    if (headerText !== 'Acción') {
      headers.push(headerText);
    }
  });
  csvContent.push(headers.join(','));
  
  // Obtener datos de las filas
  const rows = table.querySelectorAll('tbody tr');
  rows.forEach(row => {
    const rowData = [];
    const cells = row.querySelectorAll('td');
    // Ignorar la última celda (botón de acción)
    for (let i = 0; i < cells.length - 1; i++) {
      // Limpiar el texto y formatear correctamente para CSV
      let cellText = cells[i].textContent.trim();
      // Agregar comillas si contiene comas
      if (cellText.includes(',')) {
        cellText = `"${cellText}"`;
      }
      rowData.push(cellText);
    }
    csvContent.push(rowData.join(','));
  });
  
  // Crear y descargar el archivo CSV
  const csvString = csvContent.join('\n');
  const blob = new Blob([csvString], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  
  link.setAttribute('href', url);
  link.setAttribute('download', filename);
  link.style.visibility = 'hidden';
  
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
