const Tasks = require('listr');
const prompts = require('prompts');
const fs = require('fs-extra');
const envfile = require('envfile');
const path = require('path');
const util = require('util');
const exec = util.promisify(require('child_process').exec);
const Stripe = require('stripe');

const prompt = (initialOptions) =>
  prompts(
    [
      {
        type: 'text',
        name: 'stripeSecretKey',
        message: 'What is your Stripe secret key?',
      },
      {
        type: 'text',
        name: 'stripePublishableKey',
        message: 'What is your Stripe publishable key?',
      },
      {
        type: 'text',
        name: 'stripeWebhookKey',
        message:
          "What is your Stripe Webhook Endpoint key (it's okay if you dont have one right now)?",
      },
      {
        type: () =>
          shouldSkip(initialOptions, 'addDummyProducts') ? null : 'confirm',
        name: 'addDummyProducts',
        message:
          'Would you like us to add dummy products to your Stripe account?',
        initial: false,
      },
    ].filter((item) => initialOptions[item.name] == null)
  );

const updateDotEnv = async (options) => {
  const dotEnvPath = path.join(options.dir, '.env');

  const rawEnv = (await fs.pathExists(dotEnvPath))
    ? await fs.readFile(dotEnvPath)
    : '';

  const currentEnv = envfile.parse(rawEnv);

  const nextEnv = {
    ...currentEnv,
    STRIPE_SECRET_KEY: options.stripeSecretKey,
    STRIPE_PUBLISHABLE_KEY: options.stripePublishableKey,
    STRIPE_WEBHOOK_KEY: options.stripeWebhookKey,
  };

  await fs.writeFile(dotEnvPath, envfile.stringify(nextEnv));
};

const addDummyProducts = async (options) => {
  const stripe = new Stripe(options.stripeSecretKey);

  const superpowers = JSON.parse(
    fs.readFileSync(
      path.join(__dirname, '..', 'templates', 'superpowers.json'),
      'utf-8'
    )
  );

  for (const superpower of superpowers) {
    const { prices, ...productData } = superpower;

    const product = await stripe.products.create(productData);

    for (const price of prices) {
      await stripe.prices.create({
        product: product.id,
        ...price,
      });
    }
  }
};

const copyTemplateFiles = async (options) => {
  const srcDir = path.join(__dirname, '..', 'templates');
  const destDir = options.dir;

  await fs.mkdirp(srcDir);

  await fs.copy(srcDir, destDir, {
    recursive: true,
  });
};

const shouldSkip = (options, step) => [...(options.skip || [])].includes(step);

const scaffold = async (options) => {
  if (!shouldSkip(options, 'pluginDeps')) {
    await exec('(cd web && yarn add @redwoodjs-stripe/web)', { cwd: options.dir });
    await exec('(cd api && yarn add @redwoodjs-stripe/api)', { cwd: options.dir });
  }

  await updateDotEnv(options);

  if (!shouldSkip(options, 'rwGenerate')) {
    await exec('yarn rw g page stripe-demo', { cwd: options.dir });
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
    options.addDummyProducts && {
      title: 'Adding dummy products',
      task: () => addDummyProducts(options),
    },
    {
      title: 'Scaffolding out project files',
      task: () => scaffold(options),
    },
  ];

  await new Tasks(tasks.filter(Boolean)).run();

  console.log('Your redwoodjs-stripe integration is ready!');
  console.log(
    'Run `yarn rw dev` and then navigate to http://localhost:8910/stripe-demo for a little demo'
  );
};

module.exports = {
  setup,
};
