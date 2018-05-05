#!/usr/bin/env node

const ch = require('chalk');
const path = require('path');
const fs = require('fs');
const inquirer = require('inquirer');
const program = require('commander');
const shell = require('shelljs');
const ora = require('ora');
const log = console.log;

// Either return default pauth if specified or ask user to select from found ENV files
async function getSourcePath(defaultPath) {
  return (
    defaultPath ||
    (await inquirer.prompt([
      {
        type: 'list',
        name: 'path',
        message: 'We found these env files. Select one to set as active.',
        choices: fs
          .readdirSync(process.cwd())
          .filter(file => file.startsWith('.env.')),
        when: () => defaultPath === undefined,
      },
    ])).path
  );
}

async function cleanXcodeBuild() {
  return new Promise((resolve, reject) => {
    const spinner = ora('Cleaning xCode build...').start();
    shell.exec(
      'cd ios && xcodebuild -alltargets clean',
      {
        silent: true,
      },
      (code, stdout, stderr) => {
        if (code === 0) {
          resolve(stdout);
        } else {
          reject(stderr);
        }
        spinner.stopAndPersist();
      }
    );
  });
}

// Main Program
async function main(defaultPath) {
  const sourcePath = await getSourcePath(defaultPath);
  const source = path.resolve(process.cwd(), sourcePath);
  const target = path.resolve(process.cwd(), '.env');

  if (!fs.existsSync(source)) {
    log(ch`{red Error:} Configuration file doesn't exists at "${sourcePath}"`);
    process.exit(1);
  }

  log(ch`Activating {cyan ${sourcePath}} environment...`);

  fs.copyFileSync(source, target);

  await cleanXcodeBuild();

  log(ch`{green 🙌  ${sourcePath} activated}`);
}

main(process.argv[2]);
