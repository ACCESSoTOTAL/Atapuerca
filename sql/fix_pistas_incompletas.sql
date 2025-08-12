-- Script para completar las pistas incompletas en los retos
-- Ejecutar este script para arreglar todas las pistas que están cortadas

-- Reto 2: Bases ordenadas alfabéticamente
UPDATE retos 
SET pista = 'Usa ORDER BY para ordenar. El resultado debería empezar con "Centro Nexus" y terminar con "Torre Omega"'
WHERE reto_numero = 2;

-- Reto 3: Bases humanas vs bases IA
UPDATE retos 
SET descripcion = 'De la tabla Bases, muestra todas las columnas pero solo para los registros donde TipoBase sea exactamente "Humana". Deben aparecer 5 bases humanas.',
    consulta_sugerida = 'SELECT * FROM Bases WHERE TipoBase = ''Humana'';'
WHERE reto_numero = 3;

-- Reto 7: El comando central
UPDATE retos 
SET descripcion = 'De la tabla Bases, muestra todas las columnas para los registros donde EsComandoCentral sea igual a 1 (verdadero). Solo debería aparecer 1 base.',
    consulta_sugerida = 'SELECT * FROM Bases WHERE EsComandoCentral = 1;'
WHERE reto_numero = 7;

-- Reto 10: La scout más joven
UPDATE retos 
SET palabras_clave = 'SELECT,MIN'
WHERE reto_numero = 10;

-- Reto 13: INNER JOIN - Solo coincidencias
UPDATE retos 
SET palabras_clave = 'JOIN,Survivors'
WHERE reto_numero = 13;

-- Reto 14: LEFT OUTER JOIN - Todos de la izquierda
UPDATE retos 
SET palabras_clave = 'JOIN,Survivors'
WHERE reto_numero = 14;

-- Reto 15: RIGHT OUTER JOIN - Todos de la derecha
UPDATE retos 
SET palabras_clave = 'JOIN,Survivors'
WHERE reto_numero = 15;

-- Reto 16: FULL OUTER JOIN - Todo combinado
UPDATE retos 
SET palabras_clave = 'JOIN,Survivors'
WHERE reto_numero = 16;

-- Reto 17: LEFT JOIN con exclusión - Solo sin coincidencias
UPDATE retos 
SET palabras_clave = 'WHERE,NULL'
WHERE reto_numero = 17;

-- Reto 18: RIGHT JOIN con exclusión - Huérfanos
UPDATE retos 
SET palabras_clave = 'WHERE,NULL'
WHERE reto_numero = 18;

-- Reto 19: CROSS JOIN - Producto cartesiano
UPDATE retos 
SET palabras_clave = 'JOIN,Survivors'
WHERE reto_numero = 19;

-- Reto 20: Múltiples JOINs - Tres tablas
UPDATE retos 
SET descripcion = 'Conecta tres tablas en una consulta: Survivors (s) INNER JOIN Bases (b) ON s.BaseID=b.BaseID, luego LEFT JOIN Resources (r) ON b.BaseID=r.BaseID. Selecciona s.Nombre, b.Nombre y r.ComidaRaciones. Usa LEFT JOIN para Resources porque no todas las bases tienen recursos.',
    palabras_clave = 'JOIN,Resources'
WHERE reto_numero = 20;

-- Reto 21: Auto-JOIN - La tabla consigo misma
UPDATE retos 
SET descripcion = 'Usa alias s1 y s2 para hacer JOIN de la tabla Survivors consigo misma: s1 INNER JOIN s2 ON s1.Edad = s2.Edad AND s1.SurvivorID < s2.SurvivorID. Selecciona s1.Nombre, s2.Nombre y s1.Edad. Esto encuentra parejas de supervivientes con la misma edad (evitando duplicados).',
    palabras_clave = 'JOIN,Edad'
WHERE reto_numero = 21;

-- Reto 22: Equipo por base - Análisis real
UPDATE retos 
SET palabras_clave = 'JOIN,Rol'
WHERE reto_numero = 22;

-- Reto 23: Inventario completo por base
UPDATE retos 
SET palabras_clave = 'JOIN,COALESCE'
WHERE reto_numero = 23;

