import { mockHttpEvent } from '@redwoodjs/testing/api'

import Stripe from 'stripe'

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  appInfo: {
    name: 'redwoodjs-stripe',
    url: 'https://github.com/chrisvdm/redwoodjs-stripe'
  }
})

import { createLogger } from '@redwoodjs/api/logger'
export const logger = createLogger({})

export const prettyList = (obj) => {
  if (obj && obj !== undefined && obj && !Array.isArray(obj)) {
    Object.keys(obj).forEach(i => {
      if (obj[i]?.object === 'list') {
        obj[i] = obj[i].data
      }
    })
  }
  return obj
}

export const lastEntry = (array) => {
  const latest = array.sort((first, next) => {
    const firstDate = new Date(0)
    firstDate.setUTCSeconds(first.created)
    const nextDate = new Date(0)
    nextDate.setUTCSeconds(next.created)
    return firstDate - nextDate
  })

  return latest[latest.length - 1]
}

export const handleStripeWebhooks = async (event, context, webhooksObj = {}, secure = true) => {

  // For Vercel deploys, events are based64 encoded
    const parsedBody = req.isBase64Encoded
    ? Buffer.from(req.body, 'base64').toString('utf-8')
      : req.body;
  
  
  if (secure) {
    const endpointSecret = process.env.STRIPE_WEBHOOK_KEY

    if (!endpointSecret) {
      throw new Error(`The Stripe webhook secret key isn't set`)
    }

    try {
      const signature = event.headers['stripe-signature']

      const stripeEvent = stripe.webhooks.constructEvent(
        event.body,
        signature,
        endpointSecret
      )

      // Find event type in webhookObject and execute function for the event.
      if (typeof webhooksObj[stripeEvent.type] !== 'undefined') {
        await webhooksObj[stripeEvent.type](stripeEvent, context)
      }

      return {
        statusCode: 200,
        results: stripeEvent
      }
    } catch (error) {
      throw error
    }
  } else {
    if (process.env.NODE_ENV === 'production') {
      throw new Error('Stripe webhooks must be secure in production')
    }

    try {
      const unverifiedStripeEvent = JSON.parse(event.body)
      console.log(event.body)

      if (typeof webhooksObj[unverifiedStripeEvent.type] !== 'undefined') {
        await webhooksObj[unverifiedStripeEvent.type](unverifiedStripeEvent, context)
      }

      return {
        statusCode: 200,
        results: unverifiedStripeEvent
      }
    } catch (error) {
      throw error
    }
  }
}

// Generates a test Stripe mock event.
export const generateStripeMockEvent = () => {
  const payload = JSON.stringify(
    {
      id: 'evt_test_webhook',
      object: 'event',
    },
    null,
    2
  )

  process.env.STRIPE_WEBHOOK_SK = 'whsec_test_secret'

  // See https://github.com/stripe/stripe-node/blob/master/README.md#testing-webhook-signing.
  const header = stripe.webhooks.generateTestHeaderString({
    payload,
    secret: process.env.STRIPE_WEBHOOK_SK,
  })

  const httpEvent = mockHttpEvent({
    body: payload,
    headers: {
      'stripe-signature': header,
    },
  })

  return httpEvent
}