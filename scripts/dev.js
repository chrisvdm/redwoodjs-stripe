const Tasks = require('listr');
const util = require('util');
const fs = require('fs')
const exec = util.promisify(require('child_process').exec);
const esbuild = require('esbuild')

const watchForChanges = async ({appDir}) => {
    let ctxCli = await esbuild.context({
        entryPoints: ['./cli/src/cli.js'],
        outdir: './cli/dist/',
        platform: 'node',
        format: 'cjs'
    })
    
    let ctxApi = await esbuild.context({
        entryPoints: ['./api/src/index.js'],
        outdir: './api/dist/',
        platform: 'node',
        format: 'cjs'
    })
    
    let ctxWeb = await esbuild.context({
        entryPoints: ['./web/src/index.js'],
        outdir: './web/dist/',
        platform: 'node',
        format: 'cjs'
    })

    await ctxApi.watch()
    await ctxCli.watch()
    await ctxWeb.watch()
    console.log('watching for changes...')
}

const argsFormatter = (args) => {
    // normalise args array
    const argArray = args.slice(2)
    // find flags
    const flags = []
    argArray.filter(i => i.startsWith('--')).forEach(f => { flags.push(f.slice(2)) })
    const appDir = argArray.filter(i => !i.startsWith('--'))[0]

    

    return {
        flags: flags,
        appDir: appDir
    }
}

(async () => {
  const options = {
      dir: process.cwd(),
      ...argsFormatter(process.argv)
  };
    
    if (options.flags.includes('setup')) {
      await linkPackages(options)
    } 
    watchForChanges(options)
})()