const express = require('express');
const router = express.Router();
const fs = require('fs')
const path = require('path')
const Class = require('./../controllers/class')

router.get('/examClass', Class.examClass)
router.post('/saveSubject', Class.saveSubject)

module.exports = router;