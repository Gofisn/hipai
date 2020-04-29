<template>
  <div class="RechargeList">
    <top-head title="Riwayat Transaksi" @leftClick="goBack"></top-head>
    <van-pull-refresh v-model="loading" @refresh="refresh">
      <van-list
        :offset="10"
        v-model="loading"
        :finished="finished"
        :finished-text="historyText"
        @load="getData"
        v-show="historyList.length||finished"
        class="list_box"
      >
        <div class="item" v-for="item in historyList" :key="item.order_id">
            <div class="tt">
                Rp coin Terbeli(Buah) <span>+{{item.gold_amount|numFormatD}}</span>
                </div>
            <div class="td">
                Isi UlangVia：<span>{{item.pay_type_text}}</span>
            </div>
             <div class="td">
                Isi Ulang(Rp)：<span>{{item.pay_price|numFormatD}}</span>
            </div>
             <div class="td">
                Waktu：<span>{{item.pay_time}}</span>
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
import { rechargeList } from "utils/ajax.js";
import Vue from "vue";
import { Toast, List, PullRefresh } from "vant";
Vue.use(Toast)
  .use(List)
  .use(PullRefresh);
export default {
  name: "RechargeList",
  data() {
    return {
      page: 1,
      page_size: 30,
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
      if (this.historyList.length < 6) {
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
        page_size: this.page_size
      };
      this.loading = true;
      rechargeList(this.$resultParams(params))
        .then(res => {
          this.loading = false;
          if (res.code === 200) {
            if (res.data.data.length) {
              this.historyList = this.historyList.concat(res.data.data);
              if (res.data.total <= this.historyList.length) {
                this.finished = true;
              }
              this.page = parseInt(res.data.current_page) + 1;
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

<style lang="less" scoped src="../../assets/css/account.less">
</style>