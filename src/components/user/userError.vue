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
            <transition-group name="wrong">
                <van-cell
                    v-if="showWrong"
                    v-for="(item, index) in list"
                    clickable
                    :key="index"
                    :title="`题目：${item.question}`"
                    :label="`${item.class}-${item.subject}-${item.type}`"
                    class="myWrongCell"
                >
                </van-cell>
            </transition-group>
        </van-cell-group>
    </div>
</template>

<script>
export default {
    name: 'userError',
    data() {
        return {
            title:`错题本`,
            wrongIds: null,
            list: [],
            showWrong: true
        }
    },
    methods: {
        onClickLeft() {
            this.$router.push('/home/user')
        },
        getWrong() {
            let userid = this.$cookies.get("user")._id
            this.$axios.get('/user/getWrong', {
                params: {
                    userid: userid
                }
            })
            .then(res => {
                this.wrongIds = res.data.list
                return this.getQuestion()
            })
            .catch(err => {
                console.log(err)
            })
        },
        getQuestion() {
            for(let item of this.wrongIds) {
                this.$axios.get('/question/findByQuestionId', {
                    params: {
                        id: item
                    }
                })
                .then(res => {
                    this.list.push(res.data.question)
                    this.showWrong = true
                })
                .catch(err => {
                    console.log(err)
                })
            }
        },
        
    },
    created() {
        this.getWrong()
    },
}
</script>

<style>
.myWrongCell {
    width: 100%;
    text-align: left
}
.wrong-enter-active {
  animation: slide .5s
}
.wrong-leave-active {
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
