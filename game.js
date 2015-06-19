#!/usr/bin/env node
var readline = require('readline');
var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});
var terminal = rl.output;
terminal.write('hello world');
