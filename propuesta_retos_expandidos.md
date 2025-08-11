# 🚀 PROPUESTA: RETOS EXPANDIDOS CON TODAS LAS TABLAS

## 📊 ANÁLISIS ACTUAL
- **Tablas disponibles**: 10
- **Tablas usadas en retos**: 3 (Bases, Survivors, Resources)
- **Tablas subutilizadas**: 7 (Alliances, Attacks, DistanceMatrix, Missions, Robots, RobotSightings, Supplies)
- **Potencial perdido**: 70% del sistema no se usa en educación

## 🎯 RETOS NUEVOS PROPUESTOS

### **FASE 2 EXPANDIDA - Retos con Robots y Ataques**

**Reto 21B: 🤖 Análisis de amenaza robótica**
```sql
-- Clasificar robots por nivel de peligro y funciones
SELECT 
    r.Modelo,
    r.Generacion,
    r.NivelAmenaza,
    r.Funciones,
    CASE 
        WHEN r.NivelAmenaza >= 9 THEN '🔴 CRÍTICO'
        WHEN r.NivelAmenaza >= 7 THEN '🟠 ALTO'
        WHEN r.NivelAmenaza >= 5 THEN '🟡 MEDIO'
        ELSE '🟢 BAJO'
    END AS ClasificacionRiesgo
FROM Robots r
ORDER BY r.NivelAmenaza DESC;
```

**Reto 22B: 💥 Historial de ataques por base**
```sql
-- Analizar qué bases han sufrido más ataques
SELECT 
    b.Nombre AS Base,
    COUNT(a.AttackID) AS TotalAtaques,
    SUM(a.Muertos) AS TotalMuertos,
    MAX(a.Fecha) AS UltimoAtaque,
    STRING_AGG(a.TipoRobot, ', ') AS RobotsAgresores
FROM Bases b
LEFT JOIN Attacks a ON b.BaseID = a.BaseID
GROUP BY b.BaseID, b.Nombre
ORDER BY TotalAtaques DESC, TotalMuertos DESC;
```

**Reto 23B: 👁️ Correlación ataques vs avistamientos**
```sql
-- Relacionar avistamientos con ataques posteriores
SELECT 
    rs.Fecha AS FechaAvistamiento,
    rs.TipoRobot,
    rs.NivelAmenaza,
    b.Nombre AS BaseAfectada,
    a.Fecha AS FechaAtaque,
    DATEDIFF(day, rs.Fecha, a.Fecha) AS DiasEntreAvistamientoYAtaque
FROM RobotSightings rs
JOIN Bases b ON rs.BaseID = b.BaseID
LEFT JOIN Attacks a ON b.BaseID = a.BaseID 
    AND a.TipoRobot = rs.TipoRobot
    AND a.Fecha > rs.Fecha
WHERE DATEDIFF(day, rs.Fecha, a.Fecha) <= 7
ORDER BY DiasEntreAvistamientoYAtaque;
```

### **FASE 3 EXPANDIDA - Retos con Misiones y Alianzas**

**Reto 31B: 🎯 Éxito de misiones por alianza**
```sql
-- Evaluar si las alianzas mejoran el éxito de misiones
WITH MisionesConAlianza AS (
    SELECT 
        m.*,
        CASE 
            WHEN EXISTS (
                SELECT 1 FROM Alliances al 
                WHERE (al.BaseID1 = m.OrigenID AND al.BaseID2 = m.DestinoID)
                   OR (al.BaseID1 = m.DestinoID AND al.BaseID2 = m.OrigenID)
            ) THEN 'Con Alianza'
            ELSE 'Sin Alianza'
        END AS TipoMision
    FROM Missions m
)
SELECT 
    TipoMision,
    COUNT(*) AS TotalMisiones,
    SUM(CASE WHEN Estado = 'Completada' THEN 1 ELSE 0 END) AS MisionesExitosas,
    ROUND(
        SUM(CASE WHEN Estado = 'Completada' THEN 1 ELSE 0 END) * 100.0 / COUNT(*), 
        2
    ) AS PorcentajeExito
FROM MisionesConAlianza
GROUP BY TipoMision;
```

