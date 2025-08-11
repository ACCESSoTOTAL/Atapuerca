-- setup-database.sql
-- Script para crear la base de datos AtapuercaNet en Hostinger/MySQL

-- Crear base de datos (si tienes permisos)
-- CREATE DATABASE IF NOT EXISTS atapuerca_net CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
-- USE atapuerca_net;

-- Tabla Bases
CREATE TABLE IF NOT EXISTS Bases (
    BaseID INT PRIMARY KEY AUTO_INCREMENT,
    Nombre VARCHAR(100) NOT NULL,
    TipoBase ENUM('Humana', 'IA') NOT NULL,
    Latitud DECIMAL(10, 8),
    Longitud DECIMAL(11, 8),
    Capacidad INT,
    EsComandoCentral BOOLEAN DEFAULT FALSE
);

-- Tabla Survivors
CREATE TABLE IF NOT EXISTS Survivors (
    SurvivorID INT PRIMARY KEY AUTO_INCREMENT,
    Nombre VARCHAR(100) NOT NULL,
    Edad INT,
    Rol VARCHAR(50),
    BaseID INT,
    FOREIGN KEY (BaseID) REFERENCES Bases(BaseID)
);

-- Tabla Resources
CREATE TABLE IF NOT EXISTS Resources (
    ResourceID INT PRIMARY KEY AUTO_INCREMENT,
    BaseID INT,
    ComidaRaciones INT DEFAULT 0,
    AguaLitros INT DEFAULT 0,
    Armas INT DEFAULT 0,
    Medicinas INT DEFAULT 0,
    FOREIGN KEY (BaseID) REFERENCES Bases(BaseID)
);

-- Tabla Attacks
CREATE TABLE IF NOT EXISTS Attacks (
    AttackID INT PRIMARY KEY AUTO_INCREMENT,
    BaseID INT,
    Fecha DATE,
    TipoRobot VARCHAR(50),
    Muertos INT DEFAULT 0,
    FOREIGN KEY (BaseID) REFERENCES Bases(BaseID)
);

-- Tabla Alliances
CREATE TABLE IF NOT EXISTS Alliances (
    AllianceID INT PRIMARY KEY AUTO_INCREMENT,
    BaseID1 INT,
    BaseID2 INT,
    FechaInicio DATE,
    NivelConfianza INT DEFAULT 50,
    FOREIGN KEY (BaseID1) REFERENCES Bases(BaseID),
    FOREIGN KEY (BaseID2) REFERENCES Bases(BaseID)
);

-- Tabla Missions
CREATE TABLE IF NOT EXISTS Missions (
    MissionID INT PRIMARY KEY AUTO_INCREMENT,
    OrigenID INT,
    DestinoID INT,
    Objetivo VARCHAR(200),
    Estado ENUM('Pendiente', 'En progreso', 'Completada', 'Fallida') DEFAULT 'Pendiente',
    FechaInicio DATE,
    FOREIGN KEY (OrigenID) REFERENCES Bases(BaseID),
    FOREIGN KEY (DestinoID) REFERENCES Bases(BaseID)
);

-- Tabla Supplies
CREATE TABLE IF NOT EXISTS Supplies (
    SupplyID INT PRIMARY KEY AUTO_INCREMENT,
    BaseID INT,
    Tipo VARCHAR(50),
    Cantidad INT,
    FechaEntrega DATE,
    FOREIGN KEY (BaseID) REFERENCES Bases(BaseID)
);

-- Tabla Robots
CREATE TABLE IF NOT EXISTS Robots (
    RobotID INT PRIMARY KEY AUTO_INCREMENT,
    Modelo VARCHAR(50),
    Generacion INT,
    Funciones TEXT,
    NivelAmenaza INT DEFAULT 1
);

-- Tabla RobotSightings
CREATE TABLE IF NOT EXISTS RobotSightings (
    SightingID INT PRIMARY KEY AUTO_INCREMENT,
    BaseID INT,
    Fecha DATE,
    TipoRobot VARCHAR(50),
    NivelAmenaza INT DEFAULT 1,
    FOREIGN KEY (BaseID) REFERENCES Bases(BaseID)
);

-- Tabla DistanceMatrix
CREATE TABLE IF NOT EXISTS DistanceMatrix (
    DistanceID INT PRIMARY KEY AUTO_INCREMENT,
    IDOrigen INT,
    IDDestino INT,
    Kilometros DECIMAL(8, 2),
    FOREIGN KEY (IDOrigen) REFERENCES Bases(BaseID),
    FOREIGN KEY (IDDestino) REFERENCES Bases(BaseID)
);

-- Insertar datos de ejemplo (los mismos que tienes en el proyecto actual)
-- Copiar aquí todos los INSERT de tu proyecto actual

