<template>
    <div>
        <van-nav-bar
        title="分类"
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
        <transition name="van-slide-right">
            <div v-show="visible" v-if="visible">Slide Right</div>
        </transition>
        <div class="addDiv">
            <van-icon name="add" size="50px" @click="add()"></van-icon>
        </div>
        <van-popup
        v-model="popup"
        position="right"
        style="width:40%;height:100%;margin-top:46px;backgroundColor:rgba(248,248,255,0)"
        overlay-class="overlayClass"
        :lock-scroll="false"
        >
            <div v-for="(item,index) in questionTypes" :key="index" class="addlist">
                <van-button size="normal" class="addbutton" @click="addbutton(index)"><span>{{item.value}}</span></van-button>
            </div>
        </van-popup>
        <van-dialog v-model="showDialog" show-cancel-button :showConfirmButton="false" :showCancelButton="false">
            <div style="margin: 10px auto;">阶层
                <el-select v-model="grade" placeholder="请选择">
                    <el-option
                    v-for="item in classes"
                    :key="item.value"
                    :label="item.label"
                    :value="item.label"
                    style="z-index: 100"
                    >
                    </el-option>
                </el-select>
            </div>
            <div style="margin: 10px auto;">科目
                <el-input v-model="subject" placeholder="请输入科目" style="width: 69%;"></el-input>
            </div>
            <div>
                <van-button style="width: 30%;" @click="closeClass">取消</van-button>
                <van-button style="width: 30%; color: #00CDCD" @click="newClass">确认</van-button>
            </div>
        </van-dialog>
    </div>
</template>
<script>
export default {
    name: 'markclass',
    data (){
        return {
            visible:false,
            popup: false,
            questionTypes:[
                {id:null,value:`单选题`},
                {id:null,value:`多选题`},
                {id:null,value:`填空题`},
                {id:null,value:`分析题`},
                {id:null,value:`新的类别`},
            ],
            items:[],
            // 左侧高亮元素的index
            mainActiveIndex: 0,
            // 被选中元素的id
            activeId: 1,
            addClass: {},
            classes: [
                {value: '选项1', label: '小学'},
                {value: '选项2', label: '初中'},
                {value: '选项3', label: '高中'},
                {value: '选项4', label: '大学'},
                {value: '选项5', label: '其他'},
            ],
            grade: '',
            subject: '',
            showDialog: false
        }
    },
    methods:{
        onClickLeft() {
            this.$router.push('/')
        },
        add() {
            this.popup ? this.popup = false : this.popup = true;
        },
        newClass() {
            let userid = this.$cookies.get("user")._id
            if(this.grade == '' || this.grade == null) {
                this.$toast({
                    message: '请选择阶层'
                })
            }
            else if (this.subject == '' || this.subject == null) {
                this.$toast({
                    message: '请输入科目！'
                })
            }
            else {
                this.$axios.post('/class/saveSubject', {
                    userid: userid,
                    grade: this.grade,
                    subject: this.subject
                })
                .then(res => {
                    this.showDialog = false
                })
                .catch(err => {
                    console.log(err)
                })
            }
        },
        closeClass() {
            this.showDialog = false
        },
        addbutton(index) {
            console.log(index)
            let questionType = this.questionTypes[index].value
            this.addClass.type = questionType
            this.$cookies.set("class", this.addClass)
            this.popup ? this.popup = false : this.popup = true;
            switch(index){
                case 0:
                    this.$router.push({name: 'addDanxuan', params:{ questionClass: this.addClass }});
                break;
                case 1:
                    this.$router.push({name: 'addDuoxuan', params:{ questionClass: this.addClass}});
                break;
                case 2:
                    this.$router.push('/addTiankong');
                break;
                case 3:
                    this.$router.push('/addFenxi');
                break;
                case 4:
                    
                break;
            }
        },
        onNavClick(index) {
            this.mainActiveIndex = index;
            this.addClass.class = this.items[index].text
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
                this.addClass.class = this.items[0].text
                this.addClass.subject = this.items[0].children[0].text
            }).catch(err => {
                  console.log(err)
            })
        },
        onItemClick(data) {
            this.activeId = data.id;
            this.addClass.subject = data.text;
        }
    },
    created() {
        this.getClass()
    }
}
</script>
<style>
.addDiv{
    position: absolute;
    top: 85%;
    right: 40px;
    color: #43CD80;
}
.class{
    position: relative;
    top:20px;
}
.addlist{
    top: 250px;
    display: block;
    position: relative;
}
.addbutton{
    margin-top: 10px;
    margin-bottom: 10px;
}
.overlayClass{
    background-color: rgba(248,248,255,0.5);
}
</style>


