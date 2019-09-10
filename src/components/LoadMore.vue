<template>
  <div class="LoadMore">
    <slot></slot>
    <div v-show="finished" class="finished">{{text}}</div>
  </div>
</template>
<script>
export default {
  props: {
    id: String,
    finished: Boolean,
    text: {
      type:String,
      default:'没有更多了。。。'
    }
  },
  name: "LoadMore",
  mounted() {
    let sDiv = document.getElementById(this.id);
    sDiv.onscroll = () => {
      if (
        sDiv.scrollTop &&
        !this.finished &&
        sDiv.scrollTop + sDiv.clientHeight >= sDiv.scrollHeight
      ) {
        this.$emit("load");
      }
    };
  },
  methods: {}
};
</script>


<style lang="less" scoped>
.finished {
  text-align: center;
  color: #999;
  line-height: 60px;
  font-size: 22px;
}
</style>

