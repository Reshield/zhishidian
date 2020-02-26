<template>
    <div class="hello">
        <h1>{{ msg }}</h1>
        <router-view></router-view>
    </div>
</template>

<script>
export default {
    name: 'HelloWorld',
    data () {
        return {
            msg: 'Welcome to Your Vue.js App'
        }
    }
}
</script>

<style scoped>

</style>
