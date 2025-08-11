<?php
// config/database.php - Configuración para Azure SQL Server

class DatabaseConfig {
    // Configuración para Azure SQL Server (EDITAR CON TUS DATOS)
    private $server = 'atapuerca.database.windows.net';
    private $database = 'AtapuercaNet';
    private $username = 'matusalen';
    private $password = 'Access.2010';
    private $port = 1433;
    
    private $pdo;
    
    public function connect() {
        if ($this->pdo === null) {
            $options = [
                PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
                PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
                PDO::ATTR_EMULATE_PREPARES => false,
                PDO::ATTR_TIMEOUT => 30
            ];
            
            // Lista de drivers ODBC a probar en orden de preferencia
            $drivers_to_try = [
                // Driver nativo SQL Server (ideal)
                "sqlsrv:Server={$this->server},{$this->port};Database={$this->database}",
                // ODBC Driver 17 (Microsoft oficial)
                "odbc:Driver={ODBC Driver 17 for SQL Server};Server={$this->server},{$this->port};Database={$this->database}",
                // ODBC Driver 13 (versión anterior)
                "odbc:Driver={ODBC Driver 13 for SQL Server};Server={$this->server},{$this->port};Database={$this->database}",
                // ODBC Driver 11 (compatible)
                "odbc:Driver={ODBC Driver 11 for SQL Server};Server={$this->server},{$this->port};Database={$this->database}",
                // Driver genérico SQL Server
                "odbc:Driver={SQL Server};Server={$this->server},{$this->port};Database={$this->database}",
                // Driver FreeTDS (Open Source)
                "odbc:Driver={FreeTDS};Server={$this->server},{$this->port};Database={$this->database};TDS_Version=8.0",
                // Driver más genérico
                "odbc:DSN=;DRIVER={SQL Server Native Client 11.0};SERVER={$this->server},{$this->port};DATABASE={$this->database}"
            ];
            
            $last_error = "";
            
            foreach ($drivers_to_try as $dsn) {
                try {
                    $this->pdo = new PDO($dsn, $this->username, $this->password, $options);
                    // Si llegamos aquí, la conexión fue exitosa
                    error_log("✅ Conexión exitosa con driver: " . $dsn);
                    break;
                } catch (PDOException $e) {
                    $last_error = $e->getMessage();
                    error_log("❌ Falló driver: " . $dsn . " - Error: " . $last_error);
                    continue;
                }
            }
            
            // Si ningún driver funcionó
            if ($this->pdo === null) {
                throw new Exception("Error de conexión a Azure SQL Server. Ningún driver ODBC disponible. Último error: " . $last_error);
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
