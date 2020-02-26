const express = require('express');
const router = express.Router();
const fs = require('fs')
const path = require('path')
const Add = require('./../controllers/add')
    /* GET home page. */

router.post('/submitDanxuan', Add.danxuan)
router.post('/tiankong', Add.tiankong)

module.exports = router;