#!/usr/bin/env python3

import re

# Leer el archivo original
with open('/Volumes/T7/atapuercaNet/web/Atapuerca/js/retos.js', 'r', encoding='utf-8') as f:
    contenido = f.read()

# Extraer la parte inicial (hasta const retos = [)
inicio = contenido.split('const retos = [')[0] + 'const retos = [\n'

# Extraer la parte final (desde // Funciones del sistema de retos)
final = '\n// Funciones del sistema de retos' + contenido.split('// Funciones del sistema de retos')[1]

# Extraer todos los retos usando regex
patron_reto = re.compile(r'  \{\s*\n.*?^  \}', re.MULTILINE | re.DOTALL)
retos_encontrados = patron_reto.findall(contenido)

# Extraer IDs de cada reto
retos_unicos = {}
for reto in retos_encontrados:
    match = re.search(r'id:\s*(\d+)', reto)
    if match:
        id_reto = int(match.group(1))
        if id_reto not in retos_unicos:
            retos_unicos[id_reto] = reto

# Ordenar por ID y crear el contenido de retos
retos_ordenados = []
for i in range(1, 61):  # IDs del 1 al 60
    if i in retos_unicos:
        retos_ordenados.append(retos_unicos[i])
    else:
        print(f"¡ADVERTENCIA! Falta el reto con ID {i}")

# Crear el archivo limpio
contenido_limpio = inicio + ',\n'.join(retos_ordenados) + '\n];\n' + final

# Escribir el archivo corregido
with open('/Volumes/T7/atapuercaNet/web/Atapuerca/js/retos_limpio.js', 'w', encoding='utf-8') as f:
    f.write(contenido_limpio)

print(f"Archivo limpio creado con {len(retos_ordenados)} retos únicos")
print(f"IDs encontrados: {sorted(retos_unicos.keys())}")
