<template>
  <div>
      <div class="question">
          <div>{{ myquestion }}</div>
      </div>
      <van-cell-group>
          <van-cell>
            <div v-for="(item,index) in items" :key="index">
                <div class="jianxi">
                    <div :class="classA ? 'active' : 'noactive'" :id="index" ref="index" @click="changecolor(index)">
                        <span style="font-size:20px;position:relative;top:20%;">{{item.code}}</span>
                    </div>
                    <label class="optionValue">{{item.value}}</label>
                </div>
            </div>
          </van-cell>
          <van-cell>
            <van-button class="vantbutton" @click="submit()"><span style="font-weight:bold;font-size:20px">提交</span></van-button>
          </van-cell>
      </van-cell-group>
      <div class="line"></div>
      <div class="right">
          <van-icon name="checked" :class="classB ? 'checked' : 'noChecked'" color="#00ba8a" size="36px" ref="checked"/>
          <van-icon name="clear" :class="classC ? 'clear' : 'noClear'" color="#dc8e9d" size="36px" ref="clear"/>
      </div>
  </div>
</template>
<script>
export default {
  name: 'duoxuanti',
  data (){
        return{
            myquestion: null,
            items:[
                {
                    id:0,
                    code:`A`,
                    right:null,
                    value: `选项1`
                },
                {
                    id:1,
                    code:`B`,
                    right:null,
                    value: `选项2`
                },
                {
                    id:2,
                    code:`C`,
                    right:null,
                    value: `选项3`
                },
                {
                    id:3,
                    code:`D`,
                    right:null,
                    value: `选项4`
                }
            ],
            classA : ``,
            classB : null,
            classC : null,
            answer:[],
            theRight:[]
            
        }
    },
    props: ["question"],
    methods:{
        changecolor(index){
            let option = this.items[index].value;
            let answerIndex = this.answer.indexOf(option);
            if(answerIndex>=0){
                this.answer.splice(answerIndex,1);
                this.$refs.index[index].className = `noactive`;
            }
            else{
                this.answer.push(option);
                this.$refs.index[index].className = `active`;
            }
        },
        getQuestion(question) {
            this.myquestion = question.question
            for(let i in question.options) {
                this.items[i].value = question.options[i].message
                this.items[i].right = question.options[i].ifRight
                if(this.items[i].right != null) {
                    this.theRight.push(this.items[i].value)
                }
            }
        },
        submit() {
            let count = 0;
            if(this.answer.length != this.theRight.length){
                console.log(`wrong in answer length`)
                this.classC = true;
                this.classB = false
            }
            else{
                for(let i=0;i<this.theRight.length;i++){
                    for(let j=0;j<this.answer.length;j++){
                        if(this.theRight[i] == this.answer[j]){
                            count++;
                        }
                    }
                }
                if(count != this.theRight.length){
                    console.log(`wrong in answer value`)
                    this.classC = true;
                    this.classB = false
                }else{
                    console.log(`right`)
                    this.classB = true;
                    this.classC = false;
                }
            }
        }
    },
    created() {
        if(this.question != null || this.question || undefined){
            let question = this.question
            this.getQuestion(question)
        }
    }
}
</script>
<style>
.noactive{
    left: 30px;
    top: 20px;
    width: 45px;
    height:45px;
    border-radius: 25px;
    position: relative;
    background-color: #C0C0C0;
    text-align: center;
    float: left;
}
.active{
    left: 30px;
    top: 20px;
    width: 45px;
    height:45px;
    border-radius: 25px;
    position: relative;
    background-color: #00ba8a;
    color: snow;
    text-align: center;
    float: left;
}
.line{
    background-color: #BEBEBE;
    height: 10px;
    width: 100%;
    position: relative;
}
.checked{
    position: absolute;
    left: 10px;
}
.noChecked{
    position: absolute;
    left: 10px;
    display: none;
}
.clear{
    position: absolute;
    left: 10px;
}
.noClear{
    position: absolute;
    left: 10px;
    display: none;
}
.jianxi{
    height: 80px;
}
.question{
    padding: 50px;
    background-color: #F8F8FF;
}
.optionValue{
    position: relative;
    left: 50px;
    top: 32px;
}
.vantbutton{
    position:relative;
    left:10%;
    width:80%;
    background:#00ba8a;
    color:snow;
}
</style>

