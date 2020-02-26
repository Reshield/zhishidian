<template>
    <div>
        <div class="comLoadingDiv" v-show="showLoading">
          <van-loading color="white" size="50px" class="comListLoading"/>
        </div>
        <div class="commentList" v-for="(item, index) in commentsList" :key="index">
            <transition name="list">
                <div class="comDiv" v-show="showList">
                    <img :src="item.avatar" alt="avatar.png" class="comListImg">
                    <div class="comListName">{{ item.nickname }}</div>
                    <div class="comValue">{{ item.comment }}</div>
                    <div class="replyDiv" v-if="showReply"></div>
                </div>
            </transition>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
    data() {
        return {
            commentsList: [],
            showLoading: true,
            showList: false,
            showReply: false
        }
    },
    methods: {
        setComments(comments) {
            this.commentsList = comments
            setTimeout(() => {
                this.showList = true
            })
        },
    },
    computed: {
        ...mapState(["comments"])
    },
    created() {
        setTimeout(() => {
            this.showLoading = false
            let comments = this.comments
            this.setComments(comments)
            
        },1000)
        
    },
}
</script>

<style>
.commentList {
    width: 100%;
}
.comDiv {
    padding-top: 10px;
    padding-bottom: 20px;
    padding-left: 10px;
    width: 100%;
}
.comListImg {
    width: 50px;
    height: 50px;
    border-radius: 50px;
    float: left;
    margin-left: 10px;
}
.comListName {
    float: left;
    margin-top: 15px;
    margin-left: 10px;
    font-weight: 600;
}
.comValue {
    clear: left;
    text-align: left;
    padding-left: 8%;
    width: 70%;
    margin: 0 auto;
}
.replyDiv {
    margin-left: 15%;
    width: 75%;
    height: 100px;
    background-color: #F5F5F5;
    border-radius: 8px;
}
.comLoadingDiv {
  z-index: 2;
  left: 0;
  right: 0;
  text-align: center;
  margin: 0 auto;
  width: 60px;
  height: 60px;
  background-color: rgba(105, 105, 105, 0.5);
  border-radius: 8px;
}
.comListLoading {
    margin:0 auto;
    top: 10%;
}
.list-enter-active {
  animation: slide .5s
}
.list-leave-active {
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
