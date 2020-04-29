<template>
  <div class="EarningsRanking">
    <div class="head_top">
      <div class="topbar">
        <div class="left" v-if="isLogin" @click="goBack">
          <span></span>
        </div>
        <span class="right" v-if="isLogin" @click="show=true"></span>
        <div class="title"></div>
      </div>
      <div class="word_top"></div>
      <div class="date">{{date}}</div>
    </div>
    <div class="rank_top">
      <div class="rank">Peringkat</div>
      <div class="name_box">Nama</div>
      <div class="kou_num">Penghasilan Kemarin</div>
    </div>
    <div class="main_box">
      <van-pull-refresh v-model="loading" @refresh="refresh">
        <van-list
          v-model="loading"
          :offset="10"
          :finished="finished"
          :finished-text="finishedText"
          @load="getData"
          v-show="list.length||finished"
        >
          <div
            class="rank_item"
            v-for="item in list"
            :key="item.user_id"
            :class="isLogin?'arrow':''"
            @click="goEarnings(item.user_id)"
          >
            <div class="rank">
              <span v-if="item.rank<4" class="rank" :class="'rank'+item.rank"></span>
              <span v-else class="rank">{{item.rank}}</span>
            </div>
            <div class="name_box">
              <img :src="item.avatar?item.avatar:head_img" alt>
              <div class="name">{{item.username}}</div>
            </div>
            <div class="kou_num">{{item.userBeanNum|numFormatD}} Hi-koin</div>
          </div>
        </van-list>
        <div class="no_list" v-show="!list.length&&finished">
          <div>Tidak ada tampilan</div>
        </div>
      </van-pull-refresh>
    </div>
    <div class="botton">
      <div v-if="isLogin" class="current_persion">
        <div class="rank">{{userRank.rank}}</div>
        <div class="user_main">
          <div class="user_info">
            <img :src="userRank.avatar?userRank.avatar:head_img" class="user_img" alt>
            <span class="name">{{userRank.username}}</span>
          </div>
          <span class="num">{{userRank.userBeanNum|numFormatD}} Hi-koin</span>
        </div>
      </div>
      <div v-else class="no_login" @click="goShare">Bergabung & Hasilkan Uang</div>
    </div>
    <van-popup v-model="show" :close-on-click-overlay="false" position="bottom">
      <div class="choose_box">
        <div class="list">
          <div class="item" @click="goFace">
            <img src="../../assets/img/share_face.png" alt>
            <div>Facebook</div>
          </div>
          <div class="item" @click="goWhat">
            <img src="../../assets/img/share_what.png" alt>
            <div>WhatsApp</div>
          </div>
          <div class="item" @click="goInvit">
            <img src="../../assets/img/share_in.png" alt>
            <div>Share</div>
          </div>
        </div>
        <div class="cancle" @click="show=false">Batalkan</div>
      </div>
    </van-popup>
  </div>
</template>
<script>
import default_header from "@/assets/img/share_header.png";

import { getEarningsRank, invitShareInfo } from "utils/ajax.js";
import Vue from "vue";
import { Toast, List, PullRefresh, Popup } from "vant";
Vue.use(Toast)
  .use(List)
  .use(PullRefresh)
  .use(Popup);
export default {
  name: "EarningsRanking",
  data() {
    return {
      show: false, //是否显示分享
      loading: false,
      finished: false,
      list: [],
      head_img: default_header,
      page: 1,
      page_num: 50,
      server_time: "",
      isLogin: false,
      inviteCode: "",
      userRank: {},
      shareInfo: {},
      date: null,
      inviteUrl: "",
      share_url: ""
    };
  },
  created() {
    this.server_time = Date.now();
    // 未登录 获取邀请码
    if (this.$route.query.code) {
      this.inviteCode = this.$route.query.code;
    }
    this.share_url = window.location.href.split("?")[0];
    this.getData();
    this.getShareInfo();
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
    goEarnings(id) {
      if (this.isLogin) {
        this.$router.push("/earnings?id=" + id + "&back=1");
      }
    },
    refresh() {
      this.finished = false;
      this.page = 1;
      this.list = [];
      this.server_time = Date.now();
      this.getData();
    },
    getData() {
      let params = {
        page: this.page,
        page_size: this.page_num,
        timestamp: this.server_time
      };
      this.loading = true;
      getEarningsRank(this.$resultParams(params))
        .then(res => {
          this.loading = false;
          if (res.code == 200) {
            this.isLogin = res.data.isLogin;

            if (res.data.inviteCode) {
              this.inviteCode = res.data.inviteCode;
            }
            this.inviteUrl = res.data.inviteUrl;
            this.userRank = res.data.userRank;
            this.date = res.data.date;
            if (res.data.rankList && res.data.rankList.length) {
              this.page = this.page + 1;
              this.list = this.list.concat(res.data.rankList);
              if (res.data.current_page >= res.data.page_total) {
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
    getShareInfo() {
      invitShareInfo()
        .then(res => {
          if (res.code == 200) {
            this.shareInfo = res.data;
          }
        })
        .catch(err => {});
    },
    goShare() {
      window.location.href = this.inviteUrl + this.inviteCode;
    },
    goInvit() {
      // 改成复制粘贴板
      if (this.copyText(this.share_url + "?code=" + this.inviteCode)) {
        this.show = false;
        Toast(
          "Link berhasil di salin, silahkan buka link di browser untuk mengundang teman"
        );
      } else {
        Toast("error");
      }
    },
    goFace() {
      if (window.android && window.android.shareFacebook) {
        window.android.shareFacebook(
          this.shareInfo.title,
          this.share_url + "?code=" + this.inviteCode,
          this.shareInfo.logo
        );
      }
    },
    goWhat() {
      if (window.android && window.android.shareWhatsApp) {
        window.android.shareWhatsApp(
          this.shareInfo.title,
          this.share_url + "?code=" + this.inviteCode,
          this.shareInfo.logo
        );
      }
    },

    copyText(text) {
      var textarea = document.createElement("input"); //创建input对象
      document.body.appendChild(textarea); //添加元素
      textarea.value = text;
      textarea.style.fontSize = "32px";
      textarea.style.position = "absolute";
      textarea.style.top = "-50px";
      textarea.style.left = "-50px";
      textarea.select();
      if (textarea.setSelectionRange) {
        textarea.setSelectionRange(0, textarea.value.length);
      }
      try {
        var flag = document.execCommand("copy"); //执行复制
      } catch (eo) {
        var flag = false;
      }
      document.body.removeChild(textarea); //删除元素
      // window.scrollTo({ top: 0, left: 0, behavior: "smooth" })
      return flag;
    }
  }
};
</script>
<style lang="less">
.van-pull-refresh__track {
  height: 100%;
}
</style>
<style lang="less" scoped src="../../assets/css/earnings.less">
</style>
