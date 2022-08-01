import { mockHttpEvent } from '@redwoodjs/testing/api'

import { stripe } from 'src/lib/stripe'

import { handler } from './stripeWebhook'

describe('stripeWebhooks function', () => {
  it('Should respond with 200', async () => {
    /**
     * Copied from Stripe's tests: {@link https://github.com/stripe/stripe-node/blob/master/test/Webhook.spec.js#L8-L12}
     */
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

    const response = await handler(httpEvent, null)

    expect(response.statusCode).toBe(200)
  })
})
