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
        $customer: StripeCustomerInput
      ) {
        checkout(cart: $cart, successUrl: $successUrl, cancelUrl: $cancelUrl, customer: $customer) {
          id
          sessionUrl
        }
      }
    `
  )
 
  return async ({ cart, successUrl, cancelUrl, customer }) => {
    const newCart = cart.map(item => ({ id: item.id, quantity: item.quantity }))
    
    // Build variable payload
    const payload = {
      variables: {
        cart: newCart,
        successUrl: successUrl,
        cancelUrl: cancelUrl,
        ... ((typeof customer !== "undefined" && customer !== null) && {
          customer: {
            id: customer.id,
            name: customer.name,
            email: customer.email
          }   
        })
      }
    }

   

    // Create checkout session and return session id
    const {
      data: {
        checkout: {
          id,
          sessionUrl
        },
      },
    } = await checkout(payload)

    // Redirect to Stripe Checkout
    location.href = sessionUrl;
  }
    
}

export const useStripeCustomerSearch = (querystring) => {
  if (querystring === "") 
    return {
      data: {},
      refetch: () => { return { stripeCustomerSearch: {} }}
    }
  
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
        skip: querystring === null,
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