<template>
  <div class="BusinessHome">
    <div class="head_box">
      <div class="topbar">
        <div class="left" @click="backClick">
          <span></span>
        </div>
        <span class="right" @click="rightClick">
          <span :class="{num:hasNode}"></span>
        </span>
        <div class="title">Transaksi</div>
      </div>
      <div class="cont_box">
        <div class="number_box">
          <div class="bean_num">
            <div class="tt">Hi-Koin</div>
            <div class="count">{{userInfo.bean_amount|numFormatD }}</div>
          </div>
          <div class="bean_num">
            <div class="tt">Rpc</div>
            <div class="count">{{userInfo.gold_amount|numFormatD }}</div>
          </div>
        </div>
        <div class="btn_box">
           <div @click="goLine" class="item">
            <img src="../../assets/img/kline_icon.png" alt="">
            <div>K <div>Grafik</div></div>
          </div>
          <div @click="goList" class="item">
            <img src="../../assets/img/beanlist_icon.png" alt>
            <div>Riwayat Transaksi</div>
          </div>
        </div>
      </div>
    </div>
    <div class="tab">
      <router-link to="/wantbuy" class="item item1" tag="span">Beli</router-link>
      <router-link to="/sellout" class="item item2" tag="span">Jual </router-link>
    </div>
    <div class="main_box">
      <router-view></router-view>
    </div>

    <!-- <van-tabs v-model="businessActive" @click="changeBusinessActive" animated>
      <van-tab title="求购">
        <want-buy :first="businessActive"></want-buy>
      </van-tab>
      <van-tab title="卖出">
        <sell-out></sell-out>
      </van-tab>
    </van-tabs>-->
  </div>
</template>
<script>
import WantBuy from "@/views/business/WantBuy.vue";
import SellOut from "@/views/business/SellOut.vue";
import {
  getUserInfo,
  getBusinessConfig,
  businessCheckNotice
} from "utils/ajax";
import { Tab, Tabs, Toast } from "vant";
import Vue from "vue";
Vue.use(Tab).use(Tabs);
export default {
  name: "BusinessHome",
  data() {
    return {
      hasNode: false,
      businessActive: 0,
      userInfo: {}
    };
  },
  mounted() {
    this.businessActive = this.$store.state.business.homeActive;
  },
  created() {
    this.getInfo();
    this.getBSConfig();
    this.getCheckNotice();
  },
  components: {
    WantBuy,
    SellOut
  },
  methods: {
    getInfo() {
      getUserInfo({})
        .then(res => {
          if (res.code === 200) {
            this.userInfo = res.data;
            this.$store.dispatch("changeUserInfo", this.userInfo);
          } else {
            Toast(res.msg);
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    getBSConfig() {
      getBusinessConfig()
        .then(res => {
          if (res.code === 200) {
            this.$store.dispatch("changeBusinessConfig", res.data);
          } else {
            Toast(res.msg);
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    getCheckNotice() {
      let params = {
        type: 3,
        type_params: "Notifikasi Transaksi"
      };
      businessCheckNotice(this.$resultParams(params))
        .then(res => {
          console.log(res);
          if (res.code === 200) {
            this.hasNode = res.data.hasSystemNotice;
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    backClick() {
      this.$getSystemInfoFromApp("closeWebPage");
    },
    rightClick() {
      this.$router.push("/bs-notice");
    },
    changeBusinessActive(index, title) {
      this.$store.dispatch("changeBusinessActive", index);
    },
    goList() {
      this.$store.dispatch("changeBusinessListActive", 0);
      this.$router.push("/bs-list");
    },

    goLine(){
      Toast.loading({
        duration: 0, // 持续展示 toast
        forbidClick: true, // 禁用背景点击
        message: "Memuat..."
      });
      this.$router.push("/kline");
    }
  },
  beforeRouteUpdate(to, from, next) {
    if (to.name === "SellOut") {
      this.businessActive = 1;
    } else if (to.name === "WantBuy") {
      this.businessActive = 0;
    }
    this.$store.dispatch("changeBusinessActive", this.businessActive);
    next();
  }
};
</script>
<style lang="less"  src="../../assets/css/business.less">
</style>

