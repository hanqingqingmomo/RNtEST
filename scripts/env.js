#!/usr/bin/env node

const program = require('commander');

program
  .version('0.0.1')
  .description('CLI to help manage environment configurations')
  .command('activate [path]', 'Active environment configuration')
  .command(
    'generate',
    'Generate environment configuration from loaded system ENV variables'
  )
  .parse(process.argv);
