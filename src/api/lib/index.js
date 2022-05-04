
import Stripe from 'stripe'

export const stripe = new Stripe(process.env.STRIPE_SK)

export const handleStripeWebhooks = (event, context, webhooksObj) => {
  let stripeEvent
  try {
    const sig = event.headers['stripe-signature']
    stripeEvent = stripe.webhooks.constructEvent(
      event.body,
      sig,
      process.env.STRIPE_WEBHOOK_SK
    )

    let results = null
    if (typeof webhooksObj[stripeEvent.type] !== 'undefined') {
      results = webhooksObj[stripeEvent.type](event, context)
    }
    return results
  } catch (error) {
    console.log(error)
    throw error
  }
}

export const checkout = () => {
    console.log("Checkout code will live here one day")
}