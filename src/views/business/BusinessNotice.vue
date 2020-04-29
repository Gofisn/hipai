<template>
  <div class="BusinessNotice" id="BusinessNotice">
    <top-head title="Notifikasi" @leftClick="goBack"></top-head>
    <van-pull-refresh v-model="loading" @refresh="refresh">
      <van-list
        v-model="loading"
        :offset="10"
        :finished="finished"
        :finished-text="finishedText"
        @load="getNotice"
        class="list"
        v-show="list.length||finished"
      >
        <notice-item v-for="(item,index) in list" :notice="noticeItem(item)" :key="index"></notice-item>
      </van-list>
      <div v-show="!list.length&&finished" class="nolist">
        <img src="../../assets/img/no_notice.png" alt>
        <div class="cont">Sementara tidak ada tampilan</div>
      </div>
    </van-pull-refresh>
  </div>
</template>
<script>
import TopHead from "@/components/TopHead";
import NoticeItem from "@/components/NoticeItem";
import { businessNotice } from "utils/ajax";
import { List, PullRefresh } from "vant";
import Vue from "vue";
Vue.use(List).use(PullRefresh);
export default {
  name: "BusinessNotice",
  data() {
    return {
      loading: false,
      backTo: "/bs-home",
      finished: false,
      page: 1,
      server_time: "",
      list: [],
      page_size: 30
    };
  },
  created() {
    let homeActive = this.$store.state.business.homeActive;
    if (homeActive === 1) {
      this.backTo = "/sellout";
    } else {
      this.backTo = "/wantbuy";
    }
    this.getNotice();
  },
  computed: {
    finishedText() {
     if (this.list.length < 7) {
        return "";
      } else {
        return "Tidak ada tampilan lagi";
      }
    }
  },
  components: {
    TopHead,
    NoticeItem
  },
  methods: {
    goBack() {
      this.$router.replace(this.backTo);
    },

    refresh() {
      this.finished = false;
      this.page = 1;
      this.list = [];
      this.getNotice();
    },
    getNotice() {
      let params = {
        page: this.page,
        page_size: this.page_size,
        title: "Notifikasi Transaksi"
      };
      this.loading = true;
      businessNotice(this.$resultParams(params))
        .then(res => {
          this.loading = false;
          if (res.code === 200) {
            if (res.data.server_time) {
              this.server_time = parseInt(res.data.server_time);
            }
            if (res.data.data.length) {
              this.page = parseInt(res.data.current_page) + 1;
              this.list = this.list.concat(res.data.data);
              if (res.data.data.length < this.page_size) {
                this.finished = true;
              }
            } else {
              this.finished = true;
            }
          } else {
            this.finished = true;
            this.loading = false;
          }
        })
        .catch(err => {
          this.finished = true;
          this.loading = false;
          console.log(err);
        });
    },
    noticeItem(item) {
      return {
        title: item.title,
        content: item.content,
        date: item.create_time,
        isNoRead: item.is_read == "0" ? true : false
      };
    }
  }
};
</script>

<style lang="less" scoped  src="../../assets/css/business.less">
</style>
