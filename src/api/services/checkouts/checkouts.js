import { stripe } from '../../lib'

export const checkout = async ({cart}) => {
  const { url, id } = await createStripeCheckoutSession(cart)
 
  // api side redirect to Stripe Checkout (SUGGESTED APPROACH)
  // this approach is probably best put in a serverless function
  // await redirectToStripeCheckout(url)

  return {
    id,
    sessionUrl: url
  }; 
}


export const createStripeCheckoutSession = async (cart) => {
  const line_items = cart.map(product => ({
    price: product.id,
    quantity: product.quantity
  }))

  // TODO: Pass custom payload
  const session = await stripe.checkout.sessions.create({
    // See https://stripe.com/docs/payments/checkout/custom-success-page#modify-success-url.
    success_url: `http://localhost:8910/success?sessionId={CHECKOUT_SESSION_ID}`,
    cancel_url: `http://localhost:8910/failure`,
    // eslint-disable-next-line camelcase
    line_items: line_items,
    mode: 'payment',
    payment_method_types: ['card']
  })
  
  return session
}

export const redirectToStripeCheckout = async url => {
  // probably best this logic lives in an serverless function
}