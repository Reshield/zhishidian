<template>
    <div>
        <el-container>
            <el-aside width="200px">
                    <el-menu
                    class="el-menu-vertical-demo"
                    @open="handleOpen"
                    @close="handleClose"
                    background-color="#545c64"
                    text-color="#fff"
                    active-text-color="#ffd04b">
                        <el-submenu index="1">
                            <template slot="title">
                                <i class="el-icon-location"></i>
                                <span>导航一</span>
                            </template>
                            <el-menu-item-group>
                                <el-menu-item index="1-1" @click="toShareList">分享列表</el-menu-item>
                                <el-menu-item index="1-2" @click="toUserList">用户列表</el-menu-item>
                            </el-menu-item-group>
                        </el-submenu>
                        <el-menu-item index="2">
                            <i class="el-icon-menu"></i>
                            <span slot="title">导航二</span>
                        </el-menu-item>
                        <el-menu-item index="3">
                            <i class="el-icon-setting"></i>
                            <span slot="title">导航三</span>
                        </el-menu-item>
                    </el-menu>
                </el-aside>
            <el-container>
                <el-header>
                    <el-menu
                    :default-active="activeIndex2"
                    class="el-menu-demo"
                    mode="horizontal"
                    @select="handleSelect"
                    background-color="#545c64"
                    text-color="#fff"
                    active-text-color="#ffd04b">
                        <el-menu-item index="1" @click="toHome">首页</el-menu-item>
                        <el-submenu index="2">
                            <template slot="title">人员管理</template>
                            <el-menu-item index="2-1">选项1</el-menu-item>
                            <el-menu-item index="2-2">选项2</el-menu-item>
                            <el-menu-item index="2-3">选项3</el-menu-item>
                        </el-submenu>
                    </el-menu>
                </el-header>
                <el-main>
                    <router-view class="children"></router-view>
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>

<script>
export default {
    name: 'home',
    data() {
        return {
            activeName: 'second',
            activeIndex2: '1'
        }
    },
    methods: {
        handleSelect(key, keyPath) {
            console.log(key)
            console.log(key, keyPath);
        },
        handleOpen(key, keyPath) {
            console.log(key, keyPath);
        },
        handleClose(key, keyPath) {
            console.log(key, keyPath);
        },
        toHome() {
            this.$router.push('/sharesList')
        },
        toShareList() {
            this.$router.push('/sharesList')
        },
        toUserList() {
            this.$router.push('/userList')
        }
    }
}
</script>

<style>
.children {
    float: left;
    width: 100%;
    height: 600px;
}
</style>
