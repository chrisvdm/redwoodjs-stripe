import { loadStripe } from '@stripe/stripe-js'
import { useMutation, useQuery } from '@redwoodjs/web'
import gql from 'graphql-tag'

export const useStripeCheckout = () => {
  // Create Session Mutation
  const [checkout] = useMutation(
    gql`
      mutation Checkout(
        $cart: [ProductInput!]!
        $successUrl: String
        $cancelUrl: String
      ) {
        checkout(cart: $cart, successUrl: $successUrl, cancelUrl: $cancelUrl) {
          id
          sessionUrl
        }
      }
    `
  )
 
  return async ({ cart, successUrl, cancelUrl }) => {
    const newCart = cart.map(item => ({id: item.id, quantity: item.quantity}))
    // Create checkout session and return session id
    const {
      data: {
        checkout: {
          id,
          sessionUrl
        },
      },
    } = await checkout({
      variables: {
        cart: newCart,
        successUrl: successUrl,
        cancelUrl: cancelUrl
      }
    })

    location.href = sessionUrl;
  }
    
}

export const useStripeCustomerSearch = (querystring) => {
  const STRIPE_CUSTOMER_SEARCH = gql`
      query stripeCustomerSearch(
        $query: String
      ) {
        stripeCustomerSearch(query: $query) {
          id
          name
        }
      }
    `

    const apolloResult = useQuery(
      STRIPE_CUSTOMER_SEARCH, {
        skip: querystring === null,
        variables: {
          query: querystring  
        }
      }
    )
  
  console.log(apolloResult)
    
    return {
      ...apolloResult,
      refetch: (nextQueryString) => {
        return apolloResult.refetch({
            query: nextQueryString
        })
      }
    }
}