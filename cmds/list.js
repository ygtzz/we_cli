var config = require('../templates');
var common = require('./common');

exports.command = 'list'
exports.desc = 'show all templates'
exports.builder = {

}
exports.handler = function (argv) {
  console.log('\ntemplate list:\n');
  common.listTemplate(config.tpl);
  console.log('')
  process.exit();
}
