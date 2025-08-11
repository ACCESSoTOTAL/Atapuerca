#!/bin/bash

# 🚀 Script de Despliegue AtapuercaNet a Hostinger + Azure SQL Server
# Automatiza la subida de archivos y configuración

echo "🚀 INICIANDO MIGRACIÓN ATAPUERCANET → HOSTINGER + AZURE SQL SERVER"
echo "=================================================================="

# Variables de configuración (EDITAR CON TUS DATOS)
FTP_HOST="ftp.tu-dominio.com"  # Cambiar por tu host Hostinger
FTP_USER="tu_usuario_ftp"
FTP_PASS="tu_password_ftp"
FTP_DIR="/public_html"
AZURE_SERVER="tu_servidor.database.windows.net"
AZURE_DB="atapuerca_db"
AZURE_USER="tu_usuario_azure"

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
    "css/estilos.css"
    "js/main.js"
    "js/retos.js"
    "config/database.php"
    "api/query.php"
    "test-azure-connection.php"
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

# Verificar configuración Azure
echo -e "${BLUE}🔧 Verificando configuración Azure SQL Server...${NC}"
if [[ "$AZURE_SERVER" == "tu_servidor.database.windows.net" ]]; then
    echo -e "${YELLOW}⚠️  ATENCIÓN: Necesitas configurar las credenciales Azure SQL Server${NC}"
    echo "Edita este script y actualiza:"
    echo "  - AZURE_SERVER (tu_servidor.database.windows.net)"
    echo "  - AZURE_DB (nombre de tu base de datos)" 
    echo "  - AZURE_USER (tu usuario Azure)"
    echo ""
    read -p "¿Continuar de todas formas? (y/N): " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        exit 1
    fi
fi

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
    ".htaccess"
)

# Verificar si existe el PDF
if [[ -f "docs/AtapuercaNet_Retos_Completos.pdf" ]]; then
    FILES_TO_UPLOAD+=("docs/AtapuercaNet_Retos_Completos.pdf")
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
echo "1. Accede a tu sitio: https://tu-dominio.com"
echo "2. Prueba la conexión Azure: https://tu-dominio.com/test-azure-connection.php"
echo "3. Si hay errores, verifica:"
echo "   - Credenciales Azure SQL Server en config/database.php"
echo "   - Firewall Azure (agregar IP de Hostinger)"
echo "   - Drivers SQL Server en Hostinger (contactar soporte si es necesario)"
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
