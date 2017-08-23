var config = require('../templates.json');
var chalk = require('chalk');
var fs = require('fs');
var inquirer = require('inquirer');
var common = require('./common');

exports.command = 'add'
exports.desc = 'add a template by template name, git url and branch'
exports.builder = {
//   tplName: {
    
//   },
//   gitUrl: {

//   },
//   branch:{

//   }
}
exports.handler = function (argv) {
    var ques = [
        {
            type:'input',
            name:'tplName',
            message:'template name'
        },
        {
            type:'input',
            name: 'gitUrl',
            message:'git repository'
        },
        {   
            type:'input',
            name:'branch',
            default:'master',
            message:'git branch, default master'
        }
    ];
    inquirer.prompt(ques).then(function(ans){
        var tplName = ans.tplName,
            gitUrl = ans.gitUrl,
            branch = ans.branch;
        if (!config.tpl[tplName]) {
            config.tpl[tplName] = {}
            config.tpl[tplName]['url'] = gitUrl.replace(/[\u0000-\u0019]/g, '') // 过滤unicode字符
            config.tpl[tplName]['branch'] = branch
        } else {
            console.log(chalk.red('Template has already existed!'))
            process.exit()
        }
        // 把模板信息写入templates.json
        fs.writeFile(__dirname + '/../templates.json', JSON.stringify(config), 'utf-8', (err) => {
            if (err) console.log(err)
            console.log(chalk.green('New template added!\n'))
            console.log(chalk.grey('The last template list is: \n'))
            common.listTemplate(config);
            console.log('')
            process.exit()
        })
    });
    
}
