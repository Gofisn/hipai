<template>
  <div class="SellResult">
    <top-head title="Setuju" @leftClick="goBack" rightMsg></top-head>
    <div class="top">
      <div>
        <div class="img_box">
          <img src="../../assets/img/yes_btn.png" alt>
        </div>
        <div class="result_title">Transaksi berhasil</div>
      </div>
    </div>
    <div class="title_line">Detail transaksi</div>
    <div class="main">
      <div class="item">
        <span class="name">Nomor transaksi</span>
        <span class="num">{{orderDetail.order_no}}</span>
      </div>
      <div class="item">
        <span class="name">Hi-Koin terjual</span>
        <span class="num">{{orderDetail.sale_num}}buah</span>
      </div>
      <div class="item">
        <span class="name">Harga jual</span>
        <span class="num">Rpc{{orderDetail.price}}/buah</span>
      </div>
      <div class="item">
        <span class="name">Jumlah pemasukan</span>
        <span
          class="num"
        >Rpc{{parseFloat(orderDetail.price)*1000000*1000000*parseFloat(orderDetail.sale_num)/1000000/1000000}}</span>
      </div>
    </div>
    <div class="submit" @click="goBack">Kembali</div>
  </div>
</template>
<script>
import TopHead from "@/components/TopHead";
import { goSellOut } from "utils/ajax";
import { Toast } from "vant";
import Vue from "vue";
Vue.use(Toast);
export default {
  name: "SellResult",
  computed: {
    orderDetail() {
      let order = this.$store.state.business.sellOrder;
      console.log(order);
      return order;
    }
  },
  components: {
    TopHead
  },
  methods: {
    goBack() {
      this.$router.push("/sellout");
    }
  }
};
</script>
<style lang="less" scoped src="../../assets/css/business.less">
</style>

