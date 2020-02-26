const User = require('./../model/user')
const Question = require('./../model/question')
const md5 = require("blueimp-md5")
const fs = require('fs')
const path = require('path')
const multer = require('multer')

var storage = multer.diskStorage({
    destination: function(req, file, cb) {
        // 接收到文件后输出的保存路径（若不存在则需要创建）
        let upload = path.join(__dirname, './../public/images')
        cb(null, upload);
    },
    filename: function(req, file, cb) {
        // 将保存文件名设置为 时间戳 + 文件原始名，比如 151342376785-123.jpg
        cb(null, Date.now() + "-" + file.originalname);
    }
})

const upload = multer({ storage: storage }).single('avatar')
    // const upload = multer({ storage: storage }).any()

const uploadAvatar = function(req, res) {
    upload(req, res, function(err) {
        if (err) {
            console.log(err)
        } else {
            let userid = req.body.avatar
            User.findByIdAndUpdate(
                    userid, { $set: { avatar: req.file.filename } }
                ).exec()
                .then(result => {
                    if (result != null) {
                        result.avatar = req.file.filename
                        res.status(200).json({
                            err_code: 0,
                            user: result
                        })
                    }
                })
                .catch(err => {
                    res.status(200).json({
                        err_code: 1,
                        avatar: '图片上传失败！'
                    })
                })
        }
    })
}

const saveUser = function(nickname, email, password) {
    return new User({
            nickname: nickname,
            email: email,
            password: password
        })
        .save().then(result => {
            return result
        })
        .catch(err => {
            return false
        })
}

const createUser = function(req, res, next) {
    let nickname = req.body.nickname
    let email = req.body.email
    let password = md5(md5(req.body.password))
    User.findOne({ nickname: nickname })
        .then(data => {
            if (data) {
                res.status(200).json({
                    code: 1,
                    message: '用户名已存在！'
                })
            } else {
                User.findOne({ email: email })
                    .then(data => {
                        if (data) {
                            res.status(200).json({
                                code: 2,
                                message: '邮箱已存在！'
                            })
                        } else {
                            saveUser(nickname, email, password)
                                .then(user => {
                                    if (!user) {
                                        res.status(200).json({
                                            code: 3,
                                            message: '提交失败！'
                                        })
                                    } else {
                                        req.session.user = user
                                        res.status(200).json({
                                            code: 0,
                                            message: '注册成功！',
                                            session: req.session
                                        })
                                    }
                                })
                        }
                    })
            }
        })
}

const findUserAvatarById = function(req, res) {
    let userid = req.query.userid
    console.log(userid)
    User.findOne({
            _id: userid
        })
        .then(result => {
            let avatar = result.avatar
            let nickname = result.nickname
            res.status(200).json({
                err_code: 0,
                avatar: avatar,
                nickname: nickname
            })
        })
        .catch(err => {
            res.status(400).json({
                err_code: 1,
                message: '网络异常！'
            })
        })
}

const findUser = function(req, res, next) {
    let email = req.body.email
    let password = md5(md5(req.body.password))
    User.findOne({
            $or: [
                { email: email },
                { nickname: email },
            ]
        })
        .then(user => {
            if (user == null || user == undefined) {
                res.status(200).json({
                    code: 1,
                    message: '用户名或邮箱不存在！'
                })
            } else if (user.password !== password) {
                res.status(200).json({
                    code: 2,
                    message: '密码错误！'
                })
            } else {
                req.session.user = user
                res.status(200).json({
                    code: 0,
                    message: '登录成功！',
                    session: req.session
                })
            }
        })
        .catch(err => {
            res.status(200).json({
                code: 500,
                err: err
            })
        })
}

const saveWrong = function(req, res) {
    let userid = req.body.userid
    let wrongId = req.body.wrongId
    User.findOne({ _id: userid })
        .then(result => {
            var count = 0
            let Wrong = result.wrongQuestions
            for (let item of Wrong) {
                if (wrongId == item) {
                    count++
                }
            }
            if (count > 0) {
                res.status(200).json({
                    err_code: 1,
                    message: '该题已经录入'
                })
            } else {
                User.updateOne({ _id: userid }, {
                        $push: {
                            wrongQuestions: wrongId
                        }
                    })
                    .then(result => {
                        console.log(result)
                        res.status(200).json({
                            err_code: 0,
                            message: '录入成功'
                        })
                    })
                    .catch(err => {
                        console.log(err)
                        res.status(200).json({
                            err_code: 500,
                            message: '出现异常'
                        })
                    })
            }
        })
        .catch(err => {
            console.log(err)
            res.status(200).json({
                err_code: 500,
                message: '出现异常'
            })
        })
}

