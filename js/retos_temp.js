// Sistema completo de 50 retos SQL adaptado a la base de datos real de Atapuerca
// Base de datos identificada: 10 tablas (Alliances, Attacks, Bases, DistanceMatrix, Missions, Resources, Robots, RobotSightings, Supplies, Survivors)

const retos = [
  // FASE 1 - Nivel básico (1-10) - Reconocimiento de datos
  {
    id: 1,
    fase: 1,
    nivel: "Básico",
    titulo: "Reconocimiento inicial",
    descripcion: "Mostrar toda la información de las bases disponibles",
    consulta_sugerida: "SELECT * FROM Bases;",
    pista: "Usa SELECT * para obtener todas las columnas de la tabla Bases",
    puntos: 5,
    videoUrl: "https://www.youtube.com/shorts/AOWiBICrndc"
  },
  {
    id: 2,
    fase: 1,
    nivel: "Básico",
    titulo: "Información básica ordenada",
    descripcion: "Mostrar el nombre y tipo de cada base, ordenadas por nombre",
    consulta_sugerida: "SELECT Nombre, TipoBase FROM Bases ORDER BY Nombre;",
    pista: "Usa ORDER BY para ordenar los resultados alfabéticamente",
    puntos: 5,
    videoUrl: "https://www.youtube.com/shorts/gBpUMv1H8zk"
  },
  {
    id: 3,
    fase: 1,
    nivel: "Básico", 
    titulo: "Bases de supervivientes",
    descripcion: "Mostrar las bases de tipo 'Humana'",
    consulta_sugerida: "SELECT * FROM Bases WHERE TipoBase = 'Humana';",
    pista: "Usa WHERE para filtrar por el tipo específico",
    puntos: 5,
    videoUrl: "https://www.youtube.com/shorts/GX_u6MhiMxs"
  },
  {
    id: 4,
    fase: 1,
    nivel: "Básico",
    titulo: "Censo de supervivientes",
    descripcion: "Mostrar toda la información de los supervivientes",
    consulta_sugerida: "SELECT * FROM Survivors;",
    pista: "Usa SELECT * para conocer toda la estructura de la tabla Survivors",
    puntos: 5,
    videoUrl: "https://www.youtube.com/shorts/GX_u6MhiMxs"
  },
  {
    id: 5,
    fase: 1,
    nivel: "Básico",
    titulo: "Inventario de recursos",
    descripcion: "Mostrar toda la información de los recursos disponibles",
    consulta_sugerida: "SELECT * FROM Resources;",
    pista: "Usa SELECT * para conocer toda la estructura de la tabla Resources",
    puntos: 5,
    videoUrl: "https://www.youtube.com/shorts/GX_u6MhiMxs"
  },
  {
    id: 6,
    fase: 1,
    nivel: "Básico",
    titulo: "Catálogo de amenazas",
    descripcion: "Mostrar toda la información sobre los robots enemigos",
    consulta_sugerida: "SELECT * FROM Robots;",
    pista: "Explora la tabla Robots para conocer las amenazas",
    puntos: 5,
    videoUrl: "https://www.youtube.com/shorts/GX_u6MhiMxs"
  },
  {
    id: 7,
    fase: 1,
    nivel: "Básico",
    titulo: "Veteranos experimentados",
    descripcion: "Mostrar los supervivientes mayores de 30 años",
    consulta_sugerida: "SELECT * FROM Survivors WHERE Edad > 30;",
    pista: "Usa el operador > para comparar la edad",
    puntos: 8,
    videoUrl: "https://www.youtube.com/shorts/GX_u6MhiMxs"
  },
  {
    id: 8,
    fase: 1,
    nivel: "Básico",
    titulo: "Bases bien abastecidas",
    descripcion: "Mostrar las bases con más de 40 raciones de comida",
    consulta_sugerida: "SELECT * FROM Resources WHERE ComidaRaciones > 40;",
    pista: "Filtra la tabla Resources por la columna ComidaRaciones",
    puntos: 8,
    videoUrl: "https://www.youtube.com/shorts/GX_u6MhiMxs"
  },
  {
    id: 9,
    fase: 1,
    nivel: "Básico",
    titulo: "Robots de alta amenaza",
    descripcion: "Mostrar robots con nivel de amenaza mayor a 7",
    consulta_sugerida: "SELECT * FROM Robots WHERE NivelAmenaza > 7;",
    pista: "Usa WHERE para filtrar por nivel de amenaza",
    puntos: 8,
    videoUrl: "https://www.youtube.com/shorts/GX_u6MhiMxs"
  },
  {
    id: 10,
    fase: 1,
    nivel: "Básico",
    titulo: "Comando central",
    descripcion: "Mostrar qué base es el comando central",
    consulta_sugerida: "SELECT * FROM Bases WHERE EsComandoCentral = 1;",
    pista: "Filtra por el campo EsComandoCentral",
    puntos: 8,
    videoUrl: "https://www.youtube.com/shorts/GX_u6MhiMxs"
  },

  // FASE 2 - Nivel intermedio (11-20) - JOINs básicos y análisis
  {
    id: 11,
    fase: 2,
    nivel: "Intermedio",
    titulo: "Supervivientes por base",
    descripcion: "Mostrar el nombre de cada superviviente junto con el nombre de su base",
    consulta_sugerida: "SELECT s.Nombre AS Superviviente, b.Nombre AS Base FROM Survivors s JOIN Bases b ON s.BaseID = b.BaseID;",
    pista: "Usa INNER JOIN para unir las tablas Survivors y Bases",
    puntos: 10,
    videoUrl: "https://www.youtube.com/shorts/GX_u6MhiMxs"
  },
  {
    id: 12,
    fase: 2,
    nivel: "Intermedio",
    titulo: "Recursos por base",
    descripcion: "Mostrar el nombre de cada base junto con sus recursos de comida y agua",
    consulta_sugerida: "SELECT b.Nombre, r.ComidaRaciones, r.AguaLitros FROM Bases b JOIN Resources r ON b.BaseID = r.BaseID;",
    pista: "Une las tablas Bases y Resources usando BaseID",
    puntos: 10,
    videoUrl: "https://www.youtube.com/shorts/GX_u6MhiMxs"
  },
  {
    id: 13,
    fase: 2,
    nivel: "Intermedio",
    titulo: "Ataques recibidos",
    descripcion: "Mostrar las bases que han sufrido ataques junto con la fecha del ataque",
    consulta_sugerida: "SELECT b.Nombre, a.Fecha, a.TipoRobot, a.Muertos FROM Bases b JOIN Attacks a ON b.BaseID = a.BaseID;",
    pista: "Une las tablas Bases y Attacks para ver qué bases han sido atacadas",
    puntos: 12,
    videoUrl: "https://www.youtube.com/shorts/GX_u6MhiMxs"
  },
  {
    id: 14,
    fase: 2,
    nivel: "Intermedio",
    titulo: "Misiones activas",
    descripcion: "Mostrar las misiones en curso con las bases de origen y destino",
    consulta_sugerida: "SELECT m.Nombre, bo.Nombre AS BaseOrigen, bd.Nombre AS BaseDestino FROM Missions m JOIN Bases bo ON m.OrigenID = bo.BaseID JOIN Bases bd ON m.DestinoID = bd.BaseID WHERE m.Estado = 'En Curso';",
    pista: "Necesitas dos JOINs con la tabla Bases para origen y destino",
    puntos: 15,
    videoUrl: "https://www.youtube.com/shorts/GX_u6MhiMxs"
  },
  {
    id: 15,
    fase: 2,
    nivel: "Intermedio",
    titulo: "Bases armadas",
    descripcion: "Mostrar bases que tienen armas disponibles",
    consulta_sugerida: "SELECT b.Nombre, r.Armas FROM Bases b JOIN Resources r ON b.BaseID = r.BaseID WHERE r.Armas > 0;",
    pista: "Filtra las bases que tienen armas en sus recursos",
    puntos: 10,
    videoUrl: "https://www.youtube.com/shorts/GX_u6MhiMxs"
  },
  {
    id: 16,
    fase: 2,
    nivel: "Intermedio",
    titulo: "Avistamientos de robots",
    descripcion: "Mostrar los avistamientos de robots cerca de cada base",
    consulta_sugerida: "SELECT b.Nombre, rs.Fecha, rs.TipoRobot, rs.NivelAmenaza FROM Bases b JOIN RobotSightings rs ON b.BaseID = rs.BaseID;",
    pista: "Une las tablas Bases y RobotSightings",
    puntos: 12,
    videoUrl: "https://www.youtube.com/shorts/GX_u6MhiMxs"
  },
  {
    id: 17,
    fase: 2,
    nivel: "Intermedio",
    titulo: "Alianzas establecidas",
    descripcion: "Mostrar las alianzas entre bases con sus nombres",
    consulta_sugerida: "SELECT b1.Nombre AS Base1, b2.Nombre AS Base2, a.NivelConfianza FROM Alliances a JOIN Bases b1 ON a.BaseID1 = b1.BaseID JOIN Bases b2 ON a.BaseID2 = b2.BaseID;",
    pista: "Necesitas dos JOINs con la tabla Bases para cada base de la alianza",
    puntos: 15,
    videoUrl: "https://www.youtube.com/shorts/GX_u6MhiMxs"
  },
  {
    id: 18,
    fase: 2,
    nivel: "Intermedio",
    titulo: "Suministros entregados",
    descripcion: "Mostrar los suministros entregados a cada base",
    consulta_sugerida: "SELECT b.Nombre, s.Tipo, s.Cantidad, s.FechaEntrega FROM Bases b JOIN Supplies s ON b.BaseID = s.BaseID;",
    pista: "Une las tablas Bases y Supplies",
    puntos: 10,
    videoUrl: "https://www.youtube.com/shorts/GX_u6MhiMxs"
  },
  {
    id: 19,
    fase: 2,
    nivel: "Intermedio",
    titulo: "Bases en el hemisferio norte",
    descripcion: "Mostrar las bases ubicadas en el hemisferio norte (latitud > 0)",
    consulta_sugerida: "SELECT Nombre, Ubicacion, Latitud FROM Bases WHERE Latitud > 0;",
    pista: "Filtra por latitud positiva para el hemisferio norte",
    puntos: 8,
    videoUrl: "https://www.youtube.com/shorts/GX_u6MhiMxs"
  },
  {
    id: 20,
    fase: 2,
    nivel: "Intermedio",
    titulo: "Supervivientes por rol",
    descripcion: "Contar cuántos supervivientes hay por cada rol",
    consulta_sugerida: "SELECT Rol, COUNT(*) AS Cantidad FROM Survivors GROUP BY Rol;",
    pista: "Usa GROUP BY para agrupar por rol y COUNT para contar",
    puntos: 12,
    videoUrl: "https://www.youtube.com/shorts/GX_u6MhiMxs"
  },

  // FASE 3 - Nivel avanzado (21-30) - Análisis profundo y agregaciones
  {
    id: 21,
    fase: 3,
    nivel: "Avanzado",
    titulo: "Promedio de edad por base",
    descripcion: "Calcular la edad promedio de los supervivientes en cada base",
    consulta_sugerida: "SELECT b.Nombre, AVG(CAST(s.Edad AS FLOAT)) AS EdadPromedio FROM Bases b JOIN Survivors s ON b.BaseID = s.BaseID GROUP BY b.Nombre;",
    pista: "Usa AVG y GROUP BY para calcular promedios por base",
    puntos: 15,
    videoUrl: "https://www.youtube.com/shorts/GX_u6MhiMxs"
  },
  {
    id: 22,
    fase: 3,
    nivel: "Avanzado",
    titulo: "Base más atacada",
    descripcion: "Mostrar qué base ha sufrido más ataques",
    consulta_sugerida: "SELECT TOP 1 b.Nombre, COUNT(*) AS NumeroAtaques FROM Bases b JOIN Attacks a ON b.BaseID = a.BaseID GROUP BY b.Nombre ORDER BY COUNT(*) DESC;",
    pista: "Usa COUNT, GROUP BY y ORDER BY DESC con TOP 1",
    puntos: 18,
    videoUrl: "https://www.youtube.com/shorts/GX_u6MhiMxs"
  },
  {
    id: 23,
    fase: 3,
    nivel: "Avanzado",
    titulo: "Recursos totales por tipo de base",
    descripcion: "Sumar todos los recursos por tipo de base (Humana vs IA)",
    consulta_sugerida: "SELECT b.TipoBase, SUM(r.ComidaRaciones) AS TotalComida, SUM(r.AguaLitros) AS TotalAgua FROM Bases b JOIN Resources r ON b.BaseID = r.BaseID GROUP BY b.TipoBase;",
    pista: "Agrupa por TipoBase y suma los recursos",
    puntos: 15,
    videoUrl: "https://www.youtube.com/shorts/GX_u6MhiMxs"
  },
  {
    id: 24,
    fase: 3,
    nivel: "Avanzado",
    titulo: "Robots más peligrosos",
    descripcion: "Mostrar los 3 tipos de robots con mayor nivel de amenaza",
    consulta_sugerida: "SELECT TOP 3 Modelo, NivelAmenaza, Funciones FROM Robots ORDER BY NivelAmenaza DESC;",
    pista: "Usa TOP 3 y ORDER BY DESC para obtener los más peligrosos",
    puntos: 12,
    videoUrl: "https://www.youtube.com/shorts/GX_u6MhiMxs"
  },
  {
    id: 25,
    fase: 3,
    nivel: "Avanzado",
    titulo: "Distancias entre bases",
    descripcion: "Mostrar las distancias entre bases usando la matriz de distancias",
    consulta_sugerida: "SELECT bo.Nombre AS BaseOrigen, bd.Nombre AS BaseDestino, dm.Kilometros FROM DistanceMatrix dm JOIN Bases bo ON dm.IDOrigen = bo.BaseID JOIN Bases bd ON dm.IDDestino = bd.BaseID;",
    pista: "Une DistanceMatrix con Bases dos veces para origen y destino",
    puntos: 18,
    videoUrl: "https://www.youtube.com/shorts/GX_u6MhiMxs"
  },
  {
    id: 26,
    fase: 3,
    nivel: "Avanzado",
    titulo: "Bases con mayor capacidad",
    descripcion: "Mostrar las bases ordenadas por capacidad de mayor a menor",
    consulta_sugerida: "SELECT Nombre, TipoBase, Capacidad FROM Bases WHERE Capacidad IS NOT NULL ORDER BY Capacidad DESC;",
    pista: "Filtra las bases que tienen capacidad definida y ordénalas",
    puntos: 10,
    videoUrl: "https://www.youtube.com/shorts/GX_u6MhiMxs"
  },
  {
    id: 27,
    fase: 3,
    nivel: "Avanzado",
    titulo: "Avistamientos por mes",
    descripcion: "Contar cuántos avistamientos de robots hubo por mes",
    consulta_sugerida: "SELECT YEAR(Fecha) AS Año, MONTH(Fecha) AS Mes, COUNT(*) AS Avistamientos FROM RobotSightings GROUP BY YEAR(Fecha), MONTH(Fecha) ORDER BY Año, Mes;",
    pista: "Usa funciones de fecha YEAR y MONTH para agrupar",
    puntos: 18,
    videoUrl: "https://www.youtube.com/shorts/GX_u6MhiMxs"
  },
  {
    id: 28,
    fase: 3,
    nivel: "Avanzado",
    titulo: "Bases sin ataques",
    descripcion: "Encontrar bases que nunca han sido atacadas",
    consulta_sugerida: "SELECT b.Nombre FROM Bases b LEFT JOIN Attacks a ON b.BaseID = a.BaseID WHERE a.BaseID IS NULL;",
    pista: "Usa LEFT JOIN para encontrar bases sin ataques correspondientes",
    puntos: 15,
    videoUrl: "https://www.youtube.com/shorts/GX_u6MhiMxs"
  },
  {
    id: 29,
    fase: 3,
    nivel: "Avanzado",
    titulo: "Alianzas más confiables",
    descripcion: "Mostrar las alianzas con nivel de confianza mayor a 8",
    consulta_sugerida: "SELECT b1.Nombre AS Base1, b2.Nombre AS Base2, a.NivelConfianza FROM Alliances a JOIN Bases b1 ON a.BaseID1 = b1.BaseID JOIN Bases b2 ON a.BaseID2 = b2.BaseID WHERE a.NivelConfianza > 8;",
    pista: "Filtra las alianzas por nivel de confianza alto",
    puntos: 15,
    videoUrl: "https://www.youtube.com/shorts/GX_u6MhiMxs"
  },
  {
    id: 30,
    fase: 3,
    nivel: "Avanzado",
    titulo: "Supervivientes jóvenes en bases humanas",
    descripcion: "Mostrar supervivientes menores de 25 años que están en bases humanas",
    consulta_sugerida: "SELECT s.Nombre, s.Edad, b.Nombre AS Base FROM Survivors s JOIN Bases b ON s.BaseID = b.BaseID WHERE s.Edad < 25 AND b.TipoBase = 'Humana';",
    pista: "Combina filtros de edad y tipo de base con AND",
    puntos: 15,
    videoUrl: "https://www.youtube.com/shorts/GX_u6MhiMxs"
  },

  // FASE 4 - Nivel experto (31-40) - Consultas complejas y subconsultas
  {
    id: 31,
    fase: 4,
    nivel: "Experto",
    titulo: "Base con más supervivientes",
    descripcion: "Encontrar qué base tiene el mayor número de supervivientes",
    consulta_sugerida: "SELECT TOP 1 b.Nombre, COUNT(s.SurvivorID) AS NumSupervivientes FROM Bases b JOIN Survivors s ON b.BaseID = s.BaseID GROUP BY b.Nombre ORDER BY COUNT(s.SurvivorID) DESC;",
    pista: "Agrupa por base, cuenta supervivientes y toma el máximo",
    puntos: 20,
    videoUrl: "https://www.youtube.com/shorts/GX_u6MhiMxs"
  },
  {
    id: 32,
    fase: 4,
    nivel: "Experto",
    titulo: "Eficiencia de suministros",
    descripcion: "Calcular la cantidad promedio de cada tipo de suministro entregado",
    consulta_sugerida: "SELECT Tipo, AVG(CAST(Cantidad AS FLOAT)) AS CantidadPromedio FROM Supplies GROUP BY Tipo ORDER BY CantidadPromedio DESC;",
    pista: "Agrupa por tipo de suministro y calcula el promedio",
    puntos: 18,
    videoUrl: "https://www.youtube.com/shorts/GX_u6MhiMxs"
  },
  {
    id: 33,
    fase: 4,
    nivel: "Experto",
    titulo: "Robots por generación",
    descripcion: "Mostrar cuántos robots hay de cada generación y su nivel de amenaza promedio",
    consulta_sugerida: "SELECT Generacion, COUNT(*) AS NumRobots, AVG(CAST(NivelAmenaza AS FLOAT)) AS AmenazaPromedio FROM Robots GROUP BY Generacion ORDER BY Generacion;",
    pista: "Agrupa por generación y calcula estadísticas",
    puntos: 18,
    videoUrl: "https://www.youtube.com/shorts/GX_u6MhiMxs"
  },
  {
    id: 34,
    fase: 4,
    nivel: "Experto",
    titulo: "Misiones por duración",
    descripcion: "Calcular la duración en días de cada misión completada",
    consulta_sugerida: "SELECT Nombre, DATEDIFF(day, FechaInicio, FechaFin) AS DuracionDias FROM Missions WHERE Estado = 'Completada' AND FechaFin IS NOT NULL;",
    pista: "Usa DATEDIFF para calcular días entre fechas",
    puntos: 20,
    videoUrl: "https://www.youtube.com/shorts/GX_u6MhiMxs"
  },
  {
    id: 35,
    fase: 4,
    nivel: "Experto",
    titulo: "Bases autosuficientes",
    descripcion: "Encontrar bases que tienen más de 50 raciones de comida Y más de 100 litros de agua",
    consulta_sugerida: "SELECT b.Nombre, r.ComidaRaciones, r.AguaLitros FROM Bases b JOIN Resources r ON b.BaseID = r.BaseID WHERE r.ComidaRaciones > 50 AND r.AguaLitros > 100;",
    pista: "Usa múltiples condiciones con AND",
    puntos: 15,
    videoUrl: "https://www.youtube.com/shorts/GX_u6MhiMxs"
  },
  {
    id: 36,
    fase: 4,
    nivel: "Experto",
    titulo: "Avistamientos de alta amenaza",
    descripcion: "Mostrar bases que han reportado avistamientos de robots con amenaza nivel 8 o mayor",
    consulta_sugerida: "SELECT DISTINCT b.Nombre FROM Bases b JOIN RobotSightings rs ON b.BaseID = rs.BaseID WHERE rs.NivelAmenaza >= 8;",
    pista: "Usa DISTINCT para evitar duplicados de bases",
    puntos: 18,
    videoUrl: "https://www.youtube.com/shorts/GX_u6MhiMxs"
  },
  {
    id: 37,
    fase: 4,
    nivel: "Experto",
    titulo: "Análisis de bajas por ataque",
    descripcion: "Calcular el total de muertos por tipo de robot atacante",
    consulta_sugerida: "SELECT TipoRobot, SUM(Muertos) AS TotalMuertos FROM Attacks GROUP BY TipoRobot ORDER BY TotalMuertos DESC;",
    pista: "Agrupa por tipo de robot y suma las bajas",
    puntos: 18,
    videoUrl: "https://www.youtube.com/shorts/GX_u6MhiMxs"
  },
  {
    id: 38,
    fase: 4,
    nivel: "Experto",
    titulo: "Rutas más largas",
    descripcion: "Encontrar las 5 rutas más largas entre bases",
    consulta_sugerida: "SELECT TOP 5 bo.Nombre AS Origen, bd.Nombre AS Destino, dm.Kilometros FROM DistanceMatrix dm JOIN Bases bo ON dm.IDOrigen = bo.BaseID JOIN Bases bd ON dm.IDDestino = bd.BaseID ORDER BY dm.Kilometros DESC;",
    pista: "Ordena por distancia descendente y toma los primeros 5",
    puntos: 20,
    videoUrl: "https://www.youtube.com/shorts/GX_u6MhiMxs"
  },
  {
    id: 39,
    fase: 4,
    nivel: "Experto",
    titulo: "Cobertura médica",
    descripcion: "Mostrar bases que tienen medicinas disponibles junto con la cantidad",
    consulta_sugerida: "SELECT b.Nombre, r.Medicinas FROM Bases b JOIN Resources r ON b.BaseID = r.BaseID WHERE r.Medicinas > 0 ORDER BY r.Medicinas DESC;",
    pista: "Filtra bases con medicinas y ordena por cantidad",
    puntos: 15,
    videoUrl: "https://www.youtube.com/shorts/GX_u6MhiMxs"
  },
  {
    id: 40,
    fase: 4,
    nivel: "Experto",
    titulo: "Supervivientes por base humana",
    descripcion: "Contar supervivientes solo en bases de tipo humana",
    consulta_sugerida: "SELECT b.Nombre, COUNT(s.SurvivorID) AS NumSupervivientes FROM Bases b LEFT JOIN Survivors s ON b.BaseID = s.BaseID WHERE b.TipoBase = 'Humana' GROUP BY b.Nombre ORDER BY COUNT(s.SurvivorID) DESC;",
    pista: "Filtra por tipo humana, agrupa y cuenta supervivientes",
    puntos: 20,
    videoUrl: "https://www.youtube.com/shorts/GX_u6MhiMxs"
  },

  // FASE 5 - Nivel maestro (41-50) - Análisis estratégico avanzado
  {
    id: 41,
    fase: 5,
    nivel: "Maestro",
    titulo: "Análisis de vulnerabilidad",
    descripcion: "Identificar bases con pocos recursos (menos de 30 raciones) que han sido atacadas",
    consulta_sugerida: "SELECT DISTINCT b.Nombre, r.ComidaRaciones FROM Bases b JOIN Resources r ON b.BaseID = r.BaseID JOIN Attacks a ON b.BaseID = a.BaseID WHERE r.ComidaRaciones < 30;",
    pista: "Une tres tablas y filtra por recursos bajos",
    puntos: 25,
    videoUrl: "https://www.youtube.com/shorts/GX_u6MhiMxs"
  },
  {
    id: 42,
    fase: 5,
    nivel: "Maestro",
    titulo: "Red de alianzas fuertes",
    descripcion: "Mostrar todas las bases que tienen alianzas con nivel de confianza mayor a 7",
    consulta_sugerida: "SELECT DISTINCT b.Nombre FROM Bases b WHERE b.BaseID IN (SELECT BaseID1 FROM Alliances WHERE NivelConfianza > 7) OR b.BaseID IN (SELECT BaseID2 FROM Alliances WHERE NivelConfianza > 7);",
    pista: "Usa subconsultas con IN para encontrar bases en alianzas fuertes",
    puntos: 25,
    videoUrl: "https://www.youtube.com/shorts/GX_u6MhiMxs"
  },
  {
    id: 43,
    fase: 5,
    nivel: "Maestro",
    titulo: "Patrón de ataques por ubicación",
    descripcion: "Analizar si las bases en ciertas ubicaciones son más atacadas",
    consulta_sugerida: "SELECT b.Ubicacion, COUNT(a.AttackID) AS NumAtaques, AVG(CAST(a.Muertos AS FLOAT)) AS PromedioMuertos FROM Bases b LEFT JOIN Attacks a ON b.BaseID = a.BaseID GROUP BY b.Ubicacion ORDER BY NumAtaques DESC;",
    pista: "Agrupa por ubicación y analiza estadísticas de ataques",
    puntos: 25,
    videoUrl: "https://www.youtube.com/shorts/GX_u6MhiMxs"
  },
  {
    id: 44,
    fase: 5,
    nivel: "Maestro",
    titulo: "Optimización de recursos",
    descripcion: "Encontrar bases que tienen recursos desbalanceados (mucha comida pero poca agua o viceversa)",
    consulta_sugerida: "SELECT b.Nombre, r.ComidaRaciones, r.AguaLitros, ABS(r.ComidaRaciones - r.AguaLitros) AS Desbalance FROM Bases b JOIN Resources r ON b.BaseID = r.BaseID WHERE ABS(r.ComidaRaciones - r.AguaLitros) > 50 ORDER BY Desbalance DESC;",
    pista: "Usa ABS para calcular diferencia absoluta entre recursos",
    puntos: 25,
    videoUrl: "https://www.youtube.com/shorts/GX_u6MhiMxs"
  },
  {
    id: 45,
    fase: 5,
    nivel: "Maestro",
    titulo: "Evolución temporal de amenazas",
    descripcion: "Mostrar cómo ha evolucionado el nivel de amenaza promedio de los avistamientos por trimestre",
    consulta_sugerida: "SELECT YEAR(Fecha) AS Año, CEILING(MONTH(Fecha)/3.0) AS Trimestre, AVG(CAST(NivelAmenaza AS FLOAT)) AS AmenazaPromedio FROM RobotSightings GROUP BY YEAR(Fecha), CEILING(MONTH(Fecha)/3.0) ORDER BY Año, Trimestre;",
    pista: "Usa CEILING para calcular trimestres y agrupa por año y trimestre",
    puntos: 30,
    videoUrl: "https://www.youtube.com/shorts/GX_u6MhiMxs"
  },
  {
    id: 46,
    fase: 5,
    nivel: "Maestro",
    titulo: "Análisis de supervivencia",
    descripcion: "Calcular la tasa de supervivencia por base (supervivientes actuales vs capacidad máxima)",
    consulta_sugerida: "SELECT b.Nombre, COUNT(s.SurvivorID) AS Supervivientes, b.Capacidad, ROUND((COUNT(s.SurvivorID) * 100.0 / NULLIF(b.Capacidad, 0)), 2) AS PorcentajeOcupacion FROM Bases b LEFT JOIN Survivors s ON b.BaseID = s.BaseID WHERE b.Capacidad IS NOT NULL GROUP BY b.Nombre, b.Capacidad ORDER BY PorcentajeOcupacion DESC;",
    pista: "Calcula porcentaje de ocupación y maneja división por cero",
    puntos: 30,
    videoUrl: "https://www.youtube.com/shorts/GX_u6MhiMxs"
  },
  {
    id: 47,
    fase: 5,
    nivel: "Maestro",
    titulo: "Ruta de evacuación óptima",
    descripcion: "Encontrar la ruta más corta desde cada base hacia el comando central",
    consulta_sugerida: "SELECT bo.Nombre AS BaseOrigen, MIN(dm.Kilometros) AS DistanciaMinima FROM Bases bo JOIN DistanceMatrix dm ON bo.BaseID = dm.IDOrigen JOIN Bases bd ON dm.IDDestino = bd.BaseID WHERE bd.EsComandoCentral = 1 GROUP BY bo.Nombre ORDER BY DistanciaMinima;",
    pista: "Encuentra la distancia mínima de cada base al comando central",
    puntos: 30,
    videoUrl: "https://www.youtube.com/shorts/GX_u6MhiMxs"
  },
  {
    id: 48,
    fase: 5,
    nivel: "Maestro",
    titulo: "Índice de fortaleza estratégica",
    descripcion: "Crear un índice compuesto de fortaleza basado en recursos, supervivientes y posición defensiva",
    consulta_sugerida: "SELECT b.Nombre, (r.ComidaRaciones + r.AguaLitros + r.Armas*10 + r.Medicinas*5 + COUNT(s.SurvivorID)*3) AS IndiceFortaleza FROM Bases b JOIN Resources r ON b.BaseID = r.BaseID LEFT JOIN Survivors s ON b.BaseID = s.BaseID WHERE b.TipoBase = 'Humana' GROUP BY b.Nombre, r.ComidaRaciones, r.AguaLitros, r.Armas, r.Medicinas ORDER BY IndiceFortaleza DESC;",
    pista: "Combina múltiples factores con pesos diferentes para crear un índice",
    puntos: 35,
    videoUrl: "https://www.youtube.com/shorts/GX_u6MhiMxs"
  },
  {
    id: 49,
    fase: 5,
    nivel: "Maestro",
    titulo: "Análisis predictivo de amenazas",
    descripcion: "Identificar patrones de ataques y predecir qué bases están en mayor riesgo",
    consulta_sugerida: "WITH FactoresRiesgo AS (SELECT b.BaseID, b.Nombre, COUNT(DISTINCT a.AttackID) AS HistorialAtaques, COUNT(DISTINCT rs.SightingID) AS Avistamientos, AVG(CAST(rs.NivelAmenaza AS FLOAT)) AS AmenazaPromedia FROM Bases b LEFT JOIN Attacks a ON b.BaseID = a.BaseID LEFT JOIN RobotSightings rs ON b.BaseID = rs.BaseID GROUP BY b.BaseID, b.Nombre) SELECT Nombre, (HistorialAtaques * 3 + Avistamientos * 2 + ISNULL(AmenazaPromedia, 0)) AS IndicePeligro FROM FactoresRiesgo ORDER BY IndicePeligro DESC;",
    pista: "Usa CTE para crear un modelo predictivo basado en múltiples factores de riesgo",
    puntos: 40,
    videoUrl: "https://www.youtube.com/shorts/GX_u6MhiMxs"
  },
  {
    id: 50,
    fase: 5,
    nivel: "Maestro",
    titulo: "Algoritmo maestro de supervivencia",
    descripcion: "Crear el análisis definitivo: combinar todos los factores para el plan de supervivencia global",
    consulta_sugerida: "WITH AnalisisCompleto AS (SELECT b.BaseID, b.Nombre, b.TipoBase, COUNT(s.SurvivorID) AS Poblacion, COUNT(DISTINCT s.Rol) AS DiversidadRoles, (r.ComidaRaciones + r.AguaLitros + r.Armas + r.Medicinas) AS RecursosTotales FROM Bases b LEFT JOIN Survivors s ON b.BaseID = s.BaseID JOIN Resources r ON b.BaseID = r.BaseID GROUP BY b.BaseID, b.Nombre, b.TipoBase, r.ComidaRaciones, r.AguaLitros, r.Armas, r.Medicinas), Clasificacion AS (SELECT *, CASE WHEN RecursosTotales >= 200 AND Poblacion >= 3 AND DiversidadRoles >= 3 THEN 'FORTALEZA' WHEN RecursosTotales >= 100 AND Poblacion >= 2 THEN 'REFUGIO' WHEN Poblacion > 0 THEN 'SUPERVIVENCIA' ELSE 'CRITICA' END AS EstadoEstrategico FROM AnalisisCompleto) SELECT ROW_NUMBER() OVER (ORDER BY RecursosTotales DESC, Poblacion DESC) AS Ranking, Nombre, TipoBase, EstadoEstrategico, Poblacion, DiversidadRoles, RecursosTotales FROM Clasificacion ORDER BY Ranking;",
    pista: "Combina todas las métricas, crea clasificaciones estratégicas y rankings finales",
    puntos: 50,
    videoUrl: "https://www.youtube.com/shorts/GX_u6MhiMxs"
  }
];

