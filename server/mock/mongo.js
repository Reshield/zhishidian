db.classes.insertMany([
    { "class": "小学", "subject": "语文" },
    { "class": "小学", "subject": "数学" },
    { "class": "小学", "subject": "英语" },
    { "class": "小学", "subject": "思想品德" },
    { "class": "初中", "subject": "语文" },
    { "class": "初中", "subject": "数学" },
    { "class": "初中", "subject": "英语" },
    { "class": "初中", "subject": "政治" },
    { "class": "初中", "subject": "历史" },
    { "class": "初中", "subject": "生物" },
    { "class": "初中", "subject": "地理" },
    { "class": "初中", "subject": "化学" },
    { "class": "初中", "subject": "物理" },
    { "class": "高中", "subject": "语文" },
    { "class": "高中", "subject": "数学" },
    { "class": "高中", "subject": "英语" },
    { "class": "高中", "subject": "政治" },
    { "class": "高中", "subject": "历史" },
    { "class": "高中", "subject": "生物" },
    { "class": "高中", "subject": "地理" },
    { "class": "高中", "subject": "化学" },
    { "class": "高中", "subject": "物理" },
    { "class": "大学", "subject": "计算机" },
    { "class": "大学", "subject": "英语" },
    { "class": "大学", "subject": "数学" },
    { "class": "大学", "subject": "政治" },
    { "class": "大学", "subject": "其他" }
])

db.classes.insertMany([{
        "class": "小学",
        children: [
            { "subject": "语文" },
            { "subject": "数学" },
            { "subject": "英语" },
            { "subject": "思想品德" }
        ]
    },
    {
        "class": "初中",
        children: [
            { "subject": "语文" },
            { "subject": "数学" },
            { "subject": "英语" },
            { "subject": "政治" },
            { "subject": "历史" },
            { "subject": "生物" },
            { "subject": "地理" },
            { "subject": "物理" },
            { "subject": "化学" }
        ]
    },
    {
        "class": "高中",
        children: [
            { "subject": "语文" },
            { "subject": "数学" },
            { "subject": "英语" },
            { "subject": "政治" },
            { "subject": "历史" },
            { "subject": "生物" },
            { "subject": "地理" },
            { "subject": "物理" },
            { "subject": "化学" }
        ]
    },
    {
        "class": "大学",
        children: [
            { "subject": "英语" },
            { "subject": "数学" },
            { "subject": "文学" },
            { "subject": "计算机" },
            { "subject": "其他" },
        ]
    }
])



db.classes.insertMany([{
        "userid": "5c80c5d172d52a38f85d47b3",
        "class": "小学",
        children: [
            { "subject": "语文" },
            { "subject": "数学" },
            { "subject": "英语" },
            { "subject": "思想品德" }
        ]
    },
    {
        "userid": "5c80c5d172d52a38f85d47b3",
        "class": "初中",
        children: [
            { "subject": "语文" },
            { "subject": "数学" },
            { "subject": "英语" },
            { "subject": "政治" },
            { "subject": "历史" },
            { "subject": "生物" },
            { "subject": "地理" },
            { "subject": "物理" },
            { "subject": "化学" }
        ]
    },
    {
        "userid": "5c80c5d172d52a38f85d47b3",
        "class": "高中",
        children: [
            { "subject": "语文" },
            { "subject": "数学" },
            { "subject": "英语" },
            { "subject": "政治" },
            { "subject": "历史" },
            { "subject": "生物" },
            { "subject": "地理" },
            { "subject": "物理" },
            { "subject": "化学" }
        ]
    },
    {
        "userid": "5c80c5d172d52a38f85d47b3",
        "class": "大学",
        children: [
            { "subject": "英语" },
            { "subject": "数学" },
            { "subject": "文学" },
            { "subject": "计算机" }
        ]
    }
])

db.users.updateMany({ "_id": "5c80c5d172d52a38f85d47b3" }, {
    $pull: {
        "wrongQuestions": [
            "5c886eca9f3d28339c6e4623",
            "5c886eca9f3d28339c6e4623",
            "5c886dd69f3d28339c6e4622",
            "5c8868ba9f3d28339c6e461f",
            "5c8869419f3d28339c6e4620",
            "5c840a151cd28c384c5a779f",
            "5c862fb5a4bee4492823b3e5"
        ]
    }
})

db.users.update({ "_id": ObjectId("5c80c5d172d52a38f85d47b3") }, { $pull: { "wrongQuestions": "5c886dd69f3d28339c6e4622" } })

db.users.update({ "_id": "5c80c5d172d52a38f85d47b3" }, { $unset: { "wrongQuestions.1": 1 } })

db.users.find({ "nickname": "HUIKIM" }).pretty()

db.classes.update({ "class": "大学" }, {
    $pull: {
        children: { "subject": "其他" }
    }
})

db.users.update({ "avatarBK": "/images/avatarBK.png" }, { $set: { "avatarBK": "avatarBK.png" } }, { multi: true })


db.users.update({ "avatar": "/images/default.png" }, { $set: { "avatar": "default.png" } }, { multi: true })

db.users.find().pretty()

db.shares.update({}, { '$unset': { 'avatar': 1 } }, false, true)

db.questions.remove({ "_id": ObjectId("5ca1aa436ab32916a4bed114") })

db.questions.find({ 'type': '填空题' }).pretty()

db.shares.updateMany({}, { $set: { likeActive: "@/assets/img/like.png" } }, { multi: true })

db.shares.find({ 'headline': '我是某某的分享' }).pretty()


db.shares.find({ 'headline': '第五个试试' }).pretty()


db.shares.updateMany({}, { $set: { likeActive: "http://127.0.0.1:8080/images/like.png" } }, { multi: true })


db.shares.updateOne({ 'headline': '第五个试试' }, { $set: { likeActive: "http://127.0.0.1:3000/images/like.png" } }, { multi: true })


db.users.find().pretty()

db.subjects.find().pretty()

db.subjects.drop()

db.feedbacks.remove({ shareId: "5c8761703b4eca00d0285238" })


db.feedbacks.find().pretty()