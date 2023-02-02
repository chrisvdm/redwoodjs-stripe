import { stripe, lastEntry } from '../../lib'

export const stripeCustomerSearch = async ({ query }) => {
    const customer = await stripe.customers.search({
  query: query,
    });
  return lastEntry(customer.data)
}

export const searchLatestStripeCustomer = async (query) => {
   const customer = await stripe.customers.search({
  query: query,
    });
  return lastEntry(customer.data)
}

export const retrieveStripeCustomer = async ({ id }) => {
  const customer = await stripe.customers.retrieve(id)
  return customer
}

export const createStripeCustomer = async ({ data }) => {
  const newCustomer = await stripe.customers.create(data)
  return newCustomer
}