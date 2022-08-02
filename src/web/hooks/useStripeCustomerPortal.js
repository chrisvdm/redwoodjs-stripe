import { useContext } from 'react'
import { useMutation } from '@redwoodjs/web'

import { StripeContext } from '../provider/StripeContext'

import gql from 'graphql-tag'

export const useStripeCustomerPortal = () => {
    const context = useContext(StripeContext)

    const [createStripeCustomerPortal] = useMutation(
    gql`
      mutation createStripeCustomerPorta($variables: StripeCustomerPortalInput ) {
        createStripeCustomerPortalSession(variables: $variables) {
          id
          url
        }
      }
    `
    )
    
    return async (args) => {
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
        const { data: { createStripeCustomerPortalSession: { url } } } = await createStripeCustomerPortal(payload)
        location.href = url;
    }
}