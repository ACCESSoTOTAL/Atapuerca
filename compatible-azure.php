<?php
header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

// Manejar preflight OPTIONS
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

try {
    // Test GET
    if ($_SERVER['REQUEST_METHOD'] === 'GET') {
        echo json_encode([
            'success' => true, 
            'message' => 'Endpoint compatible funcionando',
            'timestamp' => date('Y-m-d H:i:s')
        ]);
        exit;
    }
    
    // Solo POST
    if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
        http_response_code(405);
        echo json_encode(['success' => false, 'error' => 'Método no permitido']);
        exit;
    }
    
    // Leer y validar input
    $input = file_get_contents('php://input');
    
    if (empty($input)) {
        throw new Exception('No se recibieron datos');
    }
    
    $data = json_decode($input, true);
    
    if (json_last_error() !== JSON_ERROR_NONE) {
        throw new Exception('JSON inválido: ' . json_last_error_msg());
    }
    
    if (!isset($data['query']) || empty(trim($data['query']))) {
        throw new Exception('Query requerida');
    }
    
    $query = trim($data['query']);
    
    // Validar solo SELECT
    if (!preg_match('/^SELECT\s+/i', $query)) {
        throw new Exception('Solo consultas SELECT permitidas');
    }
    
    // Configuración de conexión Azure SQL
    $server = 'atapuerca.database.windows.net';
    $database = 'AtapuercaNet';
    $username = 'matusalen';
    $password = 'Access.2010';
    $port = 1433;
    
    // DSN con configuración que sabemos funciona
    $dsn = "odbc:Driver={FreeTDS};Server={$server},{$port};Database={$database};TDS_Version=8.0";
    
    $options = [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        PDO::ATTR_TIMEOUT => 15
    ];
    
    // Conectar y ejecutar
    $pdo = new PDO($dsn, $username, $password, $options);
    $stmt = $pdo->prepare($query);
    $stmt->execute();
    $results = $stmt->fetchAll();
    
    // IMPORTANTE: Devolver en el formato que espera el JavaScript
    // El JS busca 'rows' no 'data'
    echo json_encode([
        'success' => true,
        'rows' => $results,           // ← Esto es lo que espera el JS
        'count' => count($results),
        'timestamp' => date('Y-m-d H:i:s')
    ]);
    
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'error' => 'Error de base de datos: ' . $e->getMessage()
    ]);
} catch (Exception $e) {
    http_response_code(400);
    echo json_encode([
        'success' => false,
        'error' => $e->getMessage()
    ]);
}
?>
