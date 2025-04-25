#!/usr/bin/env python3
"""
Script para depurar la validación de códigos promocionales.
"""

import os
from dotenv import load_dotenv
from console import console
from utils.rate_limiter import is_valid_promo_code, get_valid_promo_codes, VALID_CODES

# Cargar variables de entorno desde .env
load_dotenv()

def main():
    # Mostrar códigos válidos cargados
    console.info("=== Códigos Promocionales Cargados ===")
    console.info(f"Conjunto VALID_CODES: {VALID_CODES}")
    
    # Obtener códigos desde variables de entorno para verificación manual
    promo_code1 = os.environ.get('PROMO_CODE1', '')
    promo_code2 = os.environ.get('PROMO_CODE2', '')
    
    console.info(f"PROMO_CODE1 desde env: '{promo_code1}'")
    console.info(f"PROMO_CODE2 desde env: '{promo_code2}'")
    
    # Probar validación con los códigos cargados
    console.info("\n=== Pruebas de Validación ===")
    
    # Casos de prueba
    test_codes = [
        "CLASEEVARISTOYSONIA",  # Código exacto 1
        "claseevaristoysonia",  # En minúsculas
        " CLASEEVARISTOYSONIA ", # Con espacios
        "CLASEIA",              # Código exacto 2
        "claseia",              # En minúsculas
        " CLASEIA ",            # Con espacios
        "CODIGOINVALIDO",       # Código inválido
        "",                     # Código vacío
    ]
    
    # Probar cada código
    for test_code in test_codes:
        result = is_valid_promo_code(test_code)
        status = "✅ VÁLIDO" if result else "❌ INVÁLIDO"
        console.info(f"Prueba con '{test_code}': {status}")
    
    # Probar la función de obtención de códigos válidos
    console.info("\n=== Función get_valid_promo_codes() ===")
    fresh_codes = get_valid_promo_codes()
    console.info(f"Códigos obtenidos: {fresh_codes}")

if __name__ == "__main__":
    main() 