export const schema = `
  scalar URL

  type Product {
    id: ID!
    name: String!
    image: String
    description: String
    price: Int!
    type: String!
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
    type: ProductType
  }

  input StripeProductsParamsInput {
    productParams: StripeProductParamsInput
    priceParams: StripePriceParamsInput
  }

  enum ProductType {
    one_time
    recurring
  }

  type Query {
    products(params: StripeProductsParamsInput): [Product!]! @skipAuth
    productByPrice(id: ID!): Product! @skipAuth
  }
`