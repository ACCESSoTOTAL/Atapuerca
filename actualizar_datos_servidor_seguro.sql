-- ========================================
-- SCRIPT SEGURO DE ACTUALIZACIÓN (UPSERT)
-- Proyecto Atapuerca - Insertar solo si no existe
-- ========================================

USE AtapuercaNet; -- Cambia por el nombre de tu base de datos
GO

-- Este script verifica la existencia antes de insertar
-- Evita errores de duplicados y es más seguro

-- ========================================
-- 1. SURVIVORS - INSERTAR SOLO SI NO EXISTE
-- ========================================

-- Habilitar inserción de IDs explícitos en tabla Survivors (si tiene IDENTITY)
SET IDENTITY_INSERT Survivors ON;

-- Maya Chen (ID 8)
IF NOT EXISTS (SELECT 1 FROM Survivors WHERE SurvivorID = 8)
BEGIN
    INSERT INTO Survivors (SurvivorID, Nombre, Edad, Rol, BaseID)
    VALUES (8, 'Maya Chen', 22, 'Médica', NULL);
    PRINT 'Insertado: Maya Chen (ID 8)';
END
ELSE
    PRINT 'Ya existe: Superviviente ID 8';

-- Diego Morales (ID 9)
IF NOT EXISTS (SELECT 1 FROM Survivors WHERE SurvivorID = 9)
BEGIN
    INSERT INTO Survivors (SurvivorID, Nombre, Edad, Rol, BaseID)
    VALUES (9, 'Diego Morales', 27, 'Scout', NULL);
    PRINT 'Insertado: Diego Morales (ID 9)';
END
ELSE
    PRINT 'Ya existe: Superviviente ID 9';

-- Zara Al-Rashid (ID 10) - SOLO si Base 6 existe
IF EXISTS (SELECT 1 FROM Bases WHERE BaseID = 6) AND NOT EXISTS (SELECT 1 FROM Survivors WHERE SurvivorID = 10)
BEGIN
    INSERT INTO Survivors (SurvivorID, Nombre, Edad, Rol, BaseID)
    VALUES (10, 'Zara Al-Rashid', 41, 'Comandante', 6);
    PRINT 'Insertado: Zara Al-Rashid (ID 10)';
END
ELSE IF NOT EXISTS (SELECT 1 FROM Bases WHERE BaseID = 6)
    PRINT 'PENDIENTE: Zara Al-Rashid (esperando Base 6)';
ELSE
    PRINT 'Ya existe: Superviviente ID 10';

-- Deshabilitar inserción de IDs explícitos
SET IDENTITY_INSERT Survivors OFF;

-- ========================================
-- 2. BASES - INSERTAR SOLO SI NO EXISTE
-- ========================================

-- Habilitar inserción de IDs explícitos en tabla Bases (si tiene IDENTITY)
SET IDENTITY_INSERT Bases ON;

-- Puesto Avanzado Alpha (ID 6)
IF NOT EXISTS (SELECT 1 FROM Bases WHERE BaseID = 6)
BEGIN
    INSERT INTO Bases (BaseID, Nombre, Ubicacion, TipoBase, Capacidad, Latitud, Longitud, EsComandoCentral)
    VALUES (6, 'Puesto Avanzado Alpha', 'Tundra Ártica', 'Humana', 30, 71.006, -8.003, '0');
    PRINT 'Insertada: Puesto Avanzado Alpha (ID 6)';
END
ELSE
    PRINT 'Ya existe: Base ID 6';

-- Estación Fantasma (ID 7)
IF NOT EXISTS (SELECT 1 FROM Bases WHERE BaseID = 7)
BEGIN
    INSERT INTO Bases (BaseID, Nombre, Ubicacion, TipoBase, Capacidad, Latitud, Longitud, EsComandoCentral)
    VALUES (7, 'Estación Fantasma', 'Valle Perdido', 'Humana', 25, 42.123, 12.456, '0');
    PRINT 'Insertada: Estación Fantasma (ID 7)';
END
ELSE
    PRINT 'Ya existe: Base ID 7';

-- Centro Nexus (ID 8)
IF NOT EXISTS (SELECT 1 FROM Bases WHERE BaseID = 8)
BEGIN
    INSERT INTO Bases (BaseID, Nombre, Ubicacion, TipoBase, Capacidad, Latitud, Longitud, EsComandoCentral)
    VALUES (8, 'Centro Nexus', 'Plataforma Orbital', 'IA', NULL, NULL, NULL, '0');
    PRINT 'Insertada: Centro Nexus (ID 8)';
END
ELSE
    PRINT 'Ya existe: Base ID 8';

-- Deshabilitar inserción de IDs explícitos
SET IDENTITY_INSERT Bases OFF;

-- ========================================
-- 3. RESOURCES - INSERTAR SOLO SI NO EXISTE
-- ========================================

-- Recursos Base 6 - Verificar que la base existe ANTES de insertar recursos
IF EXISTS (SELECT 1 FROM Bases WHERE BaseID = 6) AND NOT EXISTS (SELECT 1 FROM Resources WHERE BaseID = 6)
BEGIN
    INSERT INTO Resources (BaseID, AguaLitros, ComidaRaciones, Armas, Medicinas)
    VALUES (6, 300, 150, 15, 80);
    PRINT 'Insertados: Recursos para Base 6 (Puesto Avanzado Alpha)';
END
ELSE IF NOT EXISTS (SELECT 1 FROM Bases WHERE BaseID = 6)
    PRINT 'ERROR: Base 6 no existe - no se pueden insertar recursos';
ELSE
    PRINT 'Ya existen: Recursos para Base 6';

-- Recursos Base 7 - Base agotada (verificar que la base existe)
IF EXISTS (SELECT 1 FROM Bases WHERE BaseID = 7) AND NOT EXISTS (SELECT 1 FROM Resources WHERE BaseID = 7)
BEGIN
    INSERT INTO Resources (BaseID, AguaLitros, ComidaRaciones, Armas, Medicinas)
    VALUES (7, 0, 0, 0, 0);
    PRINT 'Insertados: Recursos para Base 7 (Estación Fantasma) - Base agotada';
END
ELSE IF NOT EXISTS (SELECT 1 FROM Bases WHERE BaseID = 7)
    PRINT 'ERROR: Base 7 no existe - no se pueden insertar recursos';
ELSE
    PRINT 'Ya existen: Recursos para Base 7';

-- ========================================
-- 4. VERIFICACIÓN FINAL
-- ========================================

PRINT '==========================================';
PRINT 'RESUMEN DE ACTUALIZACIÓN:';
PRINT '==========================================';

SELECT 
    (SELECT COUNT(*) FROM Survivors) as Total_Supervivientes,
    (SELECT COUNT(*) FROM Bases) as Total_Bases,
    (SELECT COUNT(*) FROM Resources) as Total_Recursos;

PRINT 'Escenarios JOIN creados:';
PRINT '- Supervivientes huérfanos: Maya Chen, Diego Morales';
PRINT '- Bases vacías: Estación Fantasma, Centro Nexus'; 
PRINT '- Base agotada: Estación Fantasma (recursos = 0)';
PRINT '- Parejas misma edad: Elena+Viktor(34), Li+Diego(27), Marcus+Zara(41)';

PRINT '==========================================';
PRINT 'Actualización segura completada!';
PRINT '==========================================';
