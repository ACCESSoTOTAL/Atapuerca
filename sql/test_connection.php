<?php
/**
 * ATAPUERCA NET - PRUEBA DE CONEXIÓN MYSQL
 * Script para verificar la conexión y configuración
 */

// Configuración de Hostinger
$config = [
    'host' => 'localhost',
    'dbname' => 'u722312752_atapuerca_reto',
    'username' => 'u722312752_adan',
    'password' => 'Nocomas1manzana.'
];

echo "🛰️ ATAPUERCA NET - PRUEBA DE CONEXIÓN MYSQL\n";
echo "===========================================\n\n";

try {
    // Intentar conexión
    echo "🔗 Intentando conectar a MySQL...\n";
    $pdo = new PDO(
        "mysql:host={$config['host']};dbname={$config['dbname']};charset=utf8mb4",
        $config['username'],
        $config['password']
    );
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    
    echo "✅ Conexión exitosa a: {$config['dbname']}\n\n";
    
    // Verificar si las tablas existen
    echo "🔍 Verificando estructura de base de datos...\n";
    
    $tablas = ['retos', 'validaciones_reto', 'progreso_usuario', 'configuracion_sistema'];
    
    foreach ($tablas as $tabla) {
        try {
            $stmt = $pdo->query("SELECT COUNT(*) FROM $tabla");
            $count = $stmt->fetchColumn();
            echo "✅ Tabla '$tabla': $count registros\n";
        } catch (PDOException $e) {
            echo "❌ Tabla '$tabla': NO EXISTE - " . $e->getMessage() . "\n";
        }
    }
    
    echo "\n📊 Estado del sistema:\n";
    
    // Verificar configuración
    try {
        $stmt = $pdo->query("SELECT clave, valor FROM configuracion_sistema");
        $configs = $stmt->fetchAll(PDO::FETCH_KEY_PAIR);
        
        if (empty($configs)) {
            echo "⚠️  Sin configuraciones del sistema\n";
        } else {
            foreach ($configs as $clave => $valor) {
                echo "   $clave: $valor\n";
            }
        }
    } catch (PDOException $e) {
        echo "❌ Error leyendo configuración: " . $e->getMessage() . "\n";
    }
    
    echo "\n🎯 Recomendaciones:\n";
    echo "1. Si las tablas no existen, ejecuta: create_retos_database.sql\n";
    echo "2. Para migrar retos, ejecuta: migrate_all_retos.php\n";
    echo "3. Usa el panel admin en: /admin/retos.html\n";
    echo "4. API disponible en: /api/retos.php\n";
    
} catch (PDOException $e) {
    echo "❌ ERROR DE CONEXIÓN: " . $e->getMessage() . "\n\n";
    echo "🔧 Posibles soluciones:\n";
    echo "1. Verificar que la base de datos existe en Hostinger\n";
    echo "2. Comprobar las credenciales de acceso\n";
    echo "3. Asegurar que el usuario tiene permisos\n";
    echo "4. Verificar que MySQL esté activo\n";
}

echo "\n✨ Fin de la prueba\n";
?>
