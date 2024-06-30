import {
  checkout,
  createStripeCheckoutSession,
  retrieveStripeCheckoutSession,
} from "./checkouts/checkouts.js";
import * as stripeItems from "./stripeItems/stripeItems.js";
import {
  stripeCustomerSearch,
  retrieveStripeCustomer,
  createStripeCustomer,
  searchLatestStripeCustomer,
} from "./customers/customers.js";
import * as customerPortal from "./customerPortal/customerPortal.js";
import { listStripeSubscriptions } from "./subscription/subscription.js";

// shape services object
export const stripeServices = {
  checkouts_checkouts: {
    checkout,
    createStripeCheckoutSession,
    retrieveStripeCheckoutSession,
  },
  customers_customers: {
    stripeCustomerSearch,
    retrieveStripeCustomer,
    createStripeCustomer,
    searchLatestStripeCustomer,
  },
  subscriptions_subscription: { listStripeSubscriptions },
  customerPortal_customerPortal: customerPortal,
  stripeItems_stripeItems: stripeItems,
};

export { listStripeSubscriptions } from "./subscription/subscription.js";
export {
  checkout,
  retrieveStripeCheckoutSession,
  createStripeCheckoutSession,
} from "./checkouts/checkouts.js";
export { stripeItem, stripeItems } from "./stripeItems/stripeItems.js";
export {
  stripeCustomerSearch,
  retrieveStripeCustomer,
  createStripeCustomer,
  searchLatestStripeCustomer,
} from "./customers/customers.js";
export {
  createStripeCustomerPortalSession,
  createStripeCustomerPortalConfig,
  listStripeCustomerPortalConfig,
} from "./customerPortal/customerPortal.js";
