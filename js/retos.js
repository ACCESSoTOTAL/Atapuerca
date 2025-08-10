// Sistema completo de 50 retos SQL con videos de YouTube
const retos = [
  // FASE 1 - Nivel básico (1-10)
  {
    id: 1,
    fase: 1,
    nivel: "Básico",
    titulo: "Reconocimiento inicial",
    descripcion: "Listar los nombres de todas las bases",
    consulta_sugerida: "SELECT Nombre FROM Bases;",
    pista: "Usa SELECT para obtener solo la columna Nombre de la tabla Bases",
    puntos: 5,
    videoUrl: "https://www.youtube.com/shorts/GX_u6MhiMxs"
  },
  {
    id: 2,
    fase: 1,
    nivel: "Básico",
    titulo: "Información básica ordenada",
    descripcion: "Mostrar el nombre y tipo de cada base, ordenadas por nombre",
    consulta_sugerida: "SELECT Nombre, Tipo FROM Bases ORDER BY Nombre;",
    pista: "Usa ORDER BY para ordenar los resultados alfabéticamente",
    puntos: 5,
    videoUrl: "https://www.youtube.com/shorts/AOWiBICrndc"
  },
  {
    id: 3,
    fase: 1,
    nivel: "Básico", 
    titulo: "Filtro de supervivencia",
    descripcion: "Mostrar las bases de tipo 'Humana'",
    consulta_sugerida: "SELECT * FROM Bases WHERE Tipo = 'Humana';",
    pista: "Usa WHERE para filtrar por el tipo específico",
    puntos: 5,
    videoUrl: "https://www.youtube.com/shorts/gBpUMv1H8zk"
  },
  {
    id: 4,
    fase: 1,
    nivel: "Básico",
    titulo: "Censo de resistentes",
    descripcion: "Listar todos los supervivientes (Nombre, Edad, Profesion)",
    consulta_sugerida: "SELECT Nombre, Edad, Profesion FROM Supervivientes;",
    pista: "Selecciona solo las columnas que necesitas de la tabla Supervivientes",
    puntos: 5,
    videoUrl: "https://www.youtube.com/shorts/GX_u6MhiMxs"
  },
  {
    id: 5,
    fase: 1,
    nivel: "Básico",
    titulo: "Veteranos de guerra",
    descripcion: "Mostrar los supervivientes mayores de 40 años",
    consulta_sugerida: "SELECT * FROM Supervivientes WHERE Edad > 40;",
    pista: "Usa el operador > para comparar la edad",
    puntos: 5,
    videoUrl: "https://www.youtube.com/shorts/GX_u6MhiMxs"
  },
  {
    id: 6,
    fase: 1,
    nivel: "Básico",
    titulo: "Bases bien abastecidas",
    descripcion: "Mostrar las bases con más de 50 raciones de comida",
    consulta_sugerida: "SELECT * FROM Recursos WHERE ComidaRaciones > 50;",
    pista: "Filtra la tabla Recursos por la columna ComidaRaciones",
    puntos: 8,
    videoUrl: "https://www.youtube.com/shorts/GX_u6MhiMxs"
  },
  {
    id: 7,
    fase: 1,
    nivel: "Básico",
    titulo: "Crisis hídrica",
    descripcion: "Mostrar las bases con menos de 20 litros de agua, ordenadas de menor a mayor",
    consulta_sugerida: "SELECT * FROM Recursos WHERE AguaLitros < 20 ORDER BY AguaLitros;",
    pista: "Combina WHERE para filtrar y ORDER BY para ordenar",
    puntos: 8,
    videoUrl: "https://www.youtube.com/shorts/GX_u6MhiMxs"
  },
  {
    id: 8,
    fase: 1,
    nivel: "Básico",
    titulo: "Territorio austral",
    descripcion: "Mostrar las bases ubicadas en el hemisferio sur (latitud negativa)",
    consulta_sugerida: "SELECT * FROM Bases WHERE Latitud < 0;",
    pista: "El hemisferio sur tiene latitudes negativas",
    puntos: 8,
    videoUrl: "https://www.youtube.com/shorts/GX_u6MhiMxs"
  },
  {
    id: 9,
    fase: 1,
    nivel: "Básico",
    titulo: "Equipo médico",
    descripcion: "Mostrar los supervivientes cuya profesión es 'Médico', ordenados por edad descendente",
    consulta_sugerida: "SELECT * FROM Supervivientes WHERE Profesion = 'Médico' ORDER BY Edad DESC;",
    pista: "Usa DESC para orden descendente (mayor a menor)",
    puntos: 10,
    videoUrl: "https://www.youtube.com/shorts/GX_u6MhiMxs"
  },
  {
    id: 10,
    fase: 1,
    nivel: "Básico",
    titulo: "Inventario completo",
    descripcion: "Listar todos los recursos (BaseID, ComidaRaciones, AguaLitros, Armas)",
    consulta_sugerida: "SELECT BaseID, ComidaRaciones, AguaLitros, Armas FROM Recursos;",
    pista: "Especifica exactamente las columnas que necesitas",
    puntos: 10,
    videoUrl: "https://www.youtube.com/shorts/GX_u6MhiMxs"
  },
  
  // FASE 2 - Introducción a JOIN (11-20)
  {
    id: 11,
    fase: 2,
    nivel: "Intermedio",
    titulo: "Primer contacto entre tablas",
    descripcion: "Mostrar el nombre de cada base y su cantidad de raciones de comida",
    consulta_sugerida: "SELECT B.Nombre, R.ComidaRaciones FROM Bases B JOIN Recursos R ON B.BaseID = R.BaseID;",
    pista: "Usa JOIN para unir las tablas Bases y Recursos por BaseID",
    puntos: 12,
    videoUrl: "https://www.youtube.com/shorts/GX_u6MhiMxs"
  },
  {
    id: 12,
    fase: 2,
    nivel: "Intermedio",
    titulo: "Supervivientes en sus bases",
    descripcion: "Mostrar el nombre de cada superviviente y el nombre de su base",
    consulta_sugerida: "SELECT S.Nombre, B.Nombre AS Base FROM Supervivientes S JOIN Bases B ON S.BaseID = B.BaseID;",
    pista: "Une Supervivientes con Bases y usa AS para renombrar columnas",
    puntos: 12,
    videoUrl: "https://www.youtube.com/shorts/GX_u6MhiMxs"
  },
  {
    id: 13,
    fase: 2,
    nivel: "Intermedio",
    titulo: "Recursos por tipo de base",
    descripcion: "Mostrar el tipo de base y la cantidad total de agua disponible",
    consulta_sugerida: "SELECT B.Tipo, R.AguaLitros FROM Bases B JOIN Recursos R ON B.BaseID = R.BaseID;",
    pista: "Relaciona las tablas por su clave común BaseID",
    puntos: 15,
    videoUrl: "https://www.youtube.com/shorts/GX_u6MhiMxs"
  },
  {
    id: 14,
    fase: 2,
    nivel: "Intermedio",
    titulo: "Médicos y ubicaciones",
    descripcion: "Mostrar nombre, edad y coordenadas de todos los médicos",
    consulta_sugerida: "SELECT S.Nombre, S.Edad, B.Latitud, B.Longitud FROM Supervivientes S JOIN Bases B ON S.BaseID = B.BaseID WHERE S.Profesion = 'Médico';",
    pista: "Combina JOIN con WHERE para filtrar por profesión",
    puntos: 15,
    videoUrl: "https://www.youtube.com/shorts/GX_u6MhiMxs"
  },
  {
    id: 15,
    fase: 2,
    nivel: "Intermedio",
    titulo: "Arsenal por base",
    descripcion: "Mostrar nombre de base y cantidad de armas, solo donde hay armas",
    consulta_sugerida: "SELECT B.Nombre, R.Armas FROM Bases B JOIN Recursos R ON B.BaseID = R.BaseID WHERE R.Armas > 0;",
    pista: "Filtra para mostrar solo bases con armas disponibles",
    puntos: 18,
    videoUrl: "https://www.youtube.com/shorts/GX_u6MhiMxs"
  },
  {
    id: 16,
    fase: 2,
    nivel: "Intermedio",
    titulo: "Bases del hemisferio norte con recursos",
    descripcion: "Mostrar bases con latitud positiva y sus recursos de comida",
    consulta_sugerida: "SELECT B.Nombre, B.Latitud, R.ComidaRaciones FROM Bases B JOIN Recursos R ON B.BaseID = R.BaseID WHERE B.Latitud > 0;",
    pista: "Hemisferio norte tiene latitud positiva (mayor que 0)",
    puntos: 18,
    videoUrl: "https://www.youtube.com/shorts/GX_u6MhiMxs"
  },
  {
    id: 17,
    fase: 2,
    nivel: "Intermedio",
    titulo: "Ingenieros estratégicos",
    descripcion: "Mostrar ingenieros con sus bases y recursos ordenados por edad",
    consulta_sugerida: "SELECT S.Nombre, S.Edad, B.Nombre AS Base, R.ComidaRaciones FROM Supervivientes S JOIN Bases B ON S.BaseID = B.BaseID JOIN Recursos R ON B.BaseID = R.BaseID WHERE S.Profesion = 'Ingeniero' ORDER BY S.Edad;",
    pista: "Necesitas unir tres tablas y filtrar por profesión",
    puntos: 20,
    videoUrl: "https://www.youtube.com/shorts/GX_u6MhiMxs"
  },
  {
    id: 18,
    fase: 2,
    nivel: "Intermedio",
    titulo: "Bases humanas bien abastecidas",
    descripcion: "Mostrar bases humanas con más de 30 raciones de comida",
    consulta_sugerida: "SELECT B.Nombre, B.Tipo, R.ComidaRaciones FROM Bases B JOIN Recursos R ON B.BaseID = R.BaseID WHERE B.Tipo = 'Humana' AND R.ComidaRaciones > 30;",
    pista: "Combina condiciones con AND: tipo de base Y cantidad de comida",
    puntos: 20,
    videoUrl: "https://www.youtube.com/shorts/GX_u6MhiMxs"
  },
  {
    id: 19,
    fase: 2,
    nivel: "Intermedio",
    titulo: "Supervivientes jóvenes en bases lejanas",
    descripcion: "Mostrar supervivientes menores de 30 años en bases con longitud negativa",
    consulta_sugerida: "SELECT S.Nombre, S.Edad, B.Nombre AS Base, B.Longitud FROM Supervivientes S JOIN Bases B ON S.BaseID = B.BaseID WHERE S.Edad < 30 AND B.Longitud < 0;",
    pista: "Filtra por edad AND longitud negativa (hemisferio occidental)",
    puntos: 22,
    videoUrl: "https://www.youtube.com/shorts/GX_u6MhiMxs"
  },
  {
    id: 20,
    fase: 2,
    nivel: "Intermedio",
    titulo: "Información completa de supervivencia",
    descripcion: "Mostrar nombre del superviviente, base, profesión y todos los recursos disponibles",
    consulta_sugerida: "SELECT S.Nombre, B.Nombre AS Base, S.Profesion, R.ComidaRaciones, R.AguaLitros, R.Armas FROM Supervivientes S JOIN Bases B ON S.BaseID = B.BaseID JOIN Recursos R ON B.BaseID = R.BaseID;",
    pista: "Une las tres tablas principales para obtener información completa",
    puntos: 25,
    videoUrl: "https://www.youtube.com/shorts/GX_u6MhiMxs"
  },
  
  // FASE 3 - Agregaciones (21-30)
  {
    id: 21,
    fase: 3,
    nivel: "Avanzado",
    titulo: "Censo de supervivientes",
    descripcion: "Contar cuántos supervivientes hay en total",
    consulta_sugerida: "SELECT COUNT(*) AS TotalSupervivientes FROM Supervivientes;",
    pista: "Usa COUNT(*) para contar todas las filas",
    puntos: 15,
    videoUrl: "https://www.youtube.com/shorts/GX_u6MhiMxs"
  },
  {
    id: 22,
    fase: 3,
    nivel: "Avanzado",
    titulo: "Distribución profesional",
    descripcion: "Contar cuántos supervivientes hay por cada profesión",
    consulta_sugerida: "SELECT Profesion, COUNT(*) AS Cantidad FROM Supervivientes GROUP BY Profesion;",
    pista: "GROUP BY agrupa filas y COUNT cuenta elementos en cada grupo",
    puntos: 18,
    videoUrl: "https://www.youtube.com/shorts/GX_u6MhiMxs"
  },
  {
    id: 23,
    fase: 3,
    nivel: "Avanzado",
    titulo: "Edad promedio de la resistencia",
    descripcion: "Calcular la edad promedio de todos los supervivientes",
    consulta_sugerida: "SELECT AVG(Edad) AS EdadPromedio FROM Supervivientes;",
    pista: "AVG() calcula el promedio de una columna numérica",
    puntos: 18,
    videoUrl: "https://www.youtube.com/shorts/GX_u6MhiMxs"
  },
  {
    id: 24,
    fase: 3,
    nivel: "Avanzado",
    titulo: "Inventario total de recursos",
    descripcion: "Sumar toda la comida, agua y armas disponibles",
    consulta_sugerida: "SELECT SUM(ComidaRaciones) AS TotalComida, SUM(AguaLitros) AS TotalAgua, SUM(Armas) AS TotalArmas FROM Recursos;",
    pista: "SUM() suma todos los valores de una columna",
    puntos: 20,
    videoUrl: "https://www.youtube.com/shorts/GX_u6MhiMxs"
  },
  {
    id: 25,
    fase: 3,
    nivel: "Avanzado",
    titulo: "Supervivientes por base",
    descripcion: "Mostrar cuántos supervivientes hay en cada base",
    consulta_sugerida: "SELECT B.Nombre, COUNT(S.SupervivienteID) AS NumeroSupervivientes FROM Bases B LEFT JOIN Supervivientes S ON B.BaseID = S.BaseID GROUP BY B.Nombre;",
    pista: "LEFT JOIN incluye bases sin supervivientes, GROUP BY agrupa por base",
    puntos: 25,
    videoUrl: "https://www.youtube.com/shorts/GX_u6MhiMxs"
  },
  {
    id: 26,
    fase: 3,
    nivel: "Avanzado",
    titulo: "Estadísticas por tipo de base",
    descripcion: "Mostrar tipo de base y promedio de raciones de comida por tipo",
    consulta_sugerida: "SELECT B.Tipo, AVG(R.ComidaRaciones) AS PromedioComida FROM Bases B JOIN Recursos R ON B.BaseID = R.BaseID GROUP BY B.Tipo;",
    pista: "Agrupa por tipo de base y calcula el promedio de cada grupo",
    puntos: 25,
    videoUrl: "https://www.youtube.com/shorts/GX_u6MhiMxs"
  },
  {
    id: 27,
    fase: 3,
    nivel: "Avanzado",
    titulo: "Rangos de edad por profesión",
    descripcion: "Mostrar la edad mínima y máxima por cada profesión",
    consulta_sugerida: "SELECT Profesion, MIN(Edad) AS EdadMinima, MAX(Edad) AS EdadMaxima FROM Supervivientes GROUP BY Profesion;",
    pista: "MIN() y MAX() encuentran el menor y mayor valor respectivamente",
    puntos: 28,
    videoUrl: "https://www.youtube.com/shorts/GX_u6MhiMxs"
  },
  {
    id: 28,
    fase: 3,
    nivel: "Avanzado",
    titulo: "Bases bien pobladas",
    descripcion: "Mostrar solo las bases que tienen más de 2 supervivientes",
    consulta_sugerida: "SELECT B.Nombre, COUNT(S.SupervivienteID) AS NumSupervivientes FROM Bases B JOIN Supervivientes S ON B.BaseID = S.BaseID GROUP BY B.Nombre HAVING COUNT(S.SupervivienteID) > 2;",
    pista: "HAVING filtra grupos después de GROUP BY (diferente a WHERE)",
    puntos: 30,
    videoUrl: "https://www.youtube.com/shorts/GX_u6MhiMxs"
  },
  {
    id: 29,
    fase: 3,
    nivel: "Avanzado",
    titulo: "Profesiones con experiencia",
    descripcion: "Mostrar profesiones cuya edad promedio sea mayor a 35 años",
    consulta_sugerida: "SELECT Profesion, AVG(Edad) AS EdadPromedio FROM Supervivientes GROUP BY Profesion HAVING AVG(Edad) > 35;",
    pista: "Combina GROUP BY con HAVING para filtrar grupos por su promedio",
    puntos: 30,
    videoUrl: "https://www.youtube.com/shorts/GX_u6MhiMxs"
  },
  {
    id: 30,
    fase: 3,
    nivel: "Avanzado",
    titulo: "Resumen estratégico completo",
    descripcion: "Mostrar por cada base: nombre, tipo, número de supervivientes y total de recursos",
    consulta_sugerida: "SELECT B.Nombre, B.Tipo, COUNT(S.SupervivienteID) AS NumSupervivientes, R.ComidaRaciones + R.AguaLitros + R.Armas AS RecursosTotales FROM Bases B LEFT JOIN Supervivientes S ON B.BaseID = S.BaseID JOIN Recursos R ON B.BaseID = R.BaseID GROUP BY B.Nombre, B.Tipo, R.ComidaRaciones, R.AguaLitros, R.Armas;",
    pista: "Combina múltiples JOINs, GROUP BY y operaciones aritméticas",
    puntos: 35,
    videoUrl: "https://www.youtube.com/shorts/GX_u6MhiMxs"
  },
  
  // FASE 4 - Consultas avanzadas (31-40)
  {
    id: 31,
    fase: 4,
    nivel: "Experto",
    titulo: "Base con más supervivientes",
    descripcion: "Encontrar qué base tiene el mayor número de supervivientes",
    consulta_sugerida: "SELECT TOP 1 B.Nombre, COUNT(S.SupervivienteID) AS NumSupervivientes FROM Bases B JOIN Supervivientes S ON B.BaseID = S.BaseID GROUP BY B.Nombre ORDER BY COUNT(S.SupervivienteID) DESC;",
    pista: "Ordena por el conteo en orden descendente y toma solo el primero",
    puntos: 35,
    videoUrl: "https://www.youtube.com/shorts/GX_u6MhiMxs"
  },
  {
    id: 32,
    fase: 4,
    nivel: "Experto",
    titulo: "Supervivientes en bases críticas",
    descripcion: "Mostrar supervivientes que están en bases con menos de 20 raciones de comida",
    consulta_sugerida: "SELECT S.Nombre, B.Nombre AS Base, R.ComidaRaciones FROM Supervivientes S JOIN Bases B ON S.BaseID = B.BaseID JOIN Recursos R ON B.BaseID = R.BaseID WHERE R.ComidaRaciones < 20;",
    pista: "Necesitas unir las tres tablas y filtrar por recursos críticos",
    puntos: 30,
    videoUrl: "https://www.youtube.com/shorts/GX_u6MhiMxs"
  },
  {
    id: 33,
    fase: 4,
    nivel: "Experto",
    titulo: "Profesionales únicos por base",
    descripcion: "Contar cuántas profesiones diferentes hay en cada base",
    consulta_sugerida: "SELECT B.Nombre, COUNT(DISTINCT S.Profesion) AS ProfesionesUnicas FROM Bases B JOIN Supervivientes S ON B.BaseID = S.BaseID GROUP BY B.Nombre;",
    pista: "COUNT(DISTINCT) cuenta valores únicos, eliminando duplicados",
    puntos: 35,
    videoUrl: "https://www.youtube.com/shorts/GX_u6MhiMxs"
  },
  {
    id: 34,
    fase: 4,
    nivel: "Experto",
    titulo: "Supervivientes mayores que el promedio",
    descripcion: "Mostrar supervivientes cuya edad sea mayor al promedio general",
    consulta_sugerida: "SELECT Nombre, Edad FROM Supervivientes WHERE Edad > (SELECT AVG(Edad) FROM Supervivientes);",
    pista: "Usa una subconsulta para calcular el promedio y comparar",
    puntos: 40,
    videoUrl: "https://www.youtube.com/shorts/GX_u6MhiMxs"
  },
  {
    id: 35,
    fase: 4,
    nivel: "Experto",
    titulo: "Bases mejor abastecidas que la media",
    descripcion: "Mostrar bases cuya comida esté por encima del promedio",
    consulta_sugerida: "SELECT B.Nombre, R.ComidaRaciones FROM Bases B JOIN Recursos R ON B.BaseID = R.BaseID WHERE R.ComidaRaciones > (SELECT AVG(ComidaRaciones) FROM Recursos);",
    pista: "Subconsulta para calcular el promedio de comida y comparar",
    puntos: 40,
    videoUrl: "https://www.youtube.com/shorts/GX_u6MhiMxs"
  },
  {
    id: 36,
    fase: 4,
    nivel: "Experto",
    titulo: "Médicos en zonas de riesgo",
    descripcion: "Encontrar médicos que están en bases con menos armas que el promedio",
    consulta_sugerida: "SELECT S.Nombre, B.Nombre AS Base, R.Armas FROM Supervivientes S JOIN Bases B ON S.BaseID = B.BaseID JOIN Recursos R ON B.BaseID = R.BaseID WHERE S.Profesion = 'Médico' AND R.Armas < (SELECT AVG(Armas) FROM Recursos);",
    pista: "Combina JOIN, WHERE y subconsulta para múltiples condiciones",
    puntos: 45,
    videoUrl: "https://www.youtube.com/shorts/GX_u6MhiMxs"
  },
  {
    id: 37,
    fase: 4,
    nivel: "Experto",
    titulo: "Ranking de bases por recursos",
    descripcion: "Mostrar bases ordenadas por total de recursos (comida + agua + armas)",
    consulta_sugerida: "SELECT B.Nombre, (R.ComidaRaciones + R.AguaLitros + R.Armas) AS RecursosTotales FROM Bases B JOIN Recursos R ON B.BaseID = R.BaseID ORDER BY RecursosTotales DESC;",
    pista: "Suma columnas y ordena por el resultado calculado",
    puntos: 40,
    videoUrl: "https://www.youtube.com/shorts/GX_u6MhiMxs"
  },
  {
    id: 38,
    fase: 4,
    nivel: "Experto",
    titulo: "Bases sin médicos",
    descripcion: "Identificar bases que no tienen ningún médico",
    consulta_sugerida: "SELECT B.Nombre FROM Bases B WHERE B.BaseID NOT IN (SELECT DISTINCT S.BaseID FROM Supervivientes S WHERE S.Profesion = 'Médico');",
    pista: "Usa NOT IN con subconsulta para encontrar bases que no aparecen en el subconjunto",
    puntos: 45,
    videoUrl: "https://www.youtube.com/shorts/GX_u6MhiMxs"
  },
  {
    id: 39,
    fase: 4,
    nivel: "Experto",
    titulo: "Análisis de eficiencia por profesión",
    descripcion: "Mostrar la profesión con mayor ratio de supervivientes por base",
    consulta_sugerida: "SELECT TOP 1 S.Profesion, AVG(CAST(Conteo AS FLOAT)) AS PromedioSupervivientesPorBase FROM (SELECT S.Profesion, S.BaseID, COUNT(*) AS Conteo FROM Supervivientes S GROUP BY S.Profesion, S.BaseID) AS SubConsulta GROUP BY SubConsulta.Profesion ORDER BY PromedioSupervivientesPorBase DESC;",
    pista: "Necesitas subconsulta, GROUP BY anidado y cálculo de promedio",
    puntos: 50,
    videoUrl: "https://www.youtube.com/shorts/GX_u6MhiMxs"
  },
  {
    id: 40,
    fase: 4,
    nivel: "Experto",
    titulo: "Supervivientes en bases estratégicas",
    descripcion: "Mostrar supervivientes que están en las 3 bases con más recursos totales",
    consulta_sugerida: "SELECT S.Nombre, B.Nombre AS Base FROM Supervivientes S JOIN Bases B ON S.BaseID = B.BaseID WHERE B.BaseID IN (SELECT TOP 3 R.BaseID FROM Recursos R ORDER BY (R.ComidaRaciones + R.AguaLitros + R.Armas) DESC);",
    pista: "Subconsulta para encontrar top 3 bases, luego filtrar supervivientes",
    puntos: 50,
    videoUrl: "https://www.youtube.com/shorts/GX_u6MhiMxs"
  },
  
  // FASE 5 - Consultas estratégicas (41-50)
  {
    id: 41,
    fase: 5,
    nivel: "Maestro",
    titulo: "Análisis completo de supervivencia",
    descripcion: "Crear un informe completo: base, tipo, supervivientes, recursos y profesiones únicas",
    consulta_sugerida: "WITH BaseInfo AS (SELECT B.BaseID, B.Nombre, B.Tipo, COUNT(S.SupervivienteID) AS NumSupervivientes, COUNT(DISTINCT S.Profesion) AS ProfesionesUnicas FROM Bases B LEFT JOIN Supervivientes S ON B.BaseID = S.BaseID GROUP BY B.BaseID, B.Nombre, B.Tipo) SELECT BI.Nombre, BI.Tipo, BI.NumSupervivientes, BI.ProfesionesUnicas, (R.ComidaRaciones + R.AguaLitros + R.Armas) AS RecursosTotales FROM BaseInfo BI JOIN Recursos R ON BI.BaseID = R.BaseID ORDER BY RecursosTotales DESC;",
    pista: "Usa CTE (WITH) para crear una consulta temporal y luego unirla",
    puntos: 60,
    videoUrl: "https://www.youtube.com/shorts/GX_u6MhiMxs"
  },
  {
    id: 42,
    fase: 5,
    nivel: "Maestro",
    titulo: "Red de coordinación médica",
    descripcion: "Identificar bases que necesitan médicos (sin médicos pero con otros supervivientes)",
    consulta_sugerida: "WITH BasesSinMedicos AS (SELECT B.BaseID, B.Nombre FROM Bases B WHERE B.BaseID NOT IN (SELECT DISTINCT S.BaseID FROM Supervivientes S WHERE S.Profesion = 'Médico')), BasesConSupervivientes AS (SELECT B.BaseID FROM Bases B JOIN Supervivientes S ON B.BaseID = S.BaseID GROUP BY B.BaseID HAVING COUNT(S.SupervivienteID) > 0) SELECT BSM.Nombre FROM BasesSinMedicos BSM JOIN BasesConSupervivientes BCS ON BSM.BaseID = BCS.BaseID;",
    pista: "Usa múltiples CTEs para crear conjuntos de datos y luego intersectarlos",
    puntos: 65,
    videoUrl: "https://www.youtube.com/shorts/GX_u6MhiMxs"
  },
  {
    id: 43,
    fase: 5,
    nivel: "Maestro",
    titulo: "Optimización de recursos críticos",
    descripcion: "Identificar bases con recursos bajo el percentil 25 que necesitan reabastecimiento",
    consulta_sugerida: "WITH RecursosStats AS (SELECT PERCENTILE_CONT(0.25) WITHIN GROUP (ORDER BY ComidaRaciones) AS Q1_Comida, PERCENTILE_CONT(0.25) WITHIN GROUP (ORDER BY AguaLitros) AS Q1_Agua, PERCENTILE_CONT(0.25) WITHIN GROUP (ORDER BY Armas) AS Q1_Armas FROM Recursos) SELECT B.Nombre, R.ComidaRaciones, R.AguaLitros, R.Armas FROM Bases B JOIN Recursos R ON B.BaseID = R.BaseID CROSS JOIN RecursosStats RS WHERE R.ComidaRaciones <= RS.Q1_Comida OR R.AguaLitros <= RS.Q1_Agua OR R.Armas <= RS.Q1_Armas;",
    pista: "PERCENTILE_CONT calcula percentiles, CROSS JOIN permite usar los valores calculados",
    puntos: 70,
    videoUrl: "https://www.youtube.com/shorts/GX_u6MhiMxs"
  },
  {
    id: 44,
    fase: 5,
    nivel: "Maestro",
    titulo: "Matriz de competencias por base",
    descripcion: "Crear una matriz que muestre qué profesiones faltan en cada base",
    consulta_sugerida: "WITH TodasProfesiones AS (SELECT DISTINCT Profesion FROM Supervivientes), TodasBases AS (SELECT BaseID, Nombre FROM Bases), MatrizCompleta AS (SELECT TB.BaseID, TB.Nombre AS Base, TP.Profesion FROM TodasBases TB CROSS JOIN TodasProfesiones TP), ProfesionesExistentes AS (SELECT S.BaseID, S.Profesion FROM Supervivientes S) SELECT MC.Base, MC.Profesion FROM MatrizCompleta MC LEFT JOIN ProfesionesExistentes PE ON MC.BaseID = PE.BaseID AND MC.Profesion = PE.Profesion WHERE PE.Profesion IS NULL ORDER BY MC.Base, MC.Profesion;",
    pista: "CROSS JOIN crea todas las combinaciones, LEFT JOIN encuentra lo que falta",
    puntos: 75,
    videoUrl: "https://www.youtube.com/shorts/GX_u6MhiMxs"
  },
  {
    id: 45,
    fase: 5,
    nivel: "Maestro",
    titulo: "Análisis de clusters geográficos",
    descripcion: "Agrupar bases por proximidad geográfica y analizar sus recursos combinados",
    consulta_sugerida: "WITH ClusterGeo AS (SELECT BaseID, Nombre, CASE WHEN Latitud > 0 AND Longitud > 0 THEN 'NorEste' WHEN Latitud > 0 AND Longitud <= 0 THEN 'NorOeste' WHEN Latitud <= 0 AND Longitud > 0 THEN 'SurEste' ELSE 'SurOeste' END AS Cluster FROM Bases) SELECT CG.Cluster, COUNT(CG.BaseID) AS NumBases, AVG(R.ComidaRaciones) AS PromedioComida, AVG(R.AguaLitros) AS PromedioAgua, AVG(R.Armas) AS PromedioArmas, SUM(R.ComidaRaciones + R.AguaLitros + R.Armas) AS RecursosTotalesCluster FROM ClusterGeo CG JOIN Recursos R ON CG.BaseID = R.BaseID GROUP BY CG.Cluster ORDER BY RecursosTotalesCluster DESC;",
    pista: "CASE WHEN crea categorías geográficas, luego agrupa y analiza por cluster",
    puntos: 80,
    videoUrl: "https://www.youtube.com/shorts/GX_u6MhiMxs"
  },
  {
    id: 46,
    fase: 5,
    nivel: "Maestro",
    titulo: "Simulación de redistribución de recursos",
    descripcion: "Calcular cómo quedarían los recursos si se redistribuyeran equitativamente",
    consulta_sugerida: "WITH RecursosTotales AS (SELECT SUM(ComidaRaciones) AS TotalComida, SUM(AguaLitros) AS TotalAgua, SUM(Armas) AS TotalArmas, COUNT(*) AS NumBases FROM Recursos), DistribucionIdeal AS (SELECT TotalComida / NumBases AS ComidaPorBase, TotalAgua / NumBases AS AguaPorBase, TotalArmas / NumBases AS ArmasPorBase FROM RecursosTotales) SELECT B.Nombre, R.ComidaRaciones AS ComidaActual, DI.ComidaPorBase AS ComidaIdeal, (R.ComidaRaciones - DI.ComidaPorBase) AS DiferenciaComida, R.AguaLitros AS AguaActual, DI.AguaPorBase AS AguaIdeal, (R.AguaLitros - DI.AguaPorBase) AS DiferenciaAgua FROM Bases B JOIN Recursos R ON B.BaseID = R.BaseID CROSS JOIN DistribucionIdeal DI ORDER BY DiferenciaComida DESC;",
    pista: "Calcula totales, divide equitativamente y compara con situación actual",
    puntos: 85,
    videoUrl: "https://www.youtube.com/shorts/GX_u6MhiMxs"
  },
  {
    id: 47,
    fase: 5,
    nivel: "Maestro",
    titulo: "Índice de vulnerabilidad por base",
    descripcion: "Crear un índice de vulnerabilidad considerando recursos, supervivientes y diversidad profesional",
    consulta_sugerida: "WITH BaseMetrics AS (SELECT B.BaseID, B.Nombre, COUNT(S.SupervivienteID) AS NumSupervivientes, COUNT(DISTINCT S.Profesion) AS DiversidadProfesional, (R.ComidaRaciones + R.AguaLitros + R.Armas) AS RecursosTotales FROM Bases B LEFT JOIN Supervivientes S ON B.BaseID = S.BaseID JOIN Recursos R ON B.BaseID = R.BaseID GROUP BY B.BaseID, B.Nombre, R.ComidaRaciones, R.AguaLitros, R.Armas), Maximos AS (SELECT MAX(NumSupervivientes) AS MaxSupervivientes, MAX(DiversidadProfesional) AS MaxDiversidad, MAX(RecursosTotales) AS MaxRecursos FROM BaseMetrics) SELECT BM.Nombre, ROUND(((BM.NumSupervivientes * 1.0 / M.MaxSupervivientes) * 0.4 + (BM.DiversidadProfesional * 1.0 / M.MaxDiversidad) * 0.3 + (BM.RecursosTotales * 1.0 / M.MaxRecursos) * 0.3) * 100, 2) AS IndiceSeguridad, ROUND((100 - ((BM.NumSupervivientes * 1.0 / M.MaxSupervivientes) * 0.4 + (BM.DiversidadProfesional * 1.0 / M.MaxDiversidad) * 0.3 + (BM.RecursosTotales * 1.0 / M.MaxRecursos) * 0.3) * 100), 2) AS IndiceVulnerabilidad FROM BaseMetrics BM CROSS JOIN Maximos M ORDER BY IndiceVulnerabilidad DESC;",
    pista: "Normaliza múltiples métricas, aplica pesos y calcula un índice compuesto",
    puntos: 90,
    videoUrl: "https://www.youtube.com/shorts/GX_u6MhiMxs"
  },
  {
    id: 48,
    fase: 5,
    nivel: "Maestro",
    titulo: "Análisis de sostenibilidad a largo plazo",
    descripcion: "Estimar cuántos días pueden sobrevivir las bases con sus recursos actuales",
    consulta_sugerida: "WITH ConsumoBase AS (SELECT B.BaseID, B.Nombre, COUNT(S.SupervivienteID) AS NumSupervivientes, R.ComidaRaciones, R.AguaLitros, CASE WHEN COUNT(S.SupervivienteID) = 0 THEN NULL ELSE R.ComidaRaciones / (COUNT(S.SupervivienteID) * 2.0) END AS DiasSobrevivenciaComida, CASE WHEN COUNT(S.SupervivienteID) = 0 THEN NULL ELSE R.AguaLitros / (COUNT(S.SupervivienteID) * 3.0) END AS DiasSobrevivenciaAgua FROM Bases B LEFT JOIN Supervivientes S ON B.BaseID = S.BaseID JOIN Recursos R ON B.BaseID = R.BaseID GROUP BY B.BaseID, B.Nombre, R.ComidaRaciones, R.AguaLitros) SELECT Nombre, NumSupervivientes, ComidaRaciones, AguaLitros, ROUND(DiasSobrevivenciaComida, 1) AS DiasComida, ROUND(DiasSobrevivenciaAgua, 1) AS DiasAgua, CASE WHEN DiasSobrevivenciaComida IS NULL OR DiasSobrevivenciaAgua IS NULL THEN NULL ELSE ROUND(CASE WHEN DiasSobrevivenciaComida < DiasSobrevivenciaAgua THEN DiasSobrevivenciaComida ELSE DiasSobrevivenciaAgua END, 1) END AS DiasSupervivenciaLimitante FROM ConsumoBase ORDER BY DiasSupervivenciaLimitante ASC;",
    pista: "Calcula consumo diario estimado y divide recursos entre consumo",
    puntos: 95,
    videoUrl: "https://www.youtube.com/shorts/GX_u6MhiMxs"
  },
  {
    id: 49,
    fase: 5,
    nivel: "Maestro",
    titulo: "Red de evacuación optimizada",
    descripcion: "Identificar rutas de evacuación: bases origen vulnerables y destinos seguros con capacidad",
    consulta_sugerida: "WITH VulnerabilidadBase AS (SELECT B.BaseID, B.Nombre, B.Latitud, B.Longitud, COUNT(S.SupervivienteID) AS Poblacion, (R.ComidaRaciones + R.AguaLitros + R.Armas) AS RecursosTotales, CASE WHEN COUNT(S.SupervivienteID) = 0 THEN 0 ELSE (R.ComidaRaciones + R.AguaLitros + R.Armas) / COUNT(S.SupervivienteID) END AS RecursosPorPersona FROM Bases B LEFT JOIN Supervivientes S ON B.BaseID = S.BaseID JOIN Recursos R ON B.BaseID = R.BaseID GROUP BY B.BaseID, B.Nombre, B.Latitud, B.Longitud, R.ComidaRaciones, R.AguaLitros, R.Armas), BasesSeguras AS (SELECT * FROM VulnerabilidadBase WHERE RecursosPorPersona > 50), BasesVulnerables AS (SELECT * FROM VulnerabilidadBase WHERE RecursosPorPersona < 20 AND Poblacion > 0) SELECT BV.Nombre AS BaseVulnerable, BV.Poblacion AS PersonasEvacuar, BS.Nombre AS BaseDestino, BS.RecursosPorPersona AS CapacidadDestino, ROUND(SQRT(POWER(BV.Latitud - BS.Latitud, 2) + POWER(BV.Longitud - BS.Longitud, 2)), 4) AS DistanciaApprox FROM BasesVulnerables BV CROSS JOIN BasesSeguras BS WHERE BV.BaseID != BS.BaseID ORDER BY BV.Nombre, DistanciaApprox ASC;",
    pista: "Clasifica bases por seguridad, calcula distancias y encuentra pares origen-destino",
    puntos: 100,
    videoUrl: "https://www.youtube.com/shorts/GX_u6MhiMxs"
  },
  {
    id: 50,
    fase: 5,
    nivel: "Maestro",
    titulo: "Algoritmo maestro de supervivencia",
    descripcion: "Crear el análisis definitivo: combinar todos los factores para el plan de supervivencia global",
    consulta_sugerida: "WITH AnalisisCompleto AS (SELECT B.BaseID, B.Nombre, B.Tipo, B.Latitud, B.Longitud, COUNT(S.SupervivienteID) AS Poblacion, COUNT(DISTINCT S.Profesion) AS DiversidadProfesional, (R.ComidaRaciones + R.AguaLitros + R.Armas) AS RecursosTotales, CASE WHEN COUNT(S.SupervivienteID) = 0 THEN 0 ELSE (R.ComidaRaciones + R.AguaLitros + R.Armas) / COUNT(S.SupervivienteID) END AS RecursosPorPersona, CASE WHEN COUNT(S.SupervivienteID) = 0 THEN NULL ELSE R.ComidaRaciones / (COUNT(S.SupervivienteID) * 2.0) END AS DiasSupervivencia FROM Bases B LEFT JOIN Supervivientes S ON B.BaseID = S.BaseID JOIN Recursos R ON B.BaseID = R.BaseID GROUP BY B.BaseID, B.Nombre, B.Tipo, B.Latitud, B.Longitud, R.ComidaRaciones, R.AguaLitros, R.Armas), Ranking AS (SELECT *, ROW_NUMBER() OVER (ORDER BY RecursosPorPersona DESC, DiversidadProfesional DESC, DiasSupervivencia DESC) AS RankingSeguridad, CASE WHEN RecursosPorPersona >= 50 AND DiversidadProfesional >= 3 AND DiasSupervivencia >= 30 THEN 'FORTALEZA' WHEN RecursosPorPersona >= 30 AND DiversidadProfesional >= 2 AND DiasSupervivencia >= 15 THEN 'REFUGIO' WHEN RecursosPorPersona >= 15 AND Poblacion > 0 THEN 'SUPERVIVENCIA' WHEN Poblacion > 0 THEN 'CRÍTICA' ELSE 'ABANDONADA' END AS ClasificacionEstrategica FROM AnalisisCompleto) SELECT RankingSeguridad, Nombre, Tipo, ClasificacionEstrategica, Poblacion, DiversidadProfesional, RecursosTotales, ROUND(RecursosPorPersona, 1) AS RecursosPorPersona, ROUND(DiasSupervivencia, 1) AS DiasSupervivencia, ROUND(Latitud, 2) AS Lat, ROUND(Longitud, 2) AS Lng FROM Ranking ORDER BY RankingSeguridad;",
    pista: "Combina todas las métricas, crea clasificaciones estratégicas y rankings finales",
    puntos: 150,
    videoUrl: "https://www.youtube.com/shorts/GX_u6MhiMxs"
  }
];

