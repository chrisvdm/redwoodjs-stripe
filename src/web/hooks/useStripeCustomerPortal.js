import { useContext, useEffect, useState } from 'react'
import { useMutation, useQuery } from '@redwoodjs/web'

import { StripeContext } from '../provider/StripeContext'

import gql from 'graphql-tag'



export const useStripeCustomerPortal = () => {
  const context = useContext(StripeContext)

  // Create list Stripe Customer Portal query
const STRIPE_DEFAULT_CUSTOMER_PORTAL = gql`
  query listStripeCustomerPortalConfig(
    $params: StripeCustomerPortalConfigParamsInput
  ) {
    listStripeCustomerPortalConfig(params: $params) {
      data {
        id
        is_default
        active
      }
     
    }
  }
`
  
  const defaultListApolloResults = useQuery(STRIPE_DEFAULT_CUSTOMER_PORTAL, {
    variables: {
      params: {
        is_default: true,
        active: true
      } 
    }
  })

  const defaultConfig = defaultListApolloResults.data ? defaultListApolloResults.data.listStripeCustomerPortalConfig.data[0] : null

  // Create Stripe Customer Portal Session Mutation
  const [createStripeCustomerPortalSession] = useMutation(
  gql`
    mutation createStripeCustomerPortalSession($data: StripeCustomerPortalInput ) {
      createStripeCustomerPortalSession(data: $data) {
        id
        url
      }
    }
  `
  )

  const [createStripeCustomerPortalSessionSkipAuth] = useMutation(
  gql`
    mutation createStripeCustomerPortalSessionSkipAuth($data: StripeCustomerPortalInput ) {
      createStripeCustomerPortalSessionSkipAuth(data: $data) {
        id
        url
      }
    }
  `
  )
  
  // Create Stripe Customer Portal Configuration Mutation
  const [createStripeCustomerPortalConfig] = useMutation(
     gql`
      mutation createStripeCustomerPortalConfig($data: StripeCustomerPortalConfigInput ) {
        createStripeCustomerPortalConfig(data: $data) {
          id
          url
        }
      }
    ` 
  )
  
  // Returns object with Customer Portal functions
  return {
    stripeCustomer: context.customer ? context.customer : null,
    defaultConfig: defaultConfig,
    redirectToStripeCustomerPortal: async(args, skipAuth = false) => {
        // Create Payload
        const payload = {
          variables: {
            data: {
              ...(context.customer ? { customer: context.customer.id } : {}),
              ...args
            }
          }
        }

      // Check to skipAuth
      if (skipAuth) {
        // Create Customer Portal Session using Test mutation that skips auth
        const { data: { createStripeCustomerPortalSessionSkipAuth: { url } } } = await createStripeCustomerPortalSessionSkipAuth(payload)
        location.href = url;
      } else {
        // Create Customer Portal Session
        const { data: { createStripeCustomerPortalSession: { url } } } = await createStripeCustomerPortalSession(payload)
        location.href = url;
      }     
    },
    createStripeCustomerPortalConfig: async (args) => {
      const payload = {
        variables: {
          data: args
        }
      }
      const { data: { createStripeCustomerPortalConfig: { id } } } = await createStripeCustomerPortalConfig(payload)
      return id
    },
  }
}