<template>
  <div class="CashoutList">
    <top-head title="Riwayat Penarikan" @leftClick="goBack"></top-head>
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
            Jumlah Rp coin 
            <span>{{item.use_gold}}</span>
          </div>
          <div class="td">
           Pilih Bank：
            <span>{{item.bank_name}}</span>
          </div>
          <div class="td">
            Jumah Penarikan(Rp)：
            <span>{{item.amount}}</span>
          </div>
          <div class="td">
            Waktu：
            <span>{{item.create_time}}</span>
          </div>
          <div class="td">
            Status：
            <span :class="'color'+item.status">{{item.status_text}}</span>
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
import { cashoutList } from "utils/ajax.js";
import Vue from "vue";
import { Toast, List, PullRefresh } from "vant";
Vue.use(Toast)
  .use(List)
  .use(PullRefresh);
export default {
  name: "CashoutList",
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
        page: this.page
      };
      this.loading = true;
      cashoutList(this.$resultParams(params))
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

<style lang="less" scoped src="../../assets/css/account.less">
</style>