const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/zhishidian', { useNewUrlParser: true });
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log('Feedback are collected!')
});
const Schema = mongoose.Schema

feedbackSchema = new Schema({
    shareId: {
        type: String,
        required: true
    },
    userid: {
        type: String,
        required: true
    },
    detail: {
        type: String
    },
    feedback: {
        type: Array,
    },
    evaluate: {
        type: Number,
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

module.exports = mongoose.model('feedback', feedbackSchema)