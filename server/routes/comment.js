const express = require('express');
const router = express.Router();
const fs = require('fs')
const path = require('path')
const Comment = require('./../controllers/comment')

router.get('/findCommentByShareId', Comment.findCommentByShareId)
router.post('/saveComment', Comment.saveComment)

module.exports = router;