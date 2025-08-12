<?php
/**
 * ATAPUERCA NET - MIGRACIÓN COMPLETA DE RETOS
 * Script para migrar todos los 60 retos desde JS a MySQL Hostinger
 * Configurado para: u722312752_atapuerca_reto
 */

// Configuración de Hostinger
$config = [
    'host' => 'localhost',
    'dbname' => 'u722312752_atapuerca_reto',
    'username' => 'u722312752_adan',
    'password' => 'Nocomas1manzana.'
];

function extraerRetosDeJS($archivoJS) {
    $contenido = file_get_contents($archivoJS);
    
    // Extraer el array de retos usando regex más robusto
    $patron = '/const\s+retos\s*=\s*\[(.*?)\];/s';
    preg_match($patron, $contenido, $matches);
    
    if (!isset($matches[1])) {
        throw new Exception("No se pudo encontrar el array de retos en el archivo JS");
    }
    
    $retosString = $matches[1];
    
    // Extraer cada reto individual
    $patronReto = '/\{\s*id:\s*(\d+),\s*fase:\s*(\d+),\s*nivel:\s*["\']([^"\']*)["\'],\s*titulo:\s*["\']([^"\']*)["\'],\s*descripcion:\s*["\']([^"\']*)["\'],\s*consulta_sugerida:\s*["\']([^"\']*)["\'],\s*pista:\s*["\']([^"\']*)["\'],\s*puntos:\s*(\d+),?\s*videoUrl:\s*["\']([^"\']*)["\']?\s*\}/s';
    
    preg_match_all($patronReto, $retosString, $matches, PREG_SET_ORDER);
    
    $retos = [];
    foreach ($matches as $match) {
        $retos[] = [
            'id' => (int)$match[1],
            'fase' => (int)$match[2],
            'nivel' => trim($match[3]),
            'titulo' => trim($match[4]),
            'descripcion' => trim($match[5]),
            'consulta_sugerida' => trim($match[6]),
            'pista' => trim($match[7]),
            'puntos' => (int)$match[8],
            'video_url' => trim($match[9])
        ];
    }
    
    return $retos;
}

function crearValidaciones($reto) {
    $consultaLower = strtolower($reto['consulta_sugerida']);
    $validaciones = [];
    
    // Detectar patrones en la consulta para crear validaciones automáticas
    $palabrasClave = [];
    
    if (strpos($consultaLower, 'with') !== false) {
        $palabrasClave[] = 'with';
    }
    if (strpos($consultaLower, 'join') !== false) {
        $palabrasClave[] = 'join';
    }
    if (strpos($consultaLower, 'group by') !== false) {
        $palabrasClave[] = 'group';
    }
    if (strpos($consultaLower, 'union') !== false) {
        $palabrasClave[] = 'union';
    }
    if (strpos($consultaLower, 'count') !== false) {
        $palabrasClave[] = 'count';
    }
    if (strpos($consultaLower, 'sum') !== false) {
        $palabrasClave[] = 'sum';
    }
    if (strpos($consultaLower, 'avg') !== false) {
        $palabrasClave[] = 'avg';
    }
    if (strpos($consultaLower, 'where') !== false) {
        $palabrasClave[] = 'where';
    }
    
    // Validaciones específicas por reto
    switch ($reto['id']) {
        case 56:
            $palabrasClave = ['with', 'capacidadmedica', 'cobertura'];
            break;
        case 57:
            $palabrasClave = ['with', 'intercambios', 'per capita'];
            break;
        case 58:
            $palabrasClave = ['with', 'liderazgo', 'sucesion'];
            break;
        case 59:
            $palabrasClave = ['with', 'expansion', 'viabilidad'];
            break;
        case 60:
            $palabrasClave = ['with', 'baselineactual', 'proyeccion', 'union all'];
            break;
    }
    
    // Determinar mínimo de resultados según la fase
    $minResultados = 1;
    if ($reto['fase'] == 1) $minResultados = 3;
    elseif ($reto['fase'] == 2) $minResultados = 4;
    elseif ($reto['fase'] == 3) $minResultados = 5;
    elseif ($reto['fase'] == 4) $minResultados = 6;
    elseif ($reto['fase'] == 5) $minResultados = 6;
    
    // Para retos específicos ajustar
    if (in_array($reto['id'], [56, 57, 58, 59, 60])) {
        $minResultados = 6;
    }
    
    foreach ($palabrasClave as $palabra) {
        $validaciones[] = [
            'palabra_clave' => $palabra,
            'es_obligatoria' => true,
            'min_resultados' => $minResultados,
            'descripcion' => "Reto {$reto['id']} debe incluir: $palabra"
        ];
    }
    
    return $validaciones;
}

