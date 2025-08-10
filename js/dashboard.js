// Dashboard de estadísticas en tiempo real para Atapuerca
// Muestra información dinámica basada en los datos reales

class AtapuercaDashboard {
    constructor() {
        this.datos = null;
        this.contenedor = null;
    }

    async inicializar() {
        // Esperar a que los datos estén cargados
        await this.esperarDatos();
        this.datos = window.atapuercaData;
        this.crearInterfaz();
        this.actualizarEstadisticas();
    }

    async esperarDatos() {
        return new Promise((resolve) => {
            const verificar = () => {
                if (window.atapuercaData && window.atapuercaData.cargaCompleta) {
                    resolve();
                } else {
                    setTimeout(verificar, 100);
                }
            };
            verificar();
        });
    }

    crearInterfaz() {
        // Crear contenedor del dashboard
        this.contenedor = document.createElement('div');
        this.contenedor.id = 'atapuerca-dashboard';
        this.contenedor.className = 'dashboard-container';
        this.contenedor.innerHTML = `
            <div class="dashboard-header">
                <h2>📊 ESTADO ACTUAL DE ATAPUERCA</h2>
                <button id="refresh-dashboard" class="btn-refresh">🔄 Actualizar</button>
            </div>
            <div class="dashboard-grid">
                <div class="stat-card" id="bases-stats">
                    <h3>🏠 BASES</h3>
                    <div class="stat-content"></div>
                </div>
                <div class="stat-card" id="survivors-stats">
                    <h3>👥 SUPERVIVIENTES</h3>
                    <div class="stat-content"></div>
                </div>
                <div class="stat-card" id="resources-stats">
                    <h3>📦 RECURSOS</h3>
                    <div class="stat-content"></div>
                </div>
                <div class="stat-card" id="attacks-stats">
                    <h3>⚔️ ATAQUES</h3>
                    <div class="stat-content"></div>
                </div>
            </div>
            <div class="dashboard-details">
                <div class="detail-section">
                    <h3>🗺️ DISTRIBUCIÓN GEOGRÁFICA</h3>
                    <div id="geographic-info"></div>
                </div>
                <div class="detail-section">
                    <h3>👑 LIDERAZGO</h3>
                    <div id="leadership-info"></div>
                </div>
            </div>
        `;

        // Insertar en el contenedor específico de index.html
        const contenedorDestino = document.getElementById('dashboard-progreso') || document.querySelector('main');
        if (contenedorDestino) {
            if (contenedorDestino.id === 'dashboard-progreso') {
                contenedorDestino.appendChild(this.contenedor);
            } else {
                contenedorDestino.insertBefore(this.contenedor, contenedorDestino.firstChild);
            }
        }

        // Event listener para refresh
        document.getElementById('refresh-dashboard').addEventListener('click', () => {
            this.actualizarEstadisticas();
        });

        // Agregar estilos CSS
        this.agregarEstilos();
    }

