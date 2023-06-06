#!/usr/bin/env node
const yargs = require("yargs");

const { setup } = require("./setup");
const { upgrade } = require("./upgrade");

const main = () =>
  yargs.scriptName("redwoodjs-stripe").command({
    command: "setup",
    describe: "Scaffolds out the files needed for using stripe with redwood",
    handler(args) {
      setup(args);
    },
  })
  .command({
    command: "upgrade",
    describe: "Upgrades plugin's api and web side packages",
    handler(args) {
      upgrade(args);
    },
  })
  .argv;

if (require.main === module) {
  main();
}