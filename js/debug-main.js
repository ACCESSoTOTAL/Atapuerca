async function runQuery() {
  const query = document.getElementById('sqlInput').value;
  const output = document.getElementById('output');
  output.innerHTML = '🔄 Ejecutando consulta...';
  output.style.color = 'var(--accent-cyan)';

  try {
    console.log('🔍 DIAGNÓSTICO - Enviando query:', query);
    console.log('🔍 DIAGNÓSTICO - JSON a enviar:', JSON.stringify({ query }));
    
    const res = await fetch('/full-debug.php', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query })
    });

    console.log('🔍 DIAGNÓSTICO - Response status:', res.status);
    console.log('🔍 DIAGNÓSTICO - Response ok:', res.ok);
    
    const responseText = await res.text();
    console.log('🔍 DIAGNÓSTICO - Raw response:', responseText);
    
    let data;
    try {
      data = JSON.parse(responseText);
      console.log('🔍 DIAGNÓSTICO - Parsed data:', data);
    } catch (parseError) {
      console.error('🔍 DIAGNÓSTICO - JSON Parse Error:', parseError);
      throw new Error('Respuesta no es JSON válido: ' + responseText);
    }
    
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
        output.innerHTML = `
          <div style="color: var(--accent-orange);">
            ⚠️ Consulta ejecutada correctamente<br>
            📊 No se encontraron registros
          </div>
        `;
        output.style.color = 'var(--accent-orange)';
      }
    } else {
      throw new Error(data.error || 'Error del servidor');
    }
  } catch (error) {
    console.error('🔍 DIAGNÓSTICO - Error completo:', error);
    output.innerHTML = `
      <div style="color: var(--error-red);">
        🔌 ERROR DE CONEXIÓN: ${error.message}<br><br>
        Verifica que el backend esté funcionando.
      </div>
    `;
    output.style.color = 'var(--error-red)';
  }
}

// Resto del código igual...
function createDataTable(rows) {
  if (!rows || rows.length === 0) return '<p>No hay datos</p>';
  
  const columns = Object.keys(rows[0]);
  
  let html = `
    <table style="
      width: 100%; 
      border-collapse: collapse; 
      background: var(--bg-dark); 
      border: 1px solid var(--primary-green);
      border-radius: 5px;
      overflow: hidden;
    ">
      <thead>
        <tr style="background: linear-gradient(135deg, var(--primary-green), var(--secondary-green));">
  `;
  
  columns.forEach(col => {
    html += `<th style="
      padding: 12px; 
      text-align: left; 
      color: var(--bg-dark); 
      font-weight: bold;
      border-right: 1px solid rgba(0,0,0,0.2);
    ">${col}</th>`;
  });
  
  html += `
        </tr>
      </thead>
      <tbody>
  `;
  
  rows.forEach((row, index) => {
    const bgColor = index % 2 === 0 ? 'var(--bg-medium)' : 'var(--bg-dark)';
    html += `<tr style="background: ${bgColor};">`;
    
    columns.forEach(col => {
      html += `<td style="
        padding: 10px 12px; 
        border-right: 1px solid var(--bg-light);
        color: var(--text-primary);
      ">${row[col] || ''}</td>`;
    });
    
    html += '</tr>';
  });
  
  html += `
      </tbody>
    </table>
  `;
  
  return html;
}
