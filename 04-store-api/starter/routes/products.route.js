const express = require('express');
const router = express.Router();

const { getAllProducts, getAllProductStatic } = require('../controllers/products.controller');

router.get('/',getAllProducts);
router.get('/static',getAllProductStatic);

module.exports = router;