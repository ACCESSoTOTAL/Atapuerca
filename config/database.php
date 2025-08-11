<?php
// config/database.php - Configuración para Azure SQL Server

class DatabaseConfig {
    // Configuración para Azure SQL Server (EDITAR CON TUS DATOS)
    private $server = 'tu_servidor.database.windows.net';
    private $database = 'atapuerca_db';
    private $username = 'tu_usuario';
    private $password = 'tu_password';
    private $port = 1433;
    
    private $pdo;
    
    public function connect() {
        if ($this->pdo === null) {
            try {
                // Para Azure SQL Server usamos sqlsrv driver
                $dsn = "sqlsrv:Server={$this->server},{$this->port};Database={$this->database}";
                $options = [
                    PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
                    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
                    PDO::ATTR_EMULATE_PREPARES => false,
                ];
                
                $this->pdo = new PDO($dsn, $this->username, $this->password, $options);
            } catch (PDOException $e) {
                // Si sqlsrv no está disponible, intentar con odbc
                try {
                    $dsn = "odbc:Driver={ODBC Driver 17 for SQL Server};Server={$this->server},{$this->port};Database={$this->database}";
                    $this->pdo = new PDO($dsn, $this->username, $this->password, $options);
                } catch (PDOException $e2) {
                    throw new Exception("Error de conexión a Azure SQL Server: " . $e->getMessage());
                }
            }
        }
        
        return $this->pdo;
    }
    
    public function executeQuery($sql, $params = []) {
        try {
            $pdo = $this->connect();
            $stmt = $pdo->prepare($sql);
            $stmt->execute($params);
            
            // Determinar si es SELECT, INSERT, UPDATE, etc.
            $command = strtoupper(trim(strtok($sql, ' ')));
            
            if ($command === 'SELECT') {
                return [
                    'success' => true,
                    'data' => $stmt->fetchAll(),
                    'rowCount' => $stmt->rowCount()
                ];
            } else {
                return [
                    'success' => true,
                    'message' => "Query ejecutada correctamente",
                    'rowCount' => $stmt->rowCount()
                ];
            }
            
        } catch (PDOException $e) {
            return [
                'success' => false,
                'error' => $e->getMessage()
            ];
        }
    }
    
    // Método específico para Azure SQL Server - Test de conexión
    public function testConnection() {
        try {
            $pdo = $this->connect();
            $stmt = $pdo->query("SELECT 1 AS test");
            $result = $stmt->fetch();
            return [
                'success' => true,
                'message' => 'Conexión exitosa a Azure SQL Server',
                'server_info' => $pdo->getAttribute(PDO::ATTR_SERVER_INFO)
            ];
        } catch (Exception $e) {
            return [
                'success' => false,
                'error' => $e->getMessage()
            ];
        }
    }
}
?>
