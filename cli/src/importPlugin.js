// @ts-check

const path = require('node:path');

const fs = require('fs-extra');

const { resolveFile } = require('@redwoodjs/project-config')

const PLUGIN_IMPORT = "import { stripeSchemas, stripeServices } from '@redwoodjs-stripe/api'"

const importPlugin = async (options) => {
  const graphQLFilePath = resolveFile(path.join(options.redwoodProjectPaths.api.functions, 'graphql'))

  const graphQLFileContent = fs.readFileSync(graphQLFilePath, 'utf-8')

  const matches = graphQLFileContent.matchAll(/import .* from .*/g)
  const lastMatch = Array.from(matches).pop()

  let newGraphQlFileContent = [
      graphQLFileContent.slice(0, lastMatch.index + lastMatch[0].length), 
      PLUGIN_IMPORT,
      graphQLFileContent.slice(lastMatch.index + lastMatch[0].length)
  ].join('\n')

  newGraphQlFileContent = newGraphQlFileContent.replace(/\bsdls,/, 'sdls: { ...sdls, ...stripeSchemas },')
  newGraphQlFileContent = newGraphQlFileContent.replace(/\bservices,/, 'services: { ...services, ...stripeServices },')

  fs.writeFileSync(graphQLFilePath, newGraphQlFileContent)
}

module.exports = {
  importPlugin
}
