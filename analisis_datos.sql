-- 📊 ANÁLISIS DE VIABILIDAD DE RETOS SQL
-- Verificar que todos los filtros y condiciones de los retos son realistas

-- ===== DATOS ACTUALES EN LA BASE =====

-- Datos de Bases actuales
SELECT 'DATOS ACTUALES - Tabla Bases:' AS Seccion;
SELECT BaseID, Nombre, Tipo, Latitud, Longitud FROM Bases ORDER BY BaseID;

-- Datos de Supervivientes actuales  
SELECT 'DATOS ACTUALES - Tabla Supervivientes:' AS Seccion;
SELECT SupervivienteID, Nombre, Edad, Profesion, BaseID FROM Supervivientes ORDER BY SupervivienteID;

-- Datos de Recursos actuales
SELECT 'DATOS ACTUALES - Tabla Recursos:' AS Seccion;
SELECT RecursoID, BaseID, ComidaRaciones, AguaLitros, Armas FROM Recursos ORDER BY BaseID;

-- ===== ANÁLISIS DE FILTROS CRÍTICOS =====

-- RETO 7: Veteranos > 30 años - ¿Es viable?
SELECT 'ANÁLISIS RETO 7:' AS Analisis;
SELECT 
    COUNT(*) AS TotalSupervivientes,
    COUNT(CASE WHEN Edad > 30 THEN 1 END) AS MayoresDe30,
    COUNT(CASE WHEN Edad > 40 THEN 1 END) AS MayoresDe40,
    ROUND(AVG(CAST(Edad AS FLOAT)), 1) AS EdadPromedio
FROM Supervivientes;

-- RETO 8: Recursos > 40 raciones - ¿Es viable?
SELECT 'ANÁLISIS RETO 8:' AS Analisis;
SELECT 
    COUNT(*) AS TotalBases,
    COUNT(CASE WHEN ComidaRaciones > 40 THEN 1 END) AS BasesCon40Plus,
    COUNT(CASE WHEN ComidaRaciones > 50 THEN 1 END) AS BasesCon50Plus,
    COUNT(CASE WHEN ComidaRaciones > 30 THEN 1 END) AS BasesCon30Plus,
    ROUND(AVG(CAST(ComidaRaciones AS FLOAT)), 1) AS PromedioComida
FROM Recursos;

-- RETO 9: Médicos disponibles - ¿Existen?
SELECT 'ANÁLISIS RETO 9:' AS Analisis;
SELECT 
    COUNT(*) AS TotalSupervivientes,
    COUNT(CASE WHEN Profesion = 'Médico' THEN 1 END) AS Medicos,
    COUNT(CASE WHEN Profesion = 'Ingeniero' THEN 1 END) AS Ingenieros,
    COUNT(CASE WHEN Profesion = 'Soldado' THEN 1 END) AS Soldados,
    COUNT(CASE WHEN Profesion = 'Científico' THEN 1 END) AS Cientificos
FROM Supervivientes;

-- RETO 3: Bases Humanas - ¿Existen?
SELECT 'ANÁLISIS RETO 3:' AS Analisis;
SELECT 
    COUNT(*) AS TotalBases,
    COUNT(CASE WHEN Tipo = 'Humana' THEN 1 END) AS BasesHumanas,
    COUNT(CASE WHEN Tipo = 'Militar' THEN 1 END) AS BasesMilitares,
    COUNT(CASE WHEN Tipo = 'Científica' THEN 1 END) AS BasesCientificas
FROM Bases;

-- ===== SUGERENCIAS DE AJUSTE =====
-- Si algún filtro no devuelve resultados, mostrar alternativas

-- Alternativas para RETO 7 (edad)
SELECT 'SUGERENCIAS RETO 7 (Edad):' AS Sugerencias;
SELECT 
    'Edad > 25' AS Filtro, COUNT(*) AS Resultados FROM Supervivientes WHERE Edad > 25
UNION ALL
SELECT 
    'Edad > 30' AS Filtro, COUNT(*) AS Resultados FROM Supervivientes WHERE Edad > 30
UNION ALL
SELECT 
    'Edad > 35' AS Filtro, COUNT(*) AS Resultados FROM Supervivientes WHERE Edad > 35
UNION ALL
SELECT 
    'Edad > 40' AS Filtro, COUNT(*) AS Resultados FROM Supervivientes WHERE Edad > 40;

-- Alternativas para RETO 8 (comida)
SELECT 'SUGERENCIAS RETO 8 (Comida):' AS Sugerencias;
SELECT 
    'ComidaRaciones > 20' AS Filtro, COUNT(*) AS Resultados FROM Recursos WHERE ComidaRaciones > 20
UNION ALL
SELECT 
    'ComidaRaciones > 30' AS Filtro, COUNT(*) AS Resultados FROM Recursos WHERE ComidaRaciones > 30
UNION ALL
SELECT 
    'ComidaRaciones > 40' AS Filtro, COUNT(*) AS Resultados FROM Recursos WHERE ComidaRaciones > 40
UNION ALL
SELECT 
    'ComidaRaciones > 50' AS Filtro, COUNT(*) AS Resultados FROM Recursos WHERE ComidaRaciones > 50
UNION ALL
SELECT 
    'ComidaRaciones > 60' AS Filtro, COUNT(*) AS Resultados FROM Recursos WHERE ComidaRaciones > 60;
