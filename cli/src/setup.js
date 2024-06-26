// @ts-check

const path = require("node:path");
const util = require("node:util");
const exec = util.promisify(require("node:child_process").exec);

const {
  getPaths: getRedwoodProjectPaths,
  resolveFile,
} = require("@redwoodjs/project-config");

const fs = require("fs-extra");
const prompts = require("prompts");
const { Listr } = require("listr2");
const Stripe = require("stripe");

const { importPlugin } = require("./importPlugin");

let cancelled = false;

const prompt = (initialOptions) =>
  prompts(
    [
      {
        type: "password",
        name: "stripeSecretKey",
        message: "What is your Stripe secret key?",
      },
      {
        type: "password",
        name: "stripePublishableKey",
        message: "What is your Stripe publishable key?",
      },
      {
        type: "password",
        name: "stripeWebhookKey",
        message:
          "What is your Stripe Webhook endpoint key? (It's okay if you don't have one right now.)",
      },
      {
        type: () =>
          shouldSkip(initialOptions, "addDummyProducts") ? null : "confirm",
        name: "addDummyProducts",
        message:
          "Would you like us to add dummy products to your Stripe account?",
        initial: false,
      },
    ],
    {
      onCancel: () => {
        cancelled = true;
      },
    },
  );

const determineFileType = async () => {
  const fileName = "./api/tsconfig.json";
  const isTSApp = await fs.existsSync(fileName);
  return isTSApp ? "ts" : "js";
};

const updateDotEnv = async (options) => {
  const dotEnvPath = path.join(options.redwoodProjectPaths.base, ".env");

  fs.appendFileSync(
    dotEnvPath,
    [
      `STRIPE_SECRET_KEY='${options.stripeSecretKey}'`,
      `STRIPE_PUBLISHABLE_KEY='${options.stripePublishableKey}'`,
      `STRIPE_WEBHOOK_KEY='${options.stripeWebhookKey}'`,
    ].join("\n"),
  );
};

const addDummyProducts = async (options) => {
  const stripe = new Stripe(options.stripeSecretKey);

  // esbuild parses JSON files into JS objects at build time.
  // See https://esbuild.github.io/content-types/#json.
  const superpowers = require("./superpowers");

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
  await fs.copy(
    path.join(__dirname, "..", "..", "templates", options.fileType),
    options.redwoodProjectPaths.base,
  );
};
const shouldSkip = (options, step) => [...(options.skip || [])].includes(step);

const scaffold = async (options) => {
  if (!shouldSkip(options, "pluginDeps")) {
    await exec("yarn add @redwoodjs-stripe/web", {
      cwd: path.join(options.redwoodProjectPaths.base, "web"),
    });
    await exec("yarn add @redwoodjs-stripe/api", {
      cwd: path.join(options.redwoodProjectPaths.base, "api"),
    });
  }

  await updateDotEnv(options);

  if (!shouldSkip(options, "rwGenerate")) {
    const hasDemoPage = resolveFile(
      path.join(
        options.redwoodProjectPaths.web.pages,
        "StripeDemoPage",
        "StripeDemoPage",
      ),
    );

    if (!hasDemoPage) {
      await exec("yarn rw g page stripe-demo", {
        cwd: options.redwoodProjectPaths.base,
      });
    } else {
      console.log(
        "\t\tStripeDemoPage already exists. Skipped generating a new demo page. ",
      );
    }
  }

  await copyTemplateFiles(options);
};

const setup = async (initialOptions) => {
  let redwoodProjectPaths;

  try {
    redwoodProjectPaths = getRedwoodProjectPaths();
  } catch (e) {
    console.log(e.message);
    process.exitCode = 1;
    return;
  }

  const responses = await prompt(initialOptions);

  if (cancelled) {
    process.exitCode = 1;
    return;
  }

  const options = {
    fileType: await determineFileType(),
    ...initialOptions,
    ...responses,
    redwoodProjectPaths,
  };

  const tasks = [
    options.addDummyProducts && {
      title: "Adding dummy products",
      task: () => addDummyProducts(options),
    },
    {
      title: "Scaffolding out project files",
      task: () => scaffold(options),
    },
    {
      title: "Importing Schemas and Services from plugin",
      task: () => importPlugin(options),
    },
  ].filter(Boolean);

  try {
    await new Listr(tasks).run();
  } catch (e) {
    console.error(e);
  }

  console.log("Your RedwoodJS-Stripe integration is ready! 🎉");
  console.log(
    "Run `yarn rw dev` and then navigate to http://localhost:8910/stripe-demo for a little demo.",
  );
};

module.exports = {
  setup,
};
