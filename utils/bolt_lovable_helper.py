"""
Módulo para la generación de prompts especializados para plataformas Bolt/Lovable.
Contiene funciones para transformar contenido de frameworks en prompts estructurados
para conseguir los mejores resultados en estas plataformas.
"""

from utils.openai_helper import optimize_prompt, DEFAULT_MODEL, PREMIUM_MODEL
from utils.prompt_formatter import format_prompt_markdown
import os
from console import console

# Estructura de prompt para Bolt/Lovable basada en los frameworks existentes
BOLT_LOVABLE_TEMPLATE = """
# Proyecto Web Detallado: {title}

## Resumen Ejecutivo
{summary}

## Objetivos del Proyecto
{goals}

## Público Objetivo
{target_audience}

## Alcance del Proyecto
{scope}

## Requisitos Funcionales
{functional_requirements}

## Requisitos No Funcionales
{non_functional_requirements}

## Diseño y Experiencia de Usuario
{ux_design}

## Tecnologías y Stack
{tech_stack}

## Integraciones Necesarias
{integrations}

## Calendario y Plazos
{timeline}

## Presupuesto Estimado
{budget}

## Métricas de Éxito
{success_metrics}

## Consideraciones Adicionales
{additional_considerations}

## Estructura de Contenido
{content_structure}

## Referencias y Competencia
{references}
"""

def generate_bolt_lovable_prompt(framework_data, user_api_key=None):
    """
    Genera un prompt completo y estructurado para plataformas Bolt/Lovable
    basado en los datos de un framework existente.
    
    Args:
        framework_data (dict): Datos del framework seleccionado
        user_api_key (str, optional): API key del usuario para usar el modelo premium
        
    Returns:
        dict: Contiene el prompt generado, éxito de la operación y posibles errores
    """
    try:
        # Determinar modelo a usar
        model = PREMIUM_MODEL if user_api_key else DEFAULT_MODEL
        api_key = user_api_key or os.environ.get('OPENAI_API_KEY')
        
        # Crear contexto para la generación basado en el framework proporcionado
        framework_context = "Datos del framework seleccionado:\n"
        for key, value in framework_data.items():
            if key != 'framework_type':
                framework_context += f"- {key}: {value}\n"
                
        # Objetivo de desarrollo web para el sistema Bolt/Lovable
        prompt_context = f"""
        Tu tarea es transformar la siguiente información de proyecto en un prompt completo y 
        estructurado para una plataforma de desarrollo web llamada Bolt/Lovable.
        
        {framework_context}
        
        Crea un documento estructurado y detallado que incluya TODOS los siguientes elementos:
        
        1. Título claro y descriptivo del proyecto
        2. Resumen ejecutivo (1-2 párrafos)
        3. Objetivos específicos del proyecto (mínimo 3)
        4. Descripción detallada del público objetivo
        5. Alcance exacto del proyecto (qué incluye y qué no)
        6. Requisitos funcionales completos (mínimo 5)
        7. Requisitos no funcionales (rendimiento, seguridad, accesibilidad)
        8. Diseño y experiencia de usuario deseada (estilo, sensación, referencias)
        9. Stack tecnológico recomendado
        10. Integraciones necesarias con otros sistemas
        11. Calendario y plazos de desarrollo realistas
        12. Presupuesto estimado con desglose
        13. Métricas para medir el éxito del proyecto
        14. Consideraciones especiales o requisitos únicos
        15. Estructura de contenido propuesta
        16. Referencias de sitios competidores o inspiración
        
        Sé extremadamente detallado y específico en cada sección. No utilices generalidades.
        Incluye datos concretos, números y especificaciones siempre que sea posible.
        """
        
        console.info(f"Generando prompt Bolt/Lovable usando el modelo {model}")
        
        # Generar contenido para cada sección del template
        generated_content = optimize_prompt("bolt_lovable", {"context": prompt_context})
        
        # Formatear el contenido generado en markdown
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
    Analiza un texto de prompt y extrae las secciones estructuradas
    
    Args:
        prompt_text (str): Texto del prompt generado
        
    Returns:
        dict: Diccionario con las secciones extraídas
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