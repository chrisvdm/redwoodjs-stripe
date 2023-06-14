#!/usr/bin/env node
const path = require('path')

const { glob } = require('glob')
const esbuild = require('esbuild')
const chokidar = require('chokidar')
const fs = require('fs-extra')
const syncDir = require('sync-directory')

const args = require('yargs')(process.argv.slice(2)).argv

const rootDir = path.resolve(__dirname, '..')

const configs = {
    web: {
        platform: 'browser',
        jsx: 'automatic',
        loader: { '.js': 'jsx' },
        format: 'cjs',
    },
    api: {
        platform: 'node',
        format: 'cjs',
    },
    cli: {
        platform: 'node',
        format: 'cjs',
    }
}

const tasks = {
    build() {
        return Promise.all(Object.keys(configs).map(buildPkg));
    },
    sync() {
        ;['web', 'api'].forEach(syncPkg)
    }
}

const srcGlobFromPkg = (pkg, root=rootDir) => path.resolve(srcDirFromPkg(pkg, root), '**', '!(*.test).*')
const srcDirFromPkg = (pkg, root=rootDir) => path.resolve(root, pkg, 'src')
const destDirFromPkg = (pkg, root=rootDir) => path.resolve(root, pkg, 'dist')

const syncPkg = async (pkg) => {
    let ready = false
    const target = args.target
    let ctx = null

    const pkgSrcDir = srcDirFromPkg(pkg)
    const pkgDestDir = destDirFromPkg(pkg)
    const targetDestDir = destDirFromPkg(pkg, path.resolve(process.cwd(), target, 'node_modules', '@redwoodjs-stripe'))

    const resetContext = async () => {
        // It would seem we need to recreate the context on file adds/removes, since
        // esbuild does not provide a glob or stream api for entry points
        ctx = await esbuild.context({
            ...configs[pkg],
            entryPoints: await glob(srcGlobFromPkg(pkg)),
        })
    }
    
    const handleAll = async (event, filepath) => {
        if (!ready) {
            return
        }

        console.log(`(${pkg}) Rebuilding and syncing: ${event} for ${path.relative(rootDir, filepath)}...`)

        if (event === 'unlink') {
            // note: A file was removed, but we don't know over here what the corresponding
            // destination file to be removed is (e.g. if the extension changed). We
            // assume the extension is the same, but we'll have stale files if not 
            await fs.remove(path.resolve(pkgDestDir, path.relative(pkgSrcDir, filepath)))
            await resetContext()
        }
        else if (event === 'add') {
            await resetContext()
        }

        await ctx.rebuild()
    }
    
    const handleReady = () => {
        ready = true
        console.log(`(${pkg}) Watching for changes...`)
    }

    await buildPkg(pkg)
    ctx = await esbuild.context(configs[pkg])
    const syncWatcher = syncDir(pkgDestDir, targetDestDir, { watch: true })
    const srcWatcher = chokidar.watch(srcGlobFromPkg(pkg)).on('ready', handleReady).on('all', handleAll)
    
    process.once('SIGINT', async () => {
        await Promise.all([
            ctx.dispose(),
            srcWatcher.close(),
            syncWatcher.close()
        ])
    })
}

const buildPkg = async (pkg) => {
    console.log(`(${pkg}) Cleaning...`)
    await fs.remove(destDirFromPkg(pkg))

    console.log(`(${pkg}) Building...`)
    await esbuild.build(configs[pkg])
}

const setup = async () => {
    for (const pkg of Object.keys(configs)) {
        configs[pkg] = {
            ...configs[pkg],
            entryPoints: await glob(srcGlobFromPkg(pkg)),
            outdir: destDirFromPkg(pkg),
        }
    }
}

const main = async () => {
    await setup()
    await tasks[args.task]()
}


main()