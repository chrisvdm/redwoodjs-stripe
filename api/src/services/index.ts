import {
  checkout,
  retrieveStripeCheckoutSession,
} from "./checkouts/checkouts.js";
import * as stripeItems from "./stripeItems/stripeItems.js";
import {
  stripeCustomerSearch,
  retrieveStripeCustomer,
  createStripeCustomer,
} from "./customers/customers.js";
import * as customerPortal from "./customerPortal/customerPortal.js";
import { listStripeSubscriptions } from "./subscription/subscription.js";

// shape services object
export const stripeServices = {
  checkouts_checkouts: {
    checkout,
    retrieveStripeCheckoutSession,
  },
  customers_customers: {
    stripeCustomerSearch,
    retrieveStripeCustomer,
    createStripeCustomer,
  },
  subscriptions_subscription: { listStripeSubscriptions },
  customerPortal_customerPortal: customerPortal,
  stripeItems_stripeItems: stripeItems,
};

export { listStripeSubscriptions } from "./subscription/subscription.js";
export {
  checkout,
  retrieveStripeCheckoutSession,
} from "./checkouts/checkouts.js";
export { stripeItem, stripeItems } from "./stripeItems/stripeItems.js";
export {
  stripeCustomerSearch,
  retrieveStripeCustomer,
  createStripeCustomer,
} from "./customers/customers.js";
export {
  createStripeCustomerPortalSession,
  createStripeCustomerPortalConfig,
  listStripeCustomerPortalConfig,
} from "./customerPortal/customerPortal.js";
