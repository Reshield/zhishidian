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
                width="80">
                </el-table-column>
                <el-table-column
                prop="headline"
                label="标题"
                width="180">
                </el-table-column>
                <el-table-column
                prop="summary"
                label="简介">
                </el-table-column>
                <el-table-column
                width="80"
                prop="questionsLength"
                label="题量">
                </el-table-column>
                <el-table-column
                width="100"
                prop="nickname"
                label="用户">
                </el-table-column>
                <el-table-column
                width="100"
                prop="openStatus"
                label="发布状态">
                </el-table-column>
                <el-table-column label="操作" width="100">
                    <template slot-scope="scope">
                        <el-button
                        size="mini"
                        @click="handleEdit(scope.$index, scope.row)">查看</el-button>
                    </template>
                </el-table-column>
                <el-table-column label="删除" width="100">
                    <template slot-scope="scope">
                        <el-button
                        size="mini"
                        @click="deleteShare(scope.$index, scope.row)">删除</el-button>
                    </template>
                </el-table-column>
        </el-table>
    </div>
</template>

<script>
import { constants } from 'fs'
import { MessageBox } from 'element-ui';
import { fail } from 'assert';
export default {
    name: 'sharesList',
    data() {
        return {
            tableData: []
        }
    },
    methods:{
        getShares() {
            this.$axios.get('/share/adminAllShare')
            .then(res => {
                this.tableData = res.data.shares.reverse()
            })
            .catch(err => {
                console.log(err)
            })
        },
        handleEdit(index, row) {
            let shareId = row.shareId
            if(this.$cookies.get("adminShareId") != undefined || this.$cookies.get("adminShareId") != null) {
                this.$cookies.set("adminShareId", null)
                this.$cookies.set("adminShareId", shareId)
                this.$router.push('/shareInform')
            }
            else {
                this.$cookies.set("adminShareId", shareId)
                this.$router.push('/shareInform')
            }
        },
        deleteShare(index, row) {
            MessageBox.confirm('此操作将永久删除该题目, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.$axios.get('/share/adminDeleteQuestion', {
                    params: {
                        shareId: row.shareId,
                        userId: row.userId
                    }
                })
                .then(res => {
                    if(res.data.err_code == 0) {
                        MessageBox({
                            type: 'success',
                            message: '删除成功'
                        })
                        this.getShares()
                    }
                    else {
                        MessageBox({
                            type: 'fail',
                            message: '删除失败'
                        })
                    }
                })
            }).catch(err => {  
                console.log(err)
            });
        }
    },
    created () {
        this.getShares()
    }
}
</script>

<style>

</style>
