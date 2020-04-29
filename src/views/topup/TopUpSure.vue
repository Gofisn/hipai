<template>
  <div class="TopUp">
    <div class="TopHeader">
      <div class="back" @click="backClick">
        <span></span>
      </div>
      <span>TopUp</span>
    </div>
    <div class="title_notice">THIS IS A SECURE TRANSACTION</div>
    <div class="topup_main" v-show="methods==0">
      <div class="card_box">
        <div class="one">
          <div class="bank">
            <img src="../../assets/img/topup/topup_bank1.png" alt>
            <span>BCA</span>
          </div>
          <div class="c_1">Kode Pembayaran</div>
          <div class="c_2">-BERLAKU 24 jam-</div>
        </div>
        <div class="two">
          <div class="item">
            <div class="l">Total Pembayaran：</div>
            <div class="r red">IDR 10,000.00</div>
          </div>
          <div class="item">
            <div class="l">Nomor Pesanan：</div>
            <div class="r">20202020332344404</div>
          </div>
          <div class="item">
            <div class="l">Pedagang：</div>
            <div class="r">washmashine</div>
          </div>
        </div>
      </div>
      <div class="sort_box">
        <div class="sc_1">Klik utk salin kode VA</div>
        <div class="btn">Salin kode VA ke papan klip</div>
      </div>
    </div>
    <div class="topup_main" v-show="methods==1">
      <div class="card_box">
        <div class="one">
          <div class="bank">
            <img src="../../assets/img/topup/topup_bank1.png" alt>
            <span>BCA</span>
          </div>
          <div class="t">Total Pembayaran</div>
          <div class="num">IDR 10,000,00</div>
        </div>
        <div class="two">
          <div class="item">
            <div class="l">Nomor Pesanan：</div>
            <div class="r">20202020332344404</div>
          </div>
          <div class="item">
            <div class="l">Pedagang：</div>
            <div class="r">washmashine</div>
          </div>
        </div>
      </div>
      <div class="sort_box">
        <div class="input">
          <input type="number" placeholder="Masukkan Nomor Ponsel">
        </div>
        <div class="btn">Lanjutkan ke DANA</div>
        <div class="sc_2">Dengan klik“Tombol”,Anda setuju dengan Wayangpay</div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "TopUpSure",
  data() {
    return {
      chooseType: 0,
      methods: 1
    };
  },
  methods: {
    backClick() {
      this.$router.go(-1);
    }
  }
};
</script>
<style lang="less" scoped src="../../assets/css/topup.less"></style>
