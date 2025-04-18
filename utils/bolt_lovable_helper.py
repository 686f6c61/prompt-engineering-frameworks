"""
Módulo para la generación de prompts especializados para plataformas Bolt/Lovable.
Contiene funciones para transformar contenido de frameworks en prompts estructurados
para conseguir los mejores resultados en estas plataformas.

Este módulo proporciona:
1. Una plantilla de prompt estructurada para proyectos Bolt/Lovable
2. Funciones para generar prompts completos basados en los frameworks existentes
3. Funcionalidad para analizar y extraer secciones de los prompts generados
4. Transformación de datos de frameworks a formatos optimizados para desarrollo web

Implementa un sistema de dos etapas:
- Primero convierte los datos del framework a un contexto estructurado
- Luego usa ese contexto para generar un prompt completo y detallado
"""

from utils.openai_helper import optimize_prompt, DEFAULT_MODEL, PREMIUM_MODEL
from utils.prompt_formatter import format_prompt_markdown
import os
from console import console

# ===================================
# PLANTILLAS Y CONSTANTES
# ===================================

"""
Estructura de prompt para Bolt/Lovable basada en los frameworks existentes.
Esta plantilla define las secciones principales que debe contener un prompt
completo para desarrollo web utilizando plataformas Bolt/Lovable.

Variables de la plantilla:
- project_name: Nombre del proyecto web
- title: Título descriptivo del proyecto
- project_id: Identificador único del proyecto
- launch_date: Fecha estimada de lanzamiento
- summary: Resumen ejecutivo del proyecto
- goals: Objetivos SMART del proyecto
- audience_analysis: Análisis detallado del público objetivo
- visual_specs: Especificaciones visuales (colores, tipografías, etc)
- interactions: Definición de interacciones y comportamientos
- components: Especificación de componentes UI principales
- responsive: Estrategia responsive y breakpoints
- scope: Alcance y límites del proyecto
- functional_requirements: Requisitos funcionales detallados
- content_architecture: Estructura de contenido y navegación
- tech_specs: Especificaciones técnicas y stack
- interactive_features: Funcionalidades interactivas especiales
- competitive_analysis: Análisis de competidores
- seo_strategy: Estrategia SEO y palabras clave
- content: Directrices de contenido textual y multimedia
"""
BOLT_LOVABLE_TEMPLATE = """
# {project_name}

## Información del Proyecto
- **Nombre del Proyecto**: {project_name}
- **Título Descriptivo**: {title}
- **Código/Identificador del Proyecto**: {project_id}
- **Fecha Estimada de Lanzamiento**: {launch_date}

## Resumen Ejecutivo
{summary}

## Objetivos del Proyecto
{goals}

## Análisis de Audiencia
{audience_analysis}

## Especificaciones Visuales Detalladas
{visual_specs}

## Interacciones y Comportamientos
{interactions}

## Componentes Específicos
{components}

## Responsive y Adaptación
{responsive}

## Alcance del Proyecto
{scope}

## Requisitos Funcionales
{functional_requirements}

## Arquitectura de Contenido
{content_architecture}

## Especificaciones Técnicas
{tech_specs}

## Funcionalidades Interactivas Específicas
{interactive_features}

## Análisis Competitivo
{competitive_analysis}

## SEO y Estrategia de Visibilidad
{seo_strategy}

## Contenido Textual y Multimedia
{content}
"""

# ===================================
# FUNCIONES PRINCIPALES
# ===================================

