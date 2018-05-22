#!/usr/bin/env node

const commander = require('commander');
const ch = require('chalk');
const inquirer = require('inquirer');
const shell = require('shelljs');
const ora = require('ora');
const log = console.log;

const program = commander.option('-v --verbose', 'Display more logs');
program.parse(process.argv);

// Either return default pauth if specified or ask user to select from found ENV files
async function getPlatform(defaultPlatform) {
  const answers = await inquirer.prompt([
    {
      type: 'list',
      name: 'platform',
      message: 'Select platform to run',
      choices: ['iOS', 'Android'],
      when: () => defaultPlatform === undefined,
    },
  ]);

  return answers.platform || defaultPlatform;
}

async function runPlatform(platform) {
  return new Promise((resolve, reject) => {
    const spinner = ora(`Starting ${platform}...`);
    program.verbose ? log(`Starting ${platform}...`) : spinner.start();

    shell.exec(
      `react-native run-${platform.toLowerCase()}`,
      {
        silent: program.verbose !== true,
      },
      (code, stdout, stderr) => {
        spinner.stopAndPersist();
        if (code === 0) {
          return resolve(stdout);
        } else {
          return reject(stdout);
        }
      }
    );
  });
}

// Main Program
async function main(defaultPlatform) {
  const platform = await getPlatform(defaultPlatform);
  try {
    await runPlatform(platform);
    log(ch`{green 🙌  ${platform} started}`);
    log(
      ch`{gray If you don't see app started, run command with '--verbose' option and check console for errors.}`
    );
  } catch (e) {
    log(
      ch`{yellow ⚠️  Could not start ${platform} because of following error:}`
    );
    log(ch`{gray ${e}}`);
  }
}

main(process.argv[2]);
