const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/zhishidian', { useNewUrlParser: true });
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log('Comment are collected!')
});
const Schema = mongoose.Schema

commentSchema = new Schema({
    userid: {
        type: String,
        required: true
    },
    shareId: {
        type: String,
        required: true
    },
    comment: {
        type: String
    },
    reply: {
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

module.exports = mongoose.model('comment', commentSchema)