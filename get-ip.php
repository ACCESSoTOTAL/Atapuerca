<?php
// get-ip.php - Obtener IP del servidor Hostinger para configurar firewall Azure
?>
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>IP del Servidor - AtapuercaNet</title>
    <style>
        body { 
            font-family: Arial, sans-serif; 
            max-width: 600px; 
            margin: 50px auto; 
            padding: 20px;
            background: #f5f5f5;
        }
        .container {
            background: white;
            padding: 30px;
            border-radius: 10px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        }
        .ip-box {
            background: #e3f2fd;
            border: 2px solid #2196f3;
            border-radius: 5px;
            padding: 15px;
            margin: 20px 0;
            text-align: center;
            font-size: 18px;
            font-weight: bold;
        }
        .instructions {
            background: #fff3e0;
            border-left: 4px solid #ff9800;
            padding: 15px;
            margin: 20px 0;
        }
        .success {
            background: #e8f5e8;
            border-left: 4px solid #4caf50;
            padding: 15px;
            margin: 20px 0;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>🌐 IP del Servidor Hostinger</h1>
        <p>Esta información es necesaria para configurar el firewall de Azure SQL Server.</p>
        
        <?php
        // Obtener IP del servidor
        $server_ip = $_SERVER['SERVER_ADDR'] ?? 'No disponible';
        
        // Obtener IP externa (real)
        $external_ip = @file_get_contents('https://ipinfo.io/ip');
        if ($external_ip === false) {
            $external_ip = @file_get_contents('https://api.ipify.org');
        }
        if ($external_ip === false) {
            $external_ip = 'No se pudo obtener';
        } else {
            $external_ip = trim($external_ip);
        }
        ?>
        
        <h3>📍 IP Interna del Servidor:</h3>
        <div class="ip-box">
            <?php echo htmlspecialchars($server_ip); ?>
        </div>
        
        <h3>🌍 IP Externa (Pública):</h3>
        <div class="ip-box">
            <?php echo htmlspecialchars($external_ip); ?>
        </div>
        
        <div class="instructions">
            <h4>📋 Instrucciones para Azure SQL Server:</h4>
            <ol>
                <li>Ve a <strong>Azure Portal</strong> → <strong>SQL databases</strong> → tu base de datos</li>
                <li>Haz clic en <strong>"Set server firewall"</strong></li>
                <li>Agrega una nueva regla:
                    <ul>
                        <li><strong>Nombre:</strong> Hostinger-Connection</li>
                        <li><strong>IP inicio:</strong> <?php echo htmlspecialchars($external_ip); ?></li>
                        <li><strong>IP fin:</strong> <?php echo htmlspecialchars($external_ip); ?></li>
                    </ul>
                </li>
                <li>Haz clic en <strong>"Save"</strong></li>
            </ol>
        </div>
        
        <?php
        // Verificar conexión a Azure (si está configurada)
        if (file_exists('config/database.php')) {
            echo '<div class="success">';
            echo '<h4>🔗 Test de Conexión Azure</h4>';
            echo '<p><a href="test-azure-connection.php" style="color: #1976d2; text-decoration: none; font-weight: bold;">→ Probar conexión a Azure SQL Server</a></p>';
            echo '</div>';
        }
        ?>
        
        <div style="margin-top: 30px; text-align: center;">
            <a href="index.html" style="color: #1976d2; text-decoration: none;">← Volver a AtapuercaNet</a>
        </div>
        
        <hr style="margin: 30px 0;">
        <small style="color: #666;">
            <strong>Información técnica:</strong><br>
            Server: <?php echo htmlspecialchars($_SERVER['SERVER_NAME'] ?? 'N/A'); ?><br>
            PHP Version: <?php echo PHP_VERSION; ?><br>
            User Agent: <?php echo htmlspecialchars($_SERVER['HTTP_USER_AGENT'] ?? 'N/A'); ?><br>
            Timestamp: <?php echo date('Y-m-d H:i:s T'); ?>
        </small>
    </div>
</body>
</html>
