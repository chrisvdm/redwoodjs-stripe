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

      // 2. Build out types defined in QueryType
      //      1st iteration: Build first level properties
      //      2nd iteration: Build recursively as required for QueryType

      // 3. Create new schema using Query as the root  
      // var schema = new graphql.GraphQLSchema({ query: queryType })

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

      const capitalize = (str) => {
        const words = str.split(/[-_.]/g)
          let newStr = ''
          for (let i in words) {
              newStr += words[i].charAt(0).toUpperCase() + words[i].slice(1);
          } 
        return newStr
      } // end toCamelCase fn

      const getGraphQLReferenceType = (properties) => {
        const ref = properties['$ref']
        const fieldName = ref.slice(ref.lastIndexOf('/') + 1)
        return getGraphQLObjectType(openAPISchema[fieldName])
      }

      const getGraphQLUnionType = (schema) => {
        // console.log("==========UNION===========")
        // console.log(schema)
        // console.log(schema.props.anyOf)
      }

      const getGraphQLExpandableType = (schema) => {
        console.log("==============EXPANDABLE=========================")
        console.log(schema.properties)
        console.log("--------------------------------------------//END")
      }

      const getGraphQLListType = (schema) => {
        const { name, isExpandable, properties: {items, description}} = schema
        const itemSchema = {
          name,
          description,
          isExpandable,
          properties: items,
          fromList: true
        }

        console.log("List Item: ", name)

        itemType = getPropertyGraphQLType(itemSchema)
        if (typeof itemType === "undefined") {
          return
        }
      }

      const getGraphQLHashType = () => {
        return new graphql.GraphQLScalarType({
          name: "stripeHash"
        })
      }

      const getGraphQLEnumType = ({ name, properties }) => {
        const enumValueObj = {}
        properties.enum.forEach(value => {
          const enumName = toCamelCase(value)
          enumValueObj[enumName] = {value: value}
        })

        return new graphql.GraphQLEnumType({
          name: capitalize(`stripe_${name}_enum`),
          description: properties.description,
          values: enumValueObj,
        })
      }
      
      const getGraphQLBasicType = (type) => {
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

      const getPropertyGraphQLType = (field) => {
        const { properties, isExpandable } = field
        // determine whether prop is scalar
        const isRef = Object.hasOwn(properties, `\$ref`)
        const isUnion = Object.hasOwn(properties, 'anyOf')
        const isEnum = Object.hasOwn(properties, 'enum')
        const isArray = properties.type === 'array'
        const isHash = properties.type === 'object' && !Object.hasOwn(properties, 'properties') && !isExpandable
        const isObject = !isHash && properties.type === 'object'

        if (!isRef && !isUnion && !isHash && !isObject && !isEnum && !isArray) {
            return getGraphQLBasicType(properties.type)
        }

        if (isExpandable) {
          return getGraphQLExpandableType(field)
        }

        if (isObject) {
          if (Object.hasOwn(properties, 'additionalProperties') && !Object.hasOwn(properties, 'properties')){
            const payload = {
              ...properties,
              properties: properties.additionalProperties
            }
            
            return getGraphQLObjectType()}
          return getGraphQLObjectType(properties)
        }

        if (isRef) {
          return getGraphQLReferenceType(properties)
        }
        
        if (isEnum) {
          return getGraphQLEnumType(field)
        }
        if (isArray) {
          // return getGraphQLListType(field)
        }
        
        if (isUnion) {
          return getGraphQLUnionType(field)
        }

        if (isHash) {
          return getGraphQLHashType()
        }
        return undefined
      }

      const getGraphQLObjectType = (schemaField) => {
        const { properties, required, title, description } = schemaField
        const expandable = schemaField['x-expandableFields']

        // Check whether object exists
        const typeName = capitalize(`stripe_${title}`)
        if (seen.has(typeName)) {
          // if object type exists return 
          return seen.get(typeName)
        }

        let objectFieldsGraphQLType = {}

        // Goes through each property and return corresponding GraphQL Types
        Object.keys(properties).forEach(name => {
          const props = properties[name]
          // const isRequired = required.includes(name)

          const propGraphQLType = getPropertyGraphQLType({
            name: name,
            properties: props,
            isExpandable: expandable.includes(name),
          })
          
          objectFieldsGraphQLType[name] = {
            type: propGraphQLType
            // type: isRequired ? new graphql.GraphQLNonNull(propGraphQLType) : propGraphQLType
          }

        });

        // Construct object type
        const newType = new graphql.GraphQLObjectType({
          title: `Stripe${title}`,
          name: capitalize(`Stripe_${title}`),
          description: description,
          fields: {...objectFieldsGraphQLType},
        })
        seen.set(typeName, newType)
        return newType
      }

      // Lookup for object types
      const seen = new Map()

      getGraphQLObjectType(openAPISchema['checkout.session'])

  } catch (err) {
    console.log('fetch error', err);
  }
}

main()