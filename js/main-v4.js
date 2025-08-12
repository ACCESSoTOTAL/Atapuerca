// JavaScript V4 - Conectando al endpoint que funciona
async function runQuery() {
  const query = document.getElementById('sqlInput').value;
  const output = document.getElementById('output');
  output.innerHTML = '🔄 V4 - Ejecutando consulta...';
  output.style.color = 'var(--accent-cyan)';

  try {
    console.log('📡 V4 - Enviando a simple-v3.php');
    console.log('📡 V4 - Query:', query);
    console.log('📡 V4 - JSON:', JSON.stringify({ query }));
    
    const res = await fetch('/simple-v3.php', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query })
    });

    console.log('📡 V4 - Response status:', res.status);
    console.log('📡 V4 - Response ok:', res.ok);
    
    const responseText = await res.text();
    console.log('📡 V4 - Raw response:', responseText);
    
    let data;
    try {
      data = JSON.parse(responseText);
      console.log('📡 V4 - Parsed data:', data);
    } catch (parseError) {
      console.error('📡 V4 - Parse Error:', parseError);
      output.innerHTML = `
        <div style="color: var(--error-red);">
          ❌ V4 JSON Parse Error: ${parseError.message}<br>
          Raw response: ${responseText}
        </div>
      `;
      return;
    }
    
    if (res.ok && data.success) {
      if (data.rows && data.rows.length > 0) {
        // Crear tabla HTML con datos reales
        const table = createDataTable(data.rows);
        let resultHTML = `
          <div style="color: var(--text-primary); margin-bottom: 1em;">
            ✅ V4 CONSULTA EXITOSA - Azure SQL Server<br>
            📊 Registros encontrados: ${data.rows.length}
          </div>
          ${table}
        `;
        
        output.innerHTML = resultHTML;
        output.style.color = 'var(--text-primary)';
      } else {
        output.innerHTML = `
          <div style="color: var(--accent-orange);">
            ⚠️ V4 Consulta ejecutada correctamente<br>
            📊 No se encontraron registros
          </div>
        `;
        output.style.color = 'var(--accent-orange)';
      }
    } else {
      output.innerHTML = `
        <div style="color: var(--error-red);">
          ❌ V4 Error: ${data.error || 'Error desconocido'}<br>
          Response: ${responseText}
        </div>
      `;
    }
    
  } catch (error) {
    console.error('📡 V4 - Catch Error:', error);
    output.innerHTML = `
      <div style="color: var(--error-red);">
        🔌 V4 ERROR DE CONEXIÓN: ${error.message}
      </div>
    `;
  }
}

// Función para crear tabla HTML
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
