// JAVASCRIPT UNICO V6 - FORZAR AZURE SQL REAL
console.log('🔥 V6 ÚNICO CARGADO - azure-real-v6.js');

async function runQuery() {
  const query = document.getElementById('sqlInput').value;
  const output = document.getElementById('output');
  
  // Mostrar claramente qué versión se está usando
  output.innerHTML = '🔥 V6 ÚNICO - Forzando conexión a Azure SQL Server...';
  output.style.color = 'var(--accent-cyan)';

  try {
    console.log('🔥 V6 ÚNICO - Enviando query:', query);
    console.log('🔥 V6 ÚNICO - Endpoint: /ultra-v7.php');
    console.log('🔥 V6 ÚNICO - JSON enviado:', JSON.stringify({ query }));
    
    const res = await fetch('/ultra-v7.php', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query })
    });

    console.log('🔥 V6 ÚNICO - Response status:', res.status);
    console.log('🔥 V6 ÚNICO - Response ok:', res.ok);
    
    const responseText = await res.text();
    console.log('🔥 V6 ÚNICO - Raw response:', responseText);
    
    if (!responseText) {
      throw new Error('V6 ÚNICO - Respuesta vacía del servidor');
    }
    
    let data;
    try {
      data = JSON.parse(responseText);
      console.log('🔥 V6 ÚNICO - Parsed data:', data);
    } catch (parseError) {
      console.error('🔥 V6 ÚNICO - Parse Error:', parseError);
      output.innerHTML = `
        <div style="color: var(--error-red); font-family: monospace;">
          ❌ V6 ÚNICO - JSON Parse Error<br>
          Error: ${parseError.message}<br>
          Raw response: ${responseText}
        </div>
      `;
      return;
    }
    
    // Verificar si es respuesta real de Azure SQL
    if (data.success && data.rows) {
      const isRealData = data.rows.some(row => row.hasOwnProperty('RobotID') || row.hasOwnProperty('Modelo'));
      
      if (isRealData) {
        // DATOS REALES DE AZURE SQL
        const table = createRealTable(data.rows);
        output.innerHTML = `
          <div style="color: var(--primary-green); font-weight: bold; margin-bottom: 1em; font-size: 16px;">
            🚀 V6 ÚNICO - DATOS REALES DE AZURE SQL SERVER ✅<br>
            🤖 Tabla Robots detectada: ${data.rows.length} registros<br>
            🔥 Endpoint correcto: simple-v3.php
          </div>
          ${table}
        `;
      } else {
        // DATOS SIMULADOS (ERROR)
        output.innerHTML = `
          <div style="color: var(--error-red); font-weight: bold; margin-bottom: 1em;">
            ❌ V6 ÚNICO - ERROR: DATOS SIMULADOS DETECTADOS<br>
            🐛 El navegador está usando cache o endpoint incorrecto<br>
            📊 Datos recibidos: ${JSON.stringify(data.rows[0], null, 2)}
          </div>
          <pre style="background: var(--bg-medium); padding: 1em; color: var(--error-red);">
${JSON.stringify(data, null, 2)}
          </pre>
        `;
      }
    } else {
      output.innerHTML = `
        <div style="color: var(--error-red);">
          ❌ V6 ÚNICO - Error del servidor: ${data.error || 'Error desconocido'}
        </div>
      `;
    }
    
  } catch (error) {
    console.error('🔥 V6 ÚNICO - Catch Error:', error);
    output.innerHTML = `
      <div style="color: var(--error-red);">
        🔌 V6 ÚNICO - ERROR DE CONEXIÓN: ${error.message}
      </div>
    `;
  }
}

function createRealTable(rows) {
  if (!rows || rows.length === 0) return '<p>No hay datos</p>';
  
  const columns = Object.keys(rows[0]);
  
  let html = `
    <table style="
      width: 100%; 
      border-collapse: collapse; 
      background: var(--bg-dark); 
      border: 2px solid var(--primary-green);
      border-radius: 8px;
      overflow: hidden;
      box-shadow: 0 0 20px rgba(0, 255, 65, 0.5);
    ">
      <thead>
        <tr style="background: linear-gradient(135deg, var(--primary-green), var(--secondary-green));">
  `;
  
  columns.forEach(col => {
    html += `<th style="
      padding: 15px; 
      text-align: left; 
      color: var(--bg-dark); 
      font-weight: bold;
      font-size: 14px;
    ">${col}</th>`;
  });
  
  html += `</tr></thead><tbody>`;
  
  rows.forEach((row, index) => {
    const bgColor = index % 2 === 0 ? 'var(--bg-medium)' : 'var(--bg-dark)';
    html += `<tr style="background: ${bgColor};">`;
    
    columns.forEach(col => {
      html += `<td style="
        padding: 12px 15px; 
        color: var(--text-primary);
        font-size: 13px;
        border-right: 1px solid var(--bg-light);
      ">${row[col] || ''}</td>`;
    });
    
    html += '</tr>';
  });
  
  html += `</tbody></table>`;
  return html;
}