**Reto 32B: 🗺️ Rutas óptimas con matriz de distancias**
```sql
-- Encontrar rutas más eficientes usando DistanceMatrix
SELECT 
    bo.Nombre AS Origen,
    bd.Nombre AS Destino,
    dm.Kilometros,
    CASE 
        WHEN dm.Kilometros <= 50 THEN '🟢 Corta'
        WHEN dm.Kilometros <= 100 THEN '🟡 Media'
        ELSE '🔴 Larga'
    END AS TipoRuta,
    CASE 
        WHEN EXISTS (
            SELECT 1 FROM Missions m 
            WHERE m.OrigenID = dm.IDOrigen AND m.DestinoID = dm.IDDestino
        ) THEN 'Ruta Usada'
        ELSE 'Ruta Potencial'
    END AS EstadoUso
FROM DistanceMatrix dm
JOIN Bases bo ON dm.IDOrigen = bo.BaseID
JOIN Bases bd ON dm.IDDestino = bd.BaseID
ORDER BY dm.Kilometros;
```

### **FASE 4 EXPANDIDA - Retos con Suministros y Logística**

**Reto 41B: 📦 Análisis logístico de suministros**
```sql
-- Correlacionar suministros con recursos actuales
SELECT 
    b.Nombre AS Base,
    s.Tipo AS TipoSuministro,
    s.Cantidad AS CantidadEntregada,
    s.FechaEntrega,
    r.ComidaRaciones AS RecursosActuales,
    CASE 
        WHEN s.Tipo = 'Comida' AND r.ComidaRaciones < 500 THEN 'Crítico - Necesita más'
        WHEN s.Tipo = 'Medicina' AND r.Medicinas < 100 THEN 'Crítico - Necesita más'
        WHEN s.Tipo = 'Armas' AND r.Armas < 50 THEN 'Crítico - Necesita más'
        ELSE 'Estable'
    END AS EvaluacionNecesidad
FROM Supplies s
JOIN Bases b ON s.BaseID = b.BaseID
LEFT JOIN Resources r ON b.BaseID = r.BaseID
ORDER BY s.FechaEntrega DESC;
```

**Reto 42B: 🎖️ Eficiencia de alianzas militares**
```sql
-- Evaluar fortaleza militar combinada de alianzas
WITH AlianzasMilitares AS (
    SELECT 
        al.AllianceID,
        al.NivelConfianza,
        b1.Nombre AS Base1,
        b2.Nombre AS Base2,
        COALESCE(r1.Armas, 0) AS ArmasBase1,
        COALESCE(r2.Armas, 0) AS ArmasBase2,
        (COALESCE(r1.Armas, 0) + COALESCE(r2.Armas, 0)) AS PoderMilitarCombinado
    FROM Alliances al
    JOIN Bases b1 ON al.BaseID1 = b1.BaseID
    JOIN Bases b2 ON al.BaseID2 = b2.BaseID
    LEFT JOIN Resources r1 ON b1.BaseID = r1.BaseID
    LEFT JOIN Resources r2 ON b2.BaseID = r2.BaseID
)
SELECT 
    Base1 + ' ↔ ' + Base2 AS Alianza,
    NivelConfianza,
    PoderMilitarCombinado,
    ROUND(PoderMilitarCombinado * (NivelConfianza / 10.0), 2) AS PoderMilitarEfectivo,
    CASE 
        WHEN PoderMilitarCombinado * (NivelConfianza / 10.0) >= 1000 THEN '🟢 Alianza Dominante'
        WHEN PoderMilitarCombinado * (NivelConfianza / 10.0) >= 500 THEN '🟡 Alianza Fuerte'
        ELSE '🔴 Alianza Débil'
    END AS ClasificacionMilitar
FROM AlianzasMilitares
ORDER BY PoderMilitarEfectivo DESC;
```

### **FASE 5 EXPANDIDA - Retos Multi-tabla Complejos**

