const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/zhishidian', { useNewUrlParser: true });
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log('Subject are collected!')
});
const Schema = mongoose.Schema

subjectSchema = new Schema({
    userid: {
        type: String,
        required: true
    },
    grade: {
        type: String,
        required: true
    },
    subject: {
        type: Array,
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

module.exports = mongoose.model('subject', subjectSchema)