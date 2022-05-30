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

  enum ProductType {
    one_time
    recurring
  }

  type Query {
    products(type: ProductType): [Product!]! @skipAuth
  }
`