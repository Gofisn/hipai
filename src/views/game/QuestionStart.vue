<template>
  <div class="question-start-container">
    <top-head title="Kuis Harian" @leftClick="goBack"></top-head>
    <div class="question-wrapper">
      <img class="title" src="../../assets/img/game/game_start_title.png">
      <img class="coin" src="../../assets/img/game/game_start_coin.png">
      <div class="btn" @click="getData">Mulai</div>
    </div>
  </div>
</template>
<script>
import Vue from "vue";
import TopHead from "@/components/TopHead";
import { Toast, Dialog } from "vant";
import { getQuestionChance } from "@/utils/ajax";
Vue.use(Toast).use(Dialog);
export default {
  name: "QuestionStart",
  components: {
    TopHead
  },

  methods: {
    goBack() {
      this.$getSystemInfoFromApp("closeWebPage");
    },
    getData() {
      let data = {
        timestamp: new Date().getTime()
      };
      getQuestionChance(this.$resultParams(data)).then(result => {
        if (result.code == 200) {
          if (result.data.todayCompleteLog) {
            Toast("Kuis hari ini telah selesai");
          } else {
            this.$router.push("/game");
          }
        } else if (result.code === 20009) {
          //活跃度不足
          Dialog.confirm({
            cancelButtonText: "Batalkan",
            confirmButtonText: "Niakkan Skor",
            message: `Skor Anda tidak cukup untuk berpartisipasi, silahkan tingkatkan skor Anda terlebih dahulu`
          })
            .then(() => {
              this.$store.dispatch("changeRouteFrom", "/game-start");
              this.$store.dispatch("changeSkorNeedInfo", result.data);
              this.$router.push("/skornone");
            })
            .catch(() => {});
        } else if (result.code === 47011) {
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
          }  else {
          Toast(result.msg);
        }
      });
    }
  }
};
</script>
<style lang="less" scoped src="../../assets/css/game.less">
</style>
