#!/usr/bin/env python
# -*- coding: utf-8 -*-

"""
Script para analizar los resultados de las pruebas de frameworks.

Este script analiza los resultados de las pruebas generadas por test_frameworks.py,
proporcionando estadísticas, comparaciones y detección de posibles problemas.

Funcionalidades:
1. Estadísticas de éxito/fallo por framework
2. Análisis de tiempos de ejecución
3. Comparación de longitud y estructura de los prompts
4. Detección de patrones o problemas comunes
5. Generación de recomendaciones para mejorar los frameworks
"""

import os
import sys
import json
import glob
from pathlib import Path
from collections import defaultdict
import statistics
import re

# Añadir el directorio raíz al path para importar los módulos de la aplicación
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from console import console
from utils.openai_helper import count_tokens

# Directorio donde se encuentran los resultados
RESULTS_DIR = Path("tests/results")

def load_results():
    """
    Carga todos los resultados de pruebas disponibles.
    
    Returns:
        dict: Diccionario con los resultados agrupados por framework
    """
    results = defaultdict(list)
    
    # Buscar todos los archivos JSON de resultados
    json_files = glob.glob(str(RESULTS_DIR / "*.json"))
    
    for json_file in json_files:
        try:
            with open(json_file, 'r', encoding='utf-8') as f:
                data = json.load(f)
                
            # Solo incluir resultados con la estructura esperada
            if "framework" in data and "success" in data:
                framework = data["framework"]
                results[framework].append(data)
        except Exception as e:
            console.error(f"Error al cargar {json_file}: {str(e)}")
    
    return results

def analyze_success_rate(results):
    """
    Analiza la tasa de éxito de cada framework.
    
    Args:
        results (dict): Resultados agrupados por framework
        
    Returns:
        dict: Estadísticas de éxito por framework
    """
    stats = {}
    
    for framework, tests in results.items():
        total = len(tests)
        if total == 0:
            continue
            
        successful = sum(1 for t in tests if t["success"])
        success_rate = (successful / total) * 100
        
        stats[framework] = {
            "total": total,
            "successful": successful,
            "failed": total - successful,
            "success_rate": success_rate
        }
    
    return stats

def analyze_execution_time(results):
    """
    Analiza los tiempos de ejecución de cada framework.
    
    Args:
        results (dict): Resultados agrupados por framework
        
    Returns:
        dict: Estadísticas de tiempo por framework
    """
    stats = {}
    
    for framework, tests in results.items():
        # Filtrar pruebas exitosas para el análisis de tiempo
        successful_tests = [t for t in tests if t["success"]]
        if not successful_tests:
            continue
            
        times = [t["execution_time"] for t in successful_tests]
        
        stats[framework] = {
            "min": min(times),
            "max": max(times),
            "avg": statistics.mean(times),
            "median": statistics.median(times)
        }
    
    return stats

def analyze_prompt_structure(results):
    """
    Analiza la estructura y contenido de los prompts generados.
    
    Args:
        results (dict): Resultados agrupados por framework
        
    Returns:
        dict: Estadísticas de estructura de prompts por framework
    """
    stats = {}
    
    for framework, tests in results.items():
        # Filtrar pruebas exitosas con prompts
        successful_tests = [t for t in tests if t["success"] and t.get("prompt")]
        if not successful_tests:
            continue
            
        prompts = [t["prompt"] for t in successful_tests]
        
        # Estadísticas básicas
        lengths = [len(p) for p in prompts]
        word_counts = [len(p.split()) for p in prompts]
        line_counts = [len(p.split('\n')) for p in prompts]
        
        # Contar tokens (si está disponible)
        try:
            token_counts = [count_tokens(p) for p in prompts]
            avg_tokens = statistics.mean(token_counts)
        except:
            token_counts = []
            avg_tokens = 0
        
        stats[framework] = {
            "avg_length": statistics.mean(lengths),
            "avg_words": statistics.mean(word_counts),
            "avg_lines": statistics.mean(line_counts),
            "avg_tokens": avg_tokens
        }
    
    return stats

def detect_common_patterns(results):
    """
    Detecta patrones comunes en los prompts generados.
    
    Args:
        results (dict): Resultados agrupados por framework
        
    Returns:
        dict: Patrones detectados por framework
    """
    patterns = {}
    
    for framework, tests in results.items():
        # Filtrar pruebas exitosas con prompts
        successful_tests = [t for t in tests if t["success"] and t.get("prompt")]
        if not successful_tests:
            continue
            
        prompts = [t["prompt"] for t in successful_tests]
        
        # Buscar patrones comunes
        framework_patterns = {
            "has_headers": all("##" in p for p in prompts),
            "has_lists": all("- " in p or "* " in p for p in prompts),
            "has_code_blocks": all("```" in p for p in prompts),
            "has_numbers": all(re.search(r'\d+', p) for p in prompts),
            "has_sections": all(re.search(r'#{2,3}', p) for p in prompts)
        }
        
        patterns[framework] = framework_patterns
    
    return patterns

