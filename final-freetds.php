<?php
// ENDPOINT FINAL FREETDS - Azure SQL Server
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
header('Content-Type: application/json; charset=utf-8');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    echo json_encode([
        'success' => true,
        'message' => 'ENDPOINT FINAL FreeTDS Azure SQL funcionando',
        'driver' => 'FreeTDS (pdo_dblib)',
        'timestamp' => date('Y-m-d H:i:s'),
        'version' => 'final-freetds'
    ]);
    exit;
}

try {
    // Leer input
    $raw_input = file_get_contents('php://input');
    if (empty($raw_input)) {
        throw new Exception('POST body vacío');
    }
    
    $input_data = json_decode($raw_input, true);
    if (json_last_error() !== JSON_ERROR_NONE) {
        throw new Exception('JSON inválido: ' . json_last_error_msg());
    }
    
    if (!isset($input_data['query'])) {
        throw new Exception('Campo query no encontrado');
    }
    
    $query = trim($input_data['query']);
    if (empty($query)) {
        throw new Exception('Query vacía');
    }
    
    // Conexión FreeTDS Azure SQL
    $server   = 'atapuerca.database.windows.net';
    $database = 'AtapuercaNet';
    $user     = 'matusalen';
    $pass     = 'Access.2010';
    $port     = 1433;
    
    $dsn = "dblib:host=$server:$port;dbname=$database;charset=utf8";
    $options = [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        PDO::ATTR_TIMEOUT => 15
    ];
    
    $pdo = new PDO($dsn, $user, $pass, $options);
    
    // Ejecutar query
    $stmt = $pdo->prepare($query);
    $stmt->execute();
    $rows = $stmt->fetchAll();
    
    // Respuesta exitosa
    $response = [
        'success' => true,
        'rows' => $rows,
        'count' => count($rows),
        'driver' => 'FreeTDS',
        'server' => 'Azure SQL Server',
        'version' => 'final-freetds',
        'timestamp' => date('Y-m-d H:i:s')
    ];
    
    echo json_encode($response);
    
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'error' => $e->getMessage(),
        'driver' => 'FreeTDS',
        'version' => 'final-freetds',
        'timestamp' => date('Y-m-d H:i:s')
    ]);
}
?>
