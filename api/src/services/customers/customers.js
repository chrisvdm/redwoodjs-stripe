import { stripe, lastEntry, logger } from '../../lib'

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

export const retrieveStripeCustomer = async ({data}) => {
  const { id, addProps } = data

  const customer = await stripe.customers.retrieve(id, { ...addProps })
  
  if (addProps?.expand) {
    addProps.expand.forEach(x => {
      customer[x] = customer[x].data
    });
  }

  logger.debug({ customer }, `Retrieve Customer Response`)

  return customer
}

export const createStripeCustomer = async ({ data }) => {
  const newCustomer = await stripe.customers.create(data)
  return newCustomer
}