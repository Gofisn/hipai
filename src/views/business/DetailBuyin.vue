<template>
  <div class="BusinessDetail DetailSalein">
    <top-head title=" " @leftClick="goBack" rightMsg></top-head>
    <div class="top">
      <div class="img_box">
        <img src="../../assets/img/no_btn.png" alt>
      </div>
      <div class="result_title">Belum selesai</div>
      <div class="result_sub"> Transaksi masih belum selesai</div>
    </div>
    <div class="title_line">Detail transaksi</div>
    <div class="main">
      <div class="item">
        <span class="name">Nomor transaksi</span>
        <span class="num">{{orderDetail.order_no}}</span>
      </div>
      <div class="item">
        <span class="name">Jumlah sisa Hi-Koin</span>
        <span class="num">{{orderDetail.need_num|numFormatD}} buah</span>
      </div>
      <div class="item">
        <span class="name">Harga</span>
        <span class="num">Rpc{{orderDetail.price|numFormatD}}/buah</span>
      </div>
      <div class="item">
        <span class="name">Peluang penghasilan</span>
        <span class="num">Rpc{{orderDetail.need_num*1000000*1000000*orderDetail.price/1000000/1000000}}</span>
      </div>
    </div>
    <div class="submit" @click="goApplyDown">Batalkan transaksi</div>
  </div>
</template>
<script>
import TopHead from "@/components/TopHead";
import { getRecycleDetail, recycleApplyDown } from "utils/ajax";
import { parseMoney, parseMoneyD } from "utils/money";
import { Toast,Dialog } from "vant";
import Vue from "vue";
Vue.use(Toast);
export default {
  name: "DetailSalein",
  data() {
    return {
      orderDetail: {}
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
      };
      getRecycleDetail(this.$resultParams(param))
        .then(res => {
          if (res.code === 200) {
            this.orderDetail = res.data.order_item;
          } else {
            Toast(res.msg);
          }
        })
        .catch(err => {
          console.log(err);
        });
    },

    goApplyDown() {
      let params = {
        recycle_order_id: this.$route.query.id
      };
      recycleApplyDown(this.$resultParams(params))
        .then(res => {
          Toast(res.msg)
          if (res.code === 200) {
            this.goBack();
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

