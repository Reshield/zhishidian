<template>
    <div>
        <div class="bk">
            <div class="data">
                <van-row type="flex" justify="center">
                    <div class="countdiv">
                        <span class="count">{{addCount}}</span>
                    </div>
                    <div class="countdiv">
                        <span class="count">{{todaydid}}</span>
                        <span style="color:#FFFAFA">/</span>
                        <span class="ltcount">{{todayall}}</span>
                    </div>
                </van-row>
                <van-row type="flex" justify="center">
                    <span class="explain">录入题量</span>
                    <span class="explain">今日已刷</span>
                </van-row>
            </div>
        </div>
        <van-button class="plan" @click="toexe"><span style="font-weight:bold;font-size:20px">开始答题</span></van-button>
        <van-button class="plan2" @click="toWrong"><span style="font-weight:bold;font-size:20px">复习错题</span></van-button>
        <van-button class="plan2" @click="tomark"><span style="font-weight:bold;font-size:20px">录入新题</span></van-button>
    </div>
</template>

<script>
export default {
    name: 'home',
    data() {
        return {
            addCount: 1,
            did: 2,
            allCount: 3,
            todaydid: 4,
            todayall: 5,
        }
    },
    methods:{
        toexe (){
            this.$router.push('/examClass')
        },
        tomark (){
            this.$router.push('/markclass')
            },
        toWrong (){
            this.$axios.get('/login').then(res=>{
                console.log(res)
            }).catch(err=>{
                console.log(err)
            })
        },
        //获取题目录入的题目数量
        getCount() {
            let userid = this.$cookies.get("user")._id
            this.$axios.get('/question/findByUserId', {
                params: {
                    userid: userid
                }
            })
            .then(res => {
                let question = res.data.question
                this.addCount = question.length
            })
            .catch(err => {
                console.log(err)
            })
        }
    },
    created() {
        if(localStorage.Flag != null || localStorage.Flag != undefined) {
            this.getCount()
        }
        else {
            return 
        }
    },
}
</script>

<style>
.hello{
  height: 100%;
}
.bk{
  height: 250px;
  background-color: #4169E1;
}
.count{
  font-size: 30px;
  color: #FFFAFA;
  font-weight: 600;
}
.countdiv{
  width: 130px;
  position: relative;
  top: 30px;
}
.data{
  position: absolute;
  margin-top: 180px;
  margin-left: 10%;
  width: 80%;
  height: 120px;
  border-radius:15px;
  background-color: #6A5ACD;
}
.explain{
  position: relative;
  top: 35px;
  color: #FFFAFA;
  font-size: 15px;
  width: 130px;
}
.ltcount{
  font-size: 14px;
  color: #FFFAFA;
  font-weight: 200;
}
.imgIcon{
  height: 30px;
}
.plan{
  margin-top:80px;
  width: 80%;
  height: 70px;
  border-radius:20px;
  box-shadow: 0px 5px 10px #DCDCDC;
}
.plan2{
  margin-top:30px;
  width: 80%;
  height: 70px;
  border-radius:20px;
  box-shadow: 0px 5px 10px #DCDCDC;
}
</style>
