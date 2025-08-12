<?php
header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit;
}

error_reporting(0);
ini_set('display_errors', 0);

try {
    if ($_SERVER['REQUEST_METHOD'] === 'GET') {
        echo json_encode(['success' => true, 'message' => 'Ultimate endpoint ready']);
        exit;
    }
    
    if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
        echo json_encode(['success' => false, 'error' => 'Solo POST']);
        exit;
    }
    
    $input = file_get_contents('php://input');
    $data = json_decode($input, true);
    
    if (!isset($data['query'])) {
        echo json_encode(['success' => false, 'error' => 'Query requerida']);
        exit;
    }
    
    $query = trim($data['query']);
    
    if (!preg_match('/^SELECT\s+/i', $query)) {
        echo json_encode(['success' => false, 'error' => 'Solo SELECT']);
        exit;
    }
    
    // Usar configuración directa que funciona
    require_once 'config/database.php';
    
    $db = new DatabaseConfig();
    $connection = $db->connect();
    
    if (!$connection) {
        echo json_encode(['success' => false, 'error' => 'No se pudo conectar']);
        exit;
    }
    
    $stmt = $connection->prepare($query);
    $stmt->execute();
    $results = $stmt->fetchAll();
    
    echo json_encode([
        'success' => true,
        'rows' => $results,
        'count' => count($results)
    ]);
    
} catch (Exception $e) {
    echo json_encode(['success' => false, 'error' => $e->getMessage()]);
}
?>
