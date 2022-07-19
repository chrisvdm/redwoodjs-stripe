export const schema = `
scalar Metadata
scalar Hash
scalar Timestamp

type StripePaymentMethod {
    id: ID!
    object: String
    billing_details: StripePaymentMethodBillingDetails
    customer: String
    metadata: Metadata
    type: StripePaymentMethodTypeEnum
    acss_debit: StripeACSSDebit
    affirm: Hash
    afterpay_clearpay: Hash
    alipay: Hash
    au_becs_debit: StripeAUBECSDebit
    bacs_debit: StripeBACSDebit
    bancontact: Hash
    blik: Hash
    boleto: StripeBoleto
    card: StripePaymentMethodCard
}

type StripePaymentMethodCard {
    brand: String
    checks: StripePaymentMethodCardChecks
    country: String
    exp_month: Int
    exp_year: Int
    fingerprint: String
    funding: String
    generated_from: StripePaymentMethodCardGenFrom
}

type StripePaymentMethodCardGenFrom {
    charge: String
    payment_method_details: StripePaymentMethodCardGenFromDetails
    setup_attempt: String
}

type StripePaymentMethodCardGenFromDetails {
    card_present: StripePaymentMethodCardSnapshot
    type: String
}

type StripePaymentMethodCardSnapshot {
    amount_authorized: Int
    brand: String
    capture_before: Timestamp
    cardholder_name: String
    country: String
    emv_auth_data: String
    exp_month: Int
    exp_year: Int
    fingerprint: String
    funding: String
    generated_card: String
    incremental_authorization_supported: Boolean
    last4: String
    network: String
    overcapture_supported: Boolean
    read_method: StripePaymentMethodCardReadMethodEnum
    receipt: StripePaymentMethodCardReceipt
}

type StripePaymentMethodCardReceipt {
    account_type: StripePaymentMethodCardReceiptAccountTypeEnum
    application_cryptogram: String
    application_preferred_name: String
    authorization_code: String
    authorization_response_code: String
    cardholder_verification_method: String
    dedicated_file_name: String
    terminal_verification_results: String
    transaction_status_information: String
}

enum StripePaymentMethodCardReceiptAccountTypeEnum {
    credit
    prepaid
    checking
    unknown
}

enum StripePaymentMethodCardReadMethodEnum {
    contact_emv
    contactless_emv
    magnetic_stripe_track2
    magnetic_stripe_fallback
    contactless_magstripe_mode
}

type StripePaymentMethodCardChecks {
    address_line1_check: String
    address_postal_code_check: String
    cvc_check: String
}

type StripeBoleto {
    fingerprint: String
    tax_id: String
}

type StripeBACSDebit {
    fingerprint: String
    last4: String
    sort_code: String
}

type StripeAUBECSDebit {
    bsb_number: String
    fingerprint: String
    last4: String
}

type StripeACSSDebit {
    bank_name: String
    fingerprint: String
    institution_number: String
    last4: String
    transit_number: String
}

enum StripePaymentMethodTypeEnum {
    acss_debit
    affirm
    afterpay_clearpay
    alipay
    au_becs_debit
    bacs_debit
    bancontact
    blik
    boleto
    card
    card_present
    customer_balance
    eps
    fpx
    giropay
    grabpay
    ideal
    interac_present
    klarna
    konbini
    link
    oxxo
    p24
    paynow
    promptpay
    sepa_debit
    sofort
    us_bank_account
    wechat_pay
}

type StripePaymentMethodBillingDetails {
    address: StripePaymentMethodBillingDetailsAddress
    email: String
    name: String
    phone: String
}

type StripePaymentMethodBillingDetailsAddress {
    city: String
    country: String
    line1: String
    line2: String
    postal_code: String
    state: String
}
`