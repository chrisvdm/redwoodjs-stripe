import { handleStripeWebhooks } from '@redwoodjs-stripe/api'

/**
 * The handler function is your code that processes http request events.
 * You can use return and throw to send a response or error, respectively.
 *
 * Important: When deployed, a custom serverless function is an open API endpoint and
 * is your responsibility to secure appropriately.
 *
 * @see {@link https://redwoodjs.com/docs/serverless-functions#security-considerations|Serverless Function Considerations}
 * in the RedwoodJS documentation for more information.
 *
 * @typedef { import('aws-lambda').APIGatewayEvent } APIGatewayEvent
 * @typedef { import('aws-lambda').Context } Context
 * @param { APIGatewayEvent } event - an object which contains information from the invoker.
 * @param { Context } context - contains information about the invocation,
 * function, and execution environment.
 */
export const handler = async (event, context) => {
  // The Stripe documentation recommends making any calls to the db for syncing inside webhooks.
  // It's a good practice to save Stripe webhook events to your db as Stripe only stores events for 30 days.
  const { results } = await handleStripeWebhooks(
    event,
    context,
    {
      'checkout.session.completed': (e) => e.type,
      'checkout.session.async_payment_succeeded': (e) => e.type,
      'checkout.session.async_payment_failed': (e) => e.type,
      'customer.updated': async (e) => {
        console.log('customer.updated:', e)
        // Add a service here that updates your user in your db to reflect changes made via Stripe.
      },
      'payment_intent.succeeded': async (e) => {
        console.log(e)
      },
    },
    false // Toggles "secure" mode. When "true" handler uses STRIPE_WEBHOOK_KEY to verify event origin.
  )

  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      data: results,
    }),
  }
}
