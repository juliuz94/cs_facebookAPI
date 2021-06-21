const express = require('express');
const router = express.Router();
const contentView = require('../controllers/contentView')

router.post('/', contentView)

module.exports = router