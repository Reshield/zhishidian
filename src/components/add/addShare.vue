<template>
    <div class="shareBody">
        <van-nav-bar
          :title="title"
          left-text="返回"
          right-text=""
          left-arrow
          @click-left="onClickLeft"
        />
        <div class="summary">
            <van-cell-group>
                <van-cell>
                    <span>标题</span>
                </van-cell>
                <van-cell>
                    <van-field type="text" v-model="headline" placeholder="名字......"></van-field>
                </van-cell>
                <van-cell>
                    <span>题目简介</span>
                </van-cell>
                <van-cell>
                    <van-field type="textarea" v-model="summary" placeholder="简介......"></van-field>
                </van-cell>
                <van-cell>
                    <div style="width:100%;text-align:center">
                        <van-button size="normal" @click="toQuestion" class="shareAddquestion">选择已有题目</van-button>
                    </div>
                </van-cell>
            </van-cell-group>
        </div>
        <van-button size="normal" @click="inputNew()" style="width:80%">输入新的类别</van-button>
        <van-cell-group>
                    <van-cell
                      class="myListCell"
                      v-for="(item, index) in list"
                      clickable
                      :key="index"
                      :title="`题目：${item.question}`"
                      :label="`${item.class}-${item.subject}-${item.type}`"
                      @click="toggle(index)"
                    >
                    </van-cell>
        </van-cell-group>
        <van-button size="normal" @click="shareSubmit" class="shareSubmit">发布</van-button>
        <van-popup style="width:90%" v-model="showPopup">
            <van-cell-group>
                <van-cell>
                    <span>类别名称</span>
                    <van-field type="text" v-model="newClassName"></van-field>
                </van-cell>
                <van-cell>
                    <van-button size="large" @click="newClass()">完成</van-button>
                    <van-button size="large" @click="cancel()">取消</van-button>
                </van-cell>
            </van-cell-group>
        </van-popup>
    </div>
</template>
<script>
export default {
    name: 'addShare',
    data() {
        return {
            title: '题目分享',
            headline: '',
            summary: ``,
            showPopup: false,
            newClassName: null,
            list: []
        }
    },
    methods: {
        onClickLeft() {
            this.$router.push('/home/list')
        },
        toQuestion() {
            if(this.headline != '') {
                this.$router.push({name: 'userQuestion', 
                    params: {
                        headline: this.headline,
                        summary: this.summary
                    }
                })
            }
            else{
                this.$router.push('/userQuestion')
            }
        },
        getList() {
            if(this.$route.params != null || this.$route.params != undefined) {
                this.list = this.$route.params.list
                this.headline = this.$route.params.headline
                this.summary = this.$route.params.summary
            }
        },
        shareSubmit() {
            if(this.headline == '' || this.headline == null) {
                this.$toast({
                    message: '给个标题不过分吧',
                    duration: 1000
                })
            }
            else {
                let userid = this.$cookies.get("user")._id
                let grade = this.$route.params.grade
                let subject = this.$route.params.subject
                this.$axios.post('/share/shareById', {
                    userid: userid,
                    headline: this.headline,
                    summary: this.summary,
                    questions: this.list,
                    grade: grade,
                    subject: subject
                })
                .then(res => {
                    this.$toast({
                        message: res.data.message,
                        duration: 1000
                    })
                    this.headline = ''
                    this.summary = ''
                    this.list = []
                    return this.onClickLeft()
                })
                .catch(err => {
                    console.log(err)
                })
            }
            
        },
        inputNew () {
            this.showPopup = true
        },
        newClass () {
            this.showPopup = false
        },
        cancel () {
            this.showPopup = false
        },
    },
    created() {
        this.getList()
    },
}
</script>
<style>
.shareBody {
    background-color: 	#F8F8FF;
}
.summary {
    margin-top: 10px;
}
.textarea {
    width: 100%;
}
.titleClass {
    margin-left: -275px;
}
.shareAddquestion {
    width: 40%;
    margin: 0 10px;
}
.shareSubmit {
    background-color: #4169E1;
    position: absolute;
    bottom: 5%;
    left: 25%;
    color: #ffffff;
    font-size: 16px;
    font-weight: 500;
    width: 50%;
    border-radius: 8px;
}
.myListCell {
    width: 100%;
    text-align: left;
}
</style>