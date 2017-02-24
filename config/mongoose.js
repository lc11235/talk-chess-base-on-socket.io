var mongoose = require('mongoose');
var config = require('./config.js');
var db = mongoose.connect(config.mongodb);
db.connection.on('error', function(error){
    console.log('数据库连接失败：' + error);
});
db.connection.on('open', function(){
    console.log('——数据库连接成功！——');
});

module.exports = db;