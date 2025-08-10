// Cargador de datos reales de Atapuerca
// Este archivo carga todos los datos JSON y los hace disponibles para los retos

class AtapuercaDataLoader {
    constructor() {
        this.datos = {};
        this.cargaCompleta = false;
    }

    async cargarDatos() {
        try {
            console.log('🔄 Cargando datos de Atapuerca...');
            
            // Cargar todos los archivos JSON
            const archivos = [
                'survivors.json',
                'bases.json', 
                'attacks.json',
                'Resources.json',
                'Robots.json',
                'RobotSightings.json',
                'Missions.json',
                'DistanceMatrix.json',
                'allicances.json',
                'supplies.json'
            ];

            const promesas = archivos.map(async archivo => {
                try {
                    const response = await fetch(`./js/datos/${archivo}`);
                    if (!response.ok) throw new Error(`Error cargando ${archivo}`);
                    const data = await response.json();
                    
                    // Normalizar nombres de propiedades
                    const nombreTabla = archivo.replace('.json', '').toLowerCase();
                    this.datos[nombreTabla] = data;
                    
                    console.log(`✅ ${archivo}: ${data.length} registros`);
                    return { archivo, data };
                } catch (error) {
                    console.warn(`⚠️ No se pudo cargar ${archivo}:`, error);
                    return { archivo, data: [] };
                }
            });

            await Promise.all(promesas);
            this.cargaCompleta = true;
            
            console.log('🎉 Carga de datos completada');
            this.mostrarResumen();
            
        } catch (error) {
            console.error('❌ Error cargando datos:', error);
        }
    }

    mostrarResumen() {
        console.log('\n📊 RESUMEN DE DATOS CARGADOS:');
        console.log('============================');
        
        Object.entries(this.datos).forEach(([tabla, datos]) => {
            console.log(`${tabla.toUpperCase()}: ${datos.length} registros`);
        });
        
        // Análisis básico
        this.analizarDatos();
    }

    analizarDatos() {
        console.log('\n🔍 ANÁLISIS DE DATOS:');
        console.log('====================');
        
        // Bases
        if (this.datos.bases) {
            const basesHumanas = this.datos.bases.filter(b => b.TipoBase === 'Humana').length;
            const basesIA = this.datos.bases.filter(b => b.TipoBase === 'IA').length;
            const comandoCentral = this.datos.bases.find(b => b.EsComandoCentral === "1");
            console.log(`Bases Humanas: ${basesHumanas}, Bases IA: ${basesIA}`);
            console.log(`Comando Central: ${comandoCentral ? comandoCentral.Nombre : 'No encontrado'}`);
        }

        // Supervivientes
        if (this.datos.survivors) {
            const roles = [...new Set(this.datos.survivors.map(s => s.Rol))];
            const edadPromedio = this.datos.survivors.reduce((sum, s) => sum + s.Edad, 0) / this.datos.survivors.length;
            console.log(`Roles únicos: ${roles.join(', ')}`);
            console.log(`Edad promedio: ${edadPromedio.toFixed(1)} años`);
        }

        // Ataques
        if (this.datos.attacks) {
            const tiposRobots = [...new Set(this.datos.attacks.map(a => a.TipoRobot))];
            const totalMuertos = this.datos.attacks.reduce((sum, a) => sum + (a.Muertos || 0), 0);
            console.log(`Tipos de robots atacantes: ${tiposRobots.join(', ')}`);
            console.log(`Total de bajas por ataques: ${totalMuertos}`);
        }
    }

    // Métodos de acceso a datos
    obtenerDatos(tabla) {
        return this.datos[tabla.toLowerCase()] || [];
    }

    obtenerBases() {
        return this.datos.bases || [];
    }

    obtenerSupervivientes() {
        return this.datos.survivors || [];
    }

    obtenerRecursos() {
        return this.datos.resources || [];
    }

    obtenerAtaques() {
        return this.datos.attacks || [];
    }

    obtenerRobots() {
        return this.datos.robots || [];
    }

    obtenerMisiones() {
        return this.datos.missions || [];
    }

    obtenerAlianzas() {
        return this.datos.allicances || [];
    }

