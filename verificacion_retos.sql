-- 🔍 VERIFICACIÓN DE RETOS SQL - UNIVERSO ATAPUERCA
-- Este archivo contiene las consultas de los primeros 10 retos para verificar que son ejecutables

-- ===== VERIFICACIÓN DE ESTRUCTURA DE DATOS =====
-- Primero verificamos que las tablas existen y tienen datos

-- Verificar estructura de Bases
SELECT 'Verificando tabla Bases...' AS Estado;
SELECT COUNT(*) AS TotalBases FROM Bases;
SELECT * FROM Bases;

-- Verificar estructura de Supervivientes  
SELECT 'Verificando tabla Supervivientes...' AS Estado;
SELECT COUNT(*) AS TotalSupervivientes FROM Supervivientes;
SELECT * FROM Supervivientes;

-- Verificar estructura de Recursos
SELECT 'Verificando tabla Recursos...' AS Estado;
SELECT COUNT(*) AS TotalRecursos FROM Recursos;
SELECT * FROM Recursos;

-- ===== FASE 1: VERIFICACIÓN DE RETOS BÁSICOS (1-10) =====

-- 🎯 RETO 1: Reconocimiento inicial
SELECT '=== RETO 1: Reconocimiento inicial ===' AS Reto;
SELECT * FROM Bases;

-- 🎯 RETO 2: Información básica ordenada
SELECT '=== RETO 2: Información básica ordenada ===' AS Reto;
SELECT Nombre, Tipo FROM Bases ORDER BY Nombre;

-- 🎯 RETO 3: Filtro de supervivencia
SELECT '=== RETO 3: Filtro de supervivencia ===' AS Reto;
SELECT * FROM Bases WHERE Tipo = 'Humana';

-- 🎯 RETO 4: Censo de resistentes
SELECT '=== RETO 4: Censo de resistentes ===' AS Reto;
SELECT * FROM Supervivientes;

-- 🎯 RETO 5: Inventario de recursos
SELECT '=== RETO 5: Inventario de recursos ===' AS Reto;
SELECT * FROM Recursos;

-- 🎯 RETO 6: Supervivientes específicos
SELECT '=== RETO 6: Supervivientes específicos ===' AS Reto;
SELECT Nombre, Edad FROM Supervivientes;

-- 🎯 RETO 7: Veteranos de guerra
SELECT '=== RETO 7: Veteranos de guerra ===' AS Reto;
SELECT * FROM Supervivientes WHERE Edad > 30;

-- 🎯 RETO 8: Bases bien abastecidas
SELECT '=== RETO 8: Bases bien abastecidas ===' AS Reto;
SELECT * FROM Recursos WHERE ComidaRaciones > 40;

-- 🎯 RETO 9: Equipo médico
SELECT '=== RETO 9: Equipo médico ===' AS Reto;
SELECT * FROM Supervivientes WHERE Profesion = 'Médico';

-- 🎯 RETO 10: Supervivientes ordenados
SELECT '=== RETO 10: Supervivientes ordenados ===' AS Reto;
SELECT * FROM Supervivientes ORDER BY Edad DESC;

-- ===== VERIFICACIÓN DE RANGOS DE DATOS =====
-- Comprobar rangos para asegurar que los filtros son realistas

-- Rangos de edad
SELECT 'Rangos de edad:' AS Verificacion;
SELECT MIN(Edad) AS EdadMinima, MAX(Edad) AS EdadMaxima, AVG(Edad) AS EdadPromedio FROM Supervivientes;

-- Rangos de raciones de comida
SELECT 'Rangos de comida:' AS Verificacion;
SELECT MIN(ComidaRaciones) AS ComidaMinima, MAX(ComidaRaciones) AS ComidaMaxima, AVG(ComidaRaciones) AS ComidaPromedio FROM Recursos;

-- Rangos de agua
SELECT 'Rangos de agua:' AS Verificacion;
SELECT MIN(AguaLitros) AS AguaMinima, MAX(AguaLitros) AS AguaMaxima, AVG(AguaLitros) AS AguaPromedio FROM Recursos;

-- Rangos de armas
SELECT 'Rangos de armas:' AS Verificacion;
SELECT MIN(Armas) AS ArmasMinimas, MAX(Armas) AS ArmasMaximas, AVG(Armas) AS ArmasPromedio FROM Recursos;

-- Tipos de bases disponibles
SELECT 'Tipos de bases:' AS Verificacion;
SELECT Tipo, COUNT(*) AS Cantidad FROM Bases GROUP BY Tipo;

-- Profesiones disponibles
SELECT 'Profesiones disponibles:' AS Verificacion;
SELECT Profesion, COUNT(*) AS Cantidad FROM Supervivientes GROUP BY Profesion;

-- ===== VERIFICACIÓN DE RESULTADOS ESPERADOS =====
-- Verificar que cada reto devuelve al menos 1 resultado

SELECT 'RESULTADOS DE VERIFICACIÓN:' AS Resumen;

-- Reto 3: ¿Hay bases humanas?
SELECT 'Reto 3 - Bases Humanas:' AS Verificacion, COUNT(*) AS Resultados 
FROM Bases WHERE Tipo = 'Humana';

-- Reto 7: ¿Hay supervivientes > 30 años?
SELECT 'Reto 7 - Veteranos >30:' AS Verificacion, COUNT(*) AS Resultados 
FROM Supervivientes WHERE Edad > 30;

-- Reto 8: ¿Hay bases con >40 raciones?
SELECT 'Reto 8 - Bases bien abastecidas >40:' AS Verificacion, COUNT(*) AS Resultados 
FROM Recursos WHERE ComidaRaciones > 40;

-- Reto 9: ¿Hay médicos?
SELECT 'Reto 9 - Médicos disponibles:' AS Verificacion, COUNT(*) AS Resultados 
FROM Supervivientes WHERE Profesion = 'Médico';
