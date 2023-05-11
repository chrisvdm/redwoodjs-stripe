import * as checkouts from './checkouts.sdl'
import * as stripeItems from './stripeItems.sdl'
import * as customers from './customers.sdl'
import * as coupons from './coupons.sdl'
import * as discounts from './discounts.sdl'
import * as paymentMethods from './paymentMethods.sdl'
import * as subscriptions from './subscription.sdl'
import * as customerPortal from './customerPortal.sdl'

// shape schema object
export const stripeSchemas = {
    checkouts_sdl: checkouts,
    coupons_sdl: coupons,
    customerPortal_sdl: customerPortal,
    customers_sdl: customers,
    discounts_sdl: discounts,
    paymentMethods_sdl: paymentMethods,
    stripeItems_sdl: stripeItems,
    subscriptions_sdl: subscriptions
}
