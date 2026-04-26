const Product = require('../models/Product');

const getInventario = async (req, res) => {
  try {
    const products = await Product.findAll();
    const total = await Product.totalInventario();

    const resumen = products.map(p => ({
      id: p.id,
      nombre: p.nombre,
      categoria: p.categoria,
      stock: p.stock,
      precio: p.precio,
      valor_total: p.precio * p.stock
    }));

    res.json({
      success: true,
      total_productos: products.length,
      valor_total_inventario: total,
      detalle: resumen
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

module.exports = { getInventario };