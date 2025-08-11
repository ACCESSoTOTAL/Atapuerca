-- ========================================
-- EXPANSIÓN DE DATOS PARA SISTEMA ATAPUERCA
-- Agregando datos a las tablas subutilizadas
-- ========================================

-- 1. EXPANSIÓN DE ROBOTS (más tipos y generaciones)
INSERT INTO Robots (RobotID, Modelo, Generacion, Funciones, NivelAmenaza) VALUES
(6, 'Centinela-X7', 4, 'Vigilancia avanzada, análisis predictivo', 7),
(7, 'Destructor-Alpha', 5, 'Combate pesado, demolición', 10),
(8, 'Explorador-Nano', 3, 'Reconocimiento sigiloso, infiltración', 4),
(9, 'Médico-Bot V3', 2, 'Asistencia médica, primeros auxilios', 2),
(10, 'Trabajador-Industrial', 1, 'Construcción, reparaciones', 1);

-- 2. EXPANSIÓN DE AVISTAMIENTOS DE ROBOTS (actividad reciente)
INSERT INTO RobotSightings (SightingID, BaseID, TipoRobot, Fecha, NivelAmenaza, Descripcion) VALUES
(6, 1, 'Centinela-X7', '2025-07-15', 7, 'Patrullando perímetro norte'),
(7, 2, 'Destructor-Alpha', '2025-07-18', 10, 'Acercándose desde el este'),
(8, 3, 'Explorador-Nano', '2025-07-20', 4, 'Detectado en sistemas de ventilación'),
(9, 4, 'Centinela-X7', '2025-07-22', 7, 'Escaneando instalaciones'),
(10, 1, 'Médico-Bot V3', '2025-07-24', 2, 'Ofreciendo asistencia médica'),
(11, 5, 'Trabajador-Industrial', '2025-07-25', 1, 'Reparando estructura externa'),
(12, 2, 'Explorador-Nano', '2025-07-26', 4, 'Sobrevolando área'),
(13, 3, 'Destructor-Alpha', '2025-07-27', 10, 'Posición amenazante'),
(14, 6, 'Centinela-X7', '2025-07-28', 7, 'Monitoreo continuo'),
(15, 7, 'Médico-Bot V3', '2025-07-29', 2, 'Evaluando estado de supervivientes');

-- 3. EXPANSIÓN DE ATAQUES (más incidentes registrados)
INSERT INTO Attacks (AttackID, BaseID, Fecha, TipoRobot, Muertos, Descripcion) VALUES
(6, 2, '2025-07-19', 'Destructor-Alpha', 2, 'Ataque frontal con armas pesadas'),
(7, 3, '2025-07-21', 'Hunter-MK2', 1, 'Emboscada nocturna'),
(8, 4, '2025-07-23', 'Centinela-X7', 0, 'Intento de infiltración fallido'),
(9, 1, '2025-07-25', 'Assault-Unit', 3, 'Asalto coordinado'),
(10, 5, '2025-07-27', 'Destructor-Alpha', 1, 'Bombardeo a distancia'),
(11, 6, '2025-07-28', 'Hunter-MK2', 2, 'Caza selectiva'),
(12, 2, '2025-07-30', 'Centinela-X7', 0, 'Reconocimiento agresivo'),
(13, 7, '2025-08-01', 'Assault-Unit', 4, 'Ataque masivo'),
(14, 8, '2025-08-02', 'Destructor-Alpha', 1, 'Ataque sorpresa'),
(15, 3, '2025-08-03', 'Hunter-MK2', 2, 'Persecución letal');

-- 4. EXPANSIÓN DE ALIANZAS (más cooperación estratégica)
INSERT INTO Alliances (AllianceID, BaseID1, BaseID2, FechaInicio, NivelConfianza, TipoAlianza) VALUES
(6, 4, 5, '2025-07-10', 8, 'Cooperación logística'),
(7, 6, 7, '2025-07-12', 6, 'Intercambio de información'),
(8, 1, 8, '2025-07-15', 9, 'Alianza militar'),
(9, 2, 6, '2025-07-18', 7, 'Apoyo médico'),
(10, 3, 4, '2025-07-20', 5, 'Comercio de recursos'),
(11, 5, 8, '2025-07-22', 8, 'Defensa mutua'),
(12, 7, 1, '2025-07-25', 6, 'Intercambio tecnológico'),
(13, 4, 6, '2025-07-28', 7, 'Patrullas conjuntas'),
(14, 2, 3, '2025-07-30', 9, 'Alianza estratégica total'),
(15, 5, 7, '2025-08-01', 8, 'Cooperación científica');