    actualizarEstadisticas() {
        if (!this.datos) return;

        // Estadísticas de bases
        const bases = this.datos.obtenerBases();
        const basesHumanas = bases.filter(b => b.TipoBase === 'Humana').length;
        const basesIA = bases.filter(b => b.TipoBase === 'IA').length;
        const comandoCentral = bases.find(b => b.EsComandoCentral === "1");

        document.querySelector('#bases-stats .stat-content').innerHTML = `
            <div class="stat-item">
                <span class="stat-number">${bases.length}</span>
                <span class="stat-label">Total</span>
            </div>
            <div class="stat-breakdown">
                <div>👥 Humanas: ${basesHumanas}</div>
                <div>🤖 IA: ${basesIA}</div>
                <div>🏛️ Comando: ${comandoCentral ? comandoCentral.Nombre : 'N/A'}</div>
            </div>
        `;

        // Estadísticas de supervivientes
        const supervivientes = this.datos.obtenerSupervivientes();
        const edadPromedio = supervivientes.length > 0 ? 
            supervivientes.reduce((sum, s) => sum + s.Edad, 0) / supervivientes.length : 0;
        const roles = [...new Set(supervivientes.map(s => s.Rol))];

        document.querySelector('#survivors-stats .stat-content').innerHTML = `
            <div class="stat-item">
                <span class="stat-number">${supervivientes.length}</span>
                <span class="stat-label">Supervivientes</span>
            </div>
            <div class="stat-breakdown">
                <div>📊 Edad promedio: ${edadPromedio.toFixed(1)} años</div>
                <div>🎯 Roles: ${roles.length}</div>
                <div class="roles-list">${roles.map(r => `<span class="role-tag">${r}</span>`).join('')}</div>
            </div>
        `;

        // Estadísticas de recursos
        const recursos = this.datos.obtenerRecursos();
        const totalComida = recursos.reduce((sum, r) => sum + (r.ComidaRaciones || 0), 0);
        const totalAgua = recursos.reduce((sum, r) => sum + (r.AguaLitros || 0), 0);
        const totalArmas = recursos.reduce((sum, r) => sum + (r.Armas || 0), 0);

        document.querySelector('#resources-stats .stat-content').innerHTML = `
            <div class="stat-item">
                <span class="stat-number">${recursos.length}</span>
                <span class="stat-label">Bases con recursos</span>
            </div>
            <div class="stat-breakdown">
                <div>🍞 Comida: ${totalComida.toLocaleString()} raciones</div>
                <div>💧 Agua: ${totalAgua.toLocaleString()} litros</div>
                <div>⚔️ Armas: ${totalArmas}</div>
            </div>
        `;

        // Estadísticas de ataques
        const ataques = this.datos.obtenerAtaques();
        const totalMuertos = ataques.reduce((sum, a) => sum + (a.Muertos || 0), 0);
        const tiposRobots = [...new Set(ataques.map(a => a.TipoRobot))];
        const basesAtacadas = [...new Set(ataques.map(a => a.BaseID))].length;

        document.querySelector('#attacks-stats .stat-content').innerHTML = `
            <div class="stat-item">
                <span class="stat-number">${ataques.length}</span>
                <span class="stat-label">Ataques registrados</span>
            </div>
            <div class="stat-breakdown">
                <div>💀 Bajas: ${totalMuertos}</div>
                <div>🏠 Bases atacadas: ${basesAtacadas}</div>
                <div>🤖 Tipos de robots: ${tiposRobots.join(', ')}</div>
            </div>
        `;

        // Información geográfica
        const hemisferioNorte = bases.filter(b => b.Latitud > 0).length;
        const hemisferioSur = bases.filter(b => b.Latitud <= 0).length;

        document.getElementById('geographic-info').innerHTML = `
            <div class="geo-stats">
                <div>🌍 Hemisferio Norte: ${hemisferioNorte} bases</div>
                <div>🌎 Hemisferio Sur: ${hemisferioSur} bases</div>
                <div class="base-list">
                    ${bases.map(b => `
                        <div class="base-item">
                            <strong>${b.Nombre}</strong> (${b.Ubicacion})
                            <span class="coords">${b.Latitud.toFixed(2)}, ${b.Longitud.toFixed(2)}</span>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;

        // Información de liderazgo
        const comandante = supervivientes.find(s => s.Rol === 'Comandante');
        const medico = supervivientes.find(s => s.Rol === 'Médica');
        const soldados = supervivientes.filter(s => s.Rol === 'Soldado');

        document.getElementById('leadership-info').innerHTML = `
            <div class="leadership-stats">
                ${comandante ? `<div>👑 Comandante: ${comandante.Nombre} (${comandante.Edad} años)</div>` : ''}
                ${medico ? `<div>⚕️ Médica: ${medico.Nombre} (${medico.Edad} años)</div>` : ''}
                <div>⚔️ Soldados: ${soldados.length}</div>
                <div class="survivor-list">
                    ${supervivientes.map(s => `
                        <div class="survivor-item">
                            <span class="name">${s.Nombre}</span>
                            <span class="role">${s.Rol}</span>
                            <span class="age">${s.Edad}a</span>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;

        console.log('📊 Dashboard actualizado con datos reales de Atapuerca');
    }

