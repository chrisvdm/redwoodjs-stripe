import * as checkouts from "./checkouts.sdl.js";
import * as stripeItems from "./stripeItems.sdl.js";
import * as customers from "./customers.sdl.js";
import * as coupons from "./coupons.sdl.js";
import * as discounts from "./discounts.sdl.js";
import * as paymentMethods from "./paymentMethods.sdl.js";
import * as subscriptions from "./subscription.sdl.js";
import * as customerPortal from "./customerPortal.sdl.js";

// shape schema object
export const stripeSchemas = {
  checkouts_sdl: checkouts,
  coupons_sdl: coupons,
  customerPortal_sdl: customerPortal,
  customers_sdl: customers,
  discounts_sdl: discounts,
  paymentMethods_sdl: paymentMethods,
  stripeItems_sdl: stripeItems,
  subscriptions_sdl: subscriptions,
};
