// StripePaymentSourceData type incomplete
// StripePaymentSourceOwner type incomplete

export const schema = `
scalar Metadata

scalar Timestamp

scalar StripeInvoiceCreditBalance

type StripeCustomer {
    id: ID
    address: StripeCustomerAddress
    email: String @requireAuth
    description: String
    name: String
    phone: String
    shipping: StripeCustomerShipping
    object: String
    balance: Int
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
    subscriptions: [StripeCustomerSubscription]
    tax: StripeCustomerTax
    tax_exempt: String
    tax_ids: [StripeTaxID]
    test_clock: String
}

type StripeTaxID {
    object: String
    data: [StripeTaxIDData]
    has_more: Boolean
    url: String
}

type StripeTaxIDData {
    id: String
    object: String
    country: String
    created: Timestamp
    customer: String
    livemode: Boolean
    type: String
    value: String
    verification: StripeTaxIDVerification
}

type StripeTaxIDVerification {
    status: String
    verified_address: String
    verified_name: String
}

type StripeCustomerTax {
    automatic_tax: StripeAutomaticTaxEnum
    ip_address: String
    location: StripeCustomerTaxLocation
}

type StripeCustomerTaxLocation {
    country: String
    source: StripeCustomerTaxLocationSourceEnum
    state: String
}

enum StripeCustomerTaxLocationSourceEnum {
    ip_address
    billing_address
    payment_method
    shipping_destination
}

enum StripeAutomaticTaxEnum {
    supported
    not_collecting
    unrecognised_location
    failed
}

type StripeCustomerSubscription {
    object: String
    data: [StripeSubscription]
    has_more: Boolean
    url: String
}

type StripePaymentSource {
    object: String
    data: [StripePaymentSourceData]
    has_more: Boolean
    url: String
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
    country: String
    currency: String
    last4: String
    routing_number: String
    status: String
    active: Boolean
    amount: Int
    amount_received: Int
    bitcoin_amount: Int
    bitcoin_amount_received: Int
    bitcoin_uri: String
    description: String
    email: String
    filled: Boolean
    inbound_address: String
    payment: String
    refund_address: String
    transactions: [StripeTransactions]
    uncaptured_funds: Boolean
    used_for_payment: Boolean
    address_city: String
    address_country: String
    address_line1: String
    address_line1_check: String
    address_line2: String
    address_state: String
    address_zip: String
    address_zip_check: String
    brand: String
    cvc_check: String
    dynamic_last4: String
    exp_month: Int
    exp_year: Int
    funding: String
    name: String
    recipient: String
    tokenization_method: String
    client_secret: String
    code_verification: StripeCodeVerification
    flow: String
    owner: StripePaymentSourceOwner
}

type StripePaymentSourceOwner {
 id: String
}

type StripeCodeVerification {
    attempts_remaining: Int
    status: String
}

type StripeTransactions {
    object: String
    data: StripeTransactionsData
    has_more: Boolean
    url: String
}

type StripeTransactionsData {
    id: String
    object: String
    amount: Int
    bitcoin_amount: Int
    created: Timestamp
    currency: String
    receiver: String
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

input CreateStripeCustomerInput {
    address: CreateStripeCustomerAddressInput
    description: String
    email: String
    metadata: Metadata
    name: String
    payment_method: String
    phone: String
    shipping: CreateStripeCustomerShippingInput
    balance: Int
    cash_balance: CreateStripeCustomerCashBalanceInput
    coupon: String
    invoice_prefix: String
    invoice_settings: CreateStripeCustomerInvoiceSettingsInput
    next_invoice_sequence: String
    preferred_locales: [String]
    promotional_code: String
    source: String
    tax: CreateStripeCustomerTaxInput
    tax_exempt: CreateStripeCustomerTaxExemptEnum
    tax_id_data: [CreateStripeCustomerTaxIDDataInput]
    test_clock: String
}

input CreateStripeCustomerTaxIDDataInput {
    type: String!
    value: Int!
}

enum CreateStripeCustomerTaxExemptEnum {
    none
    exempt
    reverse
}

input CreateStripeCustomerTaxInput {
    ip_address: String
}

input CreateStripeCustomerInvoiceSettingsInput {
    custom_fields: [CreateStripeCustomerInvoiceSettingsCustomFieldsInput]
    default_payment_method: String
    footer: String
    rendering_options: CreateStripeCustomerInvoiceSettingsRenderingOptionsInput
}

input CreateStripeCustomerInvoiceSettingsRenderingOptionsInput {
    amount_tax_display: String
}

input CreateStripeCustomerInvoiceSettingsCustomFieldsInput {
    name: String!
    value: String!
}

input CreateStripeCustomerCashBalanceInput {
    settings: CreateStripeCustomerCashBalanceSettingsInput
}

input CreateStripeCustomerCashBalanceSettingsInput {
    reconciliation_mode: String
}

input CreateStripeCustomerShippingInput {
    address: CreateStripeCustomerAddressInput!
    name: String!
    phone: String
}

input CreateStripeCustomerAddressInput {
    city: String
    country: String
    line1: String
    line2: String
    postal_code: String
    state: String
}

type Query {
    stripeCustomerSearch(query: String): StripeCustomer @requireAuth
    retrieveStripeCustomer(id: String!): StripeCustomer @requireAuth
}

type Mutation {
    createStripeCustomer(data: CreateStripeCustomerInput): StripeCustomer @skipAuth
}
`