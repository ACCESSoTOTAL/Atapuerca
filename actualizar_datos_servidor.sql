-- ========================================
-- SCRIPT DE ACTUALIZACIÓN DE DATOS SERVIDOR SQL
-- Proyecto Atapuerca - Retos JOIN Optimizados
-- ========================================

-- Este script actualiza las tablas del servidor con los nuevos datos
-- que optimizan los retos de JOIN y crean escenarios educativos

USE AtapuercaDB; -- Cambia por el nombre de tu base de datos
GO

-- ========================================
-- 1. ACTUALIZAR TABLA SURVIVORS
-- ========================================

-- Agregar nuevos supervivientes (Maya Chen, Diego Morales, Zara Al-Rashid)
-- Nota: Verificar que no existan ya estos IDs antes de insertar

-- Maya Chen - Superviviente huérfana (sin base)
INSERT INTO Survivors (SurvivorID, Nombre, Edad, Rol, BaseID)
VALUES (8, 'Maya Chen', 22, 'Médica', NULL);

-- Diego Morales - Superviviente huérfano (sin base) - misma edad que Li Wei para Auto-JOIN
INSERT INTO Survivors (SurvivorID, Nombre, Edad, Rol, BaseID)
VALUES (9, 'Diego Morales', 27, 'Scout', NULL);

-- Zara Al-Rashid - Comandante en nueva base - misma edad que Marcus para Auto-JOIN
INSERT INTO Survivors (SurvivorID, Nombre, Edad, Rol, BaseID)
VALUES (10, 'Zara Al-Rashid', 41, 'Comandante', 6);

-- ========================================
-- 2. ACTUALIZAR TABLA BASES
-- ========================================

-- Agregar nuevas bases (Puesto Avanzado Alpha, Estación Fantasma, Centro Nexus)

-- Base 6 - Puesto Avanzado Alpha (con superviviente Zara)
INSERT INTO Bases (BaseID, Nombre, Ubicacion, TipoBase, Capacidad, Latitud, Longitud, EsComandoCentral)
VALUES (6, 'Puesto Avanzado Alpha', 'Tundra Ártica', 'Humana', 30, 71.006, -8.003, '0');

-- Base 7 - Estación Fantasma (sin supervivientes - para LEFT JOIN)
INSERT INTO Bases (BaseID, Nombre, Ubicacion, TipoBase, Capacidad, Latitud, Longitud, EsComandoCentral)
VALUES (7, 'Estación Fantasma', 'Valle Perdido', 'Humana', 25, 42.123, 12.456, '0');

-- Base 8 - Centro Nexus (IA sin supervivientes - para LEFT JOIN)
INSERT INTO Bases (BaseID, Nombre, Ubicacion, TipoBase, Capacidad, Latitud, Longitud, EsComandoCentral)
VALUES (8, 'Centro Nexus', 'Plataforma Orbital', 'IA', NULL, NULL, NULL, '0');

-- ========================================
-- 3. ACTUALIZAR TABLA RESOURCES
-- ========================================

-- Agregar nuevos recursos para las nuevas bases

-- Recursos para Base 6 (Puesto Avanzado Alpha) - recursos limitados
INSERT INTO Resources (BaseID, AguaLitros, ComidaRaciones, Armas, Medicinas)
VALUES (6, 300, 150, 15, 80);

-- Recursos para Base 7 (Estación Fantasma) - completamente agotada (para RIGHT JOIN)
INSERT INTO Resources (BaseID, AguaLitros, ComidaRaciones, Armas, Medicinas)
VALUES (7, 0, 0, 0, 0);

-- ========================================
-- 4. VERIFICACIONES OPCIONALES
-- ========================================

-- Verificar que los datos se insertaron correctamente
PRINT 'Verificando nuevos supervivientes...';
SELECT SurvivorID, Nombre, Edad, Rol, BaseID 
FROM Survivors 
WHERE SurvivorID IN (8, 9, 10);

PRINT 'Verificando nuevas bases...';
SELECT BaseID, Nombre, Ubicacion, TipoBase, Capacidad 
FROM Bases 
WHERE BaseID IN (6, 7, 8);

PRINT 'Verificando nuevos recursos...';
SELECT RecursosID, BaseID, AguaLitros, ComidaRaciones, Armas, Medicinas 
FROM Resources 
WHERE BaseID IN (6, 7);

-- ========================================
-- 5. PRUEBAS DE ESCENARIOS JOIN
-- ========================================

PRINT 'Probando escenarios JOIN optimizados...';

-- INNER JOIN - Solo supervivientes con bases válidas (debería ser 8)
SELECT COUNT(*) as 'Supervivientes_con_Base'
FROM Survivors s
INNER JOIN Bases b ON s.BaseID = b.BaseID;

-- LEFT JOIN - Todos los supervivientes incluyendo huérfanos (debería ser 10)
SELECT COUNT(*) as 'Todos_Supervivientes'
FROM Survivors s
LEFT JOIN Bases b ON s.BaseID = b.BaseID;

-- RIGHT JOIN - Todas las bases incluyendo vacías (debería ser 8)
SELECT COUNT(*) as 'Todas_Bases'
FROM Survivors s
RIGHT JOIN Bases b ON s.BaseID = b.BaseID;

-- Auto-JOIN - Supervivientes de misma edad (debería encontrar parejas)
SELECT s1.Nombre as Superviviente1, s2.Nombre as Superviviente2, s1.Edad
FROM Survivors s1
INNER JOIN Survivors s2 ON s1.Edad = s2.Edad AND s1.SurvivorID < s2.SurvivorID;

PRINT 'Actualización completada exitosamente!';

-- ========================================
-- 6. SCRIPT DE ROLLBACK (OPCIONAL)
-- ========================================

/*
-- Usar solo si necesitas revertir los cambios:

DELETE FROM Resources WHERE BaseID IN (6, 7);
DELETE FROM Survivors WHERE SurvivorID IN (8, 9, 10);
DELETE FROM Bases WHERE BaseID IN (6, 7, 8);

PRINT 'Rollback completado';
*/
