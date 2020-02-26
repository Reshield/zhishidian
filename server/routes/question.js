const express = require('express');
const router = express.Router();
const Find = require('./../controllers/question')

router.post('/find', Find.findByClass)
router.get('/findByUserId', Find.findByUserId)
router.get('/findByclassNId', Find.findByclassNId)
router.get('/findByQuestionId', Find.findByQuestionId)

module.exports = router;