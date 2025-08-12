<?php
/**
 * MIGRACIÓN CORREGIDA - ATAPUERCA NET
 * Lee retos desde /js/retos.js (archivo correcto)
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

echo "<html><head><title>Migración Corregida</title>";
echo "<style>body{font-family:monospace;background:#000;color:#0f0;padding:20px;margin:0;}";
echo ".success{color:#0f0;} .error{color:#f44;} .warning{color:#fa0;} .info{color:#09f;}</style></head><body>";

function output($mensaje, $clase = 'info') {
    echo "<div class='$clase'>$mensaje</div>";
    flush();
}

try {
    // Conexión
    $pdo = new PDO(
        "mysql:host={$config['host']};dbname={$config['dbname']};charset=utf8mb4",
        $config['username'],
        $config['password']
    );
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    
    output("🚀 MIGRACIÓN CORREGIDA DE RETOS", 'info');
    output("================================", 'info');
    
    // Limpiar datos existentes
    output("\n🧹 Limpiando datos existentes...", 'warning');
    $pdo->exec("DELETE FROM validaciones_reto");
    $pdo->exec("DELETE FROM retos");
    output("✅ Datos limpiados", 'success');
    
    // Leer archivo JavaScript correcto
    $js_path = '../js/retos.js';
    output("\n📁 Leyendo archivo: $js_path", 'info');
    
    if (!file_exists($js_path)) {
        throw new Exception("Archivo no encontrado: $js_path");
    }
    
    $js_content = file_get_contents($js_path);
    output("✅ Archivo leído: " . strlen($js_content) . " caracteres", 'success');
    
    // Extraer el array de retos usando regex mejorado
    output("\n🔍 Extrayendo retos del JavaScript...", 'info');
    
    // Buscar la definición del array de retos
    $pattern = '/const\s+retos\s*=\s*\[(.*?)\];/s';
    if (!preg_match($pattern, $js_content, $matches)) {
        throw new Exception("No se pudo encontrar el array 'const retos' en el archivo");
    }
    
    $retos_content = $matches[1];
    output("✅ Array de retos extraído", 'success');
    
    // Regex mejorado para extraer cada reto individual
    $reto_pattern = '/\{[^{}]*(?:\{[^{}]*\}[^{}]*)*\}/';
    preg_match_all($reto_pattern, $retos_content, $reto_matches);
    
    $retos_encontrados = count($reto_matches[0]);
    output("🎯 Retos encontrados: $retos_encontrados", 'success');
    
    if ($retos_encontrados == 0) {
        throw new Exception("No se encontraron retos en el array");
    }
    
    // Preparar statements
    $stmt_reto = $pdo->prepare("
        INSERT INTO retos (reto_numero, fase, nivel, titulo, descripcion, consulta_sugerida, pista, puntos, video_url)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    ");
    
    $stmt_validacion = $pdo->prepare("
        INSERT INTO validaciones_reto (reto_numero, palabra_clave, es_obligatoria, descripcion)
        VALUES (?, ?, ?, ?)
    ");
    
    $total_retos = 0;
    $total_validaciones = 0;
    
    output("\n📝 Procesando retos individuales...", 'info');
    
    foreach ($reto_matches[0] as $i => $reto_text) {
        try {
            // Extraer campos individuales
            $id = null;
            $fase = null;
            $nivel = '';
            $titulo = '';
            $descripcion = '';
            $consulta = '';
            $pista = '';
            $puntos = 0;
            $video = '';
            
            // Extraer ID
            if (preg_match('/id:\s*(\d+)/', $reto_text, $match)) {
                $id = (int)$match[1];
            }
            
            // Extraer fase
            if (preg_match('/fase:\s*(\d+)/', $reto_text, $match)) {
                $fase = (int)$match[1];
            }
            
            // Extraer nivel
            if (preg_match('/nivel:\s*["\']([^"\']*)["\']/', $reto_text, $match)) {
                $nivel = $match[1];
            }
            
            // Extraer título
            if (preg_match('/titulo:\s*["\']([^"\']*)["\']/', $reto_text, $match)) {
                $titulo = $match[1];
            }
            
            // Extraer descripción
            if (preg_match('/descripcion:\s*["\']([^"\']*)["\']/', $reto_text, $match)) {
                $descripcion = $match[1];
            }
            
            // Extraer consulta sugerida
            if (preg_match('/consulta_sugerida:\s*["\']([^"\']*)["\']/', $reto_text, $match)) {
                $consulta = $match[1];
            }
            
            // Extraer pista
            if (preg_match('/pista:\s*["\']([^"\']*)["\']/', $reto_text, $match)) {
                $pista = $match[1];
            }
            
            // Extraer puntos
            if (preg_match('/puntos:\s*(\d+)/', $reto_text, $match)) {
                $puntos = (int)$match[1];
            }
            
            // Extraer video URL
            if (preg_match('/videoUrl:\s*["\']([^"\']*)["\']/', $reto_text, $match)) {
                $video = $match[1];
            }
            
            // Validar campos obligatorios
            if (!$id || !$fase || !$titulo) {
                output("⚠️ Reto $i: campos faltantes (id:$id, fase:$fase, titulo:'$titulo')", 'warning');
                continue;
            }
            
            // Insertar reto
            $stmt_reto->execute([
                $id, $fase, $nivel, $titulo, $descripcion, 
                $consulta, $pista, $puntos, $video
            ]);
            $total_retos++;
            
            // Crear validaciones automáticas básicas
            $palabras_clave = [];
            
            // Detectar palabras clave en el título y descripción
            $texto_completo = strtolower($titulo . ' ' . $descripcion);
            
            // Palabras SQL importantes
            $sql_keywords = ['SELECT', 'FROM', 'WHERE', 'JOIN', 'GROUP BY', 'ORDER BY', 'HAVING', 'COUNT', 'SUM', 'AVG'];
            foreach ($sql_keywords as $keyword) {
                if (stripos($texto_completo, strtolower($keyword)) !== false) {
                    $palabras_clave[] = $keyword;
                }
            }
            
            // Detectar nombres de tablas
            $tablas = ['Bases', 'Survivors', 'Resources', 'Attacks', 'Missions', 'Alliances', 'Robots', 'RobotSightings', 'Supplies', 'DistanceMatrix'];
            foreach ($tablas as $tabla) {
                if (stripos($texto_completo, strtolower($tabla)) !== false) {
                    $palabras_clave[] = $tabla;
                }
            }
            
            // Si no hay palabras clave, usar algunas genéricas
            if (empty($palabras_clave)) {
                $palabras_clave = ['SELECT', 'FROM'];
            }
            
            // Insertar validaciones
            foreach ($palabras_clave as $palabra) {
                $stmt_validacion->execute([
                    $id, $palabra, true, 
                    "Validación automática para '$palabra'"
                ]);
                $total_validaciones++;
            }
            
            if ($total_retos % 10 == 0) {
                output("✅ Procesados $total_retos retos...", 'success');
            }
            
        } catch (Exception $e) {
            output("❌ Error procesando reto $i: " . $e->getMessage(), 'error');
        }
    }
    
    // Estadísticas finales
    output("\n🎉 MIGRACIÓN COMPLETADA", 'success');
    output("======================", 'success');
    output("📊 Retos migrados: $total_retos", 'success');
    output("🔧 Validaciones creadas: $total_validaciones", 'success');
    
    // Verificar distribución por fases
    $stmt = $pdo->query("
        SELECT fase, COUNT(*) as cantidad, SUM(puntos) as puntos_total
        FROM retos 
        GROUP BY fase 
        ORDER BY fase
    ");
    $fases = $stmt->fetchAll(PDO::FETCH_ASSOC);
    
    output("\n📈 DISTRIBUCIÓN POR FASES:", 'info');
    foreach ($fases as $fase) {
        output("Fase {$fase['fase']}: {$fase['cantidad']} retos, {$fase['puntos_total']} puntos", 'info');
    }
    
    if ($total_retos >= 60) {
        output("\n🏆 ¡MIGRACIÓN COMPLETA! Todos los retos transferidos", 'success');
    } else {
        output("\n⚠️ Migración parcial. Verificar archivo JavaScript", 'warning');
    }
    
    output("\n🔗 PRÓXIMOS PASOS:", 'info');
    output("1. API: <a href='../api/retos.php?action=list' style='color:#0ff'>../api/retos.php?action=list</a>", 'info');
    output("2. Admin: <a href='../admin/retos.html' style='color:#0ff'>../admin/retos.html</a>", 'info');
    
} catch (Exception $e) {
    output("❌ ERROR FATAL: " . $e->getMessage(), 'error');
}

echo "</body></html>";
?>
