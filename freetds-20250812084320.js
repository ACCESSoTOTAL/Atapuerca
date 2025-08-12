// JAVASCRIPT FINAL FREETDS 20250812084320
console.log('🎯 FINAL FREETDS 20250812084320 CARGADO');

async function runQuery() {
  const query = document.getElementById('sqlInput').value;
  const output = document.getElementById('output');
  
  output.innerHTML = '🎯 FINAL FREETDS - Conectando a Azure SQL...';
  output.style.color = 'var(--accent-cyan)';

  try {
    console.log('🎯 FINAL FREETDS - Query:', query);
    console.log('🎯 FINAL FREETDS - Endpoint: /final-freetds.php');
    
    const res = await fetch('/final-freetds.php', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query })
    });

    console.log('🎯 FINAL FREETDS - Status:', res.status);
    
    const responseText = await res.text();
    console.log('🎯 FINAL FREETDS - Response:', responseText);
    
    if (!responseText) {
      throw new Error('FINAL FREETDS - Respuesta vacía');
    }
    
    let data;
    try {
      data = JSON.parse(responseText);
      console.log('🎯 FINAL FREETDS - Data:', data);
    } catch (parseError) {
      console.error('🎯 FINAL FREETDS - Parse Error:', parseError);
      output.innerHTML = `
        <div style="color: var(--error-red);">
          ❌ FINAL FREETDS JSON Error: ${parseError.message}<br>
          Raw: ${responseText}
        </div>
      `;
      return;
    }
    
    if (data.success && data.rows) {
      const table = createFinalTable(data.rows);
      output.innerHTML = `
        <div style="color: var(--primary-green); font-weight: bold; margin-bottom: 1em;">
          🎯 FINAL FREETDS - AZURE SQL SERVER CONECTADO ✅<br>
          🤖 Datos REALES FreeTDS: ${data.rows.length} registros<br>
          📡 Servidor: ${data.server || 'Azure SQL'} (${data.driver})<br>
          🕒 ${data.timestamp}
        </div>
        ${table}
      `;
    } else {
      output.innerHTML = `
        <div style="color: var(--error-red);">
          ❌ FINAL FREETDS Error: ${data.error}
        </div>
      `;
    }
    
  } catch (error) {
    console.error('🎯 FINAL FREETDS - Error:', error);
    output.innerHTML = `
      <div style="color: var(--error-red);">
        🔌 FINAL FREETDS ERROR: ${error.message}
      </div>
    `;
  }
}

function createFinalTable(rows) {
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
        border-right: 1px solid var(--bg-light);
      ">${row[col] || ''}</td>`;
    });
    
    html += '</tr>';
  });
  
  html += `</tbody></table>`;
  return html;
}
