<template>
    <div style="backgroundColor:#ededed">
        <van-nav-bar
        title="举报"
        left-text="返回"
        right-text=""
        left-arrow
        @click-left="onClickLeft"
        />
        <div style="text-align: left;height: 30px; padding-top: 20px;">
            <span style="margin-left: 20px; color: #828282;">请选择举报原因</span>
        </div>
        <van-checkbox-group v-model="result">
            <van-cell-group>
                <van-cell
                style="text-align: left"
                v-for="(item, index) in list"
                clickable
                :key="index"
                :title="`${item.value}`"
                @click="toggle(index)"
                >
                <van-checkbox :name="item.value" ref="checkboxes" />
                </van-cell>
            </van-cell-group>
        </van-checkbox-group>
        <van-cell-group>
            <van-cell>
                <el-input 
                type="textarea"
                v-model="input" 
                autosize 
                placeholder="详细描述举报内容"
                style="margin-top: 2px;"
                ></el-input>
            </van-cell>
        </van-cell-group>
        <div class="submitComplaint">
            <van-button size="normal" @click="complaintSubmit" round class="complaintSubmit">提交</van-button>
        </div>
    </div>
</template>

<script>
import { copyFile } from 'fs';
export default {
    name: 'complaint',
    data() {
        return {
            list: [
                {value: '广告内容过多'},
                {value: '题目重复'},
                {value: '标题与内容不符'},
                {value: '无法答题'},
                {value: '题目或答案错误'},
                {value: '评分出现错误'},
                {value: '版权问题'},
                {value: '散布谣言'},
                {value: '色情或暴力'},
            ],
            input: '',
            result: []
        }
    },
    methods: {
        onClickLeft() {
                this.$router.go(-1)
        },
        toggle(index) {
            if(this.result.length == 0) {
                this.result.push(this.list[index].value)
            }
            else {
                let count = 0
                for(let i in this.result) {
                    if(this.result[i] == this.list[index].value) {
                        count = 1
                    }
                }
                if(count == 0) {
                    this.result.push(this.list[index].value)
                }
            }
        },
        complaintSubmit() {
            let shareId = this.$cookies.get("shareId")
            let userid = this.$cookies.get("user")._id
            this.$axios.post('/share/feedback', {
                feedback: this.result,
                userid: userid,
                shareId: shareId,
                detail: this.input
            })
            .then(res => {
                this.$toast({
                    message: res.data.message
                })
                this.input = ''
            })
            .catch(err => {
                console.log(err)
            })
        }
    },
}
</script>

<style>
.submitComplaint {
    top: 98%;
    position: fixed;
    width: 100%;
    background-color: #ffffff;
    text-align: center;
}
.complaintSubmit {
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