-- 5. EXPANSIÓN DE MISIONES (más actividad entre bases)
INSERT INTO Missions (MissionID, OrigenID, DestinoID, Fecha, Objetivo, Estado, RecursosEnviados) VALUES
(6, 1, 3, '2025-07-16', 'Evacuación médica', 'Completada', 'Personal médico especializado'),
(7, 2, 5, '2025-07-18', 'Intercambio de suministros', 'En progreso', 'Medicinas y alimentos'),
(8, 4, 7, '2025-07-20', 'Reconocimiento conjunto', 'Completada', 'Equipo de exploración'),
(9, 6, 1, '2025-07-22', 'Transporte de armamento', 'Fallida', 'Armas y municiones'),
(10, 3, 8, '2025-07-24', 'Rescate de supervivientes', 'Completada', 'Equipo de rescate'),
(11, 5, 2, '2025-07-26', 'Intercambio tecnológico', 'En progreso', 'Equipos de comunicación'),
(12, 7, 4, '2025-07-28', 'Misión diplomática', 'Completada', 'Delegación diplomática'),
(13, 8, 6, '2025-07-30', 'Operación de salvamento', 'Fallida', 'Equipo de emergencia'),
(14, 1, 5, '2025-08-01', 'Suministro de energía', 'En progreso', 'Generadores portátiles'),
(15, 2, 7, '2025-08-03', 'Evacuación preventiva', 'Completada', 'Transporte y escoltas');

-- 6. EXPANSIÓN DE SUMINISTROS (más entregas registradas)
INSERT INTO Supplies (SupplyID, BaseID, Tipo, Cantidad, FechaEntrega, Origen) VALUES
(6, 1, 'Medicinas', 150, '2025-07-15', 'Cruz Roja Internacional'),
(7, 2, 'Comida', 800, '2025-07-16', 'Airdrop gubernamental'),
(8, 3, 'Agua', 1200, '2025-07-18', 'Convoy de ayuda'),
(9, 4, 'Armas', 75, '2025-07-20', 'Arsenal militar'),
(10, 5, 'Medicinas', 200, '2025-07-22', 'Hospital móvil'),
(11, 6, 'Comida', 600, '2025-07-24', 'Donación civil'),
(12, 7, 'Agua', 900, '2025-07-26', 'Pozo artesiano'),
(13, 8, 'Armas', 50, '2025-07-28', 'Base militar aliada'),
(14, 1, 'Comida', 400, '2025-07-30', 'Producción local'),
(15, 2, 'Medicinas', 100, '2025-08-01', 'Laboratorio móvil'),
(16, 3, 'Agua', 800, '2025-08-02', 'Sistema de purificación'),
(17, 4, 'Comida', 500, '2025-08-03', 'Huerto hidropónico'),
(18, 5, 'Armas', 125, '2025-08-04', 'Fabricación local'),
(19, 6, 'Medicinas', 175, '2025-08-05', 'Intercambio entre bases'),
(20, 7, 'Agua', 1000, '2025-08-06', 'Recolección de lluvia');

-- 7. NUEVO SUPERVIVIENTE PARA ENRIQUECER DIVERSIDAD
INSERT INTO Survivors (SurvivorID, Nombre, Edad, Rol, BaseID) VALUES
(9, 'Alex Rivera', 29, 'Ingeniero', 1),
(10, 'Luna Santos', 33, 'Estratega', 2);

-- ========================================
-- CONSULTAS DE VERIFICACIÓN DE EXPANSIÓN
-- ========================================

-- Verificar robots expandidos
SELECT 'ROBOTS EXPANDIDOS' AS Categoria, COUNT(*) AS Total, MIN(NivelAmenaza) AS MinAmenaza, MAX(NivelAmenaza) AS MaxAmenaza
FROM Robots;

-- Verificar avistamientos recientes  
SELECT 'AVISTAMIENTOS RECIENTES' AS Categoria, COUNT(*) AS Total, MAX(Fecha) AS UltimoAvistamiento
FROM RobotSightings
WHERE Fecha >= '2025-07-15';

-- Verificar ataques registrados
SELECT 'ATAQUES REGISTRADOS' AS Categoria, COUNT(*) AS Total, SUM(Muertos) AS TotalBajas
FROM Attacks;

-- Verificar alianzas activas
SELECT 'ALIANZAS ACTIVAS' AS Categoria, COUNT(*) AS Total, AVG(CAST(NivelConfianza AS FLOAT)) AS ConfianzaPromedio
FROM Alliances;

-- Verificar misiones operativas
SELECT 'MISIONES OPERATIVAS' AS Categoria, COUNT(*) AS Total,
       SUM(CASE WHEN Estado = 'Completada' THEN 1 ELSE 0 END) AS Completadas,
       SUM(CASE WHEN Estado = 'En progreso' THEN 1 ELSE 0 END) AS EnProgreso,
       SUM(CASE WHEN Estado = 'Fallida' THEN 1 ELSE 0 END) AS Fallidas
FROM Missions;

-- Verificar suministros entregados
SELECT 'SUMINISTROS ENTREGADOS' AS Categoria, COUNT(*) AS Total, COUNT(DISTINCT BaseID) AS BasesAbastecidas
FROM Supplies
WHERE FechaEntrega >= '2025-07-01';

-- Estado general del sistema expandido
SELECT 'RESUMEN SISTEMA EXPANDIDO' AS Categoria,
       (SELECT COUNT(*) FROM Bases) AS Bases,
       (SELECT COUNT(*) FROM Survivors) AS Supervivientes,
       (SELECT COUNT(*) FROM Robots) AS TiposRobots,
       (SELECT COUNT(*) FROM Alliances) AS Alianzas,
       (SELECT COUNT(*) FROM Missions) AS Misiones,
       (SELECT COUNT(*) FROM Supplies) AS Suministros;
