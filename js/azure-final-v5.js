// JavaScript V5 FINAL - Conexión directa a Azure SQL
async function runQuery() {
  const query = document.getElementById('sqlInput').value;
  const output = document.getElementById('output');
  output.innerHTML = '🔄 V5 FINAL - Conectando a Azure SQL...';
  output.style.color = 'var(--accent-cyan)';

  try {
    console.log('🚀 V5 FINAL - Query:', query);
    console.log('🚀 V5 FINAL - Enviando a simple-v3.php');
    
    const res = await fetch('/simple-v3.php', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query })
    });

    console.log('🚀 V5 FINAL - Status:', res.status);
    
    const responseText = await res.text();
    console.log('🚀 V5 FINAL - Raw response:', responseText);
    
    let data = JSON.parse(responseText);
    console.log('🚀 V5 FINAL - Parsed data:', data);
    
    if (res.ok && data.success) {
      if (data.rows && data.rows.length > 0) {
        // Mostrar datos REALES de Azure SQL
        const table = createTableV5(data.rows);
        output.innerHTML = `
          <div style="color: var(--primary-green); margin-bottom: 1em; font-weight: bold;">
            ✅ V5 FINAL - AZURE SQL SERVER CONECTADO<br>
            🤖 Tabla: ${data.rows[0].hasOwnProperty('RobotID') ? 'Robots' : 'Otra tabla'}<br>
            📊 Registros: ${data.rows.length}
          </div>
          ${table}
        `;
        output.style.color = 'var(--text-primary)';
      } else {
        output.innerHTML = `
          <div style="color: var(--accent-orange);">
            ⚠️ V5 FINAL - Sin resultados
          </div>
        `;
      }
    } else {
      output.innerHTML = `
        <div style="color: var(--error-red);">
          ❌ V5 FINAL Error: ${data.error}
        </div>
      `;
    }
    
  } catch (error) {
    console.error('🚀 V5 FINAL - Error:', error);
    output.innerHTML = `
      <div style="color: var(--error-red);">
        🔌 V5 FINAL ERROR: ${error.message}
      </div>
    `;
  }
}

function createTableV5(rows) {
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
      box-shadow: 0 0 20px rgba(0, 255, 65, 0.3);
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
    html += `<tr style="background: ${bgColor}; border-bottom: 1px solid var(--bg-light);">`;
    
    columns.forEach(col => {
      html += `<td style="
        padding: 12px 15px; 
        border-right: 1px solid var(--bg-light);
        color: var(--text-primary);
        font-size: 13px;
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
