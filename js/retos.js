// Sistema completo de 60 retos SQL adaptado a los DATOS REALES de Atapuerca
// ESTRUCTURA: Nivel 1 (1-10) → JOINS Tutorial (11-20) → Nivel 2 (21-30) → Nivel 3 (31-40) → Nivel 4 (41-50) → Nivel 5 (51-60)
// Datos verificados: 5 bases, 5 supervivientes, 3 recursos, ataques reales

const retos = [
  {
    id: 1,
    fase: 1,
    nivel: "Básico",
    titulo: "🏠 Exploración inicial - Las bases de Atapuerca",
    descripcion: "Descubre todas las bases de supervivencia disponibles (deberías ver 8 bases)",
    consulta_sugerida: "SELECT * FROM Bases;",
    pista: "Usa SELECT * para obtener todas las columnas. Deberías ver: Fortaleza Norte, Refugio Delta, Nido Central, Torre Omega, Cúpula Esperanza, Puesto Avanzado Alpha, Estación Fantasma y Centro Nexus",
    puntos: 5,
    videoUrl: "https://www.youtube.com/shorts/AOWiBICrndc"
  },
  {
    id: 2,
    fase: 1,
    nivel: "Básico",
    titulo: "📋 Bases ordenadas alfabéticamente",
    descripcion: "Mostrar solo el nombre y tipo de cada base, ordenadas alfabéticamente (8 bases totales)",
    consulta_sugerida: "SELECT Nombre, TipoBase FROM Bases ORDER BY Nombre;",
    pista: "Usa ORDER BY para ordenar. El resultado debería empezar con 'Centro Nexus' y terminar con 'Torre Omega'. Hay 8 bases en total",
    puntos: 5,
    videoUrl: "https://www.youtube.com/shorts/gBpUMv1H8zk"
  },
  {
    id: 3,
    fase: 1,
    nivel: "Básico", 
    titulo: "👥 Bases humanas vs bases IA",
    descripcion: "Filtrar y mostrar solo las bases de tipo 'Humana' (deberías encontrar 5 bases)",
    consulta_sugerida: "SELECT * FROM Bases WHERE TipoBase = 'Humana';",
    pista: "Usa WHERE para filtrar. Las 5 bases humanas son: Fortaleza Norte, Refugio Delta, Cúpula Esperanza, Puesto Avanzado Alpha y Estación Fantasma",
    puntos: 5,
    videoUrl: "https://www.youtube.com/shorts/GX_u6MhiMxs"
  },
  {
    id: 4,
    fase: 1,
    nivel: "Básico",
    titulo: "🧑‍🤝‍🧑 El equipo de supervivientes",
    descripcion: "Conoce a todos los supervivientes (deberías ver 8 personas: Elena, Marcus, Li Wei, Sara, Hugo, Maya, Diego y Zara)",
    consulta_sugerida: "SELECT * FROM Survivors;",
    pista: "Usa SELECT * para ver a todo el equipo con sus roles: Médica, Soldado, Técnico, Scout y Comandante",
    puntos: 5,
    videoUrl: "https://www.youtube.com/shorts/GX_u6MhiMxs"
  },
  {
    id: 5,
    fase: 1,
    nivel: "Básico",
    titulo: "📦 Inventario de recursos",
    descripcion: "Explorar todos los recursos disponibles en las bases (5 registros de recursos)",
    consulta_sugerida: "SELECT * FROM Resources;",
    pista: "Los recursos incluyen: AguaLitros, ComidaRaciones, Armas y Medicinas. Hay 5 registros de recursos registrados. No se pide unir con Survivors o Bases. SOLO LOS RECURSOS DISPONIBLES",
    puntos: 5,
    videoUrl: "https://www.youtube.com/shorts/GX_u6MhiMxs"
  },
  {
    id: 6,
    fase: 1,
    nivel: "Básico",
    titulo: "🏛️ El comando central",
    descripcion: "Identificar cuál es la base comando central (pista: EsComandoCentral = '1')",
    consulta_sugerida: "SELECT * FROM Bases WHERE EsComandoCentral = '1';",
    pista: "Solo una base es el comando central. Debería ser la Fortaleza Norte",
    puntos: 8,
    videoUrl: "https://www.youtube.com/shorts/GX_u6MhiMxs"
  },
  {
    id: 7,
    fase: 1,
    nivel: "Básico",
    titulo: "👨‍⚕️ Supervivientes veteranos",
    descripcion: "Encontrar supervivientes mayores de 30 años (deberías encontrar a Elena, Marcus, Hugo y Zara)",
    consulta_sugerida: "SELECT * FROM Survivors WHERE Edad > 30;",
    pista: "Usa el operador > para comparar edades. Los veteranos son los más experimentados",
    puntos: 8,
    videoUrl: "https://www.youtube.com/shorts/GX_u6MhiMxs"
  },
  {
    id: 8,
    fase: 1,
    nivel: "Básico",
    titulo: "🍞 Bases bien abastecidas de comida",
    descripcion: "Mostrar bases con más de 500 raciones de comida",
    consulta_sugerida: "SELECT * FROM Resources WHERE ComidaRaciones > 500;",
    pista: "Filtra la tabla Resources. Deberías encontrar Fortaleza Norte (900 raciones) y Cúpula Esperanza (600 raciones)",
    puntos: 8,
    videoUrl: "https://www.youtube.com/shorts/GX_u6MhiMxs"
  },
  {
    id: 9,
    fase: 1,
    nivel: "Básico",
    titulo: "👶 La scout más joven",
    descripcion: "Encontrar el superviviente más joven del equipo (Sara Kim, 16 años)",
    consulta_sugerida: "SELECT * FROM Survivors WHERE Edad = (SELECT MIN(Edad) FROM Survivors);",
    pista: "Usa MIN para encontrar la edad mínima. La más joven es Sara Kim con 16 años",
    puntos: 10,
    videoUrl: "https://www.youtube.com/shorts/GX_u6MhiMxs"
  },
  {
    id: 10,
    fase: 1,
    nivel: "Básico",
    titulo: "🌍 Bases en el hemisferio norte",
    descripcion: "Mostrar bases ubicadas en el hemisferio norte (Latitud > 0). Deberías encontrar 6 bases",
    consulta_sugerida: "SELECT Nombre, Ubicacion, Latitud FROM Bases WHERE Latitud > 0;",
    pista: "Filtra por latitud positiva. Deberías encontrar 6 bases en el hemisferio norte",
    puntos: 8,
    videoUrl: "https://www.youtube.com/shorts/GX_u6MhiMxs"
  },
  {
    id: 11,
    fase: 2,
    nivel: "JOIN Tutorial",
    titulo: "🔗 JOIN Básico - Dos tablas separadas",
    descripcion: "Antes de unir tablas, veamos qué datos tenemos por separado. Primero supervivientes, luego bases.",
    consulta_sugerida: "SELECT * FROM Survivors; SELECT * FROM Bases;",
    pista: "Ejecuta ambas consultas para ver los datos por separado. Nota que los supervivientes tienen BaseID para conectar con Bases.",
    puntos: 5,
    videoUrl: "https://www.youtube.com/shorts/GX_u6MhiMxs"
  },
  {
    id: 12,
    fase: 2,
    nivel: "JOIN Tutorial",
    titulo: "🔗 INNER JOIN - Solo coincidencias",
    descripcion: "INNER JOIN devuelve solo los registros que tienen coincidencias en ambas tablas. Supervivientes CON base asignada (6 supervivientes).",
    consulta_sugerida: "SELECT s.Nombre AS Superviviente, b.Nombre AS Base FROM Survivors s INNER JOIN Bases b ON s.BaseID = b.BaseID;",
    pista: "INNER JOIN es el más común. Muestra solo supervivientes que tienen una base válida asignada. Maya y Diego no aparecen porque no tienen base.",
    puntos: 10,
    videoUrl: "https://www.youtube.com/shorts/GX_u6MhiMxs"
  },
  {
    id: 13,
    fase: 2,
    nivel: "JOIN Tutorial",
    titulo: "◀️ LEFT OUTER JOIN - Todos de la izquierda",
    descripcion: "LEFT JOIN devuelve TODOS los registros de la tabla izquierda, incluso si no tienen coincidencias en la derecha.",
    consulta_sugerida: "SELECT b.Nombre AS Base, s.Nombre AS Superviviente FROM Bases b LEFT JOIN Survivors s ON b.BaseID = s.BaseID;",
    pista: "LEFT JOIN muestra todas las bases, incluso las vacías (Centro Nexus, Estación Fantasma, Nido Central y Torre Omega aparecen con NULL).",
    puntos: 12,
    videoUrl: "https://www.youtube.com/shorts/GX_u6MhiMxs"
  },
  {
    id: 14,
    fase: 2,
    nivel: "JOIN Tutorial",
    titulo: "▶️ RIGHT OUTER JOIN - Todos de la derecha",
    descripcion: "RIGHT JOIN devuelve TODOS los registros de la tabla derecha, incluso si no tienen coincidencias en la izquierda.",
    consulta_sugerida: "SELECT b.Nombre AS Base, s.Nombre AS Superviviente FROM Bases b RIGHT JOIN Survivors s ON b.BaseID = s.BaseID;",
    pista: "RIGHT JOIN muestra todos los supervivientes. Maya Chen y Diego Morales aparecen con NULL porque no tienen base asignada.",
    puntos: 12,
    videoUrl: "https://www.youtube.com/shorts/GX_u6MhiMxs"
  },
  {
    id: 15,
    fase: 2,
    nivel: "JOIN Tutorial",
    titulo: "🔗 FULL OUTER JOIN - Todo combinado",
    descripcion: "FULL OUTER JOIN devuelve TODOS los registros cuando hay coincidencia en cualquiera de las tablas.",
    consulta_sugerida: "SELECT b.Nombre AS Base, s.Nombre AS Superviviente FROM Bases b FULL OUTER JOIN Survivors s ON b.BaseID = s.BaseID;",
    pista: "FULL OUTER JOIN combina LEFT y RIGHT JOIN. Muestra todas las bases Y todos los supervivientes.",
    puntos: 15,
    videoUrl: "https://www.youtube.com/shorts/GX_u6MhiMxs"
  },
  {
    id: 16,
    fase: 2,
    nivel: "JOIN Tutorial",
    titulo: "❌ LEFT JOIN con exclusión - Solo sin coincidencias",
    descripcion: "LEFT JOIN con WHERE NULL encuentra registros de la tabla izquierda SIN coincidencias en la derecha (4 bases vacías).",
    consulta_sugerida: "SELECT b.Nombre AS Base FROM Bases b LEFT JOIN Survivors s ON b.BaseID = s.BaseID WHERE s.BaseID IS NULL;",
    pista: "Esta consulta encuentra bases que NO tienen supervivientes asignados: Nido Central, Torre Omega, Estación Fantasma y Centro Nexus.",
    puntos: 15,
    videoUrl: "https://www.youtube.com/shorts/GX_u6MhiMxs"
  },
  {
    id: 17,
    fase: 2,
    nivel: "JOIN Tutorial",
    titulo: "❌ RIGHT JOIN con exclusión - Huérfanos",
    descripcion: "RIGHT JOIN con WHERE NULL encuentra registros de la tabla derecha SIN coincidencias en la izquierda (2 supervivientes huérfanos).",
    consulta_sugerida: "SELECT s.Nombre AS Superviviente FROM Bases b RIGHT JOIN Survivors s ON b.BaseID = s.BaseID WHERE b.BaseID IS NULL;",
    pista: "Esta consulta encuentra supervivientes sin base asignada (huérfanos): Maya Chen y Diego Morales.",
    puntos: 15,
    videoUrl: "https://www.youtube.com/shorts/GX_u6MhiMxs"
  },
  {
    id: 18,
    fase: 2,
    nivel: "JOIN Tutorial",
    titulo: "🔗 CROSS JOIN - Producto cartesiano",
    descripcion: "CROSS JOIN combina cada registro de una tabla con CADA registro de la otra tabla.",
    consulta_sugerida: "SELECT b.Nombre AS Base, s.Nombre AS Superviviente FROM Bases b CROSS JOIN Survivors s;",
    pista: "CROSS JOIN crea todas las combinaciones posibles. 8 bases × 8 supervivientes = 64 combinaciones!",
    puntos: 12,
    videoUrl: "https://www.youtube.com/shorts/GX_u6MhiMxs"
  },
  {
    id: 19,
    fase: 2,
    nivel: "JOIN Tutorial",
    titulo: "🔗🔗 Múltiples JOINs - Tres tablas",
    descripcion: "Combinar Supervivientes, Bases y Resources en una sola consulta.",
    consulta_sugerida: "SELECT s.Nombre AS Superviviente, b.Nombre AS Base, r.ComidaRaciones FROM Survivors s INNER JOIN Bases b ON s.BaseID = b.BaseID LEFT JOIN Resources r ON b.BaseID = r.BaseID;",
    pista: "Usa múltiples JOINs para conectar tres tablas. LEFT JOIN para Resources porque no todas las bases tienen recursos.",
    puntos: 18,
    videoUrl: "https://www.youtube.com/shorts/GX_u6MhiMxs"
  },
  {
    id: 20,
    fase: 2,
    nivel: "JOIN Tutorial",
    titulo: "🎯 Auto-JOIN - La tabla consigo misma",
    descripcion: "Usar alias para comparar registros de la misma tabla. Encuentra supervivientes de la misma edad (Marcus+Zara: 41 años, Li+Diego: 27 años).",
    consulta_sugerida: "SELECT s1.Nombre AS Superviviente1, s2.Nombre AS Superviviente2, s1.Edad FROM Survivors s1 INNER JOIN Survivors s2 ON s1.Edad = s2.Edad AND s1.SurvivorID < s2.SurvivorID;",
    pista: "Auto-JOIN compara la tabla consigo misma. Deberías encontrar 2 pares: Marcus+Zara (41) y Li+Diego (27)",
    puntos: 20,
    videoUrl: "https://www.youtube.com/shorts/GX_u6MhiMxs"
  },
  {
    id: 21,
    fase: 2,
    nivel: "Intermedio",
    titulo: "👥 Equipo por base - Análisis real",
    descripcion: "Mostrar cada superviviente con el nombre de su base usando los datos reales (6 supervivientes con base asignada)",
    consulta_sugerida: "SELECT s.Nombre AS Superviviente, s.Rol, b.Nombre AS Base, b.TipoBase FROM Survivors s JOIN Bases b ON s.BaseID = b.BaseID ORDER BY b.Nombre;",
    pista: "Verás que Fortaleza Norte tiene 3 supervivientes (Elena, Marcus, Hugo), y hay 1 superviviente en Cúpula Esperanza, Puesto Avanzado Alpha y Refugio Delta cada una",
    puntos: 10,
    videoUrl: "https://www.youtube.com/shorts/GX_u6MhiMxs"
  },
  {
    id: 22,
    fase: 2,
    nivel: "Intermedio",
    titulo: "📦 Inventario completo por base",
    descripcion: "Mostrar todas las bases con sus recursos, incluyendo las que no tienen recursos",
    consulta_sugerida: "SELECT b.Nombre AS Base, COALESCE(r.ComidaRaciones, 0) AS Comida, COALESCE(r.AguaLitros, 0) AS Agua, COALESCE(r.Armas, 0) AS Armas FROM Bases b LEFT JOIN Resources r ON b.BaseID = r.BaseID ORDER BY b.Nombre;",
    pista: "LEFT JOIN muestra todas las bases. COALESCE convierte NULL a 0 para bases sin recursos",
    puntos: 12,
    videoUrl: "https://www.youtube.com/shorts/GX_u6MhiMxs"
  },
  {
    id: 23,
    fase: 2,
    nivel: "Intermedio",
    titulo: "🏛️ Comando y subordinados",
    descripcion: "Mostrar el comando central y todos los supervivientes que lo defienden",
    consulta_sugerida: "SELECT b.Nombre AS Base, s.Nombre AS Superviviente, s.Rol FROM Bases b JOIN Survivors s ON b.BaseID = s.BaseID WHERE b.EsComandoCentral = '1';",
    pista: "La Fortaleza Norte es el comando central con Elena (Médica), Marcus (Soldado) y Hugo (Comandante)",
    puntos: 12,
    videoUrl: "https://www.youtube.com/shorts/GX_u6MhiMxs"
  },
  {
    id: 24,
    fase: 2,
    nivel: "Intermedio",
    titulo: "📊 Estadísticas por hemisferio",
    descripcion: "Contar supervivientes y bases por hemisferio norte/sur",
    consulta_sugerida: "SELECT CASE WHEN b.Latitud > 0 THEN 'Norte' ELSE 'Sur' END AS Hemisferio, COUNT(DISTINCT b.BaseID) AS NumBases, COUNT(s.SurvivorID) AS NumSupervivientes FROM Bases b LEFT JOIN Survivors s ON b.BaseID = s.BaseID GROUP BY CASE WHEN b.Latitud > 0 THEN 'Norte' ELSE 'Sur' END;",
    pista: "Usa CASE WHEN para clasificar por hemisferio y GROUP BY para agrupar estadísticas",
    puntos: 15,
    videoUrl: "https://www.youtube.com/shorts/GX_u6MhiMxs"
  },
  {
    id: 25,
    fase: 2,
    nivel: "Intermedio",
    titulo: "⚔️ Arsenal por superviviente",
    descripcion: "Mostrar qué armas tiene disponibles cada superviviente en su base",
    consulta_sugerida: "SELECT s.Nombre AS Superviviente, s.Rol, b.Nombre AS Base, COALESCE(r.Armas, 0) AS ArmasDisponibles FROM Survivors s JOIN Bases b ON s.BaseID = b.BaseID LEFT JOIN Resources r ON b.BaseID = r.BaseID ORDER BY r.Armas DESC;",
    pista: "Combina 3 tablas para mostrar el armamento disponible para cada superviviente",
    puntos: 12,
    videoUrl: "https://www.youtube.com/shorts/GX_u6MhiMxs"
  },
  {
    id: 26,
    fase: 2,
    nivel: "Intermedio",
    titulo: "🧮 Promedio de edad por base",
    descripcion: "Calcular la edad promedio de supervivientes en cada base",
    consulta_sugerida: "SELECT b.Nombre AS Base, COUNT(s.SurvivorID) AS NumSupervivientes, AVG(CAST(s.Edad AS FLOAT)) AS EdadPromedio FROM Bases b JOIN Survivors s ON b.BaseID = s.BaseID GROUP BY b.Nombre ORDER BY EdadPromedio DESC;",
    pista: "Fortaleza Norte debería tener la edad promedio más alta (Elena 34, Marcus 41, Hugo 39)",
    puntos: 15,
    videoUrl: "https://www.youtube.com/shorts/GX_u6MhiMxs"
  },
  {
    id: 27,
    fase: 2,
    nivel: "Intermedio",
    titulo: "🏆 La base más próspera",
    descripcion: "Encontrar qué base tiene más recursos totales",
    consulta_sugerida: "SELECT b.Nombre AS Base, r.ComidaRaciones + r.AguaLitros + r.Armas + r.Medicinas AS RecursosTotales FROM Bases b JOIN Resources r ON b.BaseID = r.BaseID ORDER BY RecursosTotales DESC LIMIT 1;",
    pista: "Suma todos los tipos de recursos para encontrar la base más próspera",
    puntos: 12,
    videoUrl: "https://www.youtube.com/shorts/GX_u6MhiMxs"
  },
  {
    id: 28,
    fase: 2,
    nivel: "Intermedio",
    titulo: "🔍 Bases sin supervivientes",
    descripcion: "Encontrar bases que no tienen supervivientes asignados",
    consulta_sugerida: "SELECT b.Nombre AS Base, b.TipoBase FROM Bases b LEFT JOIN Survivors s ON b.BaseID = s.BaseID WHERE s.BaseID IS NULL;",
    pista: "LEFT JOIN con WHERE NULL encuentra bases vacías. Las bases IA (Torre Omega, Nido Central) no deberían tener supervivientes",
    puntos: 15,
    videoUrl: "https://www.youtube.com/shorts/GX_u6MhiMxs"
  },
  {
    id: 29,
    fase: 2,
    nivel: "Intermedio",
    titulo: "👑 Liderazgo y experiencia",
    descripcion: "Mostrar comandantes y médicos con sus bases y edades",
    consulta_sugerida: "SELECT s.Nombre AS Superviviente, s.Rol, s.Edad, b.Nombre AS Base FROM Survivors s JOIN Bases b ON s.BaseID = b.BaseID WHERE s.Rol IN ('Comandante', 'Médica') ORDER BY s.Edad DESC;",
    pista: "Filtra por roles de liderazgo. Zara es Comandante (41), Hugo es Comandante (39) y Elena es Médica (34)",
    puntos: 12,
    videoUrl: "https://www.youtube.com/shorts/GX_u6MhiMxs"
  },
  {
    id: 30,
    fase: 2,
    nivel: "Intermedio",
    titulo: "⚖️ Balance de recursos",
    descripcion: "Analizar el balance entre comida y agua en cada base",
    consulta_sugerida: "SELECT b.Nombre AS Base, r.ComidaRaciones, r.AguaLitros, ABS(r.ComidaRaciones - r.AguaLitros) AS DiferenciaRecursos, CASE WHEN r.ComidaRaciones > r.AguaLitros THEN 'Más comida' WHEN r.AguaLitros > r.ComidaRaciones THEN 'Más agua' ELSE 'Equilibrado' END AS TipoBalance FROM Bases b JOIN Resources r ON b.BaseID = r.BaseID ORDER BY DiferenciaRecursos;",
    pista: "Usa ABS para diferencia absoluta y CASE WHEN para clasificar el tipo de balance",
    puntos: 18,
    videoUrl: "https://www.youtube.com/shorts/GX_u6MhiMxs"
  },
  {
    id: 31,
    fase: 3,
    nivel: "Avanzado",
    titulo: "📈 Estadísticas generales del asentamiento",
    descripcion: "Crear un resumen completo de todos los recursos y supervivientes",
    consulta_sugerida: "SELECT COUNT(DISTINCT b.BaseID) AS TotalBases, COUNT(DISTINCT s.SurvivorID) AS TotalSupervivientes, SUM(COALESCE(r.ComidaRaciones, 0)) AS ComidaTotal, SUM(COALESCE(r.AguaLitros, 0)) AS AguaTotal, SUM(COALESCE(r.Armas, 0)) AS ArmasTotal FROM Bases b LEFT JOIN Survivors s ON b.BaseID = s.BaseID LEFT JOIN Resources r ON b.BaseID = r.BaseID;",
    pista: "Usa agregaciones para crear un dashboard completo de estadísticas",
    puntos: 20,
    videoUrl: "https://www.youtube.com/shorts/GX_u6MhiMxs"
  },
  {
    id: 32,
    fase: 3,
    nivel: "Avanzado",
    titulo: "🏅 Ranking de bases por población",
    descripcion: "Crear un ranking de bases ordenadas por número de supervivientes",
    consulta_sugerida: "SELECT b.Nombre AS Base, b.TipoBase, COUNT(s.SurvivorID) AS NumSupervivientes, RANK() OVER (ORDER BY COUNT(s.SurvivorID) DESC) AS Ranking FROM Bases b LEFT JOIN Survivors s ON b.BaseID = s.BaseID GROUP BY b.BaseID, b.Nombre, b.TipoBase ORDER BY NumSupervivientes DESC;",
    pista: "Usa window functions con RANK() para crear un ranking",
    puntos: 20,
    videoUrl: "https://www.youtube.com/shorts/GX_u6MhiMxs"
  },
  {
    id: 33,
    fase: 3,
    nivel: "Avanzado",
    titulo: "🎯 Análisis de roles críticos",
    descripcion: "Analizar la distribución de roles y encontrar carencias críticas",
    consulta_sugerida: "SELECT s.Rol, COUNT(*) AS Cantidad, AVG(CAST(s.Edad AS FLOAT)) AS EdadPromedio, MIN(s.Edad) AS MasJoven, MAX(s.Edad) AS MasViejo FROM Survivors s GROUP BY s.Rol ORDER BY Cantidad DESC;",
    pista: "Identifica qué roles son escasos. Solo hay 1 de cada rol excepto... ¿hay algún rol duplicado?",
    puntos: 18,
    videoUrl: "https://www.youtube.com/shorts/GX_u6MhiMxs"
  },
  {
    id: 34,
    fase: 3,
    nivel: "Avanzado",
    titulo: "📊 Densidad poblacional por base",
    descripcion: "Calcular qué porcentaje de la capacidad está ocupada en cada base",
    consulta_sugerida: "SELECT b.Nombre AS Base, b.Capacidad, COUNT(s.SurvivorID) AS Ocupantes, ROUND((COUNT(s.SurvivorID) * 100.0 / NULLIF(b.Capacidad, 0)), 2) AS PorcentajeOcupacion FROM Bases b LEFT JOIN Survivors s ON b.BaseID = s.BaseID WHERE b.Capacidad IS NOT NULL GROUP BY b.BaseID, b.Nombre, b.Capacidad ORDER BY PorcentajeOcupacion DESC;",
    pista: "NULLIF evita división por cero. Solo las bases humanas tienen capacidad definida",
    puntos: 22,
    videoUrl: "https://www.youtube.com/shorts/GX_u6MhiMxs"
  },
  {
    id: 35,
    fase: 3,
    nivel: "Avanzado",
    titulo: "🔄 Análisis de autosuficiencia",
    descripcion: "Determinar qué bases son autosuficientes basándose en recursos per cápita",
    consulta_sugerida: "SELECT b.Nombre AS Base, COUNT(s.SurvivorID) AS Supervivientes, COALESCE(r.ComidaRaciones, 0) AS Comida, COALESCE(r.AguaLitros, 0) AS Agua, CASE WHEN COUNT(s.SurvivorID) = 0 THEN 0 ELSE ROUND(COALESCE(r.ComidaRaciones, 0) / CAST(COUNT(s.SurvivorID) AS FLOAT), 2) END AS ComidaPerCapita, CASE WHEN COUNT(s.SurvivorID) = 0 THEN 0 ELSE ROUND(COALESCE(r.AguaLitros, 0) / CAST(COUNT(s.SurvivorID) AS FLOAT), 2) END AS AguaPerCapita FROM Bases b LEFT JOIN Survivors s ON b.BaseID = s.BaseID LEFT JOIN Resources r ON b.BaseID = r.BaseID GROUP BY b.BaseID, b.Nombre, r.ComidaRaciones, r.AguaLitros ORDER BY ComidaPerCapita DESC;",
    pista: "Calcula recursos per cápita para identificar qué bases están mejor preparadas",
    puntos: 25,
    videoUrl: "https://www.youtube.com/shorts/GX_u6MhiMxs"
  },
  {
    id: 36,
    fase: 3,
    nivel: "Avanzado",
    titulo: "🌍 Análisis geoespacial",
    descripcion: "Encontrar las bases más alejadas entre sí usando coordenadas",
    consulta_sugerida: "SELECT b1.Nombre AS Base1, b2.Nombre AS Base2, b1.Latitud AS Lat1, b1.Longitud AS Lon1, b2.Latitud AS Lat2, b2.Longitud AS Lon2, ABS(b1.Latitud - b2.Latitud) + ABS(b1.Longitud - b2.Longitud) AS DistanciaAproximada FROM Bases b1 CROSS JOIN Bases b2 WHERE b1.BaseID < b2.BaseID ORDER BY DistanciaAproximada DESC LIMIT 3;",
    pista: "CROSS JOIN compara cada base con todas las demás. Usa ABS para distancia Manhattan aproximada",
    puntos: 25,
    videoUrl: "https://www.youtube.com/shorts/GX_u6MhiMxs"
  },
  {
    id: 37,
    fase: 3,
    nivel: "Avanzado",
    titulo: "⚡ Análisis de eficiencia operativa",
    descripcion: "Crear un índice de eficiencia basado en recursos, supervivientes y capacidad",
    consulta_sugerida: "SELECT b.Nombre AS Base, COUNT(s.SurvivorID) AS Supervivientes, COALESCE(r.ComidaRaciones + r.AguaLitros + r.Armas + r.Medicinas, 0) AS RecursosTotales, COALESCE(b.Capacidad, 0) AS Capacidad, ROUND((COUNT(s.SurvivorID) * 10 + COALESCE(r.ComidaRaciones + r.AguaLitros + r.Armas + r.Medicinas, 0) / 10.0 + COALESCE(b.Capacidad, 0) / 5.0), 2) AS IndiceEficiencia FROM Bases b LEFT JOIN Survivors s ON b.BaseID = s.BaseID LEFT JOIN Resources r ON b.BaseID = r.BaseID GROUP BY b.BaseID, b.Nombre, r.ComidaRaciones, r.AguaLitros, r.Armas, r.Medicinas, b.Capacidad ORDER BY IndiceEficiencia DESC;",
    pista: "Combina múltiples factores con pesos diferentes para crear un índice compuesto de eficiencia",
    puntos: 28,
    videoUrl: "https://www.youtube.com/shorts/GX_u6MhiMxs"
  },
  {
    id: 38,
    fase: 3,
    nivel: "Avanzado",
    titulo: "👥 Análisis generacional",
    descripcion: "Clasificar supervivientes por grupos de edad y analizar distribución",
    consulta_sugerida: "SELECT CASE WHEN s.Edad < 20 THEN 'Joven (< 20)' WHEN s.Edad < 30 THEN 'Adulto Joven (20-29)' WHEN s.Edad < 40 THEN 'Adulto (30-39)' ELSE 'Veterano (40+)' END AS GrupoEdad, COUNT(*) AS Cantidad, AVG(CAST(s.Edad AS FLOAT)) AS EdadPromedio, STRING_AGG(s.Nombre + ' (' + s.Rol + ')', ', ') AS Miembros FROM Survivors s GROUP BY CASE WHEN s.Edad < 20 THEN 'Joven (< 20)' WHEN s.Edad < 30 THEN 'Adulto Joven (20-29)' WHEN s.Edad < 40 THEN 'Adulto (30-39)' ELSE 'Veterano (40+)' END ORDER BY EdadPromedio;",
    pista: "Usa CASE WHEN para clasificar por rangos de edad y STRING_AGG para concatenar nombres",
    puntos: 22,
    videoUrl: "https://www.youtube.com/shorts/GX_u6MhiMxs"
  },
  {
    id: 39,
    fase: 3,
    nivel: "Avanzado",
    titulo: "🔀 Matriz de intercambio de recursos",
    descripcion: "Simular intercambio óptimo de recursos entre bases",
    consulta_sugerida: "SELECT b1.Nombre AS BaseOrigen, b2.Nombre AS BaseDestino, r1.ComidaRaciones AS ComidaOrigen, r2.ComidaRaciones AS ComidaDestino, ABS(r1.ComidaRaciones - r2.ComidaRaciones) AS DiferenciaComida, CASE WHEN r1.ComidaRaciones > r2.ComidaRaciones THEN 'Puede enviar comida' WHEN r1.ComidaRaciones < r2.ComidaRaciones THEN 'Necesita comida' ELSE 'Equilibrado' END AS TipoIntercambio FROM Bases b1 JOIN Resources r1 ON b1.BaseID = r1.BaseID CROSS JOIN Bases b2 JOIN Resources r2 ON b2.BaseID = r2.BaseID WHERE b1.BaseID != b2.BaseID ORDER BY DiferenciaComida DESC;",
    pista: "CROSS JOIN crea todas las combinaciones para analizar posibles intercambios entre bases",
    puntos: 25,
    videoUrl: "https://www.youtube.com/shorts/GX_u6MhiMxs"
  },
  {
    id: 40,
    fase: 3,
    nivel: "Avanzado",
    titulo: "🏗️ Plan de expansión estratégica",
    descripcion: "Identificar dónde establecer nuevas bases basándose en datos actuales",
    consulta_sugerida: "WITH BaseStats AS (SELECT b.TipoBase, COUNT(*) AS NumBases, AVG(CAST(COUNT(s.SurvivorID) AS FLOAT)) AS PromSupervivientes, AVG(CAST(COALESCE(r.ComidaRaciones + r.AguaLitros, 0) AS FLOAT)) AS PromRecursos FROM Bases b LEFT JOIN Survivors s ON b.BaseID = s.BaseID LEFT JOIN Resources r ON b.BaseID = r.BaseID GROUP BY b.TipoBase) SELECT TipoBase, NumBases, ROUND(PromSupervivientes, 2) AS PromedioSupervivientes, ROUND(PromRecursos, 2) AS PromedioRecursos, CASE WHEN TipoBase = 'Humana' THEN 'Expandir en zonas templadas' ELSE 'Monitorear actividad IA' END AS RecomendacionExpansion FROM BaseStats ORDER BY PromRecursos DESC;",
    pista: "Usa CTE para calcular estadísticas por tipo de base y generar recomendaciones estratégicas",
    puntos: 30,
    videoUrl: "https://www.youtube.com/shorts/GX_u6MhiMxs"
  },
  {
    id: 41,
    fase: 4,
    nivel: "Experto",
    titulo: "🎯 Misión crítica: Base más vulnerable",
    descripcion: "Encontrar la base con menos supervivientes que aún tenga gente asignada",
    consulta_sugerida: "SELECT b.Nombre AS Base, COUNT(s.SurvivorID) AS NumSupervivientes FROM Bases b JOIN Survivors s ON b.BaseID = s.BaseID GROUP BY b.BaseID, b.Nombre HAVING COUNT(s.SurvivorID) = (SELECT MIN(cuenta) FROM (SELECT COUNT(s2.SurvivorID) AS cuenta FROM Bases b2 JOIN Survivors s2 ON b2.BaseID = s2.BaseID GROUP BY b2.BaseID) AS subconsulta);",
    pista: "Usa subconsulta para encontrar el mínimo número de supervivientes y luego filtrar por esa cantidad",
    puntos: 25,
    videoUrl: "https://www.youtube.com/shorts/GX_u6MhiMxs"
  },
  {
    id: 42,
    fase: 4,
    nivel: "Experto",
    titulo: "📊 Análisis comparativo de recursos",
    descripcion: "Mostrar bases que tienen más recursos que el promedio general",
    consulta_sugerida: "SELECT b.Nombre AS Base, (r.ComidaRaciones + r.AguaLitros + r.Armas + r.Medicinas) AS RecursosTotales FROM Bases b JOIN Resources r ON b.BaseID = r.BaseID WHERE (r.ComidaRaciones + r.AguaLitros + r.Armas + r.Medicinas) > (SELECT AVG(ComidaRaciones + AguaLitros + Armas + Medicinas) FROM Resources) ORDER BY RecursosTotales DESC;",
    pista: "Subconsulta en WHERE para comparar con el promedio. Las bases por encima del promedio son estratégicamente importantes",
    puntos: 22,
    videoUrl: "https://www.youtube.com/shorts/GX_u6MhiMxs"
  },
  {
    id: 43,
    fase: 4,
    nivel: "Experto",
    titulo: "👑 Liderazgo y experiencia crítica",
    descripcion: "Encontrar supervivientes mayores que la edad promedio en roles de liderazgo",
    consulta_sugerida: "SELECT s.Nombre, s.Edad, s.Rol, b.Nombre AS Base FROM Survivors s JOIN Bases b ON s.BaseID = b.BaseID WHERE s.Edad > (SELECT AVG(CAST(Edad AS FLOAT)) FROM Survivors) AND s.Rol IN ('Comandante', 'Médica') ORDER BY s.Edad DESC;",
    pista: "Combina filtro de edad (subconsulta) con filtro de roles críticos. La experiencia es vital para la supervivencia",
    puntos: 20,
    videoUrl: "https://www.youtube.com/shorts/GX_u6MhiMxs"
  },
  {
    id: 44,
    fase: 4,
    nivel: "Experto",
    titulo: "🏗️ Capacidad subutilizada",
    descripcion: "Identificar bases con capacidad disponible para reubicación de supervivientes",
    consulta_sugerida: "SELECT b.Nombre AS Base, b.Capacidad, COUNT(s.SurvivorID) AS Ocupantes, (b.Capacidad - COUNT(s.SurvivorID)) AS EspacioDisponible FROM Bases b LEFT JOIN Survivors s ON b.BaseID = s.BaseID WHERE b.Capacidad IS NOT NULL GROUP BY b.BaseID, b.Nombre, b.Capacidad HAVING b.Capacidad > COUNT(s.SurvivorID) ORDER BY EspacioDisponible DESC;",
    pista: "HAVING filtra grupos después de GROUP BY. Solo bases humanas tienen capacidad definida",
    puntos: 25,
    videoUrl: "https://www.youtube.com/shorts/GX_u6MhiMxs"
  },
  {
    id: 45,
    fase: 4,
    nivel: "Experto",
    titulo: "⚡ Bases autónomas vs dependientes",
    descripcion: "Clasificar bases según su nivel de autosuficiencia en recursos críticos",
    consulta_sugerida: "SELECT b.Nombre AS Base, CASE WHEN EXISTS (SELECT 1 FROM Resources r WHERE r.BaseID = b.BaseID AND r.ComidaRaciones >= 500 AND r.AguaLitros >= 500) THEN 'Autónoma' WHEN EXISTS (SELECT 1 FROM Resources r WHERE r.BaseID = b.BaseID) THEN 'Dependiente' ELSE 'Sin recursos' END AS NivelAutonomia, COALESCE(r.ComidaRaciones, 0) AS Comida, COALESCE(r.AguaLitros, 0) AS Agua FROM Bases b LEFT JOIN Resources r ON b.BaseID = r.BaseID ORDER BY CASE WHEN EXISTS (SELECT 1 FROM Resources r2 WHERE r2.BaseID = b.BaseID AND r2.ComidaRaciones >= 500 AND r2.AguaLitros >= 500) THEN 1 ELSE 2 END;",
    pista: "EXISTS verifica si existe al menos un registro que cumpla la condición. Bases autónomas necesitan 500+ de comida y agua",
    puntos: 28,
    videoUrl: "https://www.youtube.com/shorts/GX_u6MhiMxs"
  },
  {
    id: 46,
    fase: 4,
    nivel: "Experto",
    titulo: "🔍 Supervivientes únicos por características",
    descripcion: "Encontrar supervivientes con características únicas (mayor/menor edad, roles específicos)",
    consulta_sugerida: "SELECT s.Nombre, s.Edad, s.Rol, b.Nombre AS Base, CASE WHEN s.Edad = (SELECT MAX(Edad) FROM Survivors) THEN 'Más veterano' WHEN s.Edad = (SELECT MIN(Edad) FROM Survivors) THEN 'Más joven' WHEN s.Rol = 'Comandante' THEN 'Líder militar' WHEN s.Rol = 'Médica' THEN 'Soporte vital' ELSE 'Especialista' END AS Caracteristica FROM Survivors s JOIN Bases b ON s.BaseID = b.BaseID ORDER BY s.Edad;",
    pista: "Múltiples subconsultas para identificar características únicas. Cada superviviente tiene un valor estratégico específico",
    puntos: 22,
    videoUrl: "https://www.youtube.com/shorts/GX_u6MhiMxs"
  },
  {
    id: 47,
    fase: 4,
    nivel: "Experto",
    titulo: "📈 Análisis de concentración poblacional",
    descripcion: "Determinar si hay sobrepoblación o dispersión excesiva en las bases",
    consulta_sugerida: "WITH BasePopulation AS (SELECT b.BaseID, b.Nombre, COUNT(s.SurvivorID) AS NumSupervivientes FROM Bases b LEFT JOIN Survivors s ON b.BaseID = s.BaseID GROUP BY b.BaseID, b.Nombre), StatsGenerales AS (SELECT AVG(CAST(NumSupervivientes AS FLOAT)) AS PromedioSupervivientes FROM BasePopulation WHERE NumSupervivientes > 0) SELECT bp.Nombre AS Base, bp.NumSupervivientes, sg.PromedioSupervivientes, CASE WHEN bp.NumSupervivientes > sg.PromedioSupervivientes * 1.5 THEN 'Sobrepoblada' WHEN bp.NumSupervivientes < sg.PromedioSupervivientes * 0.5 AND bp.NumSupervivientes > 0 THEN 'Subpoblada' WHEN bp.NumSupervivientes = 0 THEN 'Abandonada' ELSE 'Equilibrada' END AS EstadoPoblacional FROM BasePopulation bp CROSS JOIN StatsGenerales sg ORDER BY bp.NumSupervivientes DESC;",
    pista: "CTE (Common Table Expression) para cálculos complejos. Analiza la distribución poblacional para detectar desequilibrios",
    puntos: 30,
    videoUrl: "https://www.youtube.com/shorts/GX_u6MhiMxs"
  },
  {
    id: 48,
    fase: 4,
    nivel: "Experto",
    titulo: "🛡️ Evaluación de seguridad por zona",
    descripcion: "Analizar la seguridad basándose en armamento y personal por área geográfica",
    consulta_sugerida: "SELECT CASE WHEN b.Latitud > 42 THEN 'Zona Norte' WHEN b.Latitud > 35 THEN 'Zona Central' ELSE 'Zona Sur' END AS AreaGeografica, COUNT(DISTINCT b.BaseID) AS NumBases, COUNT(s.SurvivorID) AS TotalSupervivientes, SUM(COALESCE(r.Armas, 0)) AS ArmasTotal, ROUND(AVG(CAST(COALESCE(r.Armas, 0) AS FLOAT)), 2) AS ArmasPromedioPorBase, CASE WHEN SUM(COALESCE(r.Armas, 0)) >= COUNT(s.SurvivorID) THEN 'Bien armada' WHEN SUM(COALESCE(r.Armas, 0)) >= COUNT(s.SurvivorID) * 0.5 THEN 'Armamento moderado' ELSE 'Vulnerable' END AS NivelSeguridad FROM Bases b LEFT JOIN Survivors s ON b.BaseID = s.BaseID LEFT JOIN Resources r ON b.BaseID = r.BaseID GROUP BY CASE WHEN b.Latitud > 42 THEN 'Zona Norte' WHEN b.Latitud > 35 THEN 'Zona Central' ELSE 'Zona Sur' END ORDER BY ArmasTotal DESC;",
    pista: "Agrupa por zonas geográficas y calcula ratios de seguridad. Una persona por arma es el ideal mínimo",
    puntos: 25,
    videoUrl: "https://www.youtube.com/shorts/GX_u6MhiMxs"
  },
  {
    id: 49,
    fase: 4,
    nivel: "Experto",
    titulo: "🔄 Simulación de evacuación de emergencia",
    descripcion: "Planificar evacuación identificando bases de origen y destino según capacidad",
    consulta_sugerida: "WITH BasesOrigen AS (SELECT b.BaseID, b.Nombre, COUNT(s.SurvivorID) AS Ocupantes FROM Bases b JOIN Survivors s ON b.BaseID = s.BaseID GROUP BY b.BaseID, b.Nombre), BasesDestino AS (SELECT b.BaseID, b.Nombre, b.Capacidad, COALESCE(COUNT(s.SurvivorID), 0) AS OcupantesActuales, (b.Capacidad - COALESCE(COUNT(s.SurvivorID), 0)) AS EspacioDisponible FROM Bases b LEFT JOIN Survivors s ON b.BaseID = s.BaseID WHERE b.Capacidad IS NOT NULL GROUP BY b.BaseID, b.Nombre, b.Capacidad HAVING b.Capacidad > COALESCE(COUNT(s.SurvivorID), 0)) SELECT bo.Nombre AS BaseOrigen, bo.Ocupantes AS PersonasAEvacuar, bd.Nombre AS BaseDestino, bd.EspacioDisponible, CASE WHEN bd.EspacioDisponible >= bo.Ocupantes THEN 'Evacuación completa posible' ELSE 'Evacuación parcial (' + CAST(bd.EspacioDisponible AS VARCHAR) + ' personas)' END AS PlanEvacuacion FROM BasesOrigen bo CROSS JOIN BasesDestino bd WHERE bo.BaseID != bd.BaseID ORDER BY bo.Ocupantes DESC, bd.EspacioDisponible DESC;",
    pista: "Dos CTEs para separar bases origen (con gente) y destino (con espacio). CROSS JOIN simula todas las posibilidades",
    puntos: 35,
    videoUrl: "https://www.youtube.com/shorts/GX_u6MhiMxs"
  },
  {
    id: 50,
    fase: 4,
    nivel: "Experto",
    titulo: "🏆 Evaluación integral de supervivencia",
    descripcion: "Crear un índice de supervivencia integral considerando todos los factores críticos",
    consulta_sugerida: "WITH AnalisisCompleto AS (SELECT b.BaseID, b.Nombre AS Base, b.TipoBase, COUNT(s.SurvivorID) AS NumSupervivientes, COALESCE(b.Capacidad, 0) AS Capacidad, COALESCE(r.ComidaRaciones + r.AguaLitros + r.Armas + r.Medicinas, 0) AS RecursosTotales, CASE WHEN COUNT(s.SurvivorID) = 0 THEN 0 ELSE COALESCE(r.ComidaRaciones + r.AguaLitros + r.Armas + r.Medicinas, 0) / CAST(COUNT(s.SurvivorID) AS FLOAT) END AS RecursosPerCapita, COUNT(CASE WHEN s.Rol IN ('Comandante', 'Médica') THEN 1 END) AS LiderazgoPresente FROM Bases b LEFT JOIN Survivors s ON b.BaseID = s.BaseID LEFT JOIN Resources r ON b.BaseID = r.BaseID GROUP BY b.BaseID, b.Nombre, b.TipoBase, b.Capacidad, r.ComidaRaciones, r.AguaLitros, r.Armas, r.Medicinas) SELECT Base, TipoBase, NumSupervivientes, RecursosTotales, ROUND(RecursosPerCapita, 2) AS RecursosPerCapita, LiderazgoPresente, ROUND((NumSupervivientes * 20 + RecursosTotales / 10.0 + RecursosPerCapita * 5 + LiderazgoPresente * 50 + CASE WHEN TipoBase = 'Humana' THEN 25 ELSE 0 END), 2) AS IndiceSupervivenvia, CASE WHEN (NumSupervivientes * 20 + RecursosTotales / 10.0 + RecursosPerCapita * 5 + LiderazgoPresente * 50 + CASE WHEN TipoBase = 'Humana' THEN 25 ELSE 0 END) >= 200 THEN '🟢 Excelente' WHEN (NumSupervivientes * 20 + RecursosTotales / 10.0 + RecursosPerCapita * 5 + LiderazgoPresente * 50 + CASE WHEN TipoBase = 'Humana' THEN 25 ELSE 0 END) >= 100 THEN '🟡 Aceptable' ELSE '🔴 Crítico' END AS EstadoSupervivencia FROM AnalisisCompleto ORDER BY IndiceSupervivenvia DESC;",
    pista: "CTE mega-complejo que integra población, recursos, liderazgo y tipo de base en un índice único de supervivencia",
    puntos: 40,
    videoUrl: "https://www.youtube.com/shorts/GX_u6MhiMxs"
  },
  {
    id: 51,
    fase: 5,
    nivel: "Maestro",
    titulo: "🌟 Comando central: Análisis de poder",
    descripcion: "Evaluar completamente la efectividad del comando central considerando todos los aspectos",
    consulta_sugerida: "WITH ComandoCentral AS (SELECT b.BaseID, b.Nombre, COUNT(s.SurvivorID) AS PersonalTotal, SUM(CASE WHEN s.Rol IN ('Comandante', 'Médica') THEN 1 ELSE 0 END) AS LiderazgoTotal, AVG(CAST(s.Edad AS FLOAT)) AS EdadPromedio, COALESCE(r.ComidaRaciones + r.AguaLitros + r.Armas + r.Medicinas, 0) AS RecursosTotales FROM Bases b LEFT JOIN Survivors s ON b.BaseID = s.BaseID LEFT JOIN Resources r ON b.BaseID = r.BaseID WHERE b.EsComandoCentral = '1' GROUP BY b.BaseID, b.Nombre, r.ComidaRaciones, r.AguaLitros, r.Armas, r.Medicinas), StatsGlobales AS (SELECT AVG(CAST(NumSupervivientes AS FLOAT)) AS PromedioPersonalGlobal FROM (SELECT COUNT(s.SurvivorID) AS NumSupervivientes FROM Bases b LEFT JOIN Survivors s ON b.BaseID = s.BaseID GROUP BY b.BaseID) AS subconsulta WHERE NumSupervivientes > 0) SELECT cc.Nombre AS ComandoCentral, cc.PersonalTotal, cc.LiderazgoTotal, ROUND(cc.EdadPromedio, 1) AS EdadPromedio, cc.RecursosTotales, sg.PromedioPersonalGlobal, ROUND((cc.PersonalTotal / sg.PromedioPersonalGlobal) * 100, 1) AS PorcentajeSuperioridad, CASE WHEN cc.LiderazgoTotal >= 2 AND cc.PersonalTotal >= sg.PromedioPersonalGlobal * 1.5 THEN '🟢 Comando sólido' WHEN cc.LiderazgoTotal >= 1 AND cc.PersonalTotal >= sg.PromedioPersonalGlobal THEN '🟡 Comando funcional' ELSE '🔴 Comando débil' END AS EvaluacionComando FROM ComandoCentral cc CROSS JOIN StatsGlobales sg;",
    pista: "CTE múltiple para analizar el comando central vs estadísticas globales. El liderazgo y personal son críticos",
    puntos: 35,
    videoUrl: "https://www.youtube.com/shorts/GX_u6MhiMxs"
  },
  {
    id: 52,
    fase: 5,
    nivel: "Maestro",
    titulo: "🔮 Predicción de escasez de recursos",
    descripcion: "Modelar el consumo diario y predecir cuándo se agotarán los recursos críticos",
    consulta_sugerida: "WITH ConsumoSimulado AS (SELECT b.Nombre AS Base, COUNT(s.SurvivorID) AS Consumidores, COALESCE(r.ComidaRaciones, 0) AS ComidaDisponible, COALESCE(r.AguaLitros, 0) AS AguaDisponible, COUNT(s.SurvivorID) * 3 AS ConsumoComidaDiario, COUNT(s.SurvivorID) * 5 AS ConsumoAguaDiario FROM Bases b LEFT JOIN Survivors s ON b.BaseID = s.BaseID LEFT JOIN Resources r ON b.BaseID = r.BaseID WHERE COUNT(s.SurvivorID) > 0 GROUP BY b.BaseID, b.Nombre, r.ComidaRaciones, r.AguaLitros) SELECT Base, Consumidores, ComidaDisponible, AguaDisponible, ConsumoComidaDiario, ConsumoAguaDiario, CASE WHEN ConsumoComidaDiario = 0 THEN 'N/A' ELSE CAST(ComidaDisponible / ConsumoComidaDiario AS VARCHAR) + ' días' END AS DuracionComida, CASE WHEN ConsumoAguaDiario = 0 THEN 'N/A' ELSE CAST(AguaDisponible / ConsumoAguaDiario AS VARCHAR) + ' días' END AS DuracionAgua, CASE WHEN ComidaDisponible / NULLIF(ConsumoComidaDiario, 0) < 30 OR AguaDisponible / NULLIF(ConsumoAguaDiario, 0) < 30 THEN '🔴 Crisis inminente (<30 días)' WHEN ComidaDisponible / NULLIF(ConsumoComidaDiario, 0) < 60 OR AguaDisponible / NULLIF(ConsumoAguaDiario, 0) < 60 THEN '🟡 Situación tensa (<60 días)' ELSE '🟢 Recursos suficientes' END AS AlertaEscasez FROM ConsumoSimulado ORDER BY LEAST(ComidaDisponible / NULLIF(ConsumoComidaDiario, 0), AguaDisponible / NULLIF(ConsumoAguaDiario, 0));",
    pista: "Simula consumo diario (3 raciones comida, 5L agua por persona) para predecir escasez. NULLIF evita división por cero",
    puntos: 40,
    videoUrl: "https://www.youtube.com/shorts/GX_u6MhiMxs"
  },
  {
    id: 53,
    fase: 5,
    nivel: "Maestro",
    titulo: "⚔️ Simulación de conflicto: Preparación militar",
    descripcion: "Evaluar la capacidad de defensa total del asentamiento en caso de ataque coordinado",
    consulta_sugerida: "WITH CapacidadMilitar AS (SELECT b.Nombre AS Base, COUNT(s.SurvivorID) AS PersonalTotal, COUNT(CASE WHEN s.Rol IN ('Soldado', 'Comandante') THEN 1 END) AS PersonalMilitar, COALESCE(r.Armas, 0) AS ArmasDisponibles, AVG(CAST(s.Edad AS FLOAT)) AS EdadPromedio FROM Bases b LEFT JOIN Survivors s ON b.BaseID = s.BaseID LEFT JOIN Resources r ON b.BaseID = r.BaseID GROUP BY b.BaseID, b.Nombre, r.Armas), EvaluacionDefensa AS (SELECT Base, PersonalTotal, PersonalMilitar, ArmasDisponibles, ROUND(EdadPromedio, 1) AS EdadPromedio, CASE WHEN PersonalMilitar > 0 AND ArmasDisponibles >= PersonalMilitar THEN PersonalMilitar * 2 + ArmasDisponibles WHEN PersonalMilitar > 0 THEN PersonalMilitar + ArmasDisponibles ELSE ArmasDisponibles / 2.0 END AS PuntuacionDefensa FROM CapacidadMilitar) SELECT Base, PersonalTotal, PersonalMilitar, ArmasDisponibles, EdadPromedio, ROUND(PuntuacionDefensa, 1) AS CapacidadDefensiva, CASE WHEN PuntuacionDefensa >= 20 THEN '🟢 Fortaleza defensiva' WHEN PuntuacionDefensa >= 10 THEN '🟡 Defensa moderada' WHEN PuntuacionDefensa >= 5 THEN '🟠 Defensa básica' ELSE '🔴 Indefensa' END AS NivelDefensa FROM EvaluacionDefensa UNION ALL SELECT 'TOTAL ASENTAMIENTO' AS Base, SUM(PersonalTotal) AS PersonalTotal, SUM(PersonalMilitar) AS PersonalMilitar, SUM(ArmasDisponibles) AS ArmasDisponibles, AVG(EdadPromedio) AS EdadPromedio, SUM(PuntuacionDefensa) AS CapacidadDefensiva, CASE WHEN SUM(PuntuacionDefensa) >= 50 THEN '🟢 Asentamiento fortificado' WHEN SUM(PuntuacionDefensa) >= 25 THEN '🟡 Defensa coordinable' ELSE '🔴 Vulnerable a ataques' END AS NivelDefensa FROM EvaluacionDefensa ORDER BY CapacidadDefensiva DESC;",
    pista: "Algoritmo militar complejo: soldados entrenados valen x2, armas sin soldados valen la mitad. UNION ALL agrega resumen total",
    puntos: 45,
    videoUrl: "https://www.youtube.com/shorts/GX_u6MhiMxs"
  },
  {
    id: 54,
    fase: 5,
    nivel: "Maestro",
    titulo: "🧬 Análisis de diversidad de habilidades",
    descripcion: "Evaluar la diversidad de roles y detectar dependencias críticas de personal clave",
    consulta_sugerida: "WITH AnalisisRoles AS (SELECT s.Rol, COUNT(*) AS Cantidad, AVG(CAST(s.Edad AS FLOAT)) AS EdadPromedio, MIN(s.Edad) AS EdadMinima, MAX(s.Edad) AS EdadMaxima, STRING_AGG(s.Nombre + ' (' + CAST(s.Edad AS VARCHAR) + ')', ', ') AS ListaPersonas FROM Survivors s GROUP BY s.Rol), CriticidadRol AS (SELECT Rol, Cantidad, ROUND(EdadPromedio, 1) AS EdadPromedio, EdadMinima, EdadMaxima, ListaPersonas, CASE WHEN Cantidad = 1 THEN '🔴 CRÍTICO - Punto único de fallo' WHEN Cantidad = 2 THEN '🟡 VULNERABLE - Redundancia mínima' ELSE '🟢 ESTABLE - Múltiple cobertura' END AS NivelRiesgo, CASE WHEN EdadPromedio > 35 THEN '⚠️ Envejecimiento' WHEN EdadPromedio < 25 THEN '💡 Joven' ELSE '✅ Maduro' END AS PerfilEdad FROM AnalisisRoles) SELECT Rol, Cantidad, EdadPromedio, EdadMinima, EdadMaxima, NivelRiesgo, PerfilEdad, ListaPersonas FROM CriticidadRol UNION ALL SELECT 'RESUMEN DIVERSIDAD' AS Rol, COUNT(DISTINCT cr.Rol) AS RolesUnicos, AVG(cr.EdadPromedio) AS EdadGlobalPromedio, MIN(cr.EdadMinima) AS EdadMinimaGlobal, MAX(cr.EdadMaxima) AS EdadMaximaGlobal, CASE WHEN AVG(cr.Cantidad) < 1.5 THEN '🔴 Especialización excesiva' WHEN COUNT(DISTINCT cr.Rol) >= 4 THEN '🟢 Diversidad saludable' ELSE '🟡 Diversidad limitada' END AS EvaluacionDiversidad, CASE WHEN AVG(cr.EdadPromedio) BETWEEN 25 AND 40 THEN '✅ Rango óptimo' ELSE '⚠️ Desequilibrio generacional' END AS BalanceGeneracional, 'Roles únicos: ' + CAST(COUNT(DISTINCT cr.Rol) AS VARCHAR) + ' | Promedio personas/rol: ' + CAST(ROUND(AVG(cr.Cantidad), 1) AS VARCHAR) AS EstadisticasGenerales FROM CriticidadRol cr ORDER BY CASE WHEN Rol = 'RESUMEN DIVERSIDAD' THEN 1 ELSE 0 END, NivelRiesgo DESC;",
    pista: "Análisis complejo de roles únicos, redundancia y riesgos. STRING_AGG concatena listas de personas por rol",
    puntos: 35,
    videoUrl: "https://www.youtube.com/shorts/GX_u6MhiMxs"
  },
  {
    id: 55,
    fase: 5,
    nivel: "Maestro",
    titulo: "📍 Optimización geoespacial de rutas",
    descripcion: "Calcular rutas óptimas entre bases y identificar puntos estratégicos centrales",
    consulta_sugerida: "WITH DistanciasEntreBases AS (SELECT b1.Nombre AS BaseOrigen, b2.Nombre AS BaseDestino, b1.Latitud AS Lat1, b1.Longitud AS Lon1, b2.Latitud AS Lat2, b2.Longitud AS Lon2, ROUND(SQRT(POWER(b1.Latitud - b2.Latitud, 2) + POWER(b1.Longitud - b2.Longitud, 2)), 4) AS DistanciaEuclidiana FROM Bases b1 CROSS JOIN Bases b2 WHERE b1.BaseID != b2.BaseID), CentroGeografico AS (SELECT AVG(Latitud) AS LatitudCentral, AVG(Longitud) AS LongitudCentral FROM Bases), BasesCentrales AS (SELECT b.Nombre AS Base, b.Latitud, b.Longitud, cg.LatitudCentral, cg.LongitudCentral, ROUND(SQRT(POWER(b.Latitud - cg.LatitudCentral, 2) + POWER(b.Longitud - cg.LongitudCentral, 2)), 4) AS DistanciaAlCentro FROM Bases b CROSS JOIN CentroGeografico cg) SELECT 'CENTRO GEOGRÁFICO' AS TipoAnalisis, 'Lat: ' + CAST(ROUND(LatitudCentral, 4) AS VARCHAR) + ', Lon: ' + CAST(ROUND(LongitudCentral, 4) AS VARCHAR) AS Coordenadas, NULL AS Base, NULL AS DistanciaAlCentro, NULL AS EstrategiaLogistica FROM CentroGeografico UNION ALL SELECT 'BASE MÁS CENTRAL' AS TipoAnalisis, 'Punto logístico óptimo' AS Coordenadas, Base, DistanciaAlCentro, 'Hub de distribución ideal' AS EstrategiaLogistica FROM BasesCentrales WHERE DistanciaAlCentro = (SELECT MIN(DistanciaAlCentro) FROM BasesCentrales) UNION ALL SELECT 'RUTA MÁS LARGA' AS TipoAnalisis, BaseOrigen + ' → ' + BaseDestino AS Coordenadas, NULL AS Base, DistanciaEuclidiana AS DistanciaAlCentro, 'Ruta crítica a proteger' AS EstrategiaLogistica FROM DistanciasEntreBases WHERE DistanciaEuclidiana = (SELECT MAX(DistanciaEuclidiana) FROM DistanciasEntreBases) UNION ALL SELECT 'RUTA MÁS CORTA' AS TipoAnalisis, BaseOrigen + ' → ' + BaseDestino AS Coordenadas, NULL AS Base, DistanciaEuclidiana AS DistanciaAlCentro, 'Conexión rápida disponible' AS EstrategiaLogistica FROM DistanciasEntreBases WHERE DistanciaEuclidiana = (SELECT MIN(DistanciaEuclidiana) FROM DistanciasEntreBases) ORDER BY TipoAnalisis;",
    pista: "Geometría espacial con múltiples CTEs. Calcula centro geográfico, base central, y rutas extremas para optimización logística",
    puntos: 50,
    videoUrl: "https://www.youtube.com/shorts/GX_u6MhiMxs"
  },
  {
    id: 56,
    fase: 5,
    nivel: "Maestro",
    titulo: "💊 Sistema de salud: Capacidad médica",
    descripcion: "Evaluar la cobertura médica y capacidad de respuesta ante emergencias sanitarias",
    consulta_sugerida: "WITH CapacidadMedica AS (SELECT b.Nombre AS Base, COUNT(s.SurvivorID) AS PoblacionTotal, COUNT(CASE WHEN s.Rol = 'Médica' THEN 1 END) AS PersonalMedico, COALESCE(r.Medicinas, 0) AS MedicinasDisponibles, COUNT(s.SurvivorID) AS PacientesPotenciales FROM Bases b LEFT JOIN Survivors s ON b.BaseID = s.BaseID LEFT JOIN Resources r ON b.BaseID = r.BaseID GROUP BY b.BaseID, b.Nombre, r.Medicinas), EvaluacionSanitaria AS (SELECT Base, PoblacionTotal, PersonalMedico, MedicinasDisponibles, PacientesPotenciales, CASE WHEN PersonalMedico = 0 THEN 0 WHEN PoblacionTotal = 0 THEN 0 ELSE ROUND((PersonalMedico * 100.0) / PoblacionTotal, 2) END AS PorcentajeCoberturaMedica, CASE WHEN PoblacionTotal = 0 THEN 0 ELSE ROUND(MedicinasDisponibles / CAST(PoblacionTotal AS FLOAT), 2) END AS MedicinasPerCapita, CASE WHEN PersonalMedico = 0 AND PoblacionTotal > 0 THEN '🔴 SIN COBERTURA MÉDICA' WHEN PersonalMedico > 0 AND (PoblacionTotal / CAST(PersonalMedico AS FLOAT)) <= 5 THEN '🟢 COBERTURA EXCELENTE' WHEN PersonalMedico > 0 AND (PoblacionTotal / CAST(PersonalMedico AS FLOAT)) <= 10 THEN '🟡 COBERTURA ADECUADA' WHEN PersonalMedico > 0 THEN '🟠 COBERTURA LIMITADA' ELSE '⚫ BASE VACÍA' END AS NivelCobertura FROM CapacidadMedica) SELECT Base, PoblacionTotal, PersonalMedico, MedicinasDisponibles, PorcentajeCoberturaMedica, MedicinasPerCapita, NivelCobertura, CASE WHEN MedicinasPerCapita >= 50 AND PersonalMedico > 0 THEN '✅ Preparada para emergencias' WHEN MedicinasPerCapita >= 20 AND PersonalMedico > 0 THEN '⚠️ Capacidad básica' WHEN PersonalMedico > 0 THEN '🔴 Recursos insuficientes' ELSE '💀 Incapaz de responder' END AS CapacidadEmergencia FROM EvaluacionSanitaria UNION ALL SELECT 'SISTEMA GENERAL' AS Base, SUM(PoblacionTotal) AS PoblacionTotal, SUM(PersonalMedico) AS PersonalMedico, SUM(MedicinasDisponibles) AS MedicinasDisponibles, CASE WHEN SUM(PoblacionTotal) = 0 THEN 0 ELSE ROUND((SUM(PersonalMedico) * 100.0) / SUM(PoblacionTotal), 2) END AS CoberturaGeneral, CASE WHEN SUM(PoblacionTotal) = 0 THEN 0 ELSE ROUND(SUM(MedicinasDisponibles) / CAST(SUM(PoblacionTotal) AS FLOAT), 2) END AS MedicinasPerCapitaGeneral, CASE WHEN SUM(PersonalMedico) = 0 THEN '🔴 CRISIS SANITARIA TOTAL' WHEN (SUM(PoblacionTotal) / CAST(SUM(PersonalMedico) AS FLOAT)) <= 5 THEN '🟢 SISTEMA ROBUSTO' WHEN (SUM(PoblacionTotal) / CAST(SUM(PersonalMedico) AS FLOAT)) <= 10 THEN '🟡 SISTEMA FUNCIONAL' ELSE '🟠 SISTEMA SOBRECARGADO' END AS EstadoSistema, CASE WHEN (SUM(MedicinasDisponibles) / CAST(SUM(PoblacionTotal) AS FLOAT)) >= 50 AND SUM(PersonalMedico) > 0 THEN '✅ Listo para pandemia' ELSE '🔴 Vulnerable a crisis sanitaria' END AS PreparacionCrisis FROM EvaluacionSanitaria WHERE PoblacionTotal > 0 ORDER BY CASE WHEN Base = 'SISTEMA GENERAL' THEN 1 ELSE 0 END, CapacidadEmergencia DESC;",
    pista: "Análisis sanitario complejo: ratio médico-población, medicinas per cápita, capacidad de emergencia. Incluye evaluación del sistema global",
    puntos: 45,
    videoUrl: "https://www.youtube.com/shorts/GX_u6MhiMxs"
  },
  {
    id: 57,
    fase: 5,
    nivel: "Maestro",
    titulo: "🔄 Simulación de intercambio económico",
    descripcion: "Modelar un sistema de intercambio óptimo de recursos entre bases para maximizar la supervivencia",
    consulta_sugerida: "WITH PerfilesBase AS (SELECT b.BaseID, b.Nombre AS Base, COUNT(s.SurvivorID) AS Poblacion, COALESCE(r.ComidaRaciones, 0) AS Comida, COALESCE(r.AguaLitros, 0) AS Agua, COALESCE(r.Armas, 0) AS Armas, COALESCE(r.Medicinas, 0) AS Medicinas, CASE WHEN COUNT(s.SurvivorID) = 0 THEN 0 ELSE COALESCE(r.ComidaRaciones, 0) / CAST(COUNT(s.SurvivorID) AS FLOAT) END AS ComidaPerCapita, CASE WHEN COUNT(s.SurvivorID) = 0 THEN 0 ELSE COALESCE(r.AguaLitros, 0) / CAST(COUNT(s.SurvivorID) AS FLOAT) END AS AguaPerCapita FROM Bases b LEFT JOIN Survivors s ON b.BaseID = s.BaseID LEFT JOIN Resources r ON b.BaseID = r.BaseID GROUP BY b.BaseID, b.Nombre, r.ComidaRaciones, r.AguaLitros, r.Armas, r.Medicinas), IntercambiosOptimos AS (SELECT p1.Base AS BaseOrigen, p2.Base AS BaseDestino, p1.Poblacion AS PoblacionOrigen, p2.Poblacion AS PoblacionDestino, CASE WHEN p1.ComidaPerCapita > p2.ComidaPerCapita + 50 THEN ROUND((p1.ComidaPerCapita - p2.ComidaPerCapita) / 2 * p1.Poblacion, 0) ELSE 0 END AS ComidaATransferir, CASE WHEN p1.AguaPerCapita > p2.AguaPerCapita + 50 THEN ROUND((p1.AguaPerCapita - p2.AguaPerCapita) / 2 * p1.Poblacion, 0) ELSE 0 END AS AguaATransferir, ABS(p1.ComidaPerCapita - p2.ComidaPerCapita) + ABS(p1.AguaPerCapita - p2.AguaPerCapita) AS PotencialBeneficio FROM PerfilesBase p1 CROSS JOIN PerfilesBase p2 WHERE p1.BaseID != p2.BaseID AND p1.Poblacion > 0 AND p2.Poblacion > 0), RankingIntercambios AS (SELECT BaseOrigen, BaseDestino, ComidaATransferir, AguaATransferir, PotencialBeneficio, ROW_NUMBER() OVER (PARTITION BY BaseOrigen ORDER BY PotencialBeneficio DESC) AS RankingBeneficio FROM IntercambiosOptimos WHERE ComidaATransferir > 0 OR AguaATransferir > 0) SELECT BaseOrigen, BaseDestino, ComidaATransferir, AguaATransferir, ROUND(PotencialBeneficio, 2) AS PotencialBeneficio, CASE WHEN ComidaATransferir > AguaATransferir THEN '🍖 Intercambio de comida prioritario' WHEN AguaATransferir > ComidaATransferir THEN '💧 Intercambio de agua prioritario' ELSE '⚖️ Intercambio equilibrado' END AS TipoIntercambio, CASE WHEN PotencialBeneficio > 100 THEN '🟢 Altamente beneficioso' WHEN PotencialBeneficio > 50 THEN '🟡 Moderadamente beneficioso' ELSE '🟠 Beneficio mínimo' END AS NivelBeneficio FROM RankingIntercambios WHERE RankingBeneficio <= 2 UNION ALL SELECT 'RESUMEN ECONÓMICO' AS BaseOrigen, 'Sistema de intercambio' AS BaseDestino, SUM(ComidaATransferir) AS TotalComidaIntercambio, SUM(AguaATransferir) AS TotalAguaIntercambio, AVG(PotencialBeneficio) AS BeneficioPromedio, CASE WHEN COUNT(*) >= 4 THEN '🟢 Economía dinámica posible' WHEN COUNT(*) >= 2 THEN '🟡 Intercambios limitados' ELSE '🔴 Economía estancada' END AS EstadoEconomico, CASE WHEN AVG(PotencialBeneficio) > 75 THEN '🟢 Mercado eficiente' ELSE '🟡 Optimización necesaria' END AS EficienciaMercado FROM RankingIntercambios ORDER BY PotencialBeneficio DESC;",
    pista: "Economía simulada compleja: identifica desequilibrios de recursos, calcula transferencias óptimas y clasifica beneficios por niveles",
    puntos: 50,
    videoUrl: "https://www.youtube.com/shorts/GX_u6MhiMxs"
  },
  {
    id: 58,
    fase: 5,
    nivel: "Maestro",
    titulo: "🎖️ Evaluación de liderazgo y sucesión",
    descripcion: "Analizar la estructura de liderazgo y planificar la sucesión en roles críticos",
    consulta_sugerida: "WITH LiderazgoActual AS (SELECT s.SurvivorID, s.Nombre, s.Edad, s.Rol, b.Nombre AS Base, b.EsComandoCentral, CASE WHEN s.Rol = 'Comandante' THEN 100 WHEN s.Rol = 'Médica' THEN 90 WHEN s.Rol = 'Soldado' THEN 70 WHEN s.Rol = 'Ingeniera' THEN 75 ELSE 50 END AS PuntuacionLiderazgo FROM Survivors s JOIN Bases b ON s.BaseID = b.BaseID), CandidatosSucesion AS (SELECT la.Nombre AS LiderActual, la.Edad AS EdadLider, la.Rol AS RolLider, la.Base, s2.Nombre AS PosibleSucesor, s2.Edad AS EdadSucesor, s2.Rol AS RolSucesor, ABS(la.PuntuacionLiderazgo - CASE WHEN s2.Rol = 'Comandante' THEN 100 WHEN s2.Rol = 'Médica' THEN 90 WHEN s2.Rol = 'Soldado' THEN 70 WHEN s2.Rol = 'Ingeniera' THEN 75 ELSE 50 END) AS DiferenciaLiderazgo, CASE WHEN la.Edad - s2.Edad > 5 THEN 'Sucesión generacional saludable' WHEN ABS(la.Edad - s2.Edad) <= 5 THEN 'Sucesión entre pares' ELSE 'Líder más joven que candidato' END AS TipoSucesion FROM LiderazgoActual la CROSS JOIN Survivors s2 WHERE la.SurvivorID != s2.SurvivorID AND la.PuntuacionLiderazgo >= 70), AnalisisCriticidad AS (SELECT RolLider, COUNT(DISTINCT LiderActual) AS LideresActuales, COUNT(DISTINCT PosibleSucesor) AS CandidatosDisponibles, AVG(EdadLider) AS EdadPromedioLideres, MIN(DiferenciaLiderazgo) AS MejorCandidatoGap, CASE WHEN COUNT(DISTINCT LiderActual) = 1 AND COUNT(DISTINCT PosibleSucesor) = 0 THEN '🔴 CRISIS - Sin sucesión' WHEN COUNT(DISTINCT LiderActual) = 1 AND COUNT(DISTINCT PosibleSucesor) < 2 THEN '🟠 RIESGO - Sucesión limitada' WHEN COUNT(DISTINCT LiderActual) = 1 THEN '🟡 ESTABLE - Sucesión disponible' ELSE '🟢 ROBUSTO - Múltiple liderazgo' END AS EstadoSucesion FROM CandidatosSucesion GROUP BY RolLider) SELECT LiderActual, EdadLider, RolLider, Base, PosibleSucesor, EdadSucesor, RolSucesor, DiferenciaLiderazgo, TipoSucesion, CASE WHEN DiferenciaLiderazgo <= 10 THEN '🟢 Candidato ideal' WHEN DiferenciaLiderazgo <= 20 THEN '🟡 Candidato viable' ELSE '🟠 Candidato subóptimo' END AS CalidadCandidato FROM CandidatosSucesion WHERE DiferenciaLiderazgo = (SELECT MIN(cs2.DiferenciaLiderazgo) FROM CandidatosSucesion cs2 WHERE cs2.LiderActual = CandidatosSucesion.LiderActual) UNION ALL SELECT 'ANÁLISIS GLOBAL' AS LiderActual, NULL AS EdadLider, RolLider, 'Todo el asentamiento' AS Base, NULL AS PosibleSucesor, NULL AS EdadSucesor, NULL AS RolSucesor, NULL AS DiferenciaLiderazgo, EstadoSucesion AS TipoSucesion, CASE WHEN EstadoSucesion LIKE '%CRISIS%' THEN '🔴 Intervención urgente' WHEN EstadoSucesion LIKE '%RIESGO%' THEN '🟡 Planificación necesaria' ELSE '🟢 Situación controlada' END AS CalidadCandidato FROM AnalisisCriticidad ORDER BY CASE WHEN LiderActual = 'ANÁLISIS GLOBAL' THEN 1 ELSE 0 END, DiferenciaLiderazgo;",
    pista: "Análisis de sucesión ultra-complejo: evalúa liderazgo actual, identifica candidatos, analiza gaps generacionales y riesgos de continuidad",
    puntos: 50,
    videoUrl: "https://www.youtube.com/shorts/GX_u6MhiMxs"
  },
  {
    id: 59,
    fase: 5,
    nivel: "Maestro",
    titulo: "🌍 Modelado de expansión territorial",
    descripcion: "Simular la expansión territorial óptima basándose en recursos, población y posición estratégica",
    consulta_sugerida: "WITH BasesDatos AS (SELECT b.BaseID, b.Nombre AS Base, b.Latitud, b.Longitud, b.TipoBase, b.Capacidad, COUNT(s.SurvivorID) AS PoblacionActual, COALESCE(r.ComidaRaciones + r.AguaLitros + r.Armas + r.Medicinas, 0) AS RecursosTotales FROM Bases b LEFT JOIN Survivors s ON b.BaseID = s.BaseID LEFT JOIN Resources r ON b.BaseID = r.BaseID GROUP BY b.BaseID, b.Nombre, b.Latitud, b.Longitud, b.TipoBase, b.Capacidad, r.ComidaRaciones, r.AguaLitros, r.Armas, r.Medicinas), ZonasExpansion AS (SELECT bd.Base AS BaseReferencia, bd.Latitud + 1 AS NuevaLatitud, bd.Longitud + 1 AS NuevaLongitud, 'Noreste de ' + bd.Base AS NombreZona, bd.PoblacionActual, bd.RecursosTotales, SQRT(POWER(bd.Latitud + 1 - (SELECT AVG(Latitud) FROM BasesDatos), 2) + POWER(bd.Longitud + 1 - (SELECT AVG(Longitud) FROM BasesDatos), 2)) AS DistanciaAlCentroRed FROM BasesDatos bd WHERE bd.TipoBase = 'Humana' AND bd.PoblacionActual > 0 UNION ALL SELECT bd.Base AS BaseReferencia, bd.Latitud - 1 AS NuevaLatitud, bd.Longitud - 1 AS NuevaLongitud, 'Suroeste de ' + bd.Base AS NombreZona, bd.PoblacionActual, bd.RecursosTotales, SQRT(POWER(bd.Latitud - 1 - (SELECT AVG(Latitud) FROM BasesDatos), 2) + POWER(bd.Longitud - 1 - (SELECT AVG(Longitud) FROM BasesDatos), 2)) AS DistanciaAlCentroRed FROM BasesDatos bd WHERE bd.TipoBase = 'Humana' AND bd.PoblacionActual > 0), EvaluacionExpansion AS (SELECT BaseReferencia, NombreZona, NuevaLatitud, NuevaLongitud, PoblacionActual, RecursosTotales, ROUND(DistanciaAlCentroRed, 4) AS DistanciaAlCentro, (PoblacionActual * 20 + RecursosTotales / 10.0 - DistanciaAlCentroRed * 15) AS PuntuacionViabilidad, CASE WHEN (PoblacionActual * 20 + RecursosTotales / 10.0 - DistanciaAlCentroRed * 15) > 100 THEN '🟢 Expansión altamente viable' WHEN (PoblacionActual * 20 + RecursosTotales / 10.0 - DistanciaAlCentroRed * 15) > 50 THEN '🟡 Expansión viable con riesgos' WHEN (PoblacionActual * 20 + RecursosTotales / 10.0 - DistanciaAlCentroRed * 15) > 0 THEN '🟠 Expansión arriesgada' ELSE '🔴 Expansión no recomendada' END AS RecomendacionExpansion, CASE WHEN DistanciaAlCentro < 2 THEN 'Zona central estratégica' WHEN DistanciaAlCentro < 4 THEN 'Zona intermedia' ELSE 'Zona periférica' END AS ClasificacionEstrategica FROM ZonasExpansion), PlanExpansionGlobal AS (SELECT COUNT(*) AS ZonasEvaluadas, COUNT(CASE WHEN RecomendacionExpansion LIKE '%viable%' THEN 1 END) AS ZonasViables, AVG(PuntuacionViabilidad) AS ViabilidadPromedio, MAX(PuntuacionViabilidad) AS MejorViabilidad, MIN(PuntuacionViabilidad) AS PeorViabilidad FROM EvaluacionExpansion) SELECT BaseReferencia, NombreZona, NuevaLatitud, NuevaLongitud, ROUND(PuntuacionViabilidad, 2) AS PuntuacionViabilidad, RecomendacionExpansion, ClasificacionEstrategica, CASE WHEN PuntuacionViabilidad = (SELECT MejorViabilidad FROM PlanExpansionGlobal) THEN '⭐ PRIORIDAD MÁXIMA' WHEN PuntuacionViabilidad > (SELECT ViabilidadPromedio FROM PlanExpansionGlobal) THEN '🔥 Alta prioridad' ELSE '📋 Considerar más adelante' END AS PrioridadExpansion FROM EvaluacionExpansion UNION ALL SELECT 'PLAN MAESTRO' AS BaseReferencia, 'Expansión territorial global' AS NombreZona, NULL AS NuevaLatitud, NULL AS NuevaLongitud, ViabilidadPromedio AS PuntuacionViabilidad, CASE WHEN (ZonasViables * 100.0 / ZonasEvaluadas) > 50 THEN '🟢 Expansión territorial recomendada' WHEN (ZonasViables * 100.0 / ZonasEvaluadas) > 25 THEN '🟡 Expansión selectiva recomendada' ELSE '🔴 Consolidación antes que expansión' END AS RecomendacionExpansion, CAST(ZonasViables AS VARCHAR) + '/' + CAST(ZonasEvaluadas AS VARCHAR) + ' zonas viables (' + CAST(ROUND(ZonasViables * 100.0 / ZonasEvaluadas, 1) AS VARCHAR) + '%)' AS ClasificacionEstrategica, CASE WHEN MejorViabilidad > 100 THEN '🟢 Oportunidades excelentes disponibles' ELSE '🟡 Expansión conservadora recomendada' END AS PrioridadExpansion FROM PlanExpansionGlobal ORDER BY PuntuacionViabilidad DESC;",
    pista: "Modelado territorial mega-complejo: evalúa múltiples zonas de expansión, calcula viabilidad basada en población+recursos-distancia, prioriza por potencial estratégico",
    puntos: 60,
    videoUrl: "https://www.youtube.com/shorts/GX_u6MhiMxs"
  },
  {
    id: 60,
    fase: 5,
    nivel: "Maestro",
    titulo: "🏆 Gran Simulación: El futuro de Atapuerca",
    descripcion: "Análisis predictivo integral que integra todos los aspectos para modelar el futuro del asentamiento a 5 años",
    consulta_sugerida: "WITH BaselineActual AS (SELECT COUNT(DISTINCT b.BaseID) AS BasesTotales, COUNT(DISTINCT s.SurvivorID) AS SupervivientesTotales, SUM(COALESCE(r.ComidaRaciones + r.AguaLitros + r.Armas + r.Medicinas, 0)) AS RecursosTotales, AVG(CAST(s.Edad AS FLOAT)) AS EdadPromedio, COUNT(CASE WHEN s.Rol IN ('Comandante', 'Médica') THEN 1 END) AS LiderazgoTotal FROM Bases b LEFT JOIN Survivors s ON b.BaseID = s.BaseID LEFT JOIN Resources r ON b.BaseID = r.BaseID), ProyeccionDemografica AS (SELECT ba.SupervivientesTotales, ba.EdadPromedio, ba.LiderazgoTotal, CASE WHEN ba.EdadPromedio < 30 THEN ba.SupervivientesTotales * 1.3 WHEN ba.EdadPromedio < 40 THEN ba.SupervivientesTotales * 1.1 ELSE ba.SupervivientesTotales * 0.9 END AS PoblacionProyectada5Anos, CASE WHEN ba.EdadPromedio < 30 THEN 'Crecimiento demográfico' WHEN ba.EdadPromedio < 40 THEN 'Estabilidad demográfica' ELSE 'Declive demográfico' END AS TendenciaDemografica FROM BaselineActual ba), ProyeccionRecursos AS (SELECT ba.RecursosTotales, ba.SupervivientesTotales, CASE WHEN ba.RecursosTotales / CAST(ba.SupervivientesTotales AS FLOAT) > 200 THEN ba.RecursosTotales * 1.2 WHEN ba.RecursosTotales / CAST(ba.SupervivientesTotales AS FLOAT) > 100 THEN ba.RecursosTotales * 1.0 ELSE ba.RecursosTotales * 0.8 END AS RecursosProyectados5Anos, CASE WHEN ba.RecursosTotales / CAST(ba.SupervivientesTotales AS FLOAT) > 200 THEN 'Abundancia sostenible' WHEN ba.RecursosTotales / CAST(ba.SupervivientesTotales AS FLOAT) > 100 THEN 'Equilibrio precario' ELSE 'Escasez creciente' END AS TendenciaRecursos FROM BaselineActual ba), AnalisisLiderazgo AS (SELECT ba.LiderazgoTotal, ba.SupervivientesTotales, CASE WHEN ba.LiderazgoTotal / CAST(ba.SupervivientesTotales AS FLOAT) > 0.3 THEN 'Liderazgo sólido' WHEN ba.LiderazgoTotal / CAST(ba.SupervivientesTotales AS FLOAT) > 0.1 THEN 'Liderazgo suficiente' ELSE 'Crisis de liderazgo' END AS EstadoLiderazgo, CASE WHEN ba.LiderazgoTotal >= 2 THEN ba.LiderazgoTotal + 1 ELSE ba.LiderazgoTotal END AS LiderazgoProyectado5Anos FROM BaselineActual ba), EscenariosFuturos AS (SELECT pd.PoblacionProyectada5Anos, pr.RecursosProyectados5Anos, al.LiderazgoProyectado5Anos, pd.TendenciaDemografica, pr.TendenciaRecursos, al.EstadoLiderazgo, CASE WHEN pd.TendenciaDemografica = 'Crecimiento demográfico' AND pr.TendenciaRecursos = 'Abundancia sostenible' AND al.EstadoLiderazgo = 'Liderazgo sólido' THEN '🟢 GOLDEN AGE - Prosperidad total' WHEN pd.TendenciaDemografica != 'Declive demográfico' AND pr.TendenciaRecursos != 'Escasez creciente' AND al.EstadoLiderazgo != 'Crisis de liderazgo' THEN '🟡 ESTABILIDAD - Supervivencia asegurada' WHEN pd.TendenciaDemografica = 'Declive demográfico' OR pr.TendenciaRecursos = 'Escasez creciente' OR al.EstadoLiderazgo = 'Crisis de liderazgo' THEN '🟠 DESAFÍOS - Supervivencia incierta' ELSE '🔴 COLAPSO - Extinción probable' END AS EscenarioFuturo, (pd.PoblacionProyectada5Anos * 10 + pr.RecursosProyectados5Anos / 50.0 + al.LiderazgoProyectado5Anos * 100) AS PuntuacionSupervivencia5Anos FROM ProyeccionDemografica pd CROSS JOIN ProyeccionRecursos pr CROSS JOIN AnalisisLiderazgo al), RecomendacionesEstrategicas AS (SELECT ef.EscenarioFuturo, ef.PuntuacionSupervivencia5Anos, CASE WHEN ef.EscenarioFuturo LIKE '%GOLDEN AGE%' THEN 'Expandir territorio, establecer nuevas bases, liderar región' WHEN ef.EscenarioFuturo LIKE '%ESTABILIDAD%' THEN 'Consolidar recursos, formar alianzas, crecimiento moderado' WHEN ef.EscenarioFuturo LIKE '%DESAFÍOS%' THEN 'Modo supervivencia, conservar recursos, fortalecer defensas' ELSE 'Evacuar población, buscar refugio, medidas desesperadas' END AS EstrategiaRecomendada, CASE WHEN ef.PuntuacionSupervivencia5Anos > 1000 THEN 'Civilización próspera' WHEN ef.PuntuacionSupervivencia5Anos > 500 THEN 'Asentamiento estable' WHEN ef.PuntuacionSupervivencia5Anos > 200 THEN 'Supervivencia básica' ELSE 'Extinción inminente' END AS DestinoFinal FROM EscenariosFuturos ef) SELECT 'PROYECCIÓN 2030' AS Categoria, 'Población: ' + CAST(ROUND(pd.PoblacionProyectada5Anos, 0) AS VARCHAR) + ' | Recursos: ' + CAST(ROUND(pr.RecursosProyectados5Anos, 0) AS VARCHAR) + ' | Líderes: ' + CAST(al.LiderazgoProyectado5Anos AS VARCHAR) AS DatosProyectados, ef.EscenarioFuturo AS Evaluacion, re.EstrategiaRecomendada AS AccionRequerida, re.DestinoFinal AS ResultadoFinal FROM ProyeccionDemografica pd CROSS JOIN ProyeccionRecursos pr CROSS JOIN AnalisisLiderazgo al CROSS JOIN EscenariosFuturos ef CROSS JOIN RecomendacionesEstrategicas re UNION ALL SELECT 'ESTADO ACTUAL' AS Categoria, 'Población: ' + CAST(ba.SupervivientesTotales AS VARCHAR) + ' | Recursos: ' + CAST(ba.RecursosTotales AS VARCHAR) + ' | Líderes: ' + CAST(ba.LiderazgoTotal AS VARCHAR) AS DatosProyectados, pd.TendenciaDemografica + ' | ' + pr.TendenciaRecursos + ' | ' + al.EstadoLiderazgo AS Evaluacion, 'Análisis base para proyecciones futuras' AS AccionRequerida, 'Punto de partida para simulación' AS ResultadoFinal FROM BaselineActual ba CROSS JOIN ProyeccionDemografica pd CROSS JOIN ProyeccionRecursos pr CROSS JOIN AnalisisLiderazgo al ORDER BY CASE WHEN Categoria = 'ESTADO ACTUAL' THEN 1 ELSE 2 END;",
    pista: "La consulta más compleja del sistema: integra demografía, recursos, liderazgo para proyectar escenarios futuros a 5 años con estrategias específicas",
    puntos: 100,
    videoUrl: "https://www.youtube.com/shorts/GX_u6MhiMxs"
  },
  {
    id: 61,
    fase: 2,
    nivel: "Intermedio",
    titulo: "🤖 Catálogo de amenazas robóticas",
    descripcion: "Clasificar y analizar todos los tipos de robots por nivel de peligro",
    consulta_sugerida: "SELECT r.Modelo, r.Generacion, r.Funciones, r.NivelAmenaza, CASE WHEN r.NivelAmenaza >= 9 THEN '🔴 CRÍTICO' WHEN r.NivelAmenaza >= 7 THEN '🟠 ALTO' WHEN r.NivelAmenaza >= 5 THEN '🟡 MEDIO' ELSE '🟢 BAJO' END AS ClasificacionRiesgo FROM Robots r ORDER BY r.NivelAmenaza DESC, r.Generacion DESC;",
    pista: "Usa la tabla Robots. Analiza el nivel de amenaza para clasificar el riesgo. Los robots más modernos suelen ser más peligrosos",
    puntos: 15,
    videoUrl: "https://www.youtube.com/shorts/GX_u6MhiMxs"
  },
  {
    id: 62,
    fase: 2,
    nivel: "Intermedio", 
    titulo: "💥 Historial de ataques por base",
    descripcion: "Identificar qué bases han sufrido más ataques y bajas",
    consulta_sugerida: "SELECT b.Nombre AS Base, COUNT(a.AttackID) AS TotalAtaques, SUM(a.Muertos) AS TotalMuertos, MAX(a.Fecha) AS UltimoAtaque, STRING_AGG(a.TipoRobot, ', ') AS RobotsAgresores FROM Bases b LEFT JOIN Attacks a ON b.BaseID = a.BaseID GROUP BY b.BaseID, b.Nombre ORDER BY TotalAtaques DESC, TotalMuertos DESC;",
    pista: "Usa JOIN entre Bases y Attacks. STRING_AGG concatena los tipos de robots. Ordena por mayor cantidad de ataques",
    puntos: 20,
    videoUrl: "https://www.youtube.com/shorts/GX_u6MhiMxs"
  },
  {
    id: 63,
    fase: 3,
    nivel: "Avanzado",
    titulo: "🎯 Eficiencia de misiones por alianza",
    descripcion: "Comparar el éxito de misiones entre bases aliadas vs independientes",
    consulta_sugerida: "SELECT CASE WHEN EXISTS (SELECT 1 FROM Alliances al WHERE (al.BaseID1 = m.OrigenID AND al.BaseID2 = m.DestinoID) OR (al.BaseID1 = m.DestinoID AND al.BaseID2 = m.OrigenID)) THEN 'Misión entre Aliados' ELSE 'Misión Independiente' END AS TipoCooperacion, COUNT(*) AS TotalMisiones, SUM(CASE WHEN Estado = 'Completada' THEN 1 ELSE 0 END) AS MisionesExitosas, ROUND(SUM(CASE WHEN Estado = 'Completada' THEN 1 ELSE 0 END) * 100.0 / COUNT(*), 2) AS PorcentajeExito FROM Missions m GROUP BY CASE WHEN EXISTS (SELECT 1 FROM Alliances al WHERE (al.BaseID1 = m.OrigenID AND al.BaseID2 = m.DestinoID) OR (al.BaseID1 = m.DestinoID AND al.BaseID2 = m.OrigenID)) THEN 'Misión entre Aliados' ELSE 'Misión Independiente' END;",
    pista: "Usa EXISTS para verificar alianzas entre origen y destino. Calcula porcentaje de éxito comparando estados 'Completada'",
    puntos: 30,
    videoUrl: "https://www.youtube.com/shorts/GX_u6MhiMxs"
  },
  {
    id: 64,
    fase: 3,
    nivel: "Avanzado",
    titulo: "👁️ Correlación avistamientos-ataques", 
    descripcion: "Detectar patrones temporales entre avistamientos de robots y ataques posteriores",
    consulta_sugerida: "WITH AvistamientosAmenaza AS (SELECT rs.BaseID, rs.Fecha AS FechaAvistamiento, rs.TipoRobot, rs.NivelAmenaza, b.Nombre AS Base FROM RobotSightings rs JOIN Bases b ON rs.BaseID = b.BaseID WHERE rs.NivelAmenaza >= 7) SELECT av.Base, av.FechaAvistamiento, av.TipoRobot AS RobotAvistado, av.NivelAmenaza, a.Fecha AS FechaAtaque, a.TipoRobot AS RobotAtacante, a.Muertos, DATEDIFF(day, av.FechaAvistamiento, a.Fecha) AS DiasDeWarning, CASE WHEN DATEDIFF(day, av.FechaAvistamiento, a.Fecha) BETWEEN 0 AND 3 THEN '🔴 Ataque Inmediato' WHEN DATEDIFF(day, av.FechaAvistamiento, a.Fecha) BETWEEN 4 AND 7 THEN '🟡 Ataque Próximo' ELSE '🟢 Sin Correlación Directa' END AS PatronTemporal FROM AvistamientosAmenaza av JOIN Attacks a ON av.BaseID = a.BaseID WHERE a.Fecha >= av.FechaAvistamiento AND DATEDIFF(day, av.FechaAvistamiento, a.Fecha) <= 10 ORDER BY DiasDeWarning, av.NivelAmenaza DESC;",
    pista: "CTE para filtrar avistamientos peligrosos, luego JOIN con ataques. DATEDIFF calcula días entre eventos",
    puntos: 35,
    videoUrl: "https://www.youtube.com/shorts/GX_u6MhiMxs"
  },
  {
    id: 65,
    fase: 4,
    nivel: "Experto",
    titulo: "📦 Red de suministros inteligente",
    descripcion: "Análisis logístico de necesidades vs suministros entregados por base",
    consulta_sugerida: "WITH NecesidadRecursos AS (SELECT b.BaseID, b.Nombre AS Base, COUNT(s.SurvivorID) AS Personal, COALESCE(r.ComidaRaciones, 0) AS ComidaActual, COALESCE(r.Medicinas, 0) AS MedicinasActuales, COUNT(s.SurvivorID) * 100 AS ComidaNecesaria, COUNT(s.SurvivorID) * 20 AS MedicinasNecesarias FROM Bases b LEFT JOIN Survivors s ON b.BaseID = s.BaseID LEFT JOIN Resources r ON b.BaseID = r.BaseID GROUP BY b.BaseID, b.Nombre, r.ComidaRaciones, r.Medicinas), SuministrosRecientes AS (SELECT su.BaseID, su.Tipo, SUM(su.Cantidad) AS CantidadEntregada, MAX(su.FechaEntrega) AS UltimaEntrega FROM Supplies su WHERE su.FechaEntrega >= '2025-07-01' GROUP BY su.BaseID, su.Tipo) SELECT nr.Base, nr.Personal, nr.ComidaActual, nr.ComidaNecesaria, (nr.ComidaActual - nr.ComidaNecesaria) AS DeficitComida, nr.MedicinasActuales, nr.MedicinasNecesarias, (nr.MedicinasActuales - nr.MedicinasNecesarias) AS DeficitMedicinas, COALESCE(src.CantidadEntregada, 0) AS SuministrosRecibidos, src.UltimaEntrega, CASE WHEN (nr.ComidaActual - nr.ComidaNecesaria) < -50 OR (nr.MedicinasActuales - nr.MedicinasNecesarias) < -10 THEN '🔴 CRISIS - Necesita suministros urgentes' WHEN (nr.ComidaActual - nr.ComidaNecesaria) < 0 OR (nr.MedicinasActuales - nr.MedicinasNecesarias) < 0 THEN '🟡 RIESGO - Suministros insuficientes' ELSE '🟢 ESTABLE - Suministros adecuados' END AS EstadoLogistico FROM NecesidadRecursos nr LEFT JOIN SuministrosRecientes src ON nr.BaseID = src.BaseID ORDER BY DeficitComida, DeficitMedicinas;",
    pista: "Dos CTEs: una calcula necesidades basadas en personal, otra suma suministros recientes. Compara deficit vs entregas",
    puntos: 40,
    videoUrl: "https://www.youtube.com/shorts/GX_u6MhiMxs"
  },
  {
    id: 66,
    fase: 4,
    nivel: "Experto",
    titulo: "🗺️ Análisis de rutas estratégicas",
    descripcion: "Optimizar rutas usando la matriz de distancias y evaluar su uso en misiones",
    consulta_sugerida: "SELECT bo.Nombre AS Origen, bd.Nombre AS Destino, dm.Kilometros, CASE WHEN dm.Kilometros <= 50 THEN '🟢 Corta' WHEN dm.Kilometros <= 100 THEN '🟡 Media' ELSE '🔴 Larga' END AS TipoRuta, COUNT(m.MissionID) AS MisionesRealizadas, CASE WHEN COUNT(m.MissionID) > 0 THEN 'Ruta Activa' ELSE 'Ruta Potencial' END AS EstadoUso, CASE WHEN COUNT(m.MissionID) > 0 THEN ROUND(SUM(CASE WHEN m.Estado = 'Completada' THEN 1 ELSE 0 END) * 100.0 / COUNT(m.MissionID), 2) ELSE 0 END AS PorcentajeExitoRuta FROM DistanceMatrix dm JOIN Bases bo ON dm.IDOrigen = bo.BaseID JOIN Bases bd ON dm.IDDestino = bd.BaseID LEFT JOIN Missions m ON dm.IDOrigen = m.OrigenID AND dm.IDDestino = m.DestinoID GROUP BY bo.BaseID, bo.Nombre, bd.BaseID, bd.Nombre, dm.Kilometros ORDER BY MisionesRealizadas DESC, dm.Kilometros;",
    pista: "Une DistanceMatrix con Bases (dos veces) y Missions. Calcula éxito por ruta y clasifica distancias",
    puntos: 35,
    videoUrl: "https://www.youtube.com/shorts/GX_u6MhiMxs"
  },
  {
    id: 67,
    fase: 5,
    nivel: "Maestro",
    titulo: "🏆 Índice de seguridad integral",
    descripcion: "Evaluación completa de seguridad usando 6 tablas: personal, ataques, avistamientos, alianzas, armamento",
    consulta_sugerida: "WITH BaseSeguridad AS (SELECT b.BaseID, b.Nombre AS Base, COUNT(DISTINCT s.SurvivorID) AS Personal, COUNT(DISTINCT a.AttackID) AS AtaquesRecibidos, COUNT(DISTINCT rs.SightingID) AS AvistamientosRobots, COUNT(DISTINCT al.AllianceID) AS AlianzasActivas, COALESCE(r.Armas, 0) AS Armamento, MAX(a.Fecha) AS UltimoAtaque, MAX(rs.NivelAmenaza) AS MaxAmenazaDetectada FROM Bases b LEFT JOIN Survivors s ON b.BaseID = s.BaseID LEFT JOIN Attacks a ON b.BaseID = a.BaseID LEFT JOIN RobotSightings rs ON b.BaseID = rs.BaseID LEFT JOIN Alliances al ON b.BaseID = al.BaseID1 OR b.BaseID = al.BaseID2 LEFT JOIN Resources r ON b.BaseID = r.BaseID GROUP BY b.BaseID, b.Nombre, r.Armas) SELECT Base, Personal, AtaquesRecibidos, AvistamientosRobots, AlianzasActivas, Armamento, UltimoAtaque, COALESCE(MaxAmenazaDetectada, 0) AS AmenazaMaxima, ROUND(GREATEST(0, LEAST(100, (Personal * 15) + (AlianzasActivas * 20) + (Armamento / 10.0) - (AtaquesRecibidos * 15) - (AvistamientosRobots * 5) - (COALESCE(MaxAmenazaDetectada, 0) * 2))), 2) AS IndiceSeguridadIntegral, CASE WHEN ROUND(GREATEST(0, LEAST(100, (Personal * 15) + (AlianzasActivas * 20) + (Armamento / 10.0) - (AtaquesRecibidos * 15) - (AvistamientosRobots * 5) - (COALESCE(MaxAmenazaDetectada, 0) * 2))), 2) >= 80 THEN '🟢 FORTALEZA SEGURA' WHEN ROUND(GREATEST(0, LEAST(100, (Personal * 15) + (AlianzasActivas * 20) + (Armamento / 10.0) - (AtaquesRecibidos * 15) - (AvistamientosRobots * 5) - (COALESCE(MaxAmenazaDetectada, 0) * 2))), 2) >= 60 THEN '🟡 DEFENSA ACEPTABLE' WHEN ROUND(GREATEST(0, LEAST(100, (Personal * 15) + (AlianzasActivas * 20) + (Armamento / 10.0) - (AtaquesRecibidos * 15) - (AvistamientosRobots * 5) - (COALESCE(MaxAmenazaDetectada, 0) * 2))), 2) >= 40 THEN '🟠 EN RIESGO' ELSE '🔴 CRÍTICO' END AS ClasificacionSeguridad FROM BaseSeguridad ORDER BY IndiceSeguridadIntegral DESC;",
    pista: "CTE que une 6 tablas para calcular factores de seguridad. Fórmula: suma factores positivos, resta amenazas",
    puntos: 50,
    videoUrl: "https://www.youtube.com/shorts/GX_u6MhiMxs"
  },
  {
    id: 68,
    fase: 5,
    nivel: "Maestro",
    titulo: "🌐 Matriz de poder e influencia",
    descripcion: "Análisis supremo usando todas las 10 tablas para determinar la jerarquía de poder entre bases",
    consulta_sugerida: "WITH PoderMilitar AS (SELECT b.BaseID, b.Nombre AS Base, COUNT(DISTINCT s.SurvivorID) AS Personal, COUNT(CASE WHEN s.Rol = 'Comandante' THEN 1 END) AS Comandantes, COALESCE(r.Armas, 0) AS Armamento, COUNT(DISTINCT su.SupplyID) AS SuministrosRecibidos FROM Bases b LEFT JOIN Survivors s ON b.BaseID = s.BaseID LEFT JOIN Resources r ON b.BaseID = r.BaseID LEFT JOIN Supplies su ON b.BaseID = su.BaseID GROUP BY b.BaseID, b.Nombre, r.Armas), InfluenciaEstrategica AS (SELECT b.BaseID, COUNT(DISTINCT al.AllianceID) AS AlianzasActivas, COUNT(DISTINCT m.MissionID) AS MisionesLideradas, AVG(CAST(al.NivelConfianza AS FLOAT)) AS ConfianzaPromedio FROM Bases b LEFT JOIN Alliances al ON b.BaseID = al.BaseID1 OR b.BaseID = al.BaseID2 LEFT JOIN Missions m ON b.BaseID = m.OrigenID GROUP BY b.BaseID), VulnerabilidadOperacional AS (SELECT b.BaseID, COUNT(DISTINCT a.AttackID) AS AtaquesRecibidos, COUNT(DISTINCT rs.SightingID) AS AvistamientosRobots, MAX(a.Muertos) AS MaxBajasEnAtaque, AVG(CAST(dm.Kilometros AS FLOAT)) AS DistanciaPromedioAOtrasBases FROM Bases b LEFT JOIN Attacks a ON b.BaseID = a.BaseID LEFT JOIN RobotSightings rs ON b.BaseID = rs.BaseID LEFT JOIN DistanceMatrix dm ON b.BaseID = dm.IDOrigen GROUP BY b.BaseID) SELECT pm.Base, pm.Personal, pm.Comandantes, pm.Armamento, ie.AlianzasActivas, ie.MisionesLideradas, COALESCE(ie.ConfianzaPromedio, 0) AS ConfianzaPromedio, vo.AtaquesRecibidos, vo.AvistamientosRobots, COALESCE(vo.MaxBajasEnAtaque, 0) AS MaxBajas, ROUND(COALESCE(vo.DistanciaPromedioAOtrasBases, 0), 2) AS DistanciaPromedio, ROUND((pm.Personal * 30) + (pm.Comandantes * 50) + (pm.Armamento / 2.0) + (ie.AlianzasActivas * 40) + (ie.MisionesLideradas * 25) + (COALESCE(ie.ConfianzaPromedio, 0) * 10) + (pm.SuministrosRecibidos * 15) - (vo.AtaquesRecibidos * 20) - (vo.AvistamientosRobots * 10) - (COALESCE(vo.MaxBajasEnAtaque, 0) * 30), 2) AS IndicePoder, CASE WHEN ((pm.Personal * 30) + (pm.Comandantes * 50) + (pm.Armamento / 2.0) + (ie.AlianzasActivas * 40) + (ie.MisionesLideradas * 25) + (COALESCE(ie.ConfianzaPromedio, 0) * 10) + (pm.SuministrosRecibidos * 15) - (vo.AtaquesRecibidos * 20) - (vo.AvistamientosRobots * 10) - (COALESCE(vo.MaxBajasEnAtaque, 0) * 30)) >= 500 THEN '👑 POTENCIA HEGEMÓNICA' WHEN ((pm.Personal * 30) + (pm.Comandantes * 50) + (pm.Armamento / 2.0) + (ie.AlianzasActivas * 40) + (ie.MisionesLideradas * 25) + (COALESCE(ie.ConfianzaPromedio, 0) * 10) + (pm.SuministrosRecibidos * 15) - (vo.AtaquesRecibidos * 20) - (vo.AvistamientosRobots * 10) - (COALESCE(vo.MaxBajasEnAtaque, 0) * 30)) >= 300 THEN '🏆 POTENCIA REGIONAL' WHEN ((pm.Personal * 30) + (pm.Comandantes * 50) + (pm.Armamento / 2.0) + (ie.AlianzasActivas * 40) + (ie.MisionesLideradas * 25) + (COALESCE(ie.ConfianzaPromedio, 0) * 10) + (pm.SuministrosRecibidos * 15) - (vo.AtaquesRecibidos * 20) - (vo.AvistamientosRobots * 10) - (COALESCE(vo.MaxBajasEnAtaque, 0) * 30)) >= 100 THEN '🛡️ ACTOR RELEVANTE' ELSE '💀 BASE IRRELEVANTE' END AS ClasificacionPoder FROM PoderMilitar pm JOIN InfluenciaEstrategica ie ON pm.BaseID = ie.BaseID JOIN VulnerabilidadOperacional vo ON pm.BaseID = vo.BaseID ORDER BY IndicePoder DESC;",
    pista: "Tres CTEs para diferentes aspectos del poder. Fórmula integral que suma factores positivos y resta vulnerabilidades",
    puntos: 80,
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

// Función para verificar si una consulta es correcta con DATOS REALES
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

        // Usar el dataLoader para verificar con datos reales
        if (window.atapuercaData && window.atapuercaData.cargaCompleta) {
            const resultado = await window.atapuercaData.verificarConsultaReal(consulta, retoId);
            return resultado;
        } else {
            // Si no hay datos cargados, usar verificación básica
            const reto = retos.find(r => r.id === retoId);
            if (!reto) {
                return {
                    success: false,
                    error: "Reto no encontrado"
                };
            }

            // Simulación básica de verificación
            return {
                success: true,
                data: "Consulta ejecutada correctamente (simulación)",
                mensaje: "✅ ¡Excelente! Consulta SQL válida detectada.",
                puntos: reto.puntos
            };
        }

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
    // Verificar si está en modo desarrollador
    const modoDesarrollador = localStorage.getItem('modoDesarrollador') === 'true';
    
    if (modoDesarrollador) {
        return true; // En modo desarrollador, todos los retos están desbloqueados
    }
    
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
    if (confirm('🔄 ¿Estás seguro de que quieres RESETEAR TODO el progreso?\n\n⚠️ Esto eliminará:\n• Todos los retos completados\n• Todos los puntos ganados\n• El progreso guardado\n• El modo desarrollador (si está activo)\n\n❌ Esta acción NO se puede deshacer.')) {
        retoActual = 1;
        puntosTotal = 0;
        retosCompletados = [];
        localStorage.removeItem('progresoAtapuerca');
        localStorage.removeItem('modoDesarrollador');
        
        alert('✅ Progreso completamente reseteado.\nLa interfaz se actualizará.');
        cargarRetos(); // Actualizar interfaz inmediatamente
    }
}

// Función para desbloquear todos los retos
function desbloquearTodosLosRetos() {
    if (confirm('🔓 ¿Estás seguro de que quieres desbloquear TODOS los 68 retos?\n\nEsto te permitirá acceder a cualquier reto sin completar los anteriores.\n\n⚠️ Nota: Mantiene tus puntos y retos completados actuales.')) {
        // Marcar todos los retos como completados para desbloquearlos
        retosCompletados = [];
        for (let i = 1; i <= 68; i++) {
            retosCompletados.push(i);
        }
        
        // Calcular puntos totales si se completan todos los retos
        puntosTotal = retos.reduce((total, reto) => total + reto.puntos, 0);
        
        // Guardar progreso
        guardarProgreso();
        
        // Mostrar confirmación
        alert('🎉 ¡TODOS LOS RETOS DESBLOQUEADOS!\n\n' +
              '✅ 68 retos disponibles\n' +
              '🏆 ' + puntosTotal + ' puntos totales\n' +
              '🚀 Ahora puedes acceder a cualquier reto\n\n' +
              'La página se actualizará para mostrar todos los retos disponibles.');
        
        // Actualizar la interfaz inmediatamente
        cargarRetos();
    }
}

// Función para modo desarrollador (desbloquear sin marcar como completados)
function modoDesarrollador() {
    const modoActivo = localStorage.getItem('modoDesarrollador') === 'true';
    
    if (modoActivo) {
        // Si ya está activo, preguntar si quiere desactivarlo
        if (confirm('🛠️ MODO DESARROLLADOR ACTIVO\n\n¿Desactivar el modo desarrollador?\n\nEsto volverá a mostrar solo los retos que realmente has completado.')) {
            localStorage.removeItem('modoDesarrollador');
            alert('✅ Modo desarrollador desactivado.\nLa interfaz se actualizará para mostrar tu progreso real.');
            cargarRetos(); // Actualizar interfaz inmediatamente
        }
    } else {
        // Si no está activo, activarlo
        if (confirm('🛠️ MODO DESARROLLADOR\n\n¿Activar modo desarrollador?\n\nEsto desbloqueará todos los retos SIN marcarlos como completados, perfecto para testing y desarrollo.\n\n⚠️ No afecta tu progreso actual.')) {
            localStorage.setItem('modoDesarrollador', 'true');
            
            alert('🛠️ ¡MODO DESARROLLADOR ACTIVADO!\n\n' +
                  '✅ Todos los retos desbloqueados para testing\n' +
                  '📊 Tu progreso real se mantiene intacto\n' +
                  '🔄 Usa este botón nuevamente para desactivarlo\n\n' +
                  'La interfaz se actualizará.');
            
            cargarRetos(); // Actualizar interfaz inmediatamente
        }
    }
}

// Inicializar el sistema al cargar
document.addEventListener('DOMContentLoaded', function() {
    cargarProgreso();
    cargarRetos(); // ¡Esta llamada faltaba!
    console.log('Sistema de retos Atapuerca cargado - Progreso actual:', obtenerEstadisticas());
});

// ========================================
// FUNCIÓN DE VERIFICACIÓN DE RETOS
// ========================================
function verificarReto(consultaEjecutada, resultados) {
    if (!consultaEjecutada || !resultados) {
        return { completado: false, mensaje: "" };
    }

    const retoActualObj = retos.find(r => r.id === retoActual);
    if (!retoActualObj) {
        return { completado: false, mensaje: "" };
    }

    // Normalizar la consulta ejecutada
    const queryNormalizada = consultaEjecutada.toLowerCase()
        .replace(/\s+/g, ' ')
        .trim()
        .replace(/;$/, '');

    // Verificación específica por ID de reto
    let cumpleRequisitos = false;

    switch (retoActualObj.id) {
        // FASE 1 - BÁSICO (1-10)
        case 1:
            cumpleRequisitos = queryNormalizada.includes('select') && 
                               queryNormalizada.includes('from bases') &&
                               resultados.length === 8; // Ahora hay 8 bases
            break;
        case 2:
            cumpleRequisitos = (queryNormalizada.includes('select nombre') || queryNormalizada.includes('select\nnombre')) && 
                               queryNormalizada.includes('tipobase') &&
                               queryNormalizada.includes('order by') &&
                               resultados.length === 8; // Ahora hay 8 bases
            break;
        case 3:
            cumpleRequisitos = (queryNormalizada.includes("tipobase = 'humana'") || queryNormalizada.includes('tipobase="humana"')) &&
                               resultados.length === 5; // 5 bases humanas
            break;
        case 4:
            cumpleRequisitos = queryNormalizada.includes('from survivors') &&
                               resultados.length === 8; // Ahora hay 8 supervivientes
            break;
        case 5:
            cumpleRequisitos = queryNormalizada.includes('from resources') &&
                               resultados.length === 5; // Ahora hay 5 recursos
            break;
        case 6:
            cumpleRequisitos = (queryNormalizada.includes("escomandocentral = '1'") || queryNormalizada.includes('escomandocentral="1"') || queryNormalizada.includes("escomandocentral=1")) &&
                               resultados.length === 1;
            break;
        case 7:
            cumpleRequisitos = queryNormalizada.includes('edad > 30') &&
                               resultados.length === 4; // Elena(34), Marcus(41), Hugo(39), Zara(41)
            break;
        case 8:
            cumpleRequisitos = queryNormalizada.includes('comidaraciones > 500') &&
                               resultados.length >= 2; // Fortaleza Norte (900) y Cúpula Esperanza (600)
            break;
        case 9:
            cumpleRequisitos = (queryNormalizada.includes('min') && queryNormalizada.includes('edad')) ||
                               (queryNormalizada.includes('edad') && queryNormalizada.includes('order by') && queryNormalizada.includes('limit 1')) ||
                               (queryNormalizada.includes('survivors') && queryNormalizada.includes('edad')) &&
                               resultados.length >= 1;
            break;
        case 10:
            cumpleRequisitos = queryNormalizada.includes('latitud > 0') &&
                               queryNormalizada.includes('from bases') &&
                               resultados.length >= 6; // Más bases en hemisferio norte
            break;

        // FASE 2 - TUTORIAL JOIN (11-20)
        case 11:
            cumpleRequisitos = (queryNormalizada.includes('select') && queryNormalizada.includes('from survivors')) ||
                               (queryNormalizada.includes('select') && queryNormalizada.includes('from bases')) ||
                               (queryNormalizada.includes('survivors') && queryNormalizada.includes('bases')) &&
                               resultados.length >= 1; // Flexible para aceptar cualquiera de las dos consultas
            break;
        case 12:
            cumpleRequisitos = (queryNormalizada.includes('inner join') || queryNormalizada.includes('join')) &&
                               queryNormalizada.includes('survivors') &&
                               queryNormalizada.includes('bases') &&
                               queryNormalizada.includes('baseid') &&
                               resultados.length === 6; // 6 supervivientes con base válida
            break;
        case 13:
            cumpleRequisitos = queryNormalizada.includes('left join') &&
                               queryNormalizada.includes('survivors') &&
                               queryNormalizada.includes('bases') &&
                               queryNormalizada.includes('baseid') &&
                               resultados.length === 10; // Todas las bases incluyendo repeticiones y vacías
            break;
        case 14:
            cumpleRequisitos = queryNormalizada.includes('right join') &&
                               queryNormalizada.includes('survivors') &&
                               queryNormalizada.includes('bases') &&
                               queryNormalizada.includes('baseid') &&
                               resultados.length === 8; // Todos los supervivientes, incluso huérfanos
            break;
        case 15:
            cumpleRequisitos = queryNormalizada.includes('full outer join') &&
                               queryNormalizada.includes('survivors') &&
                               queryNormalizada.includes('bases') &&
                               queryNormalizada.includes('baseid') &&
                               resultados.length === 12; // Todo: bases vacías + huérfanos + coincidencias
            break;
        case 16:
            cumpleRequisitos = queryNormalizada.includes('left join') &&
                               queryNormalizada.includes('is null') &&
                               queryNormalizada.includes('where') &&
                               resultados.length === 4; // Bases vacías: Nido Central, Torre Omega, Estación Fantasma, Centro Nexus
            break;
        case 17:
            cumpleRequisitos = queryNormalizada.includes('right join') &&
                               queryNormalizada.includes('is null') &&
                               queryNormalizada.includes('where') &&
                               resultados.length === 2; // Huérfanos: Maya Chen y Diego Morales
            break;
        case 18:
            cumpleRequisitos = queryNormalizada.includes('cross join') &&
                               queryNormalizada.includes('survivors') &&
                               queryNormalizada.includes('bases') &&
                               resultados.length === 64; // 8 bases × 8 supervivientes = 64 combinaciones
            break;
        case 19:
            cumpleRequisitos = queryNormalizada.includes('join') &&
                               queryNormalizada.includes('survivors') &&
                               queryNormalizada.includes('bases') &&
                               queryNormalizada.includes('resources') &&
                               resultados.length === 6; // Múltiples JOIN: 6 supervivientes con base y recursos
            break;
        case 20:
            cumpleRequisitos = (queryNormalizada.includes('inner join') || queryNormalizada.includes('join')) &&
                               (queryNormalizada.includes('survivors') && queryNormalizada.includes('s2')) &&
                               resultados.length === 2; // Auto-JOIN: Li+Diego (27), Marcus+Zara (41)
            break;

        // FASE 2 - INTERMEDIO (21-30) - Verificaciones específicas
        case 21:
            cumpleRequisitos = queryNormalizada.includes('join') &&
                               queryNormalizada.includes('survivors') &&
                               queryNormalizada.includes('bases') &&
                               resultados.length === 6; // 6 supervivientes con base asignada
            break;
        case 22:
            cumpleRequisitos = queryNormalizada.includes('join') &&
                               queryNormalizada.includes('resources') &&
                               queryNormalizada.includes('bases') &&
                               resultados.length >= 2;
            break;
        case 23:
            cumpleRequisitos = queryNormalizada.includes('join') &&
                               queryNormalizada.includes("escomandocentral = '1'") &&
                               resultados.length >= 1;
            break;
        case 24:
            cumpleRequisitos = queryNormalizada.includes('case when') &&
                               queryNormalizada.includes('group by') &&
                               queryNormalizada.includes('latitud') &&
                               resultados.length >= 1;
            break;
        case 25:
            cumpleRequisitos = queryNormalizada.includes('join') &&
                               queryNormalizada.includes('armas') &&
                               queryNormalizada.includes('survivors') &&
                               resultados.length >= 3;
            break;
        case 26:
            cumpleRequisitos = queryNormalizada.includes('avg') &&
                               queryNormalizada.includes('edad') &&
                               queryNormalizada.includes('group by') &&
                               resultados.length >= 2;
            break;
        case 27:
            cumpleRequisitos = queryNormalizada.includes('max') &&
                               queryNormalizada.includes('recursos') &&
                               resultados.length >= 1;
            break;
        case 28:
            cumpleRequisitos = queryNormalizada.includes('count') &&
                               queryNormalizada.includes('distinct') &&
                               queryNormalizada.includes('rol') &&
                               resultados.length >= 1;
            break;
        case 29:
            cumpleRequisitos = queryNormalizada.includes('distance') &&
                               queryNormalizada.includes('join') &&
                               resultados.length >= 1;
            break;
        case 30:
            cumpleRequisitos = queryNormalizada.includes('left join') &&
                               queryNormalizada.includes('coalesce') &&
                               queryNormalizada.includes('survivors') &&
                               resultados.length >= 3;
            break;

        // FASE 3 - AVANZADO (31-40) - Verificaciones más específicas
        case 31:
            cumpleRequisitos = queryNormalizada.includes('count') &&
                               queryNormalizada.includes('sum') &&
                               queryNormalizada.includes('coalesce') &&
                               resultados.length === 1; // Una fila de estadísticas generales
            break;
        case 32:
            cumpleRequisitos = queryNormalizada.includes('group by') &&
                               queryNormalizada.includes('count') &&
                               queryNormalizada.includes('avg') &&
                               resultados.length >= 2; // Al menos 2 grupos por tipo de base
            break;
        case 33:
            cumpleRequisitos = queryNormalizada.includes('case when') &&
                               queryNormalizada.includes('group by') &&
                               queryNormalizada.includes('edad') &&
                               resultados.length >= 3; // Al menos 3 grupos de edad
            break;
        case 34:
            cumpleRequisitos = queryNormalizada.includes('window') ||
                               queryNormalizada.includes('over') ||
                               (queryNormalizada.includes('rank') && queryNormalizada.includes('partition by')) &&
                               resultados.length > 0;
            break;
        case 35:
            cumpleRequisitos = queryNormalizada.includes('window') ||
                               queryNormalizada.includes('over') ||
                               (queryNormalizada.includes('row_number') && queryNormalizada.includes('order by')) &&
                               resultados.length > 0;
            break;
        case 36:
            cumpleRequisitos = queryNormalizada.includes('join') &&
                               queryNormalizada.includes('resources') &&
                               queryNormalizada.includes('round') &&
                               resultados.length >= 5; // Bases con recursos
            break;
        case 37:
            cumpleRequisitos = queryNormalizada.includes('round') &&
                               queryNormalizada.includes('group by') &&
                               queryNormalizada.includes('count') &&
                               resultados.length >= 5; // Análisis de eficiencia por base
            break;
        case 38:
            cumpleRequisitos = queryNormalizada.includes('case when') &&
                               queryNormalizada.includes('string_agg') &&
                               queryNormalizada.includes('group by') &&
                               resultados.length >= 3; // Grupos generacionales
                               queryNormalizada.includes('partition by') &&
                               resultados.length > 0;
            break;
        case 39:
            cumpleRequisitos = queryNormalizada.includes('cume_dist') &&
                               queryNormalizada.includes('over') &&
                               resultados.length > 0;
            break;
        case 40:
            cumpleRequisitos = queryNormalizada.includes('ntile') &&
                               queryNormalizada.includes('over') &&
                               queryNormalizada.includes('order by') &&
                               resultados.length > 0;
            break;

        // FASE 4 - EXPERTO (41-50) - Verificaciones con subconsultas
        case 41:
            cumpleRequisitos = queryNormalizada.includes('having') &&
                               queryNormalizada.includes('count') &&
                               queryNormalizada.includes('min') &&
                               resultados.length >= 1; // Bases más vulnerables (mínimo 1 superviviente)
            break;
        case 42:
            cumpleRequisitos = queryNormalizada.includes('where') &&
                               queryNormalizada.includes('avg') &&
                               queryNormalizada.includes('resources') &&
                               resultados.length >= 2; // Bases por encima del promedio
            break;
        case 43:
            cumpleRequisitos = queryNormalizada.includes('where') &&
                               queryNormalizada.includes('avg') &&
                               queryNormalizada.includes('edad') &&
                               (queryNormalizada.includes('comandante') || queryNormalizada.includes('médica')) &&
                               resultados.length >= 2; // Líderes experimentados
            break;
        case 44:
            cumpleRequisitos = queryNormalizada.includes('having') &&
                               queryNormalizada.includes('capacidad') &&
                               queryNormalizada.includes('group by') &&
                               resultados.length >= 4; // Bases con espacio disponible
            break;
        case 45:
            cumpleRequisitos = queryNormalizada.includes('exists') &&
                               queryNormalizada.includes('case when') &&
                               queryNormalizada.includes('recursos') &&
                               resultados.length >= 5; // Clasificación de autonomía
            break;
        case 46:
            cumpleRequisitos = queryNormalizada.includes('window') ||
                               (queryNormalizada.includes('rank') && queryNormalizada.includes('over')) ||
                               (queryNormalizada.includes('row_number') && queryNormalizada.includes('partition by')) &&
                               resultados.length >= 5;
            break;
        case 47:
            cumpleRequisitos = queryNormalizada.includes('window') ||
                               (queryNormalizada.includes('lag') && queryNormalizada.includes('over')) ||
                               (queryNormalizada.includes('lead') && queryNormalizada.includes('order by')) &&
                               resultados.length >= 5;
            break;
        case 48:
            cumpleRequisitos = queryNormalizada.includes('window') ||
                               (queryNormalizada.includes('sum') && queryNormalizada.includes('over')) ||
                               (queryNormalizada.includes('running') && queryNormalizada.includes('total')) &&
                               resultados.length >= 5;
            break;
        case 49:
            cumpleRequisitos = queryNormalizada.includes('with') &&
                               queryNormalizada.includes('recursiv') &&
                               queryNormalizada.includes('union') &&
                               resultados.length >= 1;
            break;
        case 50:
            cumpleRequisitos = queryNormalizada.includes('with') &&
                               queryNormalizada.includes('analisis') &&
                               queryNormalizada.includes('indice') &&
                               resultados.length >= 5; // Índice de supervivencia completo
            break;

        // FASE 5 - MAESTRO (51-60) - Verificaciones complejas con CTEs
        case 51:
            cumpleRequisitos = queryNormalizada.includes('with') &&
                               queryNormalizada.includes('comandocentral') &&
                               queryNormalizada.includes('cross join') &&
                               resultados.length >= 1; // Solo una base de comando central
            break;
        case 52:
            cumpleRequisitos = queryNormalizada.includes('with') &&
                               queryNormalizada.includes('consumosimulado') &&
                               queryNormalizada.includes('nullif') &&
                               resultados.length >= 6; // Bases con supervivientes
            break;
        case 53:
            cumpleRequisitos = queryNormalizada.includes('with') &&
                               queryNormalizada.includes('capacidadmilitar') &&
                               queryNormalizada.includes('union all') &&
                               resultados.length >= 8; // Análisis de todas las bases
            break;
        case 54:
            cumpleRequisitos = queryNormalizada.includes('with') &&
                               queryNormalizada.includes('string_agg') &&
                               queryNormalizada.includes('criticidad') &&
                               resultados.length >= 6; // Análisis de supervivientes únicos
            break;
        case 55:
            cumpleRequisitos = queryNormalizada.includes('with') &&
                               queryNormalizada.includes('sqrt') &&
                               queryNormalizada.includes('power') &&
                               resultados.length >= 6; // Análisis de conectividad entre bases
            break;
        case 56:
            cumpleRequisitos = queryNormalizada.includes('with') &&
                               queryNormalizada.includes('capacidadmedica') &&
                               queryNormalizada.includes('cobertura') &&
                               resultados.length >= 8; // Análisis médico de todas las bases
            break;
        case 57:
            cumpleRequisitos = queryNormalizada.includes('with') &&
                               queryNormalizada.includes('intercambios') &&
                               (queryNormalizada.includes('per capita') || queryNormalizada.includes('percapita')) &&
                               resultados.length >= 5; // Análisis de intercambio de recursos
            break;
        case 58:
            cumpleRequisitos = queryNormalizada.includes('with') &&
                               queryNormalizada.includes('liderazgo') &&
                               queryNormalizada.includes('sucesion') &&
                               resultados.length >= 6; // Plan de sucesión para líderes
            break;
        case 59:
            cumpleRequisitos = queryNormalizada.includes('with') &&
                               queryNormalizada.includes('expansion') &&
                               queryNormalizada.includes('viabilidad') &&
                               resultados.length >= 8; // Análisis de expansión de todas las bases
            break;
        case 60:
            cumpleRequisitos = queryNormalizada.includes('with') &&
                               queryNormalizada.includes('baselineactual') &&
                               queryNormalizada.includes('proyeccion') &&
                               queryNormalizada.includes('union all') &&
                               resultados.length >= 2; // Debe mostrar estado actual + proyección
            break;

        // RETOS EXPANDIDOS CON NUEVAS TABLAS (61-68)
        case 61:
            cumpleRequisitos = queryNormalizada.includes('robots') &&
                               queryNormalizada.includes('nivelalenaza') &&
                               queryNormalizada.includes('case when') &&
                               queryNormalizada.includes('order by') &&
                               resultados.length >= 5; // Todos los robots clasificados
            break;
            
        case 62:
            cumpleRequisitos = queryNormalizada.includes('attacks') &&
                               queryNormalizada.includes('join') &&
                               queryNormalizada.includes('count') &&
                               queryNormalizada.includes('group by') &&
                               resultados.length >= 5; // Bases con historial de ataques
            break;
            
        case 63:
            cumpleRequisitos = queryNormalizada.includes('alliances') &&
                               queryNormalizada.includes('missions') &&
                               queryNormalizada.includes('exists') &&
                               queryNormalizada.includes('porcentaje') &&
                               resultados.length >= 2; // Tipos de cooperación
            break;
            
        case 64:
            cumpleRequisitos = queryNormalizada.includes('robotsightings') &&
                               queryNormalizada.includes('attacks') &&
                               queryNormalizada.includes('datediff') &&
                               queryNormalizada.includes('with') &&
                               resultados.length >= 3; // Correlaciones temporales
            break;
            
        case 65:
            cumpleRequisitos = queryNormalizada.includes('supplies') &&
                               queryNormalizada.includes('with') &&
                               queryNormalizada.includes('necesidad') &&
                               queryNormalizada.includes('deficit') &&
                               resultados.length >= 5; // Análisis logístico de bases
            break;
            
        case 66:
            cumpleRequisitos = queryNormalizada.includes('distancematrix') &&
                               queryNormalizada.includes('missions') &&
                               queryNormalizada.includes('kilometros') &&
                               queryNormalizada.includes('join') &&
                               resultados.length >= 10; // Rutas estratégicas
            break;
            
        case 67:
            cumpleRequisitos = queryNormalizada.includes('with') &&
                               queryNormalizada.includes('seguridad') &&
                               queryNormalizada.includes('indice') &&
                               (queryNormalizada.split('join').length >= 6 || queryNormalizada.split('left join').length >= 4) &&
                               resultados.length >= 5; // Índice de seguridad integral
            break;
            
        case 68:
            cumpleRequisitos = queryNormalizada.includes('with') &&
                               queryNormalizada.includes('poder') &&
                               queryNormalizada.includes('indice') &&
                               (queryNormalizada.split('cte').length >= 3 || queryNormalizada.split('as (').length >= 4) &&
                               resultados.length >= 5; // Matriz de poder e influencia
            break;

        default:
            cumpleRequisitos = resultados.length > 0;
    }

    if (cumpleRequisitos) {
        completarReto(retoActualObj.id, retoActualObj.puntos);
        
        // Mensajes personalizados por fase
        let mensajePersonalizado = "";
        if (retoActualObj.fase === 1) {
            mensajePersonalizado = "🎯 ¡Excelente! Has dominado los fundamentos básicos de SQL.";
        } else if (retoActualObj.fase === 2) {
            mensajePersonalizado = "🔗 ¡Genial! Estás dominando JOINs y aplicando análisis complejo.";
        } else if (retoActualObj.fase === 3) {
            mensajePersonalizado = "📈 ¡Increíble! Dominas las agregaciones y análisis complejo.";
        } else if (retoActualObj.fase === 4) {
            mensajePersonalizado = "🎖️ ¡Excepcional! Eres un experto en subconsultas estratégicas.";
        } else if (retoActualObj.fase === 5) {
            mensajePersonalizado = "🏆 ¡MAESTRO SQL! Has alcanzado el nivel más alto de consultas.";
        }

        return {
            completado: true,
            mensaje: `🎉 ¡RETO ${retoActualObj.id} COMPLETADO! 
                     ${mensajePersonalizado}
                     +${retoActualObj.puntos} puntos | ${retoActualObj.titulo}`
        };
    }

    return { completado: false, mensaje: "" };
}

// ========================================
// FUNCIONES DE NAVEGACIÓN DE RETOS
// ========================================
function irAlReto(numeroReto) {
    if (numeroReto >= 1 && numeroReto <= retos.length) {
        localStorage.setItem('retoActual', JSON.stringify(retos.find(r => r.id === numeroReto)));
        localStorage.setItem('consultaPendiente', retos.find(r => r.id === numeroReto).consulta_sugerida);
        window.location.href = 'sql.html?reto=true';
    }
}

function proximoReto() {
    if (retoActual < retos.length) {
        irAlReto(retoActual + 1);
    }
}

function retoAnterior() {
    if (retoActual > 1) {
        irAlReto(retoActual - 1);
    }
}

// ========================================
// FUNCIÓN DE OBTENER RETO POR ID
// ========================================
function obtenerRetoPorId(id) {
    return retos.find(r => r.id === id);
}

// ========================================
// FUNCIÓN DE FILTRAR RETOS POR FASE
// ========================================
function obtenerRetosPorFase(fase) {
    return retos.filter(r => r.fase === fase);
}

// ========================================
// FUNCIÓN DE OBTENER ESTADÍSTICAS DETALLADAS
// ========================================
function obtenerEstadisticasDetalladas() {
    const stats = obtenerEstadisticas();
    const fases = [1, 2, 3, 4, 5];
    const detallesPorFase = {};

    fases.forEach(fase => {
        const retosFase = retos.filter(r => r.fase === fase);
        const completadosFase = retosCompletados.filter(id => 
            retos.find(r => r.id === id)?.fase === fase
        );
        const puntosFase = completadosFase.reduce((total, id) => 
            total + (retos.find(r => r.id === id)?.puntos || 0), 0
        );

        detallesPorFase[fase] = {
            total: retosFase.length,
            completados: completadosFase.length,
            porcentaje: Math.round((completadosFase.length / retosFase.length) * 100),
            puntos: puntosFase,
            puntosMaximos: retosFase.reduce((total, reto) => total + reto.puntos, 0)
        };
    });

    return {
        ...stats,
        detallesPorFase
    };
}

// ========================================
// FUNCIÓN DE CARGAR RETOS EN LA INTERFAZ
// ========================================
function cargarRetos() {
    const container = document.getElementById('retos-container');
    if (!container) return;

    // LIMPIAR contenedor antes de añadir nuevo contenido
    container.innerHTML = '';

    let html = '';
    
    // Mostrar estadísticas generales
    const stats = obtenerEstadisticasDetalladas();
    html += `
        <div style="background: linear-gradient(135deg, var(--bg-medium), var(--bg-light)); 
                   border: 2px solid var(--primary-green); 
                   padding: 1.5em; 
                   border-radius: 8px; 
                   margin-bottom: 2em; 
                   text-align: center;">
            <h3 style="margin: 0 0 1em 0; color: var(--primary-green);">📊 Progreso General</h3>
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(120px, 1fr)); gap: 1em;">
                <div>
                    <div style="font-size: 2em; color: var(--accent-cyan);">${stats.completados}</div>
                    <div style="font-size: 0.9em; color: var(--text-secondary);">Retos completados</div>
                </div>
                <div>
                    <div style="font-size: 2em; color: var(--accent-orange);">${stats.puntosTotal}</div>
                    <div style="font-size: 0.9em; color: var(--text-secondary);">Puntos totales</div>
                </div>
                <div>
                    <div style="font-size: 2em; color: var(--primary-green);">${stats.porcentaje}%</div>
                    <div style="font-size: 0.9em; color: var(--text-secondary);">Progreso</div>
                </div>
                <div>
                    <div style="font-size: 2em; color: var(--text-primary);">${stats.faseActual}</div>
                    <div style="font-size: 0.9em; color: var(--text-secondary);">Fase actual</div>
                </div>
            </div>
        </div>
    `;

    // Agrupar retos por fase
    const fases = [1, 2, 3, 4, 5];
    
    fases.forEach(fase => {
        const retosFase = retos.filter(r => r.fase === fase);
        if (retosFase.length === 0) return;

        // Información de la fase
        let faseInfo = {
            1: { titulo: "📚 Fase 1: Fundamentos Básicos", descripcion: "SELECT, WHERE, ORDER BY", color: "var(--primary-green)" },
            2: { titulo: "🔗 Fase 2: Tutorial JOINs & Aplicación", descripcion: "INNER, LEFT, RIGHT, FULL OUTER, CROSS JOIN + Aplicación práctica", color: "var(--accent-cyan)" },
            3: { titulo: "📈 Fase 3: Análisis Avanzado", descripcion: "GROUP BY, HAVING, funciones window", color: "var(--accent-orange)" },
            4: { titulo: "🎯 Fase 4: Consultas Expertas", descripcion: "Subconsultas, EXISTS, análisis estratégico", color: "#ff6b6b" },
            5: { titulo: "🏆 Fase 5: Maestría SQL", descripcion: "CTEs complejas, análisis predictivo", color: "#8b5cf6" }
        };

        // Mostrar información especial para la fase 2 que ahora incluye JOINs
        if (fase === 2) {
            html += `
                <div style="margin-bottom: 2em;">
                    <h3 style="color: ${faseInfo[fase].color}; margin-bottom: 1em;">
                        ${faseInfo[fase].titulo} (11-30)
                    </h3>
                    <p style="color: var(--text-secondary); margin-bottom: 1.5em;">
                        Tutorial completo de JOINs (11-20) + Aplicación práctica (21-30)
                    </p>
                    <div style="display: grid; gap: 1em;">
            `;
            
            retosFase.forEach(reto => {
                const completado = retosCompletados.includes(reto.id);
                const bloqueado = !estaDesbloqueado(reto.id);
                
                html += crearTarjetaReto(reto, completado, bloqueado);
            });
            
            html += `</div></div>`;
        } else {
            // Fases normales
            html += `
                <div style="margin-bottom: 2em;">
                    <h3 style="color: ${faseInfo[fase].color}; margin-bottom: 1em;">
                        ${faseInfo[fase].titulo}
                    </h3>
                    <p style="color: var(--text-secondary); margin-bottom: 1.5em;">
                        ${faseInfo[fase].descripcion}
                    </p>
                    <div style="display: grid; gap: 1em;">
            `;

            retosFase.forEach(reto => {
                const completado = retosCompletados.includes(reto.id);
                const bloqueado = !estaDesbloqueado(reto.id);
                
                html += crearTarjetaReto(reto, completado, bloqueado);
            });

            html += `</div></div>`;
        }
    });

    container.innerHTML = html;
}

function crearTarjetaReto(reto, completado, bloqueado) {
    const iconoEstado = completado ? '✅' : (bloqueado ? '🔒' : '⭐');
    const colorBorde = completado ? 'var(--primary-green)' : (bloqueado ? 'var(--text-secondary)' : 'var(--accent-orange)');
    const opacidad = bloqueado ? '0.5' : '1';
    
    return `
        <div style="
            background: var(--bg-light); 
            border: 2px solid ${colorBorde}; 
            border-radius: 8px; 
            padding: 1.5em; 
            opacity: ${opacidad};
            transition: all 0.3s ease;
        " ${!bloqueado ? 'onmouseover="this.style.transform=\'scale(1.02)\'" onmouseout="this.style.transform=\'scale(1)\'"' : ''}>
            <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 1em;">
                <div style="display: flex; align-items: center; gap: 0.5em; flex: 1;">
                    <span style="
                        background: var(--accent-cyan); 
                        color: var(--bg-dark); 
                        padding: 0.3em 0.6em; 
                        border-radius: 50%; 
                        font-size: 0.8em; 
                        font-weight: bold;
                        min-width: 1.5em;
                        text-align: center;
                    ">${reto.id}</span>
                    <h4 style="margin: 0; color: var(--text-primary);">
                        ${iconoEstado} ${reto.titulo}
                    </h4>
                </div>
                <span style="
                    background: ${colorBorde}; 
                    color: var(--bg-dark); 
                    padding: 0.3em 0.8em; 
                    border-radius: 15px; 
                    font-size: 0.8em; 
                    font-weight: bold;
                    margin-left: 1em;
                ">${reto.puntos}pts</span>
            </div>
            
            <p style="margin: 0 0 1em 0; color: var(--text-secondary); line-height: 1.4;">
                ${reto.descripcion}
            </p>
            
            <div style="display: flex; gap: 0.5em; flex-wrap: wrap;">
                ${!bloqueado ? `
                    <button onclick="irAlReto(${reto.id})" style="
                        background: var(--accent-cyan); 
                        color: var(--bg-dark); 
                        border: none; 
                        padding: 0.7em 1.2em; 
                        border-radius: 5px; 
                        font-weight: bold; 
                        cursor: pointer;
                        font-size: 0.9em;
                    ">🚀 Ir al Terminal</button>
                    
                    <button onclick="mostrarPista(${reto.id})" style="
                        background: var(--bg-medium); 
                        color: var(--accent-orange); 
                        border: 1px solid var(--accent-orange); 
                        padding: 0.7em 1.2em; 
                        border-radius: 5px; 
                        cursor: pointer;
                        font-size: 0.9em;
                    ">💡 Pista</button>
                ` : `
                    <span style="
                        color: var(--text-secondary); 
                        font-style: italic; 
                        padding: 0.7em 0;
                    ">🔒 Completa el reto anterior para desbloquear</span>
                `}
            </div>
            
            <div id="pista-${reto.id}" style="display: none; margin-top: 1em; padding: 1em; background: var(--bg-medium); border-radius: 5px; border-left: 3px solid var(--accent-orange);">
                <strong style="color: var(--accent-orange);">💡 Pista:</strong> ${reto.pista}
            </div>
        </div>
    `;
}

function mostrarPista(retoId) {
    const pistaDiv = document.getElementById(`pista-${retoId}`);
    if (pistaDiv) {
        pistaDiv.style.display = pistaDiv.style.display === 'none' ? 'block' : 'none';
    }
}

// ========================================
// FUNCIÓN DE RESET COMPLETO DEL SISTEMA
// ========================================
function resetearSistemaCompleto() {
    // Resetear variables globales
    retosCompletados.length = 0;
    retoActual = 1;
    puntosTotal = 0;
    
    // Limpiar localStorage
    localStorage.removeItem('retosCompletados');
    localStorage.removeItem('retoActual');  
    localStorage.removeItem('puntuacionAtapuerca');
    localStorage.removeItem('progresoAtapuerca');
    localStorage.removeItem('consultaPendiente');
    localStorage.removeItem('queryToLoad');
    localStorage.removeItem('retoActualObj');
    
    // Limpiar cualquier dato adicional
    const keysToRemove = [];
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && (key.includes('atapuerca') || key.includes('reto') || key.includes('sql'))) {
            keysToRemove.push(key);
        }
    }
    keysToRemove.forEach(key => localStorage.removeItem(key));
    
    // Guardar el estado reseteado
    guardarProgreso();
    
    return true;
}
