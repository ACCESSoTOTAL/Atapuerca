// Script de JavaScript para procesar los datos de las tablas de Atapuerca
// Copia este código en la consola del navegador después de pegar los arrays de datos

// =====================================================
// PLANTILLA PARA PEGAR LOS DATOS
// =====================================================

// PASO 1: Pega aquí los arrays de datos que obtengas de las consultas SQL
/*
const alliances = [
  // Pegar datos de Alliances aquí
];

const attacks = [
  // Pegar datos de Attacks aquí
];

const bases = [
  // Pegar datos de Bases aquí
];

const distanceMatrix = [
  // Pegar datos de DistanceMatrix aquí
];

const missions = [
  // Pegar datos de Missions aquí
];

const resources = [
  // Pegar datos de Resources aquí
];

const robots = [
  // Pegar datos de Robots aquí
];

const robotSightings = [
  // Pegar datos de RobotSightings aquí
];

const supplies = [
  // Pegar datos de Supplies aquí
];

const survivors = [
  // Pegar datos de Survivors aquí
];
*/

// =====================================================
// FUNCIONES DE ANÁLISIS Y VERIFICACIÓN
// =====================================================

function analizarDatos() {
    console.log("📊 ANÁLISIS DE DATOS DE ATAPUERCA");
    console.log("================================");
    
    // Verificar que existen los arrays
    const tablas = {
        'Alliances': typeof alliances !== 'undefined' ? alliances : [],
        'Attacks': typeof attacks !== 'undefined' ? attacks : [],
        'Bases': typeof bases !== 'undefined' ? bases : [],
        'DistanceMatrix': typeof distanceMatrix !== 'undefined' ? distanceMatrix : [],
        'Missions': typeof missions !== 'undefined' ? missions : [],
        'Resources': typeof resources !== 'undefined' ? resources : [],
        'Robots': typeof robots !== 'undefined' ? robots : [],
        'RobotSightings': typeof robotSightings !== 'undefined' ? robotSightings : [],
        'Supplies': typeof supplies !== 'undefined' ? supplies : [],
        'Survivors': typeof survivors !== 'undefined' ? survivors : []
    };
    
    // Mostrar resumen
    for (const [nombre, datos] of Object.entries(tablas)) {
        console.log(`${nombre}: ${datos.length} registros`);
    }
    
    return tablas;
}

function exportarDatosParaCopilot() {
    const datos = analizarDatos();
    
    console.log("\n🤖 DATOS FORMATEADOS PARA GITHUB COPILOT:");
    console.log("=========================================");
    
    for (const [nombre, array] of Object.entries(datos)) {
        if (array.length > 0) {
            console.log(`\n// TABLA: ${nombre.toUpperCase()}`);
            console.log(`const ${nombre.toLowerCase()} = ${JSON.stringify(array, null, 2)};`);
        }
    }
}

function verificarRelaciones() {
    console.log("\n🔗 VERIFICACIÓN DE RELACIONES:");
    console.log("==============================");
    
    try {
        if (typeof bases !== 'undefined' && typeof survivors !== 'undefined') {
            console.log(`Bases: ${bases.length}, Survivors: ${survivors.length}`);
            
            // Verificar que todos los survivors tienen una base válida
            const baseIds = new Set(bases.map(b => b.baseId));
            const survivorsOrfanos = survivors.filter(s => !baseIds.has(s.baseId));
            console.log(`Survivors sin base válida: ${survivorsOrfanos.length}`);
        }
        
        if (typeof bases !== 'undefined' && typeof resources !== 'undefined') {
            const basesConRecursos = resources.map(r => r.baseId);
            const basesSinRecursos = bases.filter(b => !basesConRecursos.includes(b.baseId));
            console.log(`Bases sin recursos: ${basesSinRecursos.length}`);
        }
        
        if (typeof attacks !== 'undefined' && typeof bases !== 'undefined') {
            const basesAtacadas = [...new Set(attacks.map(a => a.baseId))];
            console.log(`Bases que han sido atacadas: ${basesAtacadas.length}`);
        }
        
    } catch (error) {
        console.log("Error verificando relaciones:", error);
    }
}

function generarEstructuraCompleta() {
    console.log("\n📋 ESTRUCTURA COMPLETA DE DATOS:");
    console.log("=================================");
    
    const estructura = {
        metadata: {
            fechaExportacion: new Date().toISOString(),
            totalTablas: 10,
            baseDatos: "Atapuerca"
        },
        datos: {
            alliances: typeof alliances !== 'undefined' ? alliances : [],
            attacks: typeof attacks !== 'undefined' ? attacks : [],
            bases: typeof bases !== 'undefined' ? bases : [],
            distanceMatrix: typeof distanceMatrix !== 'undefined' ? distanceMatrix : [],
            missions: typeof missions !== 'undefined' ? missions : [],
            resources: typeof resources !== 'undefined' ? resources : [],
            robots: typeof robots !== 'undefined' ? robots : [],
            robotSightings: typeof robotSightings !== 'undefined' ? robotSightings : [],
            supplies: typeof supplies !== 'undefined' ? supplies : [],
            survivors: typeof survivors !== 'undefined' ? survivors : []
        }
    };
    
    console.log("Estructura JSON completa:");
    console.log(JSON.stringify(estructura, null, 2));
    
    return estructura;
}

// =====================================================
// INSTRUCCIONES DE USO
// =====================================================
console.log(`
🚀 INSTRUCCIONES DE USO:
========================

1. Ejecuta las consultas SQL en tu base de datos
2. Copia los resultados y pégalos en este script como arrays de JavaScript
3. Ejecuta las siguientes funciones:

   analizarDatos()              - Ver resumen de datos
   verificarRelaciones()        - Verificar integridad referencial  
   exportarDatosParaCopilot()   - Formatear para GitHub Copilot
   generarEstructuraCompleta()  - Estructura JSON completa

4. Copia el resultado y pégalo en tu conversación con Copilot

Ejemplo:
========
const bases = [
  {baseId: 1, nombre: "Base Alpha", tipoBase: "Humana", ...},
  {baseId: 2, nombre: "Base Beta", tipoBase: "IA", ...}
];

¡Luego ejecuta analizarDatos() para verificar!
`);
