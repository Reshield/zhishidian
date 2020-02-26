<template>
    <div>
        <el-card class="box-card">
            <template>
                <el-tabs v-model="activeName" @tab-click="handleClick">
                    <el-tab-pane label="分享信息" name="first">分享信息</el-tab-pane>
                    <el-tab-pane label="题目信息" name="second">题目信息</el-tab-pane>
                    <el-tab-pane label="用户评论" name="third">用户评论</el-tab-pane>
                    <el-tab-pane label="用户反馈" name="fourth">用户反馈</el-tab-pane>
                </el-tabs>
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
                        prop="comment"
                        label="评论"
                        width="180">
                        </el-table-column>
                        <el-table-column
                        prop="nickname"
                        label="用户名">
                        </el-table-column>
                        <el-table-column label="操作">
                            <template slot-scope="scope">
                                <el-button
                                size="mini"
                                @click="handleEdit(scope.$index, scope.row)">查看</el-button>
                            </template>
                        </el-table-column>
                </el-table>
            </template>
            
        </el-card>
    </div>
</template>

<script>
export default {
    name: 'shareComment',
    data() {
        return {
            activeName: 'third',
            tableData: []
        }
    },
    methods: {
        handleClick(tab, event) {
            if(tab.index == 0) {
                this.$router.push('/shareInform')
            }
            else if(tab.index == 2) {
                this.$router.push('/shareComment')
            }
            else if(tab.index == 3) {
                this.$router.push('/shareFeedback')
            }
        },
        getComment() {
            let adminShareId = this.$cookies.get("adminShareId")
            this.$axios.get('/admin/shareComment', {
                params: {
                    adminShareId: adminShareId
                }
            })
            .then(res => {
                this.tableData = res.data.comments
            })
            .catch(err => {
                console.log(err)
            })
        }
    },
    created() {
        this.getComment()
    }
}
</script>

<style>

</style>
