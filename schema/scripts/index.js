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
      // const activeTypes = ["checkout.session", "customer"]

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
      const toCamelCase = (str) => {
        const words = str.split(/[-_.]/g)
        if (words.length > 0) {
          let newStr = words[0]
          for (let i in words) {
            if (i > 0) {
              newStr += words[i].charAt(0).toUpperCase() + words[i].slice(1);
            } 
          } 
          return newStr
        } // end multi word if
        return words[0]
      } // end toCamelCase fn

      const getHashGraphQLType = () => {
        return new graphql.GraphQLScalarType({
          name: "Hash"
        })
      }

      const getEnumGraphQLType = (ugh) => {
        const { name, title, props } = ugh

        const enumValueObj = {}
        props.enum.forEach(value => {
          const enumName = toCamelCase(value)
          enumValueObj[enumName] = {value: value}
        })

        return new graphql.GraphQLEnumType({
          name: toCamelCase(`stripe_${name}_enum`),
          description: props.description,
          values: enumValueObj,
        })
      }
      
      const getBasicGraphQLType = (type) => {
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

      const getPropertyGraphQLType = (schema) => {
        const { props, name, isExpandable } = schema
        
        // determine whether prop is scalar
        const isRef = Object.hasOwn(props, `\$ref`)
        const isUnion = Object.hasOwn(props, 'AnyOf')
        const isEnum = Object.hasOwn(props, 'enum')
        const isHash = props.type === 'object' && !Object.hasOwn(props, 'properties') && !isExpandable
        const isObject = !isHash && props.type === 'object'

        if (!isRef && !isUnion && !isHash && !isObject && !isEnum) {
            return getBasicGraphQLType(props.type)
        }
        
        if (isEnum) {
          return getEnumGraphQLType(schema)
        }
        if (isHash) {
          return getHashGraphQLType()
        }
        if (isUnion) {
          return
        }
        if (isRef) {
          return 
        }
        if (isObject) {
          return
        }

        return undefined
      }

      const getGraphQLObjectType = (name) => {
        let objectFieldsGraphQLType = {}
        // TODO expand to objects

        // get data from openAPISchema
        const schemaField = openAPISchema[name]
        const { properties, required, title, description } = schemaField
        const expandable = schemaField['x-expandableFields']
        
        // Goes through each property and return corresponding GraphQL Types
        Object.keys(properties).forEach(name => {
          const props = properties[name]
          // const isRequired = required.includes(name)

          const propGraphQLType = getPropertyGraphQLType({
            name: name,
            title: title,
            props: props,
            isExpandable: expandable.includes(name),
          })
          
          objectFieldsGraphQLType[name] = {
            type: propGraphQLType
            // Put back once all types are defined
            // type: isRequired ? new graphql.GraphQLNonNull(propGraphQLType) : propGraphQLType
          }

        });

        console.log(objectFieldsGraphQLType)

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