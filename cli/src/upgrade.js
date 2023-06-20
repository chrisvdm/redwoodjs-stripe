const { Listr } = require('listr2');
const util = require('util');
const exec = util.promisify(require('child_process').exec);

const upgradeApi = async (options) => {
     await exec('(cd api && yarn remove @redwoodjs-stripe/api)', { cwd: options.dir });
    await exec('(cd api && yarn add @redwoodjs-stripe/api)', { cwd: options.dir });
};

const upgradeWeb = async (options) => {
    await exec('(cd web && yarn remove @redwoodjs-stripe/web)', { cwd: options.dir });
    await exec('(cd web && yarn add @redwoodjs-stripe/web)', { cwd: options.dir });
}

const upgrade = async () => {
  const options = {
    dir: process.cwd(),
  };
  const tasks = [
    {
      title: 'Upgrading @redwoodjs-stripe/api package',
      task: () => upgradeApi(options),
    },
    {
      title: 'Upgrading @redwoodjs-stripe/web package',
      task: () => upgradeWeb(options),
    },
  ].filter(Boolean);

  try {
    await new Listr(tasks).run();
  } catch (e) {
    console.error(e);
  }
};

module.exports = {
  upgrade,
};
