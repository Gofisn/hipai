<template>
  <div class="AdOne">
    <top-head title="Perkenalan Cara Bermain" @leftClick="goBack"></top-head>
    <div class="main_cnt">
      
      <img class="hd" src="../../assets/img/ad/one_hd.png" alt="" />
      <div class="cnt_one">
        Kamu bisa membuat atau bergabung dengan grup untuk mendapatkan skor
        keaktifan. Skor ini bisa menghasilkan Hi-Koin secara otomatis. Jual
        seluruh Hikoin di Pusat Transaksi dan hasilkan uang
      </div>
      <div class="cnt_two">
        Semakin banyak undang teman, Skor keaktifan semakin tinggi. Skor ini
        bisa menghasilkan Hi-Koin secara otomatis. Jual seluruh Hikoin di Pusat
        Transaksi dan hasilkan uang
      </div>
      <div class="coin1">
        <img src="../../assets/img/ad/coin1.png" alt="" />
      </div>
      <div class="coin2">
        <img src="../../assets/img/ad/coin2.png" alt="" />
      </div>
      <div class="f1">
        <img src="../../assets/img/ad/f1.png" alt="" />
      </div>
      <div class="f2">
        <img src="../../assets/img/ad/f2.png" alt="" />
      </div>
    </div>
    <!-- <div class="img">
      <img src="../../assets/img/ad_one.png" alt="">
    </div> -->
  </div>
</template>
<script>
import TopHead from "@/components/TopHead";

export default {
  name: "ShAdOneare",
  data() {
    return {};
  },
  components: {
    TopHead
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
    }
  }
};
</script>

<style lang="less" scoped src="../../assets/css/ad.less"></style>