let puntuacionTotal = parseInt(localStorage.getItem('puntuacionAtapuerca') || '0');
let retosCompletados = JSON.parse(localStorage.getItem('retosCompletados') || '[]');
let retosVisibles = JSON.parse(localStorage.getItem('retosVisibles') || '[1, 2, 3, 4, 5]'); // Solo primeros 5 visibles inicialmente
let retoActual = JSON.parse(localStorage.getItem('retoActual') || 'null');

function cargarRetos() {
  const container = document.getElementById('retos-container');
  if (!container) return;
  
  let html = `
    <div style="margin-bottom: 2em; padding: 1.5em; background: var(--bg-light); border-radius: 5px; border-left: 4px solid var(--accent-cyan);">
      <h3 style="margin: 0 0 1em 0; color: var(--accent-cyan);">🏆 Centro de comando - Progreso de la resistencia</h3>
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1em; margin-bottom: 1em;">
        <div style="text-align: center; padding: 1em; background: var(--bg-medium); border-radius: 5px;">
          <div style="font-size: 2em; color: var(--primary-green);">${puntuacionTotal}</div>
          <div style="font-size: 0.9em; color: var(--text-secondary);">Puntos totales</div>
        </div>
        <div style="text-align: center; padding: 1em; background: var(--bg-medium); border-radius: 5px;">
          <div style="font-size: 2em; color: var(--accent-orange);">${retosCompletados.length}</div>
          <div style="font-size: 0.9em; color: var(--text-secondary);">Retos completados</div>
        </div>
        <div style="text-align: center; padding: 1em; background: var(--bg-medium); border-radius: 5px;">
          <div style="font-size: 2em; color: var(--accent-cyan);">${retosVisibles.length}</div>
          <div style="font-size: 0.9em; color: var(--text-secondary);">Retos desbloqueados</div>
        </div>
      </div>
      <button onclick="desbloquearSiguienteReto()" style="
        background: var(--accent-orange); 
        color: var(--bg-dark); 
        border: none; 
        padding: 0.8em 1.5em; 
        border-radius: 5px; 
        font-weight: bold;
        margin-right: 1em;
      ">🔓 Desbloquear siguiente reto</button>
      <button onclick="toggleTodosLosRetos()" style="
        background: var(--bg-medium); 
        color: var(--accent-cyan); 
        border: 1px solid var(--accent-cyan); 
        padding: 0.8em 1.5em; 
        border-radius: 5px; 
        font-weight: bold;
      ">👁️ Mostrar/Ocultar todos</button>
    </div>
  `;
  
  // Agrupar retos por fase
  const fases = {};
  retos.forEach(reto => {
    if (!fases[reto.fase]) fases[reto.fase] = [];
    fases[reto.fase].push(reto);
  });
  
  // Mostrar cada fase
  Object.keys(fases).forEach(fase => {
    const faseInfo = getFaseInfo(parseInt(fase));
    html += `
      <div style="margin: 2em 0;">
        <h3 style="color: ${faseInfo.color}; font-size: 1.5em; margin-bottom: 1em; border-bottom: 2px solid ${faseInfo.color}; padding-bottom: 0.5em;">
          ${faseInfo.icono} ${faseInfo.titulo}
        </h3>
        <p style="color: var(--text-secondary); margin-bottom: 1.5em; font-style: italic;">${faseInfo.descripcion}</p>
    `;
    
    fases[fase].forEach(reto => {
      if (retosVisibles.includes(reto.id)) {
        html += generarHTMLReto(reto, faseInfo.color);
      }
    });
    
    html += '</div>';
  });
  
  container.innerHTML = html;
}

