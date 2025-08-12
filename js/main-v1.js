// JavaScript V1 para diagnóstico
async function runQuery() {
  const query = document.getElementById('sqlInput').value;
  const output = document.getElementById('output');
  output.innerHTML = '🔄 V1 - Ejecutando consulta...';
  output.style.color = 'var(--accent-cyan)';

  try {
    console.log('📡 V1 - Enviando a debug-v1.php');
    console.log('📡 V1 - Query:', query);
    console.log('📡 V1 - JSON:', JSON.stringify({ query }));
    
    const res = await fetch('/debug-v1.php', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query })
    });

    console.log('📡 V1 - Response status:', res.status);
    console.log('📡 V1 - Response ok:', res.ok);
    
    const responseText = await res.text();
    console.log('📡 V1 - Raw response text:', responseText);
    
    let data;
    try {
      data = JSON.parse(responseText);
      console.log('📡 V1 - Parsed data:', data);
    } catch (parseError) {
      console.error('📡 V1 - Parse Error:', parseError);
      output.innerHTML = `
        <div style="color: var(--error-red);">
          ❌ V1 JSON Parse Error: ${parseError.message}<br>
          Raw response: ${responseText}
        </div>
      `;
      return;
    }
    
    if (res.ok && data.success) {
      output.innerHTML = `
        <div style="color: var(--accent-cyan); font-family: monospace; font-size: 12px;">
          ✅ V1 SUCCESS - Endpoint funcionando<br>
          📊 Version: ${data.version}<br>
          📊 Timestamp: ${data.timestamp}<br>
          📊 Query recibida: ${data.query_received}<br>
          📊 Rows: ${data.count}<br><br>
          <pre>${JSON.stringify(data, null, 2)}</pre>
        </div>
      `;
    } else {
      output.innerHTML = `
        <div style="color: var(--error-red);">
          ❌ V1 Error: ${data.error || 'Error desconocido'}<br>
          Response: ${responseText}
        </div>
      `;
    }
    
  } catch (error) {
    console.error('📡 V1 - Catch Error:', error);
    output.innerHTML = `
      <div style="color: var(--error-red);">
        🔌 V1 ERROR DE CONEXIÓN: ${error.message}
      </div>
    `;
  }
}

// Función dummy para crear tabla
function createDataTable(rows) {
  return '<pre>' + JSON.stringify(rows, null, 2) + '</pre>';
}
