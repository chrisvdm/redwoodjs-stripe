#!/usr/bin/env node
const path = require("node:path");

const baseSpawn = require("@npmcli/promise-spawn");
const esbuild = require("esbuild");
const { glob } = require("glob");
const chokidar = require("chokidar");
const fs = require("fs-extra");
const syncDir = require("sync-directory");

const args = require("yargs")(process.argv.slice(2)).argv;

const rootDir = path.resolve(__dirname, "..");

const webConfig = (format) => ({
  platform: "browser",
  jsx: "automatic",
  loader: { ".js": "jsx" },
  format,
});

const apiConfig = (format) => ({
  platform: "node",
  format,
});

const esbuildConfigs = {
  "web:cjs": webConfig("cjs"),
  "web:esm": webConfig("esm"),
  "api:cjs": apiConfig("cjs"),
  "api:esm": apiConfig("esm"),
  "cli:cjs": {
    platform: "node",
    format: "cjs",
  },
};

const typedDistSet = new Set(["api:esm", "web:esm"]);

const spawn = (...args) =>
  baseSpawn(...args, {
    ...(process.env.DEBUG ? { stdio: "inherit" } : {}),
  });

const tasks = {
  async build() {
    await tasks.codegen();
    await cleanAll();
    return Promise.all([
      ...Object.keys(esbuildConfigs).map(buildDistRuntime),
      ...Object.keys(esbuildConfigs).map(buildDistTypes),
    ]);
  },
  async typecheck() {
    await tasks.codegen();
    return Promise.all(Object.keys(esbuildConfigs).map(buildDistTypes));
  },
  async codegen() {
    await Promise.all(["web", "api"].map(codegenPackage));
  },
  sync() {
    ["web:cjs", "web:esm", "api:cjs", "api:esm"].forEach(syncDist);
  },
};

const codegenPackage = async (pkg) => {
  console.log(`(${pkg}) Generating...`);
  await fs.remove(path.resolve(rootDir, pkg, "src", "generated"));
  await spawn("graphql-codegen", ["--config", `./codegen.${pkg}.ts`]);
};

const srcGlobFromDist = (dist, root = rootDir) =>
  path.resolve(srcDirFromDist(dist, root), "**", "!(*.test).*");

const srcDirFromDist = (dist, root = rootDir) => {
  const [pkg, _distName] = dist.split(":");
  return path.resolve(root, pkg, "src");
};

const pkgFromDist = (dist) => dist.split(":")[0];

const destDirFromDist = (dist, root = rootDir) => {
  const [pkg, distName] = dist.split(":");
  return path.resolve(distDirFromPkg(pkg, root), distName);
};

const distDirFromPkg = (pkg, root = rootDir) => path.resolve(root, pkg, "dist");

const syncDist = async (dist) => {
  const pkg = pkgFromDist(dist);
  let ready = false;
  const target = args.target;
  let ctx = null;

  const srcDir = srcDirFromDist(dist);
  const destDir = destDirFromDist(dist);
  const targetDir = destDirFromDist(
    dist,
    path.resolve(process.cwd(), target, "node_modules", "@redwoodjs-stripe"),
  );

  const resetContext = async () => {
    // It would seem we need to recreate the context on file adds/removes, since
    // esbuild does not provide a glob or stream api for entry points
    ctx = await esbuild.context({
      ...esbuildConfigs[dist],
      entryPoints: await glob(srcGlobFromDist(dist)),
    });
  };

  const handleAll = async (event, filepath) => {
    if (!ready) {
      return;
    }

    console.log(
      `(${dist}) Rebuilding and syncing: ${event} for ${path.relative(
        rootDir,
        filepath,
      )}...`,
    );

    if (event === "unlink") {
      // note: A file was removed, but we don't know over here what the corresponding
      // destination file to be removed is (e.g. if the extension changed). We
      // assume the extension is the same, but we'll have stale files if not
      await fs.remove(path.resolve(destDir, path.relative(srcDir, filepath)));
      await resetContext();
    } else if (event === "add") {
      await resetContext();
    }

    await attempt(async () => {
      await ctx.rebuild();
      await buildDistTypes(dist);
    });
  };

  const handleReady = () => {
    ready = true;
    console.log(`(${dist}) Watching for changes...`);
  };

  await codegenPackage(pkg);
  await cleanDist(dist);
  await buildDistRuntime(dist);
  await buildDistTypes(dist);

  ctx = await esbuild.context(esbuildConfigs[dist]);

  const syncWatcher = syncDir(destDir, targetDir, { watch: true });
  const srcWatcher = chokidar
    .watch(srcGlobFromDist(dist))
    .on("ready", handleReady)
    .on("all", handleAll);

  process.once("SIGINT", async () => {
    await Promise.all([ctx.dispose(), srcWatcher.close(), syncWatcher.close()]);
  });
};

const buildDistTypes = (dist) => {
  const pkg = pkgFromDist(dist);

  if (!typedDistSet.has(dist)) {
    return;
  }

  console.log(`(${dist}) Building types...`);

  return spawn("tsc", [
    "--incremental",
    "--declaration",
    "--emitDeclarationOnly",
    "--project",
    path.join(rootDir, pkg, "tsconfig.json"),
    "--outDir",
    destDirFromDist(dist),
  ]);
};

const cleanAll = async () => {
  const pkgs = new Set(Object.keys(esbuildConfigs).map(pkgFromDist));

  for (const pkg of pkgs) {
    await fs.remove(distDirFromPkg(pkg));
  }
};

const cleanDist = async (dist) => {
  console.log(`(${dist}) Cleaning...`);
  await fs.remove(destDirFromDist(dist));
};

const buildDistRuntime = async (dist) => {
  console.log(`(${dist}) Building...`);
  await esbuild.build(esbuildConfigs[dist]);
};

const setup = async () => {
  for (const dist of Object.keys(esbuildConfigs)) {
    esbuildConfigs[dist] = {
      ...esbuildConfigs[dist],
      entryPoints: await glob(srcGlobFromDist(dist)),
      outdir: destDirFromDist(dist),
    };
  }
};

const attempt = async (fn) => {
  try {
    return await fn();
  } catch (error) {
    console.error(error.toString());

    if (error.stdout) {
      console.log(error.stdout);
    }

    if (error.stderr) {
      console.log(error.stderr);
    }

    process.exitCode = 1;
  }
};

const main = async () => {
  await setup();
  await attempt(tasks[args.task]);
};

main();
