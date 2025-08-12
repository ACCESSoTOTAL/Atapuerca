/**
 * ATAPUERCA NET - CARGADOR DE RETOS DESDE MYSQL
 * Sistema dinámico de carga de retos desde base de datos
 * Fecha: 2025-08-12
 */

// Configuración de la API
const API_CONFIG = {
    baseUrl: '/api/retos.php',
    timeout: 10000,
    domain: 'atapuerca-net.es'
};

// Cache de retos
let retosCache = null;
let retosLoaded = false;

// ========================================
// FUNCIONES GLOBALES (DISPONIBLES INMEDIATAMENTE)
// ========================================

/**
 * Cargar retos desde la API MySQL
 */
window.cargarRetos = async function() {
    try {
        console.log('🔄 Iniciando carga de retos desde MySQL...');
        
        const retos = await cargarRetosDesdeDB();
        
        if (retos && retos.length > 0) {
            mostrarRetosEnPagina(retos);
            console.log(`✅ ${retos.length} retos cargados y mostrados`);
        } else {
            console.warn('⚠️ No se cargaron retos desde la base de datos');
        }
        
    } catch (error) {
        console.error('❌ Error cargando retos:', error);
        mostrarMensajeError('Error cargando retos desde la base de datos. Intenta recargar la página.');
    }
};

/**
 * Funciones de administración
 */
window.desbloquearTodosLosRetos = function() {
    if (!confirm('¿Desbloquear todos los retos? Esto te dará todos los puntos posibles.')) return;
    
    if (retosCache && retosCache.length > 0) {
        let totalPuntos = 0;
        retosCache.forEach(reto => {
            localStorage.setItem(`reto_${reto.id}_completado`, 'true');
            totalPuntos += reto.puntos;
        });
        
        localStorage.setItem('puntuacionAtapuerca', totalPuntos.toString());
        alert(`¡Todos los retos desbloqueados! Puntos totales: ${totalPuntos}`);
        
        // Recargar la página
        location.reload();
    }
};

window.modoDesarrollador = function() {
    const estado = localStorage.getItem('modoDesarrollador') === 'true';
    localStorage.setItem('modoDesarrollador', (!estado).toString());
    alert(`Modo desarrollador ${!estado ? 'activado' : 'desactivado'}`);
    location.reload();
};

window.mostrarPistaSimple = function(idReto) {
    const reto = retosCache ? retosCache.find(r => r.id === idReto) : null;
    if (reto && reto.pista) {
        alert(`💡 Pista para 
async function cargarRetosDesdeDB() {
    try {
        console.log('🔄 Cargando retos desde MySQL...');
        
        const response = await fetch(`${API_CONFIG.baseUrl}?action=list&activo=1`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            timeout: API_CONFIG.timeout
        });
        
        if (!response.ok) {
            throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }
        
        const data = await response.json();
        
        if (!data.success) {
            throw new Error(data.error || 'Error desconocido');
        }
        
        retosCache = data.data;
        retosLoaded = true;
        
        console.log(`✅ ${data.total} retos cargados desde MySQL`);
        return retosCache;
        
    } catch (error) {
        console.error('❌ Error cargando retos desde MySQL:', error);
        
        // Fallback al sistema original si la API falla
        console.log('🔄 Intentando cargar retos desde archivo JS...');
        return await cargarRetosFallback();
    }
}

/**
 * Fallback: cargar retos desde el archivo JS original
 */
async function cargarRetosFallback() {
    try {
        // Si el array 'retos' existe globalmente (del archivo JS)
        if (typeof retos !== 'undefined' && Array.isArray(retos)) {
            retosCache = retos;
            retosLoaded = true;
            console.log(`✅ ${retos.length} retos cargados desde archivo JS (fallback)`);
            return retosCache;
        }
        
        // Intentar cargar el archivo JS dinámicamente
        const script = document.createElement('script');
        script.src = '/js/retos.js?v=' + Date.now();
        
        return new Promise((resolve, reject) => {
            script.onload = () => {
                if (typeof retos !== 'undefined') {
                    retosCache = retos;
                    retosLoaded = true;
                    console.log(`✅ ${retos.length} retos cargados dinámicamente`);
                    resolve(retosCache);
                } else {
                    reject(new Error('No se pudo cargar el array de retos'));
                }
            };
            
            script.onerror = () => {
                reject(new Error('Error cargando retos.js'));
            };
            
            document.head.appendChild(script);
        });
        
    } catch (error) {
        console.error('❌ Error en fallback:', error);
        throw error;
    }
}

/**
 * Obtener reto específico
 */
async function obtenerReto(numeroReto) {
    try {
        const response = await fetch(`${API_CONFIG.baseUrl}?action=get&reto=${numeroReto}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        
        const data = await response.json();
        
        if (data.success) {
            return data.data;
        } else {
            throw new Error(data.error);
        }
        
    } catch (error) {
        console.error(`❌ Error obteniendo reto ${numeroReto}:`, error);
        
        // Fallback: buscar en cache
        if (retosCache) {
            return retosCache.find(r => r.id === numeroReto);
        }
        
        throw error;
    }
}

/**
 * Validar reto usando la API
 */
async function validarRetoAPI(numeroReto, consulta, resultados) {
    try {
        const response = await fetch(`${API_CONFIG.baseUrl}?action=validate`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                reto_numero: numeroReto,
                consulta: consulta,
                resultados: resultados
            })
        });
        
        const data = await response.json();
        return data;
        
    } catch (error) {
        console.error('❌ Error validando reto:', error);
        
        // Fallback a validación original
        return validarRetoOriginal(numeroReto, consulta, resultados);
    }
}

