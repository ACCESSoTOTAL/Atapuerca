<?php
/**
 * ATAPUERCA NET - MIGRACIÓN DE RETOS A MYSQL
 * Script para migrar retos desde JavaScript a base de datos MySQL
 * Fecha: 2025-08-12
 */

// Configuración de la base de datos MySQL en Hostinger
$host = 'localhost'; // En Hostinger suele ser localhost
$dbname = 'u722312752_atapuerca_reto';
$username = 'u722312752_adan'; 
$password = 'Nocomas1manzana.';

try {
    // Conexión a MySQL
    $pdo = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8mb4", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    
    echo "✅ Conexión a MySQL exitosa\n";
    
    // Leer el archivo retos.js
    $retosJs = file_get_contents('../js/retos.js');
    
    // Extraer los retos usando regex (método simple)
    preg_match_all('/{\s*id:\s*(\d+),\s*fase:\s*(\d+),\s*nivel:\s*["\']([^"\']+)["\'],\s*titulo:\s*["\']([^"\']+)["\'],\s*descripcion:\s*["\']([^"\']+)["\'],\s*consulta_sugerida:\s*["\']([^"\']+)["\'],\s*pista:\s*["\']([^"\']*)["\'],\s*puntos:\s*(\d+),?\s*videoUrl:\s*["\']([^"\']*)["\']?\s*}/s', $retosJs, $matches, PREG_SET_ORDER);
    
    // Preparar statements
    $insertReto = $pdo->prepare("
        INSERT INTO retos (reto_numero, fase, nivel, titulo, descripcion, consulta_sugerida, pista, puntos, video_url) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
        ON DUPLICATE KEY UPDATE
        fase = VALUES(fase),
        nivel = VALUES(nivel),
        titulo = VALUES(titulo),
        descripcion = VALUES(descripcion),
        consulta_sugerida = VALUES(consulta_sugerida),
        pista = VALUES(pista),
        puntos = VALUES(puntos),
        video_url = VALUES(video_url)
    ");
    
    $insertValidacion = $pdo->prepare("
        INSERT INTO validaciones_reto (reto_numero, palabra_clave, es_obligatoria, min_resultados, descripcion)
        VALUES (?, ?, ?, ?, ?)
        ON DUPLICATE KEY UPDATE
        es_obligatoria = VALUES(es_obligatoria),
        min_resultados = VALUES(min_resultados),
        descripcion = VALUES(descripcion)
    ");
    
    $retosInsertados = 0;
    
    // Procesar cada reto encontrado
    foreach ($matches as $match) {
        $retoNumero = (int)$match[1];
        $fase = (int)$match[2];
        $nivel = trim($match[3]);
        $titulo = trim($match[4]);
        $descripcion = trim($match[5]);
        $consultaSugerida = trim($match[6]);
        $pista = trim($match[7]);
        $puntos = (int)$match[8];
        $videoUrl = trim($match[9]);
        
        // Insertar reto
        $insertReto->execute([
            $retoNumero, $fase, $nivel, $titulo, $descripcion, 
            $consultaSugerida, $pista, $puntos, $videoUrl
        ]);
        
        // Crear validaciones básicas basadas en el contenido
        $validaciones = [];
        
        // Detectar palabras clave comunes
        $consultaLower = strtolower($consultaSugerida);
        
        if (strpos($consultaLower, 'with') !== false) {
            $validaciones[] = ['with', true, 1, 'Debe usar CTE (WITH)'];
        }
        if (strpos($consultaLower, 'join') !== false) {
            $validaciones[] = ['join', true, 1, 'Debe usar JOIN'];
        }
        if (strpos($consultaLower, 'group by') !== false) {
            $validaciones[] = ['group', true, 1, 'Debe usar GROUP BY'];
        }
        if (strpos($consultaLower, 'union') !== false) {
            $validaciones[] = ['union', true, 1, 'Debe usar UNION'];
        }
        
        // Determinar mínimo de resultados según la fase
        $minResultados = $fase <= 2 ? 3 : ($fase <= 4 ? 5 : 6);
        
        // Insertar validaciones
        foreach ($validaciones as $val) {
            $insertValidacion->execute([
                $retoNumero, $val[0], $val[1], $minResultados, $val[3]
            ]);
        }
        
        $retosInsertados++;
        echo "✅ Reto $retoNumero migrado: $titulo\n";
    }
    
    echo "\n🎉 Migración completada: $retosInsertados retos insertados\n";
    
    // Mostrar estadísticas
    $stats = $pdo->query("
        SELECT 
            fase,
            COUNT(*) as total_retos,
            SUM(puntos) as total_puntos,
            AVG(puntos) as promedio_puntos
        FROM retos 
        GROUP BY fase 
        ORDER BY fase
    ")->fetchAll(PDO::FETCH_ASSOC);
    
    echo "\n📊 Estadísticas por fase:\n";
    foreach ($stats as $stat) {
        echo "Fase {$stat['fase']}: {$stat['total_retos']} retos, {$stat['total_puntos']} puntos total\n";
    }
    
} catch (PDOException $e) {
    echo "❌ Error: " . $e->getMessage() . "\n";
    exit(1);
}
?>
