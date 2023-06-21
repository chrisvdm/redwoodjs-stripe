// @ts-check

const util = require('node:util');
const fs = require('fs-extra');

(async () => {
    const graphQLFile = './api/src/functions/graphql.js'
    const text = {
        rwImports: [
            {
                regex: /import sdls from/g,
                replacement:'import * as rwSdls from'
            }, {
                regex: /import schemas from/g,
                replacement:'import * as rwSchemas from'
            }
        ],
        pluginImport: 'import { stripeSchemas, stripeServices } from \'@redwoodjs-stripe/api\'',
        apiServicesAndSchemas: [
            'const services = { ...rwServices, ...stripeServices }',
            'const sdls = { ...rwSdls, ...stripeSchemas }'
        ]
    }
    fs.readFile(graphQLFile, 'utf8', (err, data) => {
    
        if (err) {
            return console.log(err);
        }
    
        // Replace services and sdls
        const result = data.replace(/import sdls from/g, 'import * as rwSdls from');
        const result2 = result.replace(/import services from/g, 'import * as rwServices from');

        // import plugin services at top of file
        const fileWithImports = ('import { stripeSchemas, stripeServices } from \'@redwoodjs-stripe/api\'').concat('\n\n', result2)
    
        // create new sdls and schemas objects
        const reassignedRWGraphQL = "import * as rwServices from \'src/services/**/*.{js,ts}\'"
        const SchemaStart = fileWithImports.indexOf(reassignedRWGraphQL) + reassignedRWGraphQL.length
        const firstSection = fileWithImports.slice(0, SchemaStart)
        const endSection = fileWithImports.slice(SchemaStart)
        const completeFile = firstSection.concat(`\n\nconst services = { ...rwServices, ...stripeServices }\nconst sdls = { ...rwSdls, ...stripeSchemas }`, endSection)
    
        fs.writeFile(graphQLFile, completeFile, 'utf8', (err) => {
            if (err) return console.log(err);
        });
      
    })
})()