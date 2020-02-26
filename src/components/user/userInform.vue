<template>
    <div>
        <van-nav-bar
        title="用户信息"
        left-text="返回"
        right-text=""
        left-arrow
        @click-left="onClickLeft"
        />
        <el-upload
          class="avatar-uploader"
          action="123"
          accept="image/jpeg,image/gif,image/png,image/bmp" 
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
        >
            <img v-if="imageUrl" :src="imageUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
        <van-cell-group>
            <van-cell style="align-items: center;" is-link>
                <div class="firstImgDiv">
                    <img :src="userAvatar" class="firstImg" alt="用户头像">
                </div>
            </van-cell>
            <van-cell is-link>
                <span>用户名</span>
                <span class="cellValue">{{ nickname }}</span>
            </van-cell>
            <van-cell is-link>
                <span>邮箱</span>
                <span class="cellValue">{{ email }}</span>
            </van-cell>
            <van-cell is-link>
                <span>简介</span>
                <span class="cellValue">{{ bio }}</span>
            </van-cell>
        </van-cell-group>
        <van-button @click="showLogout" class="userLogout">退出登录</van-button>
        <van-popup v-model="showPopup" class="vanPopup">
            <div class="logoutDiv">
                <div>确定退出此账号？</div>
                <van-button @click="quitLogout">取消</van-button>
                <van-button @click="userLogout">确定</van-button>
            </div>
        </van-popup>
    </div>
</template>

<script>
export default {
    name: 'userInform',
    data() {
        return {
            userid: null,
            nickname: null,
            email: null,
            bio: null,
            userAvatar: './../../../static/img/default.png',
            imageUrl: '',
            uploadUrl:'',
            showPopup: false
            
        }
    },
    methods: {
        onClickLeft() {
            this.$router.push('/home/user')
        },
        getUser() {
            if(this.$cookies.get("user") != null || this.$cookies.get("user") != undefined) {
                let userid = this.$cookies.get("user")._id
                let nickname = this.$cookies.get("user").nickname
                let avatar = 'http://127.0.0.1:3000/images/' + this.$cookies.get("user").avatar
                let email = this.$cookies.get("user").email
                let bio = this.$cookies.get("user").bio
                this.userid = userid
                this.nickname = nickname
                this.email = email
                this.bio = bio
                this.userAvatar = avatar
            }
        },
        handleAvatarSuccess(res, file) {
            this.imageUrl = URL.createObjectURL(file.raw);
            this.dialogVisible = true;
        },
        beforeAvatarUpload(file) {
            //需要注意的是在ajax中使用formdata需要配置anync:true,contentType:false,processData:false,在axios中不配置也能上传
            //还有一个地方需要注意的是formData.append(name,value),里面的name对应的是input 的name值，value对应的是input的files[0]，不是input.val(),对于的type=file的input，图片是在input的FileList 里面，
            //这里用的是this.$refs.upload.files[0]，这是因为在vue中使用this.$refs.refname来获取dom的真实节点，用jq或者js的获取节点的方法是拿不到的，
            let form = new FormData()
            form.append('avatar', file)
            form.append('avatar', this.userid)
            this.$axios.post('http://127.0.0.1:3000/user/uploadAvatar',form)
            .then(res => {
                this.imageUrl = 'http://127.0.0.1:3000/images/' +  res.data.user.avatar
                this.userAvatar = 'http://127.0.0.1:3000/images/' + res.data.user.avatar
                this.$cookies.set("user", res.data.user)
            })
            .catch(err => {
                console.log(err)
                this.$toast({
                    message: err
                })
            })
        },
        showLogout() {
            this.showPopup = true
        },
        userLogout() {
            localStorage.removeItem("Flag")
            this.$cookies.set("user", null)
            this.$router.push('/login')
        },
        quitLogout() {
            this.showPopup = false
        }
    },
    created() {
        this.getUser()
        console.log(this.$cookies.get("user"))
    },
}
</script>

<style>
.firstImg {
    width: 60px;
    height: 60px;
    border-radius: 50px;
}
.firstImgDiv {
    width: 100%;
    float: left;
}
.labelClass {
    widows: 100%;
    margin-left: -20px;
}
.cellValue {
    float: right
}
.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
}
.avatar-uploader .el-upload:hover {
    border-color: #409EFF;
}
.avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
}
.avatar {
    width: 178px;
    height: 178px;
    display: block;
}
.userLogout {
    margin-top: 20%;
    width: 60%;
    box-shadow:0px 0px 20px #8c939d;
    border-radius: 8px;
}
.vanPopup {
    width: 80%
}
</style>
