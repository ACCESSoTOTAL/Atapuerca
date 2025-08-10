async function runQuery() {
  const query = document.getElementById('sqlInput').value;
  const output = document.getElementById('output');
  output.innerHTML = '🔄 Ejecutando consulta...';
  output.style.color = 'var(--accent-cyan)';

  try {
    const res = await fetch('https://atapuerca-backend.onrender.com/query', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query })
    });

    const data = await res.json();
    if (res.ok) {
      if (data.rows && data.rows.length > 0) {
        // Crear tabla HTML
        const table = createDataTable(data.rows);
        let resultHTML = `
          <div style="color: var(--text-primary); margin-bottom: 1em;">
            ✅ CONSULTA EXITOSA<br>
            📊 Registros encontrados: ${data.rows.length}
          </div>
          ${table}
        `;
        
        // Verificar si se completó un reto
        if (typeof verificarReto === 'function') {
          const retoResult = verificarReto(query, data.rows);
          if (retoResult.completado) {
            resultHTML = `
              <div style="
                background: linear-gradient(135deg, var(--primary-green), var(--secondary-green)); 
                color: var(--bg-dark); 
                padding: 1em; 
                border-radius: 5px; 
                margin-bottom: 1em; 
                text-align: center; 
                font-weight: bold;
              ">
                ${retoResult.mensaje}<br>
                <span style="font-size: 0.9em;">Puntuación total: ${parseInt(localStorage.getItem('puntuacionAtapuerca') || '0')} puntos</span>
              </div>
            ` + resultHTML;
          }
        }
        
        output.innerHTML = resultHTML;
        output.style.color = 'var(--text-primary)';
      } else {
        output.innerHTML = '✅ La consulta se ejecutó correctamente pero no devolvió resultados.';
        output.style.color = 'var(--accent-orange)';
      }
    } else {
      output.innerHTML = '❌ ERROR: ' + (data.error || 'Error desconocido');
      output.style.color = '#ff4444';
    }
  } catch (err) {
    output.innerHTML = '🔌 ERROR DE CONEXIÓN: ' + err.message + '<br><br>Verifica que el backend esté funcionando.';
    output.style.color = '#ff4444';
    console.error('Error:', err);
  }
}

function createDataTable(rows) {
  if (!rows || rows.length === 0) return '';
  
  // Obtener las columnas del primer registro
  const columns = Object.keys(rows[0]);
  
  let html = `
    <div style="overflow-x: auto; margin-top: 1em;">
      <table style="
        width: 100%; 
        border-collapse: collapse; 
        background: var(--bg-light); 
        border: 2px solid var(--primary-green);
        border-radius: 5px;
        overflow: hidden;
      ">
        <thead>
          <tr style="background: var(--primary-green); color: var(--bg-dark);">
  `;
  
  // Crear encabezados
  columns.forEach(col => {
    html += `<th style="padding: 12px; text-align: left; font-weight: bold; border-right: 1px solid var(--bg-dark);">${col}</th>`;
  });
  
  html += `
          </tr>
        </thead>
        <tbody>
  `;
  
  // Crear filas de datos
  rows.forEach((row, index) => {
    const bgColor = index % 2 === 0 ? 'var(--bg-light)' : 'var(--bg-medium)';
    html += `<tr style="background: ${bgColor}; border-bottom: 1px solid var(--dark-green);">`;
    
    columns.forEach(col => {
      const value = row[col] !== null && row[col] !== undefined ? row[col] : 'NULL';
      html += `<td style="padding: 10px; border-right: 1px solid var(--dark-green); color: var(--text-primary);">${value}</td>`;
    });
    
    html += '</tr>';
  });
  
  html += `
        </tbody>
      </table>
    </div>
  `;
  
  return html;
}

