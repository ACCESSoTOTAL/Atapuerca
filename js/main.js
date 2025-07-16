async function runQuery() {
  const query = document.getElementById('sqlInput').value;
  const output = document.getElementById('output');
  output.textContent = 'Ejecutando consulta...';

  try {
    const res = await fetch('https://atapuerca-backend.onrender.com/query', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query })
    });

    const data = await res.json();
    if (res.ok) {
      output.textContent = JSON.stringify(data.rows, null, 2);
    } else {
      output.textContent = 'Error: ' + data.error;
    }
  } catch (err) {
    output.textContent = 'Error de conexión con el servidor.';
  }
}
