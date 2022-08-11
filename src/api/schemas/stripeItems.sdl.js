export const schema = `
  scalar URL

  type StripeItem {
    id: ID!
    name: String
    images: [String]
    description: String
    price: Int
    quantity: Int
    type: StripeItemTypeEnum
  }

  input StripeCreatedInput {
    gt: String
    gte: String
    lt: String
    lte: String
  }

  input StripeRecurringPriceInput {
    interval: StripeRecurringPriceInterval
    usage_type: StripeRecurringPriceUsageType
  }

  enum StripeRecurringPriceInterval {
    day
    week
    month
    year
  }

  enum StripeRecurringPriceUsageType {
    metered
    licensed
  }

  input StripeProductParamsInput {
    active: Boolean
    created: StripeCreatedInput
    ending_before: String
    ids: [ID]
    limit: Int
    shippable: Boolean
    starting_after: String
    url: String
  }

  input StripePriceParamsInput {
    active: Boolean
    currency: String
    product: ID
    created: StripeCreatedInput
    ending_before: String
    limit: Int
    lookup_keys: String
    recurring: StripeRecurringPriceInput
    starting_after: String
    type: StripeItemTypeEnum
  }

  input StripeItemsParamsInput {
    productParams: StripeProductParamsInput
    priceParams: StripePriceParamsInput
  }
  
  enum StripeItemTypeEnum {
    one_time
    recurring
  }

  type Query {
    stripeItems(params: StripeItemsParamsInput): [StripeItem!]! @skipAuth
    stripeItem(id: ID!): StripeItem @skipAuth
  }
`