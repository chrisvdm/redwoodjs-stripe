// @ts-check

const fs = require('fs-extra');

const importPlugin = async (options) => {
    const graphQLFile = `./api/src/functions/graphql.${options.fileType}`
    const text = {
        rwImports: [
            {
                regex: /import sdls from/g,
                replacement:'import * as rwSdls from'
            }, {
                regex: /import services from/g,
                replacement:'import * as rwServices from'
            }
        ],
        pluginImport: 'import { stripeSchemas, stripeServices } from \'@redwoodjs-stripe/api\'',
        apiGraphQL: [
            'const services = { ...rwServices, ...stripeServices }',
            'const sdls = { ...rwSdls, ...stripeSchemas }'
        ]
    }
    fs.readFile(graphQLFile, 'utf8', (err, data) => {
        let updatedFile = ''
        if (err) {
            return console.log(err);
        }
    
        // Replace services and sdls
        updatedFile = text.rwImports.reduce((resultData, imp) => {
            const newData = resultData.replace(imp.regex, imp.replacement)
            return newData
        }, data)


        // import plugin services at top of file
        updatedFile = (text.pluginImport).concat('\n\n', updatedFile)
    
        // create new sdls and schemas objects
        updatedFile = insertLinesAfter("import * as rwServices from \'src/services/**/*.{js,ts}\'", text.apiGraphQL, updatedFile )
        
        fs.writeFile(graphQLFile, updatedFile, 'utf8', (err) => {
            if (err) return console.log(err);
        });
      
    })
}

const insertLinesAfter = (txt, replacementArray, fileData) => {
    const SchemaStart = fileData.indexOf(txt) + txt.length
    const firstSection = fileData.slice(0, SchemaStart)
    const endSection = fileData.slice(SchemaStart)
    const insertedPar =replacementArray.join('\n')
    return firstSection.concat(`\n\n${insertedPar}`, endSection)   
}

module.exports = {
    importPlugin
}