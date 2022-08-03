import { useContext } from 'react'
import { useMutation } from '@redwoodjs/web'

import { StripeContext } from '../provider/StripeContext'

import gql from 'graphql-tag'

export const useStripeCustomerPortal = () => {
  const context = useContext(StripeContext)

    const [createStripeCustomerPortalSession] = useMutation(
    gql`
      mutation createStripeCustomerPortalSession($variables: StripeCustomerPortalInput ) {
        createStripeCustomerPortalSession(variables: $variables) {
          id
          url
        }
      }
    `
    )
    
  return async (args) => {
    // Check for customer
    console.log(context.customer)
        // Create Payload
        const payload = {
          variables: {
            variables: {
              ...(context.customer ? { customer: context.customer.id } : {}),
              ...args
            }
          }
        }

        // Create Customer Portal Session
        const { data: { createStripeCustomerPortalSession: { url } } } = await createStripeCustomerPortalSession(payload)
        location.href = url;
    }
}