const Product = require('../models/Product');

const getAll = async (req, res) => {
  try {
    const products = await Product.findAll();
    res.json({ success: true, data: products });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

const getById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product)
      return res.status(404).json({ success: false, message: 'Producto no encontrado' });
    res.json({ success: true, data: product });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

const create = async (req, res) => {
  try {
    const required = ['nombre', 'precio', 'categoria', 'stock'];
    for (const field of required) {
      if (req.body[field] === undefined)
        return res.status(400).json({ success: false, message: `El campo '${field}' es requerido` });
    }
    const product = await Product.create(req.body);
    res.status(201).json({ success: true, data: product });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

const update = async (req, res) => {
  try {
    const exists = await Product.findById(req.params.id);
    if (!exists)
      return res.status(404).json({ success: false, message: 'Producto no encontrado' });
    const product = await Product.update(req.params.id, req.body);
    res.json({ success: true, data: product });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

const remove = async (req, res) => {
  try {
    const deleted = await Product.delete(req.params.id);
    if (!deleted)
      return res.status(404).json({ success: false, message: 'Producto no encontrado' });
    res.json({ success: true, message: 'Producto eliminado correctamente' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

module.exports = { getAll, getById, create, update, remove };