-- Reto 24: Comando y subordinados
UPDATE retos 
SET descripcion = 'Usa JOIN entre tablas Bases (b) y Survivors (s) conectadas por BaseID, con WHERE b.EsComandoCentral = 1. Selecciona b.Nombre, s.Nombre y s.Rol. Muestra el personal del comando central.',
    consulta_sugerida = 'SELECT b.Nombre AS Base, s.Nombre AS Superviviente, s.Rol FROM Bases b JOIN Survivors s ON b.BaseID = s.BaseID WHERE b.EsComandoCentral = 1;',
    palabras_clave = 'WHERE,ComandoCentral'
WHERE reto_numero = 24;

-- Reto 25: Estadísticas por hemisferio
UPDATE retos 
SET descripcion = 'Usa LEFT JOIN entre Bases (b) y Survivors (s), con CASE WHEN b.Latitud > 0 THEN ''Norte'' ELSE ''Sur'' END para clasificar hemisferios. Agrupa con GROUP BY y cuenta bases y supervivientes por hemisferio. Deben aparecer 2 filas: Norte y Sur.',
    consulta_sugerida = 'SELECT CASE WHEN b.Latitud > 0 THEN ''Norte'' ELSE ''Sur'' END AS Hemisferio, COUNT(DISTINCT b.BaseID) AS Bases, COUNT(s.SurvivorID) AS Supervivientes FROM Bases b LEFT JOIN Survivors s ON b.BaseID = s.BaseID GROUP BY CASE WHEN b.Latitud > 0 THEN ''Norte'' ELSE ''Sur'' END;',
    palabras_clave = 'CASE,WHEN'
WHERE reto_numero = 25;

-- Reto 27: Promedio de edad por base
UPDATE retos 
SET palabras_clave = 'AVG,CAST'
WHERE reto_numero = 27;

-- Reto 28: La base más próspera
UPDATE retos 
SET palabras_clave = 'JOIN,LIMIT'
WHERE reto_numero = 28;

-- Reto 29: Bases sin supervivientes
UPDATE retos 
SET palabras_clave = 'LEFT,JOIN'
WHERE reto_numero = 29;

-- Reto 30: Liderazgo y experiencia
UPDATE retos 
SET descripcion = 'Usa JOIN entre Survivors (s) y Bases (b) conectadas por BaseID, con WHERE s.Rol IN (''Comandante'', ''Médica'', ''Soldado''). Selecciona s.Nombre, s.Rol, s.Edad y b.Nombre. Filtra por roles de liderazgo.',
    consulta_sugerida = 'SELECT s.Nombre AS Superviviente, s.Rol, s.Edad, b.Nombre AS Base FROM Survivors s JOIN Bases b ON b.BaseID = s.BaseID WHERE s.Rol IN (''Comandante'', ''Médica'', ''Soldado'');',
    palabras_clave = 'WHERE,IN'
WHERE reto_numero = 30;

-- Reto 31: Balance de recursos
UPDATE retos 
SET descripcion = 'Usa JOIN entre Bases (b) y Resources (r) conectadas por BaseID. Selecciona b.Nombre, r.ComidaRaciones, r.AguaLitros, calcula la diferencia absoluta con ABS(r.ComidaRaciones - r.AguaLitros), y usa CASE WHEN para clasificar el balance como ''Más Comida'', ''Más Agua'' o ''Equilibrado''. Ordena por diferencia ascendente.',
    consulta_sugerida = 'SELECT b.Nombre AS Base, r.ComidaRaciones, r.AguaLitros, ABS(r.ComidaRaciones - r.AguaLitros) AS DiferenciaRecursos, CASE WHEN r.ComidaRaciones > r.AguaLitros THEN ''Más Comida'' WHEN r.AguaLitros > r.ComidaRaciones THEN ''Más Agua'' ELSE ''Equilibrado'' END AS TipoBalance FROM Bases b JOIN Resources r ON b.BaseID = r.BaseID ORDER BY DiferenciaRecursos;',
    palabras_clave = 'ABS,CASE'
