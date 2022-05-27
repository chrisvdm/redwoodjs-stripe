#!/usr/bin/env node
const yargs = require('yargs/yargs')
const { hideBin } = require('yargs/helpers')
const setup = require('./setup')

yargs(hideBin(process.argv))
    .scriptName('stripe')
    .command('setup', 'Sets up Redwoodjs-stripe plugin', {
        subscription: {
            describe: 'flags for subscription payments',
            demandOption: false,
            type: 'boolean'
        },
        seed: {
            describe: 'flags for whether prices need to be seeded',
            demandOption: false,
            type: 'boolean'
        }
    }, ({ subscription, seed, _}) => {
        const process = _[0]
        switch (process) {
            case 'setup':
                setup({ subscription, seed})
                break;
            default:
                console.log('Need one more command...')
                break;
        }
        // const path = (argv._).join('/')
        // processPath = `./${path}/index.js`
        // console.log(argv)
    })
    .parse() 