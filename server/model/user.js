const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/zhishidian', { useNewUrlParser: true });
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log('Users are collected!')
});
const Schema = mongoose.Schema

userSchema = new Schema({
    nickname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    avatar: {
        type: String,
        default: 'default.png'
    },
    avatarBK: {
        type: String,
        default: 'avatarBK.png'
    },
    gender: {
        // -1：女
        // 1：男
        // 0：未定义
        type: Number,
        enum: [-1, 0, 1]
    },
    birthday: {
        type: Date
    },
    status: {
        type: Number,
        //0 没有权限限制
        //1 不可以评论
        //2 不可以登录
        enum: [0, -1, 1],
        default: 0
    },
    wrongQuestions: {
        type: Array
    },
    collectShare: {
        type: Array
    },
    created_time: {
        type: Date,
        default: Date.now
    },
    last_modified_time: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('user', userSchema)