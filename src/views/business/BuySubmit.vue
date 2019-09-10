<template>
  <div class="BuySubmit">
    <top-head :title="title" @leftClick="goBack"></top-head>
    <div class="time_box">
      <div>订单剩余时间</div>
      <div class="time">{{time|secTotime}}</div>
    </div>
    <div class="note">平台不支持自动扣款,请使用您的支付宝向以下账户自行转账</div>
    <div class="note_sub">转账时请勿备注类似嗨豆交易等信息，否则卖方可拒收</div>
    <div class="car_box">
      <div class="name">姓名：{{orderMsg.seller_name}}</div>
      <div class="count">
        账号：{{accountType}} {{orderMsg.seller_account}}
        <span
          class="copy"
          @click="copyText(orderMsg.seller_account)"
        >复制账号</span>
      </div>
      <div class="notice">(无需任何备注，乱备注不放行)</div>
      <div class="line"></div>
      <div class="cont">
        <div class="item">
          <span class="nm">嗨豆数量</span>
          <span class="num">{{orderMsg.num|numFormat}}个</span>
        </div>
        <div class="item">
          <span class="nm">单价</span>
          <span class="num">¥{{orderMsg.price|moneyFormatD}}/个</span>
        </div>
        <div class="item">
          <span class="nm">付款</span>
          <span class="num">¥{{orderMsg.total_money|moneyFormatD}}</span>
        </div>
      </div>
    </div>
    <div class="btn_box">
      <span class="btn" @click="goCancle">取消交易</span>
      <span class="btn" @click="goPay">我已成功付款</span>
    </div>
  </div>
</template>
<script>
import TopHead from "@/components/TopHead";
import {
  businessPayDetail,
  businessPaySure,
  businessCancleOrder
} from "utils/ajax";
// import { secTotime } from "@/assets/js/utils";
import { Dialog, Toast } from "vant";

export default {
  name: "BuySubmit",
  data() {
    return {
      time: 0,
      title: "提交订单",
      routeName: "",
      orderMsg: {},
      timer: "",
      lastTime: 0
    };
  },
  computed: {
    accountType() {
      if (this.orderMsg.seller_account_type === 1) {
        return "支付宝";
      }
    }
  },
  // filters: {
  //   secTotime(time) {
  //     return secTotime(time);
  //   }
  // },
  created() {
    // 根据跳转进来路径不同 title不同
    const route = this.$store.state.business.appearBack;
    if (route === "GoBuy") {
      this.title = "提交订单";
      this.routeName = "GoBuy";
    } else if (route === "BusinessList") {
      this.title = "支付订单";
      this.routeName = "BusinessList";
    }
    // store中获取订单ID 请求订单详情
    this.order_id = this.$store.state.business.businessPayId;
    this.getData();
  },
  components: {
    TopHead
  },
  beforeDestory() {
    clearInterval(this.timer);
  },
  destroyed() {
    clearTimeout(this.timer);
  },
  methods: {
    goBack() {
      this.$router.replace({ name: this.routeName });
    },
    goPay() {
      Dialog.confirm({
        title: "确认支付",
        message: "请确认您已向卖方付款，恶意点击将被冻结账号。"
      })
        .then(() => {
          let params = {
            trans_order_id: this.order_id
          };
          businessPaySure(this.$resultParams(params))
            .then(res => {
              if (res.code === 200) {
                this.$store.dispatch("changeBusinessPaySuccess", res.data);
                this.$router.replace("/givebeans");
              } else {
                Toast(res.msg);
              }
            })
            .catch(err => {
              console.log(err);
            });
        })
        .catch(() => {
          // on cancel
        });
    },
    getData() {
      let params = {
        trans_order_id: this.order_id
      };
      businessPayDetail(this.$resultParams(params))
        .then(res => {
          if (res.code === 200) {
            this.orderMsg = res.data;
            this.time = res.data.expiration_second;
            this.lastTime = new Date() - 0;
            this.timer = setInterval(this.changeTime, 1000);
          } else {
            Dialog.alert({
              message: res.msg
            }).then(() => {
              this.changeTime();
            });
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    goCancle() {
      let params = {
        trans_order_id: this.order_id
      };
      businessCancleOrder(this.$resultParams(params))
        .then(res => {
          if (res.code === 200) {
            let bs = this.$store.state.business.buyBusiness;
            bs.sale_num = parseInt(bs.sale_num) + parseInt(this.orderMsg.num);
            this.$store.dispatch("buyBusinessMsg", bs);

            this.$router.replace({ name: this.routeName });
          } else {
            Toast(res.msg);
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    changeTime() {
      let dt = new Date() - 0 - this.lastTime;
      this.lastTime = new Date() - 0;
      if (dt > 1500) {
        this.time = this.time - parseInt(dt / 1000);
      } else {
        this.time -= 1;
      }
      if (this.time < 0) {
        this.time = 0;
        clearInterval(this.timer);
        this.$router.replace({ name: this.routeName });
      }
    },
    copyText(text) {
      var textarea = document.createElement("input"); //创建input对象

      document.body.appendChild(textarea); //添加元素
      textarea.value = text;
      textarea.style.fontSize = "32px";
      textarea.style.position = "absolute";
      textarea.style.top = "-50px";
      textarea.style.left = "-50px";
      textarea.select();
      if (textarea.setSelectionRange) {
        textarea.setSelectionRange(0, textarea.value.length);
      }
      try {
        var flag = document.execCommand("copy"); //执行复制
      } catch (eo) {
        var flag = false;
      }
      document.body.removeChild(textarea); //删除元素
      // window.scrollTo({ top: 0, left: 0, behavior: "smooth" })
      Toast("复制成功");
      return flag;
    }
  }
};
</script>
<style lang="less" scoped src="../../assets/css/style.less">
</style>