-- Bases
INSERT INTO Bases (BaseID, Nombre, TipoBase, Latitud, Longitud, Capacidad, EsComandoCentral) VALUES
(1, 'Fortaleza Norte', 'Humana', 42.8, -5.6, 50, 1),
(2, 'Puesto Avanzado Alpha', 'Humana', 41.2, -4.1, 20, 0),
(3, 'Refugio Delta', 'Humana', 40.5, -3.8, 30, 0),
(4, 'Cúpula Esperanza', 'Humana', 39.7, -2.9, 40, 0),
(5, 'Nido Central', 'IA', 41.8, -4.5, NULL, 0),
(6, 'Torre Omega', 'IA', 40.9, -3.2, NULL, 0),
(7, 'Estación Fantasma', 'IA', 39.1, -2.1, NULL, 0),
(8, 'Centro Nexus', 'IA', 38.5, -1.8, NULL, 0);

-- Survivors
INSERT INTO Survivors (SurvivorID, Nombre, Edad, Rol, BaseID) VALUES
(1, 'Elena Vásquez', 35, 'Comandante', 1),
(2, 'Marcus Stone', 41, 'Soldado', 1),
(3, 'Zara Al-Rashid', 41, 'Médica', 1),
(4, 'Hugo Chen', 28, 'Ingeniera', 1),
(5, 'Li Wang', 27, 'Scout', 2),
(6, 'Diego Morales', 27, 'Explorador', 3),
(7, 'Anna Kowalski', 34, 'Científica', 4),
(8, 'Maya Chen', 22, 'Técnica', NULL);

-- Resources
INSERT INTO Resources (ResourceID, BaseID, ComidaRaciones, AguaLitros, Armas, Medicinas) VALUES
(1, 1, 800, 1200, 25, 150),
(2, 2, 300, 450, 8, 50),
(3, 3, 250, 380, 12, 30),
(4, 4, 600, 900, 18, 120);

-- Attacks
INSERT INTO Attacks (AttackID, BaseID, Fecha, TipoRobot, Muertos) VALUES
(1, 1, '2025-07-15', 'Hunter-X7', 2),
(2, 2, '2025-07-20', 'Scout-A3', 0),
(3, 3, '2025-07-25', 'Destroyer-Z9', 5),
(4, 4, '2025-08-01', 'Hunter-X7', 1);

-- Alliances
INSERT INTO Alliances (AllianceID, BaseID1, BaseID2, FechaInicio, NivelConfianza) VALUES
(1, 1, 2, '2025-06-01', 85),
(2, 1, 4, '2025-06-15', 70),
(3, 2, 3, '2025-07-01', 60);

-- Missions
INSERT INTO Missions (MissionID, OrigenID, DestinoID, Objetivo, Estado, FechaInicio) VALUES
(1, 1, 2, 'Entrega de suministros médicos', 'Completada', '2025-07-10'),
(2, 2, 3, 'Reconocimiento de zona sur', 'En progreso', '2025-08-05'),
(3, 1, 4, 'Evacuación de civiles', 'Pendiente', '2025-08-10');

-- Supplies
INSERT INTO Supplies (SupplyID, BaseID, Tipo, Cantidad, FechaEntrega) VALUES
(1, 1, 'Comida', 200, '2025-07-01'),
(2, 1, 'Medicinas', 50, '2025-07-05'),
(3, 2, 'Armas', 5, '2025-07-10'),
(4, 3, 'Agua', 100, '2025-07-15');

-- Robots
INSERT INTO Robots (RobotID, Modelo, Generacion, Funciones, NivelAmenaza) VALUES
(1, 'Hunter-X7', 3, 'Combate, Rastreo', 9),
(2, 'Scout-A3', 2, 'Reconocimiento', 4),
(3, 'Destroyer-Z9', 4, 'Destrucción masiva', 10),
(4, 'Worker-B1', 1, 'Construcción', 2);

-- RobotSightings
INSERT INTO RobotSightings (SightingID, BaseID, Fecha, TipoRobot, NivelAmenaza) VALUES
(1, 1, '2025-07-12', 'Hunter-X7', 9),
(2, 2, '2025-07-18', 'Scout-A3', 4),
(3, 3, '2025-07-22', 'Destroyer-Z9', 10),
(4, 4, '2025-07-30', 'Hunter-X7', 9);

-- DistanceMatrix
INSERT INTO DistanceMatrix (DistanceID, IDOrigen, IDDestino, Kilometros) VALUES
(1, 1, 2, 45.2),
(2, 1, 3, 67.8),
(3, 1, 4, 89.1),
(4, 2, 3, 34.5),
(5, 2, 4, 56.3),
(6, 3, 4, 23.7);
