import { gql } from "graphql-tag";

import { useApolloClient } from "@apollo/client";
import type { Fragments, ListStripeSubscriptionsParamsInput } from "./types.js";
import { getFragmentName } from "../lib/getFragmentName.js";

const DEFAULT_LIST_FRAGMENT = gql`
      fragment DefaultListFragment on StripeSubscription {
       id
       customer
       status
      }
    `;

export const useStripeSubscriptions = (fragments: Fragments) => {
  const listFragment = fragments?.listFragment || DEFAULT_LIST_FRAGMENT;
  const client = useApolloClient();

  const LIST_STRIPE_SUBSCRIPTIONS = gql`
    ${listFragment}

    query listStripeSubscriptions(
      $data: ListStripeSubscriptionsInput
    ) {
      listStripeSubscriptions(data: $data) {
        ...${getFragmentName(listFragment)}
      }
    }
  `;

  return {
    listStripeSubscriptions: async (
      listParams: ListStripeSubscriptionsParamsInput,
    ) => {
      // create query
      const result = await client.query({
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