/**
 * Completar reto usando la API
 */
async function completarRetoAPI(numeroReto, consulta, tiempo = 0) {
    try {
        const usuarioId = localStorage.getItem('atapuerca_usuario_id') || 'anonimo_' + Date.now();
        
        const response = await fetch(`${API_CONFIG.baseUrl}?action=complete`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                usuario_id: usuarioId,
                reto_numero: numeroReto,
                consulta: consulta,
                tiempo: tiempo
            })
        });
        
        const data = await response.json();
        
        if (data.success) {
            console.log(`✅ Reto ${numeroReto} completado: ${data.puntos_obtenidos} puntos`);
            
            // Guardar ID de usuario para futuras referencias
            localStorage.setItem('atapuerca_usuario_id', usuarioId);
        }
        
        return data;
        
    } catch (error) {
        console.error('❌ Error completando reto:', error);
        return { success: false, error: error.message };
    }
}

/**
 * Función mejorada para verificar retos
 */
async function verificarRetoMejorado(numeroReto, query, resultados) {
    console.log(`🔍 Verificando reto ${numeroReto}...`);
    
    try {
        // Intentar validación por API primero
        const validacionAPI = await validarRetoAPI(numeroReto, query, resultados);
        
        if (validacionAPI.success) {
            const cumple = validacionAPI.cumple_requisitos;
            
            if (cumple) {
                // Completar reto en la base de datos
                await completarRetoAPI(numeroReto, query);
                
                // Mantener compatibilidad con sistema original
                marcarRetoCompletado(numeroReto);
                
                console.log(`🎉 ¡Reto ${numeroReto} completado!`);
                return true;
            } else {
                console.log(`❌ Reto ${numeroReto} no cumple requisitos:`, validacionAPI.mensajes);
                return false;
            }
        }
        
    } catch (error) {
        console.error('Error en validación API, usando fallback:', error);
    }
    
    // Fallback a sistema original
    return verificarReto(numeroReto, query, resultados);
}

/**
 * Obtener estadísticas desde la API
 */
async function obtenerEstadisticas() {
    try {
        const response = await fetch(`${API_CONFIG.baseUrl}?action=stats`);
        const data = await response.json();
        
        if (data.success) {
            return data.data;
        }
        
    } catch (error) {
        console.error('❌ Error obteniendo estadísticas:', error);
    }
    
    return null;
}

/**
 * Inicializar sistema de retos
 */
async function inicializarSistemaRetos() {
    try {
        console.log('🚀 Inicializando sistema de retos...');
        
        // Cargar retos
        await cargarRetosDesdeDB();
        
        // Obtener estadísticas
        const stats = await obtenerEstadisticas();
        if (stats) {
            console.log('📊 Estadísticas:', stats);
        }
        
        // Exponer funciones globalmente para compatibilidad
        window.retosDB = retosCache;
        window.verificarRetoMejorado = verificarRetoMejorado;
        window.obtenerReto = obtenerReto;
        
        console.log('✅ Sistema de retos inicializado correctamente');
        
        // Disparar evento personalizado
        document.dispatchEvent(new CustomEvent('retosLoaded', {
            detail: { retos: retosCache, stats: stats }
        }));
        
    } catch (error) {
        console.error('❌ Error inicializando sistema de retos:', error);
    }
}

