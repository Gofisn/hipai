<template>
  <div class="PaySuccess">
    <top-head title="Detail Transaksi" @leftClick="goBack" rightMsg></top-head>

    <div v-if="back=='/wantbuy'">
      <div class="top">
        <div class="img_box">
          <img src="../../assets/img/yes_btn.png" alt>
        </div>
        <div class="result_title">Pembayaran berhasil</div>
        <div class="result_sub">Hi-Koin telah masuk ke akun Anda</div>
      </div>
      <div class="btns" @click="goBeanDetail">Lihat riwayat Hi-Koin</div>
      <div class="btns" @click="goBack">Beli lagi</div>
    </div>
    <div v-if="back=='/sellout'">
      <div class="top">
        <div class="img_box">
          <img src="../../assets/img/yes_btn.png" alt>
        </div>
        <div class="result_title">Pembayaran berhasil</div>
        <div class="result_sub">Hi-Koin telah masuk ke akun Anda</div>
      </div>
      <div class="btns" @click="goBeanDetail">Lihat riwayat Hi-Koin</div>
      <div class="btns" @click="goBack">jual lagi</div>
    </div>
  </div>
</template>
<script>
import TopHead from "@/components/TopHead";
export default {
  name: "PaySuccess",
  data() {
    return {
      back: ""
    };
  },
  components: {
    TopHead
  },
  created() {
    this.back = this.$store.state.routeFrom;
  },
  methods: {
    goBack() {
      let from = this.$store.state.routeFrom;
      if (from) {
        this.$store.dispatch("changeRouteFrom", "");
        this.$router.replace(from);
      } else {
        this.$getSystemInfoFromApp("closeWebPage");
      }
    },
    goBeanDetail() {
      this.$router.push("/beansdetail");
    }
  }
};
</script>
<style lang="less" scoped src="../../assets/css/business.less">
</style>

