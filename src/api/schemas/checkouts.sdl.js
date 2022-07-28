export const schema = `
  type Session {
    id: String!
    customerId: String
    customerEmail: String
    customerName: String
    customerSignedUp: Boolean
    sessionUrl: String
  }

  enum Mode {
    payment
    subscription
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
    getSession(id: ID!): Session! @skipAuth
  }

  type Mutation {
    # In GraphQL, we can't reuse types as mutation inputs
    # (otherwise we'd just type "cart" as "[Product!]!")
    checkout(cart: [ProductInput!]!, cancelUrl: String, successUrl: String, customer: StripeCustomerInput): Session! @skipAuth
  }
`
