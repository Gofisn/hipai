<template>
  <div class="BusinessDetail DetailSuccess">
    <top-head title=" " @leftClick="goBack" rightMsg></top-head>
    <div class="top">
      <div class="img_box">
        <img src="../../assets/img/yes_btn.png" alt>
      </div>
      <div class="result_title">Berhasil</div>
      <div class="result_sub">Transaksi telah berhasil</div>
    </div>
    <div class="title_line">Detail transaksi</div>
    <div class="main">
      <div class="item">
        <span class="name">Nomor transaksi</span>
        <span class="num">{{orderDetail.order_no}}</span>
      </div>
      <div class="item" v-if="role_for_order=='buyer'">
        <span class="name">Penjual</span>
        <span class="num">{{orderDetail.seller_username}}</span>
      </div>
      <div class="item" v-else>
        <span class="name">Pembeli</span>
        <span class="num">{{orderDetail.buyer_username}}</span>
      </div>
      <div class="item">
        <span class="name">Jumlah Hi-Koin</span>
        <span class="num">{{orderDetail.num|numFormatD}} buah</span>
      </div>
      <div class="item">
        <span class="name">Harga</span>
        <span class="num">Rpc{{orderDetail.price|numFormatD}}/buah</span>
      </div>
      <div class="item">
        <span class="name">Harga jual</span>
        <span class="num">Rpc{{orderDetail.total_money|numFormatD}}</span>
      </div>
    </div>
  </div>
</template>
<script>
import TopHead from "@/components/TopHead";
import { businessDetail } from "utils/ajax";
import { Toast } from "vant";
import Vue from "vue";
Vue.use(Toast);
export default {
  name: "DetailSuccess",
  data() {
    return {
      orderDetail: {},
      role_for_order: "",
    };
  },
  created() {
    this.getDetail();
  },
  components: {
    TopHead
  },
  computed: {
    frozenTime() {
      //冻结时间 秒
      let config = this.$store.state.business.businessConfig;

      if (config && config.buyConf) {
        return parseFloat(config.buyConf.auto_draw_account_frozen_second);
      } else {
        return 24 * 60 * 60;
      }
    }
  },
  methods: {
    goBack() {
      this.$router.replace({ name: this.$store.state.business.appearBack });
    },
    getDetail() {
      let param = {
        order_id: this.$route.query.id,
        is_sales_ing: 0
      };
      businessDetail(this.$resultParams(param))
        .then(res => {
          if (res.code === 200) {
            this.role_for_order = res.data.role_for_order;
            this.orderDetail = res.data.order_item;
          } else {
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
<style lang="less" scoped src="../../assets/css/business.less">
</style>

