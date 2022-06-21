import { loadStripe } from '@stripe/stripe-js'
import { useMutation } from '@redwoodjs/web'
import gql from 'graphql-tag'

export const useStripeCheckoutHandler = () => {
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
  
  /*
  Original Mutation
  const [checkout] = useMutation(
    gql`
      mutation Checkout(
        $mode: Mode!
        $cart: [ProductInput!]!
        $customerId: String
      ) {
        checkout(mode: $mode, cart: $cart, customerId: $customerId) {
          id
        }
      }
    `
  )
  */
 
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

    console.log(id, sessionUrl)

    // APPROACH A
    // Redirect user to Stripe Checkout page
    // Not very secure, Server-side redirects are 
    location.href = sessionUrl;
    
    /*
    // APPROACH B + C
    // Redirect user to Stripe Checkout page
    // Stripe Public key needs to be passed directly to hook
    // APPROACH C 
    // Requires extra setup step to share env vars with package
    const stripe = await loadStripe(pk)

    await stripe.redirectToCheckout({
    sessionId: id,
    }) 
    */
  }
    
}