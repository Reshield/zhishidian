const express = require('express')
const router = express.Router()
const User = require('./../controllers/user')



/* GET users listing. */
router.post('/register', User.createUser)
router.post('/login', User.findUser)
router.post('/saveWrong', User.saveWrong)
router.get('/getWrong', User.getWrong)
router.get('/findUserById', User.findUserById)
router.get('/findUserAvatarById', User.findUserAvatarById)
router.post('/uploadAvatar', User.uploadAvatar)

module.exports = router;