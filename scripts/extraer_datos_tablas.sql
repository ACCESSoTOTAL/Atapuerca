-- Script para extraer todos los datos de las tablas de Atapuerca
-- Ejecuta cada consulta por separado y copia los resultados
-- =====================================================

-- 1. TABLA: Alliances
-- =====================================================
SELECT 
    'const alliances = [' AS query_start
UNION ALL
SELECT 
    '  {' +
    'allianceId: ' + CAST(AllianceID AS VARCHAR(10)) + ', ' +
    'baseId1: ' + CAST(BaseID1 AS VARCHAR(10)) + ', ' +
    'baseId2: ' + CAST(BaseID2 AS VARCHAR(10)) + ', ' +
    'nivelConfianza: ' + CAST(NivelConfianza AS VARCHAR(10)) + ', ' +
    'fechaAlianza: "' + CONVERT(VARCHAR, FechaAlianza, 23) + '"' +
    '},'
FROM Alliances
UNION ALL
SELECT '];' AS query_end;

-- =====================================================
-- 2. TABLA: Attacks
-- =====================================================
SELECT 
    'const attacks = [' AS query_start
UNION ALL
SELECT 
    '  {' +
    'attackId: ' + CAST(AttackID AS VARCHAR(10)) + ', ' +
    'baseId: ' + CAST(BaseID AS VARCHAR(10)) + ', ' +
    'tipoRobot: "' + TipoRobot + '", ' +
    'fecha: "' + CONVERT(VARCHAR, Fecha, 23) + '", ' +
    'muertos: ' + CAST(Muertos AS VARCHAR(10)) + ', ' +
    'heridos: ' + CAST(Heridos AS VARCHAR(10)) +
    '},'
FROM Attacks
UNION ALL
SELECT '];' AS query_end;

-- =====================================================
-- 3. TABLA: Bases
-- =====================================================
SELECT 
    'const bases = [' AS query_start
UNION ALL
SELECT 
    '  {' +
    'baseId: ' + CAST(BaseID AS VARCHAR(10)) + ', ' +
    'nombre: "' + Nombre + '", ' +
    'tipoBase: "' + TipoBase + '", ' +
    'ubicacion: "' + ISNULL(Ubicacion, '') + '", ' +
    'latitud: ' + CAST(ISNULL(Latitud, 0) AS VARCHAR(20)) + ', ' +
    'longitud: ' + CAST(ISNULL(Longitud, 0) AS VARCHAR(20)) + ', ' +
    'capacidad: ' + CAST(ISNULL(Capacidad, 0) AS VARCHAR(10)) + ', ' +
    'esComandoCentral: ' + CAST(ISNULL(EsComandoCentral, 0) AS VARCHAR(1)) +
    '},'
FROM Bases
UNION ALL
SELECT '];' AS query_end;

-- =====================================================
-- 4. TABLA: DistanceMatrix
-- =====================================================
SELECT 
    'const distanceMatrix = [' AS query_start
UNION ALL
SELECT 
    '  {' +
    'distanceId: ' + CAST(DistanceID AS VARCHAR(10)) + ', ' +
    'idOrigen: ' + CAST(IDOrigen AS VARCHAR(10)) + ', ' +
    'idDestino: ' + CAST(IDDestino AS VARCHAR(10)) + ', ' +
    'kilometros: ' + CAST(Kilometros AS VARCHAR(20)) +
    '},'
FROM DistanceMatrix
UNION ALL
SELECT '];' AS query_end;

-- =====================================================
-- 5. TABLA: Missions
-- =====================================================
SELECT 
    'const missions = [' AS query_start
UNION ALL
SELECT 
    '  {' +
    'missionId: ' + CAST(MissionID AS VARCHAR(10)) + ', ' +
    'nombre: "' + Nombre + '", ' +
    'origenId: ' + CAST(OrigenID AS VARCHAR(10)) + ', ' +
    'destinoId: ' + CAST(DestinoID AS VARCHAR(10)) + ', ' +
    'estado: "' + Estado + '", ' +
    'fechaInicio: "' + CONVERT(VARCHAR, FechaInicio, 23) + '", ' +
    'fechaFin: "' + ISNULL(CONVERT(VARCHAR, FechaFin, 23), '') + '", ' +
    'objetivo: "' + ISNULL(Objetivo, '') + '"' +
    '},'
FROM Missions
UNION ALL
SELECT '];' AS query_end;

-- =====================================================
-- 6. TABLA: Resources
-- =====================================================
SELECT 
    'const resources = [' AS query_start
UNION ALL
SELECT 
    '  {' +
    'resourceId: ' + CAST(ResourceID AS VARCHAR(10)) + ', ' +
    'baseId: ' + CAST(BaseID AS VARCHAR(10)) + ', ' +
    'comidaRaciones: ' + CAST(ComidaRaciones AS VARCHAR(10)) + ', ' +
    'aguaLitros: ' + CAST(AguaLitros AS VARCHAR(10)) + ', ' +
    'armas: ' + CAST(Armas AS VARCHAR(10)) + ', ' +
    'medicinas: ' + CAST(Medicinas AS VARCHAR(10)) +
    '},'