// Mostrar información del reto actual
function mostrarRetoActual() {
  const retoActual = JSON.parse(localStorage.getItem('retoActual') || 'null');
  
  if (retoActual) {
    const retoInfo = document.createElement('div');
    retoInfo.id = 'reto-info';
    retoInfo.style.cssText = `
      background: linear-gradient(135deg, var(--bg-medium), var(--bg-light)); 
      border: 2px solid var(--accent-orange); 
      padding: 1.5em; 
      border-radius: 8px; 
      margin-bottom: 2em; 
      box-shadow: 0 0 20px rgba(255, 136, 0, 0.3);
    `;
    
    const faseInfo = getFaseInfo(retoActual.fase);
    
    retoInfo.innerHTML = `
      <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 1em;">
        <h3 style="margin: 0; color: var(--accent-orange); display: flex; align-items: center; gap: 0.5em;">
          🎯 Reto Actual: ${retoActual.titulo}
        </h3>
        <span style="
          background: var(--accent-orange); 
          color: var(--bg-dark); 
          padding: 0.3em 0.8em; 
          border-radius: 15px; 
          font-size: 0.8em; 
          font-weight: bold;
        ">${retoActual.nivel} - ${retoActual.puntos}pts</span>
      </div>
      
      <div style="margin-bottom: 1em;">
        <strong style="color: ${faseInfo.color};">${faseInfo.icono} ${faseInfo.titulo}</strong>
      </div>
      
      <p style="margin: 0 0 1em 0; color: var(--text-secondary); line-height: 1.5; font-size: 1.1em;">
        <strong style="color: var(--accent-cyan);">Misión:</strong> ${retoActual.descripcion}
      </p>
      
      <!-- Video de YouTube embebido -->
      <div style="margin: 1em 0; border-radius: 8px; overflow: hidden; border: 2px solid var(--accent-orange);">
        <iframe 
          width="100%" 
          height="200" 
          src="${convertirURLYoutube(retoActual.videoUrl)}" 
          frameborder="0" 
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
          allowfullscreen
          style="display: block;">
        </iframe>
      </div>
      
      <div style="display: flex; flex-wrap: wrap; gap: 0.5em; margin-top: 1em;">
        <button onclick="mostrarPistaReto()" style="
          background: var(--bg-medium); 
          color: var(--accent-orange); 
          border: 1px solid var(--accent-orange); 
          padding: 0.5em 1em; 
          border-radius: 3px; 
          font-size: 0.9em;
        ">💡 Mostrar pista</button>
        
        <button onclick="cargarConsultaSugerida()" style="
          background: var(--accent-cyan); 
          color: var(--bg-dark); 
          border: none; 
          padding: 0.5em 1em; 
          border-radius: 3px; 
          font-size: 0.9em;
          font-weight: bold;
        ">📝 Ver ejemplo de solución</button>
        
        <button onclick="ocultarRetoActual()" style="
          background: var(--bg-medium); 
          color: var(--text-secondary); 
          border: 1px solid var(--text-secondary); 
          padding: 0.5em 1em; 
          border-radius: 3px; 
          font-size: 0.9em;
        ">👁️ Ocultar</button>
      </div>
      
      <div id="pista-reto" style="display: none; margin-top: 1em; padding: 1em; background: var(--bg-medium); border-radius: 5px; border-left: 3px solid var(--accent-orange);">
        <strong style="color: var(--accent-orange);">💡 Pista:</strong> ${retoActual.pista}
      </div>
    `;
    
    return retoInfo;
  }
  
  return null;
}

