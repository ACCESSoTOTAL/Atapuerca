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

// Cargar consulta pendiente si viene de un reto
document.addEventListener('DOMContentLoaded', function() {
  const urlParams = new URLSearchParams(window.location.search);
  const consultaPendiente = localStorage.getItem('consultaPendiente');
  
  if (urlParams.get('reto') === 'true' && consultaPendiente) {
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
    info.innerHTML = '🎯 Consulta del reto cargada. ¡Modifícala si es necesario y ejecuta!';
    
    const main = document.querySelector('main');
    main.insertBefore(info, main.children[2]);
    
    // Remover el mensaje después de 5 segundos
    setTimeout(() => info.remove(), 5000);
  }
});
