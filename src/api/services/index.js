import { checkout, createStripeCheckoutSession, retrieveStripeCheckoutSession }  from './checkouts/checkouts'
import * as stripeItems from './stripeItems/stripeItems'
import { stripeCustomerSearch, retrieveStripeCustomer, createStripeCustomer, searchLatestStripeCustomer} from './customers/customers'
import * as customerPortal from './customerPortal/customerPortal'

// shape services object
export const stripeServices = {
    checkouts_checkouts: { checkout, createStripeCheckoutSession, retrieveStripeCheckoutSession },
    customers_customers: {
        stripeCustomerSearch, retrieveStripeCustomer, createStripeCustomer, searchLatestStripeCustomer
    },
    customerPortal_customerPortal: customerPortal,
    stripeItems_stripeItems: stripeItems
}

export { checkout,retrieveStripeCheckoutSession, createStripeCheckoutSession } from './checkouts/checkouts'
export { stripeItem, stripeItems } from './stripeItems/stripeItems'
export { stripeCustomerSearch, retrieveStripeCustomer, createStripeCustomer, searchLatestStripeCustomer } from './customers/customers'
export { createStripeCustomerPortalSession, createStripeCustomerPortalConfig, listStripeCustomerPortalConfig } from './customerPortal/customerPortal'