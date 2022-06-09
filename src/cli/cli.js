#!/usr/bin/env node
const yargs = require("yargs");

const { setup } = require("./setup");

const main = () =>
  yargs.scriptName("redwood-stripe").command({
    command: "setup",
    describe: "Scaffolds out the files needed for using stripe with redwood",
    handler(args) {
      setup(args);
    },
  }).argv;

if (require.main === module) {
  main();
}
