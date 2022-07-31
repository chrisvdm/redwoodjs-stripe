import { useMutation } from '@redwoodjs/web'
import gql from 'graphql-tag'

export const useStripeCustomerPortal = () => {
    const [createStripeCustomerPortal] = useMutation(
    gql`
      mutation createStripeCustomerPorta($variables: $StripeCustomerPortalInput ) {
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
                variables: args
            }
        }
        // Create Customer Portal Session
        const session = await createStripeCustomerPortal(payload)
        console.log(session)
    }
}