const Tasks = require("listr");
const prompts = require("prompts");
const fs = require("fs-extra");
const envfile = require("envfile");
const path = require("path");
const util = require('util');
const exec = util.promisify(require('child_process').exec);

const prompt = (initialOptions) =>
  prompts(
    [
      {
        type: "text",
        name: "stripeSecretKey",
        message: "What is your Stripe secret key?",
      },
      {
        type: "text",
        name: "stripePublishableKey",
        message: "What is your Stripe publishable key?",
      },
      {
        name: "shouldAddDummyProducts",
        type: "confirm",
        message: "Would you us to add dummy products to your Stripe account?",
        initial: false,
      },
    ].filter((item) => initialOptions[item.name] == null)
  );

const updateDotEnv = async (options) => {
  const dotEnvPath = path.join(options.dir, ".env");

  const rawEnv = (await fs.pathExists(dotEnvPath))
    ? await fs.readFile(dotEnvPath)
    : "";

  const currentEnv = envfile.parse(rawEnv);

  const nextEnv = {
    ...currentEnv,
    STRIPE_SECRET_KEY: options.stripeSecretKey,
    STRIPE_PUBLISHABLE_KEY: options.stripePublishableKey,
  };

  await fs.writeFile(dotEnvPath, envfile.stringify(nextEnv));
};

const addDummyProducts = async () => {
  await new Promise((resolve) => setTimeout(resolve, 200));
};

const copyTemplateFiles = async (options) => {
  const srcDir = path.join(__dirname, "..", "..", "templates");
  const destDir = path.join(options.dir, "src");

  await fs.mkdirp(srcDir);

  await fs.copy(srcDir, destDir, {
    recursive: true,
  });
};

const scaffold = async (options) => {
  await updateDotEnv(options);

  if (!options.shouldSkipGenerate) {
    await exec('yarn rw g page stripe-cart', { cwd: options.dir })
  }

  await copyTemplateFiles(options);
};

const setup = async (initialOptions) => {
  const options = {
    dir: process.cwd(),
    ...initialOptions,
    ...(await prompt(initialOptions)),
  };
  const tasks = [
    options.shouldAddDummyProducts && {
      title: "Adding dummy products",
      task: () => addDummyProducts(options),
    },
    {
      title: "Scaffolding out project files",
      task: () => scaffold(options),
    },
  ];

  await new Tasks(tasks.filter(Boolean)).run();

  console.log("Your redwood-stripe integration is ready!");
};

module.exports = {
  setup,
};
