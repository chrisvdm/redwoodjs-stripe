import { useMutation } from '@redwoodjs/web'
import gql from 'graphql-tag'

import { StripeContext } from '../provider/StripeContext'

export const useStripeCustomer = (returnValues = `id
email
name`) => {
    const [createStripeCustomer] = useMutation(
    gql`
      mutation createStripeCustomer($data: CreateStripeCustomerInput ) {
        createStripeCustomer(data: $data) {
          ${returnValues}
        }
      }
    `
    )
    
  return {
    customer: StripeContext.customer,
    createStripeCustomer: async (args) => {
      // Create Payload
      const payload = {
        variables: {
          data: args
        }
      }

      // Create Customer Portal Session
      const { data } = await createStripeCustomer(payload)
      return data.createStripeCustomer
    }
  }
}