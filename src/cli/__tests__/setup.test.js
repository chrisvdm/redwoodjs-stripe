const envfile = require("envfile");
const path = require("path");
const fs = require("fs-extra");
const tmp = require("tmp-promise");
const dirTree = require("dir-tree");
const { render } = require("cli-testing-library");

require("cli-testing-library/extend-expect");

describe("setup", () => {
  let dir;

  const setup = (...args) =>
    render(path.join(__dirname, "..", "cli.js"), [
      "setup",
      "--dir",
      dir,
      '--skip rwGenerate',
      '--skip addDummyProducts',
      ...args,
    ]);

  beforeEach(async () => {
    dir = (await tmp.dir()).path;
  });

  test("updates .env if it exists", async () => {
    const dotEnvPath = path.join(dir, ".env");

    await fs.writeFile(
      dotEnvPath,
      envfile.stringify({
        STRIPE_SECRET_KEY: 'foo',
        STRIPE_PUBLISHABLE_KEY: 'bar'
      })
    );

    const cmd = await setup();

    expect(await cmd.findByText("secret key")).toBeInTheConsole();

    cmd.userEvent.keyboard("foo[Enter]");

    expect(await cmd.findByText("publishable key")).toBeInTheConsole();

    cmd.userEvent.keyboard("baz[Enter]");

    expect(await cmd.findByText("ready!")).toBeInTheConsole();

    expect(envfile.parse(await fs.readFile(dotEnvPath))).toEqual({
      STRIPE_SECRET_KEY: "foo",
      STRIPE_PUBLISHABLE_KEY: "baz",
    });
  });

  test("writes .env if it does not yet exist", async () => {
    const cmd = await setup();

    expect(await cmd.findByText("secret key")).toBeInTheConsole();

    cmd.userEvent.keyboard("foo[Enter]");

    expect(await cmd.findByText("publishable key")).toBeInTheConsole();

    cmd.userEvent.keyboard("bar[Enter]");

    expect(await cmd.findByText("ready!")).toBeInTheConsole();

    expect(envfile.parse(await fs.readFile(path.join(dir, ".env")))).toEqual({
      STRIPE_PUBLISHABLE_KEY: "bar",
      STRIPE_SECRET_KEY: "foo",
    });
  });

  test("copies template files", async () => {
    const cmd = await setup(
      "--stripeSecretKey=foo --stripePublishableKey=bar"
    );

    expect(await cmd.findByText("ready!")).toBeInTheConsole();

    const templateFileTree = await dirTree(
      path.join(__dirname, "..", "..", "..", "templates")
    );

    const srcFileTree = await dirTree(dir);
    expect(srcFileTree).toEqual(expect.objectContaining(templateFileTree));
  });
});
