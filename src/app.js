const express = require('express');
require('dotenv').config();

const productRoutes = require('./routes/productroutes');
const inventoryRoutes = require('./routes/inventoryroutes');

const app = express();
app.use(express.json());

app.use('/api/products', productRoutes);
app.use('/api/inventory', inventoryRoutes);

app.get('/', (req, res) => {
  res.json({ message: 'Tienda API funcionando ✅', version: '1.0' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});