<template>
  <div class="Share">
    <div class="cnt_box">
      <div class="icon">
        <img src="../../assets/img/share_icon.png" alt>
      </div>

      <div class="share_cnt">
        <div class="t1">Membuat Karyamu</div>
        <div class="t2">Tema Foto · Bonus Hadiah</div>
      </div>
    </div>
    <div class="main">
      <div class="head_box">
        <img :src="head" alt>
      </div>
      <div class="user_box">
        <div>Hi saya {{name}}</div>
        <div class="user_tt">PopLike Social Influencer</div>
      </div>
      <div class="ma_box">
        <div class="yqm_box">
          <div class="yqm_tit">Kode undang teman</div>
          <div class="yqm">{{invite_code}}</div>
        </div>

        <div class="ma">
          <img :src="ewm" alt>
        </div>
      </div>
    </div>
    <div class="share_btn" @click="goShare">Bagikan</div>
  </div>
</template>
<script>
import TopHead from "@/components/TopHead";
import headImg from "@/assets/img/share_header.png";
import { shareInfo } from "utils/ajax";

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
        (d * 1) / 3 + "px";
        document.getElementsByClassName("main")[0].style.marginTop =
        (d * 1) / 3 + "px";
    },
    goBack() {
      // this.$router.push({ name: "Invite" });
      this.$router.back(-1);
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

<style lang="less" scoped src="../../assets/css/team.less">
</style>
