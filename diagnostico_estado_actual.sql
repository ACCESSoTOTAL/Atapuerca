-- ========================================
-- SCRIPT DE DIAGNÓSTICO
-- Verificar estado actual de bases y recursos
-- ========================================

USE AtapuercaNet;
GO

PRINT '==========================================';
PRINT 'DIAGNÓSTICO DEL ESTADO ACTUAL';
PRINT '==========================================';

-- ========================================
-- 1. VERIFICAR TODAS LAS BASES EXISTENTES
-- ========================================

PRINT 'BASES EXISTENTES:';
SELECT BaseID, Nombre, TipoBase, Capacidad
FROM Bases 
ORDER BY BaseID;

PRINT '';
PRINT 'CONTEO DE BASES:';
SELECT COUNT(*) as Total_Bases FROM Bases;

-- ========================================
-- 2. VERIFICAR BASES ESPECÍFICAS (6, 7, 8)
-- ========================================

PRINT '';
PRINT 'VERIFICANDO BASES 6, 7, 8:';
SELECT BaseID, Nombre, 
       CASE WHEN BaseID = 6 THEN 'Puesto Avanzado Alpha (ESPERADA)'
            WHEN BaseID = 7 THEN 'Estación Fantasma (ESPERADA)'
            WHEN BaseID = 8 THEN 'Centro Nexus (ESPERADA)'
            ELSE 'OTRA BASE'
       END as Descripcion
FROM Bases 
WHERE BaseID IN (6, 7, 8)
ORDER BY BaseID;

-- ========================================
-- 3. VERIFICAR RECURSOS EXISTENTES
-- ========================================

PRINT '';
PRINT 'RECURSOS EXISTENTES:';
SELECT r.RecursosID, r.BaseID, b.Nombre as NombreBase, 
       r.AguaLitros, r.ComidaRaciones, r.Armas, r.Medicinas
FROM Resources r
LEFT JOIN Bases b ON r.BaseID = b.BaseID
ORDER BY r.BaseID;

-- ========================================
-- 4. VERIFICAR INTEGRIDAD FOREIGN KEYS
-- ========================================

PRINT '';
PRINT 'BASES SIN RECURSOS:';
SELECT b.BaseID, b.Nombre
FROM Bases b
LEFT JOIN Resources r ON b.BaseID = r.BaseID
WHERE r.BaseID IS NULL
ORDER BY b.BaseID;

PRINT '';
PRINT 'RECURSOS HUÉRFANOS (sin base válida):';
SELECT r.RecursosID, r.BaseID
FROM Resources r
LEFT JOIN Bases b ON r.BaseID = b.BaseID
WHERE b.BaseID IS NULL;

-- ========================================
-- 5. VERIFICAR SUPERVIVIENTES
-- ========================================

PRINT '';
PRINT 'SUPERVIVIENTES EXISTENTES:';
SELECT SurvivorID, Nombre, Edad, Rol, BaseID
FROM Survivors 
ORDER BY SurvivorID;

PRINT '';
PRINT 'CONTEO DE SUPERVIVIENTES:';
SELECT COUNT(*) as Total_Supervivientes FROM Survivors;

-- ========================================
-- 6. VERIFICAR ALIANZAS
-- ========================================

PRINT '';
PRINT 'ALIANZAS EXISTENTES:';
SELECT AllianceID, BaseID1, BaseID2, FechaInicio, NivelConfianza
FROM Alliances 
ORDER BY AllianceID;

PRINT '';
PRINT 'CONTEO DE ALIANZAS:';
SELECT COUNT(*) as Total_Alianzas FROM Alliances;

-- ========================================
-- 7. VERIFICAR ATAQUES
-- ========================================

PRINT '';
PRINT 'ATAQUES REGISTRADOS:';
SELECT AttackID, BaseID, Fecha, TipoRobot, Daños, Muertos
FROM Attacks 
ORDER BY Fecha DESC;

PRINT '';
PRINT 'CONTEO DE ATAQUES:';
SELECT COUNT(*) as Total_Ataques FROM Attacks;

-- ========================================
-- 8. VERIFICAR MATRIZ DE DISTANCIAS
-- ========================================

PRINT '';
PRINT 'MATRIZ DE DISTANCIAS:';
SELECT ID, IDOrigen, IDDestino, Kilometros
FROM DistanceMatrix 
ORDER BY IDOrigen, IDDestino;

PRINT '';
PRINT 'CONTEO DE RUTAS EN MATRIZ:';
SELECT COUNT(*) as Total_Rutas FROM DistanceMatrix;

