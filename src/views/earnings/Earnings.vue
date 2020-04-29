<template>
  <div class="Earnings">
    <div class="head_top">
      <div class="topbar">
        <div class="left" @click="backClick">
          <span></span>
        </div>
        <!-- <span class="right" @click="show=true">Rekrut team</span> -->
        <div class="title">Pendapatan Kemarin</div>
      </div>
      <div class="top_bg"></div>
      <div v-if="!id" class="go_rank" @click="goRank"></div>
    </div>
    <div class="account_box">
      <div class="account_main">
        <div class="msg">Pendapatan Kemarin(Hi-koin)</div>
        <div class="num">{{info.Total|numFormatD}}</div>
        <div class="rpc">≈Rpc {{info.TotalRpc|numFormatD}}</div>
      </div>
    </div>
    <div class="earnings_list">
      <div class="earnings_item">
        <div class="icon_box">
          <img src="../../assets/img/earnings/icon5.png" alt>
        </div>
        <div class="type">Penghasilan Baca Berita</div>
        <div class="coin_box">+{{info.ScrollRewardNum|numFormatD}}</div>
      </div>
      <div class="earnings_item">
        <div class="icon_box">
          <img src="../../assets/img/earnings/icon8.png" alt>
        </div>
        <div class="type">Penghasilan dari Team</div>
        <div
          class="coin_box"
          :class="id?'':'arraw'"
          @click="goInvite"
        >+{{info.TeamRewardNum|numFormatD}}</div>
      </div>
      <div class="earnings_item">
        <div class="icon_box">
          <img src="../../assets/img/earnings/icon7.png" alt>
        </div>
        <div class="type">Penghasilan dari Group</div>
        <div
          class="coin_box"
          :class="id?'':'arraw'"
          @click="goGroup"
        >+{{info.ClubRewardNum|numFormatD}}</div>
      </div>
      <div class="earnings_item">
        <div class="icon_box">
          <img src="../../assets/img/earnings/icon2.png" alt>
        </div>
        <div class="type">Penghasilan dari kuis</div>
        <div class="coin_box">
          <div class="add">+{{info.QuestionRewardNum|numFormatD}}</div>
        </div>
      </div>
      <div class="earnings_item">
        <div class="icon_box">
          <img src="../../assets/img/earnings/icon4.png" alt>
        </div>
        <div class="type">Bonus Absen Harian</div>
        <div class="coin_box">+{{info.SignRewardNum|numFormatD}}</div>
      </div>
      <div class="earnings_item">
        <div class="icon_box">
          <img src="../../assets/img/earnings/icon1.png" alt>
        </div>
        <div class="type">Bonus Undian</div>
        <div class="coin_box">+{{info.UserPrizeNum|numFormatD}}</div>
      </div>
      <div class="earnings_item">
        <div class="icon_box">
          <img src="../../assets/img/earnings/icon3.png" alt>
        </div>
        <div class="type">Membeli Hi-Koin</div>
        <div class="coin_box">+{{info.BuyNum|numFormatD}}</div>
      </div>
      <div class="earnings_item" v-show="info.RegisterNum&&info.RegisterNum>0">
        <div class="icon_box">
          <img src="../../assets/img/earnings/icon6.png" alt>
        </div>
        <div class="type">Bonus Pendaftaran</div>
        <div class="coin_box">+{{info.RegisterNum|numFormatD}}</div>
      </div>
      <div class="earnings_item">
        <div class="icon_box">
          <img src="../../assets/img/earnings/icon9.png" alt>
        </div>
        <div class="type">Share dapat Hi-Koin</div>
        <div class="coin_box">+{{info.ShareRewardNum|numFormatD}}</div>
      </div>
      <div class="end">- THE END -</div>
    </div>
  </div>
</template>
<script>
import { getYesterdayEarnings } from "utils/ajax.js";
import Vue from "vue";
import { Toast } from "vant";
Vue.use(Toast);
export default {
  name: "Earnings",
  data() {
    return {
      id: "",
      info: {}
    };
  },
  created() {
    if (this.$route.query.id) {
      this.id = this.$route.query.id;
    }
    this.getInfo();
  },
  methods: {
    backClick() {
      let from = this.$store.state.routeFrom;
      let back = this.$route.query.back;
      if (back) {
        this.$router.push("/earnings-rank");
      } else if (from) {
        this.$store.dispatch("changeRouteFrom", "");
        this.$router.replace(from);
      } else {
        this.$getSystemInfoFromApp("closeWebPage");
      }
    },
    getInfo() {
      let params = {
        timestamp: Date.now(),
        viewUserId: this.id
      };
      getYesterdayEarnings(this.$resultParams(params))
        .then(res => {
          if (res.code == 200) {
            this.info = res.data.info;
          } else {
            Toast(res.msg);
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    goInvite() {
      if (!this.id) {
        this.$getSystemInfoFromApp("goTeam", "", true);
      }
    },
    goGroup() {
      if (!this.id) {
        this.$getSystemInfoFromApp("goGroup");
      }
    },
    goRank() {
      this.$store.dispatch("changeRouteFrom", "/earnings");
      this.$router.push("/earnings-rank");
    }
  }
};
</script>
<style lang="less" scoped src="../../assets/css/earnings.less">
</style>
