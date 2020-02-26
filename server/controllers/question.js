const Question = require('./../model/question')

const findByClass = async function(req, res) {
    let body = req.body
    await Question.find({ class: body.class, subject: body.subject, options: { $size: 4 } })
        .then(result => {
            res.status(200).json({
                question: result
            })
        }).catch(err => {
            console.log(err)
        })
}

const findByclassNId = function(req, res) {
    console.log(req.query)
    let userid = req.query.userid
    let grade = req.query.grade
    let subject = req.query.subject
    Question.find({
            userid: userid,
            class: grade,
            subject: subject
        })
        .then(result => {
            res.status(200).json({
                question: result
            })
        }).catch(err => {
            console.log(err)
        })
}

const findByUserId = function(req, res) {
    let userid = req.query.userid
    Question.find({
            userid: userid
        })
        .then(result => {
            res.status(200).json({
                question: result
            })
        })
        .catch(err => {
            console.log(err)
        })
}

const findByQuestionId = function(req, res) {
    let questionId = req.query.id
    Question.findOne({
            _id: questionId
        })
        .then(result => {
            res.status(200).json({
                question: result
            })
        })
        .catch(err => {
            res.status(200).json({
                message: '网络异常'
            })
        })
}

module.exports = {
    findByClass,
    findByUserId,
    findByclassNId,
    findByQuestionId
}