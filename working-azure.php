<?php
header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit;
}

try {
    if ($_SERVER['REQUEST_METHOD'] === 'GET') {
        echo json_encode(['success' => true, 'message' => 'Working endpoint']);
        exit;
    }
    
    if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
        throw new Exception('Método no permitido');
    }
    
    $input = file_get_contents('php://input');
    $data = json_decode($input, true);
    
    if (!isset($data['query'])) {
        throw new Exception('Query no proporcionada');
    }
    
    $query = trim($data['query']);
    
    if (!preg_match('/^SELECT\s+/i', $query)) {
        throw new Exception('Solo SELECT permitido');
    }
    
    // Configuración exacta como en database.php
    $server = 'atapuerca.database.windows.net';
    $database = 'AtapuercaNet';
    $username = 'matusalen';
    $password = 'Access.2010';
    $port = 1433;
    
    $options = [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        PDO::ATTR_EMULATE_PREPARES => false,
        PDO::ATTR_TIMEOUT => 10  // Timeout más corto
    ];
    
    // Usar FreeTDS que sabemos que funciona
    $dsn = "odbc:Driver={FreeTDS};Server={$server},{$port};Database={$database};TDS_Version=8.0";
    
    $pdo = new PDO($dsn, $username, $password, $options);
    
    $stmt = $pdo->prepare($query);
    $stmt->execute();
    
    $results = $stmt->fetchAll();
    
    echo json_encode([
        'success' => true,
        'data' => $results,
        'count' => count($results)
    ]);
    
} catch (Exception $e) {
    echo json_encode([
        'success' => false,
        'error' => $e->getMessage()
    ]);
}
?>
