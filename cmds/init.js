var exec = require('child_process').exec;
var config = require('../templates');
var chalk = require('chalk');
var ora = require('ora');
var inquirer = require('inquirer');

exports.command = 'init'
exports.desc = 'init a project'
exports.builder = {}
exports.handler = function (argv) {
  var ques = [
    {
        type:'input',
        name:'projectName',
        message:'project name'
    },
    {
        type:'input',
        name: 'tplName',
        message:'template name'
    }
  ];
  inquirer.prompt(ques).then(function(ans){
      fInitTemplate(ans.projectName,ans.tplName);
  });
}

function fInitTemplate(projectName,tplName){
  var gitUrl = '';
  var branch = '';
  if (!config.tpl[tplName]) {
      console.log(chalk.red('\n × Template does not exit!'))
      process.exit()
  }
  gitUrl = config.tpl[tplName].url
  branch = config.tpl[tplName].branch

  // git命令，远程拉取项目并自定义项目名
  var cmdStr = `git clone ${gitUrl} ${projectName} && cd ${projectName} && git checkout ${branch}`

  var spinner = ora('Start generating...').start();

  exec(cmdStr, (error, stdout, stderr) => {
    spinner.stop();
    if (error) {
      console.log(error)
      process.exit()
    }
    console.log(chalk.green('\n √ Generation success!'))
    console.log(`\n cd ${projectName} && npm install \n`)
    process.exit()
  })
}
