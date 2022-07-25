import * as checkouts from './checkouts.sdl'
import * as products from './products.sdl'
import * as customers from './customers.sdl'
import * as coupons from './coupons.sdl'
import * as discounts from './discounts.sdl'
import * as paymentMethods from './paymentMethods.sdl'
import * as subscriptions from './subscription.sdl'

// shape schema object
export const stripeSchemas = {
    checkouts_sdl: checkouts,
    products_sdl: products,
    customers_sdl: customers,
    coupons_sdl: coupons,
    discounts_sdl: discounts,
    paymentMethods_sdl: paymentMethods,
    subscriptions_sdl: subscriptions
}
