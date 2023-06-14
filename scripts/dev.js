const Tasks = require('listr');
const util = require('util');
const fs = require('fs')
const exec = util.promisify(require('child_process').exec);
import * as esbuild from 'esbuild'


const linkPackages = async (options, task) => {
    task.title = 'Linking api side'
    await exec(`(cd ${options.appDir}/api && npx link ../../redwoodjs-stripe/api)`, { cwd: options.dir });
    task.title = 'Linking web side'
    await exec(`(cd ${options.appDir}/web && npx link ../../redwoodjs-stripe/web)`, { cwd: options.dir });
}
   
const watchForChanges = async (options) => {
let ctx = await esbuild.context({
  entryPoints: ['app.js'],
  outfile: 'out.js',
  bundle: true,
})

await ctx.watch()
console.log('watching...')
}

const argsFormatter = (args) => {
    // normalise args array
    const argArray = args.slice(2)
    // find flags
    const flags = []
    argArray.filter(i => i.startsWith('--')).forEach(f => { flags.push(f.slice(2)) })
    const appDir = argArray.filter(i => !i.startsWith('--'))[0]

    // Check for app directory
    const dirExists = fs.existsSync(appDir)
    if (!dirExists) {
        throw new Error("   Please give a relative path to app directory")
    }

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
    
  const tasks = [
    {
        title: 'Linking @redwoodjs-stripe packages to app directory',
        task: (ctx, task) => linkPackages(options, task),
        skip: () => {
            if (options.flags.includes('setup')) {
                return false
            } 
        }
    },
    {
      title: 'Watching for changes',
      task: () => watchForChanges(options),
    },
  ];

  await new Tasks(tasks.filter(Boolean)).run();
})()