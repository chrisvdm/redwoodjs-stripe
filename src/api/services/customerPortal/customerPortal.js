import { stripe } from '../../lib'

export const createStripeCustomerPortalSession = async ({variables}) => {
    const session = await stripe.billingPortal.sessions.create(variables);
    return session
}

export const configureStripeCustomerPortal = () => {

}