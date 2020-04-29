<template>
  <div class="BeansDetail" id="beans_detail">
    <top-head title="Detail Hi-Koin" @leftClick="goBack"></top-head>
    <van-pull-refresh v-model="loading" @refresh="refresh">
      <van-list
        v-model="loading"
        :offset="10"
        :finished="finished"
        :finished-text="finishedText"
        @load="getData"
        class="beans_list"
        v-show="list.length||finished"
      >
        <div class="item" v-for="item in list" :key="item.id">
          <img :src="gitImgIcon(item.log_tags)" alt>
          <div class="cnt">
            <div>{{item.bean_num}} buah</div>
            <div class="date">{{dateFormat(item.create_time)}}</div>
          </div>
          <div class="name">{{item.from_text}}</div>
        </div>
      </van-list>
      <div class="beans_no" v-show="!list.length&&finished">
        <img src="../../assets/img/beans_no.png" alt>
        <div>Tidak ada tampilan</div>
      </div>
    </van-pull-refresh>
  </div>
</template>
<script>
import imgbuy from "@/assets/img/buy_btn.png";
import imgget from "@/assets/img/get_btn.png";
import imgsell from "@/assets/img/sell_btn.png";
import imgkou from "@/assets/img/kou_btn.png";
import TopHead from "@/components/TopHead";
import { beanDetail } from "utils/ajax";
import { formatDate } from "utils/datetime";

import { List, PullRefresh } from "vant";
import Vue from "vue";
import { truncate } from "fs";
Vue.use(List).use(PullRefresh);
export default {
  name: "BeansDetail",
  data() {
    return {
      loading: false,
      finished: false,
      list: [],
      page: 1,
      page_num: 60,
      server_time: ""
    };
  },
  computed: {
    finishedText() {
      if (this.list.length < 12) {
        return "";
      } else {
        return "Tidak ada tampilan lagi";
      }
    }
  },
  created() {
    this.getData();
  },
  components: {
    TopHead
  },
  methods: {
    goBack() {
       let from=this.$store.state.routeFrom
      if (from) {
        this.$store.dispatch("changeRouteFrom", "");
        this.$router.replace(from);
      } else {
        this.$getSystemInfoFromApp("closeWebPage");
      }
    },
    gitImgIcon(img) {
      if (img == 0) {
        return imgbuy;
      } else if (img == 1) {
        return imgsell;
      } else if (img == 2) {
        return imgget;
      } else if (img == 3) {
        return imgkou;
      }
    },
    refresh() {
      this.finished = false;
      this.page = 1;
      this.list = [];
      this.getData();
    },
    getData() {
      let params = {
        page: this.page,
        page_num: this.page_num
      };
      this.loading = true;
      beanDetail(this.$resultParams(params))
        .then(res => {
          this.loading = false;
          if (res.code === 200) {
            if (res.data.server_time) {
              this.server_time = parseInt(res.data.server_time);
            }
            if (res.data.list.length) {
              this.page = parseInt(res.data.current_page) + 1;
              this.list = this.list.concat(res.data.list);
              if (res.data.list.length < this.page_num) {
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
          this.loading = false;
          this.finished = true;
          console.log(err);
        });
    },
    dateFormat(date) {
      return formatDate(date, "yyyy-MM-dd hh:mm");
    }
  }
};
</script>

<style lang="less" scoped  src="../../assets/css/business.less">
</style>
