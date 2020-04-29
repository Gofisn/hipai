<template>
  <div class="Dana">
    <top-head title="Dana" @leftClick="goBack"></top-head>
    <div class="main_cnt">
      <ul>
        <li>Copy URL address dan buka di crome</li>
        <li>Masuk ke akun Dana Anda untuk melakukan pembayaran</li>
        <li>Ketika pembayaran berhasil, sistem akan menerima pembayaran Anda dalam beberapa menit</li>
      </ul>
    </div>
    <div @click="goOvo" class="btn active">Bayar</div>
  </div>
</template>
<script>
import TopHead from "@/components/TopHead";
import { getRechargeCode } from "utils/ajax";
import { Toast, Dialog } from "vant";

export default {
  name: "Dana",
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
  methods: {
    goBack() {
      this.$router.back(-1);
    },
    goOvo() {
      this.$getSystemInfoFromApp(
        "launchBrowser",
        this.recharge_info.code,
        true
      );
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


