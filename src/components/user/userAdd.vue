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
            <van-cell>
                <van-collapse v-model="activeNames">
                    <van-collapse-item name="1">
                        <div slot="title">选择类别<van-icon name="question-o" /></div>
                        <van-tree-select
                            :items="items"
                            :main-active-index="mainActiveIndex"
                            :active-id="activeId"
                            @navclick="onNavClick"
                            @itemclick="onItemClick"
                        />
                    </van-collapse-item>
                </van-collapse>
            </van-cell>
        </van-cell-group>
        <div class="myList">
                <van-cell-group>
                    <van-cell
                      v-for="(item, index) in list"
                      clickable
                      :key="index"
                      :title="`题目：${item.question}`"
                      :label="`${item.class}-${item.subject}-${item.type}`"
                      @click="toggle(index)"
                      class="myListCell"
                    >
                    </van-cell>
                </van-cell-group>
        </div>
        <van-button size="normal" @click="listSubmit" round class="ListSubmit">完成</van-button>
    </div>
</template>

<script>
export default {
    name: 'userQuestion',
    data() {
        return {
            title: '我的题目',
            activeNames: ['1'],
            items:[],
            // 左侧高亮元素的index
            mainActiveIndex: 0,
            // 被选中元素的id
            activeId: 1,
            list: [],
            result: [],
            grade: '小学',
            subject: '',
            choose: []
        }
    },
    methods: {
        onClickLeft() {
            this.$router.push('/home/user')
        },
        onNavClick(index) {
            this.mainActiveIndex = index;
            this.grade = this.items[index].text
        },
        onItemClick(data) {
            this.activeId = data.id;
            this.subject = data.text
            this.activeNames = []
            this.getQuestion(this.grade, this.subject)
        },
        toggle(index) {
            this.$refs.checkboxes[index].toggle();
            this.choose.push(this.list[index])
        },
        listSubmit() {
            this.$router.push({name: 'addShare', 
            params: {
                list: this.result, 
                grade: this.grade, 
                subject: this.subject,
                headline: this.$route.params.headline,
                summary: this.$route.params.summary,         
            }})
        },
        getQuestion(grade, subject) {
            let userid = this.$cookies.get("user")._id
            this.$axios.get('/question/findByclassNId', {
                params: {
                    userid: userid,
                    grade: grade,
                    subject: subject,
                }
            })
            .then(res => {
                var newList = []
                for(let i in res.data.question) {
                    let cell = res.data.question[i]
                    newList.push(cell)
                }
                this.list = newList
            })
            .catch(err => {
                console.log(err)
            })
        },
        getClass() {
            this.$axios.get('/class/examClass')
            .then(res => {
                let text = ''
                for(let i in res.data.class) {
                    let item = {}
                    let children = []
                    item.text = res.data.class[i].class
                    for(let j in res.data.class[i].children){
                        let childrenItem = {}
                        childrenItem.id = j+1
                        childrenItem.text = res.data.class[i].children[j].subject
                        children.push(childrenItem)
                    }
                    item.children = children
                    this.items.push(item)
                }
                this.class = this.items[0].text
            }).catch(err => {
                console.log(err)
            })
        }
    },
    created() {
        this.getClass(),
        this.getQuestion()
    },
}
</script>

<style>
.chooseClass {
    width: 100%;
    height: 20px;
}
.myListCheck {
    width: 100%;
    text-align: right;
}
.myListCell {
    width: 100%;
    text-align: left
}
.ListSubmit {
    width:50%;
    position: absolute;
    bottom: 10%;
    left: 25%;
    background-color: #4169E1;
    color: #ffffff;
    font-size: 16px;
    box-shadow: 0px 0px 20px #6E7B8B;
    z-index: 2
}
</style>
