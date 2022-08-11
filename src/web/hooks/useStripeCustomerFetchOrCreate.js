import { useApolloClient } from '@apollo/client'
import gql from 'graphql-tag'

import { useStripeCustomer } from './useStripeCustomer'
import { useEffect } from 'react'

const STRIPE_CUSTOMER_SEARCH = gql`
    query stripeCustomerSearch(
      $query: String
    ) {
      stripeCustomerSearch(query: $query) {
        id
        name
        email
      }
    }
  `

const searchCustomer = async ({ client, searchString }) => {
  const result = await client.query({
    query: STRIPE_CUSTOMER_SEARCH,
    variables: {
      query: searchString
    }
  })

  if (result.error) {
    throw result.error
  }

  return result.data?.stripeCustomerSearch ?? null
}

const fetchOrCreateCustomer = async (context) => {
  const {
    searchString,
    newCustomerData,
    createStripeCustomer
  } = context

  const hasNewCustomerObj = Object.keys(newCustomerData).length > 0
  const hasSearchString = searchString !== ''

  if (!hasNewCustomerObj || !hasSearchString) {
    return null
  }
  
  const foundCustomer = await searchCustomer(context)

  if (foundCustomer !== null) {
    return foundCustomer
  }

  return await createStripeCustomer(newCustomerData)
}

export const useStripeCustomerFetchOrCreate = (searchString, newCustomerData, setCustomer) => {
  const { createStripeCustomer } = useStripeCustomer()
  const client = useApolloClient()

  useEffect(async () => {
    const context = {
      client,
      searchString,
      createStripeCustomer,
      newCustomerData
    }

    setCustomer(await fetchOrCreateCustomer(context))
  }, [searchString])
}