import { loadStripe } from '@stripe/stripe-js'
import { useMutation } from '@redwoodjs/web'
import gql from 'graphql-tag'

export const useCheckoutHandler = (cart) => {
  // Create Session Mutation
  const [checkout] = useMutation(
    gql`
      mutation Checkout(
        $cart: [ProductInput!]!
      ) {
        checkout(cart: $cart) {
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
 
  return async (cart) => {
    const newCart = cart.map(item => ({id: item.id, quantity: item.quantity}))
    // Create checkout session and return session id
    const {
      data: {
        checkout: {
          id,
          sessionUrl
        },
      },
    } = await checkout({variables: {cart: newCart}})

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