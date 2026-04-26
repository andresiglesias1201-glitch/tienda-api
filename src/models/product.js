const pool = require('../config/database');

class Product {
  static async findAll() {
    const [rows] = await pool.query('SELECT * FROM products');
    return rows;
  }

  static async findById(id) {
    const [rows] = await pool.query(
      'SELECT * FROM products WHERE id = ?', [id]
    );
    return rows[0];
  }

  static async create(data) {
    const { nombre, precio, categoria, stock } = data;
    const [result] = await pool.query(
      `INSERT INTO products (nombre, precio, categoria, stock)
       VALUES (?, ?, ?, ?)`,
      [nombre, precio, categoria, stock]
    );
    return this.findById(result.insertId);
  }

  static async update(id, data) {
    const { nombre, precio, categoria, stock } = data;
    await pool.query(
      `UPDATE products SET
       nombre=?, precio=?, categoria=?, stock=?
       WHERE id = ?`,
      [nombre, precio, categoria, stock, id]
    );
    return this.findById(id);
  }

  static async delete(id) {
    const [result] = await pool.query(
      'DELETE FROM products WHERE id = ?', [id]
    );
    return result.affectedRows > 0;
  }

  static async totalInventario() {
    const [rows] = await pool.query(
      'SELECT SUM(precio * stock) as total FROM products'
    );
    return rows[0].total || 0;
  }
}

module.exports = Product;