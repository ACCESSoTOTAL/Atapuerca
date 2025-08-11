#!/bin/bash
# Script para deployment automático a Hostinger
# Uso: ./deploy-hostinger.sh

echo "🚀 Iniciando deployment a Hostinger..."

# Colores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Configuración (EDITAR CON TUS DATOS)
HOSTINGER_USER="tu_usuario_ftp"
HOSTINGER_HOST="ftp.tu-dominio.com"
REMOTE_PATH="/public_html/"

# Verificar que estamos en la rama main
if [ "$(git branch --show-current)" != "main" ]; then
    echo -e "${RED}❌ Error: Debes estar en la rama main${NC}"
    exit 1
fi

# Verificar que no hay cambios sin commit
if [ -n "$(git status --porcelain)" ]; then
    echo -e "${RED}❌ Error: Hay cambios sin commitear${NC}"
    echo "Ejecuta: git add . && git commit -m 'mensaje'"
    exit 1
fi

# Actualizar desde GitHub
echo -e "${YELLOW}📥 Actualizando desde GitHub...${NC}"
git pull origin main

# Crear directorio temporal para deployment
echo -e "${YELLOW}📦 Preparando archivos para deployment...${NC}"
rm -rf deployment_temp
mkdir deployment_temp

# Copiar archivos necesarios (excluyendo archivos de desarrollo)
cp -r *.html deployment_temp/
cp -r css/ deployment_temp/
cp -r js/ deployment_temp/
cp -r docs/ deployment_temp/
cp .htaccess deployment_temp/

# Opcional: Minificar archivos CSS y JS
echo -e "${YELLOW}🗜️ Optimizando archivos...${NC}"
# Aquí puedes agregar minificación si tienes las herramientas

# Crear archivo de información de deployment
echo "Deployment: $(date)" > deployment_temp/deploy-info.txt
echo "Commit: $(git rev-parse HEAD)" >> deployment_temp/deploy-info.txt
echo "Branch: $(git branch --show-current)" >> deployment_temp/deploy-info.txt

echo -e "${GREEN}✅ Archivos preparados en deployment_temp/${NC}"
echo -e "${YELLOW}📤 Para subir a Hostinger, usa tu cliente FTP preferido con:${NC}"
echo "  Usuario: $HOSTINGER_USER"
echo "  Host: $HOSTINGER_HOST"
echo "  Directorio remoto: $REMOTE_PATH"
echo "  Archivos locales: deployment_temp/*"

# Opcional: Auto-upload usando lftp (si tienes lftp instalado)
read -p "¿Subir automáticamente via FTP? (y/N): " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    echo -e "${YELLOW}📤 Subiendo archivos...${NC}"
    
    # Necesitarás configurar las credenciales FTP
    echo "⚠️  Configure sus credenciales FTP en el script"
    echo "O use su cliente FTP preferido (FileZilla, etc.)"
    
    # Ejemplo con lftp (descomenta y configura):
    # lftp -c "
    # set ftp:list-options -a;
    # open ftp://$HOSTINGER_USER:$HOSTINGER_PASS@$HOSTINGER_HOST;
    # lcd deployment_temp;
    # cd $REMOTE_PATH;
    # mirror --reverse --delete --verbose;
    # quit
    # "
fi

echo -e "${GREEN}🎉 Deployment preparado correctamente${NC}"
