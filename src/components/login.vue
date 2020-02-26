<template>
    <div>
        <van-nav-bar
          :title="title"
          left-text="返回"
          right-text="注册"
          left-arrow
          @click-left="onClickLeft"
          @click-right="onClickRight"
        />
        <div class="loginLogo">
            <van-row type="flex" justify="center" class="loginFlex">
                <img class="loginLogoLine" :src="logoLine" alt="- 知识典 -">
                <img class="loginLogoImg" :src="loginLogo" alt="- 知识典 -">
                <img class="loginLogoLine" :src="logoLine" alt="- 知识典 -">
            </van-row>
            <img class="loginBanner" :src="banner" alt="标语">
        </div>
        <div name="login" class="login">
            <div name="nickname" class="loginDiv">
                <input type="text" v-model="email" placeholder="用户名或邮箱" class="loginInput"/>
            </div>
            <div name="nickname" class="loginDiv">
                <input type="password" v-model="password" placeholder="密码" class="loginInput"/>
            </div>
        </div>
        <div class="loginBtn">
            <van-button round type="default" class="loginSubmit" @click="submit">登录</van-button>
        </div>
        <div class="loginTip">
            <router-link to="/userForget" style="color: #1851b7">忘记密码</router-link>
        </div>
    </div>
</template>

<script>
import { mapActions,mapState } from 'vuex'
const loginLogo = require('@/assets/img/logo-2.png')
const logoLine = require('@/assets/img/logoline.png')
const banner = require('@/assets/img/banner.png')
export default {
    name: 'login',
    data() {
        return {
            title: '登录',
            email: '',
            password: '',
            loginLogo: loginLogo,
            logoLine: logoLine,
            banner: banner,
        }
    },
    methods: {
        ...mapActions(["setUser"]),
        submit() {
            let email = this. email
            let password = this.password
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
            this.$axios.post('/user/login', {
                email: email,
                password: password
            })
            .then(res => {
                console.log(res.data.session)
                let code = res.data.code
                let message = res.data.message
                let user = res.data.session.user
                let userid = res.data.session.user._id
                switch (code) {
                    case 1:
                        this.$toast({
                            message: message
                        })
                        break
                    case 2:
                        this.$toast({
                            message: message
                        })
                        break
                    case 0:
                        this.$toast({
                            message: message
                        })
                        this.setUser(true) //把 vuex 中 state 库的 isLogin 设置为 true
                        // this.setSession(user) //把 vuex 中 state 库的 session 设置为 user 的信息
                        this.$cookies.set("user",user)//把 cookie 设置成当前用户状态
                        localStorage.setItem("Flag","isLogin") //把 localStorage 的 Flag 设置为 true
                        this.$router.push({ path: '/home/user', params: {userid: userid}})
                        break
                }
            })
            .catch(err => {
                console.log(err)
            })
        },
        onClickLeft() {
            this.$router.push('/')
        },
        onClickRight() {
            this.$router.push('/register')
        }
    },
    created() {
        if(this.$route.query.login != null || this.$route.query.login != undefined) {
            this.$toast({
                message: this.$route.query.login
            })
        }
    },

}
</script>

<style>
.loginLogo {
    height: 100px;
    position: relative;
    letter-spacing:5px;
    top: 20px;
}
.loginFlex {
    height: 100px;
}
.loginLogoLine {
    position: relative;
    top: 25px;
    height: 40%;
    width: 6%;
    margin:0 20px;
}
.loginLogoImg {
    width: 40%;
    height: 45%;
    position: relative;
    top: 22px;
}
.loginBanner {
    width: 50%;
}
.loginDiv{
    margin: 30px  auto;
    border-bottom: 2px solid #808080;
    height: 50px;
    width: 80%;
}
.login {
    position: relative;
    top: 40px;
}
.loginInput{
    border-width: 0;
    width: 100%;
    height: 95%;
    position: relative;
}
.loginBtn{
    width: 100%;
    position: relative;
    top: 70px;
}
.loginSubmit{
    border-color: #1851b7;
    width: 60%
}
.loginTip{
    position: relative;
    top: 80px;
    font-size: 14px;
}
</style>
