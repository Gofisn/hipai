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
        <div class="title">交易</div>
      </div>
      <div class="cont_box">
        <div class="btn_box">
          <div @click="goList">交易记录</div>
          <div v-show="!businessActive" @click="goBeans">嗨豆明细</div>
        </div>
        <div>我的嗨豆(个)</div>
        <div class="count">{{userInfo.bean_amount|numFormat}}</div>
      </div>
    </div>
    <div class="tab">
      <router-link to="/wantbuy" class="item" tag="span">求购</router-link>
      <router-link to="/sellout" class="item" tag="span">卖出</router-link>
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
  computed: {},
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
        type_params: "交易通知,申诉通知"
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
    goBeans() {
       this.$store.dispatch("changeBeansFrom", '/bs-home');
      this.$router.push("/beansdetail");
    },
    goList() {
      this.$store.dispatch("changeBusinessListActive", 0);
      this.$router.push("/bs-list");
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
<style lang="less"  src="../../assets/css/style.less">
</style>

