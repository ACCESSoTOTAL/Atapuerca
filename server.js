require('dotenv').config();
const express = require('express');
const sql = require('mssql');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

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

app.post('/query', async (req, res) => {
  const { query } = req.body;
  if (!/^select\s/i.test(query.trim())) {
    return res.status(400).json({ error: 'Solo se permiten consultas SELECT.' });
  }
  try {
    const pool = await sql.connect(config);
    const result = await pool.request().query(query);
    res.json({ rows: result.recordset });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});