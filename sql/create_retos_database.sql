-- ============================================================================
-- ATAPUERCA NET - SISTEMA DE RETOS SQL EN MYSQL
-- Base de datos para gestión de retos gamificados
-- Fecha: 2025-08-12
-- Base de datos: u722312752_atapuerca_reto
-- ============================================================================

-- Usar la base de datos existente en Hostinger
USE u722312752_atapuerca_reto;

-- ============================================================================
-- TABLA: retos
-- Almacena todos los retos SQL del sistema de gamificación
-- ============================================================================
CREATE TABLE retos (
    id INT PRIMARY KEY AUTO_INCREMENT,
    reto_numero INT NOT NULL UNIQUE,
    fase INT NOT NULL,
    nivel VARCHAR(20) NOT NULL,
    titulo VARCHAR(200) NOT NULL,
    descripcion TEXT NOT NULL,
    consulta_sugerida TEXT NOT NULL,
    pista TEXT,
    puntos INT NOT NULL DEFAULT 0,
    video_url VARCHAR(500),
    activo BOOLEAN DEFAULT TRUE,
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    fecha_actualizacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    -- Índices para optimización
    INDEX idx_fase (fase),
    INDEX idx_nivel (nivel),
    INDEX idx_puntos (puntos),
    INDEX idx_activo (activo)
) ENGINE=InnoDB CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- ============================================================================
-- TABLA: validaciones_reto
-- Define las reglas de validación para cada reto
-- ============================================================================
CREATE TABLE validaciones_reto (
    id INT PRIMARY KEY AUTO_INCREMENT,
    reto_numero INT NOT NULL,
    palabra_clave VARCHAR(100) NOT NULL,
    es_obligatoria BOOLEAN DEFAULT TRUE,
    min_resultados INT DEFAULT 1,
    descripcion VARCHAR(200),
    
    FOREIGN KEY (reto_numero) REFERENCES retos(reto_numero) ON DELETE CASCADE,
    INDEX idx_reto_numero (reto_numero)
) ENGINE=InnoDB CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- ============================================================================
-- TABLA: progreso_usuario
-- Seguimiento del progreso de cada usuario
-- ============================================================================
CREATE TABLE progreso_usuario (
    id INT PRIMARY KEY AUTO_INCREMENT,
    usuario_id VARCHAR(100) NOT NULL,
    reto_numero INT NOT NULL,
    completado BOOLEAN DEFAULT FALSE,
    puntos_obtenidos INT DEFAULT 0,
    fecha_completado TIMESTAMP NULL,
    consulta_utilizada TEXT,
    tiempo_resolucion INT DEFAULT 0, -- en segundos
    
    UNIQUE KEY unique_usuario_reto (usuario_id, reto_numero),
    FOREIGN KEY (reto_numero) REFERENCES retos(reto_numero) ON DELETE CASCADE,
    INDEX idx_usuario (usuario_id),
    INDEX idx_completado (completado)
) ENGINE=InnoDB CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- ============================================================================
-- TABLA: configuracion_sistema
-- Configuraciones generales del sistema de retos
-- ============================================================================
CREATE TABLE configuracion_sistema (
    clave VARCHAR(100) PRIMARY KEY,
    valor TEXT NOT NULL,
    descripcion VARCHAR(200),
    fecha_actualizacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- Insertar configuraciones iniciales
INSERT INTO configuracion_sistema (clave, valor, descripcion) VALUES
('version_sistema', '2.1.0', 'Versión actual del sistema de retos'),
('total_retos', '60', 'Número total de retos disponibles'),
('puntos_maximos', '2250', 'Puntos máximos que se pueden obtener'),
('servidor_sql', 'atapuerca.database.windows.net', 'Servidor SQL principal'),
('base_datos_principal', 'AtapuercaNet', 'Base de datos principal de Atapuerca');
