import { useQuery } from '@redwoodjs/web'
import gql from 'graphql-tag'

import { useStripeCustomer } from './useStripeCustomer'

export const useStripeCustomerSearch = (querystring) => {
  const { createStripeCustomer } = useStripeCustomer()
  
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
  //       refetch: () => { return {data: { stripeCustomerSearch: null }} },
  //       data: { stripeCustomerSearch: null },
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
      refetch: async (nextQueryString, newCustomerData) => {
        const results = await apolloResult.refetch({
            query: nextQueryString
        })

        if (!results.data.stripeCustomerSearch && Object.keys(newCustomerData).length > 0 && nextQueryString !== '') {
          const newCustomer = await createStripeCustomer(newCustomerData)
          return {
            ...results,
            data: {
              stripeCustomerSearch: newCustomer
            }
          }
        } else {
          return results
        }
      }
    }
}