def generate_bolt_lovable_prompt(framework_data, user_api_key=None):
    """
    Genera un prompt completo y estructurado para plataformas Bolt/Lovable
    basado en los datos de un framework existente.
    
    Esta función transforma información de frameworks genéricos en un prompt
    altamente especializado para desarrollo web con Bolt/Lovable, incluyendo
    especificaciones visuales, de interacción, y técnicas detalladas.
    
    Args:
        framework_data (dict): Datos del framework seleccionado con campos como
                               role, task, format, context, etc. según el framework
        user_api_key (str, optional): API key del usuario para usar el modelo premium.
                                      Si no se proporciona, se usa el modelo por defecto.
        
    Returns:
        dict: Diccionario con los siguientes campos:
            - success (bool): Indica si la generación fue exitosa
            - prompt (str): Prompt formateado en markdown listo para usar
            - raw_prompt (str): Versión sin formato del prompt generado
            - error (str, optional): Mensaje de error si success es False
            
    Raises:
        Exception: Si ocurre algún error durante la generación del prompt
    """
    try:
        # Determinar modelo a usar basado en si el usuario proporcionó su API key
        model = PREMIUM_MODEL if user_api_key else DEFAULT_MODEL
        api_key = user_api_key or os.environ.get('OPENAI_API_KEY')
        
        # Crear contexto para la generación basado en el framework proporcionado
        # Extraemos todos los campos excepto framework_type para usarlos como input
        framework_context = "Datos del framework seleccionado:\n"
        for key, value in framework_data.items():
            if key != 'framework_type':
                framework_context += f"- {key}: {value}\n"
                
        # Objetivo de desarrollo web para el sistema Bolt/Lovable
        # Este prompt extenso define la estructura y expectativas para 
        # un prompt de desarrollo web completo y detallado
        prompt_context = f"""
        # Prompt Generador de Especificaciones para Bolt/Lovable

        Tu tarea es transformar la siguiente información de proyecto en un prompt completo y estructurado para una plataforma de desarrollo web llamada Bolt/Lovable.

        {framework_context}

        ## Instrucciones Generales
        - Sé extremadamente detallado y específico en cada sección
        - Proporciona ejemplos visuales concretos (URLs o descripciones precisas)
        - Define comportamientos exactos para cada elemento interactivo
        - Incluye medidas precisas (en px, rem, vh/vw) para los componentes principales
        - Especifica animaciones y transiciones deseadas con su timing

        ## Estructura del Documento

        ### 1. Información del Proyecto
        - **Nombre del Proyecto**: [Nombre corto y memorable]
        - **Título Descriptivo**: [Título que explique claramente el propósito del proyecto]
        - **Código/Identificador del Proyecto**: [Si aplica]
        - **Fecha Estimada de Lanzamiento**: [Fecha objetivo]

        ### 2. Resumen Ejecutivo
        - Proporciona 2-3 párrafos concisos que expliquen:
          - El propósito principal del proyecto
          - El problema que resuelve
          - La propuesta de valor única
          - Resultados esperados medibles

        ### 3. Objetivos del Proyecto
        - Lista mínimo 5 objetivos SMART (Específicos, Medibles, Alcanzables, Relevantes y con Tiempo definido)
        - Para cada objetivo, define:
          - Métrica de éxito concreta
          - Plazo de tiempo para alcanzarlo
          - Prioridad (Alta/Media/Baja)

        ### 4. Análisis de Audiencia
        - **Perfil Demográfico Detallado**: Edad, ubicación, ocupación, nivel de ingresos
        - **Perfiles de Usuario Primarios**: Mínimo 2 personas ficticias con nombres, historias y necesidades
        - **Comportamientos Digitales**: Dispositivos utilizados, tiempo en línea, preferencias técnicas
        - **Puntos de Dolor**: Problemas específicos que el proyecto resuelve para esta audiencia
        - **Expectativas del Usuario**: Lo que esperan lograr con el producto/servicio

        ### 5. Especificaciones Visuales Detalladas
        - **Estilo Visual Principal**: 
          - Minimalista/Maximalista/Flat/Neomorfismo/etc.
          - Referencias visuales exactas (URLs o imágenes)
          - Ejemplos de sitios con estética similar
        - **Paleta de Colores**: 
          - Color primario: [código HEX] - Usar en [elementos específicos]
          - Color secundario: [código HEX] - Usar en [elementos específicos]
          - Color de acento: [código HEX] - Usar en [elementos específicos]
          - Colores de fondo: [códigos HEX] - Usar en [secciones específicas]
          - Gradientes específicos: [de-a] - Usar en [elementos específicos]
        - **Tipografía**:
          - Fuente para títulos: [nombre exacto] - Tamaños: [H1: Xpx, H2: Ypx, etc.]
          - Fuente para texto: [nombre exacto] - Tamaño: [Xpx] - Interlineado: [Ypx]
          - Jerarquía tipográfica completa con ejemplos
          - Peso de fuente para cada elemento (400, 500, 700, etc.)
        - **Espaciado y Grid**:
          - Sistema de grid: [12 columnas/otro] - Gutters: [Xpx]
          - Márgenes exteriores: [Xpx en móvil, Ypx en desktop]
          - Padding de secciones: [Xpx en móvil, Ypx en desktop]
          - Espaciado entre elementos: [sistema específico]
        - **Elementos UI**:
          - Botones: [dimensiones exactas, estados, bordes, sombras]
          - Campos de formulario: [altura, estilos de borde, comportamiento focus]
          - Tarjetas/Cards: [dimensiones, sombras, bordes]
          - Iconografía: [estilo, tamaños, consistencia]
          - Imágenes: [proporciones, tratamiento, filtros]

        ### 6. Interacciones y Comportamientos
        - **Navegación Principal**:
          - Tipo: [sticky/fixed/estándar]
          - Comportamiento en scroll: [descripción exacta]
          - Menú móvil: [tipo de animación, comportamiento]
          - Estados activos: [descripción visual]
        - **Animaciones y Transiciones**:
          - Animaciones de entrada: [para cada sección o elemento]
          - Hover states: [comportamiento específico para links, botones, cards]
          - Transiciones entre páginas: [tipo, duración, easing]
          - Micro-interacciones: [detalles específicos]
        - **Scrolling**:
          - Comportamiento de scroll: [suave/estándar]
          - Efectos parallax: [en qué elementos, intensidad]
          - Scroll snapping: [si aplica, en qué secciones]
          - Animaciones basadas en scroll: [descripción detallada]
        - **Formularios**:
          - Validación: [visual, timing, mensajes]
          - Comportamiento de envío: [animación, feedback]
          - Estados de error: [visualización específica]
          - Autocompletado: [comportamiento deseado]

        ### 7. Componentes Específicos
        - **Hero Section**:
          - Altura: [Xvh en desktop, Yvh en móvil]
          - Contenido: [texto, imagen, video, animación]
          - Comportamiento: [parallax, video autoplay, slider]
          - Call to action: [ubicación, estilo, animación]
        - **Navegación**:
          - Estructura exacta del menú
          - Comportamiento en diferentes breakpoints
          - Animaciones de despliegue
          - Elementos interactivos (dropdowns, mega-menús)
        - **Footer**:
          - Secciones y distribución
          - Elementos interactivos
          - Adaptación responsiva
          - Tratamiento visual específico
        - **Listados de Contenido**:
          - Formato de visualización (grid, lista, masonry)
          - Número de columnas por breakpoint
          - Paginación/Carga infinita/Load more
          - Filtrado y ordenación
        - **Páginas de Detalle**:
          - Estructura específica
          - Elementos destacados
          - Navegación interna
          - Secciones relacionadas

        ### 8. Responsive y Adaptación
        - **Breakpoints Específicos**:
          - Mobile: [Xpx] - Comportamiento: [descripción]
          - Tablet: [Xpx] - Comportamiento: [descripción]
          - Desktop: [Xpx] - Comportamiento: [descripción]
          - Large Desktop: [Xpx] - Comportamiento: [descripción]
        - **Adaptaciones por Dispositivo**:
          - Elementos que cambian/desaparecen en móvil
          - Reorganización de secciones
          - Cambios de navegación
          - Optimización de imágenes
        - **Touch vs. Mouse**:
          - Consideraciones específicas para tactil
          - Tamaños de áreas táctiles
          - Gestos específicos soportados
          - Hover states alternos para móvil

        ### 9. Alcance del Proyecto
        - **Incluido en el Alcance**: Lista detallada de componentes, páginas y funcionalidades
        - **Explícitamente Fuera del Alcance**: Lo que NO se desarrollará en esta fase
        - **Fases de Implementación**: Si aplica, división del proyecto en etapas con entregables específicos
        - **Dependencias Críticas**: Sistemas externos, APIs o servicios necesarios

        ### 10. Requisitos Funcionales
        - Lista mínimo 8 requisitos funcionales numerados y priorizados
        - Para cada requisito específica:
          - Descripción detallada del comportamiento esperado
          - Criterios de aceptación medibles
          - Casos de uso principales
          - Dependencias técnicas
          - Nivel de complejidad estimado (Bajo/Medio/Alto)

        ### 11. Arquitectura de Contenido
        - **Mapa del Sitio**: Estructura jerárquica completa de páginas y secciones
        - **Tipos de Contenido**: Definición de cada tipo (blogs, productos, servicios, etc.)
        - **Modelos de Datos**: Campos y relaciones entre diferentes tipos de contenido
        - **Estrategia de Contenido**: Frecuencia de actualización, directrices editoriales
        - **Estructura de URL**: Patrones específicos para cada tipo de contenido

        ### 12. Especificaciones Técnicas
        - **Stack Tecnológico Preferido**: Frameworks, lenguajes, bibliotecas específicas
        - **Integraciones Requeridas**: APIs, servicios externos, sistemas de pago, CRMs, etc.
        - **Consideraciones de Hosting**: Requisitos de servidor, CDN, balanceo de carga
        - **Arquitectura del Sistema**: Diagrama o descripción de componentes técnicos principales
        - **Rendimiento**: Métricas específicas (LCP, CLS, FID)

        ### 13. Funcionalidades Interactivas Específicas
        - **Carruseles/Sliders**:
          - Comportamiento exacto (velocidad, tipo de transición)
          - Controles (ubicación, estilo, comportamiento)
          - Autoplay [sí/no] - Intervalo [X segundos]
          - Comportamiento responsivo
        - **Modales/Popups**:
          - Triggers específicos
          - Animación de entrada/salida
          - Comportamiento de overlay
          - Accesibilidad y keyboard navigation
        - **Acordeones/Tabs**:
          - Estilo visual específico
          - Comportamiento de transición
          - Estados activos/inactivos
          - Configuración inicial (abierto/cerrado)
        - **Mapas y Ubicaciones**:
          - Proveedor (Google Maps, Mapbox, etc.)
          - Estilo visual del mapa
          - Markers personalizados
          - Interactividad y zoom

        ### 14. Análisis Competitivo
        - **Competidores Directos**: Mínimo 3 con URLs y análisis de fortalezas/debilidades
        - **Benchmarks de la Industria**: Estándares a alcanzar o superar
        - **Diferenciadores Clave**: Ventajas competitivas específicas a destacar
        - **Oportunidades Identificadas**: Brechas en el mercado que el proyecto puede aprovechar
        - **Elementos Visuales Inspiradores**: Específicamente de la competencia

        ### 15. SEO y Estrategia de Visibilidad
        - **Palabras Clave Primarias**: Lista priorizada con volumen de búsqueda
        - **Palabras Clave Secundarias**: Términos de apoyo y variaciones
        - **Meta Etiquetas**: Ejemplos para páginas principales (título, descripción, OG tags)
        - **Estructura de URLs**: Patrón recomendado
        - **Consideraciones Técnicas SEO**: Requisitos específicos de esquemas, velocidad, etc.
        - **Etiquetas de Estructura**: H1, H2, etc. y su uso específico

        ### 16. Contenido Textual y Multimedia
        - **Mensajes Clave**: Puntos de comunicación principales
        - **Textos para Secciones Críticas**: Copys exactos para homepage, landing pages, CTAs
        - **Tono de Voz**: Directrices específicas sobre cómo debe comunicarse la marca
        - **Terminología**: Glosario de términos específicos del sector o marca
        - **Contenido Multimedia**: Especificaciones para fotos, videos, audio (formatos, dimensiones, duración)
        
        Asegúrate de adaptar cada sección a las necesidades específicas del proyecto y proporcionar ejemplos concretos siempre que sea posible. El documento final debe servir como una guía completa y autónoma para el equipo de desarrollo de Bolt/Lovable, con énfasis especial en los aspectos visuales e interactivos que definirán la experiencia del usuario.
        """
        
        console.info(f"Generando prompt Bolt/Lovable usando el modelo {model}")
        
        # Generar contenido para cada sección del template
        # Utilizamos la función optimize_prompt del módulo openai_helper para
        # obtener resultados optimizados basados en el contexto proporcionado
        generated_content = optimize_prompt("bolt_lovable", {"context": prompt_context})
        
        # Formatear el contenido generado en markdown
        # Esto mejora la presentación y legibilidad del prompt
        formatted_result = format_prompt_markdown(generated_content)
        
        return {
            "success": True,
            "prompt": formatted_result,
            "raw_prompt": generated_content
        }
        
    except Exception as e:
        console.error(f"Error al generar prompt Bolt/Lovable: {str(e)}")
        return {
            "success": False,
            "error": f"Error al generar el prompt: {str(e)}"
        }

