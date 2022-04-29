const express = require('express');
const router = express.Router();

const products = require('./products');
const checkout = require('./checkout');
const db = require('./db');

router.use('/products', products);
router.use('/checkout', checkout);
router.use('/db', db);

module.exports = router;