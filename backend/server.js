require('dotenv').config();
const express = require('express');
const sql = require('mssql');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3000;

// Validar variables de entorno
const requiredEnvVars = ['SQL_USER', 'SQL_PASSWORD', 'SQL_SERVER', 'SQL_DATABASE'];
const missingEnvVars = requiredEnvVars.filter(varName => !process.env[varName]);

if (missingEnvVars.length > 0) {
  console.error('Variables de entorno faltantes:', missingEnvVars);
  process.exit(1);
}

app.use(cors());
app.use(express.json());

const config = {
  user: process.env.SQL_USER,
  password: process.env.SQL_PASSWORD,
  server: process.env.SQL_SERVER,
  database: process.env.SQL_DATABASE,
  options: {
    encrypt: true,
    trustServerCertificate: true
  }
};

// Endpoint de prueba
app.get('/', (req, res) => {
  res.json({ message: 'Atapuerca Backend funcionando', status: 'OK' });
});

app.post('/query', async (req, res) => {
  const { query } = req.body;
  
  if (!query) {
    return res.status(400).json({ error: 'Se requiere una consulta SQL.' });
  }
  
  if (!/^select\s/i.test(query.trim())) {
    return res.status(400).json({ error: 'Solo se permiten consultas SELECT.' });
  }
  
  try {
    const pool = await sql.connect(config);
    const result = await pool.request().query(query);
    await pool.close();
    res.json({ rows: result.recordset });
  } catch (err) {
    console.error('Error en consulta SQL:', err);
    res.status(500).json({ error: err.message });
  }
});

app.listen(port, () => {
  console.log(`Servidor escuchando en puerto ${port}`);
});