def parse_bolt_lovable_sections(prompt_text):
    """
    Analiza un texto de prompt y extrae las secciones estructuradas.
    
    Esta función toma un prompt completo y lo descompone en secciones
    basadas en los encabezados markdown (## para secciones y # para título).
    El resultado es un diccionario donde las claves son los nombres de las
    secciones y los valores son los contenidos correspondientes.
    
    Args:
        prompt_text (str): Texto del prompt generado en formato markdown
        
    Returns:
        dict: Diccionario con las secciones extraídas, donde:
            - Las claves son los nombres de las secciones (sin ##)
            - Los valores son los contenidos de texto de cada sección
            - La clave 'title' contiene el título principal del documento (con #)
            
    Ejemplo:
        Para un prompt como:
        ```
        # Mi Proyecto
        
        ## Sección 1
        Contenido 1
        
        ## Sección 2
        Contenido 2
        ```
        
        Retornará:
        {
            'title': 'Mi Proyecto',
            'Sección 1': 'Contenido 1',
            'Sección 2': 'Contenido 2'
        }
    """
    sections = {}
    current_section = None
    section_content = []
    
    for line in prompt_text.split('\n'):
        if line.startswith('## '):
            # Si hay una sección previa, guardarla
            if current_section:
                sections[current_section] = '\n'.join(section_content).strip()
                section_content = []
            
            # Inicio de nueva sección
            current_section = line[3:].strip()
        elif line.startswith('# '):
            # Es el título
            sections['title'] = line[2:].strip()
        else:
            # Agregar a la sección actual
            if current_section:
                section_content.append(line)
    
    # Guardar la última sección
    if current_section and section_content:
        sections[current_section] = '\n'.join(section_content).strip()
    
    return sections 