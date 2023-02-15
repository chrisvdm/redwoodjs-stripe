export const schema = `
  scalar Metadata

  type StripeCheckoutSession {
    id: ID!
    sessionUrl: String
    cancel_url: String
    client_reference_id: String
    currency: String
    customer: String
    customer_email: String
    line_items: [StripeLineItem]
    metadata: Metadata
    mode: StripeCheckoutModeEnum
    payment_intent: String
    payment_method_types: [String]
    payment_status: StripeCheckoutSessionPaymentStatusEnum
    status: StripeCheckoutSessionStatusEnum
    success_url: String
    url: String
    object: String
    after_expiration: StripeCheckoutSessionAfterExpiration
    allow_promotion_codes: Boolean
    amount_subtotal: Int
    amount_total: Int
    automatic_tax: StripeCheckoutSessionAutomaticTax
    billing_address_location: StripeCheckoutSessionBillingAddressEnum
    consent: StripeCheckoutSessionConsent
    consent_collection: StripeCheckoutSessionConsentCollection
    created: String
    custom_text: StripeCheckoutSessionCustomText
    customer_creation: StripeCheckoutSessionCustomerCreationEnum
    customer_details: StripeCheckoutSessionCustomerDetails
    expires_at: String
    invoice: String
    invoice_creation: StripeCheckoutSessionInvoiceCreation
    livemode: Boolean
    locale: String
    payment_link: String
    payment_method_collection: StripeCheckoutSessionCustomerCreationEnum
    payment_method_options: StripeCheckoutSessionPaymentMethodOptions
    phone_number_collection: StripeCheckoutSessionPhoneNumberCollection
    recovered_from: String
    setup_intent: String
    shipping_address_collection: StripeCheckoutSessionShippingAddressCollection
    shipping_cost: StripeCheckoutSessionShippingCost
    shipping_details: StripeCheckoutSessionShippingDetails
    shipping_options: [StripeCheckoutSessionShippingOption]
    submit_type: StripeCheckoutSessionSubmitTypeEnum
    subscription: String
    tax_id_collection: StripeCheckoutSessionTaxIDCollection
    total_details: StripeCheckoutSessionTotalDetails
  }

  type StripeCheckoutSessionTotalDetails {
    amount_discount: Int
    amount_shipping: Int
    amount_tax: Int
    breakdown: StripeCheckoutSessionTotalDetailsBreakdown
  }

  type StripeCheckoutSessionTotalDetailsBreakdown {
    discounts: [StripeCheckoutSessionTotalDetailsBreakdownDiscounts]
    taxes: [StripeCheckoutSessionTotalDetailsBreakdownTaxes]
  }

  type StripeCheckoutSessionTotalDetailsBreakdownTaxes {
    amount: Int
    rate: StripeCheckoutSessionTaxesRate
  }

  type StripeCheckoutSessionTaxesRate {
    id: String
    object: String
    active: Boolean
    country: String
    created: String
    description: String
    display_name: String
    inclusive: Boolean
    juristriction: String
    livemode: Boolean
    metadata: Metadata
    percentage: Int
    state: String
    tax_type: String
  }

  type StripeCheckoutSessionTotalDetailsBreakdownDiscounts {
    amount: Int
    discount: StripeDiscount
  }

  type StripeCheckoutSessionTaxIDCollection {
    enabled: Boolean
  }

  type StripeCheckoutSessionShippingOption {
    shipping_amount: Int
    shipping_rate: String
  }

  type StripeCheckoutSessionShippingDetails {
    address: StripeCheckoutSessionCustomerDetailsAddress
    name: String
  }

  type StripeCheckoutSessionShippingCost {
    amount_subtotal: Int
    amount_tax: Int
    amount_total: Int
    shipping_rate: String
    taxes: [StripeCheckoutSessionShippingCost]
  }

  type StripeCheckoutSessionShippingCost {
    amount: Int
    rate: StripeCheckoutSessionShippingCostRate
  }

  type StripeCheckoutSessionShippingCostRate {
    id: String
    object: String
    active: Boolean
    country: String
    created: String
    description: String
    display_name: String
    inclusive: Boolean
    juristriction: String
    livemode: Boolean
    metadata: Metadata
    percentage: Int
    state: String
    tax_type: String
  }

  type StripeCheckoutSessionShippingAddressCollection {
    allowed_countries: [StripeCheckoutSessionShippingAddressCollectionAllowedCountriesEnum]
  }

  type StripeCheckoutSessionPhoneNumberCollection {
    enabled: Boolean
  }

  type StripeCheckoutSessionPaymentMethodOptions {
    acss_debit: StripePaymentOptionsACSSDebit
    affirm: StripePaymentOptionsSetupFutureUseNone
    afterpay_clearpay: StripePaymentOptionsSetupFutureUseNone
    alipay: StripePaymentOptionsSetupFutureUseNone
    au_becs_debit: StripePaymentOptionsSetupFutureUseNone
    bacs_debit: StripePaymentOptionsSetupFutureUse
    bancontact: StripePaymentOptionsSetupFutureUseNone
    boleto: StripePaymentOptionsBoleto
    card: StripePaymentOptionsCard
    customer_balance: StripePaymentOptionsCustomerBalance
    eps: StripePaymentOptionsSetupFutureUseNone
    fpx: StripePaymentOptionsSetupFutureUseNone
    giropay: StripePaymentOptionsSetupFutureUseNone
    grabpay: StripePaymentOptionsSetupFutureUseNone
    ideal: StripePaymentOptionsSetupFutureUseNone
    klarna: StripePaymentOptionsSetupFutureUse
    konbini: StripePaymentOptionsKonbini
    oxxo: StripePaymentOptionsOXXO
    p24: StripePaymentOptionsSetupFutureUseNone
    paynow: StripePaymentOptionsSetupFutureUseNone
    pix: StripePaymentsOptionsPix
    sepa_debit: StripePaymentOptionsSetupFutureUse
    sofort: StripePaymentOptionsSetupFutureUseNone
    us_bank_account: StripePaymentOptionsUSBankAccount
  }

  type StripePaymentsOptionsPix {
    expires_after_seconds: Int
  }

  type StripePaymentOptionsUSBankAccount {
    financial_connections: StripeCheckoutFinancialConnections
    setup_future_usage: StripePaymentOptionsSetupFutureUseEnum
    verification_method: StripePaymentOptionsVerificationMethodEnum
  }

  type StripeCheckoutFinancialConnections {
    permissions: [StripeCheckoutFinancialConnectionsEnum]
  }

  type StripePaymentOptionsPix {
    expires_after_seconds: Int
  }

  type StripePaymentOptionsOXXO {
    expires_after_days: Int
    setup_future_usage: StripePaymentOptionsSetupFutureUseNoneEnum
  }

  type StripePaymentOptionsKonbini {
    expires_after_days: Int
    setup_future_usage: StripePaymentOptionsSetupFutureUseNoneEnum
  }

  type StripePaymentOptionsSetupFutureUse {
    setup_future_usage: StripePaymentOptionsSetupFutureUseEnum
  }

  type StripePaymentOptionsSetupFutureUseNone {
    setup_future_usage: StripePaymentOptionsSetupFutureUseNoneEnum
  }


  type StripePaymentOptionsCustomerBalance {
    bank_transfer: StripePaymentOptionsCustomerBalanceBankTransfer
    funding_type: String
    setup_future_usage: StripePaymentOptionsSetupFutureUseNoneEnum
  }

  type StripePaymentOptionsCustomerBalanceBankTransfer {
    eu_bank_transfer: StripePaymentOptionsCustomerBalanceBankTransferEU
    requested_address_types: [StripePaymentOptionsCustomerBalanceBankTransferAddressTypesEnum]
    type: StripePaymentOptionsCustomerBalanceBankTransferEnum
  }

  type StripePaymentOptionsCustomerBalanceBankTransferEU {
    country: String
  }

  type StripePaymentOptionsCard {
    installments: StripePaymentOptionsCardInstallments
    setup_future_usage: StripePaymentOptionsSetupFutureUseEnum
    statement_descriptor_suffix_kana: String
    statement_descriptor_suffix_kanji: String
  }

  type StripePaymentOptionsCardInstallments {
    enabled: Boolean
  }

  type StripePaymentOptionsBoleto {
    expires_after_days: Int
    setup_future_usage: StripePaymentOptionsSetupFutureUseEnum
  }

  type StripePaymentOptionsACSSDebit {
    currency: StripePaymentOptionsACSSDebitCurrencyEnum
    mandate_options: StripePaymentOptionsACSSDebitMandateOptions
    setup_future_usage: StripePaymentOptionsSetupFutureUseEnum
    verification_method: StripePaymentOptionsVerificationMethodEnum
  }

  type StripePaymentOptionsACSSDebitMandateOptions {
    custom_mandate_url: String
    default_for: StripePaymentOptionsACSSDebitMandateOptionsDefaultForEnum
    interval_description: String
    payment_schedule: StripePaymentOptionsACSSDebitMandateOptionsPaymentScheduleEnum
    transaction_type: StripePaymentOptionsACSSDebitMandateOptionsTransactionTypeEnum
  }

  type StripeCheckoutSessionInvoiceCreation {
    enabled: Boolean
    invoice_data: StripeCheckoutSessionInvoiceCreationData
  }

  type StripeCheckoutSessionInvoiceCreationData {
    account_tax_ids: [String]
    custom_fields: [StripeCheckoutSessionInvoiceCreationDataCustomFields]
    description: String
    footer: String
    metadata: Metadata
    rendering_options: StripeCheckoutSessionInvoiceCreationDataRenderingOptions
  }

  type StripeCheckoutSessionInvoiceCreationDataRenderingOptions {
    amount_tax_display: String
  }

  type StripeCheckoutSessionInvoiceCreationDataCustomFields {
    name: String
    value: String
  }

  type StripeCheckoutSessionCustomerDetails {
    address: StripeCheckoutSessionCustomerDetailsAddress
    email: String
    name: String
    phone: String
    tax_exempt: String
    tax_ids: StripeCheckoutSessionCustomerDetailsTaxIDs
  }

  type StripeCheckoutSessionCustomerDetailsTaxIDs {
    type: String
    value: String
  }

  type StripeCheckoutSessionCustomerDetailsAddress {
    city: String
    country: String
    line1: String
    line2: String
    postal_code: String
    state: String
  }

  type StripeCheckoutSessionCustomText {
    shipping_address: StripeCheckoutSessionCustomTextAddress
    submit: StripeCheckoutSessionCustomTextSubmit
  }

  type StripeCheckoutSessionCustomTextSubmit {
    message: String
  }

  type StripeCheckoutSessionCustomTextAddress {
    message: String
  }

  type StripeCheckoutSessionConsentCollection {
    promotions: String
    terms_of_service: String
  }

  type StripeCheckoutSessionConsent {
    promotions: String
    terms_of_service: StripeCheckoutSessionConsentTOSEnum
  }

  type StripeCheckoutSessionAutomaticTax {
    enabled: Boolean
    status: StripeCheckoutSessionAutomaticTaxStatusEnum
  }

  type StripeCheckoutSessionAfterExpiration {
    recovery: StripeCheckoutSessionAfterExpirationRecovery
  }

  type StripeCheckoutSessionAfterExpirationRecovery {
    allow_promotion_codes: Boolean
    enabled: Boolean
    enabled_at: String
    url: String
  }

  type StripeLineItem {
    object: String
    data: [StripeLineItemData]
  }

  type StripeLineItemData {
    id: ID!
    object: String
    amount_discount: Int
    amount_subtotal: Int
    amount_tax: Int
    currency: String
    description: String
    discounts: [StripeLineItemDiscount]
    price: StripeLineItemPrice
    quantity: Int
    taxes: [StripeLineItemTaxes]
    has_more: Boolean
    url: String
  }

  type StripeLineItemTaxes {
    amount: Int
    rate: StripeCheckoutSessionTaxesRate
  }

  type StripeLineItemPrice {
    id: String
    object: String
    active: Boolean
    billing_scheme: String
    created: String
    currency: String
    currency_options: StripeLineItemPriceCurrencyOptions
    custom_unit_amount: StripeLineItemPriceCustomUnitAmount
    livemode: Boolean
    lookup_key: String
    metadata: Metadata
    nickname: String
    product: String
    recurring: StripeLineItemPriceRecurring
    tax_behavior: String
    tiers: [StripeLineItemPriceTiers]
    tiers_mode: String
    transform_quantity: StripeLineItemPriceTransformQuantity
    type: String
    unit_amount: Int
    unit_amount_decimal: Float
  }

  type StripeLineItemPriceTransformQuantity {
    divide_by: Int
    round: StripeLineItemPriceTransformQuantityRoundEnum
  }

  type StripeLineItemPriceTiers {
    flat_amount: Int
    flat_amount_decimal: Float
    unit_amount: Int
    unit_amount_decimal: Float
    up_to: Int
  }

  type StripeLineItemPriceRecurring {
    aggregate_usage: String
    interval: StripeLineItemPriceRecurringIntervalEnum
    interval_count: Int
    usage_type: StripeLineItemPriceRecurringUsageTypeEnum
  }

  enum StripeLineItemPriceTransformQuantityRoundEnum {
    up
    down
  }

  enum StripeLineItemPriceRecurringUsageTypeEnum {
    metered
    licensed
  }

  enum StripeLineItemPriceRecurringIntervalEnum {
    month
    year
    week
    day
  }

  type StripeLineItemPriceCustomUnitAmount {
    maximum: Int
    minimum: Int
    preset: Int
  }

  scalar StripeLineItemPriceCurrencyOptions

  type StripeLineItemDiscount {
    amount: Int
    discount: StripeDiscount
  }

  enum StripePaymentOptionsCustomerBalanceBankTransferEnum {
    eu_bank_transfer
    gb_bank_transfer
    jp_bank_transfer
    mx_bank_transfer
  }

  enum StripeLineItemPriceRecurringUsageTypeEnum {
    metered
    licensed
  }

  enum StripeLineItemPriceRecurringIntervalEnum {
    month
    year
    week
    day
  }

  enum StripePaymentOptionsCustomerBalanceBankTransferAddressTypesEnum {
    sort_code
    zengin
    sepa
    spei
    iban
  }


  enum StripePaymentOptionsVerificationMethodEnum {
    automatic
    instant
    microdeposits
  }

  enum StripePaymentOptionsACSSDebitMandateOptionsTransactionTypeEnum {
    personal
    business
  }

  enum StripePaymentOptionsACSSDebitMandateOptionsPaymentScheduleEnum {
    interval
    sporadic
    combined
  }

  enum StripePaymentOptionsACSSDebitMandateOptionsDefaultForEnum {
    invoice
    subscription
  }

  enum StripePaymentOptionsACSSDebitCurrencyEnum {
    cad
    usd
  }

   enum StripePaymentOptionsSetupFutureUseNoneEnum {
    none
  }

  enum StripePaymentOptionsVerificationMethodEnum {
    automatic
    instant
  }

  enum StripePaymentOptionsSetupFutureUseEnum {
    on_session
    off_session
    none
  }

  enum StripeCheckoutFinancialConnectionsEnum {
    payment_method
    balances
    transactions
    ownership
  }

  enum StripeCheckoutSessionSubmitTypeEnum {
    auto
    pay
    book
    donate
  }

  enum StripeCheckoutSessionCustomerCreationEnum {
    if_required
    always
  }

  enum StripeCheckoutSessionConsentTOSEnum {
    accepted
  }

  enum StripeCheckoutSessionBillingAddressEnum {
    auto
    required
  }

  enum StripeCheckoutSessionAutomaticTaxStatusEnum {
    requires_location_inputs
    complete
    failed
  }

  enum StripeCheckoutSessionStatusEnum {
    open
    complete
    expired
  }

  enum StripeCheckoutSessionPaymentStatusEnum {
    paid
    unpaid
    no_payment_required
  }

  enum StripeCheckoutModeEnum {
    payment
    subscription
    setup
  }

  enum StripeCheckoutSessionShippingAddressCollectionAllowedCountriesEnum {
    AC
    AD
    AE
    AF
    AG
    AI
    AL
    AM
    AO
    AQ
    AR
    AT
    AU
    AW
    AX
    AZ
    BA
    BB
    BD
    BE
    BF
    BG
    BH
    BI
    BJ
    BL
    BM
    BN
    BO
    BQ
    BR
    BS
    BT
    BV
    BW
    BY
    BZ
    CA
    CD
    CF
    CG
    CH
    CI
    CK
    CL
    CM
    CN
    CO
    CR
    CV
    CW
    CY
    CZ
    DE
    DJ
    DK
    DM
    DO
    DZ
    EC
    EE
    EG
    EH
    ER
    ES
    ET
    FI
    FJ
    FK
    FO
    FR
    GA
    GB
    GD
    GE
    GF
    GG
    GH
    GI
    GL
    GM
    GN
    GP
    GQ
    GR
    GS
    GT
    GU
    GW
    GY
    HK
    HN
    HR
    HT
    HU
    ID
    IE
    IL
    IM
    IN
    IO
    IQ
    IS
    IT
    JE
    JM
    JO
    JP
    KE
    KG
    KH
    KI
    KM
    KN
    KR
    KW
    KY
    KZ
    LA
    LB
    LC
    LI
    LK
    LR
    LS
    LT
    LU
    LV
    LY
    MA
    MC
    MD
    ME
    MF
    MG
    MK
    ML
    MM
    MN
    MO
    MQ
    MR
    MS
    MT
    MU
    MV
    MW
    MX
    MY
    MZ
    NA
    NC
    NE
    NG
    NI
    NL
    NO
    NP
    NR
    NU
    NZ
    OM
    PA
    PE
    PF
    PG
    PH
    PK
    PL
    PM
    PN
    PR
    PS
    PT
    PY
    QA
    RE
    RO
    RS
    RU
    RW
    SA
    SB
    SC
    SE
    SG
    SH
    SI
    SJ
    SK
    SL
    SM
    SN
    SO
    SR
    SS
    ST
    SV
    SX
    SZ
    TA
    TC
    TD
    TF
    TG
    TH
    TJ
    TK
    TL
    TM
    TN
    TO
    TR
    TT
    TV
    TW
    TZ
    UA
    UG
    US
    UY
    UZ
    VA
    VC
    VE
    VG
    VN
    VU
    WF
    WS
    XK
    YE
    YT
    ZA
    ZM
    ZW
    ZZ
  }

  input ProductInput {
    id: ID!
    quantity: Int!
  }

  input StripeCustomerInput {
    id: String!
    email: String
    name: String
  }

  type Query {
    retrieveStripeCheckoutSession(id: ID!): StripeCheckoutSession! @skipAuth
  }

  type Mutation {
    # In GraphQL, we can't reuse types as mutation inputs
    # (otherwise we'd just type "cart" as "[Product!]!")
    checkout(cart: [ProductInput!]!, cancelUrl: String, successUrl: String, customer: StripeCustomerInput, mode: StripeCheckoutModeEnum): StripeCheckoutSession! @skipAuth
  }
`