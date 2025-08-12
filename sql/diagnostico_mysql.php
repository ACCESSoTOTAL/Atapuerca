<?php
/**
 * ATAPUERCA NET - DIAGNÓSTICO COMPLETO MYSQL
 * Script mejorado para detectar problemas de conexión
 */

// Mostrar errores de PHP
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Configuración de Hostinger
$config = [
    'host' => 'localhost',
    'dbname' => 'u722312752_atapuerca_reto',
    'username' => 'u722312752_adan',
    'password' => 'Nocomas1manzana.'
];

// Función para mostrar output en web y CLI
function output($mensaje) {
    if (php_sapi_name() === 'cli') {
        echo $mensaje . "\n";
    } else {
        echo nl2br(htmlspecialchars($mensaje)) . "<br>";
    }
}

// Header para web
if (php_sapi_name() !== 'cli') {
    echo "<html><head><title>Diagnóstico MySQL AtapuercaNet</title>";
    echo "<style>body{font-family:monospace;background:#000;color:#0f0;padding:20px;}</style></head><body>";
}

output("🛰️ ATAPUERCA NET - DIAGNÓSTICO MYSQL HOSTINGER");
output("================================================");
output("");

// 1. Verificar extensiones PHP
output("🔍 VERIFICANDO EXTENSIONES PHP:");
$extensiones = ['pdo', 'pdo_mysql', 'mysqli'];
foreach ($extensiones as $ext) {
    if (extension_loaded($ext)) {
        output("✅ $ext: Disponible");
    } else {
        output("❌ $ext: NO DISPONIBLE");
    }
}
output("");

// 2. Verificar versión PHP
output("🐘 VERSIÓN PHP: " . phpversion());
output("");

// 3. Intentar conexión paso a paso
output("🔗 INTENTANDO CONEXIÓN MYSQL:");
output("Host: " . $config['host']);
output("Base de datos: " . $config['dbname']);
output("Usuario: " . $config['username']);
output("Password: " . str_repeat('*', strlen($config['password'])));
output("");

try {
    // Paso 1: Conexión básica sin especificar BD
    output("📡 Paso 1: Conexión básica al servidor...");
    $dsn_basic = "mysql:host={$config['host']};charset=utf8mb4";
    $pdo_basic = new PDO($dsn_basic, $config['username'], $config['password']);
    $pdo_basic->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    output("✅ Conexión al servidor MySQL exitosa");
    
    // Paso 2: Listar bases de datos disponibles
    output("📊 Paso 2: Listando bases de datos disponibles...");
    $stmt = $pdo_basic->query("SHOW DATABASES");
    $databases = $stmt->fetchAll(PDO::FETCH_COLUMN);
    foreach ($databases as $db) {
        if (strpos($db, 'u722312752') !== false || $db === $config['dbname']) {
            output("🎯 $db (OBJETIVO)");
        } else {
            output("   $db");
        }
    }
    output("");
    
    // Paso 3: Verificar si nuestra BD existe
    if (in_array($config['dbname'], $databases)) {
        output("✅ Base de datos '{$config['dbname']}' EXISTE");
        
        // Paso 4: Conectar a nuestra BD específica
        output("🔗 Paso 4: Conectando a la base de datos específica...");
        $dsn_full = "mysql:host={$config['host']};dbname={$config['dbname']};charset=utf8mb4";
        $pdo = new PDO($dsn_full, $config['username'], $config['password']);
        $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        output("✅ Conexión a la BD específica exitosa");
        
        // Paso 5: Verificar tablas
        output("🗂️  Paso 5: Verificando tablas...");
        $stmt = $pdo->query("SHOW TABLES");
        $tablas = $stmt->fetchAll(PDO::FETCH_COLUMN);
        
        if (empty($tablas)) {
            output("⚠️  La base de datos está VACÍA - No hay tablas");
            output("💡 Solución: Ejecutar create_retos_database.sql");
        } else {
            output("📋 Tablas encontradas:");
            foreach ($tablas as $tabla) {
                try {
                    $count_stmt = $pdo->query("SELECT COUNT(*) FROM `$tabla`");
                    $count = $count_stmt->fetchColumn();
                    output("   ✅ $tabla: $count registros");
                } catch (PDOException $e) {
                    output("   ❌ $tabla: Error - " . $e->getMessage());
                }
            }
        }
        
        // Paso 6: Verificar permisos
        output("🔐 Paso 6: Verificando permisos...");
        try {
            $pdo->query("SELECT 1");
            output("✅ Permiso SELECT: OK");
        } catch (PDOException $e) {
            output("❌ Permiso SELECT: FALLO");
        }
        
        try {
            $pdo->query("CREATE TEMPORARY TABLE test_temp (id INT)");
            output("✅ Permiso CREATE: OK");
        } catch (PDOException $e) {
            output("❌ Permiso CREATE: FALLO");
        }
        
    } else {
        output("❌ Base de datos '{$config['dbname']}' NO EXISTE");
        output("💡 Solución: Crear la BD desde el panel de Hostinger");
        output("📋 Bases disponibles con tu usuario:");
        foreach ($databases as $db) {
            if (strpos($db, 'u722312752') !== false) {
                output("   🎯 $db");
            }
        }
    }
    
} catch (PDOException $e) {
    output("❌ ERROR DE CONEXIÓN:");
    output("Código: " . $e->getCode());
    output("Mensaje: " . $e->getMessage());
    output("");
    
    output("🔧 POSIBLES SOLUCIONES:");
    
    if (strpos($e->getMessage(), 'Access denied') !== false) {
        output("1. ❌ Credenciales incorrectas");
        output("   - Verificar usuario y contraseña en Hostinger");
        output("   - Asegurar que el usuario tiene acceso a MySQL");
    }
    
    if (strpos($e->getMessage(), 'Unknown database') !== false) {
        output("2. ❌ Base de datos no existe");
        output("   - Crear la BD desde el panel de Hostinger");
        output("   - Verificar el nombre exacto de la BD");
    }
    
    if (strpos($e->getMessage(), 'Connection refused') !== false) {
        output("3. ❌ Servidor MySQL no disponible");
        output("   - Verificar que MySQL esté activo");
        output("   - Comprobar el host (puede no ser 'localhost')");
    }
    
    output("4. 🌐 Hostinger puede usar hosts específicos:");
    output("   - Intentar con: mysql.hostinger.com");
    output("   - O el host específico de tu plan");
}

output("");
output("📝 PRÓXIMOS PASOS RECOMENDADOS:");
output("1. Si la conexión OK: Ejecutar create_retos_database.sql");
output("2. Luego ejecutar: migrate_all_retos.php");
output("3. Probar API: /api/retos.php?action=list");
output("4. Usar admin: /admin/retos.html");

if (php_sapi_name() !== 'cli') {
    echo "</body></html>";
}
?>
