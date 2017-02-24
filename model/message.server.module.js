var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
var db = require('../config/mongoose.js');

// 声明一个mongoose对象
var MessageRecordSchema = new mongoose.Schema({
    type: Number,
    userName: String,
    time: {
        type: Date,
        default: new Date()
    },
    roomName: String,
    roomId: String,
    Message: String
});

mongoose.model('MessageRecord', MessageRecordSchema, "MessageRecord");