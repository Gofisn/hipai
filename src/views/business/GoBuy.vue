<template>
  <div class="GoBuy">
    <top-head :styles="headStyle" title="买入嗨豆" @leftClick="goBack" rightMsg></top-head>
    <div class="main">
      <div class="name">购买嗨豆数量(个)</div>
      <div class="stepper_box">
        <stepper :max="max" :min="min" :value="value" @input="stepChange"></stepper>
      </div>
    </div>
    <div class="title">嗨豆来源：</div>
    <div class="cont">
      <div class="list_item head">
        <span class="left">商家</span>
        <span class="item">数量</span>
        <span class="right">单价</span>
      </div>
      <div class="list_item">
        <span class="left">{{businessMsg.username}}</span>
        <span class="item">{{max|numFormat}}</span>
        <span class="right">{{price|moneyFormatD}}元/个</span>
      </div>
    </div>
    <div class="submit_box">
      <div class="totle">总计：¥{{totalMoney}}</div>
      <div class="submit" :class="{active:submitActive}" @click="goSubmit">提交订单</div>
    </div>
  </div>
</template>
<script>
import TopHead from "@/components/TopHead";
import Stepper from "@/components/Stepper";
import { goBuyHiBean } from "utils/ajax";
// import { getSystemInfoFromApp } from "@/assets/js/utils.js";
import { Toast, Dialog} from "vant";
import Vue from "vue";
Vue.use(Toast);
export default {
  name: "GoBuy",
  data() {
    return {
      min: 1,
      value: 1,
      headStyle: {
        background: "transparent"
      }
    };
  },

  components: {
    TopHead,
    Stepper
  },
  methods: {
    goBack() {
      this.$router.replace("/bs-home");
    },
    stepChange(val) {
      this.value = parseInt(val);
    },
    goSubmit() {
      if (this.submitActive) {
        let param = {
          sale_order_id: this.businessMsg.id,
          buy_num: this.value
        };
        goBuyHiBean(this.$resultParams(param))
          .then(res => {
            if (res.code === 200) {
              // 改变 store 中 数量
              let bs = this.$store.state.business.buyBusiness;
              bs.sale_num = parseInt(bs.sale_num) - this.value;
              this.$store.dispatch("buyBusinessMsg", bs);
              // 设置返回路由跳转
              this.$store.dispatch("changeAppearBack", "GoBuy");
              this.$router.replace("/buysubmit?id="+res.data.id);
            }else {
              Toast(res.msg);
            }
          })
          .catch(err => {
            console.log(err);
          });
      }
    }
  },
  computed: {
    submitActive() {
      return this.value ? true : false;
    },
    businessMsg() {
      let business = this.$store.state.business.buyBusiness;
      console.log(business)
      this.price = parseFloat(business.price);
      return business;
    },
    max() {
      return parseInt(this.$store.state.business.buyBusiness.sale_num);
    },

    totalMoney() {
      return (this.value * this.price) / 100;
    }
  }
};
</script>
<style lang="less" scoped src="../../assets/css/business.less">
</style>

