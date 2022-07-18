import { stripe } from '../../lib'

export const stripeCustomerSearch = async ({ query }) => {
    const customer = await stripe.customers.search({
  query: query,
    });
    return customer
}