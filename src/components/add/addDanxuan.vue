<template>
  <div>
      <van-nav-bar 
        :title="title" 
        left-text="返回" 
        right-text="" 
        left-arrow 
        @click-left="onClickLeft"
      />
        <van-cell-group>
            <van-field v-model="question" type="textarea" placeholder="请输入题目" rows="1" autosize/>
        </van-cell-group>
        <div style="width:100%;height:15px;backgroundColor:#DCDCDC"></div>
        <div class="options" v-for="(item,index) in optionList" :key="index">
            <van-cell-group >
                <van-cell>
                    <div class="optionList">
                        <span style="color:#7A8B8B" >{{ item.value }}</span>
                        <span :id="item.value">您输入的题目:</span>
                        <img :src="reduceImg" alt="删除选项的图标" class="reduceImg" @click="reduceOption(index)"/>
                        <van-icon 
                          name="edit" 
                          size="22px" 
                          class="openEdit" 
                          @click="editOption(item.value, item.id)"
                        >
                        </van-icon>
                        <img :id="item.id" :src="rightImg" alt="正确选项的图标" class="rightImg"/>
                    </div>
                </van-cell>
            </van-cell-group>
        </div>
        <van-popup style="width:90%" v-model="showPopup">
            <van-cell-group>
                <van-cell>
                    <span style="fontSize:16px;color:#000000;">选项内容：</span>
                </van-cell>
                <van-cell>
                    <van-field v-model="message" type="textarea" placeholder="请输入选项" rows="1" autosize/>
                </van-cell>
                <van-cell>
                    <span style="fontSize:16px;color:#000000;">是否正确答案：</span>
                    <van-radio-group v-model="radio">
                        <van-radio name="1">正确答案</van-radio>
                        <van-radio name="2">错误答案</van-radio>
                    </van-radio-group>
                </van-cell>
                <van-cell>
                    <van-button size="large" @click="submitOption()">完成</van-button>
                    <van-button size="large" @click="cancel()">取消</van-button>
                </van-cell>
            </van-cell-group>
        </van-popup>
        <div class="addOption" @click="addOption">
            <img :src="addImg" alt="添加选项的图标" class="addImg"/>
            <span class="addTxt">添加选项</span>
        </div>
        <div class="addTips" @click="addTips">
            <img :src="addTipsImg" alt="添加选项的图标" class="addTipsImg"/>
            <span class="addTipsTxt">添加提示</span>
        </div>
        <van-tabbar :fixed="true" style="backgroundColor:#00ba9a;">
            <div style="width:100%;align-self: center;-webkit-align-self: center;" @click="Dialog">
                <span style="color:#FFFAFA;font-size:20px;" >提交题目</span>
            </div>
        </van-tabbar>
        <van-dialog v-model="showDialog" show-cancel-button :before-close="beforeClose">
            <p>一共设置了<span style="color:#F08080">{{ optionCount }}</span>个选项</p>
            <p>是否提交？</p>
        </van-dialog>
        <van-popup 
          v-model="showAddTips" 
          position="bottom"
          class="showAddTips"
        >
            <div class="newTipList">
                <van-cell-group
                v-for="(item, index) in newTips"
                :key="index"
                >
                    <van-cell>
                        <div class="tipsItem">{{ index + 1 }}</div>
                        <el-input 
                          type="textarea" 
                          autosize v-model="tip" 
                          class="newTipInput" 
                          :id="index + 1 + 'input'" 
                        >
                        </el-input>
                        <div class="coverTip" @click="updateTip(index + 1)" :id="index + 1 + 'cover'"></div>
                    </van-cell>
                </van-cell-group>
            </div>
            <div class="tipButtonDiv">
                <van-button @click="addNewTips" size="normal" class="tipButton">添加提示</van-button>
                <van-button @click="submitTips"  size="normal" class="tipButton">确认提交</van-button>
            </div>
        </van-popup>
  </div>
