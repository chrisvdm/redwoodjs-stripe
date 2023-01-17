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
const STRIPE_CUSTOMER_RETRIEVE = gql`
    query stripeCustomerRetrieve(
      $id: String
    ) {
      stripeCustomerRetrieve(id: $id) {
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

const retrieveCustomer = async ({ id, client}) => {
  const result = await client.query({
    query: STRIPE_CUSTOMER_RETRIEVE,
    variables: {
      id: id
    }
  })

  if (result.error) {
    throw result.error
  }

  return result.data?.stripeCustomerRetrieve ?? null
}

const fetchOrCreateCustomer = async (context) => {
  const {
    id,
    searchString,
    newCustomerData,
    createStripeCustomer
  } = context

  const hasNewCustomerObj = Object.keys(newCustomerData).length > 0
  const hasSearchString = searchString !== ''

  if (!hasNewCustomerObj || !hasSearchString) {
    return null
  }
  
  const foundCustomer = id !== '' && !!id ? await retrieveCustomer(context) : await searchCustomer(context)

  if (foundCustomer !== null) {
    return foundCustomer
  }

  return await createStripeCustomer(newCustomerData)
}

export const useStripeCustomerFetchOrCreate = (id, searchString, newCustomerData, setCustomer) => {
  const { createStripeCustomer } = useStripeCustomer()
  const client = useApolloClient()

  useEffect(async () => {
    const context = {
      id,
      client,
      searchString,
      createStripeCustomer,
      newCustomerData
    }

    setCustomer(await fetchOrCreateCustomer(context))
  }, [searchString])
}