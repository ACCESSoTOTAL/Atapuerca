<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

// Manejar preflight requests
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    exit(0);
}

// Incluir la configuración de base de datos
require_once 'config/database.php';

function ejecutarConsultaAzure($query) {
    try {
        $db = ConexionAzure::obtenerConexion();
        
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
        
        return [
            'success' => true,
            'rows' => $rows,
            'count' => count($rows)
        ];
        
    } catch (Exception $e) {
        return [
            'success' => false,
            'error' => $e->getMessage()
        ];
    }
}

// Obtener datos de la petición
$input = json_decode(file_get_contents('php://input'), true);

if (!isset($input['query'])) {
    http_response_code(400);
    echo json_encode(['success' => false, 'error' => 'Query requerida']);
    exit;
}

$query = $input['query'];

// Ejecutar consulta
$result = ejecutarConsultaAzure($query);

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
