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
const RETRIEVE_STRIPE_CUSTOMER = gql`
    query retrieveStripeCustomer(
      $id: String!
    ) {
      retrieveStripeCustomer(id: $id) {
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

const retrieveCustomer = async ({ id, client }) => {
  const result = await client.query({
    query: RETRIEVE_STRIPE_CUSTOMER,
    variables: {
      id: id
    }
  })

  if (result.error) {
    throw result.error
  }

  return result.data?.retrieveStripeCustomer ?? null
}

const fetchOrCreateCustomer = async (context) => {
  const {
    id,
    searchString,
    newCustomerData,
    createStripeCustomer
  } = context

  const hasNewCustomerObj = Object.keys(newCustomerData).length > 0
  const hasSearchString = searchString !== '' && !!searchString
  const hasID = id !== '' && !!id

  if (!hasNewCustomerObj && !hasSearchString && !hasID) {
    return null
  }
  const foundCustomer = hasID ? await retrieveCustomer(context) : await searchCustomer(context)

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
    const stripeCustomer = await fetchOrCreateCustomer(context)
    setCustomer(stripeCustomer)
  }, [searchString, id])
}