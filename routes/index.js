var express = require('express');
var router = express.Router();

router.get('/', (req, res) => {
  console.log('hi')
  res.status(200).send({data: 'todo good'})
})

/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'What is up' });
// });



module.exports = router;
