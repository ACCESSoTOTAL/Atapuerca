<?php
// Configurar headers CORS
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');
header('Content-Type: application/json; charset=utf-8');

// Solo aceptar métodos POST
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'error' => 'Método no permitido']);
    exit;
}

try {
    // Leer el cuerpo de la petición
    $input = file_get_contents('php://input');
    $data = json_decode($input, true);
    
    if (!isset($data['query'])) {
        throw new Exception('Query no proporcionada');
    }
    
    $query = trim($data['query']);
    
    // Validar que solo sea una consulta SELECT
    if (!preg_match('/^SELECT\s+/i', $query)) {
        throw new Exception('Solo se permiten consultas SELECT');
    }
    
    // Configuración de Azure SQL Server con FreeTDS
    $server = "atapuerca.database.windows.net";
    $database = "AtapuercaNet";
    $username = "matusalen";
    $password = "Access.2010";
    $port = 1433;
    
    // Construir DSN para FreeTDS ODBC
    $dsn = "odbc:Driver={FreeTDS};Server=$server;Port=$port;Database=$database;TDS_Version=8.0;";
    
    // Conectar usando PDO
    $pdo = new PDO($dsn, $username, $password, [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        PDO::ATTR_TIMEOUT => 30
    ]);
    
    // Ejecutar la consulta
    $stmt = $pdo->prepare($query);
    $stmt->execute();
    
    // Obtener resultados
    $results = $stmt->fetchAll();
    
    // Cerrar conexión
    $pdo = null;
    
    // Devolver resultados exitosos
    echo json_encode([
        'success' => true, 
        'data' => $results,
        'count' => count($results)
    ]);
    
} catch (PDOException $e) {
    echo json_encode([
        'success' => false, 
        'error' => 'Error de base de datos: ' . $e->getMessage()
    ]);
} catch (Exception $e) {
    echo json_encode([
        'success' => false, 
        'error' => $e->getMessage()
    ]);
}
?>
