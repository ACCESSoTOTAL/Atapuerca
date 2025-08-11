-- =====================================================
-- PROPUESTA DE EXPANSIÓN DE DATOS Y RETOS
-- =====================================================

-- =====================================================
-- 1. DATOS ADICIONALES PROPUESTOS
-- =====================================================

-- Más robots con especialidades diversas
INSERT INTO Robots (Modelo, Generacion, Funciones, NivelAmenaza) VALUES
('Centinela-MK4', 5, 'Vigilancia perimetral y defensa automatizada', 8),
('Recolector-A9', 1, 'Búsqueda y extracción de recursos', 3),
('Sanador-X12', 6, 'Asistencia médica y evacuación', 2),
('Destructor-Titan', 4, 'Demolición de estructuras', 10),
('Espía-Ghost', 3, 'Infiltración y sabotaje sigiloso', 7),
('Constructor-Prime', 2, 'Construcción y reparación automatizada', 4),
('Hackear-Void', 5, 'Guerra cibernética y anulación de sistemas', 9);

-- Más avistamientos con patrones temporales
INSERT INTO RobotSightings (Fecha, Coordenadas, TipoRobot, NivelAmenaza, BaseID) VALUES
('2025-07-08', '42.1234, -3.5678', 'Centinela-MK4', 8, 1),
('2025-07-09', '41.9876, -3.2345', 'Recolector-A9', 3, 2),
('2025-07-10', '42.5432, -3.7890', 'Destructor-Titan', 10, 3),
('2025-07-11', '41.6789, -3.1234', 'Espía-Ghost', 7, 1),
('2025-07-12', '42.3456, -3.6789', 'Hackear-Void', 9, 5);

-- Más misiones con diferentes estados y tipos
INSERT INTO Missions (Nombre, OrigenID, DestinoID, FechaInicio, FechaFin, Objetivo, Estado) VALUES
('Operación Fénix Rojo', 3, 4, '2025-07-08', NULL, 'Rescate de supervivientes aislados', 'En curso'),
('Misión Cyber-Shield', 1, 5, '2025-07-07', '2025-07-09', 'Instalación de sistemas anti-hackeo', 'Completada'),
('Convoy Médico Delta', 2, 3, '2025-07-10', NULL, 'Transporte de heridos críticos', 'En curso'),
('Operación Silencio', 5, 1, '2025-07-06', '2025-07-07', 'Eliminación de robots espía', 'Fallida'),
('Proyecto Reconstrucción', 1, 6, '2025-07-09', NULL, 'Reparación de infraestructura crítica', 'Planificada');

-- Más suministros especializados
INSERT INTO Supplies (BaseID, Tipo, Cantidad, FechaEntrega) VALUES
(1, 'Tecnología Anti-Robot', 5, '2025-07-08'),
(2, 'Medicinas de Emergencia', 100, '2025-07-09'),
(3, 'Equipamiento de Comunicaciones', 10, '2025-07-10'),
(5, 'Dispositivos de Camuflaje', 8, '2025-07-11'),
(1, 'Generadores de Energía', 3, '2025-07-12');

-- Más alianzas con diferentes niveles de confianza
INSERT INTO Alliances (BaseID1, BaseID2, FechaInicio, NivelConfianza) VALUES
(3, 4, '2025-07-08', 9),
(4, 5, '2025-07-09', 5),
(1, 3, '2025-07-10', 8);

-- =====================================================
-- 2. RETOS NUEVOS PROPUESTOS USANDO TODAS LAS TABLAS
-- =====================================================

-- RETO 61: Análisis de Eficiencia de Misiones por Alianza
-- Dificultad: Avanzado | Tablas: 3 | Puntos: 25
SELECT 
    CASE 
        WHEN EXISTS (
            SELECT 1 FROM Alliances al 
            WHERE (al.BaseID1 = m.OrigenID AND al.BaseID2 = m.DestinoID)
               OR (al.BaseID1 = m.DestinoID AND al.BaseID2 = m.OrigenID)
        ) THEN 'Misión entre Aliados'
        ELSE 'Misión Independiente'
    END AS TipoCooperacion,
    COUNT(*) AS TotalMisiones,
    SUM(CASE WHEN Estado = 'Completada' THEN 1 ELSE 0 END) AS MisionesExitosas,
    ROUND(
        SUM(CASE WHEN Estado = 'Completada' THEN 1 ELSE 0 END) * 100.0 / COUNT(*), 
        2
    ) AS PorcentajeExito
