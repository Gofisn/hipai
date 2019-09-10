<template>
  <div class="Share">
    <!-- <top-head :close="true" title="邀请好友分享" @leftClick="goBack"></top-head> -->
    <div class="cnt_box">
      <div class="icon">
        <img src="../../assets/img/share_icon.png" alt>
      </div>
      <div class="content">
        <img src="../../assets/img/share_title.png" alt>
      </div>
      <!-- <div class="t1">拍主题·获奖励</div> -->
      <div class="t2">让创作更有价值</div>
    </div>
    <div class="main">
      <div class="user_box">
        <div class="head_box">
          <img :src="head" alt>
        </div>
        <div class="cont_box">
          <div>我是{{name}}</div>
          <div>我为嗨拍代言</div>
        </div>
        <div class="yqm">邀请码：{{invite_code}}</div>
      </div>
      <div class="ma_box">
        <div class="ma">
          <img :src="ewm" alt>
        </div>
        <div>识别二维码下载</div>
      </div>
    </div>
    <div class="share_btn" @click="goShare">分享</div>
  </div>
</template>
<script>
import TopHead from "@/components/TopHead";
import headImg from "@/assets/img/share_header.png";
import { shareInfo } from "utils/ajax";
// import { getSystemInfoFromApp } from "@/assets/js/utils.js";

export default {
  name: "Share",
  data() {
    return {
      head: headImg,
      name: "",
      invite_code: "",
      ewm: ""
    };
  },
  components: {
    TopHead
  },
  created() {
    this.invite_code = this.$route.params.code;
    this.getCodeInfo();
  },
  mounted() {
    this.resizeSize();
    window.onresize = () => {
      this.resizeSize();
    };
  },
  methods: {
    resizeSize() {
      let sh = document.body.clientHeight;
      let ch = document.getElementsByClassName("cnt_box")[0].clientHeight;
      let mh = document.getElementsByClassName("main")[0].clientHeight;
      let bh = document.getElementsByClassName("share_btn")[0].clientHeight;
      let d = sh - ch - mh - bh;
      if (d < 0) {
        d = 0;
      }
      document.getElementsByClassName("share_btn")[0].style.marginTop =
        (d * 2) / 3 + "px";
    },
    goBack() {
      this.$router.push({ name: "Invite" });
    },
    getCodeInfo() {
      shareInfo().then(res => {
        if (res.code === 200) {
          this.name = res.data.username;
          this.invite_code = res.data.invite_code;
          if (res.data.avatar) {
            this.head = res.data.avatar;
          }
          if (res.data.qr_code) {
            this.ewm = res.data.qr_code;
          }
        }
      });
    },
    goShare() {
      this.$getSystemInfoFromApp("startSystemShare", "share", true);
    }
  }
};
</script>

<style lang="less" scoped src="../../assets/css/style.less">
</style>