// ========================================
// FUNCIONES DE COMPATIBILIDAD CON RETOS.HTML
// ========================================

/**
 * Función principal para cargar retos (compatibilidad con retos.html)
 */
window.cargarRetos = async function() {
    try {
        console.log('🔄 Iniciando carga de retos desde MySQL...');
        
        const retos = await cargarRetosDesdeDB();
        
        if (retos && retos.length > 0) {
            mostrarRetosEnPagina(retos);
            console.log(`✅ ${retos.length} retos cargados y mostrados`);
        } else {
            console.warn('⚠️ No se cargaron retos desde la base de datos');
        }
        
    } catch (error) {
        console.error('❌ Error cargando retos:', error);
        mostrarMensajeError('Error cargando retos desde la base de datos. Intenta recargar la página.');
    }
};

/**
 * Mostrar retos en la página
 */
function mostrarRetosEnPagina(retos) {
    const container = document.getElementById('retos-container');
    if (!container) return;
    
    // Agrupar por fases
    const fases = {};
    retos.forEach(reto => {
        if (!fases[reto.fase]) fases[reto.fase] = [];
        fases[reto.fase].push(reto);
    });
    
    let html = '';
    
    // Información de fases
    const infoFases = {
        1: { titulo: "📚 Fase 1: Fundamentos Básicos", color: "var(--primary-green)" },
        2: { titulo: "🔗 Fase 2: Tutorial JOINs", color: "var(--accent-cyan)" },
        3: { titulo: "📈 Fase 3: Análisis Avanzado", color: "var(--accent-orange)" },
        4: { titulo: "🎯 Fase 4: Consultas Expertas", color: "#ff6b6b" },
        5: { titulo: "🏆 Fase 5: Maestría SQL", color: "#8b5cf6" }
    };
    
    // Mostrar cada fase
    Object.keys(fases).sort((a, b) => parseInt(a) - parseInt(b)).forEach(fase => {
        const retosFase = fases[fase];
        const info = infoFases[fase] || { titulo: `Fase ${fase}`, color: "var(--text-primary)" };
        
        html += `
            <div style="margin-bottom: 2em;">
                <h3 style="color: ${info.color}; margin-bottom: 1em;">
                    ${info.titulo}
                </h3>
                <div style="display: grid; gap: 1em;">
        `;
        
        retosFase.forEach(reto => {
            const completado = localStorage.getItem(`reto_${reto.id}_completado`) === 'true';
            const bloqueado = false; // Por ahora no bloqueamos retos
            
            html += crearTarjetaReto(reto, completado, bloqueado);
        });
        
        html += `</div></div>`;
    });
    
    container.innerHTML = html;
}

/**
 * Crear tarjeta individual de reto
 */
function crearTarjetaReto(reto, completado, bloqueado) {
    const estadoClass = completado ? 'completed' : (bloqueado ? 'locked' : 'available');
    const icono = completado ? '✅' : (bloqueado ? '🔒' : '🎯');
    
    return `
        <div class="reto-card ${estadoClass}" style="
            background: var(--bg-light);
            border: 1px solid ${completado ? 'var(--primary-green)' : 'var(--border-color)'};
            border-radius: 8px;
            padding: 1.5em;
            position: relative;
        ">
            <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 1em;">
                <h4 style="margin: 0; color: var(--text-primary); flex: 1;">
                    ${icono} ${reto.titulo}
                </h4>
                <div style="display: flex; gap: 0.5em; align-items: center;">
                    <span style="background: var(--accent-orange); color: var(--bg-dark); padding: 0.2em 0.6em; border-radius: 12px; font-size: 0.8em; font-weight: bold;">
                        ${reto.puntos} pts
                    </span>
                    <span style="background: var(--bg-medium); color: var(--text-secondary); padding: 0.2em 0.6em; border-radius: 12px; font-size: 0.8em;">
                        F${reto.fase}
                    </span>
                </div>
            </div>
            
            <p style="color: var(--text-secondary); margin-bottom: 1em; font-size: 0.9em;">
                ${reto.descripcion}
            </p>
            
            <div style="display: flex; gap: 0.5em; flex-wrap: wrap;">
                <button onclick="irAlReto(${reto.id})" style="
                    background: var(--accent-cyan);
                    color: var(--bg-dark);
                    border: none;
                    padding: 0.5em 1em;
                    border-radius: 5px;
                    font-weight: bold;
                    cursor: pointer;
                ">🚀 Ir al Terminal</button>
                
                ${reto.pista ? `
                <button onclick="mostrarPistaSimple(${reto.id})" style="
                    background: var(--accent-orange);
                    color: var(--bg-dark);
                    border: none;
                    padding: 0.5em 1em;
                    border-radius: 5px;
                    font-weight: bold;
                    cursor: pointer;
                ">💡 Pista</button>
                ` : ''}
                
                ${reto.consulta_sugerida ? `
                <button onclick="cargarEjemplo(${reto.id})" style="
                    background: var(--bg-medium);
                    color: var(--text-primary);
                    border: 1px solid var(--border-color);
                    padding: 0.5em 1em;
                    border-radius: 5px;
                    cursor: pointer;
                ">📝 Ejemplo</button>
                ` : ''}
            </div>
        </div>
    `;
}

