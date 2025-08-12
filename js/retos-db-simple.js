// ========================================
// ATAPUERCA NET - SISTEMA DE RETOS CON MYSQL
// Conecta la página retos.html con la base de datos MySQL
// ========================================

// Variables globales
let retosCache = null;
let retosLoaded = false;

const API_BASE_URL = 'https://atapuerca-net.es/api/retos.php';

// ========================================
// FUNCIONES GLOBALES (DISPONIBLES INMEDIATAMENTE)
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
            console.log('✅ ' + retos.length + ' retos cargados y mostrados');
        } else {
            console.warn('⚠️ No se cargaron retos desde la base de datos');
            mostrarMensajeError('No se pudieron cargar los retos desde la base de datos.');
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
        retosCache.forEach(function(reto) {
            localStorage.setItem('reto_' + reto.id + '_completado', 'true');
            totalPuntos += reto.puntos;
        });
        
        localStorage.setItem('puntuacionAtapuerca', totalPuntos.toString());
        alert('¡Todos los retos desbloqueados! Puntos totales: ' + totalPuntos);
        
        // Recargar la página
        location.reload();
    } else {
        alert('No hay retos cargados. Intenta recargar la página.');
    }
};

window.modoDesarrollador = function() {
    const estado = localStorage.getItem('modoDesarrollador') === 'true';
    localStorage.setItem('modoDesarrollador', (!estado).toString());
    alert('Modo desarrollador ' + (!estado ? 'activado' : 'desactivado'));
    location.reload();
};

window.mostrarPistaSimple = function(idReto) {
    const reto = retosCache ? retosCache.find(function(r) { return r.id === idReto; }) : null;
    if (reto && reto.pista) {
        alert('💡 Pista para "' + reto.titulo + '":\n\n' + reto.pista);
    } else {
        alert('Pista no disponible para este reto.');
    }
};

window.cargarEjemplo = function(idReto) {
    const reto = retosCache ? retosCache.find(function(r) { return r.id === idReto; }) : null;
    if (reto && reto.consulta_sugerida) {
        localStorage.setItem('consultaPendiente', reto.consulta_sugerida);
        localStorage.setItem('retoActual', JSON.stringify(reto));
        window.location.href = 'sql.html?reto=true';
    } else {
        alert('Consulta de ejemplo no disponible para este reto.');
    }
};

window.irAlReto = function(numeroReto) {
    const reto = retosCache ? retosCache.find(function(r) { return r.id === numeroReto; }) : null;
    if (reto) {
        localStorage.setItem('retoActual', JSON.stringify(reto));
        if (reto.consulta_sugerida) {
            localStorage.setItem('consultaPendiente', reto.consulta_sugerida);
        }
        window.location.href = 'sql.html?reto=true';
    } else {
        alert('Reto no encontrado.');
    }
};

window.obtenerReto = function(id) {
    return retosCache ? retosCache.find(function(r) { return r.id === id; }) : null;
};

// ========================================
// FUNCIONES INTERNAS
// ========================================

/**
 * Cargar retos desde MySQL API
 */
async function cargarRetosDesdeDB() {
    try {
        console.log('🌐 Consultando API MySQL...');
        
        const response = await fetch(API_BASE_URL + '?action=list&activo=1', {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Cache-Control': 'no-cache'
            }
        });
        
        if (!response.ok) {
            throw new Error('HTTP ' + response.status + ': ' + response.statusText);
        }
        
        const data = await response.json();
        
        if (!data.success) {
            throw new Error(data.error || 'Error desconocido en la API');
        }
        
        retosCache = data.data;
        retosLoaded = true;
        console.log('✅ ' + data.total + ' retos cargados desde MySQL');
        
        return retosCache;
        
    } catch (error) {
        console.error('❌ Error consultando API MySQL:', error);
        throw error;
    }
}

/**
 * Mostrar retos en la página
 */
