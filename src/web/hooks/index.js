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
        }
      }
    `
  )
  
  logger("Entering package...")

    // Create checkout session and return session id
    
    
  return async () => {
      const {
        data: {
        checkout: { id },
        },
      } = await checkout()
    logger(id)
    return id
  }

    // // Redirect user to Stripe Checkout page
    // const stripe = await loadStripe(process.env.STRIPE_PK)

    // await stripe.redirectToCheckout({
    // sessionId: id,
    // })
}