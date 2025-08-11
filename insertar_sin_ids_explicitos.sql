-- ========================================
-- SCRIPT ALTERNATIVO SIN IDs EXPLÍCITOS
-- Para casos donde las tablas tienen IDENTITY y no se puede cambiar
-- ========================================

USE AtapuercaNet;
GO

PRINT '==========================================';
PRINT 'INSERCIÓN ALTERNATIVA SIN IDs EXPLÍCITOS';
PRINT '==========================================';

-- ========================================
-- 1. INSERTAR BASES SIN ESPECIFICAR ID
-- ========================================

PRINT 'Insertando bases (IDs auto-generados)...';

-- Verificar si ya existe 'Puesto Avanzado Alpha'
IF NOT EXISTS (SELECT 1 FROM Bases WHERE Nombre = 'Puesto Avanzado Alpha')
BEGIN
    INSERT INTO Bases (Nombre, Ubicacion, TipoBase, Capacidad, Latitud, Longitud, EsComandoCentral)
    VALUES ('Puesto Avanzado Alpha', 'Tundra Ártica', 'Humana', 30, 71.006, -8.003, '0');
    PRINT '✅ Insertada: Puesto Avanzado Alpha';
END
ELSE
    PRINT '⚠️  Ya existe: Puesto Avanzado Alpha';

-- Verificar si ya existe 'Estación Fantasma'
IF NOT EXISTS (SELECT 1 FROM Bases WHERE Nombre = 'Estación Fantasma')
BEGIN
    INSERT INTO Bases (Nombre, Ubicacion, TipoBase, Capacidad, Latitud, Longitud, EsComandoCentral)
    VALUES ('Estación Fantasma', 'Valle Perdido', 'Humana', 25, 42.123, 12.456, '0');
    PRINT '✅ Insertada: Estación Fantasma';
END
ELSE
    PRINT '⚠️  Ya existe: Estación Fantasma';

-- Verificar si ya existe 'Centro Nexus'
IF NOT EXISTS (SELECT 1 FROM Bases WHERE Nombre = 'Centro Nexus')
BEGIN
    INSERT INTO Bases (Nombre, Ubicacion, TipoBase, Capacidad, Latitud, Longitud, EsComandoCentral)
    VALUES ('Centro Nexus', 'Plataforma Orbital', 'IA', NULL, NULL, NULL, '0');
    PRINT '✅ Insertada: Centro Nexus';
END
ELSE
    PRINT '⚠️  Ya existe: Centro Nexus';

-- ========================================
-- 2. OBTENER IDs DE LAS BASES RECIÉN CREADAS
-- ========================================

PRINT '';
PRINT 'Obteniendo IDs de las nuevas bases...';

DECLARE @BaseAlphaID INT, @BaseFantasmaID INT, @BaseNexusID INT;

SELECT @BaseAlphaID = BaseID FROM Bases WHERE Nombre = 'Puesto Avanzado Alpha';
SELECT @BaseFantasmaID = BaseID FROM Bases WHERE Nombre = 'Estación Fantasma';
SELECT @BaseNexusID = BaseID FROM Bases WHERE Nombre = 'Centro Nexus';

PRINT 'Base Alpha ID: ' + ISNULL(CAST(@BaseAlphaID AS VARCHAR), 'NO ENCONTRADA');
PRINT 'Base Fantasma ID: ' + ISNULL(CAST(@BaseFantasmaID AS VARCHAR), 'NO ENCONTRADA');
PRINT 'Base Nexus ID: ' + ISNULL(CAST(@BaseNexusID AS VARCHAR), 'NO ENCONTRADA');

-- ========================================
-- 3. INSERTAR SUPERVIVIENTES SIN IDs EXPLÍCITOS
-- ========================================

PRINT '';
PRINT 'Insertando supervivientes...';

-- Maya Chen (huérfana)
IF NOT EXISTS (SELECT 1 FROM Survivors WHERE Nombre = 'Maya Chen')
BEGIN
    INSERT INTO Survivors (Nombre, Edad, Rol, BaseID)
    VALUES ('Maya Chen', 22, 'Médica', NULL);
    PRINT '✅ Insertada: Maya Chen (huérfana)';
END
ELSE
    PRINT '⚠️  Ya existe: Maya Chen';

-- Diego Morales (huérfano)
IF NOT EXISTS (SELECT 1 FROM Survivors WHERE Nombre = 'Diego Morales')
BEGIN
    INSERT INTO Survivors (Nombre, Edad, Rol, BaseID)
    VALUES ('Diego Morales', 27, 'Scout', NULL);
    PRINT '✅ Insertado: Diego Morales (huérfano)';
END
ELSE
    PRINT '⚠️  Ya existe: Diego Morales';

-- Zara Al-Rashid (en Base Alpha si existe)
IF @BaseAlphaID IS NOT NULL AND NOT EXISTS (SELECT 1 FROM Survivors WHERE Nombre = 'Zara Al-Rashid')
BEGIN
    INSERT INTO Survivors (Nombre, Edad, Rol, BaseID)
    VALUES ('Zara Al-Rashid', 41, 'Comandante', @BaseAlphaID);
    PRINT '✅ Insertada: Zara Al-Rashid (Base Alpha ID: ' + CAST(@BaseAlphaID AS VARCHAR) + ')';