// Funciones del sistema de retos
let retoActual = 1;
let puntosTotal = 0;
let retosCompletados = [];

// Cargar progreso del localStorage
function cargarProgreso() {
    const progreso = localStorage.getItem('progresoAtapuerca');
    if (progreso) {
        const datos = JSON.parse(progreso);
        retoActual = datos.retoActual || 1;
        puntosTotal = datos.puntosTotal || 0;
        retosCompletados = datos.retosCompletados || [];
    }
}

// Guardar progreso en localStorage
function guardarProgreso() {
    const progreso = {
        retoActual: retoActual,
        puntosTotal: puntosTotal,
        retosCompletados: retosCompletados
    };
    localStorage.setItem('progresoAtapuerca', JSON.stringify(progreso));
}

// Función para verificar si una consulta es correcta
async function verificarConsulta(consulta, retoId) {
    try {
        // Validar que la consulta no esté vacía
        if (!consulta.trim()) {
            return {
                success: false,
                error: "La consulta no puede estar vacía"
            };
        }

        // Validar que sea una consulta SELECT
        if (!consulta.trim().toUpperCase().startsWith('SELECT')) {
            return {
                success: false,
                error: "Solo se permiten consultas SELECT"
            };
        }

        // Aquí se conectaría con la base de datos real
        // Por ahora simulamos la verificación
        const reto = retos.find(r => r.id === retoId);
        if (!reto) {
            return {
                success: false,
                error: "Reto no encontrado"
            };
        }

        // Simulación de verificación exitosa
        return {
            success: true,
            data: "Consulta ejecutada correctamente",
            puntos: reto.puntos
        };

    } catch (error) {
        return {
            success: false,
            error: "Error al ejecutar la consulta: " + error.message
        };
    }
}