WHERE reto_numero = 31;

-- Reto 32: Estadísticas generales del asentamiento
UPDATE retos 
SET palabras_clave = 'COUNT,DISTINCT'
WHERE reto_numero = 32;

-- Reto 33: Ranking de bases por población
UPDATE retos 
SET palabras_clave = 'RANK,OVER'
WHERE reto_numero = 33;

-- Reto 34: Análisis de roles críticos
UPDATE retos 
SET palabras_clave = 'GROUP,BY'
WHERE reto_numero = 34;

-- Reto 35: Densidad poblacional por base
UPDATE retos 
SET palabras_clave = 'NULLIF,ROUND'
WHERE reto_numero = 35;

-- Reto 36: Análisis de autosuficiencia
UPDATE retos 
SET palabras_clave = 'CASE,WHEN'
WHERE reto_numero = 36;

-- Reto 37: Análisis geoespacial
UPDATE retos 
SET palabras_clave = 'CROSS,JOIN'
WHERE reto_numero = 37;

-- Reto 38: Análisis de eficiencia operativa
UPDATE retos 
SET palabras_clave = 'GREATEST,LEAST'
WHERE reto_numero = 38;

-- Reto 39: Análisis generacional
UPDATE retos 
SET descripcion = 'De la tabla Survivors, usa CASE WHEN para clasificar por rangos de edad: <20 ''Jóvenes'', 20-29 ''Adultos Jóvenes'', 30-39 ''Adultos'', 40+ ''Veteranos''. Agrupa por rango y calcula COUNT, AVG de edad. Ordena por edad promedio.',
    consulta_sugerida = 'SELECT CASE WHEN s.Edad < 20 THEN ''Jóvenes'' WHEN s.Edad BETWEEN 20 AND 29 THEN ''Adultos Jóvenes'' WHEN s.Edad BETWEEN 30 AND 39 THEN ''Adultos'' ELSE ''Veteranos'' END AS GrupoEdad, COUNT(*) AS Cantidad, AVG(CAST(s.Edad AS FLOAT)) AS EdadPromedio FROM Survivors s GROUP BY CASE WHEN s.Edad < 20 THEN ''Jóvenes'' WHEN s.Edad BETWEEN 20 AND 29 THEN ''Adultos Jóvenes'' WHEN s.Edad BETWEEN 30 AND 39 THEN ''Adultos'' ELSE ''Veteranos'' END ORDER BY EdadPromedio;',
    palabras_clave = 'CASE,BETWEEN'
WHERE reto_numero = 39;

-- Reto 40: Matriz de intercambio de recursos
UPDATE retos 
SET descripcion = 'Usa JOIN entre Bases (b1) y Resources (r1), luego CROSS JOIN con Bases (b2) y Resources (r2), con WHERE b1.BaseID != b2.BaseID. Compara recursos de comida, calcula diferencias con ABS y clasifica tipo de intercambio con CASE WHEN.',
    consulta_sugerida = 'SELECT b1.Nombre AS BaseOrigen, b2.Nombre AS BaseDestino, r1.ComidaRaciones AS ComidaOrigen, r2.ComidaRaciones AS ComidaDestino, ABS(r1.ComidaRaciones - r2.ComidaRaciones) AS DiferenciaComida, CASE WHEN r1.ComidaRaciones > r2.ComidaRaciones THEN ''Puede donar'' WHEN r2.ComidaRaciones > r1.ComidaRaciones THEN ''Necesita recibir'' ELSE ''Equilibrio'' END AS TipoIntercambio FROM Bases b1 JOIN Resources r1 ON b1.BaseID = r1.BaseID CROSS JOIN Bases b2 JOIN Resources r2 ON b2.BaseID = r2.BaseID WHERE b1.BaseID != b2.BaseID ORDER BY DiferenciaComida DESC;',
    palabras_clave = 'CROSS,ABS'
WHERE reto_numero = 40;

-- Continuar con más retos...
-- Nota: Este es un script parcial, continuaríamos con todos los retos que tienen pistas incompletas

SELECT 'Pistas actualizadas correctamente' as resultado;
