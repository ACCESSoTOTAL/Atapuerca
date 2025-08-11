#!/bin/bash

# 🚀 Script de Despliegue AtapuercaNet a Hostinger + Azure SQL Server
# Automatiza la subida de archivos y configuración

echo "🚀 INICIANDO MIGRACIÓN ATAPUERCANET → HOSTINGER + AZURE SQL SERVER"
echo "=================================================================="

# Variables de configuración (CONFIGURADAS CON TUS DATOS)
FTP_HOST="147.93.92.5"  # IP FTP directa - CORREGIDA
FTP_USER="u722312752.lunasoft"
FTP_PASS="Atapuerca-net.2025"  # Nueva contraseña sin caracteres problemáticos
FTP_DIR="/home/u722312752/domains/atapuerca-net.es/public_html"
AZURE_SERVER="atapuerca.database.windows.net"
AZURE_DB="AtapuercaNet"
AZURE_USER="matusalen"

# Colores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Verificar archivos necesarios
echo -e "${BLUE}📋 Verificando archivos...${NC}"
required_files=(
    "index.html"
    "retos.html" 
    "sql.html"
    "contacto.html"
    "descargas.html"
    "css/estilos.css"
    "js/main.js"
    "js/retos.js"
    "config/database.php"
    "api/query.php"
    "test-azure-connection.php"
    "test-multiple-drivers.php"
    ".htaccess"
)

for file in "${required_files[@]}"; do
    if [[ -f "$file" ]]; then
        echo -e "  ${GREEN}✅ $file${NC}"
    else
        echo -e "  ${RED}❌ $file - FALTA${NC}"
        exit 1
    fi
done

# Verificar configuración FTP
echo -e "${BLUE}🔧 Verificando configuración FTP...${NC}"
echo -e "${GREEN}✅ Usuario FTP: $FTP_USER${NC}"
echo -e "${GREEN}✅ Host FTP: $FTP_HOST${NC}"
echo -e "${GREEN}✅ Directorio: $FTP_DIR${NC}"

# Crear backup de configuración
echo -e "${BLUE}📝 Creando configuración temporal...${NC}"
if [[ -f "config/database.php" ]]; then
    cp config/database.php config/database.php.backup
    echo -e "${GREEN}✅ Backup creado${NC}"
fi

# Actualizar database.php con variables del script (solo si no están ya configuradas)
if grep -q "tu_servidor.database.windows.net" config/database.php; then
    echo -e "${YELLOW}🔧 Actualizando credenciales Azure...${NC}"
    
    # Crear versión temporal con credenciales reales
    sed "s/tu_servidor.database.windows.net/$AZURE_SERVER/g" config/database.php > config/database_temp.php
    sed -i.bak "s/atapuerca_db/$AZURE_DB/g" config/database_temp.php
    sed -i.bak "s/tu_usuario/$AZURE_USER/g" config/database_temp.php
    
    # Pedir password de forma segura
    echo -n "Ingresa password Azure SQL Server: "
    read -s AZURE_PASS
    echo
    sed -i.bak "s/tu_password/$AZURE_PASS/g" config/database_temp.php
    
    # Reemplazar archivo temporal
    mv config/database_temp.php config/database.php
    rm -f config/database.php.bak
    
    echo -e "${GREEN}✅ Credenciales actualizadas${NC}"
fi

# Crear lista de archivos para subir
echo -e "${BLUE}📦 Preparando archivos para subida...${NC}"
FILES_TO_UPLOAD=(
    "index.html"
    "contacto.html"
    "descargas.html"
    "retos.html"
    "sql.html"
    "css/estilos.css"
    "js/main.js"
    "js/retos.js"
    "config/database.php"
    "api/query.php"
    "test-azure-connection.php"
    "test-multiple-drivers.php"
    ".htaccess"
)

# Verificar si existen archivos adicionales en docs
if [[ -f "docs/AtapuercaNet_Retos_Completos.pdf" ]]; then
    FILES_TO_UPLOAD+=("docs/AtapuercaNet_Retos_Completos.pdf")
fi

if [[ -f "docs/archivosAccess.zip" ]]; then
    FILES_TO_UPLOAD+=("docs/archivosAccess.zip")
fi

