<template>
    <div>
        <van-nav-bar
        :title="title"
        left-text="返回"
        right-text=""
        left-arrow
        @click-left="onClickLeft"
        />
        <div>
            <van-swipe 
            @change="onChange" 
            class="examHome" 
            :loop="false"
            >
                <van-swipe-item v-for="(item,index) in danxuan" class="examSwipe" :key="index">
                    <danxuanti class="examChildren" :question="item"></danxuanti>
                </van-swipe-item>
                <van-swipe-item v-for="(item,index) in tiankong" class="examSwipe" :key="index + 'tk'">
                    <tiankongti :question="item"></tiankongti>
                </van-swipe-item>
                <van-swipe-item>
                    <div class="scoreDiv">
                        <div style="width: 100%;text-align: left; margin-top: 20px; margin-left: 10px;">
                            <div>
                                全部题目： {{ allText }}
                            </div>
                        </div>
                        <div style="width: 100%;text-align: left; margin-top: 20px; margin-left: 10px;">
                            <div>
                                已完成题目： {{ haveDone }}
                            </div>
                        </div>
                        <div style="width: 100%;text-align: left; margin-top: 20px; margin-left: 10px;">
                            <div>
                                未完成题目： {{ notYet }}
                            </div>
                        </div>
                            <div class="cicleDiv">
                                <div class="scoreText">成绩：</div>
                                <van-circle
                                v-model="currentRate"
                                :rate="rate"
                                :speed="50"
                                :text="text"
                                :stroke-width="60"
                                layer-color="#9C9C9C"
                                color="#8EE5EE"
                                class="vanCicle"
                                />
                            </div>
                        </div>
                    <van-button @click="computeScore" class="computeScore">提交</van-button>
                </van-swipe-item>
            </van-swipe>
        </div>
        <van-button class="wrong" @click="addWrong">错</van-button>
        <van-button class="showTips" @click="showTips"></van-button>
        <div class="loadingDiv" v-show="showLoading">
            <van-loading color="white" size="100px" class="loading"/>
        </div>
        <van-popup 
        v-model="showPopup"
        position="bottom"
        >
            <div style="color: 	#CD5C5C; height: 100px; padding-top: 20px;" v-if="showNoTip">此题目没有添加提示！</div>
            <van-cell-group  v-for="(item,index) in  tips" :key="index">
                <transition name="tip">
                    <van-cell>
                        <div class="tipCode">{{ item.id }}</div>
                        <span class="tipSpan">{{ item.tip }}</span>
                        <img :id="index+'nextTip'" :src="arrow" alt="arrow.png" class="nextTipImg" @click="nextTip(index)">
                    </van-cell>
                </transition>
            </van-cell-group>
        </van-popup>
    </div>
