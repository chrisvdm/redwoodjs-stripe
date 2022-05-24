import { logger } from '../../../web/lib'
import { stripe } from '../../lib'

export const checkout = async () => {
  
  const line_items = [
    {
      price: "price_1Kb1YlHMAJHtnk9iwZZxLJjp",
      quantity: 1
    }, {
      price: "price_1Kb1YjHMAJHtnk9im9R7zlKO",
      quantity: 2
    }
  ]

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