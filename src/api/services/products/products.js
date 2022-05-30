import { logger } from '../../../web/lib'
import { stripe } from '../../lib'

export const products = async ({ type = 'one_time' }) => {
  // Get a list of active products
  const products = await stripe.products.list({
    active: true,
  })

  const itemList = []
  for (const product of products.data) {
    // Get a list of prices relating to product
    const prices = await stripe.prices.list({
      type: type,
      product: product.id,
    })

    const price = prices.data[0]

    // ignore prices with the "wrong" type
    if (typeof price !== 'undefined') {
      itemList.push({
        id: price.id,
        name: product.name,
        description: product.description,
        image: product.images[0],
        price: price.unit_amount,
        type: price.type,
      })
    }
  }

  return itemList
}
