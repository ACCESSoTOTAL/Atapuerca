<?php
/**
 * ATAPUERCA NET - MIGRACIÓN AVANZADA DE RETOS
 * Script mejorado para migrar retos desde JS a MySQL
 */

// Configuración
$config = [
    'host' => 'localhost',
    'dbname' => 'u722312752_atapuerca_reto',
    'username' => 'u722312752_adan',
    'password' => 'Nocomas1manzana.'
];

// Array con todos los retos extraídos del JavaScript
$retos = [
    // FASE 1 - BÁSICO
    [
        'reto_numero' => 1,
        'fase' => 1,
        'nivel' => 'Básico',
        'titulo' => '🏠 Exploración inicial - Las bases de Atapuerca',
        'descripcion' => 'Consulta básica para explorar las bases humanas del asentamiento. Muestra información esencial de cada base con capacidad definida.',
        'consulta_sugerida' => 'SELECT Nombre, Ubicacion, TipoBase, Capacidad FROM Bases WHERE TipoBase = \'Humana\' AND Capacidad IS NOT NULL;',
        'pista' => 'Filtra por bases humanas y que tengan capacidad definida',
        'puntos' => 10,
        'video_url' => 'https://www.youtube.com/shorts/K4DyBUG242c',
        'validaciones' => [
            ['palabra_clave' => 'bases', 'es_obligatoria' => true, 'min_resultados' => 3]
        ]
    ],
    [
        'reto_numero' => 56,
        'fase' => 5,
        'nivel' => 'Maestro',
        'titulo' => '💊 Sistema de salud: Capacidad médica',
        'descripcion' => 'Dos CTEs: CapacidadMedica (COUNT médicos y medicinas) y EvaluacionSanitaria (ratios cobertura y per cápita). Calcula porcentaje cobertura médica y capacidad emergencia. UNION ALL agrega resumen sistema general.',
        'consulta_sugerida' => 'WITH CapacidadMedica AS (SELECT b.Nombre AS Base, COUNT(s.SurvivorID) AS PoblacionTotal, COUNT(CASE WHEN s.Rol = \'Médica\' THEN 1 END) AS PersonalMedico, COALESCE(r.Medicinas, 0) AS MedicinasDisponibles FROM Bases b LEFT JOIN Survivors s ON b.BaseID = s.BaseID LEFT JOIN Resources r ON b.BaseID = r.BaseID WHERE b.TipoBase = \'Humana\' GROUP BY b.BaseID, b.Nombre, r.Medicinas), EvaluacionSanitaria AS (SELECT Base, PoblacionTotal, PersonalMedico, MedicinasDisponibles, CASE WHEN PersonalMedico = 0 OR PoblacionTotal = 0 THEN 0.0 ELSE ROUND((CAST(PersonalMedico AS FLOAT) * 100.0) / CAST(PoblacionTotal AS FLOAT), 2) END AS CoberturaMedica, CASE WHEN PoblacionTotal = 0 THEN 0.0 ELSE ROUND(CAST(MedicinasDisponibles AS FLOAT) / CAST(PoblacionTotal AS FLOAT), 2) END AS MedicinasPerCapita, CASE WHEN PersonalMedico = 0 AND PoblacionTotal > 0 THEN \'SIN COBERTURA\' WHEN PersonalMedico > 0 AND PoblacionTotal > 0 AND (CAST(PoblacionTotal AS FLOAT) / CAST(PersonalMedico AS FLOAT)) <= 5 THEN \'COBERTURA EXCELENTE\' WHEN PersonalMedico > 0 AND PoblacionTotal > 0 AND (CAST(PoblacionTotal AS FLOAT) / CAST(PersonalMedico AS FLOAT)) <= 10 THEN \'COBERTURA ADECUADA\' WHEN PersonalMedico > 0 AND PoblacionTotal > 0 THEN \'COBERTURA LIMITADA\' ELSE \'BASE VACIA\' END AS NivelCobertura FROM CapacidadMedica) SELECT Base, PoblacionTotal, PersonalMedico, MedicinasDisponibles, CoberturaMedica, MedicinasPerCapita, NivelCobertura, CASE WHEN MedicinasPerCapita >= 50 AND PersonalMedico > 0 THEN \'Preparada emergencias\' WHEN MedicinasPerCapita >= 20 AND PersonalMedico > 0 THEN \'Capacidad basica\' WHEN PersonalMedico > 0 THEN \'Recursos insuficientes\' ELSE \'Incapaz responder\' END AS CapacidadEmergencia FROM EvaluacionSanitaria WHERE PoblacionTotal > 0 UNION ALL SELECT \'RESUMEN GENERAL\' AS Base, SUM(PoblacionTotal) AS PoblacionTotal, SUM(PersonalMedico) AS PersonalMedico, SUM(MedicinasDisponibles) AS MedicinasDisponibles, ROUND(AVG(CoberturaMedica), 2) AS CoberturaGeneral, ROUND(AVG(MedicinasPerCapita), 2) AS MedicinasGeneral, CASE WHEN SUM(PersonalMedico) = 0 THEN \'CRISIS TOTAL\' WHEN AVG(CoberturaMedica) >= 30 THEN \'SISTEMA ROBUSTO\' WHEN AVG(CoberturaMedica) >= 15 THEN \'SISTEMA FUNCIONAL\' ELSE \'SISTEMA SOBRECARGADO\' END AS EstadoSistema, CASE WHEN AVG(MedicinasPerCapita) >= 50 AND SUM(PersonalMedico) > 0 THEN \'Listo pandemia\' ELSE \'Vulnerable crisis\' END AS PreparacionCrisis FROM EvaluacionSanitaria WHERE PoblacionTotal > 0;',
        'pista' => 'Análisis sanitario complejo: ratio médico-población, medicinas per cápita, capacidad de emergencia. Incluye evaluación del sistema global',
        'puntos' => 45,
        'video_url' => 'https://www.youtube.com/shorts/GX_u6MhiMxs',
        'validaciones' => [
            ['palabra_clave' => 'with', 'es_obligatoria' => true, 'min_resultados' => 6],
            ['palabra_clave' => 'capacidadmedica', 'es_obligatoria' => true, 'min_resultados' => 6],
            ['palabra_clave' => 'cobertura', 'es_obligatoria' => true, 'min_resultados' => 6]
        ]
    ]
    // Aquí irían los demás 58 retos...
];

