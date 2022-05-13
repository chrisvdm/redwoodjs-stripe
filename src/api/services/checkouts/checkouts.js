import { stripe } from '../../lib'

export const checkout = async ({ mode, cart, customerId }, { context }) => {
  // eslint-disable-next-line camelcase
  // const line_items = cart.map((product) => ({
  //   price: product.id,
  //   quantity: product.quantity,
  // }))

  const line_items = [
    {
      price: price_1Kb1YlHMAJHtnk9iwZZxLJjp,
      quantity: 1
    }, {
      price: price_1Kb1YjHMAJHtnk9im9R7zlKO,
      quantity: 2
    }
  ]

  return stripe.checkout.sessions.create({
    // See https://stripe.com/docs/payments/checkout/custom-success-page#modify-success-url.
    success_url: `${context.event.headers.referer}success?sessionId={CHECKOUT_SESSION_ID}`,
    cancel_url: `${context.event.headers.referer}failure`,
    // eslint-disable-next-line camelcase
    line_items,
    mode,
    payment_method_types: ['card'],
    customer: customerId,
  })
}