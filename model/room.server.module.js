var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
var db = require('../config/mongoose.js');

//声明一个mongoose对象
var RoomListSchema = new mongoose.Schema({
    uid: String,
    userName: String,
    time: {
        type: Date,
        default: new Date()
    },
    roomName: String,
    roomDetail: String,
    roomId: String,
    userNum: {
        type: Number,
        default: 0
    }
});

mongoose.model('RoomList', RoomListSchema, "RoomList");