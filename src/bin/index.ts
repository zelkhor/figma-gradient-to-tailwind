#!/usr/bin/env node
import { format } from '../format';
const clc = require('cli-color');

const string = process.argv.slice(2)[0];

const pbcopy = (data) => {
  const proc = require('child_process').spawn('pbcopy');
  proc.stdin.write(data);
  proc.stdin.end();
};

console.log(clc.white('Your Tailwind CSS class is:'));
console.log('\n');
console.log(clc.green(format(string)));
console.log(
  clc.white('📋 Your Tailwind class has been copied to your clipboard!')
);

pbcopy(format(string));