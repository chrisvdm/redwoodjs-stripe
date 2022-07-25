export const schema = `
scalar Timestamp

scalar Metadata

type StripeSubscription {
    id: ID!
    cancel_at_period_end: Boolean
    current_period_end: Timestamp
    current_period_start: Timestamp
    customer: String
    default_payment_method: StripePaymentMethod
    description: String
    items: [StripeSubscriptionItem]
    latest_invoice: String
    metadata: Metadata
    pending_setup_intent: String
    pending_update: StripeSubscriptionPendingUpdate
    status: StripeSubscriptionStatusEnum
    object: String
    application: String
    application_fee_percent: Float
    automatic_tax: StripeSubscriptionAutomaticTax
    billing_cycle_anchor: Timestamp
    billing_thresholds: StripeSubscriptionBillingThreshold
    cancel_at: Timestamp
    canceled_at: Timestamp
    collection_method: String
    created: Timestamp
    days_until_due: Int
    default_source: String
    default_tax_rates: [StripeSubscriptionTaxRates]
    discount: StripeDiscount
    ended_at: Timestamp
    livemode: Boolean
    next_pending_invoice_item_invoice: Timestamp
    pause_collection: StripeSubscriptionPauseCollection
    payment_settings: StripeSubscriptionPaymentSettings
    pending_invoice_item_interval: StripeSubscriptionInvoiceInterval
    schedule: String
    start_date: Timestamp
    test_clock: String
    transfer_data: StripeSubscriptionTransferData
    trial_end: Timestamp
    trial_start: Timestamp
}

type StripeSubscriptionTransferData {
    amount_percent: Float
    destination: String
}

type StripeSubscriptionInvoiceInterval {
    interval: String
    interval_count: Int
}

type StripeSubscriptionPaymentSettings {
    payment_method_options: StripeSubscriptionPaymentMethodOptions
    payment_method_types: [StripeSubscriptionPaymentMethodTypesEnum]
    save_default_payment_method: StripeSubscriptionDefaultPaymentMethodEnum
}

enum StripeSubscriptionDefaultPaymentMethodEnum {
    off
    on_subscription
}

enum StripeSubscriptionPaymentMethodTypesEnum {
    ach_credit_transfer
    ach_debit
    acss_debit
    au_becs_debit
    bacs_debit
    bancontact
    boleto
    card
    customer_balance
    eps
    fpx
    giropay
    grabpay
    ideal
    konbini
    link
    p24
    paynow
    promptpay
    sepa_debit
    sofort
    us_bank_account
    wechat_pay
}

type StripeSubscriptionPaymentMethodOptions {
    object: String
}

type StripeSubscriptionPauseCollection {
    behaviour: String
    resumes_at: Timestamp
}

type StripeSubscriptionBillingThreshold {
    amount_gte: Int
    reset_billing_cycle_anchor: Boolean
}

type StripeSubscriptionAutomaticTax {
    enabled: Boolean
}

enum StripeSubscriptionStatusEnum {
    incomplete
    incomplete_expired
    trialing
    active
    past_due
    canceled
    unpaid
}

type StripeSubscriptionPendingUpdate {
    billing_cycle_anchor: Timestamp
    expires_at: Timestamp
    subscription_items: [StripeSubscriptionItem]
    trial_end: Timestamp
    trial_from_plan: Boolean
}

type StripeSubscriptionItem {
    object: String
    data: [StripeSubscriptionItemData]
    has_more: Boolean
    url: String
}

type StripeSubscriptionItemData {
    id: String
    object: String
    billing_thresholds: StripeSubscriptionItemBillingThresholds
    created: Int
    metadata: Metadata
    price: StripeSubscriptionPrice
    quantity: Int
    subscription: String
    tax_rates: StripeSubscriptionTaxRates
}

type StripeSubscriptionTaxRates {
    id: String
    object: String
    active: Boolean
    country: String
    created: Timestamp
    description: String
    display_name: String
    inclusive: Boolean
    juristriction: String
    livemode: Boolean
    metadata: Metadata
    percentage: Float
    state: String
    tax_type: String
}

type StripeSubscriptionPrice {
    id: String
    object: String
    active: Boolean
    billing_scheme: String
    created: Timestamp
    currency: String
    custom_unit_amount: StripeSubscriptionPriceCustomUnitAmount 
    livemode: Boolean
    lookup_key: String
    metadata: Metadata
    nickname: String
    product: String
    recurring: StripeSubscriptionPriceRecurring
    tax_behaviour: String
    tiers: [StripeSubscriptionPriceTier]
    tiers_mode: String
    transform_quantity: StripeSubscriptionPriceTransformQuantity
    type: String
    unit_amount: Int
    unit_amount_decimal: String
}

type StripeSubscriptionPriceTransformQuantity {
    divide_by: Int
    round: StripeTransformQuantityRoundEnum
}

enum StripeTransformQuantityRoundEnum {
    up
    down
}

type StripeSubscriptionPriceTier {
    flat_amount: Int
    flat_amount_decimal: String
    unit_amount: Int
    unit_amount_decimal: String
    up_to: Int
}

type StripeSubscriptionPriceRecurring {
    aggregate_usage: String
    interval: StripeSubscriptionPriceRecurringIntervalEnum
    interval_count: Int
    usage_type: StripeSubscriptionPriceRecurringUsageTypeEnum
}

enum StripeSubscriptionPriceRecurringUsageTypeEnum {
    metered
    licensed
}

enum StripeSubscriptionPriceRecurringIntervalEnum {
    month
    year
    week
    day
}

type StripeSubscriptionPriceCustomUnitAmount {
    maximum: Int
    minimum: Int
    preset: Int
}

type StripeSubscriptionItemBillingThresholds {
    usage_gte: Int
}
`