const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/zhishidian', { useNewUrlParser: true });
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log('Questions are collected!')
});
const Schema = mongoose.Schema

questionSchema = new Schema({
    userid: {
        type: String,
        require: true
    },
    class: {
        type: String,
            required: true
    },
    subject: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    question: {
        type: String,
    },
    options: {
        type: Array
    },
    fills: {
        type: Array
    },
    tips: {
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

module.exports = mongoose.model('question', questionSchema)