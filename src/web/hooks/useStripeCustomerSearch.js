import { useQuery } from '@redwoodjs/web'
import gql from 'graphql-tag'

import { isEmptyObj } from '../lib'

export const useStripeCustomerSearch = (querystring) => {
  
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
    `
  
    const apolloResult = useQuery(
      STRIPE_CUSTOMER_SEARCH, {
        skip: querystring === "",
        variables: {
          query: querystring  
        }
      }
    )
  
    return {
      ...apolloResult,
      refetch: (nextQueryString) => {
        return apolloResult.refetch({
            query: nextQueryString
        })
      }
    }
}