<template>
    <div>
        <van-nav-bar
        title="评论"
        left-text="返回"
        right-text=""
        left-arrow
        @click-left="onClickLeft"
        />
        <div class="commentHeader">
            <div class="comHeadlineDiv">
                <div class="comHeadline">{{ headline }}</div>
            </div>
            <div class="comSummaryDiv">
                <div class="comSummary">题目简介：{{ summary }}</div>
            </div>
            <div class="commentAvatarDiv">
                <img :src="userAvatar" alt="userAvatar.png" class="commentAvatar">
                <div class="comNickname">{{ nickname }}</div>
            </div>
        </div>
        <router-view class="comChildren"></router-view>
        <transition name="edit">
            <div class="comEditDiv" v-if="showCover" v-on:click="showEdit = true, showCover = false">
                <div class="comCoverDiv">
                    <div class="comCoverSpan">输入评论</div>
                </div>
            </div>
        </transition>
        <transition name="edit">
            <div class="editComDiv" v-if="showEdit" >
                <el-input
                    type="textarea"
                    rows="5"
                    placeholder="请输入评论"
                    class="commentInput"
                    v-model="editComment"
                >
                </el-input>
                <van-button size="small" @click="quit" class="editButton">取消</van-button>
                <van-button size="small" @click="sentEdit" class="editButton">发送</van-button>
            </div>
        </transition>
    </div>
</template>

<script>
export default {
    name: 'comment',
    data() {
        return {
            userAvatar: null,
            nickname: '',
            headline: '',
            summary: '',
            showEdit: false,
            showCover: true,
            editComment: '',
            comments: []
        }
    },
    methods: {
        onClickLeft() {
            this.$router.push('/enterShare')
        },
        sentEdit() {
            let userid = this.$cookies.get("user")._id
            let shareId = this.$cookies.get("shareId")
            let comment = this.editComment
            this.$axios.post('/comment/saveComment', {
                userid: userid,
                shareId: shareId,
                comment: comment
            })
            .then(res => {
                let userid = res.data.comment.userid
                let comment = res.data.comment.comment
                this.$axios.get('/user/findUserAvatarById', {
                    params: {
                        userid: userid
                    }
                })
                .then(res => {
                    let oneComment = {}
                    oneComment.avatar = 'http://127.0.0.1:3000/images/' + res.data.avatar
                    oneComment.nickname = res.data.nickname
                    oneComment.comment = comment
                    this.$store.dispatch("pushComment", oneComment)
                    this.editComment = ''
                })
                .catch(err => {
                    console.log(err)
                })
            })
            .catch(err => {
                console.log(err)
            })
            this.showEdit = false
            this.showCover = true
        },
        quit() {
            this.showEdit = false
            this.showCover = true
            this.editComment = ''
        },
        getComment() {
            let shareId = this.$cookies.get("shareId")
            this.$axios.get('/comment/findCommentByShareId', {
                params: {
                    shareId: shareId
                }
            })
            .then(res => {
                let comments = res.data.comments
                return this.setComment(comments)
            })
            .catch(err => {
                console.log(err)
            })
        },
        setComment(comments) {
            for(let i in comments) {
                let userid = comments[i].userid
                let comment = comments[i].comment
                this.$axios.get('/user/findUserAvatarById', {
                    params: {
                        userid: userid
                    }
                })
                .then(res => {
                    let oneComment = {}
                    oneComment.avatar = 'http://127.0.0.1:3000/images/' + res.data.avatar
                    oneComment.nickname = res.data.nickname
                    oneComment.comment = comment
                    this.comments[i] = oneComment
                })
                .catch(err => {
                    console.log(err)
                })
            }
            this.$store.dispatch("setComments", this.comments)
            this.$router.push('/comList')
        },
        getShareInform() {
            let shareId = this.$cookies.get("shareId")
            this.$axios.get('/share/findById', {
                params: {
                    shareId: shareId
                }
            })
            .then(res => {
                let userid = res.data.share.userid
                this.headline = res.data.share.headline
                this.summary = res.data.share.summary
                return this.avatarById(userid)
            })
            .catch(err => {
                console.log(err)
            })
        },
        avatarById(userid) {
            this.$axios.get('/user/findUserAvatarById', {
                params: {
                    userid: userid
                }
            })
            .then(res => {
                this.userAvatar = 'http://127.00.1:3000/images/' + res.data.avatar
                this.nickname = res.data.nickname
            })
        }
    },
    created() {
        this.getShareInform()
        this.getComment()
    },
}
</script>

<style>
.commentHeader {
    width: 100%;
    background-color: #836FFF;
    padding-top: 30px;
    padding-bottom: 30px;
}
.commentAvatarDiv {
    position: relative;
    left: 70%;
    width: 80px;
    margin-top: -60px;
}
.commentAvatar {
    width: 80px;
    height: 80px;
    border-radius: 80px;
    left: 70%;
    border: 2px solid;
    border-color: #ffffff;
    box-shadow: 0px 0px 10px;
}
.comNickname {
    color: #ffffff;
    box-shadow: 0px 0px 5px #4F4F4F;
}
.comHeadlineDiv {
    position: relative;
    text-align: left;
    padding-left: 5%;
    width: 95%;
}
.comHeadline {
    color: #ffffff;
    font-size: 20px;
    width: 100%;
}
.comSummaryDiv {
    position: relative;    
    width: 60%;
    text-align: left;
    padding-left: 5%;
}
.comSummary {
    color: #ffffff;
    font-size: 16px;
    width: 100%;
}
.comEditDiv {
    position: absolute;
    width: 100%;
    height: 50px;
    z-index: 2;
    overflow: hidden;
    bottom: 0%;
    text-align: center;
    align-items: center;
    box-shadow: 0px -2px 5px #DCDCDC;
}
.comCoverDiv {
    position: relative;
    background-color: #EEE9E9;
    width: 96%;
    height: 40px;
    top: 5px;
    margin: 0 auto;
    border-radius: 5px;
    text-align: left;
}
.comCoverSpan {
    position: relative;
    color: 	#696969;
    font-size: 16px;
    top: 7px;
    left: 10px;
}
.edit-enter-active {
  animation: bounce-in .5s;
}
.edit-leave-active {
  animation: bounce-in .5s reverse;
}
@keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  100% {
    transform: scale(1);
  }
}
.editComDiv {
    width: 100%;
    position: fixed;
    bottom: 0;
    z-index: 3;
    padding-top: 10px;
    background-color: #ffffff;
    box-shadow: 0px -2px 5px #EEE9E9;
}
.commentInput {
    width: 94%;
}
.editButton {
    width: 46%;
    margin: 1px;
}
.comChildren {
    height: 390px;
    width: 100%;
    overflow-y: scroll;
    overflow-x: hidden
}
</style>
