// Sistema de retos SQL
const retos = [
  {
    id: 1,
    nivel: "Principiante",
    titulo: "Reconocimiento básico",
    descripcion: "Obtén los primeros 10 robots de la base de datos",
    consulta_esperada: "SELECT TOP 10 * FROM Robots;",
    pista: "Usa SELECT con TOP para limitar resultados",
    puntos: 10
  },
  {
    id: 2,
    nivel: "Principiante", 
    titulo: "Filtrado simple",
    descripcion: "Encuentra todos los robots cuyo nombre empiece por 'R'",
    consulta_esperada: "SELECT * FROM Robots WHERE Nombre LIKE 'R%';",
    pista: "Usa LIKE con el operador % para patrones",
    puntos: 15
  },
  {
    id: 3,
    nivel: "Intermedio",
    titulo: "Ordenamiento estratégico", 
    descripcion: "Lista todos los robots ordenados por año de creación (más recientes primero)",
    consulta_esperada: "SELECT * FROM Robots ORDER BY AñoCreacion DESC;",
    pista: "ORDER BY con DESC para orden descendente",
    puntos: 20
  },
  {
    id: 4,
    nivel: "Intermedio",
    titulo: "Conteo de resistentes",
    descripcion: "Cuenta cuántos robots hay por cada tipo",
    consulta_esperada: "SELECT Tipo, COUNT(*) as Total FROM Robots GROUP BY Tipo;",
    pista: "Usa GROUP BY y COUNT(*)",
    puntos: 25
  },
  {
    id: 5,
    nivel: "Avanzado",
    titulo: "Análisis temporal",
    descripcion: "Encuentra el robot más antiguo y el más nuevo",
    consulta_esperada: "SELECT MIN(AñoCreacion) as MasAntiguo, MAX(AñoCreacion) as MasNuevo FROM Robots;",
    pista: "Funciones MIN() y MAX()",
    puntos: 30
  }
];

let puntuacionTotal = parseInt(localStorage.getItem('puntuacionAtapuerca') || '0');
let retosCompletados = JSON.parse(localStorage.getItem('retosCompletados') || '[]');

function cargarRetos() {
  const container = document.getElementById('retos-container');
  if (!container) return;
  
  let html = `
    <div style="margin-bottom: 2em; padding: 1em; background: var(--bg-light); border-radius: 5px; border-left: 4px solid var(--accent-cyan);">
      <h3 style="margin: 0 0 0.5em 0; color: var(--accent-cyan);">🏆 Tu progreso</h3>
      <p style="margin: 0;">
        <strong>Puntuación total:</strong> <span id="puntuacion-actual">${puntuacionTotal}</span> puntos<br>
        <strong>Retos completados:</strong> ${retosCompletados.length}/${retos.length}
      </p>
    </div>
  `;
  
  retos.forEach(reto => {
    const completado = retosCompletados.includes(reto.id);
    const colorNivel = reto.nivel === 'Principiante' ? 'var(--primary-green)' : 
                      reto.nivel === 'Intermedio' ? 'var(--accent-orange)' : '#ff4444';
    
    html += `
      <div class="reto-card" style="
        margin: 2em 0; 
        padding: 1.5em; 
        background: var(--bg-light); 
        border-radius: 8px; 
        border-left: 4px solid ${colorNivel};
        ${completado ? 'opacity: 0.7; border-color: var(--accent-cyan);' : ''}
      ">
        <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 1em;">
          <h4 style="margin: 0; color: ${colorNivel};">
            ${completado ? '✅' : '🎯'} Reto ${reto.id}: ${reto.titulo}
          </h4>
          <span style="
            background: ${colorNivel}; 
            color: var(--bg-dark); 
            padding: 0.3em 0.8em; 
            border-radius: 15px; 
            font-size: 0.8em; 
            font-weight: bold;
          ">${reto.nivel} - ${reto.puntos}pts</span>
        </div>
        
        <p style="margin: 0 0 1em 0; color: var(--text-secondary);">${reto.descripcion}</p>
        
        <div style="margin: 1em 0;">
          <button onclick="mostrarPista(${reto.id})" style="
            background: var(--bg-medium); 
            color: var(--accent-orange); 
            border: 1px solid var(--accent-orange); 
            padding: 0.5em 1em; 
            border-radius: 3px; 
            font-size: 0.9em;
            margin-right: 1em;
          ">💡 Pista</button>
          
          <button onclick="cargarRetoEnTerminal('${reto.consulta_esperada}')" style="
            background: var(--primary-green); 
            color: var(--bg-dark); 
            border: none; 
            padding: 0.5em 1em; 
            border-radius: 3px; 
            font-size: 0.9em;
          ">🚀 Ir al Terminal</button>
        </div>
        
        <div id="pista-${reto.id}" style="display: none; margin-top: 1em; padding: 1em; background: var(--bg-medium); border-radius: 5px; border-left: 3px solid var(--accent-orange);">
          <strong style="color: var(--accent-orange);">💡 Pista:</strong> ${reto.pista}
        </div>
      </div>
    `;
  });
  
  container.innerHTML = html;
}

function mostrarPista(retoId) {
  const pistaDiv = document.getElementById(`pista-${retoId}`);
  if (pistaDiv.style.display === 'none') {
    pistaDiv.style.display = 'block';
  } else {
    pistaDiv.style.display = 'none';
  }
}

function cargarRetoEnTerminal(consulta) {
  // Guardar la consulta en localStorage para que la página SQL la use
  localStorage.setItem('consultaPendiente', consulta);
  // Redirigir al terminal SQL
  window.location.href = 'sql.html?reto=true';
}

function verificarReto(consultaEjecutada, resultados) {
  // Esta función se llamará desde el terminal SQL para verificar si se completó un reto
  const retoActual = retos.find(r => 
    consultaEjecutada.toLowerCase().replace(/\s+/g, ' ').trim() === 
    r.consulta_esperada.toLowerCase().replace(/\s+/g, ' ').trim()
  );
  
  if (retoActual && !retosCompletados.includes(retoActual.id)) {
    // Reto completado!
    retosCompletados.push(retoActual.id);
    puntuacionTotal += retoActual.puntos;
    
    // Guardar en localStorage
    localStorage.setItem('retosCompletados', JSON.stringify(retosCompletados));
    localStorage.setItem('puntuacionAtapuerca', puntuacionTotal.toString());
    
    // Mostrar mensaje de éxito
    return {
      completado: true,
      reto: retoActual,
      mensaje: `🎉 ¡RETO COMPLETADO! Has ganado ${retoActual.puntos} puntos.`
    };
  }
  
  return { completado: false };
}