function getFaseInfo(fase) {
  const fasesInfo = {
    1: {
      titulo: "Fase 1 — Nivel básico (1–10)",
      descripcion: "Consultas SELECT simples sobre una tabla",
      color: "var(--primary-green)",
      icono: "📊"
    },
    2: {
      titulo: "Fase 2 — Introducción a JOIN (11–20)",
      descripcion: "Combinar dos tablas básico",
      color: "var(--accent-cyan)",
      icono: "🔗"
    },
    3: {
      titulo: "Fase 3 — Agregaciones (21–30)",
      descripcion: "GROUP BY, COUNT, SUM, AVG",
      color: "var(--accent-orange)",
      icono: "📈"
    },
    4: {
      titulo: "Fase 4 — Consultas avanzadas (31–40)",
      descripcion: "Subconsultas, condiciones complejas",
      color: "#ff4444",
      icono: "🔍"
    },
    5: {
      titulo: "Fase 5 — Consultas estratégicas (41–50)",
      descripcion: "CTE, subconsultas anidadas, análisis complejo",
      color: "#ff44ff",
      icono: "🛡️"
    }
  };
  return fasesInfo[fase] || fasesInfo[1];
}

function generarHTMLReto(reto, colorFase) {
  const completado = retosCompletados.includes(reto.id);
  const esActual = retoActual && retoActual.id === reto.id;
  
  return `
    <div class="reto-card" style="
      margin: 1.5em 0; 
      padding: 1.5em; 
      background: ${esActual ? 'var(--bg-medium)' : 'var(--bg-light)'}; 
      border-radius: 8px; 
      border-left: 4px solid ${esActual ? 'var(--accent-orange)' : colorFase};
      ${completado ? 'opacity: 0.8; border-color: var(--accent-cyan);' : ''}
      ${esActual ? 'box-shadow: 0 0 15px rgba(255, 136, 0, 0.3);' : ''}
    ">
      <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 1em;">
        <h4 style="margin: 0; color: ${colorFase}; display: flex; align-items: center; gap: 0.5em;">
          ${completado ? '✅' : (esActual ? '🎯' : '🔒')} 
          Reto ${reto.id}: ${reto.titulo}
          ${esActual ? '<span style="background: var(--accent-orange); color: var(--bg-dark); padding: 0.2em 0.5em; border-radius: 3px; font-size: 0.7em; margin-left: 0.5em;">ACTUAL</span>' : ''}
        </h4>
        <span style="
          background: ${colorFase}; 
          color: var(--bg-dark); 
          padding: 0.3em 0.8em; 
          border-radius: 15px; 
          font-size: 0.8em; 
          font-weight: bold;
        ">${reto.nivel} - ${reto.puntos}pts</span>
      </div>
      
      <p style="margin: 0 0 1em 0; color: var(--text-secondary); line-height: 1.5;">${reto.descripcion}</p>
      
      <!-- Video de YouTube embebido -->
      <div style="margin: 1em 0; border-radius: 8px; overflow: hidden; border: 2px solid ${colorFase};">
        <iframe 
          width="100%" 
          height="200" 
          src="${convertirURLYoutube(reto.videoUrl)}" 
          frameborder="0" 
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
          allowfullscreen
          style="display: block;">
        </iframe>
      </div>
      
      <div style="margin: 1em 0; display: flex; flex-wrap: wrap; gap: 0.5em;">
        <button onclick="mostrarPista(${reto.id})" style="
          background: var(--bg-medium); 
          color: var(--accent-orange); 
          border: 1px solid var(--accent-orange); 
          padding: 0.5em 1em; 
          border-radius: 3px; 
          font-size: 0.9em;
        ">💡 Pista</button>
        
        <button onclick="seleccionarReto(${reto.id})" style="
          background: var(--accent-cyan); 
          color: var(--bg-dark); 
          border: none; 
          padding: 0.5em 1em; 
          border-radius: 3px; 
          font-size: 0.9em;
          font-weight: bold;
        ">🎯 Seleccionar reto</button>
        
        <button onclick="cargarRetoEnTerminal(${reto.id})" style="
          background: var(--primary-green); 
          color: var(--bg-dark); 
          border: none; 
          padding: 0.5em 1em; 
          border-radius: 3px; 
          font-size: 0.9em;
          font-weight: bold;
        ">🚀 Ir al Terminal</button>
      </div>
      
      <div id="pista-${reto.id}" style="display: none; margin-top: 1em; padding: 1em; background: var(--bg-medium); border-radius: 5px; border-left: 3px solid var(--accent-orange);">
        <strong style="color: var(--accent-orange);">💡 Pista:</strong> ${reto.pista}
      </div>
    </div>
  `;
}

