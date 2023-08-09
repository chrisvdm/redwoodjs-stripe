import { stripe, lastEntry, logger, prettyList } from '../../lib'

export const stripeCustomerSearch = async ({ query }) => {
    const customer = await stripe.customers.search({
  query: query,
    });
  return prettyList(lastEntry(customer.data))
}

export const searchLatestStripeCustomer = async (query) => {
   const customer = await stripe.customers.search({
  query: query,
    });
  return prettyList(lastEntry(customer.data))
}

export const retrieveStripeCustomer = async ({data}) => {
  const { id, addProps } = data

  const customer = await stripe.customers.retrieve(id, { ...addProps })
  return prettyList(customer)
}

export const createStripeCustomer = async ({ data }) => {
  const newCustomer = await stripe.customers.create(data)
  return prettyList(newCustomer)
}