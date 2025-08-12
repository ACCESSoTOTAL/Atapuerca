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
    
    // Configuración directa de Azure SQL Server
    $serverName = "atapuerca.database.windows.net";
    $database = "AtapuercaNet";
    $username = "matusalen";
    $password = "Access.2010";
    
    // Probar diferentes tipos de conexión
    $connectionInfo = array(
        "Database" => $database,
        "Uid" => $username,
        "PWD" => $password,
        "TrustServerCertificate" => true,
        "Encrypt" => true
    );
    
    // Intentar conexión con sqlsrv
    $connection = sqlsrv_connect($serverName, $connectionInfo);
    
    if ($connection === false) {
        $errors = sqlsrv_errors();
        $errorMsg = "Error de conexión sqlsrv: ";
        if ($errors) {
            foreach ($errors as $error) {
                $errorMsg .= $error['message'] . " ";
            }
        }
        throw new Exception($errorMsg);
    }
    
    // Ejecutar la consulta
    $stmt = sqlsrv_query($connection, $query);
    
    if ($stmt === false) {
        $errors = sqlsrv_errors();
        $errorMsg = "Error en consulta: ";
        if ($errors) {
            foreach ($errors as $error) {
                $errorMsg .= $error['message'] . " ";
            }
        }
        throw new Exception($errorMsg);
    }
    
    // Recopilar resultados
    $results = array();
    while ($row = sqlsrv_fetch_array($stmt, SQLSRV_FETCH_ASSOC)) {
        $results[] = $row;
    }
    
    // Cerrar conexión
    sqlsrv_free_stmt($stmt);
    sqlsrv_close($connection);
    
    // Devolver resultados exitosos
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
