-- 🎯 RETO 41: Análisis completo de supervivencia (Nivel Maestro - 60 puntos)
-- Descripción: Crear un informe completo: base, tipo, supervivientes, recursos y profesiones únicas
-- Técnica: CTE (Common Table Expression) con múltiples JOINs y agregaciones

WITH BaseInfo AS (
    SELECT 
        B.BaseID, 
        B.Nombre, 
        B.Tipo, 
        COUNT(S.SupervivienteID) AS NumSupervivientes, 
        COUNT(DISTINCT S.Profesion) AS ProfesionesUnicas 
    FROM Bases B 
    LEFT JOIN Supervivientes S ON B.BaseID = S.BaseID 
    GROUP BY B.BaseID, B.Nombre, B.Tipo
) 
SELECT 
    BI.Nombre, 
    BI.Tipo, 
    BI.NumSupervivientes, 
    BI.ProfesionesUnicas, 
    (R.ComidaRaciones + R.AguaLitros + R.Armas) AS RecursosTotales 
FROM BaseInfo BI 
JOIN Recursos R ON BI.BaseID = R.BaseID 
ORDER BY RecursosTotales DESC;️ CREACIÓN DEL UNIVERSO ATAPUERCA
-- Necesitamos crear las tablas del sistema de retos primero

-- 📋 PASO 1: Crear tabla de Bases
CREATE TABLE Bases (
    BaseID int IDENTITY(1,1) PRIMARY KEY,
    Nombre nvarchar(100) NOT NULL,
    Tipo nvarchar(50) NOT NULL,
    Latitud decimal(9,6),
    Longitud decimal(9,6)
);

-- 📋 PASO 2: Crear tabla de Supervivientes
CREATE TABLE Supervivientes (
    SupervivienteID int IDENTITY(1,1) PRIMARY KEY,
    Nombre nvarchar(100) NOT NULL,
    Edad int,
    Profesion nvarchar(50),
    BaseID int,
    FOREIGN KEY (BaseID) REFERENCES Bases(BaseID)
);

-- 📋 PASO 3: Crear tabla de Recursos
CREATE TABLE Recursos (
    RecursoID int IDENTITY(1,1) PRIMARY KEY,
    BaseID int,
    ComidaRaciones int DEFAULT 0,
    AguaLitros int DEFAULT 0,
    Armas int DEFAULT 0,
    FOREIGN KEY (BaseID) REFERENCES Bases(BaseID)
);

-- 📋 PASO 4: Insertar datos de ejemplo
-- Bases
INSERT INTO Bases (Nombre, Tipo, Latitud, Longitud) VALUES
('Refugio Norte', 'Humana', 42.3601, -3.5269),
('Bunker Central', 'Militar', 40.4168, -3.7038),
('Estación Este', 'Científica', 41.3851, 2.1734),
('Campamento Sur', 'Humana', 37.3891, -5.9845),
('Base Oeste', 'Militar', 43.2630, -2.9350);

-- Supervivientes
INSERT INTO Supervivientes (Nombre, Edad, Profesion, BaseID) VALUES
('Ana López', 28, 'Médico', 1),
('Carlos Ruiz', 34, 'Ingeniero', 1),
('María García', 31, 'Soldado', 2),
('José Martín', 45, 'Científico', 3),
('Laura Sánchez', 29, 'Médico', 2),
('Pedro González', 38, 'Ingeniero', 3),
('Isabel Torres', 33, 'Soldado', 4),
('Miguel Jiménez', 41, 'Científico', 5);

-- Recursos
INSERT INTO Recursos (BaseID, ComidaRaciones, AguaLitros, Armas) VALUES
(1, 45, 120, 8),
(2, 78, 200, 15),
(3, 23, 85, 3),
(4, 56, 150, 12),
(5, 89, 300, 20);

-- 🎯 RETO 41: Análisis completo de supervivencia (Nivel Maestro - 60 puntos)
-- Descripción: Crear un informe completo: base, tipo, supervivientes, recursos y profesiones únicas
-- Técnica: CTE (Common Table Expression) con múltiples JOINs y agregaciones

WITH BaseInfo AS (
    SELECT 
        B.BaseID, 
        B.Nombre, 
        B.Tipo, 
        COUNT(S.SupervivienteID) AS NumSupervivientes, 
        COUNT(DISTINCT S.Profesion) AS ProfesionesUnicas 
    FROM Bases B 
    LEFT JOIN Supervivientes S ON B.BaseID = S.BaseID 
    GROUP BY B.BaseID, B.Nombre, B.Tipo
) 
SELECT 
    BI.Nombre, 
    BI.Tipo, 
    BI.NumSupervivientes, 
    BI.ProfesionesUnicas, 
    (R.ComidaRaciones + R.AguaLitros + R.Armas) AS RecursosTotales 
FROM BaseInfo BI 
JOIN Recursos R ON BI.BaseID = R.BaseID 
ORDER BY RecursosTotales DESC;