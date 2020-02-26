<template>
    <div>
        <div class="headlineBK">
            <div class="headlineIntro">
                <div style="margin-left: 5%;">{{ headline }}</div>
            </div>
            <div class="summaryIntro">
                <div style="width:80%;margin-left: 10%;">题目简介:{{ summary }}</div>
            </div>
        </div>
        <div class="startDiv">
            <van-button class="startButton" @click="start" size="normal">开始答题</van-button>
        </div>
        <div class="questionIntro">
            <div class="listIntro">
                <van-cell>
                    <span style="color:	#838B8B">题目目录</span>
                </van-cell>
                <van-cell-group 
                v-for="(item,index) in list"
                :key="index"
                >
                    <van-cell>
                        <div style="font-weight: 600;font-size:14px">{{ item.question }}</div>
                        <div style="color:	#838B8B;font-size:14px">{{ item.type }}</div>
                    </van-cell>
                </van-cell-group>
            </div>
        </div>
    </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
    name: 'enterShare',
    data() {
        return {
            share: null,
            headline: '',
            summary: '',
            list:[],
        }
    },
    methods: {
        ...mapActions(["setQuestion"]),
        start() {
            if(this.list.length > 0) {
                this.$router.push({name: 'exercises', params: {share: this.share}})
            }
            else {
                return this.$toast({
                    message: '网络错误！'
                })
            }
        },
        getShare() {
            let shareId = this.$cookies.get("shareId")
            if(shareId != null || shareId != undefined) {
                this.$axios.get('/share/findById', {
                    params: {
                        shareId: shareId
                    }
                })
                .then(res => {
                    let share = res.data.share
                    this.share = share
                    this.headline = share.headline
                    this.summary = share.summary
                    this.list = share.questions
                })
                .catch(err => {
                    console.log(err)
                })
            }
            else {
                let share = this.$store.state.share
                this.headline = share.headline
                this.summary = share.summary
                this.list = share.questions
            }
        }
    },
    created() {
        this.getShare()
    },
}
</script>

<style>
.headlineBK {
    height: 200px;
    background-color: #836FFF
}
.headlineIntro {
    color: #ffffff;
    font-size: 22px;
    position: relative;
    top: 20px;
    width: 100%;
    text-align: left
}
.summaryIntro {
    color: #ffffff;
    font-size: 14px;
    position: relative;
    top: 35px;
    text-align: left;
    width: 100%;
}
.listIntro {
    position: relative;
    top: 20px;
}
.startDiv {
    background-color: #ffffff;
    width: 80%;
    height: 80px;
    box-shadow: 0px 0px 20px #6E7B8B;
    margin-left: 10%;
    margin-top: -40px;
    border-radius: 5px;
}
.startButton {
    background-color: #00FF7F;
    border: 0px;
    color: #ffffff;
    border-radius: 5px;
    font-weight: 600;
    font-size: 14px;
    position: relative;
    top: 18px;
    width: 90%;
}
.commentButton {
    position: absolute;
    top: 50%;
    right: 10%;
    border-radius: 50px;
    box-shadow: 0px 0px 20px #6E7B8B;
    width: 50px;
    height: 50px;
    background-color: #00FF7F;
    z-index: 2;
    background-image: url('./../../assets/img/comment.png');
    background-repeat: no-repeat;
    background-size: 100% 100%;
}
</style>