const getWrong = function(req, res) {
    console.log(req.query)
    let userid = req.query.userid
    User.findOne({
            _id: userid
        })
        .then(result => {
            res.status(200).json({
                err_code: 0,
                list: result.wrongQuestions
            })
        })
        .catch(err => {
            res.status(200).json({
                err_code: 1,
                message: '网络异常'
            })
        })
}

const findUserById = function(req, res) {
    let userid = req.query.userid
    User.findOne({
            _id: userid
        })
        .then(result => {
            res.status(200).json({
                err_code: 0,
                user: result
            })
        })
        .catch(err => {
            res.status(200).json({
                err_code: 1,
                message: '查询用户信息失败!'
            })
        })
}

const adminLogin = function(req, res, next) {
    let email = req.body.email
    let password = md5(md5(req.body.password))
    User.findOne({
            $or: [
                { email: email },
                { nickname: email },
            ]
        })
        .then(user => {
            console.log(user)
            console.log(user.status)
            if (user == null || user == undefined) {
                res.status(200).json({
                    err_code: 1,
                    message: '用户名或邮箱不存在！'
                })
            } else if (user.status == 0 || user.status == -1) {
                res.status(200).json({
                    err_code: 2,
                    message: '该账号未获得管理员权限!'
                })
            } else if (user.password != password) {
                res.status(200).json({
                    err_code: 3,
                    message: '密码错误!'
                })
            } else {
                req.session.user = user
                res.status(200).json({
                    err_code: 0,
                    message: '登录成功！',
                    session: req.session
                })
            }
        })
        .catch(err => {
            res.status(200).json({
                code: 500,
                err: err
            })
        })
}

const adminUser = function(req, res) {
    User.find()
        .then(result => {
            Question.find({})
                .then(questions => {
                    let userList = []
                    for (let i in result) {
                        let user = {}
                        user.userid = result[i]._id
                        user.nickname = result[i].nickname
                        user.email = result[i].email
                        user.status = result[i].status
                        if (result[i].status == 0) {
                            user.statusValue = '未获得参与测试权限'
                        } else if (result[i].status == 1) {
                            user.statusValue = '获得参与测试权限'
                        }
                        let questionCount = 0
                        for (let j in questions) {
                            if (result[i]._id == questions[j].userid) {
                                questionCount++
                            }
                        }
                        user.questionCount = questionCount
                        userList.push(user)
                    }
                    res.status(200).json({
                        err_code: 0,
                        message: '查询用户成功!',
                        userList: userList
                    })
                })
        })
        .catch(err => {
            res.status(200).json({
                err_code: 500,
                message: '查询用户失败!',
                err: err
            })
        })
}

const adminUserInform = function(req, res) {
    console.log(req.query.adminUserId)
    let adminUserId = req.query.adminUserId
    User.findOne({ _id: adminUserId })
        .then(user => {
            res.status(200).json({
                err_code: 0,
                message: '后台用户查询成功!',
                user: user
            })
        })
        .catch(err => {
            res.status(200).json({
                err_code: 500,
                message: '后台用户查询失败!',
                err: err
            })
        })
}

const newAdmin = function(req, res) {
    console.log(req.body)
}

const getTest = function(req, res) {
    console.log(req.body.adminUserId)
    let adminUserId = req.body.adminUserId
    User.updateOne({ _id: adminUserId }, { $set: { 'status': 1 } })
        .then(result => {
            res.status(200).json({
                err_code: 0,
                message: '用户状态更新成功!',
                result: result
            })
        })
        .catch(err => {
            res.status(200).json({
                err_code: 500,
                message: '用户状态更新失败!',
                err: err
            })
        })
}

const loseTest = function(req, res) {
    console.log(req.body.adminUserId)
    let adminUserId = req.body.adminUserId
    User.updateOne({ _id: adminUserId }, { $set: { 'status': 0 } })
        .then(result => {
            res.status(200).json({
                err_code: 0,
                message: '用户状态更新成功!',
                result: result
            })
        })
        .catch(err => {
            res.status(200).json({
                err_code: 500,
                message: '用户状态更新失败!',
                err: err
            })
        })
}

module.exports = {
    createUser,
    findUser,
    saveWrong,
    getWrong,
    uploadAvatar,
    findUserAvatarById,
    findUserById,
    adminLogin,
    adminUser,
    adminUserInform,
    newAdmin,
    getTest,
    loseTest
}