#!/usr/bin/env python
# -*- coding: utf-8 -*-

"""
Script para probar un framework específico.

Este script permite probar un framework concreto y genera un prompt 
utilizando los datos de prueba, guardando el resultado en la carpeta 'tests/results/'.

Uso:
    python tests/test_single_framework.py [nombre_framework]
    
Ejemplo:
    python tests/test_single_framework.py rtf
"""

import os
import sys
import json
from datetime import datetime
from pathlib import Path

# Añadir el directorio raíz al path para importar los módulos de la aplicación
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

# Importar las funciones necesarias
from utils.openai_helper import optimize_prompt, AVAILABLE_FRAMEWORKS
from console import console

# Importar funciones del test principal
from tests.test_frameworks import test_framework, save_result

def main():
    """
    Función principal que ejecuta la prueba para un framework específico.
    """
    # Verificar argumentos
    if len(sys.argv) < 2:
        console.error("Error: Debe especificar el nombre del framework a probar")
        console.info("Frameworks disponibles:")
        for fw in sorted(AVAILABLE_FRAMEWORKS):
            console.info(f"  - {fw}")
        sys.exit(1)
    
    # Obtener el framework a probar
    framework = sys.argv[1].lower()
    
    # Verificar que el framework existe
    if framework not in AVAILABLE_FRAMEWORKS:
        console.error(f"Error: El framework '{framework}' no está disponible")
        console.info("Frameworks disponibles:")
        for fw in sorted(AVAILABLE_FRAMEWORKS):
            console.info(f"  - {fw}")
        sys.exit(1)
    
    # Ejecutar la prueba
    console.info(f"Probando framework: {framework}")
    result = test_framework(framework)
    
    # Guardar el resultado
    save_result(result)
    
    # Mostrar el resultado
    if result["success"]:
        console.info(f"✅ Prueba exitosa para '{framework}'")
        console.info(f"Tiempo de ejecución: {result['execution_time']} segundos")
        console.info("Primeras líneas del prompt generado:")
        prompt_lines = result["prompt"].split("\n")[:5]
        for line in prompt_lines:
            console.info(f"  {line}")
    else:
        console.error(f"❌ Error en la prueba de '{framework}': {result['error']}")
    
if __name__ == "__main__":
    main() 