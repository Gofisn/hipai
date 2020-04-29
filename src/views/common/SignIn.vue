<template>
  <div class="SignIn">
    <top-head title="Absen Harian" @leftClick="goBack"></top-head>
    <div class="main_box">
      <div class="top_box">
        <div class="circle_box">
          <div class="tt">- Absen Harian -</div>
          <div>
            <span class="num">{{signNum}}</span>
            <span class="h">Hari</span>
          </div>
        </div>
        <div class="sign_btn" @click="signClick">{{!isSignToday ? 'Segera Absen' : 'Sudah Absen'}}</div>
        <div class="nts">Absen harian & dapatkan bonus Hi-Koin terus menerus!</div>
      </div>
      <div class="list" v-show="listData&&listData.length>0">
        <div class="item" v-for="(item, index) in listData" :key="index">
          <div class="img">
            <img :src="item.avatar||defaultHeadImg" alt>
          </div>
          <div class="cnt">
            <div class="name">{{item.username}}</div>
            <div class="c">
              Telah absen hari ke
              <span class="c1">{{item.num}}</span> | Bonus Hi-koin
              <span class="c2">{{item.reward_total}}</span>
            </div>
            <div class="c">Waktu absen terakhir： {{item.last_signin}}</div>
          </div>
        </div>
      </div>
      <div v-show="listData.length==0&&!loading" class="empty-content">- Tidak ada catatan -</div>
    </div>
    <div class="sign_mask" v-show="isSignShow">
      <div class="cont_box">
        <div class="cnt">Berhasil Absen!</div>
        <div class="subcnt">
          Selamat! Dapat
          <span>{{bonus}}</span> Hi-Koin
        </div>
        <div class="sure_btn" @click="isSignShow=false">Ambil</div>
      </div>
      <div class="close_btn" @click="isSignShow=false"></div>
    </div>
  </div>
</template>
<script>
import Vue from "vue";
import TopHead from "@/components/TopHead";
import { Toast, Dialog } from "vant";
import default_header from "@/assets/img/default_head_img.png";
import { base64Encode, randomString, reverseString } from "utils/tools";
import { getAdConfig, signInMake, signInDetail } from "utils/ajax";
Vue.use(Toast).use(Dialog);

export default {
  name: "SignIn",
  data() {
    return {
      defaultHeadImg: default_header,
      isSignToday: false, // 今天是否已签到
      isSignShow: false,
      signNum: "0", // 当前用户签到天数
      bonus: "",
      listData: [],
      loading: false
    };
  },
  components: {
    TopHead
  },
  mounted() {
    this.getSignInDetail();
  },
  methods: {
    goBack() {
      this.$getSystemInfoFromApp("closeWebPage");
    },
    getBackEndAdConfig() {
      let params = { timestamp: new Date().getTime() };
      getAdConfig(this.$resultParams(params))
        .then(res => {
          if (res.code === 200) {
            res.data.signInOperator && this.openAd(res.data.signInOperator);
          } else {
            Toast(res.msg);
          }
        })
        .catch(err => {});
    },
    openAd(type) {
      if (type == 1) {
        const isReadyForAd = this.$getSystemInfoFromApp(
          "isReadyUnityRewardVideoSignIn"
        );
        if (isReadyForAd == "true") {
          this.$getSystemInfoFromApp("showUnityRewardVideoSignIn");
        }
      } else if (type == 2) {
        const isReadyForAd2 = this.$getSystemInfoFromApp(
          "isReadyMintegralRewardVideoSignIn"
        );
        if (isReadyForAd2 == "true") {
          this.$getSystemInfoFromApp("showMintegralRewardVideoSignIn");
        }
      }
    },
    signClick() {
      if (this.isSignToday) {
        // 已签到
        Toast("Anda sudah check-in");
        return;
      }
      const keyValue = this.getKey("user-sign-in-");
      let params = {
        key: keyValue
      };
      signInMake(this.$resultParams(params))
        .then(res => {
          if (res.code === 200) {
            //
            this.isSignToday = true;
            this.bonus = res.data.bonus;
            this.isSignShow = true;
            this.signNum = parseInt(this.signNum) + 1; // 签到天数加1
          } else if (res.code === 20009) {
            //活跃度不足
            Dialog.confirm({
              cancelButtonText: "Batalkan",
              confirmButtonText: "Niakkan Skor",
              message: `Skor Anda tidak cukup untuk berpartisipasi, silahkan tingkatkan skor Anda terlebih dahulu`
            })
              .then(() => {
                this.$store.dispatch("changeRouteFrom", "/signin");
                this.$store.dispatch("changeSkorNeedInfo", res.data);
                this.$router.push("/skornone");
              })
              .catch(() => {});
          }  else if (res.code === 47011) {
            Dialog.confirm({
              cancelButtonText: "batal",
              confirmButtonText: "mulai",
              message:
                "Anda harus selesaikan verifikasi wajah untuk melanjutkan"
            })
              .then(() => {
                Vue.prototype.$getSystemInfoFromApp("goVerifiedYn");
              })
              .catch(() => {
                // on cancel
              });
          } else {
            Toast(res.msg);
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    getKey(str) {
      let token = this.$store.state.appInfo.Authorization;
      return base64Encode(this.$md5(str + token + "-" + reverseString(token)));
    },
    getSignInDetail() {
      let params = {
        key: base64Encode("signin-detail-" + randomString())
      };
      this.loading = true;
      signInDetail(this.$resultParams(params))
        .then(res => {
          this.loading = false;
          if (res.code === 200) {
            //
            this.listData = res.data.list || [];
            this.isSignToday = res.data.signed_today;
            this.signNum = res.data.num || 0;
          } else {
            Toast(res.msg);
          }
          this.getBackEndAdConfig();
        })
        .catch(err => {
          this.loading = false;
          console.log(err);
        });
    }
  }
};
</script>

<!--<style lang="less" scoped src="../../assets/css/style.less">-->
<style lang="less" scoped>
@import "../../assets/css/style.less";
.empty-content {
  margin-top: 16vh;
  color: #666666;
  font-size: 34px;
  text-align: center;
}
</style>