-- ========================================
-- 9. VERIFICAR MISIONES
-- ========================================

PRINT '';
PRINT 'MISIONES EXISTENTES:';
SELECT MissionID, Nombre, OrigenID, DestinoID, FechaInicio, FechaFin, Objetivo, Estado
FROM Missions 
ORDER BY MissionID;

PRINT '';
PRINT 'CONTEO DE MISIONES:';
SELECT COUNT(*) as Total_Misiones FROM Missions;

-- ========================================
-- 10. VERIFICAR ROBOTS
-- ========================================

PRINT '';
PRINT 'ROBOTS REGISTRADOS:';
SELECT RobotID, Modelo, Generacion, Funciones, NivelAmenaza
FROM Robots 
ORDER BY RobotID;

PRINT '';
PRINT 'CONTEO DE ROBOTS:';
SELECT COUNT(*) as Total_Robots FROM Robots;

-- ========================================
-- 11. VERIFICAR AVISTAMIENTOS DE ROBOTS
-- ========================================

PRINT '';
PRINT 'AVISTAMIENTOS DE ROBOTS:';
SELECT SightingID, Fecha, Coordenadas, TipoRobot, NivelAmenaza, BaseID
FROM RobotSightings 
ORDER BY Fecha DESC;

PRINT '';
PRINT 'CONTEO DE AVISTAMIENTOS:';
SELECT COUNT(*) as Total_Avistamientos FROM RobotSightings;

-- ========================================
-- 12. VERIFICAR SUMINISTROS
-- ========================================

PRINT '';
PRINT 'SUMINISTROS EXISTENTES:';
SELECT SupplyID, BaseID, Tipo, Cantidad, FechaEntrega
FROM Supplies 
ORDER BY SupplyID;

PRINT '';
PRINT 'CONTEO DE SUMINISTROS:';
SELECT COUNT(*) as Total_Suministros FROM Supplies;

-- ========================================
-- 13. RESUMEN GENERAL DE TODAS LAS TABLAS
-- ========================================

PRINT '';
PRINT 'RESUMEN GENERAL DEL SISTEMA:';
SELECT 
    'Bases' as Tabla, COUNT(*) as Total_Registros FROM Bases
UNION ALL
SELECT 
    'Survivors' as Tabla, COUNT(*) as Total_Registros FROM Survivors
UNION ALL
SELECT 
    'Resources' as Tabla, COUNT(*) as Total_Registros FROM Resources
UNION ALL
SELECT 
    'Alliances' as Tabla, COUNT(*) as Total_Registros FROM Alliances
UNION ALL
SELECT 
    'Attacks' as Tabla, COUNT(*) as Total_Registros FROM Attacks
UNION ALL
SELECT 
    'DistanceMatrix' as Tabla, COUNT(*) as Total_Registros FROM DistanceMatrix
UNION ALL
SELECT 
    'Missions' as Tabla, COUNT(*) as Total_Registros FROM Missions
UNION ALL
SELECT 
    'Robots' as Tabla, COUNT(*) as Total_Registros FROM Robots
UNION ALL
SELECT 
    'RobotSightings' as Tabla, COUNT(*) as Total_Registros FROM RobotSightings
UNION ALL
SELECT 
    'Supplies' as Tabla, COUNT(*) as Total_Registros FROM Supplies
ORDER BY Tabla;

-- ========================================
-- 14. INTEGRIDAD REFERENCIAL COMPLETA
-- ========================================

PRINT '';
PRINT 'VERIFICACIÓN DE INTEGRIDAD REFERENCIAL:';

-- Supervivientes huérfanos (sin base válida)
PRINT '';
PRINT 'SUPERVIVIENTES HUÉRFANOS (sin base válida):';
SELECT s.SurvivorID, s.Nombre, s.BaseID
FROM Survivors s
LEFT JOIN Bases b ON s.BaseID = b.BaseID
WHERE b.BaseID IS NULL;

-- Recursos huérfanos (sin base válida)
PRINT '';
PRINT 'RECURSOS HUÉRFANOS (sin base válida):';
SELECT r.RecursosID, r.BaseID
FROM Resources r
LEFT JOIN Bases b ON r.BaseID = b.BaseID
WHERE b.BaseID IS NULL;