function migrarRetos($config, $retos) {
    try {
        $pdo = new PDO(
            "mysql:host={$config['host']};dbname={$config['dbname']};charset=utf8mb4", 
            $config['username'], 
            $config['password']
        );
        $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        
        echo "✅ Conexión MySQL exitosa\n";
        
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
        
        foreach ($retos as $reto) {
            // Insertar reto
            $stmtReto->execute([
                $reto['reto_numero'],
                $reto['fase'],
                $reto['nivel'],
                $reto['titulo'],
                $reto['descripcion'],
                $reto['consulta_sugerida'],
                $reto['pista'],
                $reto['puntos'],
                $reto['video_url']
            ]);
            
            // Limpiar validaciones existentes
            $pdo->prepare("DELETE FROM validaciones_reto WHERE reto_numero = ?")->execute([$reto['reto_numero']]);
            
            // Insertar validaciones
            foreach ($reto['validaciones'] as $val) {
                $stmtValidacion->execute([
                    $reto['reto_numero'],
                    $val['palabra_clave'],
                    $val['es_obligatoria'],
                    $val['min_resultados'],
                    "Validación para reto {$reto['reto_numero']}"
                ]);
            }
            
            $retosInsertados++;
            echo "✅ Reto {$reto['reto_numero']} migrado: {$reto['titulo']}\n";
        }
        
        echo "\n🎉 Migración completada: $retosInsertados retos\n";
        
        return true;
        
    } catch (PDOException $e) {
        echo "❌ Error: " . $e->getMessage() . "\n";
        return false;
    }
}

// Ejecutar migración
if (migrarRetos($config, $retos)) {
    echo "✨ Migración exitosa!\n";
} else {
    echo "💥 Error en la migración\n";
}
?>