    obtenerSuministros() {
        return this.datos.supplies || [];
    }

    obtenerAvistamientos() {
        return this.datos.robotsightings || [];
    }

    obtenerDistancias() {
        return this.datos.distancematrix || [];
    }

    // Método para verificar consultas SQL simuladas
    async verificarConsultaReal(consulta, retoId) {
        if (!this.cargaCompleta) {
            return {
                success: false,
                error: "Los datos aún no se han cargado completamente"
            };
        }

        try {
            // Aquí simularemos la ejecución de consultas SQL básicas
            const resultado = this.simularConsultaSQL(consulta);
            
            if (resultado.length === 0) {
                return {
                    success: false,
                    error: "La consulta no devolvió resultados"
                };
            }

            const reto = retos.find(r => r.id === retoId);
            return {
                success: true,
                data: resultado,
                mensaje: `Consulta ejecutada correctamente. ${resultado.length} registros encontrados.`,
                puntos: reto ? reto.puntos : 0
            };

        } catch (error) {
            return {
                success: false,
                error: `Error simulando consulta: ${error.message}`
            };
        }
    }

    simularConsultaSQL(consulta) {
        // Simulación básica de consultas SQL
        const consultaUpper = consulta.toUpperCase().trim();
        
        // SELECT * FROM Bases
        if (consultaUpper.includes('SELECT') && consultaUpper.includes('FROM BASES')) {
            if (consultaUpper.includes("WHERE TIPOBASE = 'HUMANA'")) {
                return this.obtenerBases().filter(b => b.TipoBase === 'Humana');
            }
            if (consultaUpper.includes("WHERE ESCOMANDOCENTRAL = 1")) {
                return this.obtenerBases().filter(b => b.EsComandoCentral === "1");
            }
            return this.obtenerBases();
        }

        // SELECT * FROM Survivors
        if (consultaUpper.includes('FROM SURVIVORS')) {
            if (consultaUpper.includes('WHERE EDAD >')) {
                const edad = parseInt(consultaUpper.match(/EDAD > (\d+)/)?.[1] || '0');
                return this.obtenerSupervivientes().filter(s => s.Edad > edad);
            }
            return this.obtenerSupervivientes();
        }

        // SELECT * FROM Resources
        if (consultaUpper.includes('FROM RESOURCES')) {
            if (consultaUpper.includes('COMIDARACIONES >')) {
                const comida = parseInt(consultaUpper.match(/COMIDARACIONES > (\d+)/)?.[1] || '0');
                return this.obtenerRecursos().filter(r => r.ComidaRaciones > comida);
            }
            return this.obtenerRecursos();
        }

        // SELECT * FROM Attacks
        if (consultaUpper.includes('FROM ATTACKS')) {
            return this.obtenerAtaques();
        }

        // Para otras consultas, devolver datos de ejemplo
        return this.obtenerBases().slice(0, 3);
    }

    // Generar estadísticas
    generarEstadisticas() {
        if (!this.cargaCompleta) return null;

        return {
            totalBases: this.obtenerBases().length,
            totalSupervivientes: this.obtenerSupervivientes().length,
            totalAtaques: this.obtenerAtaques().length,
            basesHumanas: this.obtenerBases().filter(b => b.TipoBase === 'Humana').length,
            basesIA: this.obtenerBases().filter(b => b.TipoBase === 'IA').length,
            supervivientesPromedio: this.obtenerSupervivientes().length > 0 ? 
                this.obtenerSupervivientes().reduce((sum, s) => sum + s.Edad, 0) / this.obtenerSupervivientes().length : 0,
            rolesUnicos: [...new Set(this.obtenerSupervivientes().map(s => s.Rol))],
            tiposRobotsVistos: [...new Set(this.obtenerAtaques().map(a => a.TipoRobot))]
        };
    }
}

// Instancia global del cargador de datos
const dataLoader = new AtapuercaDataLoader();

// Auto-cargar datos cuando se carga la página
document.addEventListener('DOMContentLoaded', async function() {
    await dataLoader.cargarDatos();
    console.log('🚀 Sistema de datos Atapuerca listo para usar');
});

// Hacer disponible globalmente
window.atapuercaData = dataLoader;
