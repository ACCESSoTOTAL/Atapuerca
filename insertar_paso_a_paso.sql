-- ========================================
-- SCRIPT PASO A PASO CON VERIFICACIONES
-- Insertar datos en orden correcto con validaciones
-- ========================================

USE AtapuercaNet;
GO

PRINT '==========================================';
PRINT 'EJECUCIÓN PASO A PASO CON VERIFICACIONES';
PRINT '==========================================';

-- ========================================
-- PASO 1: INSERTAR BASES PRIMERO
-- ========================================

PRINT 'PASO 1: Insertando bases...';

-- Base 6: Puesto Avanzado Alpha
IF NOT EXISTS (SELECT 1 FROM Bases WHERE BaseID = 6)
BEGIN
    INSERT INTO Bases (BaseID, Nombre, Ubicacion, TipoBase, Capacidad, Latitud, Longitud, EsComandoCentral)
    VALUES (6, 'Puesto Avanzado Alpha', 'Tundra Ártica', 'Humana', 30, 71.006, -8.003, '0');
    PRINT '✅ Insertada: Base 6 (Puesto Avanzado Alpha)';
END
ELSE
    PRINT '⚠️  Ya existe: Base 6';

-- Base 7: Estación Fantasma
IF NOT EXISTS (SELECT 1 FROM Bases WHERE BaseID = 7)
BEGIN
    INSERT INTO Bases (BaseID, Nombre, Ubicacion, TipoBase, Capacidad, Latitud, Longitud, EsComandoCentral)
    VALUES (7, 'Estación Fantasma', 'Valle Perdido', 'Humana', 25, 42.123, 12.456, '0');
    PRINT '✅ Insertada: Base 7 (Estación Fantasma)';
END
ELSE
    PRINT '⚠️  Ya existe: Base 7';

-- Base 8: Centro Nexus
IF NOT EXISTS (SELECT 1 FROM Bases WHERE BaseID = 8)
BEGIN
    INSERT INTO Bases (BaseID, Nombre, Ubicacion, TipoBase, Capacidad, Latitud, Longitud, EsComandoCentral)
    VALUES (8, 'Centro Nexus', 'Plataforma Orbital', 'IA', NULL, NULL, NULL, '0');
    PRINT '✅ Insertada: Base 8 (Centro Nexus)';
END
ELSE
    PRINT '⚠️  Ya existe: Base 8';

-- ========================================
-- PASO 2: VERIFICAR QUE LAS BASES EXISTEN
-- ========================================

PRINT '';
PRINT 'PASO 2: Verificando que las bases se insertaron...';

IF EXISTS (SELECT 1 FROM Bases WHERE BaseID = 6)
    PRINT '✅ Base 6 confirmada en DB';
ELSE
    PRINT '❌ ERROR: Base 6 no existe';

IF EXISTS (SELECT 1 FROM Bases WHERE BaseID = 7)
    PRINT '✅ Base 7 confirmada en DB';
ELSE
    PRINT '❌ ERROR: Base 7 no existe';

IF EXISTS (SELECT 1 FROM Bases WHERE BaseID = 8)
    PRINT '✅ Base 8 confirmada en DB';
ELSE
    PRINT '❌ ERROR: Base 8 no existe';

-- ========================================
-- PASO 3: INSERTAR SUPERVIVIENTES
-- ========================================

PRINT '';
PRINT 'PASO 3: Insertando supervivientes...';

-- Maya Chen (sin base)
IF NOT EXISTS (SELECT 1 FROM Survivors WHERE SurvivorID = 8)
BEGIN
    INSERT INTO Survivors (SurvivorID, Nombre, Edad, Rol, BaseID)
    VALUES (8, 'Maya Chen', 22, 'Médica', NULL);
    PRINT '✅ Insertado: Maya Chen (huérfana)';
END
ELSE
    PRINT '⚠️  Ya existe: Maya Chen';

-- Diego Morales (sin base)
IF NOT EXISTS (SELECT 1 FROM Survivors WHERE SurvivorID = 9)
BEGIN
    INSERT INTO Survivors (SurvivorID, Nombre, Edad, Rol, BaseID)
    VALUES (9, 'Diego Morales', 27, 'Scout', NULL);
    PRINT '✅ Insertado: Diego Morales (huérfano)';
