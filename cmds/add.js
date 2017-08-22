var config = require('../templates.json');
var chalk = require('chalk');
var fs = require('fs');

exports.command = 'add <tplName> <gitUrl> <branch>'
exports.desc = 'add a template by template name, git url and branch'
exports.builder = {
  tmpName: {
    
  },
  gitUrl: {

  },
  branch:{

  }
}
exports.handler = function (argv) {
    var tplName = argv.tplName,
        gitUrl = argv.gitUrl,
        branch = argv.branch;
    console.log('add ' + tplName,gitUrl,branch);
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
        console.log(config)
        console.log('\n')
        process.exit()
    })
}
