<template>
    <div>
        <el-card class="box-card">
            <template>
                <el-tabs v-model="activeName" @tab-click="handleClick">
                    <el-tab-pane label="用户管理" name="first">用户管理</el-tab-pane>
                    <el-tab-pane label="题目数据" name="second">题目数据</el-tab-pane>
                    <el-tab-pane label="分享数据" name="third">分享数据</el-tab-pane>
                    <el-tab-pane label="反馈数据" name="fourth">反馈数据</el-tab-pane>
                </el-tabs>
            </template>
            <img :src="avatar" alt="用户头像.png" class="adminUserAvatar">
            <li><h2>用户名： {{nickname}}</h2></li>
            <li><h2>邮箱： {{email}}</h2></li>
            <li><h2>状态： {{statuValue}}</h2></li>
            <div class="userStatus">
                <h1>权限状态:</h1>
                <el-switch
                v-model="changeStatus"
                active-color="#13ce66"
                inactive-color="#ff4949">
                </el-switch>
                <el-button type="primary" @click="changeUserStatus">{{ statuValue }}</el-button>
            </div>
        </el-card>
    </div>
</template>

<script>
import { fail } from 'assert';
import { constants } from 'fs';
export default {
    name: 'userInform',
    data() {
        return {
            activeName: 'first',
            nickname: '',
            avatar: '',
            email: '',
            userStatus: null,
            changeStatus: false,
            statuValue: '该用户未获得测试权限'
        }
    },
    methods: {
        getUser() {
            let adminUserId = this.$cookies.get("adminUserId")
            this.$axios.get('/admin/userInform', {
                params: {
                    adminUserId: adminUserId
                }
            })
            .then(res => {
                this.nickname = res.data.user.nickname
                this.avatar = 'http://127.0.0.1:3000/images/' + res.data.user.avatar
                this.email = res.data.user.email
                let status = res.data.user.status
                console.log(status)
                this.userStatus = res.data.user.status
                if(status == 0) {
                    this.statuValue = '该用户未获得测试权限'
                    this.changeStatus = false
                }
                else if(status == 1) {
                    this.statuValue = '该用户为测试会员'
                    this.changeStatus = true
                }
            })
            .catch(err => {
                console.log(err)
            })
        },
        changeUserStatus() {
            console.log(this.changeStatus)
            let adminUserId = this.$cookies.get("adminUserId")
            if(this.userStatus == 0 && this.changeStatus == true) {
                console.log(1)
                console.log(adminUserId)
                this.$axios.post('/admin/getTest', {
                    adminUserId: adminUserId
                })
                .then(res => {
                    if(res.data.err_code == 0) {
                        this.statuValue = '该用户为测试会员'
                        this.ifOpen = 1
                    }
                })
                .catch(err => {
                    console.log(err)
                })
            }
            else if(this.userStatus == 1 && this.changeStatus == false) {
                console.log(2)
                this.$axios.post('/admin/loseTest', {
                    adminUserId: adminUserId
                })
                .then(res => {
                    if(res.data.err_code == 0) {
                        this.statuValue = '该用户未获得测试权限'
                        this.ifOpen = 0
                    }
                })
                .catch(err => {
                    console.log(err)
                })
            }
        },
        handleClick(tab, event) {
            console.log(tab, event);
        },

    },
    async created() {
        await this.getUser()
    }
}
</script>

<style>
.adminUserAvatar {
    width: 100xp;
    height: 100px;
    border-radius: 50px;
}
.userStatus {

}
</style>
