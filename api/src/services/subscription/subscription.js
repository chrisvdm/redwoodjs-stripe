import { stripe } from '../../lib'

export const listStripeSubscriptions = async ({ listParams, addProps }) => {
  const subscriptions = await stripe.subscriptions.list(listParams, addProps);
  return subscriptions.data
}