-- setup-database.sql - Azure SQL Server
-- Script para crear la base de datos AtapuercaNet en Azure SQL Server

-- NOTA: Este script asume que ya tienes una base de datos creada en Azure SQL Server
-- Solo ejecutar las tablas y datos, no CREATE DATABASE

-- ====================
-- CREACIÓN DE TABLAS
-- ====================

-- Tabla Bases
IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='Bases' AND xtype='U')
BEGIN
    CREATE TABLE Bases (
        id INT IDENTITY(1,1) PRIMARY KEY,
        nombre NVARCHAR(50) NOT NULL,
        ubicacion NVARCHAR(100),
        recursos_totales INT DEFAULT 0,
        nivel_defensa INT DEFAULT 1,
        poblacion INT DEFAULT 0,
        fecha_fundacion DATE DEFAULT GETDATE()
    );
END

-- Tabla Survivors  
IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='Survivors' AND xtype='U')
BEGIN
    CREATE TABLE Survivors (
        id INT IDENTITY(1,1) PRIMARY KEY,
        nombre NVARCHAR(50) NOT NULL,
        edad INT,
        especialidad NVARCHAR(30),
        base_id INT,
        salud INT DEFAULT 100,
        experiencia INT DEFAULT 0,
        fecha_llegada DATE DEFAULT GETDATE(),
        FOREIGN KEY (base_id) REFERENCES Bases(id)
    );
END

-- Tabla Resources
IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='Resources' AND xtype='U')
BEGIN
    CREATE TABLE Resources (
        ResourceID INT IDENTITY(1,1) PRIMARY KEY,
        BaseID INT,
        ComidaRaciones INT DEFAULT 0,
        AguaLitros INT DEFAULT 0,
        Armas INT DEFAULT 0,
        Medicinas INT DEFAULT 0,
        FOREIGN KEY (BaseID) REFERENCES Bases(id)
    );
END

-- Tabla Attacks
IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='Attacks' AND xtype='U')
BEGIN
    CREATE TABLE Attacks (
        AttackID INT IDENTITY(1,1) PRIMARY KEY,
        BaseID INT,
        Fecha DATE,
        TipoRobot NVARCHAR(50),
        Muertos INT DEFAULT 0,
        FOREIGN KEY (BaseID) REFERENCES Bases(id)
    );
END

-- Tabla Alliances
IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='Alliances' AND xtype='U')
BEGIN
    CREATE TABLE Alliances (
        AllianceID INT IDENTITY(1,1) PRIMARY KEY,
        BaseID1 INT,
        BaseID2 INT,
        FechaInicio DATE,
        NivelConfianza INT DEFAULT 50,
        FOREIGN KEY (BaseID1) REFERENCES Bases(id),
        FOREIGN KEY (BaseID2) REFERENCES Bases(id)
    );
END

-- Tabla Missions
IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='Missions' AND xtype='U')
BEGIN
    CREATE TABLE Missions (
        MissionID INT IDENTITY(1,1) PRIMARY KEY,
        OrigenID INT,
        DestinoID INT,
        Objetivo NVARCHAR(200),
        Estado NVARCHAR(20) DEFAULT 'Pendiente' CHECK (Estado IN ('Pendiente', 'En progreso', 'Completada', 'Fallida')),
        FechaInicio DATE,
        FOREIGN KEY (OrigenID) REFERENCES Bases(id),
        FOREIGN KEY (DestinoID) REFERENCES Bases(id)
    );
END

-- Tabla Supplies
IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='Supplies' AND xtype='U')
BEGIN
    CREATE TABLE Supplies (
        SupplyID INT IDENTITY(1,1) PRIMARY KEY,
        BaseID INT,
        Tipo NVARCHAR(50),
        Cantidad INT,
        FechaEntrega DATE,
        FOREIGN KEY (BaseID) REFERENCES Bases(id)
    );
END

-- Tabla Robots
IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='Robots' AND xtype='U')
BEGIN
    CREATE TABLE Robots (
        RobotID INT IDENTITY(1,1) PRIMARY KEY,
        Modelo NVARCHAR(50),
        Generacion INT,
        Funciones NTEXT,
        NivelAmenaza INT DEFAULT 1
    );
END

-- Tabla RobotSightings
IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='RobotSightings' AND xtype='U')
BEGIN
    CREATE TABLE RobotSightings (
        SightingID INT IDENTITY(1,1) PRIMARY KEY,
        BaseID INT,
        Fecha DATE,
        TipoRobot NVARCHAR(50),
        NivelAmenaza INT DEFAULT 1,
        FOREIGN KEY (BaseID) REFERENCES Bases(id)
    );
END

-- Tabla DistanceMatrix
IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='DistanceMatrix' AND xtype='U')
BEGIN
    CREATE TABLE DistanceMatrix (
        DistanceID INT IDENTITY(1,1) PRIMARY KEY,
        IDOrigen INT,
        IDDestino INT,
        Kilometros DECIMAL(8, 2),
        FOREIGN KEY (IDOrigen) REFERENCES Bases(id),
        FOREIGN KEY (IDDestino) REFERENCES Bases(id)
    );
