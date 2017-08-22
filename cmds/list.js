var config = require('../templates');

exports.command = 'list'
exports.desc = 'show all templates'
exports.builder = {

}
exports.handler = function (argv) {
  console.log(config.tpl);
  process.exit();
}
