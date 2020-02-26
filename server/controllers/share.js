const Share = require('./../model/Share')
const User = require('./../model/user')
const Feedback = require('./../model/feedback')

const shareById = function(req, res) {
    new Share({
            userid: req.body.userid,
            headline: req.body.headline,
            summary: req.body.summary,
            grade: req.body.grade,
            subject: req.body.subject,
            questions: req.body.questions,
        }).save()
        .then(result => {
            res.status(200).json({
                message: '分享成功!',
                err_code: 0
            })
        })
        .catch(err => {
            console.log(err)
            res.status(400).json({
                message: 'Server Error!',
                err_code: 1
            })
        })
}

const allOpenShare = function(req, res) {
    Share.find({ open: 1 })
        .then(shares => {
            User.find()
                .then(users => {
                    let shareArray = []
                    for (let i in shares) {
                        let share = {}
                        share.questions = shares[i].questions
                        share.like = shares[i].like
                        share.open = shares[i].open
                        share._id = shares[i]._id
                        share.userid = shares[i].userid
                        share.headline = shares[i].headline
                        share.summary = shares[i].summary
                        share.grade = shares[i].grade
                        share.subject = shares[i].subject
                        for (let j in users) {
                            if (shares[i].userid == users[j]._id) {
                                share.nickname = users[j].nickname
                                share.avatar = users[j].avatar
                            }
                        }
                        shareArray.push(share)
                    }
                    res.status(200).json({
                        err_code: 0,
                        message: '查找成功！',
                        share: shareArray
                    })
                })
                .catch(err => {
                    console.log(err)
                    res.status(200).json({
                        err_code: 1,
                        message: '查找失败！',
                    })
                })
        })
        .catch(err => {
            console.log(err)
            res.status(200).json({
                err_code: 1,
                message: '查找失败！',
            })
        })
}

const allShare = function(req, res) {
    Share.find()
        .then(result => {
            res.status(200).json({
                err_code: 0,
                message: '查找成功！',
                share: result
            })
        })
        .catch(err => {
            console.log(err)
            res.status(200).json({
                err_code: 1,
                message: '查找失败！',
            })
        })
}

const findById = function(req, res) {
    let shareId = req.query.shareId
    Share.findOne({ _id: shareId })
        .then(result => {
            res.status(200).json({
                err_code: 0,
                share: result
            })
        })
        .catch(err => {
            res.status(200).json({
                err_code: 1,
                message: '网络异常！'
            })
        })
}

const saveShareLike = function(req, res) {
    let userid = req.body.userid
    let shareId = req.body.shareId
    Share.findOneAndUpdate({ _id: shareId }, { $addToSet: { like: { userid: userid } } })
        .then(result => {
            res.status(200).json({
                err_code: 0,
                message: '点赞成功！',
                result: result
            })
        })
        .catch(err => {
            console.log(err)
            res.status(200).json({
                err_code: 1,
                message: '网络异常！'
            })
        })
}

const deleteShareLike = function(req, res) {
    let userid = req.body.userid
    let shareId = req.body.shareId
    Share.findOneAndUpdate({ _id: shareId }, { $pull: { like: { userid: userid } } })
        .then(result => {
            console.log(result)
            res.status(200).json({
                err_code: 0,
                message: '去除点赞成功！',
                result: result
            })
        })
        .catch(err => {
            console.log(err)
            res.status(200).json({
                err_code: 1,
                message: '网络异常！'
            })
        })
}

const evaluate = function(req, res) {
    let userid = req.body.userid
    let shareId = req.body.shareId
    let evaluate = req.body.evaluate
    new Feedback({
            shareId: shareId,
            userid: userid,
            evaluate: evaluate
        }).save()
        .then(result => {
            res.status(200).json({
                result: result,
                message: '评分成功！'
            })
        })
        .catch(err => {
            res.status(200).json({
                err: err,
                message: '评分失败！'
            })
        })
}

const feedback = function(req, res) {
    let shareId = req.body.shareId
    let userid = req.body.userid
    let feedback = req.body.feedback
    let detail = req.body.detail
    new Feedback({
            shareId: shareId,
            userid: userid,
            feedback: feedback,
            detail: detail
        }).save()
        .then(result => {
            res.status(200).json({
                result: result,
                message: '投诉成功！'
            })
        })
        .catch(err => {
            res.status(200).json({
                err: err,
                message: '投诉失败！'
            })
        })
}

const adminCome = function(req, res, next) {
    Share.find()
        .then(result => {
            let shareArray = []
            for (let i in result) {
                let share = {}
                share.shareId = result[i]._id
                share.headline = result[i].headline
                share.summary = result[i].summary
                share.userid = result[i].userid
                shareArray.push(share)
            }
            res.render('index.html', {
                shares: shareArray
            })
        })
        .catch(err => {
            console.log(err)
            res.status(200).json({
                err_code: 1,
                message: '查找失败！',
            })
        })

}

