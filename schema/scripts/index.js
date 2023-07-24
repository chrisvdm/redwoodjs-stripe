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
      const activeObjects = ["checkout.session", "customer"]
      
      const schemaQueryRootType = buildSchema(`
        type Query {
          _: String!
        }
      `)

      const queryType = new GraphQLObjectType({
    name: 'Query',
    fields: () => {
      const result = {};
      for (const [name, type] of context.types.entries()) {
        // It's ok to ignore the object injection attack here because
        // the object being edited does not contain any private data to be
        // protected and none of the attributes will be used as functions
        // just a map of attribute to values.
        // eslint-disable-next-line security/detect-object-injection
        result[name] = { type };
      }
      return result;
    }
  });
        console.log(queryType)
        // Create new object of openapi schema objects
        // let graphqlTypes = {}
        // activeObjects.forEach(obj => {
        //   const jsonType = openAPISchema[obj]

        //   graphqlTypes[graphqlTypeNameFromJsonTypeName(obj)] = buildGraphQLType(jsonType)
        // });
      
        // const buildGraphQLType = (jsonType) => new GraphQLObjectType({
        //   fields: jsonType.properties.map(graphQLObjectFieldFromJsonTypeProperty)
        // })
      
        // const graphqlTypes = {}


  } catch (err) {
    console.log('fetch error', err);
  }
}

main()

// const types = {}
// types.checkoutSession = new GraphQLObjectType({
//   fields: checkoutSessionProperties.map(prop => ({
//     type: types.customer
//   }))
// })

// const queryType = new GraphQLObjectType({
//     name: 'Query',
//     fields: {
//       checkoutSession: {
//         type: types.checkoutSession, 
//       }
//     }
//   });