// Función para marcar un reto como completado
function completarReto(retoId, puntos) {
    if (!retosCompletados.includes(retoId)) {
        retosCompletados.push(retoId);
        puntosTotal += puntos;
        
        // Desbloquear el siguiente reto
        if (retoId === retoActual && retoActual < 50) {
            retoActual++;
        }
        
        guardarProgreso();
        return true;
    }
    return false;
}

// Función para obtener el reto actual
function obtenerRetoActual() {
    return retos.find(r => r.id === retoActual);
}

// Función para verificar si un reto está desbloqueado
function estaDesbloqueado(retoId) {
    return retoId <= retoActual;
}

// Función para obtener estadísticas del progreso
function obtenerEstadisticas() {
    const totalRetos = retos.length;
    const completados = retosCompletados.length;
    const porcentaje = Math.round((completados / totalRetos) * 100);
    
    const faseActual = retos.find(r => r.id === retoActual)?.fase || 1;
    const retosPorFase = {
        1: retos.filter(r => r.fase === 1).length,
        2: retos.filter(r => r.fase === 2).length,
        3: retos.filter(r => r.fase === 3).length,
        4: retos.filter(r => r.fase === 4).length,
        5: retos.filter(r => r.fase === 5).length
    };
    
    return {
        totalRetos,
        completados,
        porcentaje,
        puntosTotal,
        faseActual,
        retoActual,
        retosPorFase
    };
}

// Función para resetear el progreso
function resetearProgreso() {
    retoActual = 1;
    puntosTotal = 0;
    retosCompletados = [];
    localStorage.removeItem('progresoAtapuerca');
}

// Inicializar el sistema al cargar
document.addEventListener('DOMContentLoaded', function() {
    cargarProgreso();
    console.log('Sistema de retos Atapuerca cargado - Progreso actual:', obtenerEstadisticas());
});
