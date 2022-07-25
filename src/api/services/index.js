import * as checkouts from './checkouts/checkouts'
import * as products from './products/products'
import * as customers from './customers/customers'

// shape services object
export const stripeServices = {
    checkouts_checkouts: checkouts,
    customers_customers: customers,
    products_products: products
}

export { productByPrice } from './products/products'
export { stripeCustomerSearch } from './customers/customers'