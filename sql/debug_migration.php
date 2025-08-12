<?php
/**
 * DEPURADOR DE MIGRACIÓN - AtapuercaNet
 * Analiza en detalle el estado de la migración
 */

error_reporting(E_ALL);
ini_set('display_errors', 1);

// Configuración
$config = [
    'host' => 'localhost',
    'dbname' => 'u722312752_atapuerca_reto',
    'username' => 'u722312752_adan',
    'password' => 'Nocomas1manzana.'
];

echo "<html><head><title>Debug Migración</title>";
echo "<style>body{font-family:monospace;background:#000;color:#0f0;padding:20px;margin:0;}";
echo ".success{color:#0f0;} .error{color:#f44;} .warning{color:#fa0;} .info{color:#09f;}</style></head><body>";

function output($mensaje, $clase = 'info') {
    echo "<div class='$clase'>$mensaje</div>";
    flush();
}

try {
    $pdo = new PDO(
        "mysql:host={$config['host']};dbname={$config['dbname']};charset=utf8mb4",
        $config['username'],
        $config['password']
    );
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    
    output("🔍 ANÁLISIS DETALLADO DE MIGRACIÓN", 'info');
    output("=====================================", 'info');
    
    // 1. Verificar tablas
    output("\n1️⃣ VERIFICANDO TABLAS:", 'info');
    $stmt = $pdo->query("SHOW TABLES");
    $tablas = $stmt->fetchAll(PDO::FETCH_COLUMN);
    foreach ($tablas as $tabla) {
        output("✅ Tabla existe: $tabla", 'success');
    }
    
    // 2. Contar registros en cada tabla
    output("\n2️⃣ CONTEO DE REGISTROS:", 'info');
    
    $tablas_datos = ['retos', 'validaciones_reto', 'progreso_usuario', 'configuracion_sistema'];
    foreach ($tablas_datos as $tabla) {
        if (in_array($tabla, $tablas)) {
            $stmt = $pdo->query("SELECT COUNT(*) FROM $tabla");
            $count = $stmt->fetchColumn();
            $color = $count > 0 ? 'success' : 'warning';
            output("📊 $tabla: $count registros", $color);
        }
    }
    
    // 3. Ver estructura de retos
    output("\n3️⃣ ESTRUCTURA TABLA RETOS:", 'info');
    $stmt = $pdo->query("DESCRIBE retos");
    $campos = $stmt->fetchAll(PDO::FETCH_ASSOC);
    foreach ($campos as $campo) {
        output("🔧 {$campo['Field']}: {$campo['Type']}", 'info');
    }
    
    // 4. Ver algunos retos si existen
    output("\n4️⃣ MUESTRA DE RETOS:", 'info');
    $stmt = $pdo->query("SELECT COUNT(*) FROM retos");
    $total_retos = $stmt->fetchColumn();
    
    if ($total_retos > 0) {
        output("📋 Total retos: $total_retos", 'success');
        $stmt = $pdo->query("SELECT reto_numero, titulo, fase, nivel, puntos FROM retos ORDER BY reto_numero LIMIT 5");
        $retos = $stmt->fetchAll(PDO::FETCH_ASSOC);
        
        foreach ($retos as $reto) {
            output("🎯 Reto {$reto['reto_numero']}: {$reto['titulo']} (Fase {$reto['fase']}, {$reto['nivel']}, {$reto['puntos']} pts)", 'success');
        }
    } else {
        output("❌ NO HAY RETOS EN LA BASE DE DATOS", 'error');
    }
    
    // 5. Verificar archivo JS original
    output("\n5️⃣ VERIFICANDO ARCHIVO JAVASCRIPT:", 'info');
    
    $js_path = '../js/main.js';
    if (file_exists($js_path)) {
        $js_content = file_get_contents($js_path);
        $reto_matches = preg_match_all('/numero:\s*(\d+)/', $js_content, $matches);
        output("📁 Archivo JS encontrado: " . strlen($js_content) . " caracteres", 'success');
        output("🔢 Retos detectados en JS: " . count($matches[1]), 'success');
        
        if (count($matches[1]) > 0) {
            $primeros_retos = array_slice($matches[1], 0, 5);
            output("🎯 Primeros retos JS: " . implode(', ', $primeros_retos), 'info');
        }
    } else {
        output("❌ Archivo JS no encontrado en: $js_path", 'error');
    }
    
    // 6. Verificar errores de migración
    output("\n6️⃣ LOGS DE ERROR:", 'info');
    $error_log = error_get_last();
    if ($error_log) {
        output("⚠️ Último error PHP: " . $error_log['message'], 'warning');
    } else {
        output("✅ No hay errores PHP recientes", 'success');
    }
    
    // 7. Sugerencias
    output("\n7️⃣ DIAGNÓSTICO Y SOLUCIONES:", 'info');
    
    if ($total_retos == 0) {
        output("🔧 PROBLEMA: No hay retos migrados", 'error');
        output("💡 SOLUCIÓN: Ejecutar migración manual", 'warning');
        output("👉 <a href='migrate_all_retos.php?debug=1' style='color:#0ff'>migrate_all_retos.php?debug=1</a>", 'info');
    } else if ($total_retos < 60) {
        output("⚠️ PROBLEMA: Migración incompleta ($total_retos/60)", 'warning');
        output("💡 SOLUCIÓN: Re-ejecutar migración", 'warning');
    } else {
        output("🎉 ¡MIGRACIÓN COMPLETA!", 'success');
    }
    
} catch (PDOException $e) {
    output("❌ ERROR: " . $e->getMessage(), 'error');
}

echo "</body></html>";
?>