function convertirURLYoutube(url) {
  // Convertir URL de YouTube a formato embed
  if (url.includes('youtube.com/shorts/')) {
    const videoId = url.split('/shorts/')[1].split('?')[0];
    return `https://www.youtube.com/embed/${videoId}`;
  } else if (url.includes('youtube.com/watch?v=')) {
    const videoId = url.split('v=')[1].split('&')[0];
    return `https://www.youtube.com/embed/${videoId}`;
  }
  return url;
}

function mostrarPista(retoId) {
  const pistaDiv = document.getElementById(`pista-${retoId}`);
  if (pistaDiv.style.display === 'none') {
    pistaDiv.style.display = 'block';
  } else {
    pistaDiv.style.display = 'none';
  }
}

function seleccionarReto(retoId) {
  const reto = retos.find(r => r.id === retoId);
  if (reto) {
    retoActual = reto;
    localStorage.setItem('retoActual', JSON.stringify(retoActual));
    cargarRetos(); // Recargar para mostrar el reto como actual
    
    // Mostrar notificación
    mostrarNotificacion(`🎯 Reto ${reto.id} seleccionado: ${reto.titulo}`, 'var(--accent-orange)');
  }
}

function cargarRetoEnTerminal(retoId) {
  const reto = retos.find(r => r.id === retoId);
  if (reto) {
    // Seleccionar el reto actual
    seleccionarReto(retoId);
    
    // Guardar la consulta sugerida para cargarla en el terminal
    localStorage.setItem('consultaPendiente', reto.consulta_sugerida);
    
    // Redirigir al terminal SQL
    window.location.href = 'sql.html?reto=true';
  }
}

