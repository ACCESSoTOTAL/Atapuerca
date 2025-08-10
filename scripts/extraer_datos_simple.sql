-- Script simplificado para extraer datos como arrays JavaScript
-- Ejecuta cada consulta por separado y copia el resultado
-- =====================================================

-- CONSULTA 1: Alliances
SELECT 
    'Alliances:',
    AllianceID, BaseID1, BaseID2, NivelConfianza, FechaAlianza 
FROM Alliances;

-- CONSULTA 2: Attacks  
SELECT 
    'Attacks:',
    AttackID, BaseID, TipoRobot, Fecha, Muertos, Heridos 
FROM Attacks;

-- CONSULTA 3: Bases
SELECT 
    'Bases:',
    BaseID, Nombre, TipoBase, Ubicacion, Latitud, Longitud, Capacidad, EsComandoCentral 
FROM Bases;

-- CONSULTA 4: DistanceMatrix
SELECT 
    'DistanceMatrix:',
    DistanceID, IDOrigen, IDDestino, Kilometros 
FROM DistanceMatrix;

-- CONSULTA 5: Missions
SELECT 
    'Missions:',
    MissionID, Nombre, OrigenID, DestinoID, Estado, FechaInicio, FechaFin, Objetivo 
FROM Missions;

-- CONSULTA 6: Resources
SELECT 
    'Resources:',
    ResourceID, BaseID, ComidaRaciones, AguaLitros, Armas, Medicinas 
FROM Resources;

-- CONSULTA 7: Robots
SELECT 
    'Robots:',
    RobotID, Modelo, Generacion, NivelAmenaza, Funciones 
FROM Robots;

-- CONSULTA 8: RobotSightings
SELECT 
    'RobotSightings:',
    SightingID, BaseID, TipoRobot, Fecha, NivelAmenaza, Descripcion 
FROM RobotSightings;

-- CONSULTA 9: Supplies
SELECT 
    'Supplies:',
    SupplyID, BaseID, Tipo, Cantidad, FechaEntrega 
FROM Supplies;

-- CONSULTA 10: Survivors
SELECT 
    'Survivors:',
    SurvivorID, Nombre, Edad, BaseID, Rol 
FROM Survivors;

-- =====================================================
-- CONTEO RÁPIDO DE REGISTROS
-- =====================================================
SELECT 'RESUMEN DE DATOS:' AS Info;

SELECT 'Alliances' AS Tabla, COUNT(*) AS Registros FROM Alliances
UNION ALL
SELECT 'Attacks', COUNT(*) FROM Attacks
UNION ALL
SELECT 'Bases', COUNT(*) FROM Bases
UNION ALL
SELECT 'DistanceMatrix', COUNT(*) FROM DistanceMatrix
UNION ALL
SELECT 'Missions', COUNT(*) FROM Missions
UNION ALL
SELECT 'Resources', COUNT(*) FROM Resources
UNION ALL
SELECT 'Robots', COUNT(*) FROM Robots
UNION ALL
SELECT 'RobotSightings', COUNT(*) FROM RobotSightings
UNION ALL
SELECT 'Supplies', COUNT(*) FROM Supplies
UNION ALL
SELECT 'Survivors', COUNT(*) FROM Survivors;
