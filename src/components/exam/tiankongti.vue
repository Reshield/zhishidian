<template>
    <div>
        <div v-for="(item, index) in tkfills" :key="index">
            <div class="tkDiv">
                <div :id="index + 'item'" :class="item.divClass" @click="itemInput(item)" v-show="item.showDiv">{{ item.value }}</div>
                <transition name="input">
                    <el-input 
                      :id="index + 'input'" 
                      size="mini" 
                      v-model="answer" 
                      v-if="item.showInput" 
                      v-on:input="editAnswer(index)"
                      style="width: 100px; float: left;"
                      ></el-input>
                </transition>
            </div>
        </div>
    </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
    name: 'tiankongti',
    data() {
        return {
            tkfills: [],
            // propFills: this.question,
            answer: '',
            myAnswers:[],
            page: null,
        }
    },
    props: ["question"],
    methods: {
        ...mapActions(["setTkAnswer"]),
        setQuestion(question) {
            this.page = question.page
            let beforeFills = question.fills
            for(let i in beforeFills) {
                beforeFills[i].showDiv = true
                beforeFills[i].showInput = false
                beforeFills[i].divClass = 'tkItem'
                if(beforeFills[i].ifAnswer == 1) {
                    beforeFills[i].value = "_________"
                    beforeFills[i].divClass = "tkItem"
                }
            }
            this.tkfills = beforeFills
        },
        itemInput(item) {
            if(item.ifAnswer == 1) {
                let id = item.id
                let tk = this.tkfills[id]
                tk.showDiv = false
                tk.showInput = true
                tk.divClass = 'tkHidden'
                this.$set(this.tkfills, id, tk)
            }
        },
        editAnswer(index) {
            let inputId = String(index) + 'input'
            let inputItem = document.getElementById(inputId)
            let oneAnswer = {}
            oneAnswer.id = index
            oneAnswer.value = this.answer
            inputItem.onblur = ()=>{
                let tk = this.tkfills[index]
                tk.value = this.answer
                tk.showDiv = true
                tk.showInput = false
                tk.divClass = 'tkResult'
                this.$set(this.tkfills, index, tk)//用于让答案处显示用户输入的答案
                this.myAnswers.push(oneAnswer)
                let tkAnswer = {}
                tkAnswer.index = index
                tkAnswer.page = this.page
                tkAnswer.id = oneAnswer.id
                tkAnswer.answer = oneAnswer.value
                this.setTkAnswer(tkAnswer)
                this.answer = ''
            }
        },
    },
    computed: {
        propFills() {
            let propFills = this.question
            return propFills
        }
    },
    created() {
        this.setQuestion(this.propFills)
    },
}
</script>

<style>
.tkItem {
    float: left;
    height: 30px;
    width: auto;
    padding: 5px;
}
.tkHidden {
    display: none;
}
.tkResult {
    float: left;
    height: 30px;
    width: auto;
    color: blue;
    padding: 5px 5px 0px 5px;
    border-bottom: 1px solid;
}
.input-enter-active {
  animation: bounce-in .5s;
}
@keyframes bounce-in {
    0% {
        transform: scale(0);
    }
    50% {
        transform: scale(1.2);
    }
    100% {
        transform: scale(1);
    }
}
</style>
