import * as checkouts from './checkouts/checkouts'
import * as products from './products/products'
import * as customers from './customers/customers'
import * as customerPortal from './customerPortal/customerPortal'

// shape services object
export const stripeServices = {
    checkouts_checkouts: checkouts,
    customers_customers: customers,
    customerPortal_customerPortal: customerPortal,
    products_products: products
}

export { productByPrice } from './products/products'
export { stripeCustomerSearch } from './customers/customers'
export { createStripeCustomerPortalSession, configureStripeCustomerPortal } from './customerPortal/customerPortal'