<template>
  <div class="ShopList">
    <top-head title="Riwayat Penukaran" @leftClick="goBack"></top-head>
    <van-pull-refresh v-model="loading" @refresh="refresh">
      <van-list
        :offset="10"
        v-model="loading"
        :finished="finished"
        :finished-text="historyText"
        @load="getData"
        v-show="historyList.length&&finished"
        class="list_box"
      >
        <div class="item" v-for="item in historyList" :key="item.order_id">
          <div class="li">
            <span class="tt">Item：</span>
            <span class="th">{{item.goods_name}}</span>
          </div>
          <div class="li">
            <span class="tt">Jumlah Tukar：</span>
            <span class="td">{{item.exchange_num}}</span>
          </div>
          <div class="line"></div>
          <div class="li">
            <span class="tt">Nomor Handphone：</span>
            <span class="td">{{item.phone}}</span>
          </div>

          <div v-show="item.goods_type=='2'">
            <div class="li">
              <span class="tt">Penerima：</span>
              <span class="td">{{item.addressee}}</span>
            </div>
            <div class="li">
              <span class="tt">Alamat Penerima：</span>
              <span class="td">{{item.address}}</span>
            </div>
          </div>
          <div class="li">
            <span class="tt">Nomor Transaksi：</span>
            <span class="td">{{item.out_trade_no}}</span>
          </div>
          <div class="li">
            <span class="tt">Status：</span>
            <span class="td">{{item.status}}</span>
            <span class="ttime">{{item.create_time}}</span>
          </div>

        </div>
      </van-list>
      <div v-show="!historyList.length&&finished" class="nolist">
        <img src="../../assets/img/beans_no.png" alt>
        <div class="cont">Sementara tidak ada data</div>
      </div>
    </van-pull-refresh>
  </div>
</template>
<script>
import TopHead from "@/components/TopHead";
import { shopList } from "utils/ajax";
import { randomString } from "utils/tools";

import Vue from "vue";
import { Toast, List, PullRefresh } from "vant";
Vue.use(Toast)
  .use(List)
  .use(PullRefresh);
export default {
  name: "ShopList",
  data() {
    return {
      page: 1,
      historyList: [],
      loading: false,
      finished: false
    };
  },
  components: {
    TopHead
  },
  created() {
    this.getData();
  },
  computed: {
    historyText() {
      if (this.historyList.length < 5) {
        return "";
      } else {
        return "Tidak ada tampilan lagi";
      }
    }
  },
  methods: {
    goBack() {
      this.$router.back(-1);
    },
    getData() {
      let params = {
        page: this.page,
        key: "shop-order-" + randomString()
      };
      this.loading = true;
      shopList(this.$resultParams(params))
        .then(res => {
          this.loading = false;
          if (res.code === 200) {
            if (res.data.list.length) {
              this.historyList = this.historyList.concat(res.data.list);
              if (res.data.total <= this.historyList.length) {
                this.finished = true;
              }
              this.page = this.page + 1;
            } else {
              this.finished = true;
            }
          } else {
            this.finished = true;
            Toast(res.msg);
          }
        })
        .catch(err => {
          this.loading = false;
          this.finished = true;
          console.log(err);
        });
    },
    refresh() {
      this.page = 1;
      this.finished = false;
      this.historyList = [];
      this.getData();
    }
  }
};
</script>
<style lang="less"  src="../../assets/css/shop.less">
</style>
