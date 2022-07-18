export const schema = `
    scalar Timestamp

    scalar Metadata

    type StripeCoupon {
        id: ID!
        amount_off: Int
        currency: String
        duration: StripeDurationEnum
        duration_in_months: Int
        name: String
        percent_off: Float
        object: String
        applies_to: StripeAppliesTo
        created: Timestamp
        livemode: Boolean
        max_redemptions: Int
        redeem_by: Timestamp
        times_redeemed: Int
        valid: Boolean
        metadata: Metadata
    }

    enum StripeDurationEnum {
        once
        repeating
        forever
    }

    type StripeAppliesTo {
        products: [String]
    }
`