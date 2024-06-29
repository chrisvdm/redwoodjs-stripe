import { useMutation } from "@apollo/client";
import { useContext } from "react";
import { gql } from "graphql-tag";
import { useApolloClient } from "@apollo/client";

import { StripeContext } from "../provider/StripeContext.js";
import type { Fragments } from "../types.js";
import { getFragmentName } from "../lib/getFragmentName.js";
import type {
  CreateStripeCustomerInput,
  StripeAdditionalPropertiesInput,
} from "../generated/graphql.js";

const DEFAULT_RETREIVE_FRAGMENT = gql`
      fragment DefaultRetrieveFragment on StripeCustomer {
        name
        email
        id
      }
    `;

const DEFAULT_CREATE_FRAGMENT = gql`
      fragment DefaultCreateFragment on StripeCustomer {
        id
      }`;

export const useStripeCustomer = (fragments: Fragments) => {
  const client = useApolloClient();
  const defaultCustomerId = useContext(StripeContext)?.customer?.id;
  const createFragment = fragments?.createFragment || DEFAULT_CREATE_FRAGMENT;
  const retrieveFragment =
    fragments?.retrieveFragment || DEFAULT_RETREIVE_FRAGMENT;

  const [createStripeCustomer] = useMutation(
    gql`
      ${createFragment}

      mutation createStripeCustomer($data: CreateStripeCustomerInput ) {
        createStripeCustomer(data: $data) {
          ...${getFragmentName(createFragment)}
        }
      }
    `,
  );

  const RETRIEVE_STRIPE_CUSTOMER = gql`
    ${retrieveFragment}

    query retrieveStripeCustomer(
      $data: RetrieveStripeCustomerInput
    ) {
      retrieveStripeCustomer(data: $data) {
        ...${getFragmentName(retrieveFragment)}
      }
    }
  `;
  return {
    customer: useContext(StripeContext).customer,
    retrieveStripeCustomer: async (
      id: string | null | undefined,
      addProps: StripeAdditionalPropertiesInput,
    ) => {
      const customerId = id ? id : defaultCustomerId;

      // create query
      const result = await client.query({
        query: RETRIEVE_STRIPE_CUSTOMER,
        variables: {
          data: {
            id: customerId,
            addProps,
          },
        },
      });

      if (result.error) {
        throw result.error;
      }

      return result.data?.retrieveStripeCustomer ?? null;
    },
    createStripeCustomer: async (args: CreateStripeCustomerInput) => {
      // Create Payload
      const payload = {
        variables: {
          data: args,
        },
      };

      // Create Customer
      const { data } = await createStripeCustomer(payload);
      return data.createStripeCustomer;
    },
  };
};
