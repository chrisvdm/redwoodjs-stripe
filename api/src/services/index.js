import {
  checkout,
  createStripeCheckoutSession,
  retrieveStripeCheckoutSession,
} from "./checkouts/checkouts";
import * as stripeItems from "./stripeItems/stripeItems";
import {
  stripeCustomerSearch,
  retrieveStripeCustomer,
  createStripeCustomer,
  searchLatestStripeCustomer,
} from "./customers/customers";
import * as customerPortal from "./customerPortal/customerPortal";
import { listStripeSubscriptions } from "./subscription/subscription";

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

export { listStripeSubscriptions } from "./subscription/subscription";
export {
  checkout,
  retrieveStripeCheckoutSession,
  createStripeCheckoutSession,
} from "./checkouts/checkouts";
export { stripeItem, stripeItems } from "./stripeItems/stripeItems";
export {
  stripeCustomerSearch,
  retrieveStripeCustomer,
  createStripeCustomer,
  searchLatestStripeCustomer,
} from "./customers/customers";
export {
  createStripeCustomerPortalSession,
  createStripeCustomerPortalConfig,
  listStripeCustomerPortalConfig,
} from "./customerPortal/customerPortal";