    agregarEstilos() {
        const estilos = `
            <style>
            .dashboard-container {
                background: linear-gradient(135deg, #1e3c72 0%, #2a5298 100%);
                border-radius: 15px;
                padding: 20px;
                margin: 20px 0;
                color: white;
                box-shadow: 0 10px 30px rgba(0,0,0,0.3);
            }

            .dashboard-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-bottom: 20px;
                border-bottom: 2px solid rgba(255,255,255,0.3);
                padding-bottom: 15px;
            }

            .dashboard-header h2 {
                margin: 0;
                font-size: 1.5em;
                text-shadow: 2px 2px 4px rgba(0,0,0,0.5);
            }

            .btn-refresh {
                background: #28a745;
                color: white;
                border: none;
                padding: 8px 15px;
                border-radius: 8px;
                cursor: pointer;
                transition: all 0.3s ease;
            }

            .btn-refresh:hover {
                background: #218838;
                transform: scale(1.05);
            }

            .dashboard-grid {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
                gap: 20px;
                margin-bottom: 30px;
            }

            .stat-card {
                background: rgba(255,255,255,0.1);
                border-radius: 12px;
                padding: 20px;
                backdrop-filter: blur(10px);
                border: 1px solid rgba(255,255,255,0.2);
                transition: transform 0.3s ease;
            }

            .stat-card:hover {
                transform: translateY(-5px);
            }

            .stat-card h3 {
                margin: 0 0 15px 0;
                font-size: 1.1em;
                text-align: center;
                border-bottom: 1px solid rgba(255,255,255,0.3);
                padding-bottom: 10px;
            }

            .stat-item {
                text-align: center;
                margin-bottom: 15px;
            }

            .stat-number {
                display: block;
                font-size: 2.5em;
                font-weight: bold;
                color: #ffd700;
                text-shadow: 2px 2px 4px rgba(0,0,0,0.5);
            }

            .stat-label {
                display: block;
                font-size: 0.9em;
                opacity: 0.8;
            }

            .stat-breakdown {
                font-size: 0.9em;
                line-height: 1.6;
            }

            .stat-breakdown > div {
                margin-bottom: 5px;
            }

            .roles-list {
                margin-top: 10px;
            }

            .role-tag {
                display: inline-block;
                background: rgba(255,255,255,0.2);
                padding: 2px 8px;
                margin: 2px;
                border-radius: 12px;
                font-size: 0.8em;
            }

            .dashboard-details {
                display: grid;
                grid-template-columns: 1fr 1fr;
                gap: 20px;
            }

            .detail-section {
                background: rgba(255,255,255,0.05);
                border-radius: 12px;
                padding: 20px;
                border: 1px solid rgba(255,255,255,0.1);
            }

            .detail-section h3 {
                margin: 0 0 15px 0;
                font-size: 1.1em;
                border-bottom: 1px solid rgba(255,255,255,0.3);
                padding-bottom: 10px;
            }

            .base-item, .survivor-item {
                background: rgba(255,255,255,0.1);
                padding: 8px 12px;
                margin: 5px 0;
                border-radius: 8px;
                display: flex;
                justify-content: space-between;
                align-items: center;
            }

            .coords {
                font-family: monospace;
                font-size: 0.8em;
                opacity: 0.7;
            }

            .survivor-item .name {
                font-weight: bold;
            }

            .survivor-item .role {
                background: rgba(255,255,255,0.2);
                padding: 2px 6px;
                border-radius: 6px;
                font-size: 0.8em;
            }

            .survivor-item .age {
                font-size: 0.8em;
                opacity: 0.8;
            }

            @media (max-width: 768px) {
                .dashboard-grid {
                    grid-template-columns: 1fr;
                }
                
                .dashboard-details {
                    grid-template-columns: 1fr;
                }
                
                .dashboard-header {
                    flex-direction: column;
                    gap: 10px;
                }
            }
            </style>
        `;

        document.head.insertAdjacentHTML('beforeend', estilos);
    }
}

// Inicializar dashboard cuando la página esté lista - SOLO EN INDEX.HTML
document.addEventListener('DOMContentLoaded', async function() {
    // Solo mostrar dashboard en la página de inicio
    const esIndex = window.location.pathname.endsWith('index.html') || 
                   window.location.pathname === '/' ||
                   window.location.pathname.endsWith('/');
    
    if (esIndex) {
        setTimeout(async () => {
            const dashboard = new AtapuercaDashboard();
            await dashboard.inicializar();
        }, 1000); // Dar tiempo para que se carguen los datos
    }
});
