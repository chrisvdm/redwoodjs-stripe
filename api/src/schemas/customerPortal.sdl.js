export const schema = `
scalar Timestamp
scalar Metadata

type StripeCustomerPortal {
    id: ID!
    object: String
    configuration: StripeCustomerPortalConfig 
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

type StripeCustomerPortalConfigList {
    object: String
    has_more: Boolean
    url: String
    data: [StripeCustomerPortalConfig]
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

input StripeCustomerPortalConfigInput {
    id: ID
    object: String
    active: Boolean
    application: String
    business_profile: StripeBusinessProfileInput
    created: Timestamp
    features: StripeCustomerPortalFeaturesInput
    is_default: Boolean
    livemode: Boolean
    metadata: Metadata
    updated: Timestamp
}

input StripeBusinessProfileInput {
    headline: String
    privacy_policy_url: String
    terms_of_service_url: String
}

input StripeCustomerPortalFeaturesInput {
    customer_update: StripeCustomerPortalFeaturesCustomerUpdateInput
    invoice_history: StripeCustomerPortalFeaturesInvoiceHistoryInput
    payment_method_update: StripeCustomerPortalFeaturesPaymentMethodUpdateInput
    subscription_cancel: StripeCustomerPortalFeaturesSubscriptionCancelInput
    subscription_pause: StripeCustomerPortalFeaturesSubscriptionPauseInput
    subscription_update: StripeCustomerPortalFeatureSubscriptionUpdateInput
}

input StripeCustomerPortalFeaturesCustomerUpdateInput {
    allowed_updates: [StripeCustomerAllowedUpdatesEnum]
    enabled: Boolean
}

input StripeCustomerPortalFeaturesInvoiceHistoryInput {
    enabled: Boolean
}

input StripeCustomerPortalFeaturesPaymentMethodUpdateInput {
    enabled: Boolean
}

input StripeCustomerPortalFeaturesSubscriptionCancelInput {
    cancellation_reason: StripeSubscriptionCancellationReasonInput
    enabled: Boolean
    mode: StripeCancellationReasonModeEnum
    proration_behavior: String
}

input StripeSubscriptionCancellationReasonInput {
    enabled: Boolean
    options: [StripeSubscriptionCancellationReasonOptionsEnum]
}

input StripeCustomerPortalFeaturesSubscriptionPauseInput {
    enabled: Boolean
}

input StripeCustomerPortalFeatureSubscriptionUpdateInput {
    default_allowed_updates: [StripeCustomerPortalSubscriptionAllowedUpdatesEnum]
    enabled: Boolean
    products: [StripeCustomerPortalSubscriptionProductsInput]
}

input StripeCustomerPortalSubscriptionProductsInput {
    prices: [String]
    product: String
}

input StripeCustomerPortalInput {
    customer: String!
    configuration: String
    locale: String
    on_behalf_of: String
    return_url: String
}

input StripeCustomerPortalConfigParamsInput {
    active: Boolean
    is_default: Boolean
    limit: Int
    ending_before: String
    starting_after: String
}

type Query {
    listStripeCustomerPortalConfig(params: StripeCustomerPortalConfigParamsInput): StripeCustomerPortalConfigList @requireAuth
}

type Mutation {
    createStripeCustomerPortalConfig(data: StripeCustomerPortalConfigInput): StripeCustomerPortalConfig @skipAuth
    createStripeCustomerPortalSessionSkipAuth(data: StripeCustomerPortalInput): StripeCustomerPortal @skipAuth
    createStripeCustomerPortalSession(data: StripeCustomerPortalInput): StripeCustomerPortal @requireAuth
}
`