/**
 * Funciones de administración
 */
window.desbloquearTodosLosRetos = function() {
    if (!confirm('¿Desbloquear todos los retos? Esto te dará todos los puntos posibles.')) return;
    
    if (retosCache && retosCache.length > 0) {
        let totalPuntos = 0;
        retosCache.forEach(reto => {
            localStorage.setItem(`reto_${reto.id}_completado`, 'true');
            totalPuntos += reto.puntos;
        });
        
        localStorage.setItem('puntuacionAtapuerca', totalPuntos.toString());
        alert(`¡Todos los retos desbloqueados! Puntos totales: ${totalPuntos}`);
        
        // Recargar la página
        location.reload();
    }
};

window.modoDesarrollador = function() {
    const estado = localStorage.getItem('modoDesarrollador') === 'true';
    localStorage.setItem('modoDesarrollador', (!estado).toString());
    alert(`Modo desarrollador ${!estado ? 'activado' : 'desactivado'}`);
    location.reload();
};

window.mostrarPistaSimple = function(idReto) {
    const reto = retosCache.find(r => r.id === idReto);
    if (reto && reto.pista) {
        alert(`💡 Pista para "${reto.titulo}":\n\n${reto.pista}`);
    }
};

window.cargarEjemplo = function(idReto) {
    const reto = retosCache.find(r => r.id === idReto);
    if (reto && reto.consulta_sugerida) {
        localStorage.setItem('consultaPendiente', reto.consulta_sugerida);
        localStorage.setItem('retoActual', JSON.stringify(reto));
        window.location.href = 'sql.html?reto=true';
    }
};

window.irAlReto = function(numeroReto) {
    const reto = retosCache.find(r => r.id === numeroReto);
    if (reto) {
        localStorage.setItem('retoActual', JSON.stringify(reto));
        if (reto.consulta_sugerida) {
            localStorage.setItem('consultaPendiente', reto.consulta_sugerida);
        }
        window.location.href = 'sql.html?reto=true';
    }
};

function mostrarMensajeError(mensaje) {
    const container = document.getElementById('retos-container');
    if (container) {
        container.innerHTML = `
            <div style="
                background: rgba(255, 68, 68, 0.1);
                border: 1px solid #ff4444;
                border-radius: 8px;
                padding: 2em;
                text-align: center;
                color: #ff4444;
            ">
                <h3>❌ Error</h3>
                <p>${mensaje}</p>
                <button onclick="location.reload()" style="
                    background: #ff4444;
                    color: white;
                    border: none;
                    padding: 0.8em 1.5em;
                    border-radius: 5px;
                    margin-top: 1em;
                    cursor: pointer;
                ">🔄 Reintentar</button>
            </div>
        `;
    }
}

// Auto-inicializar cuando el DOM esté listo
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', inicializarSistemaRetos);
} else {
    inicializarSistemaRetos();
}

// Exportar funciones principales
window.RetosDB = {
    cargar: cargarRetosDesdeDB,
    obtener: obtenerReto,
    validar: validarRetoAPI,
    completar: completarRetoAPI,
    verificar: verificarRetoMejorado,
    estadisticas: obtenerEstadisticas,
    cache: () => retosCache,
    loaded: () => retosLoaded
};
