<?php
/**
 * ATAPUERCA NET - API DE RETOS MYSQL
 * API RESTful para gestionar retos desde base de datos MySQL
 * Endpoints: /api/retos.php?action=...
 */

header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

// Configuración de base de datos
$config = [
    'host' => 'localhost',
    'dbname' => 'u722312752_atapuerca_reto',
    'username' => 'u722312752_adan',
    'password' => 'Nocomas1manzana.'
];

class RetosAPI {
    private $pdo;
    
    public function __construct($config) {
        try {
            $this->pdo = new PDO(
                "mysql:host={$config['host']};dbname={$config['dbname']};charset=utf8mb4",
                $config['username'],
                $config['password']
            );
            $this->pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            $this->pdo->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);
        } catch (PDOException $e) {
            $this->sendError('Error de conexión: ' . $e->getMessage(), 500);
        }
    }
    
    public function handleRequest() {
        $action = $_GET['action'] ?? 'list';
        $method = $_SERVER['REQUEST_METHOD'];
        
        switch ($action) {
            case 'list':
                $this->listRetos();
                break;
            case 'get':
                $this->getReto();
                break;
            case 'validate':
                $this->validateReto();
                break;
            case 'progress':
                $this->getProgress();
                break;
            case 'complete':
                $this->completeReto();
                break;
            case 'stats':
                $this->getStats();
                break;
            case 'save_progress':
                $this->saveProgress();
                break;
            case 'get_progress':
                $this->getProgress();
                break;
            case 'create':
                $this->createReto();
                break;
            case 'update':
                $this->updateReto();
                break;
            case 'delete':
                $this->deleteReto();
                break;
            case 'execute_sql':
                $this->executeSQL();
                break;
            default:
                $this->sendError('Acción no válida', 400);
        }
    }
    
    /**
     * Listar todos los retos o filtrar por fase/nivel
     */
    private function listRetos() {
        $fase = $_GET['fase'] ?? null;
        $nivel = $_GET['nivel'] ?? null;
        $activo = $_GET['activo'] ?? 1;
        
        $sql = "SELECT r.*, 
                GROUP_CONCAT(v.palabra_clave) as palabras_clave,
                GROUP_CONCAT(v.min_resultados) as min_resultados
                FROM retos r 
                LEFT JOIN validaciones_reto v ON r.reto_numero = v.reto_numero 
                WHERE r.activo = ?";
        
        $params = [$activo];
        
        if ($fase) {
            $sql .= " AND r.fase = ?";
            $params[] = $fase;
        }
        
        if ($nivel) {
            $sql .= " AND r.nivel = ?";
            $params[] = $nivel;
        }
        
        $sql .= " GROUP BY r.reto_numero ORDER BY r.reto_numero";
        
        try {
            $stmt = $this->pdo->prepare($sql);
            $stmt->execute($params);
            $retos = $stmt->fetchAll();
            
            // Formatear datos para compatibilidad con JS
            $retosFormateados = array_map(function($reto) {
                return [
                    'id' => (int)$reto['reto_numero'],
                    'fase' => (int)$reto['fase'],
                    'nivel' => $reto['nivel'],
                    'titulo' => $reto['titulo'],
                    'descripcion' => $reto['descripcion'],
                    'consulta_sugerida' => $reto['consulta_sugerida'],
                    'pista' => $reto['pista'],
                    'puntos' => (int)$reto['puntos'],
                    'videoUrl' => $reto['video_url'],
                    'palabras_clave' => $reto['palabras_clave'] ? explode(',', $reto['palabras_clave']) : [],
                    'min_resultados' => $reto['min_resultados'] ? explode(',', $reto['min_resultados']) : []
                ];
            }, $retos);
            
            $this->sendResponse([
                'success' => true,
                'data' => $retosFormateados,
                'total' => count($retosFormateados)
            ]);
            
        } catch (PDOException $e) {
            $this->sendError('Error al obtener retos: ' . $e->getMessage());
        }
    }
    
    /**
     * Obtener un reto específico
     */
    private function getReto() {
        $retoNumero = $_GET['reto'] ?? null;
        
        if (!$retoNumero) {
            $this->sendError('Número de reto requerido', 400);
            return;
        }
        
        try {
            $stmt = $this->pdo->prepare("
                SELECT r.*, 
                GROUP_CONCAT(v.palabra_clave) as palabras_clave,
                GROUP_CONCAT(v.min_resultados) as min_resultados
                FROM retos r 
                LEFT JOIN validaciones_reto v ON r.reto_numero = v.reto_numero 
                WHERE r.reto_numero = ? AND r.activo = 1
                GROUP BY r.reto_numero
            ");
            $stmt->execute([$retoNumero]);
            $reto = $stmt->fetch();
            
            if (!$reto) {
                $this->sendError('Reto no encontrado', 404);
                return;
            }
            
            $retoFormateado = [
                'id' => (int)$reto['reto_numero'],
                'fase' => (int)$reto['fase'],
                'nivel' => $reto['nivel'],
                'titulo' => $reto['titulo'],
                'descripcion' => $reto['descripcion'],
                'consulta_sugerida' => $reto['consulta_sugerida'],
                'pista' => $reto['pista'],
                'puntos' => (int)$reto['puntos'],
                'videoUrl' => $reto['video_url'],
                'palabras_clave' => $reto['palabras_clave'] ? explode(',', $reto['palabras_clave']) : [],
                'min_resultados' => $reto['min_resultados'] ? explode(',', $reto['min_resultados']) : []
            ];
            
            $this->sendResponse([
                'success' => true,
                'data' => $retoFormateado
            ]);
            
        } catch (PDOException $e) {
            $this->sendError('Error al obtener reto: ' . $e->getMessage());
        }
    }
    
    /**
     * Validar consulta para un reto
     */
    private function validateReto() {
        $input = json_decode(file_get_contents('php://input'), true);
        $retoNumero = $input['reto_numero'] ?? null;
        $consulta = $input['consulta'] ?? '';
        $resultados = $input['resultados'] ?? [];
        
        if (!$retoNumero || !$consulta) {
            $this->sendError('Datos incompletos', 400);
            return;
        }
        
        try {
            // Obtener validaciones del reto
            $stmt = $this->pdo->prepare("
                SELECT palabra_clave, es_obligatoria, min_resultados 
                FROM validaciones_reto 
                WHERE reto_numero = ?
            ");
            $stmt->execute([$retoNumero]);
            $validaciones = $stmt->fetchAll();
            
            $consultaNormalizada = strtolower($consulta);
            $cumpleRequisitos = true;
            $mensajes = [];
            
            foreach ($validaciones as $val) {
                $palabraClave = strtolower($val['palabra_clave']);
                $contienepalabra = strpos($consultaNormalizada, $palabraClave) !== false;
                
                if ($val['es_obligatoria'] && !$contienepalabra) {
                    $cumpleRequisitos = false;
                    $mensajes[] = "Debe incluir: {$val['palabra_clave']}";
                }
            }
            
            // Verificar mínimo de resultados
            $minResultados = $validaciones[0]['min_resultados'] ?? 1;
            if (count($resultados) < $minResultados) {
                $cumpleRequisitos = false;
                $mensajes[] = "Debe devolver al menos $minResultados resultados";
            }
            
            $this->sendResponse([
                'success' => true,
                'cumple_requisitos' => $cumpleRequisitos,
                'mensajes' => $mensajes,
                'resultados_validos' => count($resultados) >= $minResultados
            ]);
            
        } catch (PDOException $e) {
            $this->sendError('Error en validación: ' . $e->getMessage());
        }
    }
    
    /**
     * Completar un reto
     */
    private function completeReto() {
        $input = json_decode(file_get_contents('php://input'), true);
        $usuarioId = $input['usuario_id'] ?? 'anonimo';
        $retoNumero = $input['reto_numero'] ?? null;
        $consultaUtilizada = $input['consulta'] ?? '';
        $tiempoResolucion = $input['tiempo'] ?? 0;
        
        if (!$retoNumero) {
            $this->sendError('Número de reto requerido', 400);
            return;
        }
        
        try {
            // Obtener puntos del reto
            $stmt = $this->pdo->prepare("SELECT puntos FROM retos WHERE reto_numero = ?");
            $stmt->execute([$retoNumero]);
            $reto = $stmt->fetch();
            
            if (!$reto) {
                $this->sendError('Reto no encontrado', 404);
                return;
            }
            
            // Insertar o actualizar progreso
            $stmt = $this->pdo->prepare("
                INSERT INTO progreso_usuario (usuario_id, reto_numero, completado, puntos_obtenidos, fecha_completado, consulta_utilizada, tiempo_resolucion)
                VALUES (?, ?, 1, ?, NOW(), ?, ?)
                ON DUPLICATE KEY UPDATE
                    completado = 1,
                    puntos_obtenidos = VALUES(puntos_obtenidos),
                    fecha_completado = NOW(),
                    consulta_utilizada = VALUES(consulta_utilizada),
                    tiempo_resolucion = VALUES(tiempo_resolucion)
            ");
            
            $stmt->execute([$usuarioId, $retoNumero, $reto['puntos'], $consultaUtilizada, $tiempoResolucion]);
            
            $this->sendResponse([
                'success' => true,
                'mensaje' => 'Reto completado exitosamente',
                'puntos_obtenidos' => $reto['puntos']
            ]);
            
        } catch (PDOException $e) {
            $this->sendError('Error al completar reto: ' . $e->getMessage());
        }
    }
    
    /**
     * Obtener estadísticas
     */
    private function getStats() {
        try {
            $stats = [
                'total_retos' => $this->pdo->query("SELECT COUNT(*) FROM retos WHERE activo = 1")->fetchColumn(),
                'total_puntos' => $this->pdo->query("SELECT SUM(puntos) FROM retos WHERE activo = 1")->fetchColumn(),
                'retos_por_fase' => $this->pdo->query("
                    SELECT fase, COUNT(*) as total, SUM(puntos) as puntos 
                    FROM retos WHERE activo = 1 
                    GROUP BY fase ORDER BY fase
                ")->fetchAll()
            ];
            
            $this->sendResponse(['success' => true, 'data' => $stats]);
            
        } catch (PDOException $e) {
            $this->sendError('Error al obtener estadísticas: ' . $e->getMessage());
        }
    }
    
    /**
     * Crear un nuevo reto
     */
    private function createReto() {
        if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
            $this->sendError('Método no permitido', 405);
            return;
        }
        
        $input = json_decode(file_get_contents('php://input'), true);
        
        if (!$input) {
            $this->sendError('Datos JSON no válidos', 400);
            return;
        }
        
        // Validar campos requeridos
        $required = ['reto_numero', 'fase', 'nivel', 'titulo', 'descripcion', 'consulta_sugerida', 'puntos'];
        foreach ($required as $field) {
            if (!isset($input[$field]) || empty($input[$field])) {
                $this->sendError("Campo requerido: $field", 400);
                return;
            }
        }
        
        try {
            // Verificar que el número de reto no exista
            $stmt = $this->pdo->prepare("SELECT COUNT(*) FROM retos WHERE reto_numero = ?");
            $stmt->execute([$input['reto_numero']]);
            if ($stmt->fetchColumn() > 0) {
                $this->sendError('Ya existe un reto con ese número', 409);
                return;
            }
            
            // Insertar reto
            $stmt = $this->pdo->prepare("
                INSERT INTO retos (reto_numero, fase, nivel, titulo, descripcion, consulta_sugerida, pista, puntos, video_url)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
            ");
            
            $stmt->execute([
                $input['reto_numero'],
                $input['fase'],
                $input['nivel'],
                $input['titulo'],
                $input['descripcion'],
                $input['consulta_sugerida'],
                $input['pista'] ?? '',
                $input['puntos'],
                $input['video_url'] ?? ''
            ]);
            
            $this->sendResponse(['success' => true, 'message' => 'Reto creado exitosamente']);
            
        } catch (PDOException $e) {
            $this->sendError('Error al crear reto: ' . $e->getMessage());
        }
    }
    
    /**
     * Actualizar un reto existente
     */
    private function updateReto() {
        if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
            $this->sendError('Método no permitido', 405);
            return;
        }
        
        $input = json_decode(file_get_contents('php://input'), true);
        
        if (!$input || !isset($input['reto_numero'])) {
            $this->sendError('Número de reto requerido', 400);
            return;
        }
        
        try {
            // Verificar que el reto existe
            $stmt = $this->pdo->prepare("SELECT COUNT(*) FROM retos WHERE reto_numero = ?");
            $stmt->execute([$input['reto_numero']]);
            if ($stmt->fetchColumn() == 0) {
                $this->sendError('Reto no encontrado', 404);
                return;
            }
            
            // Construir query de actualización dinámicamente
            $fields = [];
            $values = [];
            
            $allowed_fields = ['fase', 'nivel', 'titulo', 'descripcion', 'consulta_sugerida', 'pista', 'puntos', 'video_url'];
            
            foreach ($allowed_fields as $field) {
                if (isset($input[$field])) {
                    $fields[] = "$field = ?";
                    $values[] = $input[$field];
                }
            }
            
            if (empty($fields)) {
                $this->sendError('No hay campos para actualizar', 400);
                return;
            }
            
            $values[] = $input['reto_numero'];
            
            $stmt = $this->pdo->prepare("
                UPDATE retos 
                SET " . implode(', ', $fields) . "
                WHERE reto_numero = ?
            ");
            
            $stmt->execute($values);
            
            $this->sendResponse(['success' => true, 'message' => 'Reto actualizado exitosamente']);
            
        } catch (PDOException $e) {
            $this->sendError('Error al actualizar reto: ' . $e->getMessage());
        }
    }
    
    /**
     * Eliminar un reto (marcarlo como inactivo)
     */
    private function deleteReto() {
        if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
            $this->sendError('Método no permitido', 405);
            return;
        }
        
        $input = json_decode(file_get_contents('php://input'), true);
        $reto_numero = $input['reto_numero'] ?? $_GET['reto'] ?? null;
        
        if (!$reto_numero) {
            $this->sendError('Número de reto requerido', 400);
            return;
        }
        
        try {
            $stmt = $this->pdo->prepare("UPDATE retos SET activo = 0 WHERE reto_numero = ?");
            $stmt->execute([$reto_numero]);
            
            if ($stmt->rowCount() == 0) {
                $this->sendError('Reto no encontrado', 404);
                return;
            }
            
            $this->sendResponse(['success' => true, 'message' => 'Reto eliminado exitosamente']);
            
        } catch (PDOException $e) {
            $this->sendError('Error al eliminar reto: ' . $e->getMessage());
        }
    }
    
    /**
     * Guardar progreso del usuario
     */
    private function saveProgress() {
        $input = json_decode(file_get_contents('php://input'), true);
        $usuario_id = $input['usuario_id'] ?? 'anonimo';
        $reto_numero = $input['reto_numero'] ?? null;
        $completado = $input['completado'] ?? false;
        $puntos_ganados = $input['puntos_ganados'] ?? 0;
        
        if (!$reto_numero) {
            $this->sendError('Reto número requerido', 400);
            return;
        }
        
        try {
            // Verificar si ya existe progreso para este usuario y reto
            $stmt = $this->pdo->prepare("
                SELECT progreso_id FROM progreso_usuario 
                WHERE usuario_id = ? AND reto_numero = ?
            ");
            $stmt->execute([$usuario_id, $reto_numero]);
            $existe = $stmt->fetch();
            
            if ($existe) {
                // Actualizar progreso existente
                $stmt = $this->pdo->prepare("
                    UPDATE progreso_usuario 
                    SET completado = ?, puntos_ganados = ?, fecha_completion = CURRENT_TIMESTAMP
                    WHERE usuario_id = ? AND reto_numero = ?
                ");
                $stmt->execute([$completado ? 1 : 0, $puntos_ganados, $usuario_id, $reto_numero]);
            } else {
                // Insertar nuevo progreso
                $stmt = $this->pdo->prepare("
                    INSERT INTO progreso_usuario (usuario_id, reto_numero, completado, puntos_ganados, fecha_completion)
                    VALUES (?, ?, ?, ?, CURRENT_TIMESTAMP)
                ");
                $stmt->execute([$usuario_id, $reto_numero, $completado ? 1 : 0, $puntos_ganados]);
            }
            
            $this->sendResponse(['success' => true, 'message' => 'Progreso guardado exitosamente']);
            
        } catch (PDOException $e) {
            $this->sendError('Error al guardar progreso: ' . $e->getMessage());
        }
    }
    
    /**
     * Obtener progreso del usuario
     */
    private function getProgress() {
        $usuario_id = $_GET['usuario_id'] ?? 'anonimo';
        $reto_numero = $_GET['reto_numero'] ?? null;
        
        try {
            if ($reto_numero) {
                // Obtener progreso de un reto específico
                $stmt = $this->pdo->prepare("
                    SELECT * FROM progreso_usuario 
                    WHERE usuario_id = ? AND reto_numero = ?
                ");
                $stmt->execute([$usuario_id, $reto_numero]);
                $progreso = $stmt->fetch();
                
                $this->sendResponse([
                    'success' => true,
                    'data' => $progreso ? [
                        'completado' => (bool)$progreso['completado'],
                        'puntos_ganados' => (int)$progreso['puntos_ganados'],
                        'fecha_completion' => $progreso['fecha_completion']
                    ] : null
                ]);
            } else {
                // Obtener todo el progreso del usuario
                $stmt = $this->pdo->prepare("
                    SELECT reto_numero, completado, puntos_ganados, fecha_completion
                    FROM progreso_usuario 
                    WHERE usuario_id = ?
                    ORDER BY reto_numero
                ");
                $stmt->execute([$usuario_id]);
                $progreso = $stmt->fetchAll();
                
                // Calcular puntos totales manualmente
                $puntos_totales = 0;
                foreach ($progreso as $item) {
                    $puntos_totales += (int)$item['puntos_ganados'];
                }
                
                $this->sendResponse([
                    'success' => true,
                    'data' => $progreso,
                    'total' => count($progreso),
                    'puntos_totales' => $puntos_totales
                ]);
            }
            
        } catch (PDOException $e) {
            error_log("Error en getProgress para usuario $usuario_id: " . $e->getMessage());
            $this->sendError('Error al obtener progreso: ' . $e->getMessage());
        } catch (Exception $e) {
            error_log("Error general en getProgress: " . $e->getMessage());
            $this->sendError('Error interno del servidor');
        }
    }
    
    /**
     * Ejecutar SQL directamente (solo para administración)
     */
    private function executeSQL() {
        $input = json_decode(file_get_contents('php://input'), true);
        $sql = $input['sql'] ?? '';
        
        if (!$sql) {
            $this->sendError('SQL requerido', 400);
            return;
        }
        
        try {
            // Ejecutar la consulta
            $stmt = $this->pdo->prepare($sql);
            $stmt->execute();
            
            // Si es una consulta SELECT, obtener resultados
            if (stripos(trim($sql), 'SELECT') === 0) {
                $results = $stmt->fetchAll();
                $this->sendResponse([
                    'success' => true,
                    'data' => $results,
                    'affected_rows' => count($results)
                ]);
            } else {
                // Para INSERT, UPDATE, DELETE
                $affected = $stmt->rowCount();
                $this->sendResponse([
                    'success' => true,
                    'message' => 'Query ejecutado exitosamente',
                    'affected_rows' => $affected
                ]);
            }
            
        } catch (PDOException $e) {
            $this->sendError('Error SQL: ' . $e->getMessage());
        }
    }
    
    private function sendResponse($data, $status = 200) {
        http_response_code($status);
        echo json_encode($data, JSON_UNESCAPED_UNICODE);
        exit;
    }
    
    private function sendError($message, $status = 500) {
        http_response_code($status);
        echo json_encode(['success' => false, 'error' => $message], JSON_UNESCAPED_UNICODE);
        exit;
    }
}

// Manejar preflight OPTIONS
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

// Inicializar API
$api = new RetosAPI($config);
$api->handleRequest();
?>
