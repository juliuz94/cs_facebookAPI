const axios = require('axios')
const createHash = require('../utils/hashGenerator')
const getTimeStamp = require('../utils/timeStamp')

const contentView = async (req, res) => {
  const { body, headers } = req
  
  const clientIP = headers['x-forwarded-for']
  const clientUserAgent = headers['user-agent']
  const eventSourceUrl = headers['origin']
  const { eventID, eventURL, content_type, content_ids } = body

  console.log(eventID)
  
  try {
    const data = {
      "data": [
        {
          "event_name": "ViewContent",
          "event_time": getTimeStamp(),
          "action_source": "website",
          "event_source_url": eventURL,
          "event_id": eventID,
          "user_data": {
            "client_ip_address": clientIP,
            "client_user_agent": clientUserAgent
          },
          "custom_data": {
            "content_type": content_type,
            "content_ids": content_ids
          }
        }
      ]
    }
    
    const postReq = await axios.post( `https://graph.facebook.com/v10.0/${process.env.FACEBOOK_PIXEL_ID}/events?access_token=${process.env.FACEBOOK_ACCESS_TOKEN}`, data)
    console.log('content view event response => ', postReq)
    
    res.status(201).end()

  } catch (error) {
    res.status(500).send('Something went wrong')
  }
}

module.exports = contentView