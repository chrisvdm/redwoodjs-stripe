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

  input StripeProductParams {
    active: Boolean
  }

  input StripePriceParams {
    type: ProductType
  }

  input Params {
    productParams: StripeProductParams
    priceParams: StripePriceParams
  }

  enum ProductType {
    one_time
    recurring
  }

  type Query {
    products(params: Params): [Product!]! @skipAuth
  }
`