const Comment = require('./../model/comment')
const User = require('./../model/user')

const saveComment = function(req, res) {
    let userid = req.body.userid
    let shareId = req.body.shareId
    let comment = req.body.comment
    new Comment({
            userid: userid,
            shareId: shareId,
            comment: comment
        }).save().then(result => {
            console.log(result)
            res.status(200).json({
                err_code: 0,
                comment: result,
                message: '评论发送成功!'
            })
        })
        .catch(err => {
            res.status(200).json({
                err_code: 0,
                message: '评论发送失败!'
            })
        })
}

const findCommentByShareId = function(req, res) {
    let shareId = req.query.shareId
    Comment.find({ shareId: shareId })
        .then(result => {
            res.status(200).json({
                err_code: 0,
                comments: result,
                message: '评论查询成功!'
            })
        })
        .catch(err => {
            res.status(200).json({
                err_code: 1,
                err: err,
                message: '评论查询失败!'
            })
        })
}

const adminShareComment = function(req, res) {
    let adminShareId = req.query.adminShareId
    Comment.find({ shareId: adminShareId })
        .then(comments => {
            User.find()
                .then(users => {
                    let commentArray = []
                    for (let i in comments) {
                        let userid = comments[i].userid
                        for (let j in users) {
                            if (userid == users[j]._id) {
                                let comment = {}
                                comment._id = comments[i]._id
                                comment.userid = comments[i].userid
                                comment.shareId = comments[i].shareId
                                comment.comment = comments[i].comment
                                comment.created_time = comments[i].created_time
                                comment.nickname = users[j].nickname
                                commentArray.push(comment)
                            }
                        }
                    }
                    res.status(200).json({
                        err_code: 0,
                        message: '后台查询评论成功!',
                        comments: commentArray
                    })
                })
                .catch(err => {
                    console.log(err)
                })
        })
        .catch(err => {
            res.status(200).json({
                err_code: 1,
                err: err,
                message: '评论查询失败!'
            })
        })
}

module.exports = {
    saveComment,
    findCommentByShareId,
    adminShareComment
}