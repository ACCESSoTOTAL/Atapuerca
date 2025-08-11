-- ========================================
-- SCRIPT DE CORRECCIÓN POST-ERROR
-- Eliminar recursos duplicados y reinsertar correctamente
-- ========================================

-- IMPORTANTE: Cambia 'AtapuercaDB' por el nombre real de tu base de datos
USE [TU_BASE_DE_DATOS_AQUI]; 
GO

-- ========================================
-- 1. LIMPIAR RECURSOS PROBLEMÁTICOS
-- ========================================

-- Eliminar recursos de las bases 6 y 7 si existen duplicados o errores
DELETE FROM Resources WHERE BaseID IN (6, 7);
PRINT 'Limpieza de recursos completada';

-- ========================================
-- 2. INSERTAR RECURSOS CORRECTAMENTE
-- ========================================

-- Recursos para Base 6 (Puesto Avanzado Alpha)
IF EXISTS (SELECT 1 FROM Bases WHERE BaseID = 6)
BEGIN
    INSERT INTO Resources (BaseID, AguaLitros, ComidaRaciones, Armas, Medicinas)
    VALUES (6, 300, 150, 15, 80);
    PRINT 'Insertados recursos para Base 6 (Puesto Avanzado Alpha)';
END
ELSE
    PRINT 'Base 6 no existe - necesitas ejecutar primero la creación de bases';

-- Recursos para Base 7 (Estación Fantasma) - Base agotada
IF EXISTS (SELECT 1 FROM Bases WHERE BaseID = 7)
BEGIN
    INSERT INTO Resources (BaseID, AguaLitros, ComidaRaciones, Armas, Medicinas)
    VALUES (7, 0, 0, 0, 0);
    PRINT 'Insertados recursos para Base 7 (Estación Fantasma) - Base agotada';
END
ELSE
    PRINT 'Base 7 no existe - necesitas ejecutar primero la creación de bases';

-- ========================================
-- 3. VERIFICACIÓN FINAL
-- ========================================

PRINT '';
PRINT 'Verificando estado final de recursos:';
SELECT RecursosID, BaseID, AguaLitros, ComidaRaciones, Armas, Medicinas
FROM Resources 
WHERE BaseID IN (6, 7)
ORDER BY BaseID;

-- ========================================
-- 4. VERIFICAR ESCENARIOS JOIN
-- ========================================

PRINT '';
PRINT 'Verificando escenarios JOIN con recursos:';

-- JOIN entre Bases y Resources
SELECT b.BaseID, b.Nombre, 
       ISNULL(r.AguaLitros, 0) as Agua,
       ISNULL(r.ComidaRaciones, 0) as Comida
FROM Bases b
LEFT JOIN Resources r ON b.BaseID = r.BaseID
WHERE b.BaseID IN (6, 7, 8)
ORDER BY b.BaseID;

PRINT 'Corrección completada!';
