const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  console.log('hi')
  res.status(200).send({data: 'todo good'})
})

module.exports = router