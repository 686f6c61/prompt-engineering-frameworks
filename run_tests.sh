#!/bin/bash

# Script para ejecutar pruebas de frameworks
# 
# Este script facilita la ejecución de pruebas para los frameworks
# de prompt engineering disponibles en el sistema.
#
# Opciones:
#   -a, --all       Probar todos los frameworks
#   -f, --framework Probar un framework específico (ej: -f rtf)
#   -h, --help      Mostrar ayuda
#   -c, --clean     Limpiar resultados antiguos
#   -r, --report    Generar solo el informe (sin ejecutar pruebas)

# Directorio base del proyecto
BASE_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
RESULTS_DIR="${BASE_DIR}/tests/results"

# Asegurarse de que existe el directorio de resultados
mkdir -p "${RESULTS_DIR}"

# Función para mostrar la ayuda
show_help() {
    echo "Uso: ./run_tests.sh [opciones]"
    echo ""
    echo "Opciones:"
    echo "  -a, --all           Probar todos los frameworks"
    echo "  -f, --framework     Probar un framework específico (ej: -f rtf)"
    echo "  -c, --clean         Limpiar resultados antiguos"
    echo "  -r, --report        Generar solo el informe (sin ejecutar pruebas)"
    echo "  -h, --help          Mostrar esta ayuda"
    echo ""
    echo "Ejemplos:"
    echo "  ./run_tests.sh -a                # Probar todos los frameworks"
    echo "  ./run_tests.sh -f rtf            # Probar solo el framework RTF"
    echo "  ./run_tests.sh -c -a             # Limpiar resultados antiguos y probar todos"
    echo "  ./run_tests.sh -r                # Generar informe con resultados existentes"
}

# Función para limpiar resultados antiguos
clean_results() {
    echo "Limpiando resultados antiguos..."
    rm -f "${RESULTS_DIR}"/*.json "${RESULTS_DIR}"/*.txt "${RESULTS_DIR}"/*.md
    echo "Resultados eliminados."
}

# Función para probar todos los frameworks
test_all_frameworks() {
    echo "Probando todos los frameworks..."
    # Activar entorno virtual si existe
    if [ -d ".venv" ]; then
        source .venv/bin/activate
    fi
    python tests/test_frameworks.py
}

# Función para probar un framework específico
test_specific_framework() {
    local framework="$1"
    echo "Probando el framework: ${framework}"
    # Activar entorno virtual si existe
    if [ -d ".venv" ]; then
        source .venv/bin/activate
    fi
    python tests/test_single_framework.py "${framework}"
}

# Función para generar informe
generate_report() {
    echo "Generando informe de resultados..."
    # Activar entorno virtual si existe
    if [ -d ".venv" ]; then
        source .venv/bin/activate
    fi
    python tests/analyze_results.py
}

# Procesar los argumentos
if [ $# -eq 0 ]; then
    show_help
    exit 0
fi

# Variables para las opciones
ALL=false
FRAMEWORK=""
CLEAN=false
REPORT=false

# Procesar opciones
while [[ $# -gt 0 ]]; do
    case "$1" in
        -a|--all)
            ALL=true
            shift
            ;;
        -f|--framework)
            FRAMEWORK="$2"
            shift 2
            ;;
        -c|--clean)
            CLEAN=true
            shift
            ;;
        -r|--report)
            REPORT=true
            shift
            ;;
        -h|--help)
            show_help
            exit 0
            ;;
        *)
            echo "Opción desconocida: $1"
            show_help
            exit 1
            ;;
    esac
done

# Ejecutar las acciones seleccionadas
if [ "$CLEAN" = true ]; then
    clean_results
fi

if [ "$ALL" = true ]; then
    test_all_frameworks
elif [ -n "$FRAMEWORK" ]; then
    test_specific_framework "$FRAMEWORK"
fi

if [ "$REPORT" = true ] || [ "$ALL" = true ] || [ -n "$FRAMEWORK" ]; then
    generate_report
fi

echo "Proceso completado."
exit 0 