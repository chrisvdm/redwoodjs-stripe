import { useContext } from 'react'
import { useMutation } from '@redwoodjs/web'
import { StripeContext } from '../provider/StripeContext'
import gql from 'graphql-tag'

export const useStripeCheckout = () => {
  const context = useContext(StripeContext)

  // Create Session Mutation
  const [checkout] = useMutation(
    gql`
      mutation Checkout(
        $cart: [ProductInput!]!
        $successUrl: String
        $cancelUrl: String
        $customer: StripeCustomerInput
        $mode: StripeCheckoutModeEnum
      ) {
        checkout(cart: $cart, successUrl: $successUrl, cancelUrl: $cancelUrl, customer: $customer, mode: $mode) {
          id
          url
        }
      }
    `
  )

  // Create Query for retrieving CheckoutSession
  const RETRIEVE_STRIPE_CHECKOUT_SESSION = gql`
    query retrieveStripeCustomer(
      $id: String!
    ) {
      retrieveStripeCheckoutSession(id: $id) {
        id
        customer
        customer_email
        line_items
      }
    }
  `
 
  return {
    checkout: async ({ cart, customer, successUrl, cancelUrl, mode }) => {
      // customer = !!customer ? customer : (await context.waitForCustomer())
      customer = customer || context.customer
      cart = cart || context.cart
      const newCart = (cart || context.cart).map(item => ({ id: item.id, quantity: item.quantity }))
      // Determines checkout mode based on whether price "type" was passed to cart item or whther a "mode" was passed to checkout hook
      const determinedMode = (() => {
        if (typeof mode === "undefined") {
          const hasRecurring = cart.some((item) => Object.hasOwn(item, 'type') && item.type === 'recurring')
          return hasRecurring ? "subscription" : "payment"
        } else {
          return mode
        }
      })()
      
      // Build variable payload
      const payload = {
        variables: {
          cart: newCart,
          successUrl: successUrl,
          cancelUrl: cancelUrl,
          mode: determinedMode,
          ... (customer != null ? {
            customer: {
              id: customer.id,
              name: customer.name,
              email: customer.email
            },
            customer_email: customer.email
          } : {})
        }
      }

      // Create checkout session and return session id
      const {
        data: {
          checkout: {
            url
          }
        },
      } = await checkout(payload)
      
      // Redirect to Stripe Checkout
      location.href = url;
    },
    retrieveStripeCheckoutSession: async (id) => {
      const client = useApolloClient()
      
      // create query
      const result = await client.query({
        query: RETRIEVE_STRIPE_CHECKOUT_SESSION,
        variables: {
          id: id
        }
      })

      if (result.error) {
        throw result.error
      }

      return result.data?.retrieveStripeCheckoutSession ?? null
    }
  }
}