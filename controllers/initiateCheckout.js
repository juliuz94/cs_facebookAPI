const axios = require('axios')
const createHash = require('../utils/hashGenerator')
const getTimeStamp = require('../utils/timeStamp')

const initiateCheckout = async (req, res) => {
  const { body, headers } = req

  const clientIP = headers['x-forwarded-for']
  const clientUserAgent = headers['user-agent']
  const eventSourceUrl = headers['origin']
  const { currency, value, content_type, eventID, eventUrl, first_name, last_name, billing_company, billing_phone, billing_email } = body

  let firstName = first_name === '' ? billing_company : first_name

  console.log(body)

  res.status(200).send('worked')

  try {
    const data = {
      "data": [
        {
          "event_name": "InitiateCheckout",
          "event_time": getTimeStamp(),
          "action_source": "website",
          "event_source_url": eventUrl,
          "event_id": eventID,
          "user_data": {
            "client_ip_address": clientIP,
            "client_user_agent": clientUserAgent,
            "fn": createHash(firstName),
            "ln": createHash(last_name),
            "em": createHash(billing_email),
            "ph": createHash(billing_phone)
          },
          "custom_data": {
            "currency": currency,
            "value": value,
            content_type
          }
        }
      ]
    }

    const postReq = await axios.post(`https://graph.facebook.com/v10.0/${process.env.FACEBOOK_PIXEL_ID}/events?access_token=${process.env.FACEBOOK_ACCESS_TOKEN}`, data)
    console.log(postReq.data)
    res.status(201).end()

  } catch (error) {
    res.status(500).send('Something went wrong')
  }
}

module.exports = initiateCheckout




