var express = require('express');
var router = express.Router();
const lead = require('../controllers/lead')

router.post('/', lead)

module.exports = router;