function getFaseInfo(fase) {
  const fasesInfo = {
    1: {
      titulo: "Fase 1 — Nivel Básico (1–10)",
      descripcion: "Fundamentos SQL: SELECT, WHERE, ORDER BY",
      color: "var(--primary-green)",
      icono: "�"
    },
    1.5: {
      titulo: "Fase 1.5 — Tutorial JOIN (11–20)", 
      descripcion: "Dominio completo de JOINs: INNER, LEFT, RIGHT, FULL OUTER, CROSS",
      color: "var(--accent-cyan)",
      icono: "🔗"
    },
    2: {
      titulo: "Fase 2 — Nivel Intermedio (21–30)",
      descripcion: "JOINs aplicados y análisis de datos reales",
      color: "var(--accent-orange)",
      icono: "�"
    },
    3: {
      titulo: "Fase 3 — Nivel Avanzado (31–40)",
      descripcion: "Agregaciones complejas: GROUP BY, HAVING, funciones window",
      color: "#ff6b6b",
      icono: "�"
    },
    4: {
      titulo: "Fase 4 — Nivel Experto (41–50)",
      descripcion: "Subconsultas estratégicas y análisis predictivo",
      color: "#ff4444",
      icono: "🎯"
    },
    5: {
      titulo: "Fase 5 — Nivel Maestro (51–60)",
      descripcion: "CTEs complejas y modelado integral del futuro",
      color: "#8b5cf6",
      icono: "🏆"
    }
  };
  return fasesInfo[fase] || fasesInfo[1];
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

function mostrarPistaReto() {
  const pistaDiv = document.getElementById('pista-reto');
  if (pistaDiv.style.display === 'none') {
    pistaDiv.style.display = 'block';
  } else {
    pistaDiv.style.display = 'none';
  }
}

function cargarConsultaSugerida() {
  const retoActual = JSON.parse(localStorage.getItem('retoActual') || 'null');
  if (retoActual) {
    document.getElementById('sqlInput').value = retoActual.consulta_sugerida;
    
    // Mostrar notificación
    const notif = document.createElement('div');
    notif.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      background: var(--accent-cyan);
      color: var(--bg-dark);
      padding: 1em 1.5em;
      border-radius: 5px;
      font-weight: bold;
      z-index: 1000;
      animation: slideIn 0.3s ease;
    `;
    notif.innerHTML = '📝 Ejemplo de solución cargado - ¡Estúdialo!';
    document.body.appendChild(notif);
    
    setTimeout(() => {
      notif.style.animation = 'slideOut 0.3s ease';
      setTimeout(() => notif.remove(), 300);
    }, 2000);
  }
}

function ocultarRetoActual() {
  const retoInfo = document.getElementById('reto-info');
  if (retoInfo) {
    retoInfo.style.display = 'none';
  }
}

// Cargar consulta pendiente si viene de un reto
document.addEventListener('DOMContentLoaded', function() {
  const urlParams = new URLSearchParams(window.location.search);
  const consultaPendiente = localStorage.getItem('consultaPendiente');
  const esEjemplo = urlParams.get('ejemplo') === 'true';
  
  // Mostrar información del reto actual si existe
  const retoInfo = mostrarRetoActual();
  if (retoInfo) {
    const main = document.querySelector('main');
    main.insertBefore(retoInfo, main.children[1]); // Insertar después del h2
  }
  
  // Solo cargar consulta si viene con ejemplo=true
  if (urlParams.get('reto') === 'true' && consultaPendiente && esEjemplo) {
    document.getElementById('sqlInput').value = consultaPendiente;
    localStorage.removeItem('consultaPendiente');
    
    // Mostrar mensaje informativo
    const info = document.createElement('div');
    info.style.cssText = `
      background: var(--accent-cyan); 
      color: var(--bg-dark); 
      padding: 1em; 
      border-radius: 5px; 
      margin-bottom: 1em; 
      text-align: center; 
      font-weight: bold;
    `;
    info.innerHTML = '📝 Consulta de ejemplo cargada. ¡Estúdiala y modifícala si quieres!';
    
    const main = document.querySelector('main');
    const insertPosition = retoInfo ? 3 : 2; // Ajustar posición según si hay reto info
    main.insertBefore(info, main.children[insertPosition]);
    
    // Remover el mensaje después de 5 segundos
    setTimeout(() => info.remove(), 5000);
  } else if (urlParams.get('reto') === 'true') {
    // Limpiar campo si viene de un reto sin ejemplo
    document.getElementById('sqlInput').value = '';
    document.getElementById('sqlInput').placeholder = '-- ¡Tu turno! Escribe aquí tu consulta SQL para resolver el reto...\n-- Pista: Lee la descripción del reto y usa las tablas disponibles';
    
    // Mostrar mensaje de desafío
    const info = document.createElement('div');
    info.style.cssText = `
      background: var(--accent-orange); 
      color: var(--bg-dark); 
      padding: 1em; 
      border-radius: 5px; 
      margin-bottom: 1em; 
      text-align: center; 
      font-weight: bold;
    `;
    info.innerHTML = '🎯 ¡Desafío activo! Escribe tu propia consulta SQL para resolver el reto. Si necesitas ayuda, usa el botón "📝 Ver ejemplo".';
    
    const main = document.querySelector('main');
    const insertPosition = retoInfo ? 3 : 2;
    main.insertBefore(info, main.children[insertPosition]);
    
    setTimeout(() => info.remove(), 7000);
  }
});

// Cargar ejemplo si viene desde retos.html
document.addEventListener('DOMContentLoaded', function() {
  const queryToLoad = localStorage.getItem('queryToLoad');
  if (queryToLoad) {
    const sqlInput = document.getElementById('sqlInput');
    if (sqlInput) {
      sqlInput.value = queryToLoad;
      // Scroll hacia el textarea
      sqlInput.scrollIntoView({ behavior: 'smooth', block: 'center' });
      // Enfocar el textarea
      setTimeout(() => sqlInput.focus(), 500);
    }
    // Limpiar el localStorage
    localStorage.removeItem('queryToLoad');
    
    // Mostrar mensaje de ayuda
    const info = document.createElement('div');
    info.style.cssText = `
      background: linear-gradient(135deg, var(--accent-orange), #ff9500); 
      color: var(--bg-dark); 
      padding: 1em; 
      border-radius: 5px; 
      margin-bottom: 1em; 
      text-align: center; 
      font-weight: bold;
    `;
    info.innerHTML = '📝 Ejemplo cargado. Puedes usar esta consulta como referencia y modificarla para resolver el reto.';
    
    const main = document.querySelector('main');
    main.insertBefore(info, main.children[2]);
    
    setTimeout(() => info.remove(), 8000);
  }
});
