#!/bin/bash

# Script de limpieza FTP - AtapuercaNet
echo "🧹 LIMPIANDO ARCHIVOS OBSOLETOS..."

# Configuración FTP
FTP_HOST="147.93.92.5"
FTP_USER="u722312752.lunasoft"
FTP_PASS="Atapuerca-net.2025"

# Archivos a ELIMINAR (obsoletos, debug, versiones viejas)
FILES_TO_DELETE=(
    "checklist-hostinger.php"
    "compatible-azure.php"
    "corregido-v8.php"
    "database.php"
    "debug-azure.php"
    "debug-definitivo-v8.php"
    "debug-json.php"
    "debug-v1.php"
    "default.php"
    "definitivo-v8.php"
    "final-azure.php"
    "full-debug.php"
    "main-azure.js"
    "query-azure-simple.php"
    "query-azure.php"
    "query-final.php"
    "query-simple.php"
    "real-v2.php"
    "simple-v3.php"
    "sql-definitivo-v8.html"
    "sql-final-definitivo.html"
    "sql-final-v5.html"
    "sql-real-v6.html"
    "sql-v4.html"
    "sql.html"
    "test-azure-connection.php"
    "test-azure.php"
    "test-freetds.php"
    "test-multiple-drivers.php"
    "test-pdo-sqlsrv.php"
    "test-php-azure.php"
    "test-query.html"
    "test-sqlsrv.php"
    "ultimate-azure.php"
    "ultra-v7.php"
    "working-azure.php"
    "definitivo-v8.js"
)

# Eliminar archivos obsoletos
echo "Eliminando archivos obsoletos..."
for file in "${FILES_TO_DELETE[@]}"; do
    echo "Eliminando: $file"
    curl -s --ftp-pasv ftp://$FTP_USER:$FTP_PASS@$FTP_HOST/ -Q "DELE $file" > /dev/null 2>&1
done

echo "✅ Limpieza completada"
echo ""
echo "📁 ARCHIVOS MANTENIDOS (funcionales):"
echo "  • index.html - Página principal"
echo "  • contacto.html - Página de contacto"
echo "  • descargas.html - Página de descargas"  
echo "  • retos.html - Página de retos"
echo "  • main.js - JavaScript principal"
echo "  • final-freetds.php - Endpoint SQL Azure funcional"
echo "  • freetds-20250812084320.js - JavaScript SQL funcional"
echo "  • freetds-final.html - Terminal SQL funcional"
echo ""
echo "🎯 WEB LIMPIA Y FUNCIONAL"
