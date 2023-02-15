import { stripe } from '../../lib'

export const stripeItems = async ({ params = { productParams: {}, priceParams: {} } }) => {
  
  const { productParams = {}, priceParams = {} } = params
  
  const products = await stripe.products.list(productParams)

  // Get a list of prices relating to product
  const itemList = []
  for (const product of products.data) {
    const prices = await stripe.prices.list({
      product: product.id,
      ...priceParams
    })

    const price = prices.data[0]

    // ignore prices with the "wrong" type
    if (typeof price !== 'undefined') {
      itemList.push({
        id: price.id,
        name: product.name,
        description: product.description,
        images: product.images,
        price: price.unit_amount,
        type: price.type,
      })
    }
  }

  return itemList
}

export const stripeItem = async ({ id }) => {
  const price = await stripe.prices.retrieve(id.toString())

  const product = await stripe.products.retrieve(price.product)
  return {
        id: price.id,
        name: product.name,
        description: product.description,
        images: product.images,
        price: price.unit_amount,
        type: price.type,
      }
}