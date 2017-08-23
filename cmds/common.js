var prettyjson = require('prettyjson');

module.exports = {
    listTemplate:function(json){
        console.log(prettyjson.render(json,{
            stringColor:'red', 
            keysColor:'green',
            dashColor:'yellow',
            numberColor:'blue'
        }));
    }
}