function mostrarRetosEnPagina(retos) {
    const container = document.getElementById('retos-container');
    if (!container) {
        console.error('❌ Elemento retos-container no encontrado');
        return;
    }
    
    // Agrupar por fases
    const fases = {};
    retos.forEach(function(reto) {
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
    Object.keys(fases).sort(function(a, b) { return parseInt(a) - parseInt(b); }).forEach(function(fase) {
        const retosFase = fases[fase];
        const info = infoFases[fase] || { titulo: 'Fase ' + fase, color: "var(--text-primary)" };
        
        html += '<div style="margin-bottom: 2em;">';
        html += '<h3 style="color: ' + info.color + '; margin-bottom: 1em;">' + info.titulo + '</h3>';
        html += '<div style="display: grid; gap: 1em;">';
        
        retosFase.forEach(function(reto) {
            const completado = localStorage.getItem('reto_' + reto.id + '_completado') === 'true';
            const bloqueado = false; // Por ahora no bloqueamos retos
            
            html += crearTarjetaReto(reto, completado, bloqueado);
        });
        
        html += '</div></div>';
    });
    
    container.innerHTML = html;
}

/**
 * Crear tarjeta individual de reto
 */
function crearTarjetaReto(reto, completado, bloqueado) {
    const estadoClass = completado ? 'completed' : (bloqueado ? 'locked' : 'available');
    const icono = completado ? '✅' : (bloqueado ? '🔒' : '🎯');
    
    let html = '<div class="reto-card ' + estadoClass + '" style="';
    html += 'background: var(--bg-light);';
    html += 'border: 1px solid ' + (completado ? 'var(--primary-green)' : 'var(--border-color)') + ';';
    html += 'border-radius: 8px;';
    html += 'padding: 1.5em;';
    html += 'position: relative;';
    html += '">';
    
    html += '<div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 1em;">';
    html += '<h4 style="margin: 0; color: var(--text-primary); flex: 1;">';
    html += icono + ' ' + reto.titulo;
    html += '</h4>';
    html += '<div style="display: flex; gap: 0.5em; align-items: center;">';
    html += '<span style="background: var(--accent-orange); color: var(--bg-dark); padding: 0.2em 0.6em; border-radius: 12px; font-size: 0.8em; font-weight: bold;">';
    html += reto.puntos + ' pts';
    html += '</span>';
    html += '<span style="background: var(--bg-medium); color: var(--text-secondary); padding: 0.2em 0.6em; border-radius: 12px; font-size: 0.8em;">';
    html += 'F' + reto.fase;
    html += '</span>';
    html += '</div>';
    html += '</div>';
    
    html += '<p style="color: var(--text-secondary); margin-bottom: 1em; font-size: 0.9em;">';
    html += reto.descripcion;
    html += '</p>';
    
    html += '<div style="display: flex; gap: 0.5em; flex-wrap: wrap;">';
    html += '<button onclick="irAlReto(' + reto.id + ')" style="';
    html += 'background: var(--accent-cyan);';
    html += 'color: var(--bg-dark);';
    html += 'border: none;';
    html += 'padding: 0.5em 1em;';
    html += 'border-radius: 5px;';
    html += 'font-weight: bold;';
    html += 'cursor: pointer;';
    html += '">🚀 Ir al Terminal</button>';
    
    if (reto.pista) {
        html += '<button onclick="mostrarPistaSimple(' + reto.id + ')" style="';
        html += 'background: var(--accent-orange);';
        html += 'color: var(--bg-dark);';
        html += 'border: none;';
        html += 'padding: 0.5em 1em;';
        html += 'border-radius: 5px;';
        html += 'font-weight: bold;';
        html += 'cursor: pointer;';
        html += '">💡 Pista</button>';
    }
    
    if (reto.consulta_sugerida) {
        html += '<button onclick="cargarEjemplo(' + reto.id + ')" style="';
        html += 'background: var(--bg-medium);';
        html += 'color: var(--text-primary);';
        html += 'border: 1px solid var(--border-color);';
        html += 'padding: 0.5em 1em;';
        html += 'border-radius: 5px;';
        html += 'cursor: pointer;';
        html += '">📝 Ejemplo</button>';
    }
    
    html += '</div>';
    html += '</div>';
    
    return html;
}

function mostrarMensajeError(mensaje) {
    const container = document.getElementById('retos-container');
    if (container) {
        container.innerHTML = 
            '<div style="' +
            'background: rgba(255, 68, 68, 0.1);' +
            'border: 1px solid #ff4444;' +
            'border-radius: 8px;' +
            'padding: 2em;' +
            'text-align: center;' +
            'color: #ff4444;' +
            '">' +
            '<h3>❌ Error</h3>' +
            '<p>' + mensaje + '</p>' +
            '<button onclick="location.reload()" style="' +
            'background: #ff4444;' +
            'color: white;' +
            'border: none;' +
            'padding: 0.8em 1.5em;' +
            'border-radius: 5px;' +
            'margin-top: 1em;' +
            'cursor: pointer;' +
            '">🔄 Reintentar</button>' +
            '</div>';
    }
}

// ========================================
// INICIALIZACIÓN
// ========================================

// Auto-cargar retos cuando el DOM esté listo
function inicializar() {
    if (typeof window.cargarRetos === 'function') {
        window.cargarRetos();
    } else {
        console.error('❌ Función cargarRetos no disponible');
    }
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', inicializar);
} else {
    // Si ya está cargado, ejecutar inmediatamente
    setTimeout(inicializar, 100);
}

console.log('✅ retos-db.js cargado correctamente');