END
ELSE IF @BaseAlphaID IS NULL
    PRINT '❌ ERROR: No se puede insertar Zara - Base Alpha no existe';
ELSE
    PRINT '⚠️  Ya existe: Zara Al-Rashid';

-- ========================================
-- 4. INSERTAR RECURSOS USANDO IDs DINÁMICOS
-- ========================================

PRINT '';
PRINT 'Insertando recursos...';

-- Recursos para Base Alpha
IF @BaseAlphaID IS NOT NULL AND NOT EXISTS (SELECT 1 FROM Resources WHERE BaseID = @BaseAlphaID)
BEGIN
    INSERT INTO Resources (BaseID, AguaLitros, ComidaRaciones, Armas, Medicinas)
    VALUES (@BaseAlphaID, 300, 150, 15, 80);
    PRINT '✅ Insertados: Recursos Base Alpha (ID: ' + CAST(@BaseAlphaID AS VARCHAR) + ')';
END
ELSE IF @BaseAlphaID IS NULL
    PRINT '❌ ERROR: No se pueden insertar recursos - Base Alpha no existe';
ELSE
    PRINT '⚠️  Ya existen: Recursos Base Alpha';

-- Recursos para Base Fantasma (agotada)
IF @BaseFantasmaID IS NOT NULL AND NOT EXISTS (SELECT 1 FROM Resources WHERE BaseID = @BaseFantasmaID)
BEGIN
    INSERT INTO Resources (BaseID, AguaLitros, ComidaRaciones, Armas, Medicinas)
    VALUES (@BaseFantasmaID, 0, 0, 0, 0);
    PRINT '✅ Insertados: Recursos Base Fantasma (agotada) (ID: ' + CAST(@BaseFantasmaID AS VARCHAR) + ')';
END
ELSE IF @BaseFantasmaID IS NULL
    PRINT '❌ ERROR: No se pueden insertar recursos - Base Fantasma no existe';
ELSE
    PRINT '⚠️  Ya existen: Recursos Base Fantasma';

-- ========================================
-- 5. VERIFICACIÓN FINAL
-- ========================================

PRINT '';
PRINT '==========================================';
PRINT 'VERIFICACIÓN FINAL:';
PRINT '==========================================';

-- Mostrar todas las bases nuevas
PRINT 'Nuevas bases creadas:';
SELECT BaseID, Nombre, TipoBase, Capacidad
FROM Bases 
WHERE Nombre IN ('Puesto Avanzado Alpha', 'Estación Fantasma', 'Centro Nexus')
ORDER BY BaseID;

-- Mostrar supervivientes nuevos
PRINT '';
PRINT 'Nuevos supervivientes:';
SELECT SurvivorID, Nombre, Edad, Rol, BaseID
FROM Survivors 
WHERE Nombre IN ('Maya Chen', 'Diego Morales', 'Zara Al-Rashid')
ORDER BY SurvivorID;

-- Mostrar recursos nuevos
PRINT '';
PRINT 'Nuevos recursos:';
SELECT r.RecursosID, r.BaseID, b.Nombre as BaseName, 
       r.AguaLitros, r.ComidaRaciones, r.Armas, r.Medicinas
FROM Resources r
INNER JOIN Bases b ON r.BaseID = b.BaseID
WHERE b.Nombre IN ('Puesto Avanzado Alpha', 'Estación Fantasma')
ORDER BY r.BaseID;

-- Contar totales
SELECT 
    (SELECT COUNT(*) FROM Survivors) as Total_Supervivientes,
    (SELECT COUNT(*) FROM Bases) as Total_Bases,
    (SELECT COUNT(*) FROM Resources) as Total_Recursos;

PRINT '';
PRINT '✅ INSERCIÓN ALTERNATIVA COMPLETADA';
PRINT '==========================================';

-- ========================================
-- 6. PRUEBAS DE ESCENARIOS JOIN
-- ========================================

PRINT 'Probando escenarios JOIN con datos dinámicos:';

-- INNER JOIN
SELECT COUNT(*) as INNER_JOIN_Count FROM Survivors s INNER JOIN Bases b ON s.BaseID = b.BaseID;

-- LEFT JOIN
SELECT COUNT(*) as LEFT_JOIN_Count FROM Survivors s LEFT JOIN Bases b ON s.BaseID = b.BaseID;

-- Supervivientes huérfanos
SELECT COUNT(*) as Supervivientes_Huerfanos FROM Survivors WHERE BaseID IS NULL;

-- Bases vacías
SELECT COUNT(*) as Bases_Vacias FROM Bases b LEFT JOIN Survivors s ON b.BaseID = s.BaseID WHERE s.BaseID IS NULL;

PRINT 'Pruebas de JOIN completadas!';
