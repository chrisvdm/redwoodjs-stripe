#!/usr/bin/env node
const yargs = require("yargs/yargs");
const { hideBin } = require('yargs/helpers')

const { setup } = require("./setup");
const { upgrade } = require("./upgrade");

const main = () => {
  yargs(hideBin(process.argv))
    .scriptName("redwoodjs-stripe")
    .demandCommand()
    .command({
      command: "setup",
      describe: "Scaffolds out the files needed for using Stripe with Redwood",
      async handler(args) {
        await setup(args);
      },
    })
    .command({
      command: "upgrade",
      describe: "Upgrades the plugin's api and web side packages",
      async handler(args) {
        await upgrade(args);
      },
    })
    .parse();
}

if (require.main === module) {
  main();
}