function migrarTodosLosRetos($config) {
    try {
        echo "🚀 Iniciando migración completa de retos...\n";
        
        // Conexión a MySQL
        $pdo = new PDO(
            "mysql:host={$config['host']};dbname={$config['dbname']};charset=utf8mb4",
            $config['username'],
            $config['password']
        );
        $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        
        echo "✅ Conexión a MySQL Hostinger exitosa\n";
        
        // Extraer retos del archivo JS
        $retos = extraerRetosDeJS('../js/retos.js');
        echo "📖 Extraídos " . count($retos) . " retos del archivo JS\n";
        
        // Preparar statements
        $stmtReto = $pdo->prepare("
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
        
        $stmtValidacion = $pdo->prepare("
            INSERT INTO validaciones_reto (reto_numero, palabra_clave, es_obligatoria, min_resultados, descripcion)
            VALUES (?, ?, ?, ?, ?)
            ON DUPLICATE KEY UPDATE
                es_obligatoria = VALUES(es_obligatoria),
                min_resultados = VALUES(min_resultados),
                descripcion = VALUES(descripcion)
        ");
        
        $retosInsertados = 0;
        $validacionesInsertadas = 0;
        
        // Procesar cada reto
        foreach ($retos as $reto) {
            // Insertar reto
            $stmtReto->execute([
                $reto['id'],
                $reto['fase'],
                $reto['nivel'],
                $reto['titulo'],
                $reto['descripcion'],
                $reto['consulta_sugerida'],
                $reto['pista'],
                $reto['puntos'],
                $reto['video_url']
            ]);
            
            // Limpiar validaciones existentes del reto
            $pdo->prepare("DELETE FROM validaciones_reto WHERE reto_numero = ?")->execute([$reto['id']]);
            
            // Crear y insertar validaciones
            $validaciones = crearValidaciones($reto);
            foreach ($validaciones as $val) {
                $stmtValidacion->execute([
                    $reto['id'],
                    $val['palabra_clave'],
                    $val['es_obligatoria'],
                    $val['min_resultados'],
                    $val['descripcion']
                ]);
                $validacionesInsertadas++;
            }
            
            $retosInsertados++;
            echo "✅ Reto {$reto['id']}: {$reto['titulo']} (" . count($validaciones) . " validaciones)\n";
        }
        
        // Actualizar configuración del sistema
        $pdo->prepare("
            INSERT INTO configuracion_sistema (clave, valor, descripcion) 
            VALUES ('ultima_migracion', NOW(), 'Fecha de última migración desde JS')
            ON DUPLICATE KEY UPDATE valor = NOW()
        ")->execute();
        
        echo "\n🎉 MIGRACIÓN COMPLETADA:\n";
        echo "   📦 $retosInsertados retos migrados\n";
        echo "   🔍 $validacionesInsertadas validaciones creadas\n";
        
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
        
        echo "\n📊 ESTADÍSTICAS POR FASE:\n";
        foreach ($stats as $stat) {
            echo "   Fase {$stat['fase']}: {$stat['total_retos']} retos, {$stat['total_puntos']} puntos\n";
        }
        
        // Verificar retos críticos
        $retosCriticos = [56, 57, 58, 59, 60];
        echo "\n🔍 VERIFICANDO RETOS CRÍTICOS:\n";
        foreach ($retosCriticos as $id) {
            $reto = $pdo->prepare("SELECT titulo FROM retos WHERE reto_numero = ?")->execute([$id]);
            $reto = $pdo->prepare("SELECT titulo FROM retos WHERE reto_numero = ?")->fetch(PDO::FETCH_ASSOC);
            if ($reto) {
                echo "   ✅ Reto $id: OK\n";
            } else {
                echo "   ❌ Reto $id: FALTA\n";
            }
        }
        
        echo "\n✨ ¡Sistema de retos MySQL listo para usar!\n";
        
        return true;
        
    } catch (Exception $e) {
        echo "❌ ERROR: " . $e->getMessage() . "\n";
        return false;
    }
}

// Ejecutar migración
echo "🛰️ ATAPUERCA NET - MIGRACIÓN A MYSQL HOSTINGER\n";
echo "===============================================\n\n";

if (migrarTodosLosRetos($config)) {
    echo "\n🚀 ¡Migración exitosa! El sistema MySQL está listo.\n";
} else {
    echo "\n💥 Error en la migración. Revisa los logs.\n";
}
?>
