# Configuración Azure SQL Server - AtapuercaNet

## 📋 Configuración Requerida

### 1. Datos de Conexión Azure SQL Server
Necesitarás estos datos de tu instancia de Azure SQL Server:

```bash
Servidor: tu_servidor.database.windows.net
Base de datos: atapuerca_db (o el nombre que hayas elegido)
Usuario: tu_usuario_admin
Contraseña: tu_contraseña_segura
Puerto: 1433 (por defecto)
```

### 2. Configurar Hostinger para Azure SQL Server

#### En `config/database.php`:
```php
private $server = 'tu_servidor.database.windows.net';
private $database = 'atapuerca_db';
private $username = 'tu_usuario';
private $password = 'tu_contraseña';
```

#### Instalar drivers necesarios en Hostinger:
```php
// Verificar si el driver está disponible
if (extension_loaded('sqlsrv')) {
    echo "Driver SQL Server disponible";
} else {
    echo "Necesitas contactar soporte Hostinger para activar sqlsrv";
}
```

### 3. Configuración de Firewall Azure

**IMPORTANTE**: Azure SQL Server requiere configurar el firewall para permitir conexiones desde Hostinger.

1. En Azure Portal → SQL databases → tu_base_datos → Set server firewall
2. Agregar regla para IPs de Hostinger:
   - **Nombre**: Hostinger-Connection
   - **IP inicio**: IP de tu hosting Hostinger
   - **IP fin**: misma IP

3. Para obtener la IP de Hostinger, sube este archivo PHP temporal:
```php
<?php
echo "IP del servidor: " . $_SERVER['SERVER_ADDR'] . "\n";
echo "IP externa: " . file_get_contents('https://ipinfo.io/ip');
?>
```

### 4. Cadena de Conexión Alternativa

Si sqlsrv no está disponible, usar ODBC:
```php
$dsn = "odbc:Driver={ODBC Driver 17 for SQL Server};Server={$server},{$port};Database={$database}";
```

### 5. Script de Test de Conexión

Crear `test-azure-connection.php`:
```php
<?php
require_once 'config/database.php';

$db = new DatabaseConfig();
$result = $db->testConnection();

if ($result['success']) {
    echo "✅ Conexión exitosa a Azure SQL Server\n";
    echo "Información: " . $result['server_info'] . "\n";
} else {
    echo "❌ Error: " . $result['error'] . "\n";
}
?>
```

### 6. Pasos de Migración

1. **Ejecutar setup en Azure SQL Server**:
   ```sql
   -- Ejecutar setup-database.sql en Azure SQL Server Management Studio
   -- o Azure Data Studio
   ```

2. **Configurar conexión en Hostinger**:
   ```bash
   # Editar config/database.php con tus datos de Azure
   # Subir archivos a Hostinger
   # Ejecutar test-azure-connection.php
   ```

3. **Configurar firewall Azure**:
   ```bash
   # Obtener IP de Hostinger
   # Agregar regla en Azure Portal
   # Testear conexión
   ```

### 7. Solución de Problemas

#### Error: "Login failed"
- Verificar usuario/contraseña
- Comprobar que el usuario tiene permisos en la base de datos

#### Error: "Cannot connect to server"
- Verificar reglas de firewall en Azure
- Confirmar que el servidor está activo

#### Error: "Driver not found"
- Contactar soporte Hostinger para activar drivers SQL Server
- Usar alternativa ODBC

### 8. Ventajas de Azure SQL Server

✅ **Escalabilidad automática**
✅ **Backups automáticos**
✅ **Alta disponibilidad**
✅ **Seguridad empresarial**
✅ **Georeplicación disponible**

### 9. Costos Azure SQL Server

- **Basic**: ~5€/mes - Ideal para desarrollo
- **Standard S0**: ~15€/mes - Para producción pequeña
- **Standard S1**: ~30€/mes - Para uso intensivo

### 10. Siguiente Paso

1. Confirma que tienes acceso a Azure SQL Server
2. Ejecuta `setup-database.sql` en tu instancia
3. Configura las credenciales en `config/database.php`
4. Sube los archivos a Hostinger
5. Configura el firewall Azure
6. Testa la conexión

¿Necesitas ayuda con algún paso específico?
