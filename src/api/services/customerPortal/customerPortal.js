import { stripe } from '../../lib'

export const createStripeCustomerPortalSession = (payload) => {
    const session = await stripe.billingPortal.sessions.create(payload);
    return session
}

export const configureStripeCustomerPortal = () => {

}