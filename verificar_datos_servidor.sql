-- ========================================
-- SCRIPT DE VERIFICACIÓN DE DATOS
-- Proyecto Atapuerca - Verificar estado actual
-- ========================================

USE AtapuercaDB; -- Cambia por el nombre de tu base de datos
GO

PRINT '==========================================';
PRINT 'VERIFICACIÓN DEL ESTADO ACTUAL DE DATOS';
PRINT '==========================================';

-- ========================================
-- 1. CONTEO GENERAL
-- ========================================

PRINT 'CONTEO GENERAL:';
SELECT 
    (SELECT COUNT(*) FROM Survivors) as Total_Supervivientes,
    (SELECT COUNT(*) FROM Bases) as Total_Bases,
    (SELECT COUNT(*) FROM Resources) as Total_Recursos;

-- ========================================
-- 2. VERIFICAR SUPERVIVIENTES
-- ========================================

PRINT '';
PRINT 'SUPERVIVIENTES ACTUALES:';
SELECT SurvivorID, Nombre, Edad, Rol, 
       CASE WHEN BaseID IS NULL THEN 'SIN BASE' ELSE CAST(BaseID AS VARCHAR) END as BaseID
FROM Survivors 
ORDER BY SurvivorID;

PRINT '';
PRINT 'SUPERVIVIENTES SIN BASE (Huérfanos):';
SELECT SurvivorID, Nombre, Edad, Rol
FROM Survivors 
WHERE BaseID IS NULL;

-- ========================================
-- 3. VERIFICAR BASES
-- ========================================

PRINT '';
PRINT 'BASES ACTUALES:';
SELECT BaseID, Nombre, Ubicacion, TipoBase, 
       CASE WHEN Capacidad IS NULL THEN 'N/A' ELSE CAST(Capacidad AS VARCHAR) END as Capacidad
FROM Bases 
ORDER BY BaseID;

PRINT '';
PRINT 'BASES SIN SUPERVIVIENTES (Vacías):';
SELECT b.BaseID, b.Nombre, b.TipoBase
FROM Bases b
LEFT JOIN Survivors s ON b.BaseID = s.BaseID
WHERE s.BaseID IS NULL
ORDER BY b.BaseID;

-- ========================================
-- 4. VERIFICAR RECURSOS
-- ========================================

PRINT '';
PRINT 'RECURSOS POR BASE:';
SELECT r.BaseID, b.Nombre as NombreBase, 
       r.AguaLitros, r.ComidaRaciones, r.Armas, r.Medicinas
FROM Resources r
LEFT JOIN Bases b ON r.BaseID = b.BaseID
ORDER BY r.BaseID;

PRINT '';
PRINT 'BASES SIN RECURSOS:';
SELECT b.BaseID, b.Nombre
FROM Bases b
LEFT JOIN Resources r ON b.BaseID = r.BaseID
WHERE r.BaseID IS NULL
ORDER BY b.BaseID;

-- ========================================
-- 5. PRUEBAS DE ESCENARIOS JOIN
-- ========================================

PRINT '';
PRINT '==========================================';
PRINT 'PRUEBAS DE ESCENARIOS JOIN:';
PRINT '==========================================';

-- INNER JOIN Test
PRINT 'INNER JOIN - Supervivientes con base válida:';
SELECT COUNT(*) as Cantidad_INNER_JOIN
FROM Survivors s
INNER JOIN Bases b ON s.BaseID = b.BaseID;

-- LEFT JOIN Test  
PRINT '';
PRINT 'LEFT JOIN - Todos los supervivientes (incluye huérfanos):';
SELECT COUNT(*) as Cantidad_LEFT_JOIN
FROM Survivors s
LEFT JOIN Bases b ON s.BaseID = b.BaseID;

-- RIGHT JOIN Test
PRINT '';
PRINT 'RIGHT JOIN - Todas las bases (incluye vacías):';
SELECT COUNT(DISTINCT b.BaseID) as Cantidad_RIGHT_JOIN
FROM Survivors s
RIGHT JOIN Bases b ON s.BaseID = b.BaseID;

-- Auto-JOIN Test
PRINT '';
PRINT 'AUTO-JOIN - Supervivientes de misma edad:';
SELECT s1.Nombre as Superviviente1, s2.Nombre as Superviviente2, s1.Edad
FROM Survivors s1
INNER JOIN Survivors s2 ON s1.Edad = s2.Edad AND s1.SurvivorID < s2.SurvivorID
ORDER BY s1.Edad;

-- ========================================
-- 6. VERIFICAR NUEVOS REGISTROS ESPECÍFICOS
-- ========================================

PRINT '';
PRINT '==========================================';
PRINT 'VERIFICACIÓN DE NUEVOS REGISTROS:';
PRINT '==========================================';

-- Verificar nuevos supervivientes
PRINT 'Nuevos supervivientes (IDs 8, 9, 10):';
SELECT SurvivorID, Nombre, Edad, Rol, BaseID
FROM Survivors 
WHERE SurvivorID IN (8, 9, 10);

-- Verificar nuevas bases  
PRINT '';
PRINT 'Nuevas bases (IDs 6, 7, 8):';
SELECT BaseID, Nombre, Ubicacion, TipoBase
FROM Bases 
WHERE BaseID IN (6, 7, 8);

-- Verificar nuevos recursos
PRINT '';
PRINT 'Nuevos recursos (Bases 6, 7):';
SELECT RecursosID, BaseID, AguaLitros, ComidaRaciones, Armas, Medicinas
FROM Resources 
WHERE BaseID IN (6, 7);

-- ========================================
-- 7. ESTADO IDEAL ESPERADO
-- ========================================

PRINT '';
PRINT '==========================================';
PRINT 'ESTADO IDEAL ESPERADO:';
PRINT '==========================================';
PRINT '- Total Supervivientes: 10 (incluyendo Maya Chen y Diego Morales sin base)';
PRINT '- Total Bases: 8 (incluyendo Puesto Alpha, Estación Fantasma, Centro Nexus)';
PRINT '- Total Recursos: 5 (incluyendo recursos para nuevas bases)';
PRINT '- INNER JOIN: 8 supervivientes con base';
PRINT '- LEFT JOIN: 10 supervivientes total';
PRINT '- RIGHT JOIN: 8 bases total';
PRINT '- AUTO-JOIN: 3 parejas misma edad (Elena+Viktor, Li+Diego, Marcus+Zara)';
PRINT '==========================================';

PRINT 'Verificación completada!';
