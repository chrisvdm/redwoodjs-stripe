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
  
  // if (querystring === '') {
  //   return {
  //       refetch: () => { return null },
  //       data: null,
  //   }
  // }
  
    const apolloResult = useQuery(
      STRIPE_CUSTOMER_SEARCH, {
        skip: (querystring === ""),
        variables: {
          query: querystring  
        }
      }
    )
  
    return {
      ...apolloResult,
      refetch: async (nextQueryString) => {
        const results = await apolloResult.refetch({
            query: nextQueryString
        })
        return results
      }
    }
}