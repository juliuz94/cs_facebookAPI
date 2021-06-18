const express = require('express');
const router = express.Router();
const addToCart = require('../controllers/addToCart')

router.post('/', addToCart);

module.exports = router;


