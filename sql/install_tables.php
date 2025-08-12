<?php
/**
 * ATAPUERCA NET - INSTALADOR DE TABLAS MYSQL
 * Script web para crear todas las tablas automáticamente
 */

// Mostrar errores
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Configuración
$config = [
    'host' => 'localhost',
    'dbname' => 'u722312752_atapuerca_reto',
    'username' => 'u722312752_adan',
    'password' => 'Nocomas1manzana.'
];

// Header para web
echo "<html><head><title>Instalador AtapuercaNet MySQL</title>";
echo "<style>body{font-family:monospace;background:#000;color:#0f0;padding:20px;margin:0;}";
echo ".success{color:#0f0;} .error{color:#f44;} .warning{color:#fa0;} .info{color:#09f;}</style></head><body>";

function output($mensaje, $clase = 'info') {
    echo "<div class='$clase'>$mensaje</div>";
    flush();
}

output("🛰️ ATAPUERCA NET - INSTALADOR DE TABLAS MYSQL", 'info');
output("================================================", 'info');
output("");

try {
    // Conexión
    output("🔗 Conectando a MySQL...", 'info');
    $pdo = new PDO(
        "mysql:host={$config['host']};dbname={$config['dbname']};charset=utf8mb4",
        $config['username'],
        $config['password']
    );
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    output("✅ Conexión exitosa", 'success');
    
    // SQL para crear las tablas
    $sql_statements = [
        // Tabla retos
        "CREATE TABLE IF NOT EXISTS retos (
            id INT PRIMARY KEY AUTO_INCREMENT,
            reto_numero INT NOT NULL UNIQUE,
            fase INT NOT NULL,
            nivel VARCHAR(20) NOT NULL,
            titulo VARCHAR(200) NOT NULL,
            descripcion TEXT NOT NULL,
            consulta_sugerida TEXT NOT NULL,
            pista TEXT,
            puntos INT NOT NULL DEFAULT 0,
            video_url VARCHAR(500),
            activo BOOLEAN DEFAULT TRUE,
            fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            fecha_actualizacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
            INDEX idx_fase (fase),
            INDEX idx_nivel (nivel),
            INDEX idx_puntos (puntos),
            INDEX idx_activo (activo)
        ) ENGINE=InnoDB CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci",
        
        // Tabla validaciones_reto
        "CREATE TABLE IF NOT EXISTS validaciones_reto (
            id INT PRIMARY KEY AUTO_INCREMENT,
            reto_numero INT NOT NULL,
            palabra_clave VARCHAR(100) NOT NULL,
            es_obligatoria BOOLEAN DEFAULT TRUE,
            min_resultados INT DEFAULT 1,
            descripcion VARCHAR(200),
            FOREIGN KEY (reto_numero) REFERENCES retos(reto_numero) ON DELETE CASCADE,
            INDEX idx_reto_numero (reto_numero)
        ) ENGINE=InnoDB CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci",
        
        // Tabla progreso_usuario
        "CREATE TABLE IF NOT EXISTS progreso_usuario (
            id INT PRIMARY KEY AUTO_INCREMENT,
            usuario_id VARCHAR(100) NOT NULL,
            reto_numero INT NOT NULL,
            completado BOOLEAN DEFAULT FALSE,
            puntos_obtenidos INT DEFAULT 0,
            fecha_completado TIMESTAMP NULL,
            consulta_utilizada TEXT,
            tiempo_resolucion INT DEFAULT 0,
            UNIQUE KEY unique_usuario_reto (usuario_id, reto_numero),
            FOREIGN KEY (reto_numero) REFERENCES retos(reto_numero) ON DELETE CASCADE,
            INDEX idx_usuario (usuario_id),
            INDEX idx_completado (completado)
        ) ENGINE=InnoDB CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci",
        
        // Tabla configuracion_sistema
        "CREATE TABLE IF NOT EXISTS configuracion_sistema (
            clave VARCHAR(100) PRIMARY KEY,
            valor TEXT NOT NULL,
            descripcion VARCHAR(200),
            fecha_actualizacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
        ) ENGINE=InnoDB CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci"
    ];
    
    output("📋 Creando tablas...", 'info');
    
    // Ejecutar cada SQL
    foreach ($sql_statements as $i => $sql) {
        try {
            $pdo->exec($sql);
            $tabla_nombre = ['retos', 'validaciones_reto', 'progreso_usuario', 'configuracion_sistema'][$i];
            output("✅ Tabla '$tabla_nombre' creada exitosamente", 'success');
        } catch (PDOException $e) {
            output("❌ Error creando tabla: " . $e->getMessage(), 'error');
        }
    }
    
    // Insertar configuraciones iniciales
    output("⚙️ Insertando configuraciones iniciales...", 'info');
    
    $configuraciones = [
        ['version_sistema', '2.1.0', 'Versión actual del sistema de retos'],
        ['total_retos', '60', 'Número total de retos disponibles'],
        ['puntos_maximos', '2250', 'Puntos máximos que se pueden obtener'],
        ['servidor_sql', 'atapuerca.database.windows.net', 'Servidor SQL principal'],
        ['base_datos_principal', 'AtapuercaNet', 'Base de datos principal de Atapuerca'],
        ['instalacion_fecha', date('Y-m-d H:i:s'), 'Fecha de instalación del sistema']
    ];
    
    $stmt_config = $pdo->prepare("
        INSERT INTO configuracion_sistema (clave, valor, descripcion) 
        VALUES (?, ?, ?)
        ON DUPLICATE KEY UPDATE valor = VALUES(valor), descripcion = VALUES(descripcion)
    ");
    
    foreach ($configuraciones as $config_item) {
        $stmt_config->execute($config_item);
        output("✅ Configuración '{$config_item[0]}' insertada", 'success');
    }
    
    // Verificar instalación
    output("🔍 Verificando instalación...", 'info');
    
    $tablas_esperadas = ['retos', 'validaciones_reto', 'progreso_usuario', 'configuracion_sistema'];
    $stmt = $pdo->query("SHOW TABLES");
    $tablas_existentes = $stmt->fetchAll(PDO::FETCH_COLUMN);
    
    $todas_ok = true;
    foreach ($tablas_esperadas as $tabla) {
        if (in_array($tabla, $tablas_existentes)) {
            output("✅ Tabla '$tabla': OK", 'success');
        } else {
            output("❌ Tabla '$tabla': FALTA", 'error');
            $todas_ok = false;
        }
    }
    
    if ($todas_ok) {
        output("", 'info');
        output("🎉 ¡INSTALACIÓN COMPLETADA EXITOSAMENTE!", 'success');
        output("", 'info');
        output("📝 PRÓXIMOS PASOS:", 'info');
        output("1. Migrar retos: <a href='migrate_all_retos.php' style='color:#0ff;'>migrate_all_retos.php</a>", 'info');
        output("2. Probar API: <a href='../api/retos.php?action=list' style='color:#0ff;'>../api/retos.php?action=list</a>", 'info');
        output("3. Panel admin: <a href='../admin/retos.html' style='color:#0ff;'>../admin/retos.html</a>", 'info');
        output("4. Diagnóstico: <a href='diagnostico_mysql.php' style='color:#0ff;'>diagnostico_mysql.php</a>", 'info');
    } else {
        output("❌ Instalación incompleta. Revisar errores arriba.", 'error');
    }
    
} catch (PDOException $e) {
    output("❌ ERROR FATAL: " . $e->getMessage(), 'error');
    output("", 'info');
    output("🔧 Verificar:", 'warning');
    output("- Credenciales de base de datos", 'warning');
    output("- Permisos de usuario MySQL", 'warning');
    output("- Estado del servidor MySQL", 'warning');
}

echo "</body></html>";
?>
