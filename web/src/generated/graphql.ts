/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  Hash: { input: any; output: any; }
  Metadata: { input: any; output: any; }
  StripeInvoiceCreditBalance: { input: any; output: any; }
  StripeLineItemPriceCurrencyOptions: { input: any; output: any; }
  Timestamp: { input: any; output: any; }
  URL: { input: any; output: any; }
};

export type AutomaticTaxInput = {
  enabled: Scalars['Boolean']['input'];
};

export type CreateStripeCustomerAddressInput = {
  city: InputMaybe<Scalars['String']['input']>;
  country: InputMaybe<Scalars['String']['input']>;
  line1: InputMaybe<Scalars['String']['input']>;
  line2: InputMaybe<Scalars['String']['input']>;
  postal_code: InputMaybe<Scalars['String']['input']>;
  state: InputMaybe<Scalars['String']['input']>;
};

export type CreateStripeCustomerCashBalanceInput = {
  settings: InputMaybe<CreateStripeCustomerCashBalanceSettingsInput>;
};

export type CreateStripeCustomerCashBalanceSettingsInput = {
  reconciliation_mode: InputMaybe<StripeReconciliationModeEnum>;
};

export type CreateStripeCustomerInput = {
  address: InputMaybe<CreateStripeCustomerAddressInput>;
  balance: InputMaybe<Scalars['Int']['input']>;
  cash_balance: InputMaybe<CreateStripeCustomerCashBalanceInput>;
  coupon: InputMaybe<Scalars['String']['input']>;
  description: InputMaybe<Scalars['String']['input']>;
  email: InputMaybe<Scalars['String']['input']>;
  invoice_prefix: InputMaybe<Scalars['String']['input']>;
  invoice_settings: InputMaybe<CreateStripeCustomerInvoiceSettingsInput>;
  metadata: InputMaybe<Scalars['Metadata']['input']>;
  name: InputMaybe<Scalars['String']['input']>;
  next_invoice_sequence: InputMaybe<Scalars['Int']['input']>;
  payment_method: InputMaybe<Scalars['String']['input']>;
  phone: InputMaybe<Scalars['String']['input']>;
  preferred_locales: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  promotional_code: InputMaybe<Scalars['String']['input']>;
  shipping: InputMaybe<CreateStripeCustomerShippingInput>;
  source: InputMaybe<Scalars['String']['input']>;
  tax: InputMaybe<CreateStripeCustomerTaxInput>;
  tax_exempt: InputMaybe<CreateStripeCustomerTaxExemptEnum>;
  tax_id_data: InputMaybe<Array<InputMaybe<CreateStripeCustomerTaxIdDataInput>>>;
  test_clock: InputMaybe<Scalars['String']['input']>;
};

export type CreateStripeCustomerInvoiceSettingsCustomFieldsInput = {
  name: Scalars['String']['input'];
  value: Scalars['String']['input'];
};

export type CreateStripeCustomerInvoiceSettingsInput = {
  custom_fields: InputMaybe<Array<InputMaybe<CreateStripeCustomerInvoiceSettingsCustomFieldsInput>>>;
  default_payment_method: InputMaybe<Scalars['String']['input']>;
  footer: InputMaybe<Scalars['String']['input']>;
  rendering_options: InputMaybe<CreateStripeCustomerInvoiceSettingsRenderingOptionsInput>;
};

export type CreateStripeCustomerInvoiceSettingsRenderingOptionsInput = {
  amount_tax_display: InputMaybe<StripeAmountTaxDisplayEnum>;
};

export type CreateStripeCustomerShippingInput = {
  address: CreateStripeCustomerAddressInput;
  name: Scalars['String']['input'];
  phone: InputMaybe<Scalars['String']['input']>;
};

export type CreateStripeCustomerTaxExemptEnum =
  | 'exempt'
  | 'none'
  | 'reverse';

export type CreateStripeCustomerTaxIdDataInput = {
  type: TaxIdDatumType;
  value: Scalars['String']['input'];
};

export type CreateStripeCustomerTaxInput = {
  ip_address: InputMaybe<Scalars['String']['input']>;
};

export type ListStripeSubscriptionsInput = {
  params: InputMaybe<ListStripeSubscriptionsParamsInput>;
};

export type ListStripeSubscriptionsParamsInput = {
  automatic_tax: InputMaybe<AutomaticTaxInput>;
  collection_method: InputMaybe<StripeSubscriptionCollectionMethodEnum>;
  created: InputMaybe<Scalars['Int']['input']>;
  current_period_end: InputMaybe<Scalars['Int']['input']>;
  current_period_start: InputMaybe<Scalars['Int']['input']>;
  customer: InputMaybe<Scalars['ID']['input']>;
  ending_before: InputMaybe<Scalars['String']['input']>;
  limit: InputMaybe<Scalars['Int']['input']>;
  price: InputMaybe<Scalars['ID']['input']>;
  starting_after: InputMaybe<Scalars['String']['input']>;
  status: InputMaybe<StripeSubscriptionStatusEnum>;
  test_clock: InputMaybe<Scalars['String']['input']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  checkout: StripeCheckoutSession;
  createStripeCustomer: Maybe<StripeCustomer>;
  createStripeCustomerPortalConfig: Maybe<StripeCustomerPortalConfig>;
  createStripeCustomerPortalSession: Maybe<StripeCustomerPortal>;
  createStripeCustomerPortalSessionSkipAuth: Maybe<StripeCustomerPortal>;
};


export type MutationCheckoutArgs = {
  allowPromotionCodes: InputMaybe<Scalars['Boolean']['input']>;
  cancelUrl: InputMaybe<Scalars['String']['input']>;
  cart: Array<ProductInput>;
  customer: InputMaybe<StripeCustomerInput>;
  mode: InputMaybe<StripeCheckoutModeEnum>;
  successUrl: InputMaybe<Scalars['String']['input']>;
};


export type MutationCreateStripeCustomerArgs = {
  data: InputMaybe<CreateStripeCustomerInput>;
};


export type MutationCreateStripeCustomerPortalConfigArgs = {
  data: InputMaybe<StripeCustomerPortalConfigInput>;
};


export type MutationCreateStripeCustomerPortalSessionArgs = {
  data: InputMaybe<StripeCustomerPortalInput>;
};


export type MutationCreateStripeCustomerPortalSessionSkipAuthArgs = {
  data: InputMaybe<StripeCustomerPortalInput>;
};

export type ProductInput = {
  id: Scalars['ID']['input'];
  quantity: Scalars['Int']['input'];
};

export type Query = {
  __typename?: 'Query';
  listStripeCustomerPortalConfig: Maybe<StripeCustomerPortalConfigList>;
  listStripeSubscriptions: Maybe<Array<Maybe<StripeSubscription>>>;
  retrieveStripeCheckoutSession: StripeCheckoutSession;
  retrieveStripeCustomer: Maybe<StripeCustomer>;
  stripeCustomerSearch: Maybe<StripeCustomer>;
  stripeItem: Maybe<StripeItem>;
  stripeItems: Array<StripeItem>;
};


export type QueryListStripeCustomerPortalConfigArgs = {
  params: InputMaybe<StripeCustomerPortalConfigParamsInput>;
};


export type QueryListStripeSubscriptionsArgs = {
  data: InputMaybe<ListStripeSubscriptionsInput>;
};


export type QueryRetrieveStripeCheckoutSessionArgs = {
  id: Scalars['ID']['input'];
};


export type QueryRetrieveStripeCustomerArgs = {
  data: InputMaybe<RetrieveStripeCustomerInput>;
};


export type QueryStripeCustomerSearchArgs = {
  query: InputMaybe<Scalars['String']['input']>;
};


export type QueryStripeItemArgs = {
  id: Scalars['ID']['input'];
};


export type QueryStripeItemsArgs = {
  params: InputMaybe<StripeItemsParamsInput>;
};

export type RetrieveStripeCustomerInput = {
  addProps: InputMaybe<StripeAdditionalPropertiesInput>;
  id: Scalars['ID']['input'];
};

export type StripeAcssDebit = {
  __typename?: 'StripeACSSDebit';
  bank_name: Maybe<Scalars['String']['output']>;
  fingerprint: Maybe<Scalars['String']['output']>;
  institution_number: Maybe<Scalars['String']['output']>;
  last4: Maybe<Scalars['String']['output']>;
  transit_number: Maybe<Scalars['String']['output']>;
};

export type StripeAubecsDebit = {
  __typename?: 'StripeAUBECSDebit';
  bsb_number: Maybe<Scalars['String']['output']>;
  fingerprint: Maybe<Scalars['String']['output']>;
  last4: Maybe<Scalars['String']['output']>;
};

