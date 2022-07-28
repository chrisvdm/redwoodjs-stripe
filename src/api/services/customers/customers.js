import { stripe } from '../../lib'

export const stripeCustomerSearch = async ({ query }) => {
    const customer = await stripe.customers.search({
  query: query,
    });
  const latest = customer.data.sort((first, next) => {
    const firstDate = new Date(0)
    firstDate.setUTCSeconds(first.created)
    const nextDate = new Date(0)
    nextDate.setUTCSeconds(next.created)
    return firstDate - nextDate
  })
  return latest[latest.length-1]
}