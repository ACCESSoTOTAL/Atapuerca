async function runQuery() {
  const query = document.getElementById('sqlInput').value;
  const output = document.getElementById('output');
  output.textContent = '🔄 Ejecutando consulta...';
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
        // Formatear los resultados de manera más legible
        const formattedResult = `✅ CONSULTA EXITOSA
📊 Registros encontrados: ${data.rows.length}

${JSON.stringify(data.rows, null, 2)}`;
        output.textContent = formattedResult;
        output.style.color = 'var(--text-primary)';
      } else {
        output.textContent = '✅ La consulta se ejecutó correctamente pero no devolvió resultados.';
        output.style.color = 'var(--accent-orange)';
      }
    } else {
      output.textContent = '❌ ERROR: ' + (data.error || 'Error desconocido');
      output.style.color = '#ff4444';
    }
  } catch (err) {
    output.textContent = '🔌 ERROR DE CONEXIÓN: ' + err.message + '\n\nVerifica que el backend esté funcionando.';
    output.style.color = '#ff4444';
    console.error('Error:', err);
  }
}
