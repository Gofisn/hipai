<template>
  <div class="SellResult">
    <top-head title="提交订单" @leftClick="goBack" rightMsg></top-head>
    <div class="top">
      <div v-if="success">
        <div class="img_box">
          <img src="../../assets/img/yes_btn.png" alt>
        </div>
        <div class="result_title">订单提交成功</div>
      </div>
      <div v-else>
        <div class="img_box">
          <img src="../../assets/img/no_btn.png" alt>
        </div>
        <div class="result_title">订单提交失败</div>
        <div class="result_sub">{{orderDetail.errorMsg}} 导致本次提交失败</div>
      </div>
    </div>
    <div class="title_line">订单详情</div>
    <div class="main">
      <div class="item" v-show="success">
        <span class="name">订单号</span>
        <span class="num">{{orderDetail.order_no}}</span>
      </div>
      <div class="item">
        <span class="name">出售嗨豆</span>
        <span class="num">{{orderDetail.sale_num|numFormatD}}个</span>
      </div>
      <div class="item">
        <span class="name">出售单价</span>
        <span class="num">¥{{orderDetail.price|moneyFormatD}}/个</span>
      </div>
      <div class="item">
        <span class="name">预计收入</span>
        <span
          class="num"
        >¥{{parseFloat(orderDetail.price)*parseFloat(orderDetail.sale_num)|moneyFormatD}}</span>
      </div>
    </div>
    <div class="submit" v-if="!success" @click="submitClick">继续提交订单</div>
    <div class="submit" @click="goBack">返回</div>
  </div>
</template>
<script>
import TopHead from "@/components/TopHead";
import { goSellOut } from "utils/ajax";
import { Toast } from "vant";
import Vue from "vue";
Vue.use(Toast);
export default {
  name: "SellResult",
  data() {
    return {
      success: true
    };
  },
  computed: {
    orderDetail() {
      let order = this.$store.state.business.sellOrder;
      if (order.error) {
        this.success = false;
      } else {
        this.success = true;
      }
      return order;
    },
  },
  components: {
    TopHead
  },
  methods: {
    goBack() {
      this.$router.replace("/sellout");
    },
    submitClick() {
      let param = {
        num: this.orderDetail.num,
        price: this.orderDetail.price / 100
      };
      goSellOut(this.$resultParams(param))
        .then(res => {
          if (res.code === 200) {
            this.success = true;
            this.$store.dispatch("businessSellOutOrder", res.data);
          } else {
            Toast(res.msg);
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>
<style lang="less" scoped src="../../assets/css/style.less">
</style>

