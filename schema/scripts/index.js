const fetch = require('node-fetch');
const { buildSchema } = require("graphql")

const main = async () => {
    try {
        // Fetch Stripe openAPI spec
        const openAPIBlob = await fetch('https://raw.githubusercontent.com/stripe/openapi/master/openapi/spec3.json');
        const openAPI = JSON.parse(await openAPIBlob.text());

        // Retrieve schema information
        const openAPISchema = openAPI.components.schemas

        // Specify active (used) Stripe Objects
        // TODO: Empty array leads to all objects being processed
      const activeTypes = ["checkout.session", "customer"]
      console.log(Object.keys(openAPISchema))

      // Constructing types from Query (excluding resolvers for first iteration)
      // https://graphql.org/graphql-js/constructing-types/

      // Reference for development:
      // `type Query {
      //   stripeCustomer(id: $id): StripeCustomer
      //   stripeCheckoutSession(id: $id): StripeCheckoutSession
      // }`

      // 1. Build Query GraphQL Types
      //    1st iteration:  Build from scratch
      //    2nd iteraction: Build from sdl

      // Define the Query type
      const queryType = new graphql.GraphQLObjectType({
        name: "Query",
        fields: {
          stripeCustomer: {
            type: getGraphQLObjectType('stripeCustomer'),
            args: {
              id: { type: graphql.GraphQLID },
            }
          },
        },
      })

      const getGraphQLObjectType = (name) => {

      }

      // 2. Build out types defined in QueryType
      //      1st iteration: Build first level properties
      //      2nd iteration: Build recursively as required for QueryType

      // 3. Create new schema using Query as the root  
      // var schema = new graphql.GraphQLSchema({ query: queryType })

      // console.log(schema)



  } catch (err) {
    console.log('fetch error', err);
  }
}

main()