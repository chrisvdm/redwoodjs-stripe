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
    amount_subtotal: Integer
    amount_total: Integer
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
    locale: StripeCheckoutSessionLocaleEnum
    payment_link: String
    payment_method_collection: StripeCheckoutSessionCustomerCreationEnum
    payment_method_options: StripeCheckoutSessionPaymentMethodOptions
    phone_number_collection: StripeCheckoutSessionPhoneNumberCollection
    recovered_from: String
    setup_intent: String
    shipping_address_collection: StripeCheckoutSessionShippingAddressCollection
    shipping_cost: StripeCheckoutSessionShippingCost
    shipping_details: StripeCheckoutSessionShippingDetails
  }

  type StripeCheckoutSessionShippingDetails {
    address: StripeCheckoutSessionCustomerDetailsAddress
    name: String
  }

  type StripeCheckoutSessionShippingCost {
    amount_subtotal: Integer
    amount_tax: Integer
    amount_total: Integer
    shipping_rate: String
    taxes: [StripeCheckoutSessionShippingCost]
  }

  type StripeCheckoutSessionShippingCost {
    amount: Integer
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
    percentage: Integer
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
    amount_discount: Integer
    amount_subtotal: Integer
    amount_tax: Integer
    currency: String
    description: String
    discounts: [StripeLineItemDiscount]
    price: StripeLineItemPrice
    quantity: Integer
    taxes: [StripeLineItemTaxes]
    has_more: Boolean
    url: String
  }

  type StripeLineItemTaxes {

  }

  type StripeLineItemPrice {

  }

  type StripeLineItemDiscount {

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

  enum StripeCheckoutSessionLocaleEnum {
    auto
    bg
    cs
    da
    de
    el
    en
    en-GB
    es
    es-419
    et
    fi
    fil
    fr
    fr-CA
    hr
    hu
    id
    it
    ja
    ko
    lt
    lv
    ms
    mt
    nb
    nl
    pl
    pt
    pt-BR
    ro
    ru
    sk
    sl
    sv
    th
    tr
    vi
    zh
    zh-HK
    zh-TW
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
