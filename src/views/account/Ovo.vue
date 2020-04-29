<template>
  <div class="Ovo">
    <top-head title="ovo" @leftClick="goBack"></top-head>
    <div class="count">
      <input v-model.trim="value" type="text" placeholder="Silahkan masukan akun OVO Anda">
    </div>
    <div class="main_cnt">
      <ul>
        <li>Silahkan masukan akun OVO Anda</li>
        <li>Klik "Bayar"</li>
        <li>Jika sudah klik "Bayar"maka akan otomatis ke halaman pembayaran OVO, Jika Anda belum punya aplikasi OVO, silahkan unduh OVO terlebih</li>
      </ul>
    </div>
    <div @click="goOvo" class="btn" :class="canSubmit?'active':''">Bayar</div>
  </div>
</template>
<script>
import TopHead from "@/components/TopHead";
import { getRechargeCode } from "utils/ajax";
import { Toast, Dialog } from "vant";

export default {
  name: "Ovo",
  data() {
    return {
      value: "",
      recharge_info: {}
    };
  },
  components: {
    TopHead
  },
  created() {
    this.recharge_info = this.$store.state.rechargeInfo;
    window.alertPayWindow = this.alertC;
  },
  computed: {
    canSubmit() {
      var reg = /(^\w[-\w.+]*@([A-Za-z0-9][-A-Za-z0-9]+\.)+[A-Za-z]{2,14}$)|(^[0-9]{1,}$)/;
      return reg.test(this.value);
    }
  },
  methods: {
    goBack() {
      this.$router.back(-1);
    },
    goOvo() {
      if (this.canSubmit) {
        let params = {
          price: this.recharge_info.price,
          method: this.recharge_info.method,
          mobile: this.value
        };
        getRechargeCode(this.$resultParams(params))
          .then(res => {
            if (res.code === 200) {
              this.$getSystemInfoFromApp("launchBrowser", res.data.code, true);
            } else {
              Toast(res.msg);
            }
          })
          .catch(err => {
            console.log(err);
          });
      }
    },
    alertC() {
      Dialog.alert({
        message: `Pembayaran akan di terima oleh sistem dengan jeda beberapa menit, Jika pembayaran berhasil bisa melihat di riwayat transaksi `,
        confirmButtonText: "ok"
      })
        .then(() => {
          this.$router.push("/account");
        })
        .catch(() => {});
    }
  }
};
</script>
<style lang="less"  src="../../assets/css/account.less">
</style>