export type StripeAdditionalPropertiesInput = {
  expand: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type StripeAmountTaxDisplayEnum =
  | 'exclude_tax'
  | 'include_inclusive_tax';

export type StripeAppliesTo = {
  __typename?: 'StripeAppliesTo';
  products: Maybe<Array<Maybe<Scalars['String']['output']>>>;
};

export type StripeAutomaticTaxEnum =
  | 'failed'
  | 'not_collecting'
  | 'supported'
  | 'unrecognised_location';

export type StripeBacsDebit = {
  __typename?: 'StripeBACSDebit';
  fingerprint: Maybe<Scalars['String']['output']>;
  last4: Maybe<Scalars['String']['output']>;
  sort_code: Maybe<Scalars['String']['output']>;
};

export type StripeBoleto = {
  __typename?: 'StripeBoleto';
  fingerprint: Maybe<Scalars['String']['output']>;
  tax_id: Maybe<Scalars['String']['output']>;
};

export type StripeBusinessProfile = {
  __typename?: 'StripeBusinessProfile';
  headline: Maybe<Scalars['String']['output']>;
  privacy_policy_url: Maybe<Scalars['String']['output']>;
  terms_of_service_url: Maybe<Scalars['String']['output']>;
};

export type StripeBusinessProfileInput = {
  headline: InputMaybe<Scalars['String']['input']>;
  privacy_policy_url: InputMaybe<Scalars['String']['input']>;
  terms_of_service_url: InputMaybe<Scalars['String']['input']>;
};

export type StripeCancellationReasonModeEnum =
  | 'at_period_end'
  | 'immediately';

export type StripeCashBalanceSettings = {
  __typename?: 'StripeCashBalanceSettings';
  reconciliation_mode: Maybe<StripeReconciliationModeEnum>;
};

export type StripeCheckoutFinancialConnections = {
  __typename?: 'StripeCheckoutFinancialConnections';
  permissions: Maybe<Array<Maybe<StripeCheckoutFinancialConnectionsEnum>>>;
};

export type StripeCheckoutFinancialConnectionsEnum =
  | 'balances'
  | 'ownership'
  | 'payment_method'
  | 'transactions';

export type StripeCheckoutModeEnum =
  | 'payment'
  | 'setup'
  | 'subscription';

export type StripeCheckoutPaymentMethodTypeEnum =
  | 'acss_debit'
  | 'affirm'
  | 'afterpay_clearpay'
  | 'alipay'
  | 'amazon_pay'
  | 'au_becs_debit'
  | 'bacs_debi'
  | 'bancontact'
  | 'blik'
  | 'boleto'
  | 'card'
  | 'cashapp'
  | 'customer_balance'
  | 'eps'
  | 'fpx'
  | 'giropay'
  | 'grabpay'
  | 'ideal'
  | 'klarna'
  | 'konbini'
  | 'link'
  | 'mobilepay'
  | 'multibanco'
  | 'oxxo'
  | 'p24'
  | 'paynow'
  | 'paypal'
  | 'pix'
  | 'promptpay'
  | 'revolut_pay'
  | 'sepa_debit'
  | 'sofort'
  | 'swish'
  | 'twint'
  | 'us_bank_account'
  | 'wechat_pay'
  | 'zip';

export type StripeCheckoutSession = {
  __typename?: 'StripeCheckoutSession';
  after_expiration: Maybe<StripeCheckoutSessionAfterExpiration>;
  allow_promotion_codes: Maybe<Scalars['Boolean']['output']>;
  amount_subtotal: Maybe<Scalars['Int']['output']>;
  amount_total: Maybe<Scalars['Int']['output']>;
  automatic_tax: Maybe<StripeCheckoutSessionAutomaticTax>;
  billing_address_location: Maybe<StripeCheckoutSessionBillingAddressEnum>;
  cancel_url: Maybe<Scalars['String']['output']>;
  client_reference_id: Maybe<Scalars['String']['output']>;
  consent: Maybe<StripeCheckoutSessionConsent>;
  consent_collection: Maybe<StripeCheckoutSessionConsentCollection>;
  created: Maybe<Scalars['String']['output']>;
  currency: Maybe<Scalars['String']['output']>;
  custom_text: Maybe<StripeCheckoutSessionCustomText>;
  customer: Maybe<Scalars['String']['output']>;
  customer_creation: Maybe<StripeCheckoutSessionCustomerCreationEnum>;
  customer_details: Maybe<StripeCheckoutSessionCustomerDetails>;
  customer_email: Maybe<Scalars['String']['output']>;
  expires_at: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  invoice: Maybe<Scalars['String']['output']>;
  invoice_creation: Maybe<StripeCheckoutSessionInvoiceCreation>;
  line_items: Maybe<Array<Maybe<StripeLineItem>>>;
  livemode: Maybe<Scalars['Boolean']['output']>;
  locale: Maybe<Scalars['String']['output']>;
  metadata: Maybe<Scalars['Metadata']['output']>;
  mode: Maybe<StripeCheckoutModeEnum>;
  object: Maybe<Scalars['String']['output']>;
  payment_intent: Maybe<Scalars['String']['output']>;
  payment_link: Maybe<Scalars['String']['output']>;
  payment_method_collection: Maybe<StripeCheckoutSessionCustomerCreationEnum>;
  payment_method_options: Maybe<StripeCheckoutSessionPaymentMethodOptions>;
  payment_method_types: Maybe<Array<Maybe<StripeCheckoutPaymentMethodTypeEnum>>>;
  payment_status: Maybe<StripeCheckoutSessionPaymentStatusEnum>;
  phone_number_collection: Maybe<StripeCheckoutSessionPhoneNumberCollection>;
  recovered_from: Maybe<Scalars['String']['output']>;
  sessionUrl: Maybe<Scalars['String']['output']>;
  setup_intent: Maybe<Scalars['String']['output']>;
  shipping_address_collection: Maybe<StripeCheckoutSessionShippingAddressCollection>;
  shipping_cost: Maybe<StripeCheckoutSessionShippingCost>;
  shipping_details: Maybe<StripeCheckoutSessionShippingDetails>;
  shipping_options: Maybe<Array<Maybe<StripeCheckoutSessionShippingOption>>>;
  status: Maybe<StripeCheckoutSessionStatusEnum>;
  submit_type: Maybe<StripeCheckoutSessionSubmitTypeEnum>;
  subscription: Maybe<Scalars['String']['output']>;
  success_url: Maybe<Scalars['String']['output']>;
  tax_id_collection: Maybe<StripeCheckoutSessionTaxIdCollection>;
  total_details: Maybe<StripeCheckoutSessionTotalDetails>;
  url: Maybe<Scalars['String']['output']>;
};

export type StripeCheckoutSessionAfterExpiration = {
  __typename?: 'StripeCheckoutSessionAfterExpiration';
  recovery: Maybe<StripeCheckoutSessionAfterExpirationRecovery>;
};

export type StripeCheckoutSessionAfterExpirationRecovery = {
  __typename?: 'StripeCheckoutSessionAfterExpirationRecovery';
  allow_promotion_codes: Maybe<Scalars['Boolean']['output']>;
  enabled: Maybe<Scalars['Boolean']['output']>;
  enabled_at: Maybe<Scalars['String']['output']>;
  url: Maybe<Scalars['String']['output']>;
};

export type StripeCheckoutSessionAutomaticTax = {
  __typename?: 'StripeCheckoutSessionAutomaticTax';
  enabled: Maybe<Scalars['Boolean']['output']>;
  status: Maybe<StripeCheckoutSessionAutomaticTaxStatusEnum>;
};

export type StripeCheckoutSessionAutomaticTaxStatusEnum =
  | 'complete'
  | 'failed'
  | 'requires_location_inputs';

export type StripeCheckoutSessionBillingAddressEnum =
  | 'auto'
  | 'required';

export type StripeCheckoutSessionConsent = {
  __typename?: 'StripeCheckoutSessionConsent';
  promotions: Maybe<Scalars['String']['output']>;
  terms_of_service: Maybe<StripeCheckoutSessionConsentTosEnum>;
};

export type StripeCheckoutSessionConsentCollection = {
  __typename?: 'StripeCheckoutSessionConsentCollection';
  promotions: Maybe<Scalars['String']['output']>;
  terms_of_service: Maybe<Scalars['String']['output']>;
};

export type StripeCheckoutSessionConsentTosEnum =
  | 'accepted';

export type StripeCheckoutSessionCustomText = {
  __typename?: 'StripeCheckoutSessionCustomText';
  shipping_address: Maybe<StripeCheckoutSessionCustomTextAddress>;
  submit: Maybe<StripeCheckoutSessionCustomTextSubmit>;
};

export type StripeCheckoutSessionCustomTextAddress = {
  __typename?: 'StripeCheckoutSessionCustomTextAddress';
  message: Maybe<Scalars['String']['output']>;
};

export type StripeCheckoutSessionCustomTextSubmit = {
  __typename?: 'StripeCheckoutSessionCustomTextSubmit';
  message: Maybe<Scalars['String']['output']>;
};

export type StripeCheckoutSessionCustomerCreationEnum =
  | 'always'
  | 'if_required';

export type StripeCheckoutSessionCustomerDetails = {
  __typename?: 'StripeCheckoutSessionCustomerDetails';
  address: Maybe<StripeCheckoutSessionCustomerDetailsAddress>;
  email: Maybe<Scalars['String']['output']>;
  name: Maybe<Scalars['String']['output']>;
  phone: Maybe<Scalars['String']['output']>;
  tax_exempt: Maybe<Scalars['String']['output']>;
  tax_ids: Maybe<StripeCheckoutSessionCustomerDetailsTaxIDs>;
};

export type StripeCheckoutSessionCustomerDetailsAddress = {
  __typename?: 'StripeCheckoutSessionCustomerDetailsAddress';
  city: Maybe<Scalars['String']['output']>;
  country: Maybe<Scalars['String']['output']>;
  line1: Maybe<Scalars['String']['output']>;
  line2: Maybe<Scalars['String']['output']>;
  postal_code: Maybe<Scalars['String']['output']>;
  state: Maybe<Scalars['String']['output']>;
};

export type StripeCheckoutSessionCustomerDetailsTaxIDs = {
  __typename?: 'StripeCheckoutSessionCustomerDetailsTaxIDs';
  type: Maybe<Scalars['String']['output']>;
  value: Maybe<Scalars['String']['output']>;
};

export type StripeCheckoutSessionInvoiceCreation = {
  __typename?: 'StripeCheckoutSessionInvoiceCreation';
  enabled: Maybe<Scalars['Boolean']['output']>;
  invoice_data: Maybe<StripeCheckoutSessionInvoiceCreationData>;
};

export type StripeCheckoutSessionInvoiceCreationData = {
  __typename?: 'StripeCheckoutSessionInvoiceCreationData';
  account_tax_ids: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  custom_fields: Maybe<Array<Maybe<StripeCheckoutSessionInvoiceCreationDataCustomFields>>>;
  description: Maybe<Scalars['String']['output']>;
  footer: Maybe<Scalars['String']['output']>;
  metadata: Maybe<Scalars['Metadata']['output']>;
  rendering_options: Maybe<StripeCheckoutSessionInvoiceCreationDataRenderingOptions>;
};

export type StripeCheckoutSessionInvoiceCreationDataCustomFields = {
  __typename?: 'StripeCheckoutSessionInvoiceCreationDataCustomFields';
  name: Maybe<Scalars['String']['output']>;
  value: Maybe<Scalars['String']['output']>;
};

export type StripeCheckoutSessionInvoiceCreationDataRenderingOptions = {
  __typename?: 'StripeCheckoutSessionInvoiceCreationDataRenderingOptions';
  amount_tax_display: Maybe<Scalars['String']['output']>;
};

export type StripeCheckoutSessionPaymentMethodOptions = {
  __typename?: 'StripeCheckoutSessionPaymentMethodOptions';
  acss_debit: Maybe<StripePaymentOptionsAcssDebit>;
  affirm: Maybe<StripePaymentOptionsSetupFutureUseNone>;
  afterpay_clearpay: Maybe<StripePaymentOptionsSetupFutureUseNone>;
  alipay: Maybe<StripePaymentOptionsSetupFutureUseNone>;
  au_becs_debit: Maybe<StripePaymentOptionsSetupFutureUseNone>;
  bacs_debit: Maybe<StripePaymentOptionsSetupFutureUse>;
  bancontact: Maybe<StripePaymentOptionsSetupFutureUseNone>;
  boleto: Maybe<StripePaymentOptionsBoleto>;
  card: Maybe<StripePaymentOptionsCard>;
  customer_balance: Maybe<StripePaymentOptionsCustomerBalance>;
  eps: Maybe<StripePaymentOptionsSetupFutureUseNone>;
  fpx: Maybe<StripePaymentOptionsSetupFutureUseNone>;
  giropay: Maybe<StripePaymentOptionsSetupFutureUseNone>;
  grabpay: Maybe<StripePaymentOptionsSetupFutureUseNone>;
  ideal: Maybe<StripePaymentOptionsSetupFutureUseNone>;
  klarna: Maybe<StripePaymentOptionsSetupFutureUse>;
  konbini: Maybe<StripePaymentOptionsKonbini>;
  oxxo: Maybe<StripePaymentOptionsOxxo>;
  p24: Maybe<StripePaymentOptionsSetupFutureUseNone>;
  paynow: Maybe<StripePaymentOptionsSetupFutureUseNone>;
  pix: Maybe<StripePaymentsOptionsPix>;
  sepa_debit: Maybe<StripePaymentOptionsSetupFutureUse>;
  sofort: Maybe<StripePaymentOptionsSetupFutureUseNone>;
  us_bank_account: Maybe<StripePaymentOptionsUsBankAccount>;
};

export type StripeCheckoutSessionPaymentStatusEnum =
  | 'no_payment_required'
  | 'paid'
  | 'unpaid';

export type StripeCheckoutSessionPhoneNumberCollection = {
  __typename?: 'StripeCheckoutSessionPhoneNumberCollection';
  enabled: Maybe<Scalars['Boolean']['output']>;
};

export type StripeCheckoutSessionShippingAddressCollection = {
  __typename?: 'StripeCheckoutSessionShippingAddressCollection';
  allowed_countries: Maybe<Array<Maybe<StripeCheckoutSessionShippingAddressCollectionAllowedCountriesEnum>>>;
};

export type StripeCheckoutSessionShippingAddressCollectionAllowedCountriesEnum =
  | 'AC'
  | 'AD'
  | 'AE'
  | 'AF'
  | 'AG'
  | 'AI'
  | 'AL'
  | 'AM'
  | 'AO'
  | 'AQ'
  | 'AR'
  | 'AT'
  | 'AU'
  | 'AW'
  | 'AX'
  | 'AZ'
  | 'BA'
  | 'BB'
  | 'BD'
  | 'BE'
  | 'BF'
  | 'BG'
  | 'BH'
  | 'BI'
  | 'BJ'
  | 'BL'
  | 'BM'
  | 'BN'
  | 'BO'
  | 'BQ'
  | 'BR'
  | 'BS'
  | 'BT'
  | 'BV'
  | 'BW'
  | 'BY'
  | 'BZ'
  | 'CA'
  | 'CD'
  | 'CF'
  | 'CG'
  | 'CH'
  | 'CI'
  | 'CK'
  | 'CL'
  | 'CM'
  | 'CN'
  | 'CO'
  | 'CR'
  | 'CV'
  | 'CW'
  | 'CY'
  | 'CZ'
  | 'DE'
  | 'DJ'
  | 'DK'
  | 'DM'
  | 'DO'
  | 'DZ'
  | 'EC'
  | 'EE'
  | 'EG'
  | 'EH'
  | 'ER'
  | 'ES'
  | 'ET'
  | 'FI'
  | 'FJ'
  | 'FK'
  | 'FO'
  | 'FR'
  | 'GA'
  | 'GB'
  | 'GD'
  | 'GE'
  | 'GF'
  | 'GG'
  | 'GH'
  | 'GI'
  | 'GL'
  | 'GM'
  | 'GN'
  | 'GP'
  | 'GQ'
  | 'GR'
  | 'GS'
  | 'GT'
  | 'GU'
  | 'GW'
  | 'GY'
  | 'HK'
  | 'HN'
  | 'HR'
  | 'HT'
  | 'HU'
  | 'ID'
  | 'IE'
  | 'IL'
  | 'IM'
  | 'IN'
  | 'IO'
  | 'IQ'
  | 'IS'
  | 'IT'
  | 'JE'
  | 'JM'
  | 'JO'
  | 'JP'
  | 'KE'
  | 'KG'
  | 'KH'
  | 'KI'
  | 'KM'
  | 'KN'
  | 'KR'
  | 'KW'
  | 'KY'
  | 'KZ'
  | 'LA'
  | 'LB'
  | 'LC'
  | 'LI'
  | 'LK'
  | 'LR'
  | 'LS'
  | 'LT'
  | 'LU'
  | 'LV'
  | 'LY'
  | 'MA'
  | 'MC'
  | 'MD'
  | 'ME'
  | 'MF'
  | 'MG'
  | 'MK'
  | 'ML'
  | 'MM'
  | 'MN'
  | 'MO'
  | 'MQ'
  | 'MR'
  | 'MS'
  | 'MT'
  | 'MU'
  | 'MV'
  | 'MW'
  | 'MX'
  | 'MY'
  | 'MZ'
  | 'NA'
  | 'NC'
  | 'NE'
  | 'NG'
  | 'NI'
  | 'NL'
  | 'NO'
  | 'NP'
  | 'NR'
  | 'NU'
  | 'NZ'
  | 'OM'
  | 'PA'
  | 'PE'
  | 'PF'
  | 'PG'
  | 'PH'
  | 'PK'
  | 'PL'
  | 'PM'
  | 'PN'
  | 'PR'
  | 'PS'
  | 'PT'
  | 'PY'
  | 'QA'
  | 'RE'
  | 'RO'
  | 'RS'
  | 'RU'
  | 'RW'
  | 'SA'
  | 'SB'
  | 'SC'
  | 'SE'
  | 'SG'
  | 'SH'
  | 'SI'
  | 'SJ'
  | 'SK'
  | 'SL'
  | 'SM'
  | 'SN'
  | 'SO'
  | 'SR'
  | 'SS'
  | 'ST'
  | 'SV'
  | 'SX'
  | 'SZ'
  | 'TA'
  | 'TC'
  | 'TD'
  | 'TF'
  | 'TG'
  | 'TH'
  | 'TJ'
  | 'TK'
  | 'TL'
  | 'TM'
  | 'TN'
  | 'TO'
  | 'TR'
  | 'TT'
  | 'TV'
  | 'TW'
  | 'TZ'
  | 'UA'
  | 'UG'
  | 'US'
  | 'UY'
  | 'UZ'
  | 'VA'
  | 'VC'
  | 'VE'
  | 'VG'
  | 'VN'
  | 'VU'
  | 'WF'
  | 'WS'
  | 'XK'
  | 'YE'
  | 'YT'
  | 'ZA'
  | 'ZM'
  | 'ZW'
  | 'ZZ';

export type StripeCheckoutSessionShippingCost = {
  __typename?: 'StripeCheckoutSessionShippingCost';
  amount: Maybe<Scalars['Int']['output']>;
  amount_subtotal: Maybe<Scalars['Int']['output']>;
  amount_tax: Maybe<Scalars['Int']['output']>;
  amount_total: Maybe<Scalars['Int']['output']>;
  rate: Maybe<StripeCheckoutSessionShippingCostRate>;
  shipping_rate: Maybe<Scalars['String']['output']>;
  taxes: Maybe<Array<Maybe<StripeCheckoutSessionShippingCost>>>;
};

export type StripeCheckoutSessionShippingCostRate = {
  __typename?: 'StripeCheckoutSessionShippingCostRate';
  active: Maybe<Scalars['Boolean']['output']>;
  country: Maybe<Scalars['String']['output']>;
  created: Maybe<Scalars['String']['output']>;
  description: Maybe<Scalars['String']['output']>;
  display_name: Maybe<Scalars['String']['output']>;
  id: Maybe<Scalars['String']['output']>;
  inclusive: Maybe<Scalars['Boolean']['output']>;
  juristriction: Maybe<Scalars['String']['output']>;
  livemode: Maybe<Scalars['Boolean']['output']>;
  metadata: Maybe<Scalars['Metadata']['output']>;
  object: Maybe<Scalars['String']['output']>;
  percentage: Maybe<Scalars['Int']['output']>;
  state: Maybe<Scalars['String']['output']>;
  tax_type: Maybe<Scalars['String']['output']>;
};

export type StripeCheckoutSessionShippingDetails = {
  __typename?: 'StripeCheckoutSessionShippingDetails';
  address: Maybe<StripeCheckoutSessionCustomerDetailsAddress>;
  name: Maybe<Scalars['String']['output']>;
};

export type StripeCheckoutSessionShippingOption = {
  __typename?: 'StripeCheckoutSessionShippingOption';
  shipping_amount: Maybe<Scalars['Int']['output']>;
  shipping_rate: Maybe<Scalars['String']['output']>;
};

export type StripeCheckoutSessionStatusEnum =
  | 'complete'
  | 'expired'
  | 'open';

export type StripeCheckoutSessionSubmitTypeEnum =
  | 'auto'
  | 'book'
  | 'donate'
  | 'pay';

export type StripeCheckoutSessionTaxIdCollection = {
  __typename?: 'StripeCheckoutSessionTaxIDCollection';
  enabled: Maybe<Scalars['Boolean']['output']>;
};

export type StripeCheckoutSessionTaxesRate = {
  __typename?: 'StripeCheckoutSessionTaxesRate';
  active: Maybe<Scalars['Boolean']['output']>;
  country: Maybe<Scalars['String']['output']>;
  created: Maybe<Scalars['String']['output']>;
  description: Maybe<Scalars['String']['output']>;
  display_name: Maybe<Scalars['String']['output']>;
  id: Maybe<Scalars['String']['output']>;
  inclusive: Maybe<Scalars['Boolean']['output']>;
  juristriction: Maybe<Scalars['String']['output']>;
  livemode: Maybe<Scalars['Boolean']['output']>;
  metadata: Maybe<Scalars['Metadata']['output']>;
  object: Maybe<Scalars['String']['output']>;
  percentage: Maybe<Scalars['Int']['output']>;
  state: Maybe<Scalars['String']['output']>;
  tax_type: Maybe<Scalars['String']['output']>;
};

export type StripeCheckoutSessionTotalDetails = {
  __typename?: 'StripeCheckoutSessionTotalDetails';
  amount_discount: Maybe<Scalars['Int']['output']>;
  amount_shipping: Maybe<Scalars['Int']['output']>;
  amount_tax: Maybe<Scalars['Int']['output']>;
  breakdown: Maybe<StripeCheckoutSessionTotalDetailsBreakdown>;
};

export type StripeCheckoutSessionTotalDetailsBreakdown = {
  __typename?: 'StripeCheckoutSessionTotalDetailsBreakdown';
  discounts: Maybe<Array<Maybe<StripeCheckoutSessionTotalDetailsBreakdownDiscounts>>>;
  taxes: Maybe<Array<Maybe<StripeCheckoutSessionTotalDetailsBreakdownTaxes>>>;
};

export type StripeCheckoutSessionTotalDetailsBreakdownDiscounts = {
  __typename?: 'StripeCheckoutSessionTotalDetailsBreakdownDiscounts';
  amount: Maybe<Scalars['Int']['output']>;
  discount: Maybe<StripeDiscount>;
};

export type StripeCheckoutSessionTotalDetailsBreakdownTaxes = {
  __typename?: 'StripeCheckoutSessionTotalDetailsBreakdownTaxes';
  amount: Maybe<Scalars['Int']['output']>;
  rate: Maybe<StripeCheckoutSessionTaxesRate>;
};

export type StripeCodeVerification = {
  __typename?: 'StripeCodeVerification';
  attempts_remaining: Maybe<Scalars['Int']['output']>;
  status: Maybe<Scalars['String']['output']>;
};

export type StripeCoupon = {
  __typename?: 'StripeCoupon';
  amount_off: Maybe<Scalars['Int']['output']>;
  applies_to: Maybe<StripeAppliesTo>;
  created: Maybe<Scalars['Timestamp']['output']>;
  currency: Maybe<Scalars['String']['output']>;
  duration: Maybe<StripeDurationEnum>;
  duration_in_months: Maybe<Scalars['Int']['output']>;
  id: Scalars['ID']['output'];
  livemode: Maybe<Scalars['Boolean']['output']>;
  max_redemptions: Maybe<Scalars['Int']['output']>;
  metadata: Maybe<Scalars['Metadata']['output']>;
  name: Maybe<Scalars['String']['output']>;
  object: Maybe<Scalars['String']['output']>;
  percent_off: Maybe<Scalars['Float']['output']>;
  redeem_by: Maybe<Scalars['Timestamp']['output']>;
  times_redeemed: Maybe<Scalars['Int']['output']>;
  valid: Maybe<Scalars['Boolean']['output']>;
};

export type StripeCreatedInput = {
  gt: InputMaybe<Scalars['Int']['input']>;
  gte: InputMaybe<Scalars['Int']['input']>;
  lt: InputMaybe<Scalars['Int']['input']>;
  lte: InputMaybe<Scalars['Int']['input']>;
};

export type StripeCustomFields = {
  __typename?: 'StripeCustomFields';
  name: Maybe<Scalars['String']['output']>;
  value: Maybe<Scalars['String']['output']>;
};

export type StripeCustomer = {
  __typename?: 'StripeCustomer';
  address: Maybe<StripeCustomerAddress>;
  balance: Maybe<Scalars['Int']['output']>;
  cash_balance: Maybe<StripeCustomerCashBalance>;
  created: Maybe<Scalars['String']['output']>;
  currency: Maybe<Scalars['String']['output']>;
  default_currency: Maybe<Scalars['String']['output']>;
  default_source: Maybe<Scalars['String']['output']>;
  delinquent: Maybe<Scalars['Boolean']['output']>;
  description: Maybe<Scalars['String']['output']>;
  discount: Maybe<StripeDiscount>;
  email: Maybe<Scalars['String']['output']>;
  id: Maybe<Scalars['ID']['output']>;
  invoice_credit_balance: Maybe<Scalars['StripeInvoiceCreditBalance']['output']>;
  invoice_prefix: Maybe<Scalars['String']['output']>;
  invoice_settings: Maybe<StripeInvoiceSettings>;
  livemode: Maybe<Scalars['Boolean']['output']>;
  metadata: Maybe<Scalars['Metadata']['output']>;
  name: Maybe<Scalars['String']['output']>;
  next_invoice_sequence: Maybe<Scalars['Int']['output']>;
  object: Maybe<Scalars['String']['output']>;
  phone: Maybe<Scalars['String']['output']>;
  preferred_locales: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  shipping: Maybe<StripeCustomerShipping>;
  sources: Maybe<Array<Maybe<StripePaymentSource>>>;
  subscriptions: Maybe<Array<Maybe<StripeSubscription>>>;
  tax: Maybe<StripeCustomerTax>;
  tax_exempt: Maybe<Scalars['String']['output']>;
  tax_ids: Maybe<Array<Maybe<StripeTaxId>>>;
  test_clock: Maybe<Scalars['String']['output']>;
};

export type StripeCustomerAddress = {
  __typename?: 'StripeCustomerAddress';
  city: Maybe<Scalars['String']['output']>;
  country: Maybe<Scalars['String']['output']>;
  line1: Maybe<Scalars['String']['output']>;
  line2: Maybe<Scalars['String']['output']>;
  postal_code: Maybe<Scalars['String']['output']>;
  state: Maybe<Scalars['String']['output']>;
};

export type StripeCustomerAllowedUpdatesEnum =
  | 'address'
  | 'email'
  | 'phone'
  | 'shipping'
  | 'tax_id';

export type StripeCustomerCashBalance = {
  __typename?: 'StripeCustomerCashBalance';
  available: Maybe<Scalars['String']['output']>;
  customer: Maybe<Scalars['ID']['output']>;
  livemode: Maybe<Scalars['Boolean']['output']>;
  object: Maybe<Scalars['String']['output']>;
  settings: Maybe<StripeCashBalanceSettings>;
};

export type StripeCustomerInput = {
  email: InputMaybe<Scalars['String']['input']>;
  id: Scalars['String']['input'];
  name: InputMaybe<Scalars['String']['input']>;
};

export type StripeCustomerPortal = {
  __typename?: 'StripeCustomerPortal';
  configuration: Maybe<StripeCustomerPortalConfig>;
  created: Maybe<Scalars['Timestamp']['output']>;
  customer: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  livemode: Maybe<Scalars['Boolean']['output']>;
  locale: Maybe<Scalars['String']['output']>;
  object: Maybe<Scalars['String']['output']>;
  on_behalf_of: Maybe<Scalars['String']['output']>;
  return_url: Maybe<Scalars['String']['output']>;
  url: Maybe<Scalars['String']['output']>;
};

export type StripeCustomerPortalConfig = {
  __typename?: 'StripeCustomerPortalConfig';
  active: Maybe<Scalars['Boolean']['output']>;
  application: Maybe<Scalars['String']['output']>;
  business_profile: Maybe<StripeBusinessProfile>;
  created: Maybe<Scalars['Timestamp']['output']>;
  features: Maybe<StripeCustomerPortalFeatures>;
  id: Maybe<Scalars['ID']['output']>;
  is_default: Maybe<Scalars['Boolean']['output']>;
  livemode: Maybe<Scalars['Boolean']['output']>;
  metadata: Maybe<Scalars['Metadata']['output']>;
  object: Maybe<Scalars['String']['output']>;
  updated: Maybe<Scalars['Timestamp']['output']>;
};

export type StripeCustomerPortalConfigInput = {
  active: InputMaybe<Scalars['Boolean']['input']>;
  application: InputMaybe<Scalars['String']['input']>;
  business_profile: StripeBusinessProfileInput;
  created: InputMaybe<Scalars['Timestamp']['input']>;
  features: StripeCustomerPortalFeaturesInput;
  id: InputMaybe<Scalars['ID']['input']>;
  is_default: InputMaybe<Scalars['Boolean']['input']>;
  livemode: InputMaybe<Scalars['Boolean']['input']>;
  metadata: InputMaybe<Scalars['Metadata']['input']>;
  object: InputMaybe<Scalars['String']['input']>;
  updated: InputMaybe<Scalars['Timestamp']['input']>;
};

export type StripeCustomerPortalConfigList = {
  __typename?: 'StripeCustomerPortalConfigList';
  data: Maybe<Array<Maybe<StripeCustomerPortalConfig>>>;
  has_more: Maybe<Scalars['Boolean']['output']>;
  object: Maybe<Scalars['String']['output']>;
  url: Maybe<Scalars['String']['output']>;
};

export type StripeCustomerPortalConfigParamsInput = {
  active: InputMaybe<Scalars['Boolean']['input']>;
  ending_before: InputMaybe<Scalars['String']['input']>;
  is_default: InputMaybe<Scalars['Boolean']['input']>;
  limit: InputMaybe<Scalars['Int']['input']>;
  starting_after: InputMaybe<Scalars['String']['input']>;
};

export type StripeCustomerPortalFeatureSubscriptionUpdate = {
  __typename?: 'StripeCustomerPortalFeatureSubscriptionUpdate';
  default_allowed_updates: Maybe<Array<Maybe<StripeCustomerPortalSubscriptionAllowedUpdatesEnum>>>;
  enabled: Maybe<Scalars['Boolean']['output']>;
  products: Maybe<Array<Maybe<StripeCustomerPortalSubscriptionProducts>>>;
};

export type StripeCustomerPortalFeatureSubscriptionUpdateInput = {
  default_allowed_updates: Array<InputMaybe<StripeCustomerPortalSubscriptionAllowedUpdatesEnum>>;
  enabled: Scalars['Boolean']['input'];
  products: Array<InputMaybe<StripeCustomerPortalSubscriptionProductsInput>>;
};

export type StripeCustomerPortalFeatures = {
  __typename?: 'StripeCustomerPortalFeatures';
  customer_update: Maybe<StripeCustomerPortalFeaturesCustomerUpdate>;
  invoice_history: Maybe<StripeCustomerPortalFeaturesInvoiceHistory>;
  payment_method_update: Maybe<StripeCustomerPortalFeaturesPaymentMethodUpdate>;
  subscription_cancel: Maybe<StripeCustomerPortalFeaturesSubscriptionCancel>;
  subscription_pause: Maybe<StripeCustomerPortalFeaturesSubscriptionPause>;
  subscription_update: Maybe<StripeCustomerPortalFeatureSubscriptionUpdate>;
};

export type StripeCustomerPortalFeaturesCustomerUpdate = {
  __typename?: 'StripeCustomerPortalFeaturesCustomerUpdate';
  allowed_updates: Maybe<Array<Maybe<StripeCustomerAllowedUpdatesEnum>>>;
  enabled: Maybe<Scalars['Boolean']['output']>;
};

export type StripeCustomerPortalFeaturesCustomerUpdateInput = {
  allowed_updates: InputMaybe<Array<InputMaybe<StripeCustomerAllowedUpdatesEnum>>>;
  enabled: Scalars['Boolean']['input'];
};

export type StripeCustomerPortalFeaturesInput = {
  customer_update: InputMaybe<StripeCustomerPortalFeaturesCustomerUpdateInput>;
  invoice_history: InputMaybe<StripeCustomerPortalFeaturesInvoiceHistoryInput>;
  payment_method_update: InputMaybe<StripeCustomerPortalFeaturesPaymentMethodUpdateInput>;
  subscription_cancel: InputMaybe<StripeCustomerPortalFeaturesSubscriptionCancelInput>;
  subscription_pause: InputMaybe<StripeCustomerPortalFeaturesSubscriptionPauseInput>;
  subscription_update: InputMaybe<StripeCustomerPortalFeatureSubscriptionUpdateInput>;
};

export type StripeCustomerPortalFeaturesInvoiceHistory = {
  __typename?: 'StripeCustomerPortalFeaturesInvoiceHistory';
  enabled: Maybe<Scalars['Boolean']['output']>;
};

export type StripeCustomerPortalFeaturesInvoiceHistoryInput = {
  enabled: Scalars['Boolean']['input'];
};

export type StripeCustomerPortalFeaturesPaymentMethodUpdate = {
  __typename?: 'StripeCustomerPortalFeaturesPaymentMethodUpdate';
  enabled: Maybe<Scalars['Boolean']['output']>;
};

export type StripeCustomerPortalFeaturesPaymentMethodUpdateInput = {
  enabled: Scalars['Boolean']['input'];
};

export type StripeCustomerPortalFeaturesSubscriptionCancel = {
  __typename?: 'StripeCustomerPortalFeaturesSubscriptionCancel';
  cancellation_reason: Maybe<StripeSubscriptionCancellationReason>;
  enabled: Maybe<Scalars['Boolean']['output']>;
  mode: Maybe<StripeCancellationReasonModeEnum>;
  proration_behavior: Maybe<Scalars['String']['output']>;
};

export type StripeCustomerPortalFeaturesSubscriptionCancelInput = {
  cancellation_reason: StripeSubscriptionCancellationReasonInput;
  enabled: Scalars['Boolean']['input'];
  mode: InputMaybe<StripeCancellationReasonModeEnum>;
  proration_behavior: InputMaybe<StripeCustomerPortalProrationBehaviorEnum>;
};

export type StripeCustomerPortalFeaturesSubscriptionPause = {
  __typename?: 'StripeCustomerPortalFeaturesSubscriptionPause';
  enabled: Maybe<Scalars['Boolean']['output']>;
};

export type StripeCustomerPortalFeaturesSubscriptionPauseInput = {
  enabled: Scalars['Boolean']['input'];
};

export type StripeCustomerPortalInput = {
  configuration: InputMaybe<Scalars['String']['input']>;
  customer: Scalars['String']['input'];
  locale: InputMaybe<Scalars['String']['input']>;
  on_behalf_of: InputMaybe<Scalars['String']['input']>;
  return_url: InputMaybe<Scalars['String']['input']>;
};

export type StripeCustomerPortalProrationBehaviorEnum =
  | 'always_invoice'
  | 'create_prorations'
  | 'none';

export type StripeCustomerPortalSubscriptionAllowedUpdatesEnum =
  | 'price'
  | 'promotion_code'
  | 'quantity';

export type StripeCustomerPortalSubscriptionProducts = {
  __typename?: 'StripeCustomerPortalSubscriptionProducts';
  prices: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  product: Maybe<Scalars['String']['output']>;
};

export type StripeCustomerPortalSubscriptionProductsInput = {
  prices: Array<InputMaybe<Scalars['String']['input']>>;
  product: Scalars['String']['input'];
};

export type StripeCustomerShipping = {
  __typename?: 'StripeCustomerShipping';
  address: Maybe<StripeCustomerAddress>;
  name: Maybe<Scalars['String']['output']>;
  phone: Maybe<Scalars['String']['output']>;
};

export type StripeCustomerSubscription = {
  __typename?: 'StripeCustomerSubscription';
  data: Maybe<Array<Maybe<StripeSubscription>>>;
  has_more: Maybe<Scalars['Boolean']['output']>;
  object: Maybe<Scalars['String']['output']>;
  url: Maybe<Scalars['String']['output']>;
};

export type StripeCustomerTax = {
  __typename?: 'StripeCustomerTax';
  automatic_tax: Maybe<StripeAutomaticTaxEnum>;
  ip_address: Maybe<Scalars['String']['output']>;
  location: Maybe<StripeCustomerTaxLocation>;
};

export type StripeCustomerTaxLocation = {
  __typename?: 'StripeCustomerTaxLocation';
  country: Maybe<Scalars['String']['output']>;
  source: Maybe<StripeCustomerTaxLocationSourceEnum>;
  state: Maybe<Scalars['String']['output']>;
};

export type StripeCustomerTaxLocationSourceEnum =
  | 'billing_address'
  | 'ip_address'
  | 'payment_method'
  | 'shipping_destination';

export type StripeDiscount = {
  __typename?: 'StripeDiscount';
  checkout_session: Maybe<Scalars['String']['output']>;
  coupon: Maybe<StripeCoupon>;
  customer: Maybe<Scalars['String']['output']>;
  end: Maybe<Scalars['Timestamp']['output']>;
  id: Scalars['ID']['output'];
  invoice: Maybe<Scalars['String']['output']>;
  invoice_item: Maybe<Scalars['String']['output']>;
  object: Maybe<Scalars['String']['output']>;
  promotion_code: Maybe<Scalars['String']['output']>;
  start: Maybe<Scalars['Timestamp']['output']>;
  subscription: Maybe<Scalars['String']['output']>;
};

export type StripeDurationEnum =
  | 'forever'
  | 'once'
  | 'repeating';

export type StripeInvoiceSettings = {
  __typename?: 'StripeInvoiceSettings';
  custom_fields: Maybe<Array<Maybe<StripeCustomFields>>>;
  default_payment_method: Maybe<Scalars['String']['output']>;
  footer: Maybe<Scalars['String']['output']>;
  rendering_options: Maybe<StripeRenderingOptions>;
};

export type StripeItem = {
  __typename?: 'StripeItem';
  description: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  images: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  name: Maybe<Scalars['String']['output']>;
  price: Maybe<Scalars['Int']['output']>;
  quantity: Maybe<Scalars['Int']['output']>;
  type: Maybe<StripeItemTypeEnum>;
};

export type StripeItemTypeEnum =
  | 'one_time'
  | 'recurring';

export type StripeItemsParamsInput = {
  priceParams: InputMaybe<StripePriceParamsInput>;
  productParams: InputMaybe<StripeProductParamsInput>;
};

export type StripeLineItem = {
  __typename?: 'StripeLineItem';
  data: Maybe<Array<Maybe<StripeLineItemData>>>;
  object: Maybe<Scalars['String']['output']>;
};

export type StripeLineItemData = {
  __typename?: 'StripeLineItemData';
  amount_discount: Maybe<Scalars['Int']['output']>;
  amount_subtotal: Maybe<Scalars['Int']['output']>;
  amount_tax: Maybe<Scalars['Int']['output']>;
  currency: Maybe<Scalars['String']['output']>;
  description: Maybe<Scalars['String']['output']>;
  discounts: Maybe<Array<Maybe<StripeLineItemDiscount>>>;
  has_more: Maybe<Scalars['Boolean']['output']>;
  id: Scalars['ID']['output'];
  object: Maybe<Scalars['String']['output']>;
  price: Maybe<StripeLineItemPrice>;
  quantity: Maybe<Scalars['Int']['output']>;
  taxes: Maybe<Array<Maybe<StripeLineItemTaxes>>>;
  url: Maybe<Scalars['String']['output']>;
};

export type StripeLineItemDiscount = {
  __typename?: 'StripeLineItemDiscount';
  amount: Maybe<Scalars['Int']['output']>;
  discount: Maybe<StripeDiscount>;
};

export type StripeLineItemPrice = {
  __typename?: 'StripeLineItemPrice';
  active: Maybe<Scalars['Boolean']['output']>;
  billing_scheme: Maybe<Scalars['String']['output']>;
  created: Maybe<Scalars['String']['output']>;
  currency: Maybe<Scalars['String']['output']>;
  currency_options: Maybe<Scalars['StripeLineItemPriceCurrencyOptions']['output']>;
  custom_unit_amount: Maybe<StripeLineItemPriceCustomUnitAmount>;
  id: Maybe<Scalars['String']['output']>;
  livemode: Maybe<Scalars['Boolean']['output']>;
  lookup_key: Maybe<Scalars['String']['output']>;
  metadata: Maybe<Scalars['Metadata']['output']>;
  nickname: Maybe<Scalars['String']['output']>;
  object: Maybe<Scalars['String']['output']>;
  product: Maybe<Scalars['String']['output']>;
  recurring: Maybe<StripeLineItemPriceRecurring>;
  tax_behavior: Maybe<Scalars['String']['output']>;
  tiers: Maybe<Array<Maybe<StripeLineItemPriceTiers>>>;
  tiers_mode: Maybe<Scalars['String']['output']>;
  transform_quantity: Maybe<StripeLineItemPriceTransformQuantity>;
  type: Maybe<Scalars['String']['output']>;
  unit_amount: Maybe<Scalars['Int']['output']>;
  unit_amount_decimal: Maybe<Scalars['Float']['output']>;
};

export type StripeLineItemPriceCustomUnitAmount = {
  __typename?: 'StripeLineItemPriceCustomUnitAmount';
  maximum: Maybe<Scalars['Int']['output']>;
  minimum: Maybe<Scalars['Int']['output']>;
  preset: Maybe<Scalars['Int']['output']>;
};

export type StripeLineItemPriceRecurring = {
  __typename?: 'StripeLineItemPriceRecurring';
  aggregate_usage: Maybe<Scalars['String']['output']>;
  interval: Maybe<StripeLineItemPriceRecurringIntervalEnum>;
  interval_count: Maybe<Scalars['Int']['output']>;
  usage_type: Maybe<StripeLineItemPriceRecurringUsageTypeEnum>;
};

export type StripeLineItemPriceRecurringIntervalEnum =
  | 'day'
  | 'month'
  | 'week'
  | 'year';

export type StripeLineItemPriceRecurringUsageTypeEnum =
  | 'licensed'
  | 'metered';

export type StripeLineItemPriceTiers = {
  __typename?: 'StripeLineItemPriceTiers';
  flat_amount: Maybe<Scalars['Int']['output']>;
  flat_amount_decimal: Maybe<Scalars['Float']['output']>;
  unit_amount: Maybe<Scalars['Int']['output']>;
  unit_amount_decimal: Maybe<Scalars['Float']['output']>;
  up_to: Maybe<Scalars['Int']['output']>;
};

export type StripeLineItemPriceTransformQuantity = {
  __typename?: 'StripeLineItemPriceTransformQuantity';
  divide_by: Maybe<Scalars['Int']['output']>;
  round: Maybe<StripeLineItemPriceTransformQuantityRoundEnum>;
};

export type StripeLineItemPriceTransformQuantityRoundEnum =
  | 'down'
  | 'up';

export type StripeLineItemTaxes = {
  __typename?: 'StripeLineItemTaxes';
  amount: Maybe<Scalars['Int']['output']>;
  rate: Maybe<StripeCheckoutSessionTaxesRate>;
};

export type StripePaymentMethod = {
  __typename?: 'StripePaymentMethod';
  acss_debit: Maybe<StripeAcssDebit>;
  affirm: Maybe<Scalars['Hash']['output']>;
  afterpay_clearpay: Maybe<Scalars['Hash']['output']>;
  alipay: Maybe<Scalars['Hash']['output']>;
  au_becs_debit: Maybe<StripeAubecsDebit>;
  bacs_debit: Maybe<StripeBacsDebit>;
  bancontact: Maybe<Scalars['Hash']['output']>;
  billing_details: Maybe<StripePaymentMethodBillingDetails>;
  blik: Maybe<Scalars['Hash']['output']>;
  boleto: Maybe<StripeBoleto>;
  card: Maybe<StripePaymentMethodCard>;
  customer: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  metadata: Maybe<Scalars['Metadata']['output']>;
  object: Maybe<Scalars['String']['output']>;
  type: Maybe<StripePaymentMethodTypeEnum>;
};

export type StripePaymentMethodBillingDetails = {
  __typename?: 'StripePaymentMethodBillingDetails';
  address: Maybe<StripePaymentMethodBillingDetailsAddress>;
  email: Maybe<Scalars['String']['output']>;
  name: Maybe<Scalars['String']['output']>;
  phone: Maybe<Scalars['String']['output']>;
};

export type StripePaymentMethodBillingDetailsAddress = {
  __typename?: 'StripePaymentMethodBillingDetailsAddress';
  city: Maybe<Scalars['String']['output']>;
  country: Maybe<Scalars['String']['output']>;
  line1: Maybe<Scalars['String']['output']>;
  line2: Maybe<Scalars['String']['output']>;
  postal_code: Maybe<Scalars['String']['output']>;
  state: Maybe<Scalars['String']['output']>;
};

export type StripePaymentMethodCard = {
  __typename?: 'StripePaymentMethodCard';
  brand: Maybe<Scalars['String']['output']>;
  checks: Maybe<StripePaymentMethodCardChecks>;
  country: Maybe<Scalars['String']['output']>;
  exp_month: Maybe<Scalars['Int']['output']>;
  exp_year: Maybe<Scalars['Int']['output']>;
  fingerprint: Maybe<Scalars['String']['output']>;
  funding: Maybe<Scalars['String']['output']>;
  generated_from: Maybe<StripePaymentMethodCardGenFrom>;
};

export type StripePaymentMethodCardChecks = {
  __typename?: 'StripePaymentMethodCardChecks';
  address_line1_check: Maybe<Scalars['String']['output']>;
  address_postal_code_check: Maybe<Scalars['String']['output']>;
  cvc_check: Maybe<Scalars['String']['output']>;
};

export type StripePaymentMethodCardGenFrom = {
  __typename?: 'StripePaymentMethodCardGenFrom';
  charge: Maybe<Scalars['String']['output']>;
  payment_method_details: Maybe<StripePaymentMethodCardGenFromDetails>;
  setup_attempt: Maybe<Scalars['String']['output']>;
};

export type StripePaymentMethodCardGenFromDetails = {
  __typename?: 'StripePaymentMethodCardGenFromDetails';
  card_present: Maybe<StripePaymentMethodCardSnapshot>;
  type: Maybe<Scalars['String']['output']>;
};

export type StripePaymentMethodCardReadMethodEnum =
  | 'contact_emv'
  | 'contactless_emv'
  | 'contactless_magstripe_mode'
  | 'magnetic_stripe_fallback'
  | 'magnetic_stripe_track2';

export type StripePaymentMethodCardReceipt = {
  __typename?: 'StripePaymentMethodCardReceipt';
  account_type: Maybe<StripePaymentMethodCardReceiptAccountTypeEnum>;
  application_cryptogram: Maybe<Scalars['String']['output']>;
  application_preferred_name: Maybe<Scalars['String']['output']>;
  authorization_code: Maybe<Scalars['String']['output']>;
  authorization_response_code: Maybe<Scalars['String']['output']>;
  cardholder_verification_method: Maybe<Scalars['String']['output']>;
  dedicated_file_name: Maybe<Scalars['String']['output']>;
  terminal_verification_results: Maybe<Scalars['String']['output']>;
  transaction_status_information: Maybe<Scalars['String']['output']>;
};

export type StripePaymentMethodCardReceiptAccountTypeEnum =
  | 'checking'
  | 'credit'
  | 'prepaid'
  | 'unknown';

export type StripePaymentMethodCardSnapshot = {
  __typename?: 'StripePaymentMethodCardSnapshot';
  amount_authorized: Maybe<Scalars['Int']['output']>;
  brand: Maybe<Scalars['String']['output']>;
  capture_before: Maybe<Scalars['Timestamp']['output']>;
  cardholder_name: Maybe<Scalars['String']['output']>;
  country: Maybe<Scalars['String']['output']>;
  emv_auth_data: Maybe<Scalars['String']['output']>;
  exp_month: Maybe<Scalars['Int']['output']>;
  exp_year: Maybe<Scalars['Int']['output']>;
  fingerprint: Maybe<Scalars['String']['output']>;
  funding: Maybe<Scalars['String']['output']>;
  generated_card: Maybe<Scalars['String']['output']>;
  incremental_authorization_supported: Maybe<Scalars['Boolean']['output']>;
  last4: Maybe<Scalars['String']['output']>;
  network: Maybe<Scalars['String']['output']>;
  overcapture_supported: Maybe<Scalars['Boolean']['output']>;
  read_method: Maybe<StripePaymentMethodCardReadMethodEnum>;
  receipt: Maybe<StripePaymentMethodCardReceipt>;
};

export type StripePaymentMethodTypeEnum =
  | 'acss_debit'
  | 'affirm'
  | 'afterpay_clearpay'
  | 'alipay'
  | 'au_becs_debit'
  | 'bacs_debit'
  | 'bancontact'
  | 'blik'
  | 'boleto'
  | 'card'
  | 'card_present'
  | 'customer_balance'
  | 'eps'
  | 'fpx'
  | 'giropay'
  | 'grabpay'
  | 'ideal'
  | 'interac_present'
  | 'klarna'
  | 'konbini'
  | 'link'
  | 'oxxo'
  | 'p24'
  | 'paynow'
  | 'promptpay'
  | 'sepa_debit'
  | 'sofort'
  | 'us_bank_account'
  | 'wechat_pay';

export type StripePaymentOptionsAcssDebit = {
  __typename?: 'StripePaymentOptionsACSSDebit';
  currency: Maybe<StripePaymentOptionsAcssDebitCurrencyEnum>;
  mandate_options: Maybe<StripePaymentOptionsAcssDebitMandateOptions>;
  setup_future_usage: Maybe<StripePaymentOptionsSetupFutureUseEnum>;
  verification_method: Maybe<StripePaymentOptionsVerificationMethodEnum>;
};

export type StripePaymentOptionsAcssDebitCurrencyEnum =
  | 'cad'
  | 'usd';

export type StripePaymentOptionsAcssDebitMandateOptions = {
  __typename?: 'StripePaymentOptionsACSSDebitMandateOptions';
  custom_mandate_url: Maybe<Scalars['String']['output']>;
  default_for: Maybe<StripePaymentOptionsAcssDebitMandateOptionsDefaultForEnum>;
  interval_description: Maybe<Scalars['String']['output']>;
  payment_schedule: Maybe<StripePaymentOptionsAcssDebitMandateOptionsPaymentScheduleEnum>;
  transaction_type: Maybe<StripePaymentOptionsAcssDebitMandateOptionsTransactionTypeEnum>;
};

export type StripePaymentOptionsAcssDebitMandateOptionsDefaultForEnum =
  | 'invoice'
  | 'subscription';

export type StripePaymentOptionsAcssDebitMandateOptionsPaymentScheduleEnum =
  | 'combined'
  | 'interval'
  | 'sporadic';

export type StripePaymentOptionsAcssDebitMandateOptionsTransactionTypeEnum =
  | 'business'
  | 'personal';

export type StripePaymentOptionsBoleto = {
  __typename?: 'StripePaymentOptionsBoleto';
  expires_after_days: Maybe<Scalars['Int']['output']>;
  setup_future_usage: Maybe<StripePaymentOptionsSetupFutureUseEnum>;
};

export type StripePaymentOptionsCard = {
  __typename?: 'StripePaymentOptionsCard';
  installments: Maybe<StripePaymentOptionsCardInstallments>;
  setup_future_usage: Maybe<StripePaymentOptionsSetupFutureUseEnum>;
  statement_descriptor_suffix_kana: Maybe<Scalars['String']['output']>;
  statement_descriptor_suffix_kanji: Maybe<Scalars['String']['output']>;
};

export type StripePaymentOptionsCardInstallments = {
  __typename?: 'StripePaymentOptionsCardInstallments';
  enabled: Maybe<Scalars['Boolean']['output']>;
};

export type StripePaymentOptionsCustomerBalance = {
  __typename?: 'StripePaymentOptionsCustomerBalance';
  bank_transfer: Maybe<StripePaymentOptionsCustomerBalanceBankTransfer>;
  funding_type: Maybe<Scalars['String']['output']>;
  setup_future_usage: Maybe<StripePaymentOptionsSetupFutureUseNoneEnum>;
};

export type StripePaymentOptionsCustomerBalanceBankTransfer = {
  __typename?: 'StripePaymentOptionsCustomerBalanceBankTransfer';
  eu_bank_transfer: Maybe<StripePaymentOptionsCustomerBalanceBankTransferEu>;
  requested_address_types: Maybe<Array<Maybe<StripePaymentOptionsCustomerBalanceBankTransferAddressTypesEnum>>>;
  type: Maybe<StripePaymentOptionsCustomerBalanceBankTransferEnum>;
};

export type StripePaymentOptionsCustomerBalanceBankTransferAddressTypesEnum =
  | 'iban'
  | 'sepa'
  | 'sort_code'
  | 'spei'
  | 'zengin';

export type StripePaymentOptionsCustomerBalanceBankTransferEu = {
  __typename?: 'StripePaymentOptionsCustomerBalanceBankTransferEU';
  country: Maybe<Scalars['String']['output']>;
};

export type StripePaymentOptionsCustomerBalanceBankTransferEnum =
  | 'eu_bank_transfer'
  | 'gb_bank_transfer'
  | 'jp_bank_transfer'
  | 'mx_bank_transfer';

export type StripePaymentOptionsKonbini = {
  __typename?: 'StripePaymentOptionsKonbini';
  expires_after_days: Maybe<Scalars['Int']['output']>;
  setup_future_usage: Maybe<StripePaymentOptionsSetupFutureUseNoneEnum>;
};

export type StripePaymentOptionsOxxo = {
  __typename?: 'StripePaymentOptionsOXXO';
  expires_after_days: Maybe<Scalars['Int']['output']>;
  setup_future_usage: Maybe<StripePaymentOptionsSetupFutureUseNoneEnum>;
};

export type StripePaymentOptionsPix = {
  __typename?: 'StripePaymentOptionsPix';
  expires_after_seconds: Maybe<Scalars['Int']['output']>;
};

export type StripePaymentOptionsSetupFutureUse = {
  __typename?: 'StripePaymentOptionsSetupFutureUse';
  setup_future_usage: Maybe<StripePaymentOptionsSetupFutureUseEnum>;
};

export type StripePaymentOptionsSetupFutureUseEnum =
  | 'none'
  | 'off_session'
  | 'on_session';

export type StripePaymentOptionsSetupFutureUseNone = {
  __typename?: 'StripePaymentOptionsSetupFutureUseNone';
  setup_future_usage: Maybe<StripePaymentOptionsSetupFutureUseNoneEnum>;
};

export type StripePaymentOptionsSetupFutureUseNoneEnum =
  | 'none';

export type StripePaymentOptionsUsBankAccount = {
  __typename?: 'StripePaymentOptionsUSBankAccount';
  financial_connections: Maybe<StripeCheckoutFinancialConnections>;
  setup_future_usage: Maybe<StripePaymentOptionsSetupFutureUseEnum>;
  verification_method: Maybe<StripePaymentOptionsVerificationMethodEnum>;
};

export type StripePaymentOptionsVerificationMethodEnum =
  | 'automatic'
  | 'instant'
  | 'microdeposits';

export type StripePaymentSource = {
  __typename?: 'StripePaymentSource';
  data: Maybe<Array<Maybe<StripePaymentSourceData>>>;
  has_more: Maybe<Scalars['Boolean']['output']>;
  object: Maybe<Scalars['String']['output']>;
  url: Maybe<Scalars['String']['output']>;
};

export type StripePaymentSourceData = {
  __typename?: 'StripePaymentSourceData';
  account: Maybe<Scalars['String']['output']>;
  account_holder_name: Maybe<Scalars['String']['output']>;
  account_holder_type: Maybe<Scalars['String']['output']>;
  account_type: Maybe<Scalars['String']['output']>;
  active: Maybe<Scalars['Boolean']['output']>;
  address_city: Maybe<Scalars['String']['output']>;
  address_country: Maybe<Scalars['String']['output']>;
  address_line1: Maybe<Scalars['String']['output']>;
  address_line1_check: Maybe<Scalars['String']['output']>;
  address_line2: Maybe<Scalars['String']['output']>;
  address_state: Maybe<Scalars['String']['output']>;
  address_zip: Maybe<Scalars['String']['output']>;
  address_zip_check: Maybe<Scalars['String']['output']>;
  amount: Maybe<Scalars['Int']['output']>;
  amount_received: Maybe<Scalars['Int']['output']>;
  available_payment_methods: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  bank_name: Maybe<Scalars['String']['output']>;
  bitcoin_amount: Maybe<Scalars['Int']['output']>;
  bitcoin_amount_received: Maybe<Scalars['Int']['output']>;
  bitcoin_uri: Maybe<Scalars['String']['output']>;
  brand: Maybe<Scalars['String']['output']>;
  client_secret: Maybe<Scalars['String']['output']>;
  code_verification: Maybe<StripeCodeVerification>;
  country: Maybe<Scalars['String']['output']>;
  created: Maybe<Scalars['Timestamp']['output']>;
  currency: Maybe<Scalars['String']['output']>;
  customer: Maybe<Scalars['String']['output']>;
  cvc_check: Maybe<Scalars['String']['output']>;
  description: Maybe<Scalars['String']['output']>;
  dynamic_last4: Maybe<Scalars['String']['output']>;
  email: Maybe<Scalars['String']['output']>;
  exp_month: Maybe<Scalars['Int']['output']>;
  exp_year: Maybe<Scalars['Int']['output']>;
  filled: Maybe<Scalars['Boolean']['output']>;
  fingerprint: Maybe<Scalars['String']['output']>;
  flow: Maybe<Scalars['String']['output']>;
  funding: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  inbound_address: Maybe<Scalars['String']['output']>;
  last4: Maybe<Scalars['String']['output']>;
  livemode: Maybe<Scalars['Boolean']['output']>;
  metadata: Maybe<Scalars['Metadata']['output']>;
  name: Maybe<Scalars['String']['output']>;
  object: Maybe<Scalars['String']['output']>;
  owner: Maybe<StripePaymentSourceOwner>;
  payment: Maybe<Scalars['String']['output']>;
  payment_amount: Maybe<Scalars['Int']['output']>;
  payment_currency: Maybe<Scalars['String']['output']>;
  recipient: Maybe<Scalars['String']['output']>;
  refund_address: Maybe<Scalars['String']['output']>;
  reusable: Maybe<Scalars['Boolean']['output']>;
  routing_number: Maybe<Scalars['String']['output']>;
  status: Maybe<Scalars['String']['output']>;
  tokenization_method: Maybe<Scalars['String']['output']>;
  transactions: Maybe<Array<Maybe<StripeTransactions>>>;
  uncaptured_funds: Maybe<Scalars['Boolean']['output']>;
  used: Maybe<Scalars['Boolean']['output']>;
  used_for_payment: Maybe<Scalars['Boolean']['output']>;
  username: Maybe<Scalars['String']['output']>;
};

export type StripePaymentSourceOwner = {
  __typename?: 'StripePaymentSourceOwner';
  id: Maybe<Scalars['String']['output']>;
};

export type StripePaymentsOptionsPix = {
  __typename?: 'StripePaymentsOptionsPix';
  expires_after_seconds: Maybe<Scalars['Int']['output']>;
};

export type StripePriceParamsInput = {
  active: InputMaybe<Scalars['Boolean']['input']>;
  created: InputMaybe<StripeCreatedInput>;
  currency: InputMaybe<Scalars['String']['input']>;
  ending_before: InputMaybe<Scalars['String']['input']>;
  limit: InputMaybe<Scalars['Int']['input']>;
  lookup_keys: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  product: InputMaybe<Scalars['ID']['input']>;
  recurring: InputMaybe<StripeRecurringPriceInput>;
  starting_after: InputMaybe<Scalars['String']['input']>;
  type: InputMaybe<StripeItemTypeEnum>;
};

export type StripeProductParamsInput = {
  active: InputMaybe<Scalars['Boolean']['input']>;
  created: InputMaybe<StripeCreatedInput>;
  ending_before: InputMaybe<Scalars['String']['input']>;
  ids: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  limit: InputMaybe<Scalars['Int']['input']>;
  shippable: InputMaybe<Scalars['Boolean']['input']>;
  starting_after: InputMaybe<Scalars['String']['input']>;
  url: InputMaybe<Scalars['String']['input']>;
};

export type StripeReconciliationModeEnum =
  | 'automatic'
  | 'manual'
  | 'merchant_default';

export type StripeRecurringPriceInput = {
  interval: InputMaybe<StripeRecurringPriceInterval>;
  usage_type: InputMaybe<StripeRecurringPriceUsageType>;
};

export type StripeRecurringPriceInterval =
  | 'day'
  | 'month'
  | 'week'
  | 'year';

export type StripeRecurringPriceUsageType =
  | 'licensed'
  | 'metered';

export type StripeRenderingOptions = {
  __typename?: 'StripeRenderingOptions';
  amount_tax_display: Maybe<StripeAmountTaxDisplayEnum>;
};

export type StripeSubscription = {
  __typename?: 'StripeSubscription';
  application: Maybe<Scalars['String']['output']>;
  application_fee_percent: Maybe<Scalars['Float']['output']>;
  automatic_tax: Maybe<StripeSubscriptionAutomaticTax>;
  billing_cycle_anchor: Maybe<Scalars['Int']['output']>;
  billing_thresholds: Maybe<StripeSubscriptionBillingThreshold>;
  cancel_at: Maybe<Scalars['Int']['output']>;
  cancel_at_period_end: Maybe<Scalars['Boolean']['output']>;
  canceled_at: Maybe<Scalars['Int']['output']>;
  collection_method: Maybe<StripeSubscriptionCollectionMethodEnum>;
  created: Maybe<Scalars['Int']['output']>;
  current_period_end: Maybe<Scalars['Int']['output']>;
  current_period_start: Maybe<Scalars['Int']['output']>;
  customer: Maybe<Scalars['String']['output']>;
  days_until_due: Maybe<Scalars['Int']['output']>;
  default_payment_method: Maybe<StripePaymentMethod>;
  default_source: Maybe<Scalars['String']['output']>;
  default_tax_rates: Maybe<Array<Maybe<StripeSubscriptionTaxRates>>>;
  description: Maybe<Scalars['String']['output']>;
  discount: Maybe<StripeDiscount>;
  ended_at: Maybe<Scalars['Int']['output']>;
  id: Scalars['ID']['output'];
  items: Maybe<Array<Maybe<StripeSubscriptionItem>>>;
  latest_invoice: Maybe<Scalars['String']['output']>;
  livemode: Maybe<Scalars['Boolean']['output']>;
  metadata: Maybe<Scalars['Metadata']['output']>;
  next_pending_invoice_item_invoice: Maybe<Scalars['Int']['output']>;
  object: Maybe<Scalars['String']['output']>;
  pause_collection: Maybe<StripeSubscriptionPauseCollection>;
  payment_settings: Maybe<StripeSubscriptionPaymentSettings>;
  pending_invoice_item_interval: Maybe<StripeSubscriptionInvoiceInterval>;
  pending_setup_intent: Maybe<Scalars['String']['output']>;
  pending_update: Maybe<StripeSubscriptionPendingUpdate>;
  schedule: Maybe<Scalars['String']['output']>;
  start_date: Maybe<Scalars['Int']['output']>;
  status: Maybe<StripeSubscriptionStatusEnum>;
  test_clock: Maybe<Scalars['String']['output']>;
  transfer_data: Maybe<StripeSubscriptionTransferData>;
  trial_end: Maybe<Scalars['Int']['output']>;
  trial_start: Maybe<Scalars['Int']['output']>;
};

export type StripeSubscriptionAutomaticTax = {
  __typename?: 'StripeSubscriptionAutomaticTax';
  enabled: Scalars['Boolean']['output'];
};

export type StripeSubscriptionBillingThreshold = {
  __typename?: 'StripeSubscriptionBillingThreshold';
  amount_gte: Maybe<Scalars['Int']['output']>;
  reset_billing_cycle_anchor: Maybe<Scalars['Boolean']['output']>;
};

export type StripeSubscriptionCancellationReason = {
  __typename?: 'StripeSubscriptionCancellationReason';
  enabled: Maybe<Scalars['Boolean']['output']>;
  options: Maybe<Array<Maybe<StripeSubscriptionCancellationReasonOptionsEnum>>>;
};

export type StripeSubscriptionCancellationReasonInput = {
  enabled: Scalars['Boolean']['input'];
  options: Array<StripeSubscriptionCancellationReasonOptionsEnum>;
};

export type StripeSubscriptionCancellationReasonOptionsEnum =
  | 'customer_service'
  | 'low_quality'
  | 'missing_features'
  | 'other'
  | 'switched_service'
  | 'too_complex'
  | 'too_expensive'
  | 'unused';

export type StripeSubscriptionCollectionMethodEnum =
  | 'charge_automatically'
  | 'send_invoice';

export type StripeSubscriptionDefaultPaymentMethodEnum =
  | 'off'
  | 'on_subscription';

export type StripeSubscriptionInvoiceInterval = {
  __typename?: 'StripeSubscriptionInvoiceInterval';
  interval: Maybe<Scalars['String']['output']>;
  interval_count: Maybe<Scalars['Int']['output']>;
};

export type StripeSubscriptionItem = {
  __typename?: 'StripeSubscriptionItem';
  data: Maybe<Array<Maybe<StripeSubscriptionItemData>>>;
  has_more: Maybe<Scalars['Boolean']['output']>;
  object: Maybe<Scalars['String']['output']>;
  url: Maybe<Scalars['String']['output']>;
};

export type StripeSubscriptionItemBillingThresholds = {
  __typename?: 'StripeSubscriptionItemBillingThresholds';
  usage_gte: Maybe<Scalars['Int']['output']>;
};

export type StripeSubscriptionItemData = {
  __typename?: 'StripeSubscriptionItemData';
  billing_thresholds: Maybe<StripeSubscriptionItemBillingThresholds>;
  created: Maybe<Scalars['Int']['output']>;
  id: Maybe<Scalars['String']['output']>;
  metadata: Maybe<Scalars['Metadata']['output']>;
  object: Maybe<Scalars['String']['output']>;
  price: Maybe<StripeSubscriptionPrice>;
  quantity: Maybe<Scalars['Int']['output']>;
  subscription: Maybe<Scalars['String']['output']>;
  tax_rates: Maybe<StripeSubscriptionTaxRates>;
};

export type StripeSubscriptionPauseCollection = {
  __typename?: 'StripeSubscriptionPauseCollection';
  behaviour: Maybe<Scalars['String']['output']>;
  resumes_at: Maybe<Scalars['Int']['output']>;
};

export type StripeSubscriptionPaymentMethodOptions = {
  __typename?: 'StripeSubscriptionPaymentMethodOptions';
  object: Maybe<Scalars['String']['output']>;
};

export type StripeSubscriptionPaymentMethodTypesEnum =
  | 'ach_credit_transfer'
  | 'ach_debit'
  | 'acss_debit'
  | 'au_becs_debit'
  | 'bacs_debit'
  | 'bancontact'
  | 'boleto'
  | 'card'
  | 'customer_balance'
  | 'eps'
  | 'fpx'
  | 'giropay'
  | 'grabpay'
  | 'ideal'
  | 'konbini'
  | 'link'
  | 'p24'
  | 'paynow'
  | 'promptpay'
  | 'sepa_debit'
  | 'sofort'
  | 'us_bank_account'
  | 'wechat_pay';

export type StripeSubscriptionPaymentSettings = {
  __typename?: 'StripeSubscriptionPaymentSettings';
  payment_method_options: Maybe<StripeSubscriptionPaymentMethodOptions>;
  payment_method_types: Maybe<Array<Maybe<StripeSubscriptionPaymentMethodTypesEnum>>>;
  save_default_payment_method: Maybe<StripeSubscriptionDefaultPaymentMethodEnum>;
};

export type StripeSubscriptionPendingUpdate = {
  __typename?: 'StripeSubscriptionPendingUpdate';
  billing_cycle_anchor: Maybe<Scalars['Int']['output']>;
  expires_at: Maybe<Scalars['Int']['output']>;
  subscription_items: Maybe<Array<Maybe<StripeSubscriptionItem>>>;
  trial_end: Maybe<Scalars['Int']['output']>;
  trial_from_plan: Maybe<Scalars['Boolean']['output']>;
};

export type StripeSubscriptionPrice = {
  __typename?: 'StripeSubscriptionPrice';
  active: Maybe<Scalars['Boolean']['output']>;
  billing_scheme: Maybe<Scalars['String']['output']>;
  created: Maybe<Scalars['Int']['output']>;
  currency: Maybe<Scalars['String']['output']>;
  custom_unit_amount: Maybe<StripeSubscriptionPriceCustomUnitAmount>;
  id: Maybe<Scalars['String']['output']>;
  livemode: Maybe<Scalars['Boolean']['output']>;
  lookup_key: Maybe<Scalars['String']['output']>;
  metadata: Maybe<Scalars['Metadata']['output']>;
  nickname: Maybe<Scalars['String']['output']>;
  object: Maybe<Scalars['String']['output']>;
  product: Maybe<Scalars['String']['output']>;
  recurring: Maybe<StripeSubscriptionPriceRecurring>;
  tax_behaviour: Maybe<Scalars['String']['output']>;
  tiers: Maybe<Array<Maybe<StripeSubscriptionPriceTier>>>;
  tiers_mode: Maybe<Scalars['String']['output']>;
  transform_quantity: Maybe<StripeSubscriptionPriceTransformQuantity>;
  type: Maybe<Scalars['String']['output']>;
  unit_amount: Maybe<Scalars['Int']['output']>;
  unit_amount_decimal: Maybe<Scalars['String']['output']>;
};

export type StripeSubscriptionPriceCustomUnitAmount = {
  __typename?: 'StripeSubscriptionPriceCustomUnitAmount';
  maximum: Maybe<Scalars['Int']['output']>;
  minimum: Maybe<Scalars['Int']['output']>;
  preset: Maybe<Scalars['Int']['output']>;
};

export type StripeSubscriptionPriceRecurring = {
  __typename?: 'StripeSubscriptionPriceRecurring';
  aggregate_usage: Maybe<Scalars['String']['output']>;
  interval: Maybe<StripeSubscriptionPriceRecurringIntervalEnum>;
  interval_count: Maybe<Scalars['Int']['output']>;
  usage_type: Maybe<StripeSubscriptionPriceRecurringUsageTypeEnum>;
};

export type StripeSubscriptionPriceRecurringIntervalEnum =
  | 'day'
  | 'month'
  | 'week'
  | 'year';

export type StripeSubscriptionPriceRecurringUsageTypeEnum =
  | 'licensed'
  | 'metered';

export type StripeSubscriptionPriceTier = {
  __typename?: 'StripeSubscriptionPriceTier';
  flat_amount: Maybe<Scalars['Int']['output']>;
  flat_amount_decimal: Maybe<Scalars['String']['output']>;
  unit_amount: Maybe<Scalars['Int']['output']>;
  unit_amount_decimal: Maybe<Scalars['String']['output']>;
  up_to: Maybe<Scalars['Int']['output']>;
};

export type StripeSubscriptionPriceTransformQuantity = {
  __typename?: 'StripeSubscriptionPriceTransformQuantity';
  divide_by: Maybe<Scalars['Int']['output']>;
  round: Maybe<StripeTransformQuantityRoundEnum>;
};

export type StripeSubscriptionStatusEnum =
  | 'active'
  | 'canceled'
  | 'incomplete'
  | 'incomplete_expired'
  | 'past_due'
  | 'trialing'
  | 'unpaid';

export type StripeSubscriptionTaxRates = {
  __typename?: 'StripeSubscriptionTaxRates';
  active: Maybe<Scalars['Boolean']['output']>;
  country: Maybe<Scalars['String']['output']>;
  created: Maybe<Scalars['Int']['output']>;
  description: Maybe<Scalars['String']['output']>;
  display_name: Maybe<Scalars['String']['output']>;
  id: Maybe<Scalars['String']['output']>;
  inclusive: Maybe<Scalars['Boolean']['output']>;
  juristriction: Maybe<Scalars['String']['output']>;
  livemode: Maybe<Scalars['Boolean']['output']>;
  metadata: Maybe<Scalars['Metadata']['output']>;
  object: Maybe<Scalars['String']['output']>;
  percentage: Maybe<Scalars['Float']['output']>;
  state: Maybe<Scalars['String']['output']>;
  tax_type: Maybe<Scalars['String']['output']>;
};

export type StripeSubscriptionTransferData = {
  __typename?: 'StripeSubscriptionTransferData';
  amount_percent: Maybe<Scalars['Float']['output']>;
  destination: Maybe<Scalars['String']['output']>;
};

export type StripeTaxId = {
  __typename?: 'StripeTaxID';
  data: Maybe<Array<Maybe<StripeTaxIdData>>>;
  has_more: Maybe<Scalars['Boolean']['output']>;
  object: Maybe<Scalars['String']['output']>;
  url: Maybe<Scalars['String']['output']>;
};

export type StripeTaxIdData = {
  __typename?: 'StripeTaxIDData';
  country: Maybe<Scalars['String']['output']>;
  created: Maybe<Scalars['Timestamp']['output']>;
  customer: Maybe<Scalars['String']['output']>;
  id: Maybe<Scalars['String']['output']>;
  livemode: Maybe<Scalars['Boolean']['output']>;
  object: Maybe<Scalars['String']['output']>;
  type: Maybe<Scalars['String']['output']>;
  value: Maybe<Scalars['String']['output']>;
  verification: Maybe<StripeTaxIdVerification>;
};

export type StripeTaxIdVerification = {
  __typename?: 'StripeTaxIDVerification';
  status: Maybe<Scalars['String']['output']>;
  verified_address: Maybe<Scalars['String']['output']>;
  verified_name: Maybe<Scalars['String']['output']>;
};

export type StripeTransactions = {
  __typename?: 'StripeTransactions';
  data: Maybe<StripeTransactionsData>;
  has_more: Maybe<Scalars['Boolean']['output']>;
  object: Maybe<Scalars['String']['output']>;
  url: Maybe<Scalars['String']['output']>;
};

export type StripeTransactionsData = {
  __typename?: 'StripeTransactionsData';
  amount: Maybe<Scalars['Int']['output']>;
  bitcoin_amount: Maybe<Scalars['Int']['output']>;
  created: Maybe<Scalars['Timestamp']['output']>;
  currency: Maybe<Scalars['String']['output']>;
  id: Maybe<Scalars['String']['output']>;
  object: Maybe<Scalars['String']['output']>;
  receiver: Maybe<Scalars['String']['output']>;
};

export type StripeTransformQuantityRoundEnum =
  | 'down'
  | 'up';

export type TaxIdDatumType =
  | 'ad_nrt'
  | 'ae_trn'
  | 'ar_cuit'
  | 'au_abn'
  | 'au_arn'
  | 'bg_uic'
  | 'bh_vat'
  | 'bo_tin'
  | 'br_cnpj'
  | 'br_cpf'
  | 'ca_bn'
  | 'ca_gst_hst'
  | 'ca_pst_bc'
  | 'ca_pst_mb'
  | 'ca_pst_sk'
  | 'ca_qst'
  | 'ch_uid'
  | 'ch_vat'
  | 'cl_tin'
  | 'cn_tin'
  | 'co_nit'
  | 'cr_tin'
  | 'de_stn'
  | 'do_rcn'
  | 'ec_ruc'
  | 'eg_tin'
  | 'es_cif'
  | 'eu_oss_vat'
  | 'eu_vat'
  | 'gb_vat'
  | 'ge_vat'
  | 'hk_br'
  | 'hu_tin'
  | 'id_npwp'
  | 'il_vat'
  | 'in_gst'
  | 'is_vat'
  | 'jp_cn'
  | 'jp_rn'
  | 'jp_trn'
  | 'ke_pin'
  | 'kr_brn'
  | 'kz_bin'
  | 'li_uid'
  | 'mx_rfc'
  | 'my_frp'
  | 'my_itn'
  | 'my_sst'
  | 'ng_tin'
  | 'no_vat'
  | 'no_voec'
  | 'nz_gst'
  | 'om_vat'
  | 'pe_ruc'
  | 'ph_tin'
  | 'ro_tin'
  | 'rs_pib'
  | 'ru_inn'
  | 'ru_kpp'
  | 'sa_vat'
  | 'sg_gst'
  | 'sg_uen'
  | 'si_tin'
  | 'sv_nit'
  | 'th_vat'
  | 'tr_tin'
  | 'tw_vat'
  | 'ua_vat'
  | 'us_ein'
  | 'uy_ruc'
  | 've_rif'
  | 'vn_tin'
  | 'za_vat';

export type CheckoutMutationVariables = Exact<{
  cart: Array<ProductInput> | ProductInput;
  successUrl: InputMaybe<Scalars['String']['input']>;
  cancelUrl: InputMaybe<Scalars['String']['input']>;
  customer: InputMaybe<StripeCustomerInput>;
  mode: InputMaybe<StripeCheckoutModeEnum>;
  allowPromotionCodes: InputMaybe<Scalars['Boolean']['input']>;
}>;


export type CheckoutMutation = { __typename?: 'Mutation', checkout: { __typename?: 'StripeCheckoutSession', id: string, url: string | null } };

export type RetrieveStripeCheckoutSessionQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type RetrieveStripeCheckoutSessionQuery = { __typename?: 'Query', retrieveStripeCheckoutSession: { __typename?: 'StripeCheckoutSession', id: string, customer: string | null, customer_email: string | null, line_items: Array<{ __typename?: 'StripeLineItem', object: string | null } | null> | null } };

export type RetrieveFragmentFragment = { __typename?: 'StripeCustomer', name: string | null, email: string | null, id: string | null };

export type CreateFragmentFragment = { __typename?: 'StripeCustomer', id: string | null };

export type CreateStripeCustomerMutationVariables = Exact<{
  data: InputMaybe<CreateStripeCustomerInput>;
}>;


export type CreateStripeCustomerMutation = { __typename?: 'Mutation', createStripeCustomer: { __typename?: 'StripeCustomer', id: string | null } | null };

export type RetrieveStripeCustomerQueryVariables = Exact<{
  data: InputMaybe<RetrieveStripeCustomerInput>;
}>;


export type RetrieveStripeCustomerQuery = { __typename?: 'Query', retrieveStripeCustomer: { __typename?: 'StripeCustomer', name: string | null, email: string | null, id: string | null } | null };

export type StripeCustomerSearchQueryVariables = Exact<{
  query: InputMaybe<Scalars['String']['input']>;
}>;


export type StripeCustomerSearchQuery = { __typename?: 'Query', stripeCustomerSearch: { __typename?: 'StripeCustomer', id: string | null, name: string | null, email: string | null } | null };

export type FetchRetrieveStripeCustomerQueryVariables = Exact<{
  data: InputMaybe<RetrieveStripeCustomerInput>;
}>;


export type FetchRetrieveStripeCustomerQuery = { __typename?: 'Query', retrieveStripeCustomer: { __typename?: 'StripeCustomer', id: string | null, name: string | null, email: string | null } | null };

export type ListStripeCustomerPortalConfigQueryVariables = Exact<{
  params: InputMaybe<StripeCustomerPortalConfigParamsInput>;
}>;


export type ListStripeCustomerPortalConfigQuery = { __typename?: 'Query', listStripeCustomerPortalConfig: { __typename?: 'StripeCustomerPortalConfigList', data: Array<{ __typename?: 'StripeCustomerPortalConfig', id: string | null, is_default: boolean | null, active: boolean | null } | null> | null } | null };

export type CreateStripeCustomerPortalConfigMutationVariables = Exact<{
  data: InputMaybe<StripeCustomerPortalConfigInput>;
}>;


export type CreateStripeCustomerPortalConfigMutation = { __typename?: 'Mutation', createStripeCustomerPortalConfig: { __typename?: 'StripeCustomerPortalConfig', id: string | null } | null };

export type CreateStripeCustomerPortalSessionMutationVariables = Exact<{
  data: InputMaybe<StripeCustomerPortalInput>;
}>;


export type CreateStripeCustomerPortalSessionMutation = { __typename?: 'Mutation', createStripeCustomerPortalSession: { __typename?: 'StripeCustomerPortal', id: string, url: string | null } | null };

export type CreateStripeCustomerPortalSessionSkipAuthMutationVariables = Exact<{
  data: InputMaybe<StripeCustomerPortalInput>;
}>;


export type CreateStripeCustomerPortalSessionSkipAuthMutation = { __typename?: 'Mutation', createStripeCustomerPortalSessionSkipAuth: { __typename?: 'StripeCustomerPortal', id: string, url: string | null } | null };

export type ListFragmentFragment = { __typename?: 'StripeSubscription', id: string, customer: string | null, status: StripeSubscriptionStatusEnum | null };

export type ListStripeSubscriptionsQueryVariables = Exact<{
  data: InputMaybe<ListStripeSubscriptionsInput>;
}>;


export type ListStripeSubscriptionsQuery = { __typename?: 'Query', listStripeSubscriptions: Array<{ __typename?: 'StripeSubscription', id: string, customer: string | null, status: StripeSubscriptionStatusEnum | null } | null> | null };

export const RetrieveFragmentFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"RetrieveFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"StripeCustomer"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]} as unknown as DocumentNode<RetrieveFragmentFragment, unknown>;
export const CreateFragmentFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"CreateFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"StripeCustomer"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]} as unknown as DocumentNode<CreateFragmentFragment, unknown>;
export const ListFragmentFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ListFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"StripeSubscription"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"customer"}},{"kind":"Field","name":{"kind":"Name","value":"status"}}]}}]} as unknown as DocumentNode<ListFragmentFragment, unknown>;
export const CheckoutDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"Checkout"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"cart"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ProductInput"}}}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"successUrl"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"cancelUrl"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"customer"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"StripeCustomerInput"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"mode"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"StripeCheckoutModeEnum"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"allowPromotionCodes"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Boolean"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"checkout"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"cart"},"value":{"kind":"Variable","name":{"kind":"Name","value":"cart"}}},{"kind":"Argument","name":{"kind":"Name","value":"successUrl"},"value":{"kind":"Variable","name":{"kind":"Name","value":"successUrl"}}},{"kind":"Argument","name":{"kind":"Name","value":"cancelUrl"},"value":{"kind":"Variable","name":{"kind":"Name","value":"cancelUrl"}}},{"kind":"Argument","name":{"kind":"Name","value":"customer"},"value":{"kind":"Variable","name":{"kind":"Name","value":"customer"}}},{"kind":"Argument","name":{"kind":"Name","value":"mode"},"value":{"kind":"Variable","name":{"kind":"Name","value":"mode"}}},{"kind":"Argument","name":{"kind":"Name","value":"allowPromotionCodes"},"value":{"kind":"Variable","name":{"kind":"Name","value":"allowPromotionCodes"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"url"}}]}}]}}]} as unknown as DocumentNode<CheckoutMutation, CheckoutMutationVariables>;
export const RetrieveStripeCheckoutSessionDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"retrieveStripeCheckoutSession"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"retrieveStripeCheckoutSession"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"customer"}},{"kind":"Field","name":{"kind":"Name","value":"customer_email"}},{"kind":"Field","name":{"kind":"Name","value":"line_items"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"object"}}]}}]}}]}}]} as unknown as DocumentNode<RetrieveStripeCheckoutSessionQuery, RetrieveStripeCheckoutSessionQueryVariables>;
export const CreateStripeCustomerDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"createStripeCustomer"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateStripeCustomerInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createStripeCustomer"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"CreateFragment"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"CreateFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"StripeCustomer"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]} as unknown as DocumentNode<CreateStripeCustomerMutation, CreateStripeCustomerMutationVariables>;
export const RetrieveStripeCustomerDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"retrieveStripeCustomer"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"RetrieveStripeCustomerInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"retrieveStripeCustomer"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"RetrieveFragment"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"RetrieveFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"StripeCustomer"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]} as unknown as DocumentNode<RetrieveStripeCustomerQuery, RetrieveStripeCustomerQueryVariables>;
export const StripeCustomerSearchDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"stripeCustomerSearch"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"query"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"stripeCustomerSearch"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"query"},"value":{"kind":"Variable","name":{"kind":"Name","value":"query"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"email"}}]}}]}}]} as unknown as DocumentNode<StripeCustomerSearchQuery, StripeCustomerSearchQueryVariables>;
export const FetchRetrieveStripeCustomerDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"fetchRetrieveStripeCustomer"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"RetrieveStripeCustomerInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"retrieveStripeCustomer"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"email"}}]}}]}}]} as unknown as DocumentNode<FetchRetrieveStripeCustomerQuery, FetchRetrieveStripeCustomerQueryVariables>;
export const ListStripeCustomerPortalConfigDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"listStripeCustomerPortalConfig"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"params"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"StripeCustomerPortalConfigParamsInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"listStripeCustomerPortalConfig"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"params"},"value":{"kind":"Variable","name":{"kind":"Name","value":"params"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"is_default"}},{"kind":"Field","name":{"kind":"Name","value":"active"}}]}}]}}]}}]} as unknown as DocumentNode<ListStripeCustomerPortalConfigQuery, ListStripeCustomerPortalConfigQueryVariables>;
export const CreateStripeCustomerPortalConfigDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"createStripeCustomerPortalConfig"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"StripeCustomerPortalConfigInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createStripeCustomerPortalConfig"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<CreateStripeCustomerPortalConfigMutation, CreateStripeCustomerPortalConfigMutationVariables>;
export const CreateStripeCustomerPortalSessionDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"createStripeCustomerPortalSession"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"StripeCustomerPortalInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createStripeCustomerPortalSession"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"url"}}]}}]}}]} as unknown as DocumentNode<CreateStripeCustomerPortalSessionMutation, CreateStripeCustomerPortalSessionMutationVariables>;
export const CreateStripeCustomerPortalSessionSkipAuthDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"createStripeCustomerPortalSessionSkipAuth"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"StripeCustomerPortalInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createStripeCustomerPortalSessionSkipAuth"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"url"}}]}}]}}]} as unknown as DocumentNode<CreateStripeCustomerPortalSessionSkipAuthMutation, CreateStripeCustomerPortalSessionSkipAuthMutationVariables>;
export const ListStripeSubscriptionsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"listStripeSubscriptions"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"ListStripeSubscriptionsInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"listStripeSubscriptions"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ListFragment"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ListFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"StripeSubscription"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"customer"}},{"kind":"Field","name":{"kind":"Name","value":"status"}}]}}]} as unknown as DocumentNode<ListStripeSubscriptionsQuery, ListStripeSubscriptionsQueryVariables>;