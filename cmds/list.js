var config = require('../templates');
var prettyjson = require('prettyjson');

exports.command = 'list'
exports.desc = 'show all templates'
exports.builder = {

}
exports.handler = function (argv) {
  console.log('\ntemplate list:\n');
  console.log(prettyjson.render(config.tpl,{
    stringColor:'red', 
    keysColor:'green',
    dashColor:'yellow',
    numberColor:'blue'
  }));
  console.log('');
  process.exit();
}
