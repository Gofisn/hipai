<template>
  <div class="Invite">
    <div class="head_box">
      <div class="topbar">
        <div class="left" @click="backClick">
          <span></span>
        </div>
        <!-- <span class="right" @click="show=true">Rekrut team</span> -->
        <div class="title">Team Saya</div>
      </div>
      <div class="team_title">Ketua Team</div>
      <div class="user_info">
        <img :src="inviter.avatar?inviter.avatar: head_img" alt>
        <div class="inviter_main">
          <div class="item black">
            <span>{{inviter.name}}</span>
            <span>{{inviter.bean_amount|numFormatD}}</span>
          </div>
          <div class="item">
            <span>ID：{{inviter.invite_code}}</span>
            <span>Memiliki Hi-koin</span>
          </div>
        </div>
      </div>
    </div>
    <div class="team_num_box">
      <div class="item">
        <div class="name">Jumlah Team</div>
        <div class="number">{{member_num|numFormatD}}</div>
      </div>
      <div class="item">
        <div class="name">Skor Team</div>
        <div class="number">{{team_activity|numFormatD}}</div>
      </div>
      <div class="item">
        <div class="name">Pendapatan Team Kemarin(Hi-koin)</div>
        <div class="number">{{team_reward_hi_koin|numFormatD}}</div>
        <div class="sub_num">≈Rpc {{team_reward_rpc|numFormatD}}</div>
      </div>
    </div>
    <div class="main_box">
      <van-pull-refresh v-model="loading" @refresh="onRefresh">
        <van-list
          :offset="10"
          :finished-text="finishtext"
          v-model="loading"
          :finished="finished"
          @load="getInfo"
        >
          <div class="item" v-for="(item,index) in list" :key="index">
            <img :src="item.avatar?item.avatar: head_img" alt>
            <div class="cnt">
              <div class="sp">
                <div class="title">{{item.username}}</div>
                <div class="godetail" @click="goInviteDetail(item.user_id)">Lihat Deail</div>
              </div>
              <div class="sp">
                <span>Penghasilan dari anggota team：</span>
                <span>{{item.con_num}} Hi-koin</span>
              </div>
            </div>
          </div>
        </van-list>
        <div v-show="!list.length&&finished" class="no_list">Sementara tidak ada data</div>
      </van-pull-refresh>
    </div>
    <div class="invit_btn" @click="show=true">Rekrut Team</div>
    <van-popup v-model="show" :close-on-click-overlay="false" position="bottom">
      <div class="choose_box">
        <div class="list">
          <div class="item" @click="goFace">
            <img src="../../assets/img/share_face.png" alt>
            <div>Facebook</div>
            <div class="show_award" v-show="!is_share"></div>
          </div>
          <div class="item" @click="goWhat">
            <img src="../../assets/img/share_what.png" alt>
            <div>WhatsApp</div>
            <div class="show_award" v-show="!is_share"></div>
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
import { teamInfo, invitShareInfo, teamAwardShare } from "utils/ajax";
import { randomString } from "utils/tools";
import { Toast, List, PullRefresh, Popup } from "vant";
import Vue from "vue";
Vue.use(Toast)
  .use(List)
  .use(PullRefresh)
  .use(Popup);
export default {
  name: "Invite",
  data() {
    return {
      show: false,
      page: 1,
      inviter: {},
      head_img: default_header,
      list: [],
      finished: false,
      team_activity: null,
      member_num: null,
      team_reward_hi_koin: null,
      team_reward_rpc: null,
      loading: false,
      shareInfo: {},
      is_share: false //是否分享过了
    };
  },
  computed: {
    finishtext() {
      if (this.list.length < 5) {
        return "";
      } else {
        return "Tidak ada tampilan lagi";
      }
    }
  },
  created() {
    this.getInfo();
    this.getShareInfo();
  },
  methods: {
    getInfo() {
      let param = {
        page: this.page
      };
      this.loading = true;
      this.finished = false;
      teamInfo(this.$resultParams(param))
        .then(res => {
          this.loading = false;
          if (res.code === 200) {
            this.inviter = res.data.inviter;
            this.team_activity = res.data.team_activity;
            this.member_num = res.data.member_num;
            this.team_reward_hi_koin = res.data.team_reward_hi_koin;
            this.team_reward_rpc = res.data.team_reward_rpc;
            this.is_share = res.data.is_share;
            this.list = this.list.concat(res.data.team_member.list);
            if (this.page >= res.data.team_member.page) {
              this.finished = true;
            }
            this.page = this.page + 1;
          } else {
            Toast(res.msg);
            this.loading = false;
            this.finished = true;
          }
        })
        .catch(err => {
          this.loading = false;
          this.finished = true;
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
    goInviteDetail(id) {
      this.$router.push("/invite-award?id=" + id);
    },
    onRefresh() {
      this.page = 1;
      this.list = [];
      this.getInfo();
    },
    backClick() {
      // this.$getSystemInfoFromApp("closeWebPage");
      let from = this.$store.state.routeFrom;
      if (from) {
        this.$store.dispatch("changeRouteFrom", "");
        this.$router.replace(from);
      } else {
        this.$getSystemInfoFromApp("closeWebPage");
      }
    },
    goInvit() {
      // this.$router.push({ name: "Share" });
      // 改成复制粘贴板
      if (this.copyText(this.shareInfo.url)) {
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
        this.getAward("1");
        window.android.shareFacebook(
          this.shareInfo.title,
          this.shareInfo.url,
          this.shareInfo.logo
        );
      }
    },
    goWhat() {
      if (window.android && window.android.shareWhatsApp) {
        this.getAward("2");
        window.android.shareWhatsApp(
          this.shareInfo.title,
          this.shareInfo.url,
          this.shareInfo.logo
        );
      }
    },
    getAward(type) {
      let params = {
        requested_at: Date.now(),
        key: randomString(),
        type: type
      };
      teamAwardShare(this.$resultParams(params))
        .then(res => {
          this.is_share = true;
        })
        .catch(err => {
          console.log(err);
        });
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
<style lang="less"  src="../../assets/css/team.less" scoped>
</style>

