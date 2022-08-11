import * as checkouts from './checkouts/checkouts'
import * as stripeItems from './stripeItems/stripeItems'
import * as customers from './customers/customers'
import * as customerPortal from './customerPortal/customerPortal'

// shape services object
export const stripeServices = {
    checkouts_checkouts: checkouts,
    customers_customers: customers,
    customerPortal_customerPortal: customerPortal,
    stripeItems_stripeItems: stripeItems
}

export { stripeItem, stripeItems } from './stripeItems/stripeItems'
export { stripeCustomerSearch, createStripeCustomer, searchLatestStripeCustomer } from './customers/customers'
export { createStripeCustomerPortalSession, createStripeCustomerPortalConfig, listStripeCustomerPortalConfig } from './customerPortal/customerPortal'