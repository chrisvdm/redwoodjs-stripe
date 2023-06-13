export const schema = `
    scalar Timestamp

    type StripeDiscount {
        id: ID!
        coupon: StripeCoupon
        customer: String
        end: Timestamp
        start: Timestamp
        subscription: String
        object: String
        checkout_session: String
        invoice: String
        invoice_item: String
        promotion_code: String
    }
`