def generate_recommendations(success_stats, time_stats, structure_stats, pattern_stats):
    """
    Genera recomendaciones basadas en el análisis de los resultados.
    
    Args:
        success_stats (dict): Estadísticas de éxito
        time_stats (dict): Estadísticas de tiempo
        structure_stats (dict): Estadísticas de estructura
        pattern_stats (dict): Estadísticas de patrones
        
    Returns:
        dict: Recomendaciones por framework
    """
    recommendations = {}
    
    # Identificar los frameworks con mejor rendimiento
    if success_stats:
        best_frameworks = sorted(
            success_stats.keys(),
            key=lambda k: success_stats[k]["success_rate"],
            reverse=True
        )[:3]
    else:
        best_frameworks = []
    
    # Identificar los frameworks más rápidos
    if time_stats:
        fastest_frameworks = sorted(
            time_stats.keys(),
            key=lambda k: time_stats[k]["avg"]
        )[:3]
    else:
        fastest_frameworks = []
    
    # Generar recomendaciones para cada framework
    for framework in success_stats:
        framework_recommendations = []
        
        # Recomendar basado en tasa de éxito
        success_rate = success_stats[framework]["success_rate"]
        if success_rate < 80:
            framework_recommendations.append(
                "Revisar la implementación del framework para mejorar la tasa de éxito."
            )
        
        # Recomendar basado en tiempo de ejecución
        if framework in time_stats and fastest_frameworks and framework not in fastest_frameworks:
            fastest_avg = time_stats[fastest_frameworks[0]]["avg"]
            current_avg = time_stats[framework]["avg"]
            if current_avg > fastest_avg * 2:  # Si es más del doble de lento
                framework_recommendations.append(
                    "Optimizar el tiempo de generación de prompts."
                )
        
        # Recomendar basado en estructura
        if framework in structure_stats and structure_stats[framework]["avg_tokens"] > 0:
            token_count = structure_stats[framework]["avg_tokens"]
            if token_count > 2000:  # Si usa muchos tokens
                framework_recommendations.append(
                    "Considerar reducir la longitud del prompt para optimizar el uso de tokens."
                )
        
        # Recomendar basado en patrones
        if framework in pattern_stats:
            patterns = pattern_stats[framework]
            if not patterns.get("has_sections", True):
                framework_recommendations.append(
                    "Mejorar la estructura del prompt con secciones claras (encabezados)."
                )
            if not patterns.get("has_lists", True):
                framework_recommendations.append(
                    "Incluir listas para mejorar la legibilidad."
                )
        
        recommendations[framework] = framework_recommendations
    
    return recommendations

def main():
    """
    Función principal que ejecuta el análisis de resultados.
    """
    console.info("Analizando resultados de pruebas...")
    
    # Cargar resultados
    results = load_results()
    if not results:
        console.error("No se encontraron resultados para analizar")
        return
    
    console.info(f"Se encontraron resultados para {len(results)} frameworks")
    
    # Realizar análisis
    success_stats = analyze_success_rate(results)
    time_stats = analyze_execution_time(results)
    structure_stats = analyze_prompt_structure(results)
    pattern_stats = detect_common_patterns(results)
    
    # Generar recomendaciones
    recommendations = generate_recommendations(
        success_stats, time_stats, structure_stats, pattern_stats
    )
    
    # Generar informe
    report = f"""# Análisis de Resultados de Pruebas

## Estadísticas de Éxito

| Framework | Total Pruebas | Exitosas | Fallidas | Tasa de Éxito |
|-----------|--------------|----------|----------|---------------|
"""
    
    for framework, stats in sorted(success_stats.items()):
        report += f"| {framework} | {stats['total']} | {stats['successful']} | {stats['failed']} | {stats['success_rate']:.1f}% |\n"
    
    report += "\n## Tiempos de Ejecución\n\n"
    report += "| Framework | Mínimo (s) | Máximo (s) | Promedio (s) | Mediana (s) |\n"
    report += "|-----------|------------|------------|--------------|-------------|\n"
    
    for framework, stats in sorted(time_stats.items()):
        report += f"| {framework} | {stats['min']:.2f} | {stats['max']:.2f} | {stats['avg']:.2f} | {stats['median']:.2f} |\n"
    
    report += "\n## Estructura de Prompts\n\n"
    report += "| Framework | Longitud Promedio | Palabras Promedio | Líneas Promedio | Tokens Promedio |\n"
    report += "|-----------|-------------------|-------------------|-----------------|------------------|\n"
    
    for framework, stats in sorted(structure_stats.items()):
        report += f"| {framework} | {stats['avg_length']:.0f} | {stats['avg_words']:.0f} | {stats['avg_lines']:.0f} | {stats['avg_tokens']:.0f} |\n"
    
    report += "\n## Recomendaciones\n\n"
    
    for framework, recs in sorted(recommendations.items()):
        if recs:
            report += f"### {framework}\n\n"
            for rec in recs:
                report += f"- {rec}\n"
            report += "\n"
    
    # Guardar informe
    report_path = RESULTS_DIR / f"analisis_resultados.md"
    with open(report_path, 'w', encoding='utf-8') as f:
        f.write(report)
    
    console.info(f"Análisis completado y guardado en {report_path}")

if __name__ == "__main__":
    main() 