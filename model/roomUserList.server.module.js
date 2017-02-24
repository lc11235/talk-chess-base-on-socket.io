var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
var db = requie('../config/mongoose.js');

//声明一个mongoose对象
var RoomUserListSchema = new mongoose.Schema({
    roomId: String,
    roomUserList: [],
    uid: String,
    userName: String,
    addTime: Date
});

mongoose.model('RoomUserList', RoomUserListSchema, "RoomUserList");