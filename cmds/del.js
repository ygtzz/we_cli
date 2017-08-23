var fs = require('fs');
var config = require('../templates');
var chalk = require('chalk');
var common = require('./common');
var inquirer = require('inquirer');

exports.command = 'del [tplName]'
exports.desc = 'delete a template'
exports.builder = {}
exports.handler = function (argv) {
    if(argv.tplName){
        fDelTemplate(argv.tplName);
    }
    else{
        var ques = [
            {
                type:'input',
                name:'tplName',
                message:'template name'
            }
        ];
        inquirer.prompt(ques).then(function(ans){
            fDelTemplate(ans.tplName);
        });
    }
}

function fDelTemplate(tplName){
    // 删除对应的模板
    if (config.tpl[tplName]) {
        config.tpl[tplName] = undefined
    } else {
        console.log(chalk.red('Template does not exist!'))
        process.exit()
    }
    // 写入template.json
    fs.writeFile(__dirname + '/../templates.json', JSON.stringify(config),     'utf-8', (err) => {
        if (err) console.log(err)
        console.log(chalk.green('Template deleted!'))
        console.log(chalk.grey('The last template list is: \n'))
        common.listTemplate(config);
        console.log('')
        process.exit()
    })
}
