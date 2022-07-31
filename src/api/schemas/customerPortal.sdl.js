export const schema = `
scalar Timestamp
scalar Metadata

union StringOrStripeCustomerPortalConfig = String | StripeCustomerPortalConfig

type StripeCustomerPortal {
    id: ID!
    object: String
    configuration: StringOrStripeCustomerPortalConfig
    created: Timestamp
    customer: String
    livemode: Boolean
    locale: String
    on_behalf_of: String
    return_url: String
    url: String
}

type StripeCustomerPortalConfig {
    id: ID
    object: String
    active: Boolean
    application: String
    business_profile: StripeBusinessProfile
    created: Timestamp
    features: StripeCustomerPortalFeatures
    is_default: Boolean
    livemode: Boolean
    metadata: Metadata
    updated: Timestamp
}

type StripeCustomerPortalFeatures {
    customer_update: StripeCustomerPortalFeaturesCustomerUpdate
    invoice_history: StripeCustomerPortalFeaturesInvoiceHistory
    payment_method_update: StripeCustomerPortalFeaturesPaymentMethodUpdate
    subscription_cancel: StripeCustomerPortalFeaturesSubscriptionCancel
    subscription_pause: StripeCustomerPortalFeaturesSubscriptionPause
    subscription_update: StripeCustomerPortalFeatureSubscriptionUpdate
}

type StripeCustomerPortalFeatureSubscriptionUpdate {
    default_allowed_updates: [StripeCustomerPortalSubscriptionAllowedUpdatesEnum]
    enabled: Boolean
    products: [StripeCustomerPortalSubscriptionProducts]
}

type StripeCustomerPortalSubscriptionProducts {
    prices: [String]
    product: String
}

enum StripeCustomerPortalSubscriptionAllowedUpdatesEnum {
    price
    quantity
    promotion_code
}

type StripeCustomerPortalFeaturesSubscriptionPause {
    enabled: Boolean
}

type StripeCustomerPortalFeaturesSubscriptionCancel {
    cancellation_reason: StripeSubscriptionCancellationReason
    enabled: Boolean
    mode: StripeCancellationReasonModeEnum
    proration_behavior: String
}

enum StripeCancellationReasonModeEnum {
    immediately
    at_period_end
}

type StripeSubscriptionCancellationReason {
    enabled: Boolean
    options: [StripeSubscriptionCancellationReasonOptionsEnum]
}

enum StripeSubscriptionCancellationReasonOptionsEnum {
    too_expensive
    missing_features
    switched_services
    unused
    customer_service
    too_complex
    low_quality
    other
}

type StripeCustomerPortalFeaturesPaymentMethodUpdate {
    enabled: Boolean
}

type StripeCustomerPortalFeaturesInvoiceHistory {
    enabled: Boolean
}

type StripeCustomerPortalFeaturesCustomerUpdate {
    allowed_updates: [StripeCustomerAllowedUpdatesEnum]
    enabled: Boolean
}

enum StripeCustomerAllowedUpdatesEnum {
    email
    address
    shipping
    phone
    tax_id
}

type StripeBusinessProfile {
    headline: String
    privacy_policy_url: String
    terms_of_service_url: String
}

input StripeCustomerPortalInput {
    customer: String!
    confidguration: StringOrStripeCustomerPortalConfig
    locale: String
    on_behalf_of: String
    return_url: String
}

type Mutation {
    createStripeCustomerPortalSession(variables: StripeCustomerPortalInput): StripeCustomerPortal @skipAuth
}
`