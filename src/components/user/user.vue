<template>
    <div>
        <van-nav-bar
        :title="title"
        left-text="返回"
        right-text=""
        left-arrow
        @click-left="onClickLeft"
        />
        <div name="avatarBK" class="avatarBK" v-bind:style="{backgroundImage:'url('+ bkAvaImage + ')'}">
            <img :src="inform" @click="userNews" class="inform" alt="..."/>
            <div name='avatar' class="userAvatar" @click="avartar" v-bind:style="{backgroundImage:'url(' + avaImage + ')'}">
            </div>
            <p class="nickname" name="nickname">{{ nickname }}</p>
        </div>
        <van-cell-group style="width:100%">
            <van-cell style="width:100%">
                <p style="fontSize:18px">我的题目</p>
                <van-row class="row" van-row type="flex" justify="space-around">
                    <van-col span="6" class="col">
                        <router-link to="/userAdd" class="userLink">
                            <span>我的录入</span><br>
                            <span>{{ addCount }}</span>
                        </router-link>
                    </van-col>
                    <van-col span="6" class="col">
                        <router-link to="/userError" class="userLink">
                            <span>错题本</span><br>
                            <span>{{ wrongCount }}</span>
                        </router-link>
                    </van-col>
                    <van-col span="6" class="col">
                        <router-link to="/userCollect" class="userLink">
                            <span>我的收藏</span><br>
                            <span>{{ collectCount }}</span>
                        </router-link>
                    </van-col>
                </van-row>
            </van-cell>
        </van-cell-group>
    </div>
</template>

<script>
import { mapState } from 'vuex'
import bkAvaImage from './../../../static/img/avatarBK.png'
import avaImage from'./../../../static/img/default.png'
import inform from'@/assets/img/inform.png'
export default {
    name: 'user',
    data() {
        return {
            title: '个人',
            bkAvaImage: bkAvaImage,
            avaImage: avaImage,
            nickname: '请先登录',
            inform: inform,
            addCount: 0,
            wrongCount: 0,
            collectCount: 0
        }
    },
    computed: {
        ...mapState(["isLogin","session"])
    },
    methods: {
        onClickLeft () {
            this.$router.go(-1)
        },
        userNews () {
            this.$router.push('/userNews')
        },
        userInform () {
            let user = this.$cookies.get("user")
            let userid = user._id
            this.$axios.get('/user/findUserById', {
                params: {
                    userid: userid
                }
            })
            .then(res => {
                this.nickname = res.data.user.nickname
                this.avaImage = 'http://127.0.0.1:3000/images/' + res.data.user.avatar
                this.bkAvaImage = 'http://127.0.0.1:3000/images/' + res.data.user.avatarBK
                let wrongs = res.data.user.wrongQuestions
                let collects = res.data.user.collectShare
                this.wrongCount = wrongs.length
                this.collectCount = collects.length
            })
            .catch(err => {
                console.log(err)
            })   
        },
        getAddCount() {
            let user = this.$cookies.get("user")
            let userid = user._id
            this.$axios.get('/question/findByUserId', {
            params: {
              userid: userid
            }
            })
            .then(res => {
                let question = res.data.question
                this.addCount = question.length
            })
            .catch(err => {
                console.log(err)
            })
        },
        getWrongCount(user) {
            let wrongs = user.wrongQuestions
            let collection = user.collectShare
            this.wrongCount = wrongs.length
            this.collectCount = collection.length
        },
        avartar() {
            this.$router.push('/userInform')
        }
    },
    created() {
        let getFlag = localStorage.getItem("Flag")
        if(getFlag === 'isLogin') {
            this.getAddCount()
            this.userInform()
        }
        else {
            this.nickname = '请先登录'
        }
        
        if(this.$route.query.login != null || this.$route.query.login != undefined) {
            this.$toast({
                message: this.$route.query.login
            })
        }
    },
}
</script>

<style>
.avatarBK{
    width: 100%;
    height: 300px;
    background-size: cover;
    background-position: center center;
    background-repeat: no-repeat;
    background-size: cover;
    text-align: center
}
.userAvatar{
    width: 100px;
    height: 100px;
    background-size: cover;
    background-position: center center;
    background-repeat: no-repeat;
    background-size: cover;
    position: relative;
    top: 30px;
    margin:0 auto;
    border-radius: 50px;
}
.col{
    background-color: rgba(0, 0, 0, 0);
    height: 50px;
    text-align: center;
}
.row{
    background-color: rgba(0, 0, 0, 0)
}
.nickname{
    color: #ffffff;
    font-size: 20px;
    position: relative;
    top: 20px;
}
.inform{
    position: fixed;
    width: 50px;
    height: 50px;
    left: 80%;
}
.userLink{
    text-decoration: none;
    color: #000000;
}
</style>
