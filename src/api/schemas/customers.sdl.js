export const schema = `
scalar Metadata

scalar Timestamp

scalar StripeInvoiceCreditBalance

type StripeCustomer {
    id: ID!
    address: StripeCustomerAddress
    description: String
    name: String
    phone: String
    shipping: StripeCustomerShipping
    object: String
    balance: Integer
    cash_balance: StripeCustomerCashBalance
    created: String
    currency: String
    default_currency: String
    default_source: String
    delinquent: Boolean
    discount: StripeDiscount
    metadata: Metadata
    invoice_credit_balance: StripeInvoiceCreditBalance
    invoice_prefix: String
    invoice_settings: StripeInvoiceSettings
    livemode: Boolean
    next_invoice_sequence: Int
    preferred_locales: [String]
    sources: [StripePaymentSource]
}

type StripePaymentSource {
    object: String
    data: StripePaymentSourceData
}

type StripePaymentSourceData {
    id: ID!
    object: String
    created: Timestamp
    customer: String
    fingerprint: String
    livemode: Boolean
    metadata: Metadata
    payment_amount: Int
    payment_currency: String
    reusable: Boolean
    used: Boolean
    username: String
    account: String
    account_holder_name: String
    account_holder_type: String
    account_type: String
    available_payment_methods: [String]
    bank_name: String
}

type StripeInvoiceSettings {
    custom_fields: [StripeCustomFields]
    default_payment_method: String
    footer: String
    rendering_options: StripeRenderingOptions
}

type StripeRenderingOptions {
    amount_tax_display: String
}

type StripeCustomFields {
    name: String
    value: String
}

type StripeCustomerAddress {
    city: String
    country: String
    line1: String
    line2: String
    postal_code: String
    state: String
}

type StripeCustomerShipping {
    address: StripeCustomerAddress
    name: String
    phone: String
}

type StripeCustomerCashBalance {
    object: String
    available: String
    customer: ID
    livemode: Boolean
    settings: StripeCashBalanceSettings
}

type StripeCashBalanceSettings {
    reconciliation_mode: String
}

  type Mutation {
    stripeCustomerSearch(query: String): Customer! @skipAuth
  }
`