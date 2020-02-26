<template>
    <div>
        <el-table
        :data="tableData"
        height="600"
        border
        style="width: 100%">
                <el-table-column
                type="index"
                label="序号"
                width="180">
                </el-table-column>
                <el-table-column
                prop="nickname"
                label="昵称"
                width="180">
                </el-table-column>
                <el-table-column
                prop="email"
                label="邮箱">
                </el-table-column>
                <el-table-column
                prop="questionCount"
                label="录入题量">
                </el-table-column>
                <el-table-column
                prop="statusValue"
                label="权限">
                </el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <el-button
                        size="mini"
                        @click="userInform(scope.$index, scope.row)">管理</el-button>
                    </template>
                </el-table-column>
        </el-table>
    </div>
</template>

<script>
import { constants } from 'fs';
export default {
    name: 'userList',
    data() {
        return {
            tableData: []
        }
    },
    methods: {
        userInform(index, row) {
            console.log(index, row)
            let adminUser = this.$cookies.get("adminUserId")
            if(adminUser == null || adminUser == 'null') {
                this.$cookies.set("adminUserId", this.tableData[index].userid)
                this.$router.push('/userInform')
            }
            else {
                this.$cookies.set("adminUserId", null)
                this.$cookies.set("adminUserId", this.tableData[index].userid)
                this.$router.push('/userInform')
            }
      },
    },
    created() {
        this.$axios.get('/admin/user')
        .then(res => {
            this.tableData = res.data.userList
        })
        .catch(err => {
            console.log(err)
        })
    }
}
</script>

<style>

</style>
