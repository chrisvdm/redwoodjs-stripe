import gql from 'graphql-tag'
import { useApolloClient } from '@apollo/client'

const getFragmentName = (document) => {
  return document.definitions[0].name.value
}

const DEFAULT_LIST_FRAGMENT = gql`
      fragment DefaultListFragment on StripeSubscription {
       id
       customer
       status
      }
    `

export const useStripeSubscriptions = (fragments) => {
  const listFragment = fragments?.listFragment || DEFAULT_LIST_FRAGMENT
  const client = useApolloClient()

  const LIST_STRIPE_SUBSCRIPTIONS = gql`
    ${listFragment}

    query listStripeSubscriptions(
      $listParams: ListStripeSubscriptionParamsInput
    ) {
      listStripeSubscriptions(listParams: $listParams) {
        ...${getFragmentName(listFragment)}
      }
    }
  `
    
    return {
    listStripeSubscriptions: async (listParams, addProps) => {
    // create query
      const result = await client.query({
        query: LIST_STRIPE_SUBSCRIPTIONS,
        variables: {
          listParams: listParams,
          addProps: addProps
        }
      })

      if (result.error) {
        throw result.error
      }

    return result.data?.listStripeSubscriptions ?? null
    },
  }
}