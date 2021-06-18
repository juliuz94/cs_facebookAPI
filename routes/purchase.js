const express = require('express');
const router = express.Router()

const newPurchase = require('../controllers/purchase')

router.post('/', newPurchase);

module.exports = router;