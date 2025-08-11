<?php
/**
 * 🔍 Test de Drivers ODBC Múltiples
 * Prueba diferentes drivers ODBC disponibles en Hostinger
 */

header('Content-Type: text/html; charset=UTF-8');
?>
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>🔍 Test Drivers ODBC - AtapuercaNet</title>
    <style>
        body { 
            font-family: 'Segoe UI', Arial, sans-serif; 
            background: linear-gradient(135deg, #1e3c72 0%, #2a5298 100%);
            margin: 0; padding: 20px; color: white; min-height: 100vh;
        }
        .container { 
            max-width: 900px; margin: 0 auto; 
            background: rgba(255,255,255,0.1); 
            padding: 30px; border-radius: 15px; 
            backdrop-filter: blur(10px); box-shadow: 0 10px 30px rgba(0,0,0,0.3);
        }
        .status { 
            padding: 15px; margin: 10px 0; border-radius: 8px; 
            font-weight: bold; border-left: 5px solid;
        }
        .success { background: rgba(34, 197, 94, 0.2); border-color: #22c55e; }
        .error { background: rgba(239, 68, 68, 0.2); border-color: #ef4444; }
        .warning { background: rgba(245, 158, 11, 0.2); border-color: #f59e0b; }
        .info { background: rgba(59, 130, 246, 0.2); border-color: #3b82f6; }
        .details { 
            background: rgba(0,0,0,0.3); padding: 15px; 
            border-radius: 8px; margin: 10px 0; 
            font-family: 'Courier New', monospace; font-size: 12px;
            white-space: pre-wrap;
        }
        h1 { text-align: center; margin-bottom: 30px; }
        .section { margin: 20px 0; }
        .back-link { 
            display: inline-block; margin-top: 20px; 
            color: #60a5fa; text-decoration: none; 
        }
        .back-link:hover { color: #93c5fd; }
        .driver-test { margin: 15px 0; padding: 10px; background: rgba(0,0,0,0.2); border-radius: 8px; }
    </style>
</head>
<body>
    <div class="container">
        <h1>🔍 Test de Drivers ODBC Múltiples</h1>
        
        <div class="section">
            <h2>📋 Información del Sistema</h2>
            
            <?php
            echo '<div class="details">';
            echo "Fecha/Hora: " . date('Y-m-d H:i:s') . "\n";
            echo "Versión PHP: " . PHP_VERSION . "\n";
            echo "Sistema: " . PHP_OS . "\n";
            echo "Servidor: " . ($_SERVER['SERVER_SOFTWARE'] ?? 'No disponible') . "\n";
            echo "IP Servidor: " . ($_SERVER['SERVER_ADDR'] ?? 'No disponible') . "\n";
            echo '</div>';
            ?>
        </div>
        
        <div class="section">
            <h2>🔧 Estado de Extensiones</h2>
            
            <?php
            $extensions = ['pdo', 'odbc', 'pdo_odbc', 'sqlsrv', 'pdo_sqlsrv'];
            foreach ($extensions as $ext) {
                if (extension_loaded($ext)) {
                    echo '<div class="status success">✅ ' . $ext . ' - DISPONIBLE</div>';
                } else {
                    echo '<div class="status error">❌ ' . $ext . ' - NO DISPONIBLE</div>';
                }
            }
            ?>
        </div>
        
        <div class="section">
            <h2>🔌 Test de Drivers ODBC</h2>
            
            <?php
            // Configuración Azure
            $server = "atapuerca.database.windows.net";
            $database = "AtapuercaNet";
            $username = "matusalen";
            $password = "Access.2010";
            $port = 1433;
            
            // Lista de drivers a probar
            $drivers_to_test = [
                "SQL Server Nativo" => "sqlsrv:Server={$server},{$port};Database={$database}",
                "ODBC Driver 17" => "odbc:Driver={ODBC Driver 17 for SQL Server};Server={$server},{$port};Database={$database}",
                "ODBC Driver 13" => "odbc:Driver={ODBC Driver 13 for SQL Server};Server={$server},{$port};Database={$database}",
                "ODBC Driver 11" => "odbc:Driver={ODBC Driver 11 for SQL Server};Server={$server},{$port};Database={$database}",
                "SQL Server Genérico" => "odbc:Driver={SQL Server};Server={$server},{$port};Database={$database}",
                "FreeTDS" => "odbc:Driver={FreeTDS};Server={$server},{$port};Database={$database};TDS_Version=8.0",
                "SQL Server Native Client 11.0" => "odbc:DSN=;DRIVER={SQL Server Native Client 11.0};SERVER={$server},{$port};DATABASE={$database}",
                "SQL Server Native Client 10.0" => "odbc:DSN=;DRIVER={SQL Server Native Client 10.0};SERVER={$server},{$port};DATABASE={$database}"
            ];
            
            $successful_driver = null;
            
            foreach ($drivers_to_test as $name => $dsn) {
                echo '<div class="driver-test">';
                echo '<h3>🔧 Probando: ' . $name . '</h3>';
                
                try {
                    $options = [
                        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
                        PDO::ATTR_TIMEOUT => 5
                    ];
                    
                    $pdo = new PDO($dsn, $username, $password, $options);
                    
                    // Test simple
                    $stmt = $pdo->query("SELECT 1 as test, GETDATE() as fecha");
                    $result = $stmt->fetch();
                    
                    if ($result && $result['test'] == 1) {
                        echo '<div class="status success">✅ CONEXIÓN EXITOSA!</div>';
                        echo '<div class="details">Resultado: ' . json_encode($result, JSON_PRETTY_PRINT) . '</div>';
                        $successful_driver = $name;
                        break; // Salir del loop al encontrar un driver que funciona
                    }
                    
                } catch (Exception $e) {
                    echo '<div class="status error">❌ FALLÓ</div>';
                    echo '<div class="details">Error: ' . htmlspecialchars($e->getMessage()) . '</div>';
                }
                
                echo '</div>';
            }
            ?>
        </div>
        
        <div class="section">
            <h2>🎯 Resultado Final</h2>
            
            <?php
            if ($successful_driver) {
                echo '<div class="status success">🎉 ¡CONEXIÓN ESTABLECIDA CON ÉXITO!</div>';
                echo '<div class="status info">Driver funcional: ' . $successful_driver . '</div>';
                echo '<div class="status info">💡 AtapuercaNet ya puede funcionar con Azure SQL Server</div>';
            } else {
                echo '<div class="status error">❌ Ningún driver ODBC funcional encontrado</div>';
                echo '<div class="status warning">📧 Acción requerida: Contactar soporte Hostinger</div>';
                echo '<div class="details">Solicitar instalación de: ODBC Driver 17 for SQL Server</div>';
            }
            ?>
        </div>
        
        <div class="section">
            <h2>📋 Drivers ODBC Disponibles en Sistema</h2>
            
            <?php
            if (function_exists('odbc_data_source')) {
                echo '<div class="info">🔍 Escaneando drivers disponibles...</div>';
                echo '<div class="details">';
                
                // Intentar listar drivers disponibles
                $drivers = [];
                try {
                    // Esta función puede no estar disponible en todos los sistemas
                    $conn = odbc_connect('', '', '', SQL_CUR_USE_DRIVER);
                    if ($conn) {
                        echo "Conexión ODBC básica: ✅\n";
                        odbc_close($conn);
                    }
                } catch (Exception $e) {
                    echo "Información de drivers no disponible: " . $e->getMessage() . "\n";
                }
                
                echo '</div>';
            } else {
                echo '<div class="warning">⚠️ Función odbc_data_source no disponible</div>';
            }
            ?>
        </div>
        
        <a href="/" class="back-link">← Volver al inicio</a>
        <a href="/sql.html" class="back-link">Terminal SQL →</a>
        <a href="/test-azure-connection.php" class="back-link">Test Simple →</a>
    </div>
</body>
</html>
