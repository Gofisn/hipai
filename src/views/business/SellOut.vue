<template>
  <div class="SellOut">
    <div class="title">卖出嗨豆数量(个)</div>
    <div class="stepper_box">
      <stepper
        :min="min"
        :max="parseInt(userInfo.effective_bean)"
        :step="1"
        @input="stepper_change"
      ></stepper>
    </div>
    <div class="subTit">(可出售{{userInfo.effective_bean|numFormat}}个)</div>
    <div class="title">出售单价(元)</div>
    <div class="price">
      <input type="text" placeholder="请输入价格" v-model="price" @input="priceInput">
    </div>
    <div class="subTit">手续费扣除{{percentRate}}卖出的嗨豆</div>
    <div class="submit" :class="{active:canSubmit}" @click="submitClick">提交订单</div>
  </div>
</template>
<script>
import Stepper from "@/components/Stepper";
import { goSellOut } from "utils/ajax";
import { Toast, Dialog } from "vant";

export default {
  name: "SellOut",
  data() {
    return {
      value: 10,
      price: "",
      inputstepper: false
      // min: 2,
      // rate: 0.8, //税率
      // userInfo: {}
    };
  },
  computed: {
    userInfo() {
      return this.$store.state.userInfo;
    },
    min() {
      var config = this.$store.state.business.businessConfig;
      if (config && config.saleConf) {
        return parseFloat(config.saleConf.min_num);
      } else {
        return 10;
      }
    },
    rate() {
      var config = this.$store.state.business.businessConfig;
      if (config && config.saleConf) {
        return parseFloat(config.saleConf.fee_rate);
      } else {
        return 0.1;
      }
    },
    canSubmit() {
      if (parseFloat(this.price) > 0 && this.value) {
        return true;
      } else {
        return false;
      }
    },
    percentRate() {
      if (this.rate === 0) {
        return 0;
      } else {
        let str = Number(this.rate * 100).toFixed();
        str += "%";
        return str;
      }
    }
  },
  methods: {
    priceInput(e) {
      this.price = e.target.value.match(/^\d*(\.?\d{0,2})/g)[0];
    },
    stepper_change(value) {
      this.value = value;
    },
    submitClick() {
      if (this.canSubmit) {
        if (parseFloat(this.price) < 0.01) {
          Toast("价格不能少于1分钱");
        } else if (parseFloat(this.price) > 9999999) {
          Toast("价格不能大于" + 9999999);
        } else if (this.value < this.min) {
          Toast("数量不能少于" + this.min);
        } else {
          let param = {
            num: this.value,
            price: parseFloat(this.price)
          };
          goSellOut(this.$resultParams(param))
            .then(res => {
              if (res.code === 200) {
                this.$store.dispatch("businessSellOutOrder", res.data);
                this.$router.replace({ name: "SellResult" });
              } else if (res.code === 10002) {
                Dialog.confirm({
                  message: "&nbsp;<br/>卖出嗨豆需完成实名认证。<br/>&nbsp;"
                })
                  .then(() => {
                    this.$getSystemInfoFromApp("startVerifiedPage");
                  })
                  .catch(() => {});
              } else {
                var order = {
                  sale_num: Math.round(this.value * (1 - this.rate)),
                  num: this.value,
                  price: parseFloat(this.price) * 100,
                  errorMsg: res.msg,
                  error: true
                };
                this.$store.dispatch("businessSellOutOrder", order);
                this.$router.replace({ name: "SellResult" });
              }
            })
            .catch(err => {
              var order = {
                sale_num: Math.round(this.value * (1 - this.rate)),
                num: this.value,
                price: parseFloat(this.price) * 100,
                error: true
              };
              this.$store.dispatch("businessSellOutOrder", order);
              this.$router.replace({ name: "SellResult" });
            });
        }
      }
    }
  },
  components: {
    Stepper
  }
};
</script>

<style lang="less" scoped src="../../assets/css/style.less">
</style>
