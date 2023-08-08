import { stripe } from '../../lib'


export const listStripeSubscriptions = async ({ data: { params } }) => {
  const subscriptions = await stripe.subscriptions.list({ ...params });
  return subscriptions.data
}