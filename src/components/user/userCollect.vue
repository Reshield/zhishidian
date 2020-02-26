<template>
    <div>
        <van-nav-bar
        :title="title"
        left-text="返回"
        right-text=""
        left-arrow
        @click-left="onClickLeft"
        />
        <h1>userCollect</h1>
    </div>
</template>

<script>
export default {
    name: 'userCollect',
    data() {
        return {
            title:`错题本`,
        }
    },
    methods: {
        onClickLeft() {
            this.$router.push('/home/user')
        },
    },
}
</script>

<style>

</style>
