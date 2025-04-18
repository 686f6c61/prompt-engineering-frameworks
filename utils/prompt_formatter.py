"""
prompt_formatter.py - Utilidad para formateo de prompts

Módulo que proporciona funciones para transformar prompts en texto plano 
a formatos más estructurados y legibles en Markdown.

Este módulo permite:
1. Convertir texto plano de prompts a formatos Markdown estructurados
2. Mejorar la legibilidad visual de los prompts generados
3. Aplicar formato consistente a los encabezados y secciones
4. Preparar prompts para presentación o exportación

Los formateadores implementados mantienen la estructura semántica del prompt
original mientras añaden elementos visuales que facilitan su lectura y uso.
"""
import re

# ===================================
# FUNCIONES DE FORMATEO
# ===================================

def format_prompt_markdown(raw_prompt: str) -> str:
    """
    Convierte un prompt en texto plano con segmentos 'Clave: Valor' a Markdown estructurado.
    
    Esta función toma un prompt generado (posiblemente por un LLM) que contiene
    secciones con formato "Título: Contenido" y lo transforma añadiendo
    espaciado, negrita y otros elementos de Markdown para mejorar su legibilidad.
    
    Transformaciones aplicadas:
    - Inserta líneas en blanco antes de cada encabezado de sección
    - Convierte los encabezados a formato negrita con la sintaxis **Encabezado**:
    - Mantiene la estructura general y contenido del prompt original
    - Elimina espacios en blanco adicionales al inicio y final
    
    Args:
        raw_prompt (str): El texto del prompt sin formato, generalmente 
                          obtenido directamente de la respuesta de un LLM
    
    Returns:
        str: Versión formateada del prompt con sintaxis Markdown aplicada
    
    Ejemplo:
        >>> prompt = "Título: Este es un título.\\nContenido: Este es el contenido.\\nOtro Título: Más contenido."
        >>> print(format_prompt_markdown(prompt))
        **Título**: Este es un título.
        
        **Contenido**: Este es el contenido.
        
        **Otro Título**: Más contenido.
    """
    # Insert blank lines before each new section starting with TitleCase and colon
    # Busca patrones donde hay un punto seguido de espacio(s) y después un título
    # en formato TitleCase seguido de dos puntos
    formatted = re.sub(r"\.\s+(?=[A-Z][a-z]+:)", ".\n\n", raw_prompt)
    
    # Bold section headings
    # Convierte los encabezados a formato negrita utilizando la sintaxis **texto**
    # Busca líneas que comiencen con una palabra en TitleCase seguida de dos puntos
    formatted = re.sub(r"^([A-Z][a-zA-Z ]+):", r"**\1**:", formatted, flags=re.MULTILINE)
    
    # Elimina espacios en blanco adicionales al inicio y final 
    return formatted.strip()
