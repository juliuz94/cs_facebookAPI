require("dotenv").config();
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors')

const indexRouter = require('./routes/index');
const cartRouter = require('./routes/cart');
const purchaseRouter = require('./routes/purchase')
const contentViewRouter = require('./routes/contentView')
const initiateCheckoutRouter = require('./routes/initiateCheckout')
const leadRouter = require('./routes/lead')

const app = express();
const port = process.env.PORT || 3000;

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors({ origin: '*'}))
app.use(express.static(path.join(__dirname, 'public')));

// app.use('/', indexRouter);

app.post('/test', (req, res) => {
  console.log(req.body)
  res.status(200)
})

app.use('/cart', cartRouter);
app.use('/purchase', purchaseRouter)
app.use('/lead', leadRouter)
app.use('/initiateCheckout', initiateCheckoutRouter)
app.use('/contentView', contentViewRouter)

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
})