FROM Missions m
GROUP BY 
    CASE 
        WHEN EXISTS (
            SELECT 1 FROM Alliances al 
            WHERE (al.BaseID1 = m.OrigenID AND al.BaseID2 = m.DestinoID)
               OR (al.BaseID1 = m.DestinoID AND al.BaseID2 = m.OrigenID)
        ) THEN 'Misión entre Aliados'
        ELSE 'Misión Independiente'
    END;

-- RETO 62: Correlación Temporal Avistamientos-Ataques
-- Dificultad: Experto | Tablas: 4 | Puntos: 30
WITH AvistamientosConAmenaza AS (
    SELECT 
        rs.BaseID,
        rs.Fecha AS FechaAvistamiento,
        rs.TipoRobot,
        rs.NivelAmenaza,
        b.Nombre AS Base
    FROM RobotSightings rs
    JOIN Bases b ON rs.BaseID = b.BaseID
    WHERE rs.NivelAmenaza >= 7
),
AtaquesPosteroires AS (
    SELECT 
        a.BaseID,
        a.Fecha AS FechaAtaque,
        a.TipoRobot,
        a.Muertos
    FROM Attacks a
)
SELECT 
    av.Base,
    av.FechaAvistamiento,
    av.TipoRobot AS RobotAvistado,
    av.NivelAmenaza,
    at.FechaAtaque,
    at.TipoRobot AS RobotAtacante,
    at.Muertos,
    DATEDIFF(day, av.FechaAvistamiento, at.FechaAtaque) AS DiasDeWarning,
    CASE 
        WHEN DATEDIFF(day, av.FechaAvistamiento, at.FechaAtaque) BETWEEN 0 AND 3 
        THEN '🔴 Ataque Inmediato'
        WHEN DATEDIFF(day, av.FechaAvistamiento, at.FechaAtaque) BETWEEN 4 AND 7 
        THEN '🟡 Ataque Próximo'
        ELSE '🟢 Sin Correlación Directa'
    END AS PatronTemporal
FROM AvistamientosConAmenaza av
JOIN AtaquesPosteroires at ON av.BaseID = at.BaseID
WHERE at.FechaAtaque >= av.FechaAvistamiento
    AND DATEDIFF(day, av.FechaAvistamiento, at.FechaAtaque) <= 10
ORDER BY DiasDeWarning, av.NivelAmenaza DESC;

-- RETO 63: Red de Suministros y Logística Inteligente
-- Dificultad: Experto | Tablas: 5 | Puntos: 35
WITH NecesidadRecursos AS (
    SELECT 
        b.BaseID,
        b.Nombre AS Base,
        COUNT(s.SurvivorID) AS Personal,
        COALESCE(r.ComidaRaciones, 0) AS ComidaActual,
        COALESCE(r.AguaLitros, 0) AS AguaActual,
        COALESCE(r.Medicinas, 0) AS MedicinasActuales,
        -- Calcular necesidades basadas en personal
        COUNT(s.SurvivorID) * 100 AS ComidaNecesaria,
        COUNT(s.SurvivorID) * 150 AS AguaNecesaria,
        COUNT(s.SurvivorID) * 20 AS MedicinasNecesarias
    FROM Bases b
    LEFT JOIN Survivors s ON b.BaseID = s.BaseID
    LEFT JOIN Resources r ON b.BaseID = r.BaseID
    GROUP BY b.BaseID, b.Nombre, r.ComidaRaciones, r.AguaLitros, r.Medicinas
),
SuministrosRecientes AS (
    SELECT 
        su.BaseID,
        su.Tipo,
        SUM(su.Cantidad) AS CantidadEntregada,
        MAX(su.FechaEntrega) AS UltimaEntrega
    FROM Supplies su
    WHERE su.FechaEntrega >= '2025-07-01'
    GROUP BY su.BaseID, su.Tipo
)
SELECT 
    nr.Base,
    nr.Personal,
    nr.ComidaActual,
    nr.ComidaNecesaria,
    (nr.ComidaActual - nr.ComidaNecesaria) AS DeficitComida,
    nr.MedicinasActuales,
    nr.MedicinasNecesarias,
    (nr.MedicinasActuales - nr.MedicinasNecesarias) AS DeficitMedicinas,
    COALESCE(src.CantidadEntregada, 0) AS SuministrosRecibidos,
    src.UltimaEntrega,
    CASE 
        WHEN (nr.ComidaActual - nr.ComidaNecesaria) < -50 
          OR (nr.MedicinasActuales - nr.MedicinasNecesarias) < -10
        THEN '🔴 CRISIS - Necesita suministros urgentes'
        WHEN (nr.ComidaActual - nr.ComidaNecesaria) < 0 
          OR (nr.MedicinasActuales - nr.MedicinasNecesarias) < 0
        THEN '🟡 RIESGO - Suministros insuficientes'
        ELSE '🟢 ESTABLE - Suministros adecuados'
    END AS EstadoLogistico
