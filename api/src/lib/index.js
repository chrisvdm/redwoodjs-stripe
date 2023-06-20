import { mockHttpEvent } from '@redwoodjs/testing/api'

import Stripe from 'stripe'

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  appInfo: {
    name: 'redwoodjs-stripe',
    url: 'https://github.com/chrisvdm/redwoodjs-stripe'
  }
})

export const lastEntry = (array) => {
  const latest = array.sort((first, next) => {
    const firstDate = new Date(0)
    firstDate.setUTCSeconds(first.created)
    const nextDate = new Date(0)
    nextDate.setUTCSeconds(next.created)
    return firstDate - nextDate
  })
  return latest[latest.length-1]
}

export const handleStripeWebhooks = (event, context, webhooksObj = {}, secure = true) => {
  if (secure) {
    const endpointSecret = process.env.STRIPE_WEBHOOK_KEY
    try {
      const sig = event.headers['stripe-signature']
      const stripeEvent = stripe.webhooks.constructEvent(
        event.body,
        sig,
        endpointSecret
      )

      // Find event type in webhookObject
      if (typeof webhooksObj[stripeEvent.type] !== 'undefined') {
        // execute function for the event
        webhooksObj[stripeEvent.type](stripeEvent, context)
      }

      return {
        statusCode: 200,
        results: stripeEvent
      }
    } catch (error) {
      throw error
    }
  } else { 
    try {
      const unVerifiedStripeEvent = JSON.parse(event.body)
      if (typeof webhooksObj[unVerifiedStripeEvent.type] !== 'undefined') {
          webhooksObj[unVerifiedStripeEvent.type](unVerifiedStripeEvent, context)
      }

      return {
        statusCode: 200,
        results: unVerifiedStripeEvent
      }
    } catch (error) {
      throw error
    }
  }
}

// Generates a test Stripe mock event
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

  /**
   * @see {@link https://github.com/stripe/stripe-node/blob/master/README.md#testing-webhook-signing}
   */
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