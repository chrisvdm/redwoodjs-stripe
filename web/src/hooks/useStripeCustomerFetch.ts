import type { ApolloClient } from "@apollo/client";
import { useApolloClient } from "@apollo/client";
import { gql } from "graphql-tag";
import { useEffect } from "react";
import type {
  FetchRetrieveStripeCustomerQuery,
  FetchRetrieveStripeCustomerQueryVariables,
  StripeCustomerSearchQuery,
  StripeCustomerSearchQueryVariables,
} from "../generated/graphql.js";
import { nonNilAssertionError } from "../lib/nonNilAssertionError.js";
import type { StripeCustomerBase } from "../types.js";
import { isEmptyString } from "../lib/index.js"

const STRIPE_CUSTOMER_SEARCH = gql`
    query stripeCustomerSearch(
      $query: String
    ) {
      stripeCustomerSearch(query: $query) {
        id
        name
        email
      }
    }
  `;
const RETRIEVE_STRIPE_CUSTOMER = gql`
    query fetchRetrieveStripeCustomer(
      $data: RetrieveStripeCustomerInput
    ) {
      retrieveStripeCustomer(data: $data) {
        id 
        name
        email
      }
    }
  `;

export interface FetchCustomerContext {
  client: ApolloClient<unknown>;
  id?: string | null | undefined;
  searchString: string | null | undefined;
}

const searchCustomer = async ({
  client,
  searchString,
}: FetchCustomerContext) => {
  const result = await client.query<
    StripeCustomerSearchQuery,
    StripeCustomerSearchQueryVariables
  >({
    query: STRIPE_CUSTOMER_SEARCH,
    variables: {
      query: searchString ?? null,
    },
  });

  if (result.error) {
    throw result.error;
  }

  return result.data?.stripeCustomerSearch ?? null;
};

const retrieveCustomer = async (context: FetchCustomerContext) => {
  const { id, client } = context;

  if (id == null) {
    throw nonNilAssertionError(
      "useStripeCustomerFetch:retrieveCustomer:id",
      context,
    );
  }

  const result = await client.query<
    FetchRetrieveStripeCustomerQuery,
    FetchRetrieveStripeCustomerQueryVariables
  >({
    query: RETRIEVE_STRIPE_CUSTOMER,
    variables: {
      data: {
        id: id,
        addProps: null,
      },
    },
  });

  if (result.error) {
    throw result.error;
  }

  return result.data?.retrieveStripeCustomer ?? null;
};

const fetchCustomer = async (context: FetchCustomerContext) => {
  const { id, searchString } = context;
  const hasSearchString = searchString !== "" && !!searchString;
  const hasID = id !== "" && !!id;

  if (!hasSearchString && !hasID) {
    return null;
  }

  let foundCustomer = null;

  if (hasID) {
    foundCustomer = await retrieveCustomer(context);
  } else if (hasSearchString && foundCustomer === null) {
    foundCustomer = await searchCustomer(context);
  }
  return foundCustomer;
};

export const useStripeCustomerFetch = (
  id: string | null | undefined,
  searchString: string | null | undefined,
  setCustomer: (customer: StripeCustomerBase) => unknown,
) => {
  const client = useApolloClient();
 
  useEffect(() => {
    const doFetch = async () => {
      const context = {
        id,
        client,
        searchString,
      };
      
      const stripeCustomer = await fetchCustomer(context);

      if (stripeCustomer == null) {
        throw nonNilAssertionError("useStripeCustomerFetch:response", {
          context,
          response: stripeCustomer,
        });
      }

      setCustomer(stripeCustomer);
    };

    if(!isEmptyString(id) || !isEmptyString(searchString)) {
      doFetch();
    }

    
  }, [searchString, id]);
};

