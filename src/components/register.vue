<template>
    <div>
        <van-nav-bar
          :title="title"
          left-text="返回"
          right-text=""
          left-arrow
          @click-left="onClickLeft"
        />
        <div class="registerLogo">
            <van-row type="flex" justify="center" class="registerFlex">
                <img class="logoLine" :src="logoLine" alt="- 知识典 -">
                <img class="logoImg" :src="registerLogo" alt="- 知识典 -">
                <img class="logoLine" :src="logoLine" alt="- 知识典 -">
            </van-row>
            <img class="banner" :src="banner" alt="标语">
        </div>
        <div name="register" class="register">
            <div name="nickname" class="registerDiv">
                <input type="text" v-model="nickname" placeholder="用户名" class="registerInput"/>
            </div>
            <div name="email" class="registerDiv">
                <input type="text" v-model="email" placeholder="邮箱" class="registerInput"/>
            </div>
            <div name="nickname" class="registerDiv">
                <input type="text" v-model="password" placeholder="密码" class="registerInput"/>
            </div>
        </div>
        <div class="registerBtn">
            <van-button round type="default" class="registerSubmit" @click="submit">注册</van-button>
        </div>
        <div class="registerTip">
            <router-link to="/userForget" style="color: #1851b7">知识典用户协议</router-link>
        </div>
    </div>
</template>

<script>
import { mapActions } from 'vuex'
const registerLogo = require('@/assets/img/logo-2.png')
const logoLine = require('@/assets/img/logoline.png')
const banner = require('@/assets/img/banner.png')
export default {
    name: 'register',
    data() {
        return {
            title: '注册',
            nickname: '',
            email: '',
            password: '',
            registerLogo: registerLogo,
            logoLine: logoLine,
            banner: banner
        }
    },
    methods: {
        ...mapActions(["setUser", "setSession"]),
        onClickLeft() {
            this.$router.push('/')
        },
        submit() {
            let nickname = this.nickname
            let email = this.email
            let password = this.password
            if(nickname == '' || nickname == null) {
                return this.$toast({
                    message:`请输入昵称！`
                })
            }
            if(email == '' || email == null) {
                return this.$toast({
                    message:`请输入邮箱！`
                })
            }
            if(password == '' || password == null) {
                return this.$toast({
                    message:`请输入密码！`
                })
            }
            this.$axios.post('/user/register', {
                nickname: nickname,
                email: email,
                password: password,
            })
            .then(res => {
                console.log(res.data)
                let code = res.data.code
                let message = res.data.message
                switch (code) {
                    case 1:
                        return this.$toast({
                            message: message
                        })
                        break
                    case 2:
                        return this.$toast({
                            message: message
                        })
                        break
                    case 3:
                        return this.$toast({
                            message: message
                        })
                        break
                    case 0:
                        this.$toast({
                            message: message
                        })
                        let user = res.data.session.user
                        let userid = res.data.session.user._id
                        let userName = res.data.session.user.nickname
                        this.setUser(true) //把 vuex 中 state 库的 isLogin 设置为 true
                        this.setSession(user) //把 vuex 中 state 库的 isLogin 设置为 true
                        this.$cookies.set("user",user)
                        localStorage.setItem("Flag","isLogin") //把 localStorage 的 Flag 设置为 true
                        this.$router.push({ name: 'user', params: {userid: userid, userName: userName}})
                        break
                }
            })
            .catch(err => {
                console.log(err)
            })
        }
    },
}
</script>

<style>
.registerLogo {
    height: 100px;
    position: relative;
    letter-spacing:5px;
    top: 20px;
}
.registerFlex {
    height: 100px;
}
.logoImg {
    width: 40%;
    height: 45%;
    position: relative;
    top: 22px;
}
.logoLine {
    position: relative;
    top: 25px;
    height: 40%;
    width: 6%;
    margin:0 20px;
}
.register {
    position: relative;
    top: 50px;
}
.banner {
    width: 50%;
}
.registerDiv {
    margin: 30px  auto;
    border-bottom: 2px solid #808080;
    height: 50px;
    width: 80%;
    background-color: antiquewhite
}
.registerInput {
    border-width: 0;
    width: 100%;
    height: 95%;
    position: relative;
}
.registerBtn {
    width: 100%;
    position: relative;
    top: 40px;
}
.registerSubmit {
    border-color: #1851b7;
    width: 60%
}
.registerTip {
    position: relative;
    top: 60px;
    font-size: 14px;
}
</style>
