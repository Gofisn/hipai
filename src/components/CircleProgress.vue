<template>
  <div class="CircleProgress">
    <svg style="transform: rotate(90deg)" :width="width" :height="width">
      <circle
        :r="(width-strokeW)/2"
        :cy="width/2"
        :cx="width/2"
        :stroke-width="strokeW"
        :stroke="backgroundColor"
        fill="none"
      ></circle>
      <circle
        ref="$bar"
        :r="(width-strokeW)/2"
        :cy="width/2"
        :cx="width/2"
        :stroke="barColor"
        :stroke-width="(strokeW/5*3)"
        :stroke-linecap="isRound ? 'round' : 'square'"
        :stroke-dasharray="(width-strokeW)*Math.PI"
        :stroke-dashoffset="isAnimation ? (width-strokeW)*Math.PI : (width - strokeW) * Math.PI * (100 - progress) / 100"
        fill="none"
      ></circle>
    </svg>
    <div
      class="text_box"
      :style="{width:`${width-strokeW*2}px`,height:`${width-strokeW*2}px`,top:`${strokeW}px`,left:`${strokeW}px`}"
    >
      <div>
        <div>{{text}}</div>
        <div class="subText">{{subText}}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    width: [Number, String], // 圆的大小
    strokeW: [Number, String], // 进度条厚度
    progress: [Number, String], // 进度条百分比
    barColor: String, // 进度条颜色
    backgroundColor: String, // 背景颜色
    isAnimation: {
      // 是否是动画效果
      type: Boolean,
      default: true
    },
    isRound: {
      // 是否是圆形画笔
      type: Boolean,
      default: true
    },
    id: {
      // 组件的id，多组件共存时使用
      type: [String, Number],
      default: 1
    },
    duration: {
      // 整个动画时长
      type: [String, Number],
      default: 1000
    },
    delay: {
      // 延迟多久执行
      type: [String, Number],
      default: 0
    },
    timeFunction: {
      // 动画缓动函数
      type: String,
      default: "cubic-bezier(0.99, 0.01, 0.22, 0.94)"
    },
    text: {
      type: [String, Number],
      default: "0%"
    },
    subText: {
      type: [String, Number],
      default: ""
    }
  },
  data() {
    return {
      idStr: `circle_progress_keyframes_${this.id}`,
      scale: 1
    };
  },
  beforeDestroy() {
    // 清除旧组件的样式标签
    document.getElementById(this.idStr) &&
      document.getElementById(this.idStr).remove();
  },
  mounted() {
    this.animateCircle();
  },
  watch: {
    progress(val) {
      this.animateCircle();
    }
  },
  methods: {
    animateCircle() {
      if (this.isAnimation) {
        // 重复定义判断
        if (document.getElementById(this.idStr)) {
          console.warn("vue-circle-progress should not have same id style");
          document.getElementById(this.idStr).remove();
        }
        let pro = 100 - this.progress;
        if (pro < 0) {
          pro = 0;
        } else if (pro > 100) {
          pro = 100;
        }
        // 生成动画样式文件
        let style = document.createElement("style");
        style.id = this.idStr;
        style.type = "text/css";
        style.innerHTML = `
      @keyframes circle_progress_keyframes_name_${this.id} {
      from {stroke-dashoffset: ${(this.width - this.strokeW) * Math.PI}px;}
      to {stroke-dashoffset: ${((this.width - this.strokeW) * Math.PI * pro) /
        100}px;}}
      .circle_progress_bar${
        this.id
      } {animation: circle_progress_keyframes_name_${this.id} ${
          this.duration
        }ms ${this.delay}ms ${this.timeFunction} forwards;}`;
        // 添加新样式文件
        document.getElementsByTagName("head")[0].appendChild(style);
        // 往svg元素中添加动画class
        this.$refs.$bar.classList.add(`circle_progress_bar${this.id}`);
      }
    }
  }
};
</script>
<style lang="less" scoped>
.CircleProgress {
  position: relative;

  .text_box {
    position: absolute;
    font-size: 40px;
    color: #212121;
    font-weight: bold;
    display: flex;
    justify-content: center;
    align-items: center;
    .subText {
      font-size: 24px;
      color: #595959;
      font-weight: normal;
    }
  }
}
</style>
