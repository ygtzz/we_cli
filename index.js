#!/usr/bin/env node

var argv = require('yargs')
            .usage('Usage: we [options]')
            //全局中间件，在有命令匹配的时候都会执行，包括默认命令之前
            .middleware(function(argv){
                console.log('all command middleware, no command no operation');
            })
            //特定的命令写在目录下的命令文件中
            .commandDir('cmds')
            .demandCommand(1,'')
            //默认命令，在目录下的命令不匹配时候执行，可以处理动态命令
            .command('*', 'the default command', () => {}, (argv) => {
                console.log('default command');
                console.log(argv);
            })
            .help()
            .alias('h','help')
            .version()
            .alias('v','version')
            .argv;