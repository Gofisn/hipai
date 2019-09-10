<template>
  <div class="Stepper">
    <span @click="minu" class="minu" :class="{disable:unMin}"></span>
    <span @click="plus" class="plus" :class="{disable:unMax}"></span>
    <input
      :class="isInput?'inputstepper':''"
      type="number"
      v-model="val"
      @input="handleInput"
      :placeholder="placeholder"
    >
  </div>
</template>
<script>
export default {
  name: "Stepper",
  props: {
    value: {
      type: Number,
      default: 0
    }, //接收一个 value prop
    min: {
      type: Number,
      default: 0
    },
    max: Number,
    step: {
      type: Number,
      default: 1
    },
    placeholder: String
  },
  mounted() {
    this.checkVal();
  },
  data: function() {
    return {
      val: this.value,
      unMin: false,
      unMax: false,
      isInput: false
    };
  },
  methods: {
    plus() {
      if (!this.unMax) {
        this.isInput = true;
        if (!this.val) {
          this.val = 0;
        }
        this.val = this.val + this.step;
        this.checkVal();
      }
    },
    minu() {
      if (!this.unMin) {
        this.isInput = true;
        if (!this.val) {
          this.val = 0;
        }
        this.val = this.val - this.step;
        this.checkVal();
      }
    },
    handleInput(e) {
      this.isInput = true;
      this.val = parseInt(e.target.value);
      if (!this.val && !this.placeholder) {
        this.val = 0;
      }
      // this.checkVal();
      this.unMax = false;
      if (this.val >= this.max) {
        this.val = this.max;
        this.unMax = true;
      }
      this.$emit("input", this.val);
    },
    checkVal() {
      this.unMin = false;
      this.unMax = false;
      if (this.val <= this.min) {
        this.val = this.min;
        this.unMin = true;
      }
      if (this.val >= this.max) {
        this.val = this.max;
        this.unMax = true;
      }
      this.$emit("input", this.val);
    }
  }
};
</script>
<style lang="less" scoped>
.Stepper {
  width: 100%;
  height: 80px;
  border-radius: 20px;
  border: 2px solid rgba(247, 23, 80, 1);
  overflow: hidden;
  line-height: 80px;
  position: relative;
  text-align: center;

  input {
    text-align: center;
    background: transparent;
    border: none;
    color: #999;
    width: 100%;
    padding: 20px 80px;
    box-sizing: border-box;
    font-size: 32px;
    line-height: 40px;
    height: 80px;
    box-sizing: border-box;
    font-family: "PingFang SC", "Microsoft YaHei", "SimSun";
    &::-webkit-input-placeholder {
      color: #999;
    }
    &.inputstepper {
      color: #212121;
    }
  }

  span {
    width: 80px;
    height: 80px;
    background: url("../assets/img/minu_btn.png") no-repeat;
    background-size: 80px 80px;
    display: inline-block;

    &.minu {
      position: absolute;
      top: 0;
      left: 0;
      background-image: url("../assets/img/minu_btn.png");
      &.disable {
        background-image: url("../assets/img/minu_dis.png");
      }
    }

    &.plus {
      position: absolute;
      top: 0;
      right: 0;
      background-image: url("../assets/img/plus_btn.png");
      &.disable {
        background-image: url("../assets/img/plus_dis.png");
      }
    }
  }
}
</style>

