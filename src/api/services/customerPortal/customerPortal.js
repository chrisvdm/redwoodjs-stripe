import { stripe } from '../../lib'

export const createStripeCustomerPortalSession = async ({variables}) => {
    const session = await stripe.billingPortal.sessions.create(variables);
    return session
}

export const configureStripeCustomerPortal = async (payload) => {
    const config = await stripe.billingPortal.configurations.create(payload)
    return config
}