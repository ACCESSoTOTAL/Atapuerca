async function runQuery() {
  const sql = document.getElementById('sql').value;
  const output = document.getElementById('output');
  output.textContent = 'Ejecutando...';

  try {
    const res = await fetch('/query', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query: sql })
    });

    const data = await res.json();

    if (res.ok) {
      output.textContent = JSON.stringify(data.rows, null, 2);
    } else {
      output.textContent = 'Error: ' + data.error;
    }
  } catch (e) {
    output.textContent = 'Error de conexión';
  }
}