**Reto 51B: 🌐 Análisis de red de supervivencia integral**
```sql
-- Megaconsulta que integra TODAS las 10 tablas
WITH RedSupervivencia AS (
    SELECT 
        b.BaseID,
        b.Nombre AS Base,
        COUNT(DISTINCT s.SurvivorID) AS Supervivientes,
        COUNT(DISTINCT al.AllianceID) AS Alianzas,
        COUNT(DISTINCT a.AttackID) AS AtaquesRecibidos,
        COUNT(DISTINCT m.MissionID) AS MisionesLideradas,
        COUNT(DISTINCT rs.SightingID) AS AvistamientosReportados,
        COUNT(DISTINCT su.SupplyID) AS SuministrosRecibidos,
        COALESCE(SUM(r.ComidaRaciones + r.AguaLitros + r.Armas + r.Medicinas), 0) AS RecursosTotales,
        AVG(CAST(dm.Kilometros AS FLOAT)) AS DistanciaPromedioAOtrasBases
    FROM Bases b
    LEFT JOIN Survivors s ON b.BaseID = s.BaseID
    LEFT JOIN Alliances al ON b.BaseID = al.BaseID1 OR b.BaseID = al.BaseID2
    LEFT JOIN Attacks a ON b.BaseID = a.BaseID
    LEFT JOIN Missions m ON b.BaseID = m.OrigenID
    LEFT JOIN RobotSightings rs ON b.BaseID = rs.BaseID
    LEFT JOIN Supplies su ON b.BaseID = su.BaseID
    LEFT JOIN Resources r ON b.BaseID = r.BaseID
    LEFT JOIN DistanceMatrix dm ON b.BaseID = dm.IDOrigen
    GROUP BY b.BaseID, b.Nombre
)
SELECT 
    Base,
    Supervivientes,
    Alianzas,
    AtaquesRecibidos,
    MisionesLideradas,
    AvistamientosReportados,
    SuministrosRecibidos,
    RecursosTotales,
    ROUND(DistanciaPromedioAOtrasBases, 2) AS DistanciaPromedio,
    -- Índice de Supervivencia Integral
    ROUND(
        (Supervivientes * 20) +
        (Alianzas * 15) +
        (MisionesLideradas * 10) +
        (RecursosTotales / 100.0) +
        (SuministrosRecibidos * 5) -
        (AtaquesRecibidos * 10) -
        (AvistamientosReportados * 2)
    , 2) AS IndiceSupervivenvia,
    CASE 
        WHEN (
            (Supervivientes * 20) +
            (Alianzas * 15) +
            (MisionesLideradas * 10) +
            (RecursosTotales / 100.0) +
            (SuministrosRecibidos * 5) -
            (AtaquesRecibidos * 10) -
            (AvistamientosReportados * 2)
        ) >= 300 THEN '🏆 HUB ESTRATÉGICO'
        WHEN (
            (Supervivientes * 20) +
            (Alianzas * 15) +
            (MisionesLideradas * 10) +
            (RecursosTotales / 100.0) +
            (SuministrosRecibidos * 5) -
            (AtaquesRecibidos * 10) -
            (AvistamientosReportados * 2)
        ) >= 150 THEN '🟢 BASE SÓLIDA'
        WHEN (
            (Supervivientes * 20) +
            (Alianzas * 15) +
            (MisionesLideradas * 10) +
            (RecursosTotales / 100.0) +
            (SuministrosRecibidos * 5) -
            (AtaquesRecibidos * 10) -
            (AvistamientosReportados * 2)
        ) >= 50 THEN '🟡 BASE VULNERABLE'
        ELSE '🔴 BASE EN CRISIS'
    END AS ClasificacionEstrategica
FROM RedSupervivencia
ORDER BY IndiceSupervivenvia DESC;
```

## 🎲 DATOS ADICIONALES PROPUESTOS

### Para hacer los retos más ricos, propongo agregar:

1. **Más Robots**: 10-15 tipos diferentes con especialidades
2. **Más Avistamientos**: Patrón temporal de actividad robótica
3. **Más Misiones**: Incluyendo misiones fallidas con razones
4. **Más Alianzas**: Alianzas temporales y permanentes
5. **Suministros Temáticos**: Medicina de emergencia, tecnología, etc.
6. **Matriz de Distancias Completa**: Todas las combinaciones de bases

### Beneficios Educativos:

- **JOINs más complejos**: 5-8 tablas simultáneas
- **CTEs avanzados**: Análisis multi-nivel
- **Funciones de ventana**: Rankings y análisis temporal
- **Análisis estadístico**: Correlaciones y tendencias
- **Pensamiento estratégico**: Evaluación de riesgos y oportunidades

## 🚀 IMPLEMENTACIÓN SUGERIDA

1. **Fase 1**: Agregar 10 retos nuevos usando tablas subutilizadas
2. **Fase 2**: Enriquecer datos existentes con más registros
3. **Fase 3**: Crear retos mega-complejos de 8-10 tablas
4. **Fase 4**: Sistema de puntuación dinámico basado en complejidad

¿Te parece que implementemos esta expansión del sistema educativo?
