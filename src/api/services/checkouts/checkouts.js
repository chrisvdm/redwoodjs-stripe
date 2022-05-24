import { stripe } from '../../lib'

export const checkout = async () => {
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

  console.log('sup there')

  return stripe.checkout.sessions.create({
    // See https://stripe.com/docs/payments/checkout/custom-success-page#modify-success-url.
    success_url: `http://localhost:8910/success?sessionId={CHECKOUT_SESSION_ID}`,
    cancel_url: `http://localhost:8910/failure`,
    // eslint-disable-next-line camelcase
    line_items,
    mode: 'payment',
    payment_method_types: ['card']
  })
}