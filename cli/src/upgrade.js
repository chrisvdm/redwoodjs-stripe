const util = require('node:util');
const exec = util.promisify(require('node:child_process').exec);

const { getPaths: getRedwoodProjectPaths } = require('@redwoodjs/project-config')

const { Listr } = require('listr2');

const upgrade = async () => {
  let redwoodProjectPaths

  try {
    redwoodProjectPaths = getRedwoodProjectPaths()
  } catch (e) {
    console.log(e.message)
    process.exitCode = 1
    return
  }

  const tasks = [
    {
      title: 'Upgrading @redwoodjs-stripe/api',
      task: async () => {
        await exec('yarn up @redwoodjs-stripe/api', { cwd: redwoodProjectPaths.api.base });
      }
    },
    {
      title: 'Upgrading @redwoodjs-stripe/web',
      task: async () => {
        await exec('yarn up @redwoodjs-stripe/web', { cwd: redwoodProjectPaths.web.base });
      }
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
