<template>
    <div>
        <h1>I am ShareData</h1>
    </div>
</template>

<script>
export default {
    name: 'shareData',
    data() {
        return {
            
        }
    },
    created() {
        console.log(this.$cookies.get("shareId"))
    }
}
</script>

<style>

</style>
