// Sistema completo de 60 retos SQL adaptado a los DATOS REALES de Atapuerca
// ESTRUCTURA: Nivel 1 (1-10) → JOINS Tutorial (11-20) → Nivel 2 (21-30) → Nivel 3 (31-40) → Nivel 4 (41-50) → Nivel 5 (51-60)
// Datos verificados: 5 bases, 5 supervivientes, 3 recursos, ataques reales

const retos = [
  // ========================================
  // FASE 1 - NIVEL BÁSICO (1-10) - Fundamentos SQL
  // ========================================
  {
    id: 1,
    fase: 1,
    nivel: "Básico",
    titulo: "🏠 Exploración inicial - Las bases de Atapuerca",
    descripcion: "Descubre todas las bases de supervivencia disponibles (deberías ver 5 bases)",
    consulta_sugerida: "SELECT * FROM Bases;",
    pista: "Usa SELECT * para obtener todas las columnas. Deberías ver: Fortaleza Norte, Refugio Delta, Nido Central, Torre Omega y Cúpula Esperanza",
    puntos: 5,
    videoUrl: "https://www.youtube.com/shorts/AOWiBICrndc"
  },
  {
    id: 2,
    fase: 1,
    nivel: "Básico",
    titulo: "📋 Bases ordenadas alfabéticamente",
    descripcion: "Mostrar solo el nombre y tipo de cada base, ordenadas alfabéticamente",
    consulta_sugerida: "SELECT Nombre, TipoBase FROM Bases ORDER BY Nombre;",
    pista: "Usa ORDER BY para ordenar. El resultado debería empezar con 'Cúpula Esperanza' y terminar con 'Torre Omega'",
    puntos: 5,
    videoUrl: "https://www.youtube.com/shorts/gBpUMv1H8zk"
  },
  {
    id: 3,
    fase: 1,
    nivel: "Básico", 
    titulo: "👥 Bases humanas vs bases IA",
    descripcion: "Filtrar y mostrar solo las bases de tipo 'Humana' (deberías encontrar 3 bases)",
    consulta_sugerida: "SELECT * FROM Bases WHERE TipoBase = 'Humana';",
    pista: "Usa WHERE para filtrar. Las bases humanas son: Fortaleza Norte, Refugio Delta y Cúpula Esperanza",
    puntos: 5,
    videoUrl: "https://www.youtube.com/shorts/GX_u6MhiMxs"
  },
  {
    id: 4,
    fase: 1,
    nivel: "Básico",
    titulo: "🧑‍🤝‍🧑 El equipo de supervivientes",
    descripcion: "Conoce a todos los supervivientes (deberías ver 5 personas: Elena, Marcus, Li Wei, Sara y Hugo)",
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
    descripcion: "Explorar todos los recursos disponibles en las bases (3 bases tienen recursos registrados)",
    consulta_sugerida: "SELECT * FROM Resources;",
    pista: "Los recursos incluyen: AguaLitros, ComidaRaciones, Armas y Medicinas. Solo 3 bases tienen recursos registrados",
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
    descripcion: "Encontrar supervivientes mayores de 30 años (deberías encontrar a Elena, Marcus y Hugo)",
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
    descripcion: "Encontrar el superviviente más joven del equipo",
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
    descripcion: "Mostrar bases ubicadas en el hemisferio norte (Latitud > 0)",
    consulta_sugerida: "SELECT Nombre, Ubicacion, Latitud FROM Bases WHERE Latitud > 0;",
    pista: "Filtra por latitud positiva. Deberías encontrar 4 bases en el hemisferio norte",
    puntos: 8,
    videoUrl: "https://www.youtube.com/shorts/GX_u6MhiMxs"
  },

  // ========================================
  // FASE ESPECIAL - TUTORIAL DE JOINS (11-20)
  // Basado en la infografía de tipos de JOIN
  // ========================================
  {
    id: 11,
    fase: 1.5,
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
    fase: 1.5,
    nivel: "JOIN Tutorial",
    titulo: "🔗 INNER JOIN - Solo coincidencias",
    descripcion: "INNER JOIN devuelve solo los registros que tienen coincidencias en ambas tablas. Supervivientes CON base asignada.",
    consulta_sugerida: "SELECT s.Nombre AS Superviviente, b.Nombre AS Base FROM Survivors s INNER JOIN Bases b ON s.BaseID = b.BaseID;",
    pista: "INNER JOIN es el más común. Muestra solo supervivientes que tienen una base válida asignada (todos en nuestro caso).",
    puntos: 10,
    videoUrl: "https://www.youtube.com/shorts/GX_u6MhiMxs"
  },
  {
    id: 13,
    fase: 1.5,
    nivel: "JOIN Tutorial",
    titulo: "◀️ LEFT OUTER JOIN - Todos de la izquierda",
    descripcion: "LEFT JOIN devuelve TODOS los registros de la tabla izquierda, incluso si no tienen coincidencias en la derecha.",
    consulta_sugerida: "SELECT b.Nombre AS Base, s.Nombre AS Superviviente FROM Bases b LEFT JOIN Survivors s ON b.BaseID = s.BaseID;",
    pista: "LEFT JOIN muestra todas las bases, incluso las que no tienen supervivientes (como Torre Omega y Nido Central).",
    puntos: 12,
    videoUrl: "https://www.youtube.com/shorts/GX_u6MhiMxs"
  },
  {
    id: 14,
    fase: 1.5,
    nivel: "JOIN Tutorial",
    titulo: "▶️ RIGHT OUTER JOIN - Todos de la derecha",
    descripcion: "RIGHT JOIN devuelve TODOS los registros de la tabla derecha, incluso si no tienen coincidencias en la izquierda.",
    consulta_sugerida: "SELECT b.Nombre AS Base, s.Nombre AS Superviviente FROM Bases b RIGHT JOIN Survivors s ON b.BaseID = s.BaseID;",
    pista: "RIGHT JOIN muestra todos los supervivientes. En nuestro caso, todos tienen base, así que es igual que INNER JOIN.",
    puntos: 12,
    videoUrl: "https://www.youtube.com/shorts/GX_u6MhiMxs"
  },
  {
    id: 15,
    fase: 1.5,
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
    fase: 1.5,
    nivel: "JOIN Tutorial",
    titulo: "❌ LEFT JOIN con exclusión - Solo sin coincidencias",
    descripcion: "LEFT JOIN con WHERE NULL encuentra registros de la tabla izquierda SIN coincidencias en la derecha.",
    consulta_sugerida: "SELECT b.Nombre AS Base FROM Bases b LEFT JOIN Survivors s ON b.BaseID = s.BaseID WHERE s.BaseID IS NULL;",
    pista: "Esta consulta encuentra bases que NO tienen supervivientes asignados (bases vacías).",
    puntos: 15,
    videoUrl: "https://www.youtube.com/shorts/GX_u6MhiMxs"
  },
  {
    id: 17,
    fase: 1.5,
    nivel: "JOIN Tutorial",
    titulo: "❌ RIGHT JOIN con exclusión - Huérfanos",
    descripcion: "RIGHT JOIN con WHERE NULL encuentra registros de la tabla derecha SIN coincidencias en la izquierda.",
    consulta_sugerida: "SELECT s.Nombre AS Superviviente FROM Bases b RIGHT JOIN Survivors s ON b.BaseID = s.BaseID WHERE b.BaseID IS NULL;",
    pista: "Esta consulta encontraría supervivientes sin base asignada (huérfanos). En nuestros datos no hay ninguno.",
    puntos: 15,
    videoUrl: "https://www.youtube.com/shorts/GX_u6MhiMxs"
  },
  {
    id: 18,
    fase: 1.5,
    nivel: "JOIN Tutorial",
    titulo: "🔗 CROSS JOIN - Producto cartesiano",
    descripcion: "CROSS JOIN combina cada registro de una tabla con CADA registro de la otra tabla.",
    consulta_sugerida: "SELECT b.Nombre AS Base, s.Nombre AS Superviviente FROM Bases b CROSS JOIN Survivors s;",
    pista: "CROSS JOIN crea todas las combinaciones posibles. 5 bases × 5 supervivientes = 25 combinaciones!",
    puntos: 12,
    videoUrl: "https://www.youtube.com/shorts/GX_u6MhiMxs"
  },
  {
    id: 19,
    fase: 1.5,
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
    fase: 1.5,
    nivel: "JOIN Tutorial",
    titulo: "🎯 Auto-JOIN - La tabla consigo misma",
    descripcion: "Usar alias para comparar registros de la misma tabla. Encuentra supervivientes de la misma edad.",
    consulta_sugerida: "SELECT s1.Nombre AS Superviviente1, s2.Nombre AS Superviviente2, s1.Edad FROM Survivors s1 INNER JOIN Survivors s2 ON s1.Edad = s2.Edad AND s1.SurvivorID < s2.SurvivorID;",
    pista: "Auto-JOIN compara la tabla consigo misma. Encuentra pares de supervivientes con la misma edad.",
    puntos: 20,
    videoUrl: "https://www.youtube.com/shorts/GX_u6MhiMxs"
  },
  {
    id: 5,
    fase: 1,
    nivel: "Básico",
    titulo: "Inventario de recursos",
    descripcion: "Explorar todos los recursos disponibles en las bases (3 bases tienen recursos registrados)",
    consulta_sugerida: "SELECT * FROM Resources;",
    pista: "Los recursos incluyen: AguaLitros, ComidaRaciones, Armas y Medicinas. Solo 3 bases tienen recursos registrados",
    puntos: 5,
    videoUrl: "https://www.youtube.com/shorts/GX_u6MhiMxs"
  },
  {
    id: 6,
    fase: 1,
    nivel: "Básico",
    titulo: "El comando central",
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
    titulo: "Supervivientes veteranos",
    descripcion: "Encontrar supervivientes mayores de 30 años (deberías encontrar a Elena, Marcus y Hugo)",
    consulta_sugerida: "SELECT * FROM Survivors WHERE Edad > 30;",
    pista: "Usa el operador > para comparar edades. Los veteranos son los más experimentados",
    puntos: 8,
    videoUrl: "https://www.youtube.com/shorts/GX_u6MhiMxs"
  },
  {
    id: 8,
    fase: 1,
    nivel: "Básico",
    titulo: "Bases bien abastecidas de comida",
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
    titulo: "Scout más joven",
    descripcion: "Encontrar el superviviente más joven del equipo",
    consulta_sugerida: "SELECT * FROM Survivors WHERE Edad = (SELECT MIN(Edad) FROM Survivors);",
    pista: "Usa MIN para encontrar la edad mínima. La más joven es Sara Kim con 16 años",
    puntos: 10,
    videoUrl: "https://www.youtube.com/shorts/GX_u6MhiMxs"
  },
  {
    id: 10,
    fase: 1,
    nivel: "Básico",
    titulo: "Bases en el hemisferio norte",
    descripcion: "Mostrar bases ubicadas en el hemisferio norte (Latitud > 0)",
    consulta_sugerida: "SELECT Nombre, Ubicacion, Latitud FROM Bases WHERE Latitud > 0;",
    pista: "Filtra por latitud positiva. Deberías encontrar 4 bases en el hemisferio norte",
    puntos: 8,
    videoUrl: "https://www.youtube.com/shorts/GX_u6MhiMxs"
  },

  // ========================================
  // FASE 2 - NIVEL INTERMEDIO (21-30) - JOINs aplicados y análisis
  // ========================================
  {
    id: 21,
    fase: 2,
    nivel: "Intermedio",
    titulo: "👥 Equipo por base - Análisis real",
    descripcion: "Mostrar cada superviviente con el nombre de su base usando los datos reales",
    consulta_sugerida: "SELECT s.Nombre AS Superviviente, s.Rol, b.Nombre AS Base, b.TipoBase FROM Survivors s JOIN Bases b ON s.BaseID = b.BaseID ORDER BY b.Nombre;",
    pista: "Verás que Fortaleza Norte tiene 3 supervivientes (Elena, Marcus, Hugo), Refugio Delta tiene 1 (Li Wei), y Cúpula Esperanza tiene 1 (Sara)",
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
    pista: "Filtra por roles de liderazgo. Hugo es Comandante (39) y Elena es Médica (34)",
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

  // ========================================
  // FASE 4 - NIVEL EXPERTO (41-50) - Subconsultas y análisis estratégico
  // ========================================
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

  // ========================================
  // FASE 3 - NIVEL AVANZADO (31-40) - Agregaciones y análisis complejo
  // ========================================
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
  },

  // ========================================
  // FASE 5 - NIVEL MAESTRO (51-60) - Consultas estratégicas y análisis predictivo
  // ========================================
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
                               resultados.length === 5;
            break;
        case 2:
            cumpleRequisitos = queryNormalizada.includes('select nombre') && 
                               queryNormalizada.includes('tipobase') &&
                               queryNormalizada.includes('order by') &&
                               resultados.length === 5;
            break;
        case 3:
            cumpleRequisitos = queryNormalizada.includes("where tipobase = 'humana'") &&
                               resultados.length === 3;
            break;
        case 4:
            cumpleRequisitos = queryNormalizada.includes('from survivors') &&
                               resultados.length === 5;
            break;
        case 5:
            cumpleRequisitos = queryNormalizada.includes('from resources') &&
                               resultados.length === 3;
            break;
        case 6:
            cumpleRequisitos = queryNormalizada.includes("escomandocentral = '1'") &&
                               resultados.length === 1;
            break;
        case 7:
            cumpleRequisitos = queryNormalizada.includes('edad > 30') &&
                               resultados.length === 3;
            break;
        case 8:
            cumpleRequisitos = queryNormalizada.includes('comidaraciones > 500') &&
                               resultados.length === 2;
            break;
        case 9:
            cumpleRequisitos = queryNormalizada.includes('count') &&
                               queryNormalizada.includes('survivors') &&
                               resultados.length === 1;
            break;
        case 10:
            cumpleRequisitos = queryNormalizada.includes('sum') &&
                               queryNormalizada.includes('resources') &&
                               resultados.length === 1;
            break;

        // FASE 1.5 - TUTORIAL JOIN (11-20)
        case 11:
            cumpleRequisitos = queryNormalizada.includes('join') &&
                               queryNormalizada.includes('survivors') &&
                               queryNormalizada.includes('bases') &&
                               resultados.length === 5;
            break;
        case 12:
            cumpleRequisitos = queryNormalizada.includes('join') &&
                               queryNormalizada.includes('bases') &&
                               queryNormalizada.includes('resources') &&
                               resultados.length === 3;
            break;
        case 13:
            cumpleRequisitos = queryNormalizada.includes('order by edad') &&
                               resultados.length === 5;
            break;
        case 14:
            cumpleRequisitos = queryNormalizada.includes('capacidad is not null') &&
                               resultados.length === 3;
            break;
        case 15:
            cumpleRequisitos = queryNormalizada.includes('armas > 0') &&
                               resultados.length >= 1;
            break;
        case 16:
            cumpleRequisitos = queryNormalizada.includes("rol = 'médica'") &&
                               resultados.length === 1;
            break;
        case 17:
            cumpleRequisitos = queryNormalizada.includes('group by') &&
                               queryNormalizada.includes('case when') &&
                               resultados.length === 2;
            break;
        case 18:
            cumpleRequisitos = queryNormalizada.includes('avg') &&
                               queryNormalizada.includes('edad') &&
                               resultados.length === 1;
            break;
        case 19:
            cumpleRequisitos = queryNormalizada.includes('left join') &&
                               queryNormalizada.includes('group by') &&
                               resultados.length === 5;
            break;
        case 20:
            cumpleRequisitos = queryNormalizada.includes('sum') &&
                               queryNormalizada.includes('resources') &&
                               resultados.length === 1;
            break;

        // FASE 2 - INTERMEDIO (21-30)
        case 21:
        case 22:
        case 23:
        case 24:
        case 25:
        case 26:
        case 27:
        case 28:
        case 29:
        case 30:
            // Verificación básica para retos intermedios: debe usar JOIN
            cumpleRequisitos = queryNormalizada.includes('join') &&
                               resultados.length > 0;
            break;

        // FASE 3 - AVANZADO (31-40)
        case 31:
        case 32:
        case 33:
        case 34:
        case 35:
        case 36:
        case 37:
        case 38:
        case 39:
        case 40:
            // Verificación para retos avanzados: debe usar agregaciones o JOINs complejos
            cumpleRequisitos = (queryNormalizada.includes('group by') || 
                               queryNormalizada.includes('having') ||
                               queryNormalizada.includes('window') ||
                               queryNormalizada.includes('over') ||
                               queryNormalizada.includes('rank') ||
                               queryNormalizada.includes('row_number')) &&
                               resultados.length > 0;
            break;

        // FASE 4 - EXPERTO (41-50)
        case 41:
        case 42:
        case 43:
        case 44:
        case 45:
        case 46:
        case 47:
        case 48:
        case 49:
        case 50:
            // Verificación para retos expertos: debe usar subconsultas o CTEs
            cumpleRequisitos = (queryNormalizada.includes('select') &&
                               (queryNormalizada.includes('(select') ||
                                queryNormalizada.includes('with') ||
                                queryNormalizada.includes('exists') ||
                                queryNormalizada.includes('in (select'))) &&
                               resultados.length > 0;
            break;

        // FASE 5 - MAESTRO (51-60)
        case 51:
        case 52:
        case 53:
        case 54:
        case 55:
        case 56:
        case 57:
        case 58:
        case 59:
        case 60:
            // Verificación para retos maestros: debe usar CTEs o consultas muy complejas
            cumpleRequisitos = (queryNormalizada.includes('with') ||
                               (queryNormalizada.includes('select') && 
                                queryNormalizada.split('select').length > 3)) &&
                               resultados.length > 0;
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
        } else if (retoActualObj.fase === 2 && retoActualObj.id <= 20) {
            mensajePersonalizado = "🔗 ¡Impresionante! Has aprendido a unir tablas con JOINs.";
        } else if (retoActualObj.fase === 2) {
            mensajePersonalizado = "📊 ¡Genial! Estás aplicando JOINs como un verdadero analista.";
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
            2: { titulo: "🔗 Fase 2: Dominio de JOINs", descripcion: "INNER, LEFT, RIGHT, FULL OUTER, CROSS JOIN", color: "var(--accent-cyan)" },
            3: { titulo: "📊 Fase 3: Análisis Avanzado", descripcion: "GROUP BY, HAVING, funciones window", color: "var(--accent-orange)" },
            4: { titulo: "🎯 Fase 4: Consultas Expertas", descripcion: "Subconsultas, EXISTS, análisis estratégico", color: "#ff6b6b" },
            5: { titulo: "🏆 Fase 5: Maestría SQL", descripcion: "CTEs complejas, análisis predictivo", color: "#8b5cf6" }
        };

        // Para la fase especial de JOIN tutorial
        if (fase === 2) {
            const retosJoinTutorial = retosFase.filter(r => r.id >= 11 && r.id <= 20);
            const retosIntermedios = retosFase.filter(r => r.id >= 21 && r.id <= 30);
            
            if (retosJoinTutorial.length > 0) {
                html += `
                    <div style="margin-bottom: 2em;">
                        <h3 style="color: var(--accent-cyan); margin-bottom: 1em;">
                            🔗 Fase 1.5: Tutorial Completo de JOINs (11-20)
                        </h3>
                        <p style="color: var(--text-secondary); margin-bottom: 1.5em;">
                            Domina todos los tipos de JOIN basados en el infográfico TSQL
                        </p>
                        <div style="display: grid; gap: 1em;">
                `;
                
                retosJoinTutorial.forEach(reto => {
                    const completado = retosCompletados.includes(reto.id);
                    const bloqueado = reto.id > retoActual + 1;
                    
                    html += crearTarjetaReto(reto, completado, bloqueado);
                });
                
                html += `</div></div>`;
            }
            
            if (retosIntermedios.length > 0) {
                html += `
                    <div style="margin-bottom: 2em;">
                        <h3 style="color: ${faseInfo[fase].color}; margin-bottom: 1em;">
                            ${faseInfo[fase].titulo} - Aplicación Práctica (21-30)
                        </h3>
                        <p style="color: var(--text-secondary); margin-bottom: 1.5em;">
                            ${faseInfo[fase].descripcion} aplicado a datos reales
                        </p>
                        <div style="display: grid; gap: 1em;">
                `;
                
                retosIntermedios.forEach(reto => {
                    const completado = retosCompletados.includes(reto.id);
                    const bloqueado = reto.id > retoActual + 1;
                    
                    html += crearTarjetaReto(reto, completado, bloqueado);
                });
                
                html += `</div></div>`;
            }
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
                const bloqueado = reto.id > retoActual + 1;
                
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
                <h4 style="margin: 0; color: var(--text-primary); flex: 1;">
                    ${iconoEstado} ${reto.titulo}
                </h4>
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