END

-- ====================
-- INSERTAR DATOS DE EJEMPLO
-- ====================

-- Bases
INSERT INTO Bases (nombre, ubicacion, recursos_totales, nivel_defensa, poblacion) VALUES
('Fortaleza Norte', 'Cordillera Cantábrica (42.8, -5.6)', 500, 5, 50),
('Puesto Avanzado Alpha', 'Valles del Norte (41.2, -4.1)', 200, 3, 20),
('Refugio Delta', 'Sierra Central (40.5, -3.8)', 300, 4, 30),
('Cúpula Esperanza', 'Meseta Sur (39.7, -2.9)', 400, 4, 40),
('Base Gamma', 'Costa Occidental (40.1, -6.2)', 250, 3, 25);
(2, 'Marcus Stone', 41, 'Soldado', 1),
-- Survivors
INSERT INTO Survivors (nombre, edad, especialidad, base_id, salud, experiencia) VALUES
('Elena Vásquez', 35, 'Comandante', 1, 100, 150),
('Marcus Rivera', 29, 'Soldado', 1, 85, 120),
('Zara Al-Rashid', 41, 'Médica', 1, 95, 200),
('Hugo Chen', 28, 'Ingeniero', 1, 90, 180),
('Li Wang', 27, 'Explorador', 2, 80, 100),
('Diego Morales', 27, 'Scout', 3, 75, 90),
('Anna Kowalski', 34, 'Científica', 4, 88, 160),
('Maya Chen', 22, 'Técnica', 5, 92, 75);

-- Resources (usar IDs de bases correctos)
INSERT INTO Resources (BaseID, ComidaRaciones, AguaLitros, Armas, Medicinas) VALUES
(1, 800, 1200, 25, 150),
(2, 300, 450, 8, 50),
(3, 250, 380, 12, 30),
(4, 600, 900, 18, 120),
(5, 200, 300, 5, 25);

-- Attacks
INSERT INTO Attacks (BaseID, Fecha, TipoRobot, Muertos) VALUES
(1, '2025-07-15', 'Hunter-X7', 2),
(2, '2025-07-20', 'Scout-A3', 0),
(3, '2025-07-25', 'Destroyer-Z9', 5),
(4, '2025-08-01', 'Hunter-X7', 1),
(5, '2025-08-05', 'Scout-A3', 1);

-- Alliances
INSERT INTO Alliances (BaseID1, BaseID2, FechaInicio, NivelConfianza) VALUES
(1, 2, '2025-06-01', 85),
(1, 4, '2025-06-15', 70),
(2, 3, '2025-07-01', 60),
(3, 4, '2025-07-10', 55);

-- Missions
INSERT INTO Missions (OrigenID, DestinoID, Objetivo, Estado, FechaInicio) VALUES
(1, 2, 'Entrega de suministros médicos', 'Completada', '2025-07-10'),
(2, 3, 'Reconocimiento de zona sur', 'En progreso', '2025-08-05'),
(1, 4, 'Evacuación de civiles', 'Pendiente', '2025-08-10'),
(3, 5, 'Exploración costa oeste', 'Pendiente', '2025-08-15');

-- Supplies
INSERT INTO Supplies (BaseID, Tipo, Cantidad, FechaEntrega) VALUES
(1, 'Comida', 200, '2025-07-01'),
(1, 'Medicinas', 50, '2025-07-05'),
(2, 'Armas', 5, '2025-07-10'),
(3, 'Agua', 100, '2025-07-15'),
(4, 'Comida', 150, '2025-07-20'),
(5, 'Medicinas', 30, '2025-07-25');

-- Robots
INSERT INTO Robots (Modelo, Generacion, Funciones, NivelAmenaza) VALUES
('Hunter-X7', 3, 'Combate avanzado, Rastreo térmico', 9),
('Scout-A3', 2, 'Reconocimiento, Vigilancia', 4),
('Destroyer-Z9', 4, 'Destrucción masiva, Asedio', 10),
('Worker-B1', 1, 'Construcción, Reparaciones', 2),
('Medic-C5', 2, 'Soporte médico, Rescate', 3);

-- RobotSightings
INSERT INTO RobotSightings (BaseID, Fecha, TipoRobot, NivelAmenaza) VALUES
(1, '2025-07-12', 'Hunter-X7', 9),
(2, '2025-07-18', 'Scout-A3', 4),
(3, '2025-07-22', 'Destroyer-Z9', 10),
(4, '2025-07-30', 'Hunter-X7', 9),
(5, '2025-08-02', 'Scout-A3', 4);

-- DistanceMatrix
INSERT INTO DistanceMatrix (IDOrigen, IDDestino, Kilometros) VALUES
(1, 2, 45.2),
(1, 3, 67.8),
(1, 4, 89.1),
(1, 5, 125.5),
(2, 3, 34.5),
(2, 4, 56.3),
(2, 5, 89.7),
(3, 4, 23.7),
(3, 5, 67.2),
(4, 5, 98.4);
