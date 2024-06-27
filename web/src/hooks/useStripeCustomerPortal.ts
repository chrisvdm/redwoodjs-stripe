import { useContext } from "react";
import { useMutation, useQuery } from "@apollo/client";

import { StripeContext } from "../provider/StripeContext.js";

import { gql } from "graphql-tag";
import type { Customer } from "../provider/types.js";
import type {
  StripeCustomerPortalConfigInput,
  StripeCustomerPortalInput,
} from "./types.js";

type RedirectToStripeCustomerPortalArgs = {
  customer: Customer;
} & Omit<StripeCustomerPortalInput, "customer">;

type CreateStripeCustomerPortalConfigArgs = StripeCustomerPortalConfigInput;

export const useStripeCustomerPortal = () => {
  const context = useContext(StripeContext);

  // Create list Stripe Customer Portal query
  const STRIPE_DEFAULT_CUSTOMER_PORTAL = gql`
  query listStripeCustomerPortalConfig(
    $params: StripeCustomerPortalConfigParamsInput
  ) {
    listStripeCustomerPortalConfig(params: $params) {
      data {
        id
        is_default
        active
      }
     
    }
  }
`;

  const defaultListApolloResults = useQuery(STRIPE_DEFAULT_CUSTOMER_PORTAL, {
    variables: {
      params: {
        is_default: true,
        active: true,
      },
    },
  });

  const defaultConfig = defaultListApolloResults.data
    ? defaultListApolloResults.data.listStripeCustomerPortalConfig.data[0]
    : null;

  // Create Stripe Customer Portal Configuration Mutation
  const [createStripeCustomerPortalConfig] = useMutation(
    gql`
      mutation createStripeCustomerPortalConfig($data: StripeCustomerPortalConfigInput ) {
        createStripeCustomerPortalConfig(data: $data) {
          id
        }
      }
    `,
  );

  // Create Stripe Customer Portal Session Mutation
  const [createStripeCustomerPortalSession] = useMutation(
    gql`
    mutation createStripeCustomerPortalSession($data: StripeCustomerPortalInput ) {
      createStripeCustomerPortalSession(data: $data) {
        id
        url
      }
    }
  `,
  );

  const [createStripeCustomerPortalSessionSkipAuth] = useMutation(
    gql`
    mutation createStripeCustomerPortalSessionSkipAuth($data: StripeCustomerPortalInput ) {
      createStripeCustomerPortalSessionSkipAuth(data: $data) {
        id
        url
      }
    }
  `,
  );

  const ensureCustomer = async () => {
    const customer = await context.waitForCustomer();

    if (customer === null) {
      throw new Error(
        [
          "A customer is required in order to use Stripe Customer Portal.",
          "This means you need to provide a `customer` prop to `StripeProvider` with the details",
          "needed to either find or create a stripe customer for the logged in user.",
        ].join(" "),
      );
    }

    return customer;
  };

  // Returns object with Customer Portal functions
  return {
    defaultConfig: defaultConfig,
    redirectToStripeCustomerPortal: async (
      args: RedirectToStripeCustomerPortalArgs,
      skipAuth = false,
    ) => {
      const customer = args.customer || (await ensureCustomer());

      // Create Payload
      const payload = {
        variables: {
          data: {
            ...args,
            customer: customer.id,
          },
        },
      };

      // Check to skipAuth
      if (skipAuth) {
        // Create Customer Portal Session using Test mutation that skips auth
        const {
          data: {
            createStripeCustomerPortalSessionSkipAuth: { url },
          },
        } = await createStripeCustomerPortalSessionSkipAuth(payload);
        location.href = url;
      } else {
        // Create Customer Portal Session
        const {
          data: {
            createStripeCustomerPortalSession: { url },
          },
        } = await createStripeCustomerPortalSession(payload);
        location.href = url;
      }
    },
    createStripeCustomerPortalConfig: async (
      args: CreateStripeCustomerPortalConfigArgs,
    ) => {
      const payload = {
        variables: {
          data: args,
        },
      };

      const { data } = await createStripeCustomerPortalConfig(payload);
      return data.createStripeCustomerPortalConfig;
    },
  };
};
