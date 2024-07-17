import { useContext } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { gql } from "graphql-tag";

import { StripeContext } from "../provider/StripeContext.js";
import type { StripeCustomerBase } from "../types.js";
import type {
  CreateStripeCustomerPortalConfigMutation,
  CreateStripeCustomerPortalConfigMutationVariables,
  CreateStripeCustomerPortalSessionMutation,
  CreateStripeCustomerPortalSessionMutationVariables,
  CreateStripeCustomerPortalSessionSkipAuthMutation,
  CreateStripeCustomerPortalSessionSkipAuthMutationVariables,
  ListStripeCustomerPortalConfigQuery,
  ListStripeCustomerPortalConfigQueryVariables,
  StripeCustomerPortalConfigInput,
  StripeCustomerPortalInput,
} from "../generated/graphql.js";
import { nonNilAssertionError } from "../lib/nonNilAssertionError.js";
import { isEmptyString } from "../lib/isEmptyString.js";

type RedirectToStripeCustomerPortalArgs = {
  customer: StripeCustomerBase;
} & Omit<StripeCustomerPortalInput, "customer">;

type CreateStripeCustomerPortalConfigArgs = StripeCustomerPortalConfigInput;

export const useStripeCustomerPortal = () => {
  const context = useContext(StripeContext);

  if(isEmptyString(context.customer)) {
    return {}
  }

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

  const defaultListApolloResults = useQuery<
    ListStripeCustomerPortalConfigQuery,
    ListStripeCustomerPortalConfigQueryVariables
  >(STRIPE_DEFAULT_CUSTOMER_PORTAL, {
    variables: {
      params: {
        is_default: true,
        active: true,
        ending_before: null,
        limit: null,
        starting_after: null,
      },
    },
  });

  const defaultConfig = defaultListApolloResults.data
    ? defaultListApolloResults.data.listStripeCustomerPortalConfig?.data?.[0]
    : null;

  // Create Stripe Customer Portal Configuration Mutation
  const [createStripeCustomerPortalConfig] = useMutation<
    CreateStripeCustomerPortalConfigMutation,
    CreateStripeCustomerPortalConfigMutationVariables
  >(
    gql`
      mutation createStripeCustomerPortalConfig($data: StripeCustomerPortalConfigInput ) {
        createStripeCustomerPortalConfig(data: $data) {
          id
        }
      }
    `,
  );

  // Create Stripe Customer Portal Session Mutation
  const [createStripeCustomerPortalSession] = useMutation<
    CreateStripeCustomerPortalSessionMutation,
    CreateStripeCustomerPortalSessionMutationVariables
  >(
    gql`
    mutation createStripeCustomerPortalSession($data: StripeCustomerPortalInput ) {
      createStripeCustomerPortalSession(data: $data) {
        id
        url
      }
    }
  `,
  );

  const [createStripeCustomerPortalSessionSkipAuth] = useMutation<
    CreateStripeCustomerPortalSessionSkipAuthMutation,
    CreateStripeCustomerPortalSessionSkipAuthMutationVariables
  >(
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

      if (customer.id == null) {
        throw nonNilAssertionError(
          "useStripeCustomerPortal:redirectToStripeCustomerPortal",
          {
            customer,
          },
        );
      }

      const variables = {
        data: {
          ...args,
          customer: customer.id,
        },
      };

      // Check to skipAuth
      if (skipAuth) {
        // Create Customer Portal Session using Test mutation that skips auth
        const result = await createStripeCustomerPortalSessionSkipAuth({
          variables,
        });

        const url = result.data?.createStripeCustomerPortalSessionSkipAuth?.url;

        if (url == null) {
          throw nonNilAssertionError(
            "useStripeCustomerPortal:redirectToStripeCustomerPortal:createStripeCustomerPortalSessionSkipAuth",
            {
              variables,
              result,
            },
          );
        }

        location.href = url;
      } else {
        // Create Customer Portal Session
        const result = await createStripeCustomerPortalSession({ variables });
        const url = result.data?.createStripeCustomerPortalSession?.url;

        if (url == null) {
          throw nonNilAssertionError(
            "useStripeCustomerPortal:redirectToStripeCustomerPortal:createStripeCustomerPortalSession",
            {
              variables,
              result,
            },
          );
        }

        location.href = url;
      }
    },
    createStripeCustomerPortalConfig: async (
      args: CreateStripeCustomerPortalConfigArgs,
    ) => {
      const variables = {
        data: args,
      };

      const result = await createStripeCustomerPortalConfig({ variables });
      return result?.data?.createStripeCustomerPortalConfig;
    },
  };
};
