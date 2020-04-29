<template>
  <div class="SkorNone">
    <top-head title=" " @leftClick="goBack"></top-head>
    <div class="main_box">
      <div class="icon1"></div>
      <div class="icon2"></div>
      <div class="bg1"></div>
      <div class="bg2"></div>
      <div class="skor_top">
        <div class="skor_title">SKOR TIDAK CUKUP</div>
        <div class="cnt_msg">
          Skor kurang dari
          <span>{{ skorInfo.activity_limit }}</span> ( Skor saat ini
          <span>{{ skorInfo.activity_num }}</span> ) , tidak bisa melakukan
          penarikan (Pulsa).
        </div>
        <div class="cnt_msg cnt_msg2">Anda dapat meningkatkan skor dengan:</div>
      </div>
      <div class="cnt_box">
        <div class="btn" @click="goScroll">
          <span class="icon c1"></span>
          <span class="text">Mengerjakan Tugas</span>
          <span class="go_btn">GO</span>
        </div>
        <div class="btn" @click="goInvite">
          <span class="icon c2"></span>
          <span class="text">Udang {{ skorInfo.invite_num }} teman</span>
          <span class="go_btn">GO</span>
        </div>
        <div class="btn" @click="goGrop">
          <span class="icon c3"></span>
          <span class="text">Bergabung dengan tim</span>
          <span class="go_btn">GO</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import TopHead from "@/components/TopHead";

import { getUserLimit } from "utils/ajax";
import { randomString } from "utils/tools";
import { Toast } from "vant";
export default {
  name: "Skor",
  data() {
    return {
      act: 10, //需要活跃度
      inv: 3,
      has_act: 0, //当前活跃度
      type: 1 //卖嗨豆1提现2商城兑换3
    };
  },
  components: {
    TopHead
  },
  computed: {
    skorInfo() {
      return this.$store.state.skorNeedInfo;
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

    goScroll() {
      this.$getSystemInfoFromApp("goTask", "?active=0", true);
    },
    goInvite() {
      this.$getSystemInfoFromApp("goTeam", "", true);
    },
    goGrop() {
      this.$getSystemInfoFromApp("goGroup");
    }
  }
};
</script>
<style lang="less" src="../../assets/css/account.less"></style>
