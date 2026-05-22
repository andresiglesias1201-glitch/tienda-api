const express = require('express');
const router = express.Router();
const { getInventario } = require('../controllers/inventorycontroller');
router.get('/', getInventario);

module.exports = router;