END
ELSE
    PRINT '⚠️  Ya existe: Diego Morales';

-- Zara Al-Rashid (en Base 6) - SOLO si Base 6 existe
IF EXISTS (SELECT 1 FROM Bases WHERE BaseID = 6) AND NOT EXISTS (SELECT 1 FROM Survivors WHERE SurvivorID = 10)
BEGIN
    INSERT INTO Survivors (SurvivorID, Nombre, Edad, Rol, BaseID)
    VALUES (10, 'Zara Al-Rashid', 41, 'Comandante', 6);
    PRINT '✅ Insertado: Zara Al-Rashid (Base 6)';
END
ELSE IF NOT EXISTS (SELECT 1 FROM Bases WHERE BaseID = 6)
    PRINT '❌ ERROR: No se puede insertar Zara - Base 6 no existe';
ELSE
    PRINT '⚠️  Ya existe: Zara Al-Rashid';

-- ========================================
-- PASO 4: INSERTAR RECURSOS (SOLO SI BASES EXISTEN)
-- ========================================

PRINT '';
PRINT 'PASO 4: Insertando recursos...';

-- Recursos Base 6 (SOLO si la base existe)
IF EXISTS (SELECT 1 FROM Bases WHERE BaseID = 6) AND NOT EXISTS (SELECT 1 FROM Resources WHERE BaseID = 6)
BEGIN
    INSERT INTO Resources (BaseID, AguaLitros, ComidaRaciones, Armas, Medicinas)
    VALUES (6, 300, 150, 15, 80);
    PRINT '✅ Insertados: Recursos Base 6';
END
ELSE IF NOT EXISTS (SELECT 1 FROM Bases WHERE BaseID = 6)
    PRINT '❌ ERROR: No se pueden insertar recursos - Base 6 no existe';
ELSE
    PRINT '⚠️  Ya existen: Recursos Base 6';

-- Recursos Base 7 (SOLO si la base existe)
IF EXISTS (SELECT 1 FROM Bases WHERE BaseID = 7) AND NOT EXISTS (SELECT 1 FROM Resources WHERE BaseID = 7)
BEGIN
    INSERT INTO Resources (BaseID, AguaLitros, ComidaRaciones, Armas, Medicinas)
    VALUES (7, 0, 0, 0, 0);
    PRINT '✅ Insertados: Recursos Base 7 (agotada)';
END
ELSE IF NOT EXISTS (SELECT 1 FROM Bases WHERE BaseID = 7)
    PRINT '❌ ERROR: No se pueden insertar recursos - Base 7 no existe';
ELSE
    PRINT '⚠️  Ya existen: Recursos Base 7';

-- ========================================
-- PASO 5: VERIFICACIÓN FINAL
-- ========================================

PRINT '';
PRINT 'PASO 5: Verificación final...';

SELECT 
    (SELECT COUNT(*) FROM Survivors) as Total_Supervivientes,
    (SELECT COUNT(*) FROM Bases) as Total_Bases,
    (SELECT COUNT(*) FROM Resources) as Total_Recursos;

PRINT '';
PRINT '✅ PROCESO COMPLETADO CON VERIFICACIONES';
PRINT '==========================================';

-- ========================================
-- PASO 6: PRUEBA DE ESCENARIOS JOIN
-- ========================================

PRINT 'Probando escenarios JOIN:';

-- INNER JOIN
SELECT COUNT(*) as INNER_JOIN_Count FROM Survivors s INNER JOIN Bases b ON s.BaseID = b.BaseID;

-- LEFT JOIN  
SELECT COUNT(*) as LEFT_JOIN_Count FROM Survivors s LEFT JOIN Bases b ON s.BaseID = b.BaseID;

-- Supervivientes huérfanos
SELECT COUNT(*) as Supervivientes_Huerfanos FROM Survivors WHERE BaseID IS NULL;

-- Bases vacías
SELECT COUNT(*) as Bases_Vacias FROM Bases b LEFT JOIN Survivors s ON b.BaseID = s.BaseID WHERE s.BaseID IS NULL;

PRINT 'Verificación de escenarios JOIN completada!';