const adminAllShare = function(req, res) {
    Share.find()
        .then(shares => {
            let usersArray = []
            User.find()
                .then(users => {
                    usersArray = users
                    let shareArray = []
                    for (let i in shares) {
                        let oneShare = {}
                        for (let j in usersArray) {
                            if (shares[i].userid == usersArray[j]._id) {
                                oneShare.nickname = usersArray[j].nickname
                                oneShare.status = usersArray[j].status
                            }
                        }
                        if (shares[i].open == 0 || shares[i].open == undefined) {
                            oneShare.openStatus = '审核中'
                        } else if (shares[i].open == 1) {
                            oneShare.openStatus = '已发布'
                        }
                        oneShare.shareId = shares[i]._id
                        oneShare.headline = shares[i].headline
                        oneShare.summary = shares[i].summary
                        oneShare.questionsLength = shares[i].questions.length
                        oneShare.userid = shares[i].userid
                        shareArray.push(oneShare)
                    }
                    res.status(200).json({
                        err_code: 0,
                        message: '查找成功！',
                        shares: shareArray
                    })
                })
                .catch(err => {
                    console.log(err)
                })
        })
        .catch(err => {
            console.log(err)
            res.status(200).json({
                err_code: 1,
                message: '查找失败！',
            })
        })
}

const adminDeleteQuestion = function(req, res) {
    let shareId = req.query.shareId
    Share.deleteOne({ _id: shareId})
    .then(share => {
        console.log(share)
        if(share.ok == 1) {
            res.status(200).json({
                err_code: 0,
                message: '删除成功！',
            })
        }
    })
    .catch(err => {
        console.log(err)
        res.status(200).json({
            err_code: 1,
            message: '删除失败！',
        })
    })
}

const shareInform = function(req, res) {
    let adminShareId = req.query.adminShareId
    Share.findOne({ _id: adminShareId })
        .then(share => {
            let oneShare = {}
            oneShare.headline = share.headline
            oneShare.summary = share.summary
            oneShare.questionsLength = share.questions.length
            if (share.open == 0) {
                oneShare.openValue = '测试中.......'
                oneShare.open = share.open
            } else if (share.open == 1) {
                oneShare.openValue = '已发布到分享列表'
                oneShare.open = share.open
            }
            let danxuan = []
            let duoxuan = []
            let tiankong = []
            let fenxi = []
            for (let i in share.questions) {
                if (share.questions[i].type == '单选题') {
                    danxuan.push(share.questions[i])
                } else if (share.questions[i].type == '填空题') {
                    tiankong.push(share.questions[i])
                } else if (share.questions[i].type == '分析题') {
                    fenxi.push(share.questions[i])
                }
            }
            res.status(200).json({
                err_code: 0,
                message: '分享信息查询成功',
                danxuan: danxuan,
                duoxuan: duoxuan,
                tiankong: tiankong,
                fenxi: fenxi,
                share: oneShare
            })
        })
        .catch(err => {
            res.status(200).json({
                err_code: 500,
                message: '分享信息查询失败',
                err: err
            })
        })
}

const getFeedback = function(req, res) {
    let adminShareId = req.query.adminShareId
    Feedback.find({ shareId: adminShareId })
        .then(feedbacks => {
            console.log(feedbacks)
            User.find()
                .then(users => {
                    let feedbackArray = []
                    for (let i in feedbacks) {
                        let oneFeedback = {}
                        oneFeedback.feedback = feedbacks[i].feedback
                        oneFeedback.shareId = feedbacks[i].shareId
                        oneFeedback.userid = feedbacks[i].userid
                        oneFeedback.detail = feedbacks[i].detail
                        if (feedbacks[i].evaluate == null || feedbacks[i].evaluate == undefined) {
                            oneFeedback.evaluate = 0
                        } else {
                            oneFeedback.evaluate = feedbacks[i].evaluate
                        }
                        for (let j in users) {
                            if (feedbacks[i].userid == users[j]._id) {
                                oneFeedback.nickname = users[j].nickname
                                oneFeedback.status = users[j].status
                                if (users[j].status == 0) {
                                    oneFeedback.statusValue = '未获得测试权限'
                                } else if (users[j].status == 1) {
                                    oneFeedback.statusValue = '已获得测试权限'
                                }
                            }
                        }
                        feedbackArray.push(oneFeedback)
                    }
                    res.status(200).json({
                        err_code: 0,
                        massage: '查询反馈成功！',
                        feedbacks: feedbackArray
                    })
                })
                .catch(err => {
                    res.status(200).json({
                        err_code: 500,
                        massage: '查询反馈失败！',
                        err: err
                    })
                })
        })
        .catch(err => {
            console.log(err)
        })
}

const getOpen = function(req, res) {
    let adminShareId = req.body.adminShareId
    console.log(adminShareId)
    Share.updateOne({ _id: adminShareId }, { $set: { 'open': 1 } })
        .then(result => {
            res.status(200).json({
                err_code: 0,
                message: '分享更新状态成功!',
                result: result
            })
        })
        .catch(err => {
            res.status(200).json({
                err_code: 500,
                message: '分享更新状态失败!',
                err: err
            })
        })
}

const loseOpen = function(req, res) {
    let adminShareId = req.body.adminShareId
    console.log(adminShareId)
    Share.updateOne({ _id: adminShareId }, { $set: { 'open': 0 } })
        .then(result => {
            res.status(200).json({
                err_code: 0,
                message: '分享更新状态成功!',
                result: result
            })
        })
        .catch(err => {
            res.status(200).json({
                err_code: 500,
                message: '分享更新状态失败!',
                err: err
            })
        })
}

const feedbackData = function(req, res) {

}

module.exports = {
    shareById,
    allOpenShare,
    allShare,
    findById,
    saveShareLike,
    deleteShareLike,
    evaluate,
    feedback,
    adminCome,
    shareInform,
    adminAllShare,
    adminDeleteQuestion,
    getFeedback,
    getOpen,
    loseOpen,
    feedbackData
}