<template>
  <div class="PhoneBill">
    <div class="head_box">
      <div class="topbar">
        <div class="left" @click="backClick">
          <span></span>
        </div>
        <div class="title">Tukar Pulsa</div>
      </div>
      <!-- <div class="yesterday">Harga Kemarin：{{ price }}Rpc/Hi-Kion</div> -->
      <div class="cont_box">
        <span class="phone_icon"></span>
        <div class="input_box">
          <input
            type="number"
            v-model="phone"
            @input="phoneBlur"
            placeholder="Silahkan masukan nomor handphone"
          >
        </div>
      </div>
    </div>

    <div class="account_main_box">
      <div class="c_n">
        Operator:
        <span class="ope">{{ operator }}</span>
      </div>
      <div class="c_i">
        <span>Pulsa：</span>
        <span class="num">Rp{{ info.rp }}</span>
      </div>
      <div class="c_i">
        <span>Hikoin yang terpakai:</span>
        <span class="num">{{ info.bean }}</span>
      </div>
      <div
        class="s_b"
        :class="operator ? 'active' : ''"
        @click="operator ? (bill_show = true) : (bill_show = false)"
      >Tukar</div>
    </div>
    <div class="bill_mask" v-show="bill_show">
      <div class="bill_box">
        <div class="bill_title">Rp{{ info.rp }}</div>
        <div class="bill_sub">Tukar Pulsa</div>
        <div class="phone">Nomor Handphone：{{ phone }}</div>
        <div class="sure_btn" @click="billSure">Tukar</div>
      </div>
      <div class="close_btn" @click="bill_show = false"></div>
    </div>
  </div>
</template>
<script>
import { shopPhoneBill, shopBeanPrice, shopExchange } from "utils/ajax";
import { randomString } from "utils/tools";

import { Toast, Dialog } from "vant";
import Vue from "vue";
Vue.use(Dialog);
export default {
  name: "PhoneBill",
  data() {
    return {
      bill_show: false,
      phone: null,
      price: null,
      operator: null,
      shopInfo: {},
      last_phone: null,
      amount: "",
      info: {}
    };
  },
  created() {
    this.shopInfo = this.$store.state.shopInfo;
    this.amount = this.shopInfo.recharge_amount;
    // this.getBeanPrice();
  },
  methods: {
    backClick() {
      this.$router.back(-1);
    },
    phoneBlur() {
      // 请求接口获取运营商信息
      // 前四位改变的时候要获取接口
      if (this.phone.length >= 4) {
        if (this.phone.substring(0, 4) !== this.last_phone) {
          this.last_phone = this.phone.substring(0, 4);
          let params = {
            key: "shop-goods-phone-" + randomString(),
            phone: this.phone,
            amount: this.amount,
            hideloading: true
          };
          shopPhoneBill(this.$resultParams(params))
            .then(res => {
              if (res.code === 200) {
                this.operator = res.data.operator;
                this.info = res.data.productInfo;
              } else {
                this.operator = null;
                this.last_phone = null;
                Toast(res.msg);
              }
            })
            .catch(err => {
              this.operator = null;
              this.last_phone = null;
              Toast(res.msg);
              console.log(err);
            });
        }
      } else {
        this.operator = null;
        this.last_phone = null;
        this.info = {};
      }
    },
    getBeanPrice() {
      let params = {
        key: "shop-bean-price-" + randomString()
      };
      shopBeanPrice(this.$resultParams(params))
        .then(res => {
          if (res.code === 200) {
            this.price = res.data.ratio;
          } else {
            Toast(res.msg);
          }
        })
        .catch(err => {
          console.log(err);
        });
    },

    billSure() {
      let params = {
        goods_id: this.shopInfo.id,
        num: 1,
        phone: this.phone,
        item_key: this.info.item_key,
        item_bean: this.info.bean
      };
      shopExchange(this.$resultParams(params))
        .then(res => {
          if (res.code === 200) {
            Dialog.alert({
              message: `Top up berhasil. Proses kurang lebih 3 hari kerja untuk masuk ke akun Anda`,
              confirmButtonText: "OK"
            }).then(() => {
              this.$store.dispatch("changeShopInfo", {});
              this.$router.push("/shop");
            });
          } else if (res.code == 41108) {
            // 嗨豆不足 跳到交易所购买嗨豆
            Dialog.confirm({
              cancelButtonText: "Batalkan",
              confirmButtonText: "Beli Hi-Koin",
              message: "Saldo Hi-Koin Anda tidak cukup"
            })
              .then(() => {
                this.$getSystemInfoFromApp("h5Business", "", true);
              })
              .catch(() => {
                // on cancel
              });
          } else if (res.code === 20009) {
            //活跃度不足
            Dialog.confirm({
              cancelButtonText: "Batalkan",
              confirmButtonText: "Niakkan Skor",
              message: `Skor Anda kurang dari ${
                res.data.activity_limit
              }, tidak bisa melakukan penukaran pulsa`
            })
              .then(() => {
                this.$store.dispatch("changeRouteFrom", "/phone-bill");
                this.$store.dispatch("changeSkorNeedInfo", res.data);
                this.$router.push("/skornone");
              })
              .catch(() => {
                // on cancel
              });
          } else if (res.code === 47011) {
            Dialog.confirm({
              cancelButtonText: "batal",
              confirmButtonText: "mulai",
              message:
                "Anda harus selesaikan verifikasi wajah untuk melanjutkan"
            })
              .then(() => {
                Vue.prototype.$getSystemInfoFromApp("goVerifiedYn");
              })
              .catch(() => {
                // on cancel
              });
          }  else {
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
<style lang="less" src="../../assets/css/shop.less"></style>
