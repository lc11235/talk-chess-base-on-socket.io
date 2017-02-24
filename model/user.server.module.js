var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
var db = require('../config/mongoose.js');

//声明一个mongoose对象
var UserSchema = new mongoose.Schema({
    userName: String,
    passward: String,
    uid: String,
    time: {
        type: Date,
        default: new Date()
    }
});

mongoose.model('User', UserSchema, "User");