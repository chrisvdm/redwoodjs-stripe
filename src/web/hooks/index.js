import {logger} from '../lib'
import { loadStripe } from '@stripe/stripe-js'
import { useMutation } from '@redwoodjs/web'
import gql from 'graphql-tag'

export const useCheckoutHandler = () => {
  // Create Session Mutation
  const [checkout] = useMutation(
    gql`
      mutation Checkout {
        checkout {
          id
          sessionUrl
        }
      }
    `
  )
 
  return async () => {
    // Create checkout session and return session id
    const {
      data: {
        checkout: {
          id,
          sessionUrl
        },
      },
    } = await checkout()

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