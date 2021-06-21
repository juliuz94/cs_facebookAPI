const axios = require('axios')
const createHash = require('../utils/hashGenerator')
const getTimeStamp = require('../utils/timeStamp')

const newSubscription = async (req, res) => {
  const { headers, body } = req

  const clientIP = headers['x-forwarded-for']
  const clientUserAgent = headers['user-agent']
  const sourceUrl = headers['x-wc-webhook-source']

  const { billing, customer_ip_address, customer_user_agent, line_items, currency } = body

  if (billing === 'undefined' || line_items === 'undefined') {
    res.status(200).end()
    
  } else {
    const productIds = line_items.map(product => product.product_id)
    const productNames = line_items.map(product => product.name)
    const totalPrice = line_items.map(product => product.price).reduce((a, b) => a + b, 0)
    const subscriptionProducts = ['Suscripción gratuita', 'Suscripción Plata', 'Suscripción ORO', 'PACK ORO (Suscripción ORO + XVI Congreso Nacional de Salud)']

    const data = {
      "data": [
        {
          "event_name": "Subscribe",
          "event_time": getTimeStamp(),
          "action_source": "website",
          "event_source_url": sourceUrl,
          "user_data": {
            "client_ip_address": customer_ip_address,
            "client_user_agent": customer_user_agent,
            "fn": createHash(billing.first_name),
            "ln": createHash(billing.last_name),
            "em": createHash(billing.email),
            "country": createHash(billing.country)
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

    if (productNames.some(r => subscriptionProducts.indexOf(r) >= 0)) {
      try {

        const postReq = await axios.post(`https://graph.facebook.com/v10.0/${process.env.FACEBOOK_PIXEL_ID}/events?access_token=${process.env.FACEBOOK_ACCESS_TOKEN}`, data)
        console.log(postReq.data)
        res.status(201).end()
  
      } catch (error) {
  
        console.log('ERROR =>', error)
        console.log('ERROR STACK =>', error.stack)
        res.status(500).end()
  
      }
    } else {
      console.log('no hay suscripciones')
      res.status(200).end()
    }

  }

}

module.exports = newSubscription

