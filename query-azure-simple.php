<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

// Habilitar errores para debug
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Manejar preflight requests
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    exit(0);
}

// Configuración directa de Azure SQL Server
function getAzureConnection() {
    $server = 'atapuerca.database.windows.net';
    $database = 'AtapuercaNet';
    $username = 'matusalen';
    $password = 'Access.2010';
    
    // Intentar conexión con driver FreeTDS
    $dsn = "odbc:Driver={FreeTDS};Server=$server;Port=1433;Database=$database;TDS_Version=8.0;";
    
    try {
        $pdo = new PDO($dsn, $username, $password, [
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
            PDO::ATTR_TIMEOUT => 30,
        ]);
        return $pdo;
    } catch (Exception $e) {
        throw new Exception("Error de conexión: " . $e->getMessage());
    }
}

function ejecutarConsultaAzure($query) {
    try {
        error_log("Ejecutando consulta: " . $query);
        
        $db = getAzureConnection();
        
        // Validar que solo sean consultas SELECT por seguridad
        $queryTrimmed = trim(strtoupper($query));
        if (!preg_match('/^SELECT\s+/', $queryTrimmed)) {
            throw new Exception('Solo se permiten consultas SELECT por seguridad');
        }
        
        $stmt = $db->prepare($query);
        $stmt->execute();
        
        $rows = [];
        while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
            $rows[] = $row;
        }
        
        error_log("Consulta exitosa, " . count($rows) . " filas obtenidas");
        
        return [
            'success' => true,
            'rows' => $rows,
            'count' => count($rows)
        ];
        
    } catch (Exception $e) {
        error_log("Error en consulta: " . $e->getMessage());
        
        return [
            'success' => false,
            'error' => $e->getMessage()
        ];
    }
}

// Obtener datos de la petición
$input = json_decode(file_get_contents('php://input'), true);

error_log("Datos recibidos: " . print_r($input, true));

if (!isset($input['query'])) {
    http_response_code(400);
    echo json_encode(['success' => false, 'error' => 'Query requerida']);
    exit;
}

$query = $input['query'];
error_log("Query a ejecutar: " . $query);

// Ejecutar consulta
$result = ejecutarConsultaAzure($query);

error_log("Resultado final: " . print_r($result, true));

if ($result['success']) {
    echo json_encode([
        'success' => true,
        'rows' => $result['rows'],
        'message' => 'Consulta ejecutada exitosamente'
    ]);
} else {
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'error' => $result['error']
    ]);
}
?>
