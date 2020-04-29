<template>
  <div class="RecycleInput">
    <top-head title="Beli" @leftClick="goBack"></top-head>

    <div class="sell_title">Jumlah Beli</div>
    <div class="sell_item price">
      <input type="number" :placeholder="placeholder" v-model.number="value" @input="valueInput">
      <span class="right">Hi-Koin</span>
    </div>
    <!-- <div class="subTit">Maximal jual {{ userInfo.effective_bean }} koin</div> -->
    <div class="sell_title">Harga jual</div>
    <div class="sell_item price">
      <input
        type="number"
        placeholder="Silahkan masukan harga beli"
        v-model.number="price"
        @input="priceInput"
      >
      <span class="right">Rpc</span>
    </div>
    <div class="subTit acv" v-show="max_advice">
      Harga yang kami sarankan adalah Rpc{{ min_advice }}-{{
      max_advice
      }}/Hi-Koin. Ayuk buruan lakukan transaksi.
    </div>
    <div class="submit" :class="{ active: canSubmit }" @click="submitClick">Beli</div>
    <!-- <div class="rate">Biaya admin transaksi {{ percentRate }}</div> -->
  </div>
</template>
<script>
import TopHead from "@/components/TopHead";

import { creatRecycle } from "utils/ajax";
import Vue from "vue";
import { Toast, Dialog } from "vant";
Vue.use(Toast).use(Dialog);
export default {
  name: "RecycleInput",
  data() {
    return {
      value: "",
      price: "",
      placeholder: ""

      // min: 2,
      // rate: 0.8, //税率
      // userInfo: {}
    };
  },
  mounted() {
    var config = this.$store.state.business.businessConfig;
    if (config && config.recycleConf) {
      this.placeholder = "Jumlah minimum (" + config.recycleConf.recycle_min_num + ")";
    }
  },
  components: {
    TopHead
  },
  computed: {
    userInfo() {
      return this.$store.state.userInfo;
    },
    min() {
      var config = this.$store.state.business.businessConfig;
      if (config && config.recycleConf) {
        this.placeholder = "Jumlah minimum (" + config.recycleConf.recycle_min_num + ")";
        return parseFloat(config.recycleConf.recycle_min_num);
      } else {
        return 10;
      }
    },
    rate() {
      var config = this.$store.state.business.businessConfig;
      if (config && config.recycleConf) {
        return parseFloat(config.recycleConf.fee_rate);
      } else {
        return 0.1;
      }
    },
    min_price() {
      var config = this.$store.state.business.businessConfig;
      if (config && config.recycleConf) {
        return parseFloat(config.recycleConf.recycle_min_price);
      } else {
        return 0.1;
      }
    },
    min_advice() {
      var config = this.$store.state.business.businessConfig;
      if (config && config.recycleConf) {
        return parseFloat(config.recycleConf.fast_area_min);
      } else {
        return 0.1;
      }
    },
    max_advice() {
      var config = this.$store.state.business.businessConfig;
      if (config && config.recycleConf) {
        return parseFloat(config.recycleConf.fast_area_max);
      } else {
        return 0.1;
      }
    },
    max_price() {
      var config = this.$store.state.business.businessConfig;
      if (config && config.recycleConf) {
        return parseFloat(config.recycleConf.recycle_max_price);
      } else {
        return 9999999;
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
    goBack() {
      this.$router.push("/wantbuy");
    },
    priceInput(e) {
      let num = parseFloat(e.target.value);
      if (num >= 0) {
        this.price = num.toFixed(2);
      } else {
        this.price = NaN;
      }
    },
    valueInput(e) {
      let num = parseFloat(e.target.value);
      if (num >= 0) {
        this.value = num.toFixed(4);
      } else {
        this.value = NaN;
      }
    },
    stepper_change(value) {
      this.value = value;
    },
    submitClick() {
      if (this.canSubmit) {
        console.log(this.value, this.userInfo.effective_bean);
        if (this.value < this.min) {
          // 最少出售多少个 4位
          Toast("Penjualan Hi-Koin tidak boleh kurang dari " + this.min);
        } else if (
          parseFloat(this.value) > parseFloat(this.userInfo.effective_bean)
        ) {
          // 只剩下xxx个嗨豆了
          Toast(
            "Masih tersedia " +
              this.userInfo.effective_bean +
              " Hi-Koin dapat dijual"
          );
        } else if (parseFloat(this.price) < this.min_price) {
          // 最小价格 2位
          Toast("Harga tidak bisa lebih rendah dari " + this.min_price);
        } else if (parseFloat(this.price) > this.max_price) {
          // 最大价格
          Toast("Harga tidak bisa lebih tinggi dari " + this.max_price);
        } else {
          var config = this.$store.state.business.businessConfig;
          if (
            config &&
            config.recycleConf &&
            parseFloat(config.recycleConf.fast_area_max) &&
            parseFloat(this.price) > parseFloat(config.recycleConf.fast_area_max)
          ) {
            // 大于指导价提示
            Dialog.confirm({
              cancelButtonText: "Ubah harga",
              confirmButtonText: "Lanjutkan",
              message:
                "Harga jual Hi-Koin terlalu tinggi, menyebabkan waktu terjual lebih lama ."
            })
              .then(() => {
                this.toSellOut();
              })
              .catch(() => {
                // on cancel
              });
          } else {
            this.toSellOut();
          }
        }
      }
    },
    toSellOut() {
      let param = {
        num: this.value,
        price: parseFloat(this.price)
      };
      creatRecycle(this.$resultParams(param))
        .then(res => {
          if (res.code === 200) {
            // this.$store.dispatch("businessSellOutOrder", res.data);
            // this.$router.push({ name: "SellResult" });
            this.$router.push("/sellout");
          } else if (res.code === 20009) {
            // 活跃度不足
            Dialog.confirm({
              cancelButtonText: "Batalkan",
              confirmButtonText: "Niakkan Skor",
              message: `Skor Anda kurang dari ${
                res.data.activity_limit
              }, tidak bisa jual Hi-Koin`
            })
              .then(() => {
                this.$store.dispatch("changeRouteFrom", "/wantbuy");
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
          Toast(res.msg);
        });
    }
  }
};
</script>

<style lang="less" scoped src="../../assets/css/business.less"></style>