FROM NecesidadRecursos nr
LEFT JOIN SuministrosRecientes src ON nr.BaseID = src.BaseID
ORDER BY DeficitComida, DeficitMedicinas;

-- RETO 64: Matriz de Poder y Influencia (Todas las 10 tablas)
-- Dificultad: Maestro | Tablas: 10 | Puntos: 50
WITH PoderMilitar AS (
    SELECT 
        b.BaseID,
        b.Nombre AS Base,
        COUNT(DISTINCT s.SurvivorID) AS Personal,
        COUNT(CASE WHEN s.Rol = 'Comandante' THEN 1 END) AS Comandantes,
        COALESCE(r.Armas, 0) AS Armamento,
        COUNT(DISTINCT su.SupplyID) AS SuministrosRecibidos
    FROM Bases b
    LEFT JOIN Survivors s ON b.BaseID = s.BaseID
    LEFT JOIN Resources r ON b.BaseID = r.BaseID
    LEFT JOIN Supplies su ON b.BaseID = su.BaseID
    GROUP BY b.BaseID, b.Nombre, r.Armas
),
InfluenciaEstrategica AS (
    SELECT 
        b.BaseID,
        COUNT(DISTINCT al.AllianceID) AS AlianzasActivas,
        COUNT(DISTINCT m.MissionID) AS MisionesLideradas,
        AVG(CAST(al.NivelConfianza AS FLOAT)) AS ConfianzaPromedio
    FROM Bases b
    LEFT JOIN Alliances al ON b.BaseID = al.BaseID1 OR b.BaseID = al.BaseID2
    LEFT JOIN Missions m ON b.BaseID = m.OrigenID
    GROUP BY b.BaseID
),
VulnerabilidadOperacional AS (
    SELECT 
        b.BaseID,
        COUNT(DISTINCT a.AttackID) AS AtaquesRecibidos,
        COUNT(DISTINCT rs.SightingID) AS AvistamientosRobots,
        MAX(a.Muertos) AS MaxBajasEnAtaque,
        AVG(CAST(dm.Kilometros AS FLOAT)) AS DistanciaPromedioAOtrasBases
    FROM Bases b
    LEFT JOIN Attacks a ON b.BaseID = a.BaseID
    LEFT JOIN RobotSightings rs ON b.BaseID = rs.BaseID
    LEFT JOIN DistanceMatrix dm ON b.BaseID = dm.IDOrigen
    GROUP BY b.BaseID
)
SELECT 
    pm.Base,
    pm.Personal,
    pm.Comandantes,
    pm.Armamento,
    ie.AlianzasActivas,
    ie.MisionesLideradas,
    COALESCE(ie.ConfianzaPromedio, 0) AS ConfianzaPromedio,
    vo.AtaquesRecibidos,
    vo.AvistamientosRobots,
    COALESCE(vo.MaxBajasEnAtaque, 0) AS MaxBajas,
    ROUND(COALESCE(vo.DistanciaPromedioAOtrasBases, 0), 2) AS DistanciaPromedio,
    -- ÍNDICE DE PODER INTEGRAL (0-1000)
    ROUND(
        (pm.Personal * 30) +
        (pm.Comandantes * 50) +
        (pm.Armamento / 2.0) +
        (ie.AlianzasActivas * 40) +
        (ie.MisionesLideradas * 25) +
        (COALESCE(ie.ConfianzaPromedio, 0) * 10) +
        (pm.SuministrosRecibidos * 15) -
        (vo.AtaquesRecibidos * 20) -
        (vo.AvistamientosRobots * 10) -
        (COALESCE(vo.MaxBajasEnAtaque, 0) * 30)
    , 2) AS IndicePoder,
    CASE 
        WHEN (
            (pm.Personal * 30) +
            (pm.Comandantes * 50) +
            (pm.Armamento / 2.0) +
            (ie.AlianzasActivas * 40) +
            (ie.MisionesLideradas * 25) +
            (COALESCE(ie.ConfianzaPromedio, 0) * 10) +
            (pm.SuministrosRecibidos * 15) -
            (vo.AtaquesRecibidos * 20) -
            (vo.AvistamientosRobots * 10) -
            (COALESCE(vo.MaxBajasEnAtaque, 0) * 30)
        ) >= 800 THEN '👑 POTENCIA HEGEMÓNICA'
        WHEN (
            (pm.Personal * 30) +
            (pm.Comandantes * 50) +
            (pm.Armamento / 2.0) +
            (ie.AlianzasActivas * 40) +
            (ie.MisionesLideradas * 25) +
            (COALESCE(ie.ConfianzaPromedio, 0) * 10) +
            (pm.SuministrosRecibidos * 15) -
            (vo.AtaquesRecibidos * 20) -
            (vo.AvistamientosRobots * 10) -
            (COALESCE(vo.MaxBajasEnAtaque, 0) * 30)
        ) >= 500 THEN '🏆 POTENCIA REGIONAL'
        WHEN (
            (pm.Personal * 30) +
            (pm.Comandantes * 50) +
            (pm.Armamento / 2.0) +
            (ie.AlianzasActivas * 40) +
            (ie.MisionesLideradas * 25) +
            (COALESCE(ie.ConfianzaPromedio, 0) * 10) +
            (pm.SuministrosRecibidos * 15) -
            (vo.AtaquesRecibidos * 20) -
            (vo.AvistamientosRobots * 10) -
            (COALESCE(vo.MaxBajasEnAtaque, 0) * 30)
        ) >= 200 THEN '🛡️ ACTOR RELEVANTE'
        WHEN (
            (pm.Personal * 30) +
            (pm.Comandantes * 50) +
            (pm.Armamento / 2.0) +
            (ie.AlianzasActivas * 40) +
            (ie.MisionesLideradas * 25) +
            (COALESCE(ie.ConfianzaPromedio, 0) * 10) +
            (pm.SuministrosRecibidos * 15) -
            (vo.AtaquesRecibidos * 20) -
            (vo.AvistamientosRobots * 10) -
            (COALESCE(vo.MaxBajasEnAtaque, 0) * 30)
        ) >= 50 THEN '⚠️ ACTOR MENOR'
        ELSE '💀 BASE IRRELEVANTE'
    END AS ClasificacionPoder
