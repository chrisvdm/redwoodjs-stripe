import * as GraphQLJS from 'graphql'
import { envelop, useEngine, useSchema } from '@envelop/core'

const schema = buildSchema(`
  type Query {
    hello: String
  }
`)
 
export const getEnveloped = envelop({
  plugins: [useSchema(schema)]
})