FROM Resources
UNION ALL
SELECT '];' AS query_end;

-- =====================================================
-- 7. TABLA: Robots
-- =====================================================
SELECT 
    'const robots = [' AS query_start
UNION ALL
SELECT 
    '  {' +
    'robotId: ' + CAST(RobotID AS VARCHAR(10)) + ', ' +
    'modelo: "' + Modelo + '", ' +
    'generacion: "' + Generacion + '", ' +
    'nivelAmenaza: ' + CAST(NivelAmenaza AS VARCHAR(10)) + ', ' +
    'funciones: "' + ISNULL(Funciones, '') + '"' +
    '},'
FROM Robots
UNION ALL
SELECT '];' AS query_end;

-- =====================================================
-- 8. TABLA: RobotSightings
-- =====================================================
SELECT 
    'const robotSightings = [' AS query_start
UNION ALL
SELECT 
    '  {' +
    'sightingId: ' + CAST(SightingID AS VARCHAR(10)) + ', ' +
    'baseId: ' + CAST(BaseID AS VARCHAR(10)) + ', ' +
    'tipoRobot: "' + TipoRobot + '", ' +
    'fecha: "' + CONVERT(VARCHAR, Fecha, 23) + '", ' +
    'nivelAmenaza: ' + CAST(NivelAmenaza AS VARCHAR(10)) + ', ' +
    'descripcion: "' + ISNULL(Descripcion, '') + '"' +
    '},'
FROM RobotSightings
UNION ALL
SELECT '];' AS query_end;

-- =====================================================
-- 9. TABLA: Supplies
-- =====================================================
SELECT 
    'const supplies = [' AS query_start
UNION ALL
SELECT 
    '  {' +
    'supplyId: ' + CAST(SupplyID AS VARCHAR(10)) + ', ' +
    'baseId: ' + CAST(BaseID AS VARCHAR(10)) + ', ' +
    'tipo: "' + Tipo + '", ' +
    'cantidad: ' + CAST(Cantidad AS VARCHAR(10)) + ', ' +
    'fechaEntrega: "' + CONVERT(VARCHAR, FechaEntrega, 23) + '"' +
    '},'
FROM Supplies
UNION ALL
SELECT '];' AS query_end;

-- =====================================================
-- 10. TABLA: Survivors
-- =====================================================
SELECT 
    'const survivors = [' AS query_start
UNION ALL
SELECT 
    '  {' +
    'survivorId: ' + CAST(SurvivorID AS VARCHAR(10)) + ', ' +
    'nombre: "' + Nombre + '", ' +
    'edad: ' + CAST(Edad AS VARCHAR(10)) + ', ' +
    'baseId: ' + CAST(BaseID AS VARCHAR(10)) + ', ' +
    'rol: "' + Rol + '"' +
    '},'
FROM Survivors
UNION ALL
SELECT '];' AS query_end;

-- =====================================================
-- RESUMEN DE EXPORTACIÓN
-- =====================================================
SELECT 
    '// RESUMEN DE DATOS EXPORTADOS' AS summary_start
UNION ALL
SELECT 
    '// Total de tablas: 10' AS summary_1
UNION ALL
SELECT 
    '// Alliances: ' + CAST(COUNT(*) AS VARCHAR(10)) + ' registros'
FROM Alliances
UNION ALL
SELECT 
    '// Attacks: ' + CAST(COUNT(*) AS VARCHAR(10)) + ' registros'
FROM Attacks
UNION ALL
SELECT 
    '// Bases: ' + CAST(COUNT(*) AS VARCHAR(10)) + ' registros'
FROM Bases
UNION ALL
SELECT 
    '// DistanceMatrix: ' + CAST(COUNT(*) AS VARCHAR(10)) + ' registros'
FROM DistanceMatrix
UNION ALL
SELECT 
    '// Missions: ' + CAST(COUNT(*) AS VARCHAR(10)) + ' registros'
FROM Missions
UNION ALL
SELECT 
    '// Resources: ' + CAST(COUNT(*) AS VARCHAR(10)) + ' registros'
FROM Resources
UNION ALL
SELECT 
    '// Robots: ' + CAST(COUNT(*) AS VARCHAR(10)) + ' registros'
FROM Robots
UNION ALL
SELECT 
    '// RobotSightings: ' + CAST(COUNT(*) AS VARCHAR(10)) + ' registros'
FROM RobotSightings
UNION ALL
SELECT 
    '// Supplies: ' + CAST(COUNT(*) AS VARCHAR(10)) + ' registros'
FROM Supplies
UNION ALL
SELECT 
    '// Survivors: ' + CAST(COUNT(*) AS VARCHAR(10)) + ' registros'
FROM Survivors;