</template>
<script>
export default {
    name: 'addDanxuan',
    data() {
        return{
            title: `录入单选`,
            question: ``,
            optionList: [
                {id: 1, value:`选项`+1+'：'},
                {id: 2, value:`选项`+2+'：'},
                {id: 3, value:`选项`+3+'：'},
                {id: 4, value:`选项`+4+'：'},
            ],
            showPopup: false,
            showAddTips: false,
            itemValue: ``,
            itemId: null,
            showDialog: false,
            message: ``,
            addImg: require('@/assets/img/addOption.png'),
            addTipsImg: require('@/assets/img/addTipsImg.png'),
            newTipsImg: require('@/assets/img/addTipsImg.png'),
            reduceImg: require('@/assets/img/reduceOption.png'),
            rightImg: require('@/assets/img/rightOption.png'),
            radio: null,
            submitOptions: [],
            optionCount: null,
            submitQuestion: {},
            rpRight: 0,
            newTips:[
                {id: 1, tip: ''}
            ],
            tips: [],
            tip: ''
        }
    },
    methods: {
        onClickLeft() {
            this.$cookies.set("class", null)
            this.showDialog = false,
            this.$router.push('/markclass')
        },
        addOption() {
            let addId = this.optionList.length + 1
            let addValue = `选项`+ addId + '：'
            let json = {};
            json.id = addId;
            json.value = addValue;
            this.optionList.push(json);
        },
        addTips() {
            this.showAddTips = true
        },
        addNewTips() {
            let i = this.newTips.length
            console.log(i)
            let coverID = String(i) + 'cover'
            let showCover = document.getElementById(coverID)
            showCover.innerText = this.tip
            showCover.style.display = 'inline'
            this.tip = ''
            console.log(this.newTips[i-1])
            this.newTips[i-1].id = i
            this.newTips[i-1].tip = showCover.innerText   
            let json = {}
            json.id = null
            json.tip = ''
            this.newTips.push(json)     
        },
        updateTip(index) {
            let coverID  = String(index) + 'cover'
            let inputID = String(index) + 'input'
            let coverDiv = document.getElementById(coverID)
            let input = document.getElementById(inputID)
            input.value = coverDiv.innerText
            coverDiv.style.display = 'none'
        },
        submitTips() {
            let i = this.newTips.length
            let inputID = String(i) + 'input'
            let input = document.getElementById(inputID)
            this.newTips[i-1].id = i
            this.newTips[i-1].tip = input.value
            console.log(this.newTips)
            this.showAddTips = false
        },
        reduceOption(index){
           
        },
        editOption(itemValue, itemId){
            this.showPopup = true
            this.itemValue = itemValue
            this.itemId = itemId
        },
        catchRight(message, radio) {
            var rpContent = 0
            for(let i in this.submitOptions) {
                let content = this.submitOptions[i].message
                let oldRight = this.submitOptions[i].ifRight
                if(content == message) {
                    rpContent ++
                }
                if(radio == 1 && oldRight == 1) {
                    this.rpRight = 1
                }
            }
            return rpContent
        },
        submitOption() {
            let radio = parseInt(this.radio);
            let message = this.message
            let catchRight = this.catchRight(message, radio)
            let rightOption = document.getElementById(this.itemId)
            if(catchRight > 0) {
                return this.$toast({
                    message:`选项重复！`
                })
            }
            if(this.rpRight == 1 && radio == 1) {
                return this.$toast({
                    message:`已经输入一个正确选项！`
                })
            }
            if(radio == 1) {
                this.saveOption(message, radio)
                rightOption.style.display = 'inline'
            }
            else {
                this.saveOption(message,radio)
            }
            this.showPopup = false
        },
        saveOption(message, radio) {
            let index = this.itemId - 1
            let optionSpan = document.getElementById(this.itemValue);
            let option = {}
            option.message = message
            option.ifRight = radio
            if(this.submitOptions[index] == '' || this.submitOptions[index] == null) {
                this.submitOptions.push(option)
            }
            else {
                this.submitOptions.splice(index,1,option)
            }
            optionSpan.innerText = option.message
            this.message = ``
            this.radio = null
        },
        cancel(itemValue) {
            this.message = ``;
            this.radio = null;
            this.showPopup = false;
            // let shadow = document.getElementById('shadow');
            // let item = document.getElementById(itemValue);
            // shadow.style.display = 'none';
            // item.style.display = 'none';
        },
        Dialog() {
            this.optionCount = this.optionList.length;
            if(this.question == null || this.question == ``){   
                console.log(Error(`没有题目`));
                return this.$toast({
                    message:`请输入题目！`
                })
            }
            else{
                this.showDialog = true;
            }

        },
        submitAll() {
            let userid = this.$cookies.get("user")._id
            console.log(typeof userid)
            this.submitQuestion.userid = userid
            this.submitQuestion.options = this.submitOptions
            this.submitQuestion.question = this.question
            this.submitQuestion.tips = this.newTips
            this.submitQuestion.class = this.$route.params.questionClass.class
            this.submitQuestion.subject = this.$route.params.questionClass.subject
            this.submitQuestion.type = this.$route.params.questionClass.type
            this.$axios.post('/add/submitDanxuan',{
                Danxuan: this.submitQuestion
            }).then(res=>{
                console.log(res)
                this.$toast('添加成功')
                return this.onClickLeft()
            }).catch(err=>{
                console.log(err)
                this.$toast('添加失败')
            })
        },
        beforeClose (action, done){
            if(action === `confirm`){
                setTimeout(this.submitAll());
            }
            else{
                done();
            }
        }
    },
    created() {
    },
}

</script>
<style>
.addOption{
    display: block;
    width: 120px;
    margin-left: 30px;
    float: left;
}
.addImg{
    width: 30px;
    height: 30px;
    float: left;
}
.addTxt{
    color: #00ba9a;
    position: relative;
    margin-top: 2px;
    margin-left: 10px;
    font-size: 18px;
    display: inline-block;
}
.addTipsTxt {
    color: #1E90FF;
    position: relative;
    margin-top: 2px;
    margin-left: 10px;
    font-size: 18px;
    display: inline-block;
}
.addTips {
    display: block;
    width: 120px;
    margin-left: 30px;
    float: left;
}
.addTipsImg {
    width: 30px;
    height: 30px;
    float: left;
}
.reduceImg{
    width: 22px;
    height: 22px;
    float: right;
    margin-right: 10px;
}
.rightImg{
    width: 22px;
    height: 22px;
    float: right;
    margin-right: 10px;
    display: none
}
.openEdit{
    float: right;
    display: block;
    margin-right: 20px;
}
.showAddTips {
    width: 100%;
    height: 80%;
    overflow-y: scroll;
}
.tipsItem {
    width: 30px;
    height: 30px;
    text-align: center;
    align-items: center;
    color: #ffffff;
    font-size: 18px;
    background-color: #87CEEB;
    box-shadow: 0px 0px 10px #F8F8FF;
    border-radius: 50px;
    float: left;
}
.newTipInput {
    width: 80%;
    margin-left: 10px;
    display: inline-block;
    z-index: 2
}
.coverTip {
    width: 90%;
    right: 0px;
    height: 100%;
    font-size: 16px;
    padding-right: -20px;
    background-color: 	#ffffff;
    position: absolute;
    display: none;
}
.newTipList {
    height: 85%;
}
.tipButtonDiv {
    background-color: 	#F8F8FF	;
    height: 20%;
}
.tipButton {
    border-radius: 8px;
    margin: 10px 20px;
    width: 30%;
    box-shadow: 0px 0px 20px #DCDCDC;
}
</style>