-- Alianzas con bases inexistentes
PRINT '';
PRINT 'ALIANZAS CON BASES INEXISTENTES:';
SELECT a.AllianceID, a.BaseID1, a.BaseID2
FROM Alliances a
LEFT JOIN Bases b1 ON a.BaseID1 = b1.BaseID
LEFT JOIN Bases b2 ON a.BaseID2 = b2.BaseID
WHERE b1.BaseID IS NULL OR b2.BaseID IS NULL;

-- Ataques con bases inexistentes
PRINT '';
PRINT 'ATAQUES CON BASES INEXISTENTES:';
SELECT at.AttackID, at.BaseID
FROM Attacks at
LEFT JOIN Bases b ON at.BaseID = b.BaseID
WHERE b.BaseID IS NULL;

-- Misiones con bases inexistentes
PRINT '';
PRINT 'MISIONES CON REFERENCIAS INEXISTENTES:';
SELECT m.MissionID, m.OrigenID, m.DestinoID
FROM Missions m
LEFT JOIN Bases b1 ON m.OrigenID = b1.BaseID
LEFT JOIN Bases b2 ON m.DestinoID = b2.BaseID
WHERE b1.BaseID IS NULL OR b2.BaseID IS NULL;

-- Avistamientos con bases inexistentes
PRINT '';
PRINT 'AVISTAMIENTOS CON BASES INEXISTENTES:';
SELECT rs.SightingID, rs.BaseID
FROM RobotSightings rs
LEFT JOIN Bases b ON rs.BaseID = b.BaseID
WHERE b.BaseID IS NULL;

-- Suministros con bases inexistentes
PRINT '';
PRINT 'SUMINISTROS CON BASES INEXISTENTES:';
SELECT su.SupplyID, su.BaseID
FROM Supplies su
LEFT JOIN Bases b ON su.BaseID = b.BaseID
WHERE b.BaseID IS NULL;

-- Matriz de distancias con bases inexistentes
PRINT '';
PRINT 'RUTAS CON BASES INEXISTENTES:';
SELECT dm.ID, dm.IDOrigen, dm.IDDestino
FROM DistanceMatrix dm
LEFT JOIN Bases b1 ON dm.IDOrigen = b1.BaseID
LEFT JOIN Bases b2 ON dm.IDDestino = b2.BaseID
WHERE b1.BaseID IS NULL OR b2.BaseID IS NULL;

-- ========================================
-- 15. ANÁLISIS DE LO QUE FALTA
-- ========================================

-- ========================================
-- 15. ANÁLISIS DE LO QUE FALTA
-- ========================================

PRINT '';
PRINT 'ANÁLISIS DE COMPLETITUD DEL SISTEMA:';

-- Verificar qué bases faltan
IF NOT EXISTS (SELECT 1 FROM Bases WHERE BaseID = 6)
    PRINT '❌ FALTA: Base 6 (Puesto Avanzado Alpha)';
ELSE
    PRINT '✅ EXISTE: Base 6 (Puesto Avanzado Alpha)';

IF NOT EXISTS (SELECT 1 FROM Bases WHERE BaseID = 7)
    PRINT '❌ FALTA: Base 7 (Estación Fantasma)';
ELSE
    PRINT '✅ EXISTE: Base 7 (Estación Fantasma)';

IF NOT EXISTS (SELECT 1 FROM Bases WHERE BaseID = 8)
    PRINT '❌ FALTA: Base 8 (Centro Nexus)';
ELSE
    PRINT '✅ EXISTE: Base 8 (Centro Nexus)';

-- Verificar qué supervivientes faltan
IF NOT EXISTS (SELECT 1 FROM Survivors WHERE SurvivorID = 8)
    PRINT '❌ FALTA: Superviviente 8 (Maya Chen)';
ELSE
    PRINT '✅ EXISTE: Superviviente 8 (Maya Chen)';

IF NOT EXISTS (SELECT 1 FROM Survivors WHERE SurvivorID = 9)
    PRINT '❌ FALTA: Superviviente 9 (Diego Morales)';
ELSE
    PRINT '✅ EXISTE: Superviviente 9 (Diego Morales)';

IF NOT EXISTS (SELECT 1 FROM Survivors WHERE SurvivorID = 10)
    PRINT '❌ FALTA: Superviviente 10 (Zara Al-Rashid)';
ELSE
    PRINT '✅ EXISTE: Superviviente 10 (Zara Al-Rashid)';

-- Verificar qué recursos faltan
IF NOT EXISTS (SELECT 1 FROM Resources WHERE BaseID = 6)
    PRINT '❌ FALTA: Recursos Base 6';
ELSE
    PRINT '✅ EXISTE: Recursos Base 6';

