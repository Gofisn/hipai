<template>
  <div class="GiveBeans">
    <top-head :close="true" title="发放嗨豆" @leftClick="goBack"></top-head>
    <div class="time_box">
      <div>嗨豆即将到账</div>
      <div class="time">{{time|secTotime}}</div>
    </div>
    <div class="title_line">订单详情</div>

    <div class="main">
      <div class="item">
        <div class="name">订单号</div>
        <span class="num">{{orderMsg.order_no}}</span>
      </div>
      <div class="item">
        <span class="name">商家</span>
        <span class="num">{{orderMsg.seller_name}}</span>
      </div>
      <div class="item">
        <span class="name">嗨豆数量</span>
        <span class="num">{{orderMsg.num|numFormat}}个</span>
      </div>
      <div class="item">
        <span class="name">单价</span>
        <span class="num">¥{{orderMsg.price|moneyFormatD}}/个</span>
      </div>
      <div class="item">
        <span class="name">交易金额</span>
        <span class="num">¥{{orderMsg.total_money|moneyFormatD}}</span>
      </div>
    </div>
    <div class="submit" @click="goBack">返回</div>
  </div>
</template>
<script>
import TopHead from "@/components/TopHead";
import { Dialog } from "vant";
// import { secTotime } from "@/assets/js/utils";
export default {
  name: "GiveBeans",
  data() {
    return {
      time: 0,
      orderMsg: {},
      timer: "",
      lastTime:0
    };
  },
  components: {
    TopHead
  },
  created() {
    this.orderMsg = this.$store.state.business.businessPaySuccess;
    this.time = this.orderMsg.wait_second;
    this.lastTime=new Date() - 0;
    this.timer = setTimeout(this.changeTime, 1000);
  },
  // filters: {
  //   secTotime(time) {
  //     return secTotime(time);
  //   }
  // },
  beforeDestory() {
    clearTimeout(this.timer);
  },
  destroyed() {
    clearTimeout(this.timer);
  },
  methods: {
    goBack() {
      const route = this.$store.state.business.appearBack;
      if (route === "GoBuy") {
        this.$router.replace("/bs-home");
      } else if (route === "BusinessList") {
        this.$router.replace({ name: route });
      }
    },
    goAppeal() {
      if (this.time <= 0) {
        this.$router.replace("/bs-appeal?id=" + this.orderMsg.id);
      }
    },
    changeTime() {
      clearTimeout(this.timer);
      let dt = new Date() - 0 - this.lastTime;
      this.lastTime = new Date() - 0;
      if (dt > 1500) {
        this.time = this.time - parseInt(dt / 1000);
      } else {
        this.time -= 1;
      }
      if (this.time < 0) {
        this.time = 0;
        Dialog.alert({
          title: "嗨豆已到账",
          message: "您可以在您的账号中查看嗨豆数量。",
          confirmButtonText: "好的"
        }).then(() => {
          this.goBack();
        });
      } else {
        this.timer = setTimeout(this.changeTime, 1000);
        this.orderMsg.wait_second = this.time;
        this.$store.dispatch("changeBusinessPaySuccess", this.orderMsg);
      }
    }
  }
};
</script>

<style lang="less" scoped src="../../assets/css/style.less">
</style>
