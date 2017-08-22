#!/usr/bin/env node
require('yargs')
    .commandDir('cmds')
    .demandCommand(1,'')
    .help()
    .alias('h','help')
    .version()
    .alias('v','version')
    .argv;