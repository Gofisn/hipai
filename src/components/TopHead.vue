<template>
  <div class="TopHeader"
       :style="styles">
    <div class="back"
         @click="backClick">
      <span :class="{close:close}"></span>
    </div>
    <span v-show="rightMsg"
          class="rule"
          @click="rightClick">{{rightMsg}}</span>
    <div class="title">{{title}}</div>
  </div>
</template>
<script>
export default {
  name: "TopBar",
  props: {
    title: String,
    rightMsg: String,
    close: {
      type: Boolean,
      default: false
    },
    styles: {
      type: Object,
      default: () => {
        return { background: "#fff" };
      }
    }
  },
  computed: {
    srcImg () {
      if (this.close) {
        return close_btn;
      } else {
        return back_btn;
      }
    }
  },
  methods: {
    backClick () {
      this.$emit("leftClick");
    },
    rightClick () {
      this.$emit("rightClick");
    }
  }
};
</script>
<style scoped lang="less">
.TopHeader {
  color: #333;
  position: fixed;
  width: 100vw;
  height: 90px;
  top: 0;
  left: 0;
  text-align: center;
  line-height: 90px;
  font-size: 32px;
  background: #fff;
  z-index: 999;
  .title {
    font-size: 36px;
    font-weight: 600;
    height: 90px;
    line-height: 90px;
    color: #222;
  }

  .back {
    position: absolute;
    left: 0;
    top: 0;
    width: 84px;
    height: 90px;

    span {
      display: inline-block;
      width: 24px;
      height: 40px;
      margin-top: 25px;
      background: url("../assets/img/back_btn.png") no-repeat;
      background-size: 24px 40px;
      &.close {
        width: 32px;
        height: 32px;
        margin-top: 28px;
        background: url("../assets/img/close_btn.png") no-repeat;
        background-size: 32px 32px;
      }
    }
  }

  .rule {
    position: absolute;
    color: rgba(89, 89, 89, 1);
    top: 0;
    right: 30px;
  }
}
</style>
