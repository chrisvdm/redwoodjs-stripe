import { stripeSchemas, stripeServices } from '@redwoodjs-stripe/api'

import { createGraphQLHandler } from '@redwoodjs/graphql-server'

import directives from 'src/directives/**/*.{js,ts}'
import * as rwSdls from 'src/graphql/**/*.sdl.{js,ts}'
import * as rwServices from 'src/services/**/*.{js,ts}'

import { db } from 'src/lib/db'
import { logger } from 'src/lib/logger'

const services = { ...rwServices, ...stripeServices }
const sdls = { ...rwSdls, ...stripeSchemas }

export const handler = createGraphQLHandler({
  loggerConfig: { logger, options: {} },
  directives,
  sdls: sdls,
  services: services,
  onException: () => {
    // Disconnect from your database with an unhandled exception.
    db.$disconnect()
  },
})
