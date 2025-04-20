#!/usr/bin/env python
# -*- coding: utf-8 -*-

"""
Script para probar todos los frameworks de prompts disponibles.

Este script verifica que todos los frameworks funcionen correctamente:
1. Carga cada framework de la carpeta 'frameworks/'
2. Genera un prompt de prueba para cada framework
3. Guarda los resultados en la carpeta 'tests/results/'
4. Genera un informe de prueba con el estado de cada framework
"""

import os
import sys
import json
import time
from datetime import datetime
from pathlib import Path

# Añadir el directorio raíz al path para importar los módulos de la aplicación
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

# Importar las funciones necesarias
from utils.openai_helper import optimize_prompt, AVAILABLE_FRAMEWORKS
from console import console

# Directorio donde se encuentran los archivos de frameworks
FRAMEWORKS_DIR = Path("frameworks")
# Directorio donde se guardarán los resultados
RESULTS_DIR = Path("tests/results")

def create_test_data(framework):
    """
    Crea datos de prueba para un framework específico basado en su estructura.
    
    Args:
        framework (str): Nombre del framework a probar
        
    Returns:
        dict: Datos de prueba para el framework
    """
    # Datos genéricos para todos los frameworks
    generic_data = {
        # Campos comunes que funcionan en la mayoría de los frameworks
        "role": "Desarrollador de software",
        "task": "Desarrollar un sistema de pruebas automatizado",
        "format": "Guía técnica paso a paso",
        "context": "Aplicación web con múltiples frameworks de prompts",
        "objetivo": "Verificar la funcionalidad de todos los frameworks",
        "problema": "Asegurar que todos los frameworks generan prompts válidos",
        "aproximacion": "Pruebas automatizadas con datos simulados",
        "accion": "Ejecutar tests y guardar resultados",
        "situacion": "Sistema en producción requiere verificación",
        "meta": "100% de frameworks funcionando correctamente",
        "audiencia": "Equipo de desarrollo interno",
        "requisitos": "Compatibilidad con todos los frameworks existentes",
    }
    
    # Si el framework es bolt_lovable, necesita datos específicos
    if framework == "bolt_lovable":
        return {
            "framework_type": "code",
            "project_name": "Framework Test Suite",
            "project_description": "Sistema para probar todos los frameworks disponibles",
            "target_platform": "Web",
            "target_features": "Pruebas automatizadas, generación de informes",
            "visual_style": "Minimalista y funcional",
            "technical_requirements": "Compatible con Flask, OpenAI API"
        }
    
    return generic_data

def test_framework(framework):
    """
    Prueba un framework específico generando un prompt.
    
    Args:
        framework (str): Nombre del framework a probar
        
    Returns:
        dict: Resultado de la prueba
    """
    console.info(f"Probando framework: {framework}")
    start_time = time.time()
    result = {
        "framework": framework,
        "timestamp": datetime.now().isoformat(),
        "success": False,
        "error": None,
        "prompt": None,
        "execution_time": 0
    }
    
    try:
        # Crear datos de prueba para el framework
        test_data = create_test_data(framework)
        
        # Generar prompt usando el framework
        if framework == "bolt_lovable":
            from utils.bolt_lovable_helper import generate_bolt_lovable_prompt
            response = generate_bolt_lovable_prompt(test_data)
            prompt = response.get('raw_prompt', '')
        else:
            prompt = optimize_prompt(framework, test_data)
        
        # Verificar que el prompt no esté vacío
        if prompt and len(prompt.strip()) > 0:
            result["success"] = True
            result["prompt"] = prompt
        else:
            result["error"] = "El prompt generado está vacío"
    except Exception as e:
        result["error"] = str(e)
    
    # Calcular tiempo de ejecución
    result["execution_time"] = round(time.time() - start_time, 2)
    return result

def save_result(result):
    """
    Guarda el resultado de la prueba en un archivo JSON y el prompt en un archivo TXT.
    
    Args:
        result (dict): Resultado de la prueba
    """
    # Crear directorio de resultados si no existe
    os.makedirs(RESULTS_DIR, exist_ok=True)
    
    framework = result["framework"]
    timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
    
    # Guardar resultado completo en JSON
    json_path = RESULTS_DIR / f"{framework}_{timestamp}.json"
    with open(json_path, 'w', encoding='utf-8') as f:
        json.dump(result, f, indent=2, ensure_ascii=False)
    
    # Guardar prompt en TXT si la prueba fue exitosa
    if result["success"] and result["prompt"]:
        txt_path = RESULTS_DIR / f"{framework}_{timestamp}.txt"
        with open(txt_path, 'w', encoding='utf-8') as f:
            f.write(result["prompt"])
    
    console.info(f"Resultado guardado en {json_path}")

def generate_report(results):
    """
    Genera un informe de las pruebas realizadas.
    
    Args:
        results (list): Lista de resultados de pruebas
        
    Returns:
        str: Informe en formato markdown
    """
    # Contar éxitos y fallos
    total = len(results)
    successful = sum(1 for r in results if r["success"])
    failed = total - successful
    
    # Calcular tiempo promedio de ejecución
    avg_time = sum(r["execution_time"] for r in results) / total if total > 0 else 0
    
    # Crear informe
    report = f"""# Informe de Pruebas de Frameworks

## Resumen
- **Fecha**: {datetime.now().strftime("%Y-%m-%d %H:%M:%S")}
- **Total de frameworks probados**: {total}
- **Frameworks exitosos**: {successful} ({successful/total*100:.1f}%)
- **Frameworks fallidos**: {failed} ({failed/total*100:.1f}%)
- **Tiempo promedio de ejecución**: {avg_time:.2f} segundos

## Detalles

| Framework | Estado | Tiempo (s) | Error |
|-----------|--------|------------|-------|
"""
    
    # Añadir detalles de cada framework
    for r in sorted(results, key=lambda x: x["framework"]):
        status = "✅ Éxito" if r["success"] else "❌ Fallo"
        error = r["error"] or "-"
        report += f"| {r['framework']} | {status} | {r['execution_time']} | {error} |\n"
    
    # Añadir sección de frameworks fallidos si hay alguno
    if failed > 0:
        report += "\n## Frameworks fallidos\n\n"
        for r in results:
            if not r["success"]:
                report += f"### {r['framework']}\n"
                report += f"- **Error**: {r['error']}\n"
                report += f"- **Tiempo**: {r['execution_time']} segundos\n\n"
    
    return report

def main():
    """
    Función principal que ejecuta las pruebas para todos los frameworks.
    """
    console.info("Iniciando pruebas de frameworks...")
    
    # Crear directorio de resultados si no existe
    os.makedirs(RESULTS_DIR, exist_ok=True)
    
    # Obtener lista de frameworks disponibles
    frameworks = AVAILABLE_FRAMEWORKS
    console.info(f"Se encontraron {len(frameworks)} frameworks para probar")
    
    # Ejecutar prueba para cada framework
    results = []
    for framework in frameworks:
        result = test_framework(framework)
        results.append(result)
        save_result(result)
    
    # Generar informe de pruebas
    report = generate_report(results)
    report_path = RESULTS_DIR / f"informe_{datetime.now().strftime('%Y%m%d_%H%M%S')}.md"
    with open(report_path, 'w', encoding='utf-8') as f:
        f.write(report)
    
    console.info(f"Informe de pruebas guardado en {report_path}")
    
    # Mostrar resumen
    total = len(results)
    successful = sum(1 for r in results if r["success"])
    console.info(f"Pruebas completadas: {successful}/{total} frameworks exitosos")

if __name__ == "__main__":
    main() 