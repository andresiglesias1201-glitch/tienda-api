const express = require('express');
const router = express.Router();
const { getInventario } = require('../controllers/inventoryController');

router.get('/', getInventario);

module.exports = router;