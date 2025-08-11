<?php
// config/database.php - Configuración para base de datos MySQL en Hostinger

class DatabaseConfig {
    // Configuración para Hostinger (EDITAR CON TUS DATOS)
    private $host = 'localhost';
    private $dbname = 'tu_usuario_atapuerca'; 
    private $username = 'tu_usuario';
    private $password = 'tu_password';
    
    private $pdo;
    
    public function connect() {
        if ($this->pdo === null) {
            try {
                $dsn = "mysql:host={$this->host};dbname={$this->dbname};charset=utf8mb4";
                $options = [
                    PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
                    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
                    PDO::ATTR_EMULATE_PREPARES => false,
                ];
                
                $this->pdo = new PDO($dsn, $this->username, $this->password, $options);
            } catch (PDOException $e) {
                throw new Exception("Error de conexión: " . $e->getMessage());
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
}
?>
