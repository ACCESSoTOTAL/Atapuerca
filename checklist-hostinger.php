<?php
// CHECKLIST HOSTINGER - Extensiones PHP disponibles
header('Content-Type: text/plain; charset=utf-8');

echo "=== CHECKLIST PHP HOSTINGER ===\n";
echo "Fecha: " . date('Y-m-d H:i:s') . "\n";
echo "PHP Version: " . PHP_VERSION . "\n";
echo "Sistema: " . PHP_OS . "\n\n";

echo "=== EXTENSIONES SQL DISPONIBLES ===\n";
$sql_extensions = ['sqlsrv', 'pdo_sqlsrv', 'pdo_dblib', 'pdo_odbc', 'mysqli', 'pdo_mysql'];
foreach ($sql_extensions as $ext) {
    echo sprintf("%-12s: %s\n", $ext, extension_loaded($ext) ? '✅ CARGADA' : '❌ NO DISPONIBLE');
}

echo "\n=== DRIVERS PDO DISPONIBLES ===\n";
$pdo_drivers = PDO::getAvailableDrivers();
foreach ($pdo_drivers as $driver) {
    echo "✅ $driver\n";
}

echo "\n=== MÓDULOS CARGADOS (filtro sql) ===\n";
$modules = get_loaded_extensions();
foreach ($modules as $module) {
    if (stripos($module, 'sql') !== false || stripos($module, 'odbc') !== false || stripos($module, 'db') !== false) {
        echo "✅ $module\n";
    }
}

echo "\n=== CONFIGURACIÓN OpenSSL ===\n";
if (extension_loaded('openssl')) {
    echo "✅ OpenSSL cargado\n";
    echo "Versión: " . OPENSSL_VERSION_TEXT . "\n";
} else {
    echo "❌ OpenSSL NO disponible\n";
}

echo "\n=== CONFIGURACIÓN cURL ===\n";
if (extension_loaded('curl')) {
    $curl_info = curl_version();
    echo "✅ cURL: " . $curl_info['version'] . "\n";
    echo "SSL: " . $curl_info['ssl_version'] . "\n";
} else {
    echo "❌ cURL NO disponible\n";
}

echo "\n=== PRUEBA BÁSICA PDO ===\n";
try {
    // Test cada driver disponible
    foreach (PDO::getAvailableDrivers() as $driver) {
        echo "Driver $driver: disponible ✅\n";
    }
} catch (Exception $e) {
    echo "Error PDO: " . $e->getMessage() . "\n";
}

echo "\n=== FIN CHECKLIST ===\n";
?>
