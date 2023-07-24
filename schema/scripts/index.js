const fetch = require('node-fetch');
const graphql = require("graphql")

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
      // const queryType = new graphql.GraphQLObjectType({
      //   name: "Query",
      //   fields: {
      //     stripeCustomer: {
      //       type: getGraphQLObjectType('customer', context),
      //       args: {
      //         id: { type: graphql.GraphQLID },
      //       }
      //     },
      //   },
      // })

      
      const getGraphQLType = (type) => {
        switch (type) {
          case 'string':
            return graphql.GraphQLString
          case 'integer':
            return graphql.GraphQLInt
          case 'boolean':
            return graphql.GraphQLBoolean
          case 'id':
            return graphql.GraphQLID
        }
      }

      const getPropertyGraphQLType = ({props, name, isExpandable, isRequired}) => {
          // determine whether prop is scalar
          const isRef = Object.hasOwn(props, `\$ref`)
          const isUnion = Object.hasOwn(props, 'AnyOf')
          const isEnum = Object.hasOwn(props, 'enum')
          const isHash = props.type === 'object' && !Object.hasOwn(props, 'properties') && !isExpandable
          const isObject = !isHash && props.type === 'object'

        if (!isRef && !isUnion && !isHash && !isObject && !isEnum) {
            return getGraphQLType(props.type)
        }

        if (isRef) {
          return
        }
        if (isUnion) {
          return
        }
        if (isEnum) {
          return
        }
        if (isHash) {
          return
        }
        if (isObject) {
          return
        }

        return undefined
      }

      const getGraphQLObjectType = (name) => {
        let objectFieldsGraphQLType = {}
        // TODO sanitise name string
        // - remove 'stripe' prefix

        // get data from openAPISchema
        const schemaField = openAPISchema[name]
        const { properties, required, title, description } = schemaField
        const expandable = schemaField['x-expandableFields']
        
        // Goes through each property and return corresponding GraphQL Types
        Object.keys(properties).forEach(name => {
          const propGraphQLType = getPropertyGraphQLType({
            name: name,
            props: properties[name],
            isExpandable: expandable.includes(name),
            isRequired: required.includes(name)
          })
          
          objectFieldsGraphQLType[name]= {
            type: propGraphQLType
          }

        });

        // Construct object type
        return new graphql.GraphQLObjectType({
          name: `stripe${title}`,
          description: description,
          fields: {...objectFieldsGraphQLType},
        })
      }

      console.log(getGraphQLObjectType('checkout.session'))

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