FROM PoderMilitar pm
JOIN InfluenciaEstrategica ie ON pm.BaseID = ie.BaseID
JOIN VulnerabilidadOperacional vo ON pm.BaseID = vo.BaseID
ORDER BY IndicePoder DESC;

-- =====================================================
-- 3. BENEFICIOS EDUCATIVOS DE LA EXPANSIÓN
-- =====================================================

/*
CONCEPTOS SQL AVANZADOS QUE SE ENSEÑARÍAN:

1. JOINs Complejos: 5-10 tablas simultáneas
2. CTEs Anidados: Múltiples niveles de abstracción
3. Funciones de Ventana: Rankings y análisis temporal
4. Subconsultas Correlacionadas: EXISTS, NOT EXISTS
5. Análisis Temporal: DATEDIFF, rangos de fechas
6. Agregaciones Complejas: STRING_AGG, múltiples COUNT
7. Expresiones CASE Complejas: Lógica condicional avanzada
8. Métricas Calculadas: Índices compuestos
9. Análisis de Correlación: Patrones entre eventos
10. Optimización: Consultas eficientes con múltiples tablas

PROGRESIÓN PEDAGÓGICA:
- Fase 1: SELECT básico (1 tabla)
- Fase 2: JOINs simples (2-3 tablas)  
- Fase 3: Agregaciones y subconsultas (3-5 tablas)
- Fase 4: CTEs y análisis (5-7 tablas)
- Fase 5: Consultas maestro (8-10 tablas)

SISTEMA DE PUNTUACIÓN EXPANDIDO:
- Consultas 1 tabla: 5-10 puntos
- JOINs 2-3 tablas: 15-25 puntos
- Análisis 4-6 tablas: 30-40 puntos
- CTEs complejos 7-8 tablas: 45-60 puntos
- Consultas maestro 9-10 tablas: 70-100 puntos
*/