</template>
<script>
import danxuanti from '@/components/exam/danxuanti'
import tiankongti from '@/components/exam/tiankongti'
import arrow from '@/assets/img/arrow.png'
import arrow_2 from '@/assets/img/arrow-2.png'
import { mapState } from 'vuex'
export default {
    name: 'exercises',
    data (){
        return{
            title:'',
            danxuan: [],
            tiankong: [],
            tiankongAnswers: [],
            showLoading: true,
            code: 0,
            page: 0,
            currentRate: 0,
            rate: 0,
            showPopup: false,
            arrow: arrow,
            showTip:0,
            tips:[],
            haveSubmit: 0,
            allText: null,
            haveDone: null,
            notYet: null,
            showNoTip: false,
            danxuanPage: 0,
            tiankongPage: 0
        }
    },
    components: {
        danxuanti,
        tiankongti
    },
    methods: {
        onClickLeft() {
            this.code --
            if (this.code = 1) {
                this.onChange(3)
            }
            this.$router.go(-1)
            this.$cookies.set("class", null)
            this.$store.dispatch("clearAnswer")
        },
        onChange(index) {
            this.tips = []
            this.page = index
            if(index == 1) {
                let page = this.danxuan.length
                for(let i in this.tiankong) {
                    let oneTiankong = this.tiankong[i]
                    oneTiankong.page = page
                    this.$set(this.tiankong, i, oneTiankong)
                }
            }
        },
        getByShare() {
            this.$axios.get('/share/findById', {
                params: {
                    shareId: this.$cookies.get("shareId")
                }
            })
            .then(res => {
                let questions = res.data.share.questions
                for(let i in questions) {
                    questions[i].page = parseInt(i)
                    if(questions[i].type == "单选题") {
                        this.setDanxuan(questions[i])
                    }
                    if(questions[i].type == "填空题") {
                        this.setTiankong(questions[i])
                    }
                }
            })
            .catch(err => {
                console.log(err)
            })
        },
        getByClass() {
            let userid = this.$cookies.get("user")._id
            let cookieClass = this.$cookies.get("class")
            let grade = cookieClass.class
            let subject = cookieClass.subject
            this.$axios.get('/question/findByclassNId',{
                params: {
                    userid: userid,
                    grade: grade,
                    subject: subject
                }
            })
            .then(res => {
                let questions = res.data.question
                for(let i in questions) {
                    if(questions[i].type == "单选题") {
                        this.setDanxuan(questions[i])
                    }
                    if(questions[i].type == "填空题") {
                        this.setTiankong(questions[i])
                    }
                }
            })
            .catch(err => {
                console.log(err)
            })
        },
        setDanxuan(question) {
            question.page = this.danxuanPage
            this.danxuan.push(question)
            this.danxuanPage ++
        },
        setTiankong(question) {
            question.page = this.tiankongPage
            for(let i in question.fills) {
                if(question.fills[i].ifAnswer == 1) {
                    question.fills[i].label = String(question.page) + String(question.fills[i].id)
                    this.tiankongAnswers.push(question.fills[i])
                }
            }
            this.tiankong.push(question)
            this.tiankongPage ++
        },
        showTips() {
            let page = this.page
            if(this.danxuan[page].tips.length == 0) {
                this.showNoTip = true
                this.showPopup = true
            }
            else {
                this.showNoTip = false
                if(this.haveSubmit == 0) {
                    let tip = this.danxuan[page].tips[this.showTip]
                    this.tips.push(tip)
                }
                else {
                    for(let i in this.danxuan[page].tips) {
                        this.tips[i] = this.danxuan[page].tips[i]
                    }
                }
                this.showPopup = true
            }
        },
        nextTip(index) {
            let page = this.page
            let nextId = String(index) + 'nextTip'
            let nextTip = document.getElementById(nextId)
            nextTip.src = arrow_2
            this.showTip += 1
            if(this.showTip == this.danxuan[page].tips.length) {
                this.$toast({
                    message: '已经是最后一个提示了！'
                })
            }
            else if(this.tips.length == this.danxuan[page].tips.length){
                this.$toast({
                    message: '已经显示所有提示'
                })
            }
            else {
                this.tips.push(this.danxuan[page].tips[this.showTip])
            }
        },
        addWrong() {
            let index = this.page
            let userid = this.$cookies.get("user")._id
            this.$axios.post('/user/saveWrong', {
                userid: userid,
                wrongId: this.danxuan[index]._id
            })
            .then(res => {
                this.$toast({
                    message: res.data.message
                })
            })
            .catch(err => {
                console.log(err)
            })
        },
        computeScore() {
            this.haveSubmit = 1
            let answerArray = this.$store.state.answerArray
            let tkArray = this.$store.state.tkAnswer
            function compare(property) {
                return function (a, b) {
                    var value1 = a[property];
                    var value2 = b[property];
                    return value1 - value2;
                }
            }
            let Array = answerArray.sort(compare("page"))
            let count = 0
            for(let i in Array) {
                if(Array[i].ifRight != null) {
                    count ++
                }
                else {
                    count
                }
            }
            count = count + tkArray.length
            let allLength = this.danxuan.length + this.tiankong.length
            let ratio = count/allLength
            let score = 100 * ratio
            this.rate = score
            this.allText = allLength
            this.haveDone = this.danxuan.length + this.tiankong.length
            this.notYet = allLength - this.haveDone
        },
        async openLoading() {
            await setTimeout(() => {
                this.showLoading = false
            },1000)
        }
    },
    computed: {
        ...mapState(["questionClass","questions","answerArray","tkAnswer"]),
        text() {
            let rate = String(this.currentRate)
            return rate
        },
    },
    created() {
        if(this.$cookies.get("class") != 'null' && this.$cookies.get("class") != null) {
            this.getByClass()
        }
        if(this.$cookies.get("shareId") != 'null' && this.$cookies.get("shareId") != null) {
            this.getByShare()
        }
        this.openLoading()
    },
    mounted() {
        setTimeout(() => {
            this.code += 2
        },1000)
    },
}
</script>
<style>
.examHome{
    height: 620px;
    overflow-y: scroll
}
.examChildren {
    height: 600px;
    overflow-y: scroll
}
.loadingDiv {
    position: absolute;
    z-index: 2;
    left: 0;
    right: 0;
    top: 30%;
    text-align: center;
    margin: 0 auto;
    width: 150px;
    height: 150px;
    background-color: rgba(105, 105, 105, 0.5);
    border-radius: 8px;
}
.loading {
    margin:0 auto;
    top: 15%;
}
.computeScore {
    width: 60%;
    background-color: #4169E1;
    color: #ffffff;
    font-size: 16px;
    box-shadow: 0px 0px 20px #6E7B8B;
    z-index: 2;
    margin-top: 150px;
}
.cicleDiv {
    position: relative;
    margin-top: -30%;
    left: 30%;
}
.vanCicle {
    position: relative;
}
.scoreDiv {
    padding-top: 20px;
    padding-bottom: 30px;
    width: 100%;
    background-color: #F5F5F5;
}
.allText {
    float: left;
}
.wrong {
    position: absolute;
    bottom: 5%;
    right: 10%;
    color: #ffffff;
    font-size: 18px;
    width: 50px;
    height: 50px;
    border-radius: 50px;
    background-color: #FF7F50;
}
.showTips {
    position: absolute;
    bottom: 5%;
    right: 25%;
    color: #ffffff;
    font-size: 18px;
    width: 50px;
    height: 50px;
    border-radius: 50px;
    background-color: #00BFFF;
    background-image: url('./../../assets/img/bulb.png');
    background-position: center;
    background-repeat:no-repeat; 
    background-size: 80% 80%;
    -moz-background-size: 80% 80%;
}
.tipCode {
    float: left;
    width: 30px;
    height: 30px;
    border-radius: 50px;
    color: #ffffff;
    font-size: 16px;
    text-align: center;
    background-color: #00BFFF;
}
.nextTipImg {
    width: 30px;
    height: 30px;
    float: right
}
.tipSpan {
    float: left;
    font-size: 16px;
    margin-left: 10px;
}
.tip-enter-active {
    animation: slide .5s
}
.tip-leave-active {
    animation: slide .5s reverse;
}
@keyframes slide {
    0% {
        margin-top:30px;
        opacity: 0;
    }
    100% {
        margin-top:0px;
        opacity: 1;
    }
}
</style>

