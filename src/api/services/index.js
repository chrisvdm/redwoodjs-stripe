import * as checkouts from './checkouts/checkouts'
import * as products from './products/products'

// shape services object
export const stripeServices = {
    checkouts_checkouts: checkouts,
    products_products: products
}

export { productByPrice } from './products/products'