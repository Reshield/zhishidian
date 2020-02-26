<template>
  <div>
    <van-nav-bar
      title="分析题"
      left-text="返回"
      right-text=""
      left-arrow
      @click-left="onClickLeft"
    />
    <div class="addTitle">
      <p class="addTitle_p">题目标题</p>
      <input type="text" class="titleInput" @click="titleInput()" v-model="title" ref="title">
    </div>
     <transition name="el-zoom-in-center" class="el-zoom-in-center">
        <div v-show="show" class="transition-box"></div>
      </transition>
    <hr />
  </div>
</template>

<script>
export default {
  data() {
    return {
      show: false,
      title: '',

    }
  },
  methods: {
    onClickLeft() {
      this.$router.push('/markclass')
    },
    titleInput(e) {
      this.show = !this.show
      console.log(this.$refs.title)
      
    }

  }
}
</script>

<style>
.addTitle {
  text-align: left;
}
.addTitle_p {
  position: relative;
  left: 10%;
}
.titleInput {
  position: relative;
  outline-style: none;
  border: 0px;
  left: 10%;
  height: 16px;
}
.el-zoom-in-center {
  height: 5px;
}
.transition-box {
  margin: auto;
  width: 80%;
  height: 2px;
  background-color:#BCD2EE;
  border-radius: 5px;
}

</style>
