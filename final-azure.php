<?php
// Configurar headers primero
header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

// Manejar preflight
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

// No imprimir nada antes del JSON
error_reporting(0);
ini_set('display_errors', 0);

try {
    // GET para test
    if ($_SERVER['REQUEST_METHOD'] === 'GET') {
        echo json_encode(['success' => true, 'message' => 'Final endpoint OK']);
        exit;
    }
    
    // Solo POST
    if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
        http_response_code(405);
        echo json_encode(['success' => false, 'error' => 'Solo POST permitido']);
        exit;
    }
    
    // Leer input
    $input = file_get_contents('php://input');
    
    if (empty($input)) {
        echo json_encode(['success' => false, 'error' => 'No hay datos']);
        exit;
    }
    
    // Decodificar JSON
    $data = json_decode($input, true);
    
    if (json_last_error() !== JSON_ERROR_NONE) {
        echo json_encode(['success' => false, 'error' => 'JSON inválido']);
        exit;
    }
    
    if (!isset($data['query']) || empty(trim($data['query']))) {
        echo json_encode(['success' => false, 'error' => 'Query requerida']);
        exit;
    }
    
    $query = trim($data['query']);
    
    // Solo SELECT
    if (!preg_match('/^SELECT\s+/i', $query)) {
        echo json_encode(['success' => false, 'error' => 'Solo SELECT permitido']);
        exit;
    }
    
    // Conectar a Azure SQL
    $dsn = "odbc:Driver={FreeTDS};Server=atapuerca.database.windows.net,1433;Database=AtapuercaNet;TDS_Version=8.0";
    $username = "matusalen";
    $password = "Access.2010";
    
    $options = [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        PDO::ATTR_TIMEOUT => 10
    ];
    
    $pdo = new PDO($dsn, $username, $password, $options);
    
    // Ejecutar query
    $stmt = $pdo->prepare($query);
    $stmt->execute();
    $results = $stmt->fetchAll();
    
    // Respuesta en formato compatible
    echo json_encode([
        'success' => true,
        'rows' => $results,
        'count' => count($results)
    ]);
    
} catch (PDOException $e) {
    echo json_encode(['success' => false, 'error' => 'DB Error: ' . $e->getMessage()]);
} catch (Exception $e) {
    echo json_encode(['success' => false, 'error' => $e->getMessage()]);
}
?>
