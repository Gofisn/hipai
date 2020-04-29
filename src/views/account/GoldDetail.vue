<template>
  <div class="GoldDetail">
    <top-head title="Detail Rpc" @leftClick="goBack"></top-head>
    <van-pull-refresh v-model="loading" @refresh="refresh">
      <van-list
        :offset="10"
        v-model="loading"
        :finished="finished"
        :finished-text="historyText"
        @load="getData"
        v-show="historyList.length || finished"
        class="list_box"
      >
        <div class="list_item" v-for="item in historyList" :key="item.order_id">
          <div class="item tt">
            <span class="left">{{ item.from_title }}</span>
            <span
              class="right"
              :class="item.operation.substr(0, 1) == '-' ? 'b' : 'r'"
              >{{ item.operation }}</span
            >
          </div>
          <div class="item">
            <span class="left">{{ item.from_desc }}</span>
            <span class="right">{{ item.time }}</span>
          </div>
        </div>
      </van-list>
      <div v-show="!historyList.length && finished" class="nolist">
        <img src="../../assets/img/beans_no.png" alt />
        <div class="cont">Sementara tidak ada data</div>
      </div>
    </van-pull-refresh>
  </div>
</template>
<script>
import TopHead from "@/components/TopHead";
import { goldDetail } from "utils/ajax.js";
import Vue from "vue";
import { Toast, List, PullRefresh } from "vant";
Vue.use(Toast)
  .use(List)
  .use(PullRefresh);
export default {
  name: "GoldDetail",
  data() {
    return {
      page: 1,
      historyList: [],
      loading: false,
      finished: false,
      page_size: 20
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
      if (this.historyList.length < 10) {
        return "";
      } else {
        return "Tidak ada tampilan lagi";
      }
    }
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
    getData() {
      let params = {
        page: this.page,
        page_size: this.page_size
      };
      this.loading = true;
      goldDetail(this.$resultParams(params))
        .then(res => {
          this.loading = false;
          if (res.code === 200) {
            if (res.data.data.length) {
              this.historyList = this.historyList.concat(res.data.data);
              if (res.data.page_total <= this.page) {
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

<style lang="less" scoped src="../../assets/css/account.less"></style>
