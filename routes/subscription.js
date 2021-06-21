const express = require('express');
const router = express.Router()

const newSubscription = require('../controllers/subscription')

router.post('/', newSubscription);

module.exports = router;