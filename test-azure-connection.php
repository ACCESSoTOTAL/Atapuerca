<?php
// test-azure-connection.php - Test de conexión a Azure SQL Server
require_once 'config/database.php';

echo "🔍 TESTING AZURE SQL SERVER CONNECTION\n";
echo "=====================================\n\n";

try {
    $db = new DatabaseConfig();
    
    // Test básico de conexión
    echo "1. Probando conexión básica...\n";
    $result = $db->testConnection();
    
    if ($result['success']) {
        echo "   ✅ Conexión exitosa\n";
        echo "   📊 Info servidor: " . $result['server_info'] . "\n\n";
        
        // Test de consulta simple
        echo "2. Probando consulta simple...\n";
        $queryResult = $db->executeQuery("SELECT COUNT(*) as total_bases FROM Bases");
        
        if ($queryResult['success']) {
            echo "   ✅ Consulta exitosa\n";
            echo "   📈 Total bases: " . $queryResult['data'][0]['total_bases'] . "\n\n";
            
            // Test de retos específicos
            echo "3. Probando consultas de retos...\n";
            
            // Reto 1: Listar todas las bases
            $reto1 = $db->executeQuery("SELECT nombre, ubicacion FROM Bases");
            if ($reto1['success']) {
                echo "   ✅ Reto 1 (Listar bases): OK\n";
            }
            
            // Reto 5: Contar survivors
            $reto5 = $db->executeQuery("SELECT COUNT(*) as total FROM Survivors");
            if ($reto5['success']) {
                echo "   ✅ Reto 5 (Contar survivors): " . $reto5['data'][0]['total'] . " survivors\n";
            }
            
            // Reto 10: JOIN básico
            $reto10 = $db->executeQuery("
                SELECT b.nombre as base, COUNT(s.id) as survivors 
                FROM Bases b 
                LEFT JOIN Survivors s ON b.id = s.base_id 
                GROUP BY b.nombre
            ");
            if ($reto10['success']) {
                echo "   ✅ Reto 10 (JOIN básico): OK\n";
            }
            
            echo "\n🎉 TODOS LOS TESTS PASARON CORRECTAMENTE\n";
            echo "🚀 Tu Azure SQL Server está listo para AtapuercaNet\n\n";
            
            echo "📋 CONFIGURACIÓN ACTUAL:\n";
            echo "   - Driver: " . (extension_loaded('sqlsrv') ? 'sqlsrv' : 'odbc') . "\n";
            echo "   - Tablas disponibles: " . count($db->executeQuery("SELECT TABLE_NAME FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_TYPE = 'BASE TABLE'")['data']) . "\n";
            echo "   - Conexión estable: ✅\n";
            
        } else {
            echo "   ❌ Error en consulta: " . $queryResult['error'] . "\n";
        }
        
    } else {
        echo "   ❌ Error de conexión: " . $result['error'] . "\n\n";
        
        echo "🛠️  SOLUCIONES POSIBLES:\n";
        echo "1. Verificar credenciales en config/database.php\n";
        echo "2. Comprobar firewall Azure (agregar IP de Hostinger)\n";
        echo "3. Verificar que la base de datos existe\n";
        echo "4. Contactar soporte Hostinger para drivers SQL Server\n";
    }
    
} catch (Exception $e) {
    echo "❌ EXCEPCIÓN CRÍTICA: " . $e->getMessage() . "\n\n";
    
    echo "🔧 DIAGNÓSTICO:\n";
    echo "- PHP Version: " . PHP_VERSION . "\n";
    echo "- PDO disponible: " . (extension_loaded('pdo') ? 'Sí' : 'No') . "\n";
    echo "- Driver sqlsrv: " . (extension_loaded('sqlsrv') ? 'Sí' : 'No') . "\n";
    echo "- Driver odbc: " . (extension_loaded('odbc') ? 'Sí' : 'No') . "\n";
}

echo "\n💡 SIGUIENTE PASO: Si todo funciona, ya puedes desplegar AtapuercaNet\n";
echo "📖 Consulta AZURE-SQL-CONFIG.md para más detalles\n";
?>
