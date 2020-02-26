<template>
    <div>
        <van-nav-bar
        title=""
        left-text="返回"
        right-text=""
        left-arrow
        @click-left="onClickLeft"
        />
        <div class="enterShare">
            <router-view ></router-view>
        </div>
        <div class="shareFooter">
            <div style="width: 100%;">
                <div class="shareCol">
                    <div class="colChild">
                        <img @click="likeChange" :src="likeActive" alt="Like.png" class="shareLike">
                    </div>
                    <span class="colChildSpan">点赞</span>
                </div>
                <div style="width: 2px; backgroundColor: #CFCFCF; border-radius: 2px; margin-top: 2px"></div>
                <div class="shareCol">
                    <div class="colChild" @click="showEvaluate">
                        <img src="@/assets/img/evaluate.png" alt="comment.png" class="shareComment">
                        <span class="colChildSpan">评价</span>
                    </div>
                </div>
                <div style="width: 2px; backgroundColor: #CFCFCF; border-radius: 2px; margin-top: 2px"></div>
                <div class="shareCol">
                    <div class="colChild">
                        <img src="@/assets/img/shareComment.png" alt="comment.png" class="shareComment" @click="toComment">
                        <span class="colChildSpan">讨论</span>
                    </div>
                </div>
            </div>
        </div>
        <van-popup v-model="showPopup" position="bottom" :overlay="true">
            <div class="evaluateDiv">
                <van-cell-group>
                    <van-cell value="打分"/>
                    <van-cell>
                        <el-rate
                        v-model="evaluate"
                        show-text
                        :colors="['#99A9BF', '#F7BA2A', '#FF9900']">
                        </el-rate>
                        <van-button size="small" @click="getEvaluate" >确定</van-button>
                    </van-cell>
                    <van-cell value="反馈"/>
                    <van-cell value="给出题人留言" @click="sendMessage" is-link/>
                    <van-cell value="举报 / 投诉" @click="complaint" is-link/>
                </van-cell-group>
            </div>
        </van-popup>
    </div>
</template>

<script>
import enterShare from '@/components/exam/enterShare'
import likeImg from '@/assets/img/icon_like.png'
import like_1Img from '@/assets/img/icon_like_1.png'
export default {
    name: 'shareButton',
    data() {
        return {
            likeActive: likeImg,
            showPopup: false,
            evaluate: null
        }
    },
    methods: {
        onClickLeft() {
            this.$cookies.set("shareId", null)
            this.$router.push('/home/list')
        },
        likeChange() {
            this.likeActive == likeImg ? this.likeActive = like_1Img : this.likeActive = likeImg
        },
        showEvaluate() {
            this.showPopup = true
        },
        getEvaluate() {
            let userid = this.$cookies.get("user")._id
            let shareId = this.$cookies.get("shareId")
            let evaluate = this.evaluate
            this.$axios.post('/share/evaluate', {
                userid: userid,
                shareId: shareId,
                evaluate: evaluate
            })
            .then(res => {
                this.$toast({
                    message: res.data.message
                })
                this.showPopup = false
            })
            .catch(err => {
                console.log(err)
            })
        },
        toComment() {
            this.$router.push('/comment')
        },
        sendMessage() {
            
        },
        complaint() {
            this.$router.push({name: 'complaint'})
        }
    },
    created() {
    },
}
</script>

<style>
.shareCol {
    float: left;
    margin-top: 3px;
    width: 33%;
    text-align: center
}
.colChild {
    margin: auto;
    width: 40px;
}
.colChildSpan {
    font-size: 14px;
    color: 	#9C9C9C;
}
.enterShare {
    height: 557px;
    overflow-y: scroll;
}
.shareFooter {
    border-top: 1px #DCDCDC;
    position: relative;
    bottom: 0px;
    height: 60px;
    width: 100%;
    box-shadow: 5px 0px 5px;
}
.shareLike {
    width: 35px;
    height: 35px;
}
.evaluateDiv {
    height: 250px;
}
.shareComment {
    width: 35px;
    height: 35px;
}
</style>
