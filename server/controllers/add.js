const Question = require('./../model/question')

const danxuan = async function(req, res) {
    let body = req.body.Danxuan
    new Question({
            userid: body.userid,
            class: body.class,
            subject: body.subject,
            type: body.type,
            question: body.question,
            tips: body.tips,
            options: body.options,
        }).save().then(result => {
            res.status(200).json({
                message: '添加成功',
                err_code: 0
            })
        })
        .catch(err => {
            console.log(err) //save
            res.status(500).json({
                message: '添加失败',
                err_code: 1
            })
        });

}

const tiankong = function(req, res) {
    let body = req.body
    new Question({
            userid: body.userid,
            fills: body.fills,
            class: body.grade,
            subject: body.subject,
            type: body.type,
            tips: body.tips,
        }).save()
        .then(result => {
            if (result != null) {
                res.status(200).json({
                    err_code: 0,
                    message: '填空题保存成功！'
                })
            }
        })
        .catch(err => {
            res.status(200).json({
                err_code: 0,
                message: '填空题保存失败！'
            })
        })
}

module.exports = {
    danxuan,
    tiankong
}