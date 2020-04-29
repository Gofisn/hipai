<template>
  <div class="Account">
    <div class="head_box">
      <div class="topbar">
        <div class="left" @click="backClick">
          <span></span>
        </div>
        <!-- <span class="right" @click="rightClick">Tukar dana</span> -->
        <div class="title">Top Up</div>
      </div>
      <div class="cont_box">
        <div class="bean_num">
          <div>Rp coin (Rpc)</div>
          <div class="count">{{gold_amount|numFormatD}}</div>
        </div>
        <div class="btn_box">
          <div @click="goList" class="item">
            <img src="../../assets/img/rp_icon.png" alt>
            <div>Riwayat Transaksi</div>
          </div>
        </div>
      </div>
    </div>
    <div class="account_title">Silakan pilih Nominalnya</div>
    <div class="account_main_box">
      <div class="money_box">
        <div
          class="money_item"
          v-for="item in product_list"
          :class="choose_product.price==item.price?'active':''"
          :key="item.price"
          @click="choose_product=item"
        >Rp.{{item.price|numFormatD}}</div>
      </div>
      <div class="diamond_not">
        Rp coin yang didapat
        <span>Rpc{{choose_product.gold|numFormatD}}</span>
      </div>
      <div class="buy_btn" @click="goBuy">Beli</div>
    </div>

    <!-- <div class="bank_mask" v-show="bank_show">
      <div class="bank_box">
        <div class="bank_title">Transaksi Via</div>
        <div class="bank_list">
          <div
            class="item"
            v-for="item in bank_list"
            :key="item.key"
            :class="method==item.key?'active':''"
            @click="method=item.key"
          >{{item.bankCode}}</div>
        </div>
        <div class="sure_btn" @click="rechargeSure">Tentukan</div>
      </div>
      <div class="close_btn" @click="bank_show=false"></div>
    </div>-->
  </div>
</template>
<script>
import { rechargeInfo, getRechargeCode } from "utils/ajax";
import { Toast, Dialog } from "vant";
export default {
  name: "Account",
  data() {
    return {
      gold_amount: 0,
      product_list: [],
      bank_list: [],
      choose_product: {},
      bank_show: false,
      method: null
    };
  },
  created() {
    this.getRechargeInfo();
  },
  methods: {
    backClick() {
      let from = this.$store.state.routeFrom;
      if (from) {
        this.$store.dispatch("changeRouteFrom", "");
        this.$router.replace(from);
      } else {
        this.$getSystemInfoFromApp("closeWebPage");
      }
    },
    rightClick() {
      // 提现
      this.$router.push("/cashout");
    },
    getRechargeInfo() {
      rechargeInfo({})
        .then(res => {
          if (res.code === 200) {
            this.bank_list = res.data.bank_list;
            this.product_list = res.data.product_list;
            this.gold_amount = res.data.gold_amount;
          } else {
            Toast(res.msg);
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    goBuy() {
      // if (this.choose_product.price) {
      //   this.bank_show = true;
      // }
      this.$store.dispatch("changeRechargeInfo", {
        price: this.choose_product.price
      });
      this.$router.push("/topup");
    },
    rechargeSure() {
      if (this.method) {
        if (this.method == "12") {
          this.$store.dispatch("changeRechargeInfo", {
            price: this.choose_product.price,
            method: this.method
          });
          this.$router.push("/ovo");
        } else {
          let params = {
            price: this.choose_product.price,
            method: this.method
          };
          getRechargeCode(this.$resultParams(params))
            .then(res => {
              if (res.code === 200) {
                this.$store.dispatch("changeRechargeInfo", {
                  price: this.choose_product.price,
                  method: this.method,
                  code: res.data.code
                });
                if (this.method == "11") {
                  this.$router.push("/dana");
                } else {
                  this.$router.push("/recharge");
                }
              } else {
                Toast(res.msg);
              }
            })
            .catch(err => {
              console.log(err);
            });
        }
      }
    },
    goList() {
      // 充值记录
      this.$router.push("/reg-list");
    }
  }
};
</script>
<style lang="less"  src="../../assets/css/account.less">
</style>

