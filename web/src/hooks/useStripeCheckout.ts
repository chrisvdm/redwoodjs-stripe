import { useContext } from "react";
import { useApolloClient, useMutation } from "@apollo/client";
import { StripeContext } from "../provider/StripeContext.js";
import { gql } from "graphql-tag";
import type { StripeCheckoutModeEnum, Cart, StripeCustomer } from "../types.js";
import type {
  RetrieveStripeCheckoutSessionQuery,
  RetrieveStripeCheckoutSessionQueryVariables,
} from "../generated/graphql.js";

interface CheckoutProps {
  cart?: Cart;
  customer?: StripeCustomer;
  successUrl?: string | null;
  cancelUrl?: string | null;
  mode?: StripeCheckoutModeEnum | null;
  allowPromotionCodes?: boolean | null;
}

export const useStripeCheckout = () => {
  const context = useContext(StripeContext);

  // Create Session Mutation
  const [checkout] = useMutation(
    gql`
      mutation Checkout(
        $cart: [ProductInput!]!
        $successUrl: String
        $cancelUrl: String
        $customer: StripeCustomerInput
        $mode: StripeCheckoutModeEnum
        $allowPromotionCodes: Boolean
      ) {
        checkout(cart: $cart, successUrl: $successUrl, cancelUrl: $cancelUrl, customer: $customer, mode: $mode, allowPromotionCodes: $allowPromotionCodes) {
          id
          url
        }
      }
    `,
  );

  // Create Query for retrieving CheckoutSession
  const RETRIEVE_STRIPE_CHECKOUT_SESSION = gql`
    query retrieveStripeCheckoutSession(
      $id: ID!
    ) {
      retrieveStripeCheckoutSession(id: $id) {
        id
        customer
        customer_email
        line_items {
          object
        }
      }
    }
  `;

  return {
    checkout: async ({
      cart,
      customer: givenCustomer,
      successUrl,
      cancelUrl,
      mode,
      allowPromotionCodes,
    }: CheckoutProps) => {
      const customer = givenCustomer ?? (await context.waitForCustomer());
      cart = cart ?? context.cart;
      const newCart = cart.map((item) => ({
        id: item.id,
        quantity: item.quantity,
      }));
      // Determines checkout mode based on whether price "type" was passed to cart item or whther a "mode" was passed to checkout hook
      const determinedMode = (() => {
        if (typeof mode === "undefined") {
          const hasRecurring = cart.some(
            (item) => Object.hasOwn(item, "type") && item.type === "recurring",
          );
          return hasRecurring ? "subscription" : "payment";
        } else {
          return mode;
        }
      })();

      // Build variable payload
      const payload = {
        variables: {
          cart: newCart,
          successUrl: successUrl,
          cancelUrl: cancelUrl,
          mode: determinedMode,
          allowPromotionCodes: allowPromotionCodes,
          ...(customer != null
            ? {
                customer: {
                  id: customer.id,
                  name: customer.name,
                  email: customer.email,
                },
                customer_email: customer.email,
              }
            : {}),
        },
      };

      // Create checkout session and return session id
      const {
        data: {
          checkout: { url },
        },
      } = await checkout(payload);

      // Redirect to Stripe Checkout
      location.href = url;
    },
    retrieveStripeCheckoutSession: async (id: string) => {
      const client = useApolloClient();

      // create query
      const result = await client.query<
        RetrieveStripeCheckoutSessionQuery,
        RetrieveStripeCheckoutSessionQueryVariables
      >({
        query: RETRIEVE_STRIPE_CHECKOUT_SESSION,
        variables: {
          id,
        },
      });

      if (result.error) {
        throw result.error;
      }

      return result.data?.retrieveStripeCheckoutSession ?? null;
    },
  };
};
