const express = require('express');
const router = express.Router();
const Share = require('./../controllers/share')

router.post('/shareById', Share.shareById)
router.post('/saveShareLike', Share.saveShareLike)
router.post('/deleteShareLike', Share.deleteShareLike)
router.post('/evaluate', Share.evaluate)
router.post('/feedback', Share.feedback)
router.get('/allOpenShare', Share.allOpenShare)
router.get('/allShare', Share.allShare)
router.get('/findById', Share.findById)
router.get('/adminAllShare', Share.adminAllShare)
router.get('/adminDeleteQuestion', Share.adminDeleteQuestion)

module.exports = router;