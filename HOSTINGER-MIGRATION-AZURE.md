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

## 📦 Archivos de Migración Preparados

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

## 🛠️ Pasos de Migración

### PASO 1: Preparar Azure SQL Server
```bash
# 1. Ejecutar setup-database.sql en Azure SQL Server Management Studio
# 2. Configurar firewall para permitir conexiones desde Hostinger
# 3. Anotar cadena de conexión
```

### PASO 2: Configurar Hostinger
```bash
# 1. Editar config/database.php con tus credenciales Azure
# 2. Verificar que Hostinger soporta drivers SQL Server
# 3. Configurar dominio y SSL
```

### PASO 3: Desplegar Archivos

#### Opción A - Manual:
```bash
# 1. Acceder al File Manager de Hostinger
# 2. Subir todos los archivos del proyecto
# 3. Ejecutar test-azure-connection.php
```

#### Opción B - Automático:
```bash
# Editar deploy-hostinger.sh con tus credenciales FTP
chmod +x deploy-hostinger.sh
./deploy-hostinger.sh
```

### PASO 4: Verificar Funcionamiento
```bash
# 1. Abrir test-azure-connection.php en el navegador
# 2. Verificar que muestra "✅ Conexión exitosa"
# 3. Probar algunos retos SQL
```

## ⚙️ Configuración Detallada

### 1. Editar `config/database.php`
```php
private $server = 'TU_SERVIDOR.database.windows.net';
private $database = 'atapuerca_db';
private $username = 'TU_USUARIO';
private $password = 'TU_PASSWORD';
```

### 2. Configurar Firewall Azure
1. Azure Portal → SQL databases → tu_base_datos
2. Set server firewall
3. Agregar IP de Hostinger (obtener con script de test)

### 3. Obtener IP de Hostinger
Crear archivo temporal `get-ip.php`:
```php
<?php
echo "IP: " . file_get_contents('https://ipinfo.io/ip');
?>
```

## 🔧 Solución de Problemas

### Error: "Driver not found"
- Contactar soporte Hostinger para activar SQL Server drivers
- Usar conexión ODBC alternativa

### Error: "Login failed" 
- Verificar credenciales Azure SQL Server
- Comprobar que el usuario tiene permisos

### Error: "Cannot connect"
- Verificar reglas firewall Azure
- Confirmar que el servidor está activo

## 💰 Costos Estimados

### Hostinger
- **Shared Hosting**: 2.99€/mes
- **Business Hosting**: 3.99€/mes (recomendado)

### Azure SQL Server (ya tienes)
- **Basic**: ~5€/mes
- **Standard S0**: ~15€/mes

### Total: ~9-19€/mes

## 🎯 Siguientes Pasos

1. **¿Tienes ya cuenta en Hostinger?**
2. **¿Qué opción prefieres? A (simple) o B (completa)**
3. **¿Tienes dominio o necesitas uno nuevo?**
4. **¿Necesitas ayuda con la configuración Azure?**

## 📁 Estructura Final en Hostinger

```
public_html/
├── index.html
├── contacto.html
├── descargas.html
├── retos.html
├── sql.html
├── css/
│   └── estilos.css
├── js/
│   ├── main.js
│   └── retos.js
├── config/
│   └── database.php
├── api/
│   └── query.php
├── test-azure-connection.php
└── .htaccess
```

## ✅ Ventajas de esta Configuración

- **🚀 Rendimiento**: Azure SQL Server es muy rápido
- **🔒 Seguridad**: Conexión encriptada TLS
- **📊 Escalabilidad**: Fácil escalar recursos
- **💾 Backups**: Automáticos en Azure
- **🌍 Global**: Disponible mundialmente
- **⚡ GitHub Sync**: Mantener código en GitHub

¿Estás listo para empezar? ¡Cuéntame qué necesitas!
