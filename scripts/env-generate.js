#!/usr/bin/env node

const path = require('path');
const fs = require('fs');
const ch = require('chalk');
const log = console.log;

function grapRNVarTuples(env) {
  return Object.entries(env)
    .filter(([variable]) => variable.startsWith('RN_'))
    .map(([variable, value]) => [variable.replace('RN_', ''), value]);
}

function inlineTuple(tuple, shouldMask) {
  return `${tuple[0]}=${shouldMask ? '*****' : tuple[1]}`;
}

// Target '.env.release' file
const target = path.resolve(process.cwd(), '.env.release');

if (fs.existsSync(target)) {
  fs.unlinkSync(target);
}

log(ch`Grabing variables for React Native app... {gray (prefixed with 'RN_')}`);
const tuples = grapRNVarTuples(process.env);

log(
  ch`Writing {green .env.release} file with following content... {gray (actual values masked!)}`
);
log(ch`{gray ${tuples.map(tuple => inlineTuple(tuple, true)).join('\n')}}`);
fs.appendFileSync(
  target,
  tuples.map(tuple => inlineTuple(tuple, false)).join('\n')
);