function desbloquearSiguienteReto() {
  const siguienteId = Math.max(...retosVisibles) + 1;
  if (siguienteId <= retos.length && !retosVisibles.includes(siguienteId)) {
    retosVisibles.push(siguienteId);
    localStorage.setItem('retosVisibles', JSON.stringify(retosVisibles));
    cargarRetos();
    mostrarNotificacion(`🔓 ¡Reto ${siguienteId} desbloqueado!`, 'var(--primary-green)');
  } else {
    mostrarNotificacion('🏁 ¡Todos los retos están desbloqueados!', 'var(--accent-cyan)');
  }
}

function toggleTodosLosRetos() {
  if (retosVisibles.length === retos.length) {
    // Ocultar todos excepto los primeros 5
    retosVisibles = [1, 2, 3, 4, 5];
    mostrarNotificacion('👁️ Retos ocultos (solo primeros 5 visibles)', 'var(--accent-orange)');
  } else {
    // Mostrar todos
    retosVisibles = retos.map(r => r.id);
    mostrarNotificacion('👁️ ¡Todos los retos visibles!', 'var(--primary-green)');
  }
  localStorage.setItem('retosVisibles', JSON.stringify(retosVisibles));
  cargarRetos();
}

function mostrarNotificacion(mensaje, color) {
  const notif = document.createElement('div');
  notif.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    background: ${color};
    color: var(--bg-dark);
    padding: 1em 1.5em;
    border-radius: 5px;
    font-weight: bold;
    z-index: 1000;
    animation: slideIn 0.3s ease;
  `;
  notif.innerHTML = mensaje;
  document.body.appendChild(notif);
  
  setTimeout(() => {
    notif.style.animation = 'slideOut 0.3s ease';
    setTimeout(() => notif.remove(), 300);
  }, 3000);
}

function verificarReto(consultaEjecutada, resultados) {
  if (!retoActual) return { completado: false };
  
  // Verificación flexible: comparar consulta normalizada
  const consultaNormalizada = consultaEjecutada.toLowerCase()
    .replace(/\s+/g, ' ')
    .replace(/;$/, '')
    .trim();
  
  const consultaEsperadaNormalizada = retoActual.consulta_sugerida.toLowerCase()
    .replace(/\s+/g, ' ')
    .replace(/;$/, '')
    .trim();
  
  // También verificar si la consulta contiene elementos clave del reto
  const esCorrecta = consultaNormalizada === consultaEsperadaNormalizada || 
                     verificarConsultaFlexible(consultaEjecutada, retoActual);
  
  if (esCorrecta && !retosCompletados.includes(retoActual.id)) {
    // Reto completado!
    retosCompletados.push(retoActual.id);
    puntuacionTotal += retoActual.puntos;
    
    // Guardar progreso
    localStorage.setItem('retosCompletados', JSON.stringify(retosCompletados));
    localStorage.setItem('puntuacionAtapuerca', puntuacionTotal.toString());
    
    // Desbloquear siguiente reto automáticamente
    const siguienteId = retoActual.id + 1;
    if (siguienteId <= retos.length && !retosVisibles.includes(siguienteId)) {
      retosVisibles.push(siguienteId);
      localStorage.setItem('retosVisibles', JSON.stringify(retosVisibles));
    }
    
    return {
      completado: true,
      reto: retoActual,
      mensaje: `🎉 ¡RETO ${retoActual.id} COMPLETADO! Has ganado ${retoActual.puntos} puntos.`
    };
  }
  
  return { completado: false };
}

function verificarConsultaFlexible(consulta, reto) {
  // Verificaciones flexibles según el tipo de reto
  const consultaLower = consulta.toLowerCase();
  
  switch (reto.id) {
    case 1:
      return consultaLower.includes('select') && consultaLower.includes('nombre') && consultaLower.includes('bases');
    case 2:
      return consultaLower.includes('select') && consultaLower.includes('nombre') && consultaLower.includes('tipo') && consultaLower.includes('order by');
    case 3:
      return consultaLower.includes('where') && consultaLower.includes('tipo') && consultaLower.includes('humana');
    // Agregar más verificaciones según necesites
    default:
      return false;
  }
}
