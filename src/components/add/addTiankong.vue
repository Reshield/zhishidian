<template>
  <div>
      <van-nav-bar
        :title="title"
        left-text="返回"
        right-text=""
        left-arrow
        @click-left="onClickLeft"
        />
        <div id="inputArea"  class="inputArea">
            <div class="createInput" v-for="(item,index) in myInput" :key="index">
                <transition name="myinput">
                    <input :id="index" class="input" v-on:input="editSome(index)">
                </transition>
            </div>
        </div>
        <div class="buttonArea">
            <van-button @click="addstem" class="addstem">添加问题</van-button>
            <van-button @click="addquestion" class="addquestion">添加答案</van-button>
            <van-button @click="showMyInput" class="submitAll">提交题目</van-button>
        </div>
        <van-dialog
        v-model="showDialog"
        show-cancel-button
        :before-close="beforeClose"
        :closeOnClickOverlay="false"
        :showConfirmButton="false"
        :showCancelButton="false"
        >
            <p style="color: #63B8FF">您的题目</p>
            <div v-for="(item,index) in myInput" :key="index">
                {{item.value}}
            </div>
            <van-button @click="quit">取消</van-button>
            <van-button @click="submit">确认</van-button>
        </van-dialog>
  </div>
</template>
<script>
export default {
    name: `addTiankong`,
    data() {
        return {
            title:`录入填空题`,
            myInput:[
                
            ],
            tips: null,
            showDialog: false,
            questions: [],
            showInput: false
        }
    },
    methods: {
        onClickLeft() {
            this.$cookies.set("class", null)
            this.$router.go(-1);
        },
        quit() {
            this.showDialog = false
        },
        submit() {
            let userid = this.$cookies.get("user")._id
            let fillClass = this.$cookies.get("class")
            let grade = fillClass.class
            let subject = fillClass.subject
            let type = fillClass.type
            this.$axios.post('/add/tiankong', {
                userid: userid,
                grade: grade,
                subject: subject,
                type: type,
                tips: this.tips,
                fills: this.myInput
            })
            .then(res => {
                this.$toast({
                    message: res.data.message
                },100)
                this.showDialog = false
            })
            .catch(err => {
                console.log(err)
            })
        },
        addstem() {
            let len = this.myInput.length;
            let lenString = String(len);
            let inputStem = {};
            inputStem.id = len;
            inputStem.value = ``;
            inputStem.ifAnswer = 0;
            this.myInput.push(inputStem)    //在myinput中创建一个新对象，页面中才能渲染出一个新的input
            this.$nextTick(()=>{            //nextTick的作用是data更新后才操作DOM
                let label = document.getElementById(lenString);
                label.style.borderColor = `#D3D3D3`
                label.placeholder = `请输入问题`
            })
        },
        addquestion() {
            let len = this.myInput.length;
            let lenString = String(len);
            let inputQuestion = {};
            inputQuestion.id = len;
            inputQuestion.value = ``;
            inputQuestion.ifAnswer = 1;
            this.myInput.push(inputQuestion);
            this.placeholder = `请输入答案`;

            this.$nextTick(()=>{
                let label = document.getElementById(lenString);
                label.style.borderColor = `#5CACEE`;
                label.placeholder = `请输入答案`
            })
        },
        editSome(index) {
            let lenString = String(index);
            let label = document.getElementById(lenString);
            let arr = this.myInput[index]
            label.onblur = ()=>{
                arr.value = label.value;
                this.questions.push(arr)
            }
        },
        showMyInput() {
            this.showDialog= true;
        },
        beforeClose (action, done){
            if(action === `confirm`){
                setTimeout(done, 1000);
            }
            else{
                done();
            }
        }
    },
}
</script>
<style>
.buttonArea{
    position: fixed;
    bottom: 0px;
    width: 100%;
    height: 20%;
    align-self:center;
    border-top-style:outset
}
.addstem{
    width: 30%;
    border-radius:8px;
    font-size: 14px;
    margin-right:4%;
    margin-top:3%;
    box-shadow: 0px 0px 20px #6E7B8B;
}
.addquestion{
    width: 30%;
    border-radius:8px;
    font-size: 14px;
    margin-left:4%;
    margin-top:3%;
    box-shadow: 0px 0px 20px #6E7B8B;
}
.submitAll{
    border-radius:10px;
    position: relative;
    width: 70%;
    background-color: #4169E1;
    box-shadow: 0px 0px 20px #6E7B8B;
    margin-top: 3%;
    color: #FFFAFA;
    font-size: 20px;
}
.input{
    float:left;
    border:2px solid #DCDCDC;
    height: 22px;
    width: 45%;
    border-radius:5px;
}
.inputArea{
    padding-left: 5%;
}
.myinput-enter-active {
  animation: slide .5s
}
.myinput-leave-active {
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
