const Class = require('./../model/class')
const Grade = require('./../model/grade')

const examClass = function(req, res) {
    let userid = req.query.userid
    Class.find()
        .then(result => {
            Grade.find({ userid: userid })
                .then(grade => {
                    res.status(200).json({
                        class: result,
                        grade: grade
                    })
                })
                .catch(err => {
                    res.status(200).json({
                        err_code: 500,
                        message: '类别查找失败!',
                        err: err
                    })
                })

        })
        .catch(err => {
            res.status(200).json({
                err_code: 500,
                message: '类别查找失败!',
                err: err
            })
        })
}

const saveSubject = function(req, res) {
    let userid = req.body.userid
    let grade = req.body.grade
    let subject = req.body.subject
    Grade.findOne({ userid: userid })
        .then(result => {
            if (result == null) {
                let subjectArray = []
                subjectArray.push(subject)
                new Grade({
                        userid: userid,
                        grade: grade,
                        subject: subjectArray
                    }).save()
                    .then(result => {
                        res.status(200).json({
                            err_code: 0,
                            message: '储存类别成功!',
                            result: result
                        })
                    })
                    .catch(err => {
                        res.status(200).json({
                            err_code: 500,
                            message: '储存类别失败!',
                            err: err
                        })
                    })
            } else {
                Grade.updateOne({ userid: userid }, { $addToSet: { subject } })
                    .then(result => {
                        res.status(200).json({
                            err_code: 0,
                            message: '储存类别成功!',
                            result: result
                        })
                    })
                    .catch(err => {
                        res.status(200).json({
                            err_code: 500,
                            message: '储存类别失败!',
                            err: err
                        })
                    })
            }
        })
        .catch(err => {
            res.status(200).json({
                err_code: 500,
                message: '储存类别失败!',
                err: err
            })
        })
}



module.exports = {
    examClass,
    saveSubject,
}