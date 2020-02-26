<template>
    <div>
        <el-card class="box-card" style="height: 600px;">
            <template>
                <el-tabs v-model="activeName" @tab-click="handleClick">
                    <el-tab-pane label="分享信息" name="first">分享信息</el-tab-pane>
                    <el-tab-pane label="题目信息" name="second">题目信息</el-tab-pane>
                    <el-tab-pane label="用户评论" name="third">用户评论</el-tab-pane>
                    <el-tab-pane label="用户反馈" name="fourth">用户反馈</el-tab-pane>
                </el-tabs>
            </template>
            <h1>题目：{{ headline }}</h1>
            <h3>简介：{{ summary }}</h3>
            <h3>状态：{{ openValue }}</h3>
            <div class="typeList">
                <li>{{this.danxuanValue}}</li>
                <li>{{this.duoxuanValue}}</li>
                <li>{{this.tiankongValue}}</li>
                <li>{{this.fenxiValue}}</li>
            </div>
            <div class="changeStatus">
                <h1>是否发布:</h1>
                <el-switch
                v-model="changeStatus"
                active-color="#13ce66"
                inactive-color="#ff4949">
                </el-switch>
                <el-button type="primary" @click="status">{{ statuValue }}</el-button>
            </div>
            
            <div class="questionData" id="questionData" ref="questionData"></div>
        </el-card>
    </div>
</template>

<script>
import { setTimeout } from 'timers';
import { fail } from 'assert';
import { connect } from 'net';
import { constants } from 'fs';
export default {
    name: 'shareInform',
    data() {
        return {
            activeName: 'first',
            headline: '',
            summary: '',
            openValue: '',
            questionLength: 0,
            danxuanLength: 0,
            duoxuanLength: 0,
            tiankongLength: 0,
            fenxiLength: 0,
            danxuanValue: '单选题',
            duoxuanValue: '多选题',
            tiankongValue: '填空题',
            fenxiValue: '分析题',
            ifOpen: null,
            changeStatus: false,
            statuValue: '确认发布'
        }
    },
    methods: {
        handleClick(tab, event) {
            console.log(tab.index)
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
        status() {
            console.log(this.changeStatus)
            let adminShareId = this.$cookies.get("adminShareId")
            if(this.ifOpen == 0 && this.changeStatus == true) {
                
                console.log(adminShareId)
                this.$axios.post('/admin/getOpen', {
                    adminShareId: adminShareId
                })
                .then(res => {
                    if(res.data.err_code == 0) {
                        this.statuValue = '确认撤销'
                        this.ifOpen = 1
                    }
                })
                .catch(err => {
                    console.log(err)
                })
            }
            else if(this.ifOpen == 1 && this.changeStatus == false) {
                this.$axios.post('/admin/loseOpen', {
                    adminShareId: adminShareId
                })
                .then(res => {
                    if(res.data.err_code == 0) {
                        this.statuValue = '确认发布'
                        this.ifOpen = 0
                    }
                })
                .catch(err => {
                    console.log(err)
                })
            }
        },
        getShareInform() {
            let adminShareId = this.$cookies.get("adminShareId")
            this.$axios.get('/admin/shareInform', {
                params: {
                    adminShareId: adminShareId
                }
            })
            .then(res => {
                if(res.data.share.open == 0) {
                    this.statuValue = '确认发布'
                    this.changeStatus = false
                }
                else if (res.data.share.open == 1) {
                    this.statuValue = '确认撤销'
                    this.changeStatus = true
                }
                this.ifOpen = res.data.share.open
                this.headline = res.data.share.headline
                this.summary = res.data.share.summary
                this.openValue = res.data.share.openValue
                this.questionLength = res.data.share.questionsLength
                this.danxuanLength = res.data.danxuan.length
                this.duoxuanLength = res.data.duoxuan.length
                this.tiankongLength = res.data.tiankong.length
                this.fenxiLength = res.data.fenxi.length
                this.danxuanValue = '单选题' +  ':' +String(res.data.danxuan.length)
                this.duoxuanValue = '多选题' +  ':' +String(res.data.duoxuan.length)
                this.tiankongValue = '填空题' +  ':' +String(res.data.tiankong.length)
                this.fenxiValue = '分析题' +  ':' +String(res.data.fenxi.length)
                setTimeout(() => {
                    this.questionData()
                })
            })
            .catch(err => {
                console.log(err)
            })
        },
        questionData() {
            var weatherIcons = {
                'Sunny': './data/asset/img/weather/sunny_128.png',
                'Cloudy': './data/asset/img/weather/cloudy_128.png',
                'Showers': './data/asset/img/weather/showers_128.png'
            };
            this.myChart = this.$echarts.init(this.$refs.questionData);
            this.myChart.setOption({
                tooltip: {
                    trigger: 'item',
                    formatter: "{a} <br/>{b}: {c} ({d}%)"
                },
                legend: {
                    orient: 'vertical',
                    x: 'left',
                    data:[
                        this.danxuanValue,
                        this.duoxuanValue,
                        this.tiankongValue,
                        this.fenxiValue
                        ]
                },
                series: [
                    {
                        name:'访问来源',
                        type:'pie',
                        radius: ['50%', '70%'],
                        avoidLabelOverlap: false,
                        label: {
                            normal: {
                                show: false,
                                position: 'center'
                            },
                            emphasis: {
                                show: true,
                                textStyle: {
                                    fontSize: '30',
                                    fontWeight: 'bold'
                                }
                            }
                        },
                        labelLine: {
                            normal: {
                                show: false
                            }
                        },
                        data:[
                            {value: this.danxuanLength , name: '单选题'},
                            {value: this.duoxuanLength, name: '多选题'},
                            {value: this.tiankongLength, name: '填空题'},
                            {value: this.fenxiLength, name: '分析题'}
                        ]
                    }
                ]
            })
        },
        getFeedback() {
            let adminShareId = this.$cookies.get("adminShareId")
            this.$axios.get('/admin/feedbackData', {
                parasm: {
                    adminShareId: adminShareId
                }
            })
            .then(res => {
                console.log(res)
            })
            .catch(err => {
                console.log(err)
            })
        }
    },
    created() {
        this.getShareInform()
        // this.getFeedback()
    },
    mounted() {

    }
}
</script>

<style>
.questionData {
    width: 400px;
    height: 400px;
    position: absolute;
    left: 40%;
    top: 20%;
}
.typeList {
    position: absolute;
    left: 40%;
    top: 20%;
}
.changeStatus {
    position: absolute;
    top: 60%;
}
</style>