IF NOT EXISTS (SELECT 1 FROM Resources WHERE BaseID = 7)
    PRINT '❌ FALTA: Recursos Base 7';
ELSE
    PRINT '✅ EXISTE: Recursos Base 7';

-- Verificar datos de ejemplo en las otras tablas
PRINT '';
PRINT 'VERIFICACIÓN DE DATOS DE EJEMPLO:';

-- Verificar si hay al menos una alianza
IF EXISTS (SELECT 1 FROM Alliances)
    PRINT '✅ EXISTE: Al menos una alianza registrada';
ELSE
    PRINT '❌ FALTA: Datos de ejemplo en tabla Alliances';

-- Verificar si hay al menos un ataque
IF EXISTS (SELECT 1 FROM Attacks)
    PRINT '✅ EXISTE: Al menos un ataque registrado';
ELSE
    PRINT '❌ FALTA: Datos de ejemplo en tabla Attacks';

-- Verificar si hay matriz de distancias
IF EXISTS (SELECT 1 FROM DistanceMatrix)
    PRINT '✅ EXISTE: Matriz de distancias configurada';
ELSE
    PRINT '❌ FALTA: Datos en tabla DistanceMatrix';

-- Verificar si hay misiones
IF EXISTS (SELECT 1 FROM Missions)
    PRINT '✅ EXISTE: Al menos una misión registrada';
ELSE
    PRINT '❌ FALTA: Datos de ejemplo en tabla Missions';

-- Verificar si hay robots
IF EXISTS (SELECT 1 FROM Robots)
    PRINT '✅ EXISTE: Al menos un robot registrado';
ELSE
    PRINT '❌ FALTA: Datos de ejemplo en tabla Robots';

-- Verificar si hay avistamientos
IF EXISTS (SELECT 1 FROM RobotSightings)
    PRINT '✅ EXISTE: Al menos un avistamiento registrado';
ELSE
    PRINT '❌ FALTA: Datos de ejemplo en tabla RobotSightings';

-- Verificar si hay suministros
IF EXISTS (SELECT 1 FROM Supplies)
    PRINT '✅ EXISTE: Al menos un suministro registrado';
ELSE
    PRINT '❌ FALTA: Datos de ejemplo en tabla Supplies';

-- ========================================
-- 16. MÉTRICAS DE CALIDAD DE DATOS
-- ========================================

PRINT '';
PRINT 'MÉTRICAS DE CALIDAD DE DATOS:';

-- Porcentaje de bases con recursos
DECLARE @BasesConRecursos FLOAT = (SELECT COUNT(*) FROM Bases b INNER JOIN Resources r ON b.BaseID = r.BaseID);
DECLARE @TotalBases FLOAT = (SELECT COUNT(*) FROM Bases);
PRINT 'Porcentaje de bases con recursos: ' + CAST(ROUND((@BasesConRecursos / @TotalBases) * 100, 2) AS VARCHAR) + '%';

-- Porcentaje de bases con supervivientes
DECLARE @BasesConSupervivientes FLOAT = (SELECT COUNT(DISTINCT BaseID) FROM Survivors WHERE BaseID IS NOT NULL);
PRINT 'Porcentaje de bases con supervivientes: ' + CAST(ROUND((@BasesConSupervivientes / @TotalBases) * 100, 2) AS VARCHAR) + '%';

-- Porcentaje de bases vacías (sin supervivientes)
DECLARE @BasesVacias FLOAT = @TotalBases - @BasesConSupervivientes;
PRINT 'Porcentaje de bases vacías: ' + CAST(ROUND((@BasesVacias / @TotalBases) * 100, 2) AS VARCHAR) + '%';

-- Supervivientes huérfanos
DECLARE @SupervivientesHuerfanos FLOAT = (SELECT COUNT(*) FROM Survivors s LEFT JOIN Bases b ON s.BaseID = b.BaseID WHERE b.BaseID IS NULL);
DECLARE @TotalSupervivientes FLOAT = (SELECT COUNT(*) FROM Survivors);
IF @TotalSupervivientes > 0
    PRINT 'Porcentaje de supervivientes huérfanos: ' + CAST(ROUND((@SupervivientesHuerfanos / @TotalSupervivientes) * 100, 2) AS VARCHAR) + '%';

PRINT '';
PRINT '==========================================';
PRINT 'DIAGNÓSTICO COMPLETO FINALIZADO';
PRINT '10 TABLAS ANALIZADAS';
PRINT '==========================================';
