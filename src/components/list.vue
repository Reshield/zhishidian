<template>
    <div>
        <van-nav-bar
          title="分享区"
          left-text="返回"
          right-text=""
          left-arrow
          @click-left="onClickLeft"
        />
        <img src="@/assets/img/addShare.png" @click="addShare" class="listImg" alt="addShare.png"/>
        <img src="@/assets/img/shareClass.png" @click="shareClass" class="shareClass" alt="shareClass.png"/>
            <van-cell-group
            v-for="(item,index) in list"
            :key="index"
            >
                <transition name="fade">
                    <van-cell
                    v-if="showList"
                    >
                        <van-card
                            :desc="item.summary"
                            :tag="item.nickname"
                        >
                        <img :src="getUserAvatar(index)" slot="thumb" class="listAvatar" alt="userAvatar" @click="enterShare(index)">
                        <div slot="title" class="title" @click="enterShare(index)">{{ item.headline }}</div>
                        <div slot="footer">
                            <img :src="collect" class="listCollect" alt="collect.png">
                            <img :src="item.likeActive" class="listLike" alt="like.png" @click="changeLike(index)">
                        </div>
                        </van-card>
                    </van-cell>
                </transition>
            </van-cell-group>
        <van-popup v-model="showPopup" class="listPopup" position="bottom">
            <van-tree-select
              :items="classitems"
              :main-active-index="mainActiveIndex"
              :active-id="activeId"
              @navclick="onNavClick"
              @itemclick="onItemClick"
            />
        </van-popup>
    </div>
</template>

<script>
import avatar from '@/assets/img/default.png'
import collect from '@/assets/img/collect.png'
import collected from '@/assets/img/collected.png'
import like from '@/assets/img/like.png'
import like_1 from '@/assets/img/likes.png'
export default {
    name: 'list',
    data() {
        return {
            like: like,
            like_1: like_1,
            list: [],
            num: 0,
            imageURL: avatar,
            collect: collect,
            items: [],
            showPopup: false,
            // 左侧高亮元素的index
            mainActiveIndex: 0,
            // 被选中元素的id
            activeId: 1,
            classitems: [],
            showList: false
        }
    },
    methods: {
        onClickLeft() {
            this.$router.push('/')
        },
        addShare() {
            this.$router.push('/addShare')
        },
        shareClass() {
            this.showPopup = true
        },
        onNavClick(index) {
            this.mainActiveIndex = index;
        },
        onItemClick(data) {
            this.activeId = data.id;
        },
        enterShare(index) {
            this.$cookies.set("shareId", this.list[index]._id)
            this.$store.dispatch('setShare', this.list[index])
            this.$router.push({name: 'enterShare', params: {shareID: this.list[index]._id}})
        },
        changeLike(index) {
            console.log(this.like[index].like)
            let shareId = this.list[index]._id
            let userid = this.$cookies.get("user")._id
            let likes = this.list[index].like
            let count = 0
            for(let i in likes) {
                if(likes[i].userid = userid) {
                    count = 1
                }
                else {
                    count
                }
            }
            if(count == 0) {
                this.$axios.post('/share/saveShareLike', {
                    userid: userid,
                    shareId: shareId
                })
                .then(res => {
                    if(res != null) {
                        let share = this.list[index]
                        share.likeActive = 'http://127.0.0.1:3000/images/likes.png'
                        this.$set(this.list, index , share)
                    }
                })
                .catch(err => {
                    console.log(err)
                })
            }
            if(count == 1){
                this.$axios.post('/share/deleteShareLike', {
                    userid: userid,
                    shareId: shareId
                })
                .then(res => {
                    if(res != null) {
                        let share = this.list[index]
                        share.likeActive = 'http://127.0.0.1:3000/images/like.png'
                        this.$set(this.list, index , share)
                    }
                })
                .catch(err => {
                    console.log(err)
                })
            }
        },
        getUserAvatar(index) {
            if(this.list[index].avatar != null || this.list[index].avatar != '') {
                return 'http://127.0.0.1:3000/images/' + this.list[index].avatar
            }
            else {
                return 'http://127.0.0.1:3000/images/default.png'
            }
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
                this.classitems.push(item)
                }
            }).catch(err => {
                console.log(err)
            })
        },
        getShare() {
            this.$axios.get('/share/allOpenShare')
            .then(res => {
                let shares = res.data.share
                for(let i in shares) {
                    let userid = shares[i].userid
                    let have = false
                    for(let j of shares[i].like) {
                        if(j.userid = this.$cookies.get("user")) {
                            have = true
                        }
                    }
                    if(have == true) {
                        shares[i].likeActive = 'http://127.0.0.1:3000/images/likes.png'
                    }
                    else {
                        shares[i].likeActive = 'http://127.0.0.1:3000/images/like.png'
                    }
                }
                this.list = res.data.share
                setTimeout(() => {
                    this.showList = true
                },100)
            })
            .catch(err => {
                console.log(err)
            })
        }
    },
    async created() {
        await this.getShare()
        await this.getClass()
    },
}
</script>

<style>
.listAvatar {
    width: 50px;
    height: 50px;
    position: relative;
    float: left;
    margin-top: 0px;
    border-radius: 50px;
}
.listCollect{
    width: 6%;
    height: 20px;
    position: relative;
    top: 12px;
    right: -90%;
}
.listLike {
    width: 6%;
    height: 20px;
    position: relative;
    top: 12px;
    right: -90%;
}
.title {
    font-size: 14px;
    font-weight: 600
}
.listImg {
    width: 30px;
    position: absolute;
    right: 5%;
    top: 8px;
    z-index: 2;
}
.shareClass {
    width: 32px;
    position: absolute;
    right: 15%;
    top: 8px;
    z-index: 2
}
.listPopup {
    width: 100%;
}
.fade-enter-active {
  animation: slide .5s
}
.fade-leave-active {
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