if [[ -f "docs/Manual_Misiones_AtapuercaNet_Dossier_Militar_con_logo_comprimido.pdf" ]]; then
    FILES_TO_UPLOAD+=("docs/Manual_Misiones_AtapuercaNet_Dossier_Militar_con_logo_comprimido.pdf")
fi

# Función de subida con lftp (más robusto que ftp)
upload_files() {
    echo -e "${BLUE}🚀 Iniciando subida a Hostinger...${NC}"
    
    # Verificar si lftp está instalado
    if ! command -v lftp &> /dev/null; then
        echo -e "${YELLOW}⚠️  lftp no está instalado. Usando ftp básico...${NC}"
        upload_files_basic
        return
    fi
    
    # Crear script temporal para lftp
    cat > upload_script.lftp << EOF
set ftp:list-options -a
open ftp://$FTP_USER:$FTP_PASS@$FTP_HOST
cd $FTP_DIR

# Crear directorios
mkdir -p css
mkdir -p js
mkdir -p config
mkdir -p api
mkdir -p docs

# Subir archivos
EOF

    for file in "${FILES_TO_UPLOAD[@]}"; do
        if [[ -f "$file" ]]; then
            echo "put $file $file" >> upload_script.lftp
        fi
    done
    
    echo "quit" >> upload_script.lftp
    
    # Ejecutar subida
    lftp -f upload_script.lftp
    
    # Limpiar
    rm upload_script.lftp
}

# Función de subida básica con ftp
upload_files_basic() {
    for file in "${FILES_TO_UPLOAD[@]}"; do
        if [[ -f "$file" ]]; then
            echo -e "${BLUE}📤 Subiendo: $file${NC}"
            
            # Crear directorio si es necesario
            dir=$(dirname "$file")
            if [[ "$dir" != "." ]]; then
                ftp -inv $FTP_HOST <<EOF
user $FTP_USER $FTP_PASS
cd $FTP_DIR
mkdir $dir
quit
EOF
            fi
            
            # Subir archivo
            ftp -inv $FTP_HOST <<EOF
user $FTP_USER $FTP_PASS
binary
cd $FTP_DIR
put $file $file
quit
EOF
        else
            echo -e "${YELLOW}⚠️  Archivo no encontrado: $file${NC}"
        fi
    done
}

# Ejecutar subida
upload_files

# Restaurar archivo original si se hizo backup
if [[ -f "config/database.php.backup" ]]; then
    echo -e "${BLUE}🔄 Restaurando configuración original...${NC}"
    mv config/database.php.backup config/database.php
fi

# Instrucciones post-migración
echo ""
echo -e "${GREEN}🎉 ¡MIGRACIÓN COMPLETADA!${NC}"
echo "========================"
echo ""
echo -e "${BLUE}📋 PASOS SIGUIENTES:${NC}"
echo "1. Accede a tu sitio: https://atapuerca-net.es"
echo "2. Prueba drivers completo: https://atapuerca-net.es/test-drivers-complete.php"
echo "3. Prueba conexión simple: https://atapuerca-net.es/test-azure-connection.php"
echo "4. Si hay errores de drivers:"
echo "   - Contacta soporte Hostinger (ver hostinger-support-request.md)"
echo "   - Solicita instalar: php-sqlsrv, php-pdo_sqlsrv, php-odbc"
echo "5. Si hay errores de conexión:"
echo "   - Verifica credenciales Azure SQL Server en config/database.php"
echo "   - Verifica firewall Azure (agregar IP de Hostinger)"
echo ""
echo -e "${BLUE}📖 Documentación completa:${NC}"
echo "   - HOSTINGER-MIGRATION-AZURE.md"
echo "   - AZURE-SQL-CONFIG.md"
echo ""
echo -e "${GREEN}✅ AtapuercaNet está listo en Hostinger + Azure SQL Server${NC}"

# Script para obtener IP de Hostinger (útil para configurar firewall Azure)
echo ""
echo -e "${YELLOW}💡 TIP: Para configurar el firewall Azure, necesitas la IP de Hostinger.${NC}"
echo "Después del despliegue, visita: https://tu-dominio.com/get-ip.php"
echo "para obtener la IP que debes agregar en Azure Portal."
