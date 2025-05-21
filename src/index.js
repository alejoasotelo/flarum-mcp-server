const express = require('express');
const app = express();
const port = 3000;

// Middleware para JSON
app.use(express.json());

// Endpoint básico de prueba
app.get('/', (req, res) => {
  res.json({ status: "ok", message: "flarum-mcp-server running!" });
});

// TODO: aquí puedes agregar rutas para integrar IA y Flarum

app.listen(port, () => {
  console.log(`flarum-mcp-server escuchando en http://localhost:${port}`);
});