import { gql } from "graphql-tag";

import { useApolloClient } from "@apollo/client";
import type { Fragments } from "../types.js";
import type {
  ListStripeSubscriptionsQuery,
  ListStripeSubscriptionsQueryVariables,
  ListStripeSubscriptionsParamsInput,
} from "../generated/graphql.js";

const DEFAULT_LIST_FRAGMENT = gql`
      fragment ListFragment on StripeSubscription {
       id
       customer
       status
      }
    `;

export const useStripeSubscriptions = (fragments: Fragments) => {
  const listFragment = fragments?.listFragment || DEFAULT_LIST_FRAGMENT;
  const client = useApolloClient();

  const LIST_STRIPE_SUBSCRIPTIONS = gql`
    query listStripeSubscriptions(
      $data: ListStripeSubscriptionsInput
    ) {
      listStripeSubscriptions(data: $data) {
        ...ListFragment
      }
    }

    ${listFragment}
  `;

  return {
    listStripeSubscriptions: async (
      listParams: ListStripeSubscriptionsParamsInput,
    ) => {
      // create query
      const result = await client.query<
        ListStripeSubscriptionsQuery,
        ListStripeSubscriptionsQueryVariables
      >({
        query: LIST_STRIPE_SUBSCRIPTIONS,
        variables: {
          data: {
            params: { ...listParams },
          },
        },
      });

      if (result.error) {
        throw result.error;
      }

      return result.data?.listStripeSubscriptions ?? null;
    },
  };
};
