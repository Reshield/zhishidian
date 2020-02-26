const express = require('express');
const router = express.Router();
const Share = require('./../controllers/share')
const User = require('./../controllers/user')
const Comment = require('./../controllers/comment')

router.post('/login', User.adminLogin)
router.post('/newAdmin', User.newAdmin)
router.post('/admin/getOpen', Share.getOpen)
router.post('/admin/loseOpen', Share.loseOpen)
router.post('/admin/getTest', User.getTest)
router.post('/admin/loseTest', User.loseTest)
router.get('/admin/user', User.adminUser)
router.get('/admin/userInform', User.adminUserInform)
router.get('/index', Share.adminCome)
router.get('/admin/shareInform', Share.shareInform)
router.get('/admin/feedbackData', Share.feedbackData)
router.get('/admin/getFeedback', Share.getFeedback)
router.get('/admin/shareComment', Comment.adminShareComment)

router.get('/login', function(req, res, next) {
    res.render('login.html')
})

module.exports = router;