import { logger } from '../../../web/lib'
import { stripe } from '../../lib'

export const checkout = async () => {
  const { url, id } = await createStripeCheckoutSession()
 
  // api side redirect to Stripe Checkout (SUGGESTED APPROACH)
  // this approach is probably best put in a serverless function
  // await redirectToStripeCheckout(url)

  return {
    id,
    sessionUrl: url
  }; 
}


export const createStripeCheckoutSession = async () => {
  // TODO: Find way to get cart items server-side
    const line_items = [
    {
      price: "price_1Kb1YlHMAJHtnk9iwZZxLJjp",
      quantity: 1
    }, {
      price: "price_1Kb1YjHMAJHtnk9im9R7zlKO",
      quantity: 2
    }
  ]

  // TODO: Pass custom payload
  const session = await stripe.checkout.sessions.create({
    // See https://stripe.com/docs/payments/checkout/custom-success-page#modify-success-url.
    success_url: `http://localhost:8910/success?sessionId={CHECKOUT_SESSION_ID}`,
    cancel_url: `http://localhost:8910/failure`,
    // eslint-disable-next-line camelcase
    line_items,
    mode: 'payment',
    payment_method_types: ['card']
  })
  
  return session
}

export const redirectToStripeCheckout = async url => {
  // probably best this logic lives in an serverless function
}