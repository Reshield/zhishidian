<template>
    <div>
        <van-nav-bar
        :title="title"
        left-text="返回"
        right-text=""
        left-arrow
        @click-left="onClickLeft"
        />
        <div v-for="(item,index) in news" :key="index">
            <van-panel :title="item.title" :desc="item.comment" :status="item.status" class="panel">
            </van-panel>
        </div>
    </div>
</template>

<script>
export default {
    name: 'userNews',
    data() {
        return {
            title: '消息',
            news: [
                { id: null, title: 'AAAAAAA', comment: 'aaaaaaaa', status: '未读' },
                { id: null, title: 'BBBBBBB', comment: 'bbbbbbbb', status: '未读' },
                { id: null, title: 'CCCCCCC', comment: 'cccccccc', status: '未读' },
            ]
        }
    },
    methods: {
        onClickLeft () {
            this.$router.go(-1)
        },
    },
    created() {
        
    },
}
</script>

<style>
.panel{
    margin-left: -70px;
}
</style>
