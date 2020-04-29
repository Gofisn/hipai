<template>
  <div class="ShopAddress">
    <top-head title="Alamat Penerima" @leftClick="goBack"></top-head>
    <div class="from">
      <div class="item">
        <div class="tt">Nama Penerima</div>
        <div class="td">
          <input type="text" v-model.trim="name" placeholder="Silahkan masukan nama penerima">
        </div>
      </div>
      <div class="item">
        <div class="tt">Nomor handphone</div>
        <div class="td">
          <input type="number" v-model.trim="phone" placeholder="Silahkan masukan nomor handphone">
        </div>
      </div>
      <div class="item">
        <div class="tt">Masukan Alamat</div>
        <div class="td">
          <textarea
            v-model.trim="inputText"
            ref="elememt"
            rows="2"
            @input="autoTextarea"
            placeholder="Silahkan masukan alamat penerima"
          ></textarea>
        </div>
      </div>
      <div class="item stp">
        <span class="tt">Jumlah tukar</span>
        <van-stepper v-model="value" :max="shopInfo.num"/>
      </div>
    </div>
    <div class="submit_btn" :class="cansubmit?'active':''" @click="goShop">Tukar</div>
  </div>
</template>
<script>
import TopHead from "@/components/TopHead";
import { shopExchange } from "utils/ajax";

import Vue from "vue";
import { Stepper, Dialog, Toast } from "vant";
Vue.use(Stepper).use(Dialog);
export default {
  name: "ShopAddress",
  data() {
    return {
      name: "",
      phone: "",
      inputText: "",
      value: 1,
      shopInfo: {}
    };
  },
  created() {
    this.shopInfo = this.$store.state.shopInfo;
  },
  components: {
    TopHead
  },
  computed: {
    cansubmit() {
      if (this.name && this.phone && this.inputText && this.value) {
        return true;
      } else {
        return false;
      }
    }
  },
  methods: {
    goBack() {
      this.$router.back(-1);
    },
    autoTextarea(e) {
      e.target.style.height = "20px";
      e.target.style.height = e.target.scrollHeight + "px";
    },
    goShop() {
      if (this.cansubmit) {
        // 判断选择的数量是否超过已有数量
        if (this.value > this.shopInfo.num) {
          Dialog.alert({
            message: `Hi-Koin kamu tersisa ${
              this.shopInfo.num
            }, silahkan ubah jumlah penukaran dan melakukan penukaran ulang`,
            confirmButtonText: "OK"
          }).then(() => {});
        } else {
          let params = {
            goods_id: this.shopInfo.id,
            num: this.value,
            phone: this.phone,
            addressee: this.name,
            address: this.inputText
          };
          shopExchange(this.$resultParams(params))
            .then(res => {
              if (res.code === 200) {
                this.$store.dispatch("changeShopInfo", {});
                this.$router.push("/shop");
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
              } else {
                Toast(res.msg);
              }
            })
            .catch(err => {
              console.log(err);
            });
        }
      }
    }
  }
};
</script>
<style lang="less"  src="../../assets/css/shop.less">
</style>
