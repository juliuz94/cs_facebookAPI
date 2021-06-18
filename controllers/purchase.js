const axios = require('axios')
const createHash = require('../utils/hashGenerator')
const getTimeStamp = require('../utils/timeStamp')

const newPurchase = async (req, res) => {
  const { headers, body } = req

  const clientIP = headers['x-forwarded-for']
  const clientUserAgent = headers['user-agent']
  const sourceUrl = headers['x-wc-webhook-source']

  const { billing: { billing_nombre1, billing_apellido1, company, email, city, phone, country }, customer_ip_address, customer_user_agent, line_items, currency } = body

  let firstName = billing_nombre1 === '' ? company : billing_nombre1
  
  const productIds = line_items.map(product => product.product_id)
  const totalPrice = line_items.map(product => product.price).reduce((a, b) => a + b, 0)

  const data = {
    "data": [
      {
        "event_name": "Purchase",
        "event_time": getTimeStamp(),
        "action_source": "website",
        "event_source_url": sourceUrl,
        "user_data": {
          "client_ip_address": customer_ip_address,
          "client_user_agent": customer_user_agent,
          "fn": createHash(firstName),
          "ln": createHash(billing_apellido1),
          "em": createHash(email),
          "country": createHash(country)
        },
        "custom_data": {
          "currency": currency,
          "value": totalPrice,
          "content_ids": productIds,
          "content_type": 'product_group',
          "content": line_items
        }
      }
    ]
  }

  try {

    const postReq = await axios.post( `https://graph.facebook.com/v10.0/${process.env.FACEBOOK_PIXEL_ID}/events?access_token=${process.env.FACEBOOK_ACCESS_TOKEN}`, data )
    console.log(postReq.data)
    res.status(201).end()

  } catch (error) {

    console.log(error)
    res.status(500).end()

  }

}

module.exports = newPurchase

