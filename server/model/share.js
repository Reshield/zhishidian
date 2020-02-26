const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/zhishidian', { useNewUrlParser: true });
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log('Share are collected!')
});
const Schema = mongoose.Schema

shareSchema = new Schema({
    userid: {
        type: String,
        required: true
    },
    grade: {
        type: String,
        required: true
    },
    subject: {
        type: String,
        required: true
    },
    headline: {
        type: String,
        required: true
    },
    summary: {
        type: String,
    },
    questions: {
        type: Array
    },
    like: {
        type: Array
    },
    open: {
        type: Number,
        //0 没有权限限制
        //1 不可以评论
        //2 不可以登录
        enum: [0, 1],
        default: 0
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

module.exports = mongoose.model('share', shareSchema)