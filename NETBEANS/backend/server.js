const express = require('express');
const authRoutes = require('./routes/authRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use('/api/auth', authRoutes);

app.listen(PORT, () => {
  console.log(`==================================================`);
  console.log(`Servidor API REST ejecutándose en http://localhost:${PORT}`);
  console.log(`Endpoints disponibles:`);
  console.log(` - POST http://localhost:${PORT}/api/auth/register`);
  console.log(` - POST http://localhost:${PORT}/api/auth/login`);
  console.log(`==================================================`);
});

