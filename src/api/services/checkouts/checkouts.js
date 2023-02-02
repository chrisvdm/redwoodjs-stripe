import { stripe } from '../../lib'

export const checkout = async (payload) => {
  const { url, id } = await createStripeCheckoutSession(payload)
 
  // api side redirect to Stripe Checkout (SUGGESTED APPROACH)
  // this approach is probably best put in a serverless function
  // await redirectToStripeCheckout(url)

  return {
    id,
    url
  }; 
}


export const createStripeCheckoutSession = async ({
  customer = {},
  mode,
  cart,
  successUrl = "http://localhost:8910/stripe-demo?success=true&sessionId={CHECKOUT_SESSION_ID}",
  cancelUrl = "http://localhost:8910/stripe-demo?success=false" }) => {

  const line_items = cart.map(product => ({
    price: product.id,
    quantity: product.quantity
  }))


  // Build payload
  // TODO: Custom payload
  // See https://stripe.com/docs/payments/checkout/custom-success-page#modify-success-url.
  const payload = {
    success_url: successUrl,
    cancel_url: cancelUrl,
    // eslint-disable-next-line camelcase
    line_items: line_items,
    mode: mode,
    payment_method_types: ['card'],
    ... (Object.hasOwn(customer, "id") && { customer: customer.id })
  }

  const session = await stripe.checkout.sessions.create(payload)
  return session
}

export const redirectToStripeCheckout = async url => {
  // probably best this logic lives in an serverless function
}

export const retrieveStripeCheckoutSession = async ({ id }) => {
  const session = await stripe.checkout.sessions.retrieve(id)
  return session
}