import { handleStripeWebhooks } from 'redwoodjs-stripe/api'

// import { handleDBSync } from 'src/services/users'

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

/*
 * Stripe documentation recommends making any calls to db for syncing inside of webhooks
 */
export const handler = async (event, context) => {
  // Create services to handle webhooks
  const { results } = await handleStripeWebhooks(event, context, {
    'checkout.session.completed': (e) => e.type,
    'checkout.session.async_payment_succeeded': (e) => e.type,
    'checkout.session.async_payment_failed': (e) => e.type,
    'customer.updated': async (e) => {
      console.log(e)
      // Insert a service here that updates your user
    },
    'payment_intent.succeeded': async (e) => {
      console.log(e)
    },
  })

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
