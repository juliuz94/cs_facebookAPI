const axios = require('axios')
const createHash = require('../utils/hashGenerator')
const getTimeStamp = require('../utils/timeStamp')

const lead = async (req, res) => {
  const { body, headers } = req
  
  const clientIP = headers['x-forwarded-for']
  const clientUserAgent = headers['user-agent']
  const eventSourceUrl = headers['origin']
  const { eventID, eventURL, external_id } = body
  console.log(body)
  console.log('ext id => ', external_id)

  try {
    const data = {
      "data": [
        {
          "event_name": "Lead",
          "event_time": getTimeStamp(),
          "action_source": "website",
          "event_source_url": eventSourceUrl,
          "event_id": eventID,
          "user_data": {
            "client_ip_address": clientIP,
            "client_user_agent": clientUserAgent
          }
        }
      ]
    }
    
    const postReq = await axios.post( `https://graph.facebook.com/v10.0/${process.env.FACEBOOK_PIXEL_ID}/events?access_token=${process.env.FACEBOOK_ACCESS_TOKEN}`, data )
    console.log(postReq.data)
    
    res.status(201).end()

  } catch (error) {
    console.log(error)
    console.log(error.stack)
    res.status(500).send('Something went wrong')
  }
}

module.exports = lead




