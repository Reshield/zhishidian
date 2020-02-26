<template>
    <div>
        <van-nav-bar
        :title="title"
        left-text="返回"
        right-text=""
        left-arrow
        @click-left="onClickLeft"
        />
        <van-tree-select
          :items="items"
          :main-active-index="mainActiveIndex"
          :active-id="activeId"
          @navclick="onNavClick"
          @itemclick="onItemClick"
        />
        <div>
            <van-cell-group>
                <van-cell>
                    {{ gradeClass }}
                </van-cell>
                <van-cell>
                    <div  v-for="(item, index) in gradeSubject" :key="index">
                        <van-button class="otherSubaject">{{item}}</van-button>
                    </div>
                </van-cell>
            </van-cell-group>
        </div>
    </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
    name: 'examClass',
    data() {
        return {
            title: '类别',
            userId: null,
            items:[],
            class: '',
            subject: '',
            // 左侧高亮元素的index
            mainActiveIndex: 0,
            // 被选中元素的id
            activeId: 1,
            gradeClass: '',
            gradeSubject: []
        }
    },
    methods: {
        ...mapActions(["setClass"]),
        onClickLeft() {
            this.$cookies.set("class", null)
            this.$router.push('/')
        },
        onNavClick(index) {
            this.mainActiveIndex = index;
            this.class = this.items[index].text
        },
        onItemClick(data) {
            this.activeId = data.id;
            this.subject = data.text
            let storeClass = {}
            storeClass.class = this.class
            storeClass.subject = this.subject
            this.$cookies.set("class", storeClass)
            this.setClass(storeClass)
            this.$router.push('/exercises')
        },
        getClass() {
            let userid = this.$cookies.get("user")._id
            this.$axios.get('/class/examClass', {
                params: {
                    userid: userid
                }
            })
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
                this.setGrade(res.data.grade)
            }).catch(err => {
                console.log(err)
            })
        },
        setGrade(grade) {
            this.gradeClass = grade[0].grade
            this.gradeSubject = grade[0].subject
        }
    },
    mounted() {
        this.getClass()
    },
}
</script>

<style>
.classEditDiv {
    width: 60%;
    height: 200px;
}
.otherSubaject {
    height: 40px;
    border-radius: 8px;
    background-color: #4169E1;
    color: #ffffff;
    float: left;
    margin: 5px;
}
</style>
