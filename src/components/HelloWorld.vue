<template>
    <div class="hello">
        <router-view></router-view>
        <van-tabbar
        v-model="active"
        active-color="00ba8a">
            <van-tabbar-item to="/">
                <span>首页</span>
                <img
                class="imgIcon"
                slot="icon"
                slot-scope="props"
                :src="props.active ? icon.active : icon.normal"
                >
            </van-tabbar-item>
            <van-tabbar-item to="/home/list">
                <span>世界</span>
                <img
                class="imgIcon"
                slot="icon"
                slot-scope="props"
                :src="props.active ? icon.worldActive : icon.worldNormal"
                >
            </van-tabbar-item>
            <van-tabbar-item to="/home/user">
                <span>我的</span>
                <img
                class="imgIcon"
                slot="icon"
                slot-scope="props"
                :src="props.active ? icon.userActive : icon.userNormal"
                >
            </van-tabbar-item>
            <van-tabbar-item to="/home/testList" v-if="showTest">
                <span>测试</span>
                <img
                class="imgIcon"
                slot="icon"
                slot-scope="props"
                :src="props.active ? icon.testListActive : icon.testListNormal"
                >
            </van-tabbar-item>
        </van-tabbar>
    </div>
</template>

<script>
import { fail } from 'assert';
//静态文件要用 require() 方法先
const homeIcon = require('@/assets/img/home.png')
const homeIcon01 = require('@/assets/img/home01.png')
const worldIcon = require('@/assets/img/world.png')
const worldIcon01 = require('@/assets/img/world-1.png')
const userIcon = require('@/assets/img/user.png')
const userIcon01 = require('@/assets/img/user01.png')
const testList = require('@/assets/img/testList.png')
const testList01 = require('@/assets/img/testList_1.png')
export default {
  name: 'HelloWorld',
    data (){
        return{
            active: 0,
            showTest: false,
            icon: {
                normal: homeIcon,
                active: homeIcon01,
                worldNormal: worldIcon,
                worldActive: worldIcon01,
                userNormal: userIcon,
                userActive: userIcon01,
                testListNormal: testList,
                testListActive: testList01
            },
        }
    },
    methods: {
        getUserStatus() {
            let user = this.$cookies.get("user")
            if(user.status == 0) {
                this.showTest = false
            }
            else if(user.status == 1) {
                this.showTest = true
            }
        }
    },
    created() {
        while(this.$cookies.get("user") == null || this.$cookies.get("user") == undefined) {
            return
        };
        this.getUserStatus()
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
