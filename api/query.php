<?php
// api/query.php - Endpoint para ejecutar consultas SQL desde JavaScript

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

// Solo permitir POST
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'error' => 'Método no permitido']);
    exit;
}

require_once '../config/database.php';

try {
    // Obtener datos del POST
    $input = json_decode(file_get_contents('php://input'), true);
    
    if (!isset($input['query'])) {
        throw new Exception('No se proporcionó una consulta SQL');
    }
    
    $sql = $input['query'];
    
    // Validaciones básicas de seguridad
    $sql = trim($sql);
    
    // Prohibir algunas operaciones peligrosas
    $forbidden = ['DROP', 'DELETE FROM', 'TRUNCATE', 'ALTER', 'CREATE USER', 'GRANT'];
    $sqlUpper = strtoupper($sql);
    
    foreach ($forbidden as $command) {
        if (strpos($sqlUpper, $command) !== false) {
            throw new Exception("Operación no permitida: $command");
        }
    }
    
    // Ejecutar consulta
    $db = new DatabaseConfig();
    $result = $db->executeQuery($sql);
    
    echo json_encode($result);
    
} catch (Exception $e) {
    http_response_code(400);
    echo json_encode([
        'success' => false,
        'error' => $e->getMessage()
    ]);
}
?>
