# 🚀 Migración AtapuercaNet a Hostinger + Azure SQL Server

## 📋 Configuración Actual
- **Frontend**: Hostinger (PHP + archivos estáticos)
- **Base de datos**: Azure SQL Server (ya configurada)
- **Repositorio**: GitHub (mantener como fuente principal)

## 🎯 Opciones de Migración

### Opción A: Solo Frontend (RECOMENDADA)
- Subir archivos estáticos a Hostinger
- Conectar a Azure SQL Server existente
- Rápido y simple

### Opción B: Backend Completo
- API PHP completa en Hostinger  
- Conectar a Azure SQL Server
- Mayor funcionalidad

## � Archivos de Migración Preparados

### Configuración Base de Datos
- `config/database.php` - Conexión Azure SQL Server
- `setup-database.sql` - Schema para Azure SQL Server
- `test-azure-connection.php` - Verificar conexión
- `AZURE-SQL-CONFIG.md` - Guía detallada Azure

### Backend API
- `api/query.php` - Endpoint para consultas SQL
- `.htaccess` - Configuración web server

### Automatización
- `deploy-hostinger.sh` - Script de despliegue automático
