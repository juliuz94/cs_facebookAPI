var express = require('express');
var router = express.Router();
const initiateCheckout = require('../controllers/initiateCheckout.js')

router.post('/', initiateCheckout)

module.exports = router;
