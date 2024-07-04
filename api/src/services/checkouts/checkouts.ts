import type {
  MutationCheckoutArgs,
  QueryRetrieveStripeCheckoutSessionArgs,
} from "../../generated/graphql.js";
import { deepOmitNils } from "../../lib/deepOmitNils.js";
import { stripe } from "../../lib/stripe.js";

export const checkout = async ({
  customer,
  mode,
  cart,
  successUrl = "http://localhost:8910/stripe-demo?success=true&sessionId={CHECKOUT_SESSION_ID}",
  cancelUrl = "http://localhost:8910/stripe-demo?success=false",
  allowPromotionCodes = false,
}: MutationCheckoutArgs) => {
  // api side redirect to Stripe Checkout (SUGGESTED APPROACH)
  // this approach is probably best put in a serverless function
  // await redirectToStripeCheckout(url)

  const line_items = cart.map((product) => ({
    price: product.id,
    quantity: product.quantity,
  }));

  // Build payload
  // TODO: Custom payload
  // See https://stripe.com/docs/payments/checkout/custom-success-page#modify-success-url.
  const payload = deepOmitNils({
    success_url: successUrl,
    cancel_url: cancelUrl,
    // eslint-disable-next-line camelcase
    line_items: line_items,
    mode: mode,
    payment_method_types: ["card" as const],
    allow_promotion_codes: allowPromotionCodes,
    customer: customer?.id ?? null,
  });

  const session = await stripe.checkout.sessions.create(payload);
  const { id, url } = session;

  return {
    id,
    url,
  };
};

export const retrieveStripeCheckoutSession = async ({
  id,
}: QueryRetrieveStripeCheckoutSessionArgs) => {
  const session = await stripe.checkout.sessions.retrieve(id);
  return session;
};
