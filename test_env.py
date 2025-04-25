#!/usr/bin/env python3
"""
Script para probar la carga de variables de entorno,
específicamente los códigos promocionales.
"""

import os
from dotenv import load_dotenv
from console import console

# Cargar variables de entorno desde .env
load_dotenv()

def main():
    # Obtener los códigos promocionales
    promo_code1 = os.environ.get('PROMO_CODE1', '')
    promo_code2 = os.environ.get('PROMO_CODE2', '')
    
    # Mostrar los códigos cargados
    console.info("Códigos promocionales cargados:")
    if promo_code1:
        console.info(f"- PROMO_CODE1: {promo_code1}")
    else:
        console.warning("- PROMO_CODE1 no encontrado")
    
    if promo_code2:
        console.info(f"- PROMO_CODE2: {promo_code2}")
    else:
        console.warning("- PROMO_CODE2 no encontrado")
    
    # Comprobar si se han cargado todos los códigos
    if promo_code1 and promo_code2:
        console.info("✅ Todos los códigos promocionales se han cargado correctamente.")
    else:
        console.error("❌ No se han podido cargar todos los códigos promocionales.")

if __name__ == "__main__":
    main() 