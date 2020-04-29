<template>
  <div class="question-home-container">
    <top-head title="Kuis Harian" @leftClick="goBack"></top-head>
    <div class="game-wrapper">
      <div class="cont">
        <div class="circle">
          Pertanya ke
          <span class="num">{{activeQuestion + 1}}</span>
        </div>
      </div>
      <div class="question-panel">
        <div class="question-header">
          <img class="header" src="../../assets/img/game/game_panel_header.png">
          <div class="question" v-if="questionList.length">{{questionList[activeQuestion].title}}</div>
        </div>
        <div class="answer" v-if="questionList.length">
          <div
            class="answer-item"
            @click="selectAnswer(0)"
          >{{questionList[activeQuestion].section_a}}</div>
          <div
            class="answer-item"
            @click="selectAnswer(1)"
          >{{questionList[activeQuestion].section_b}}</div>
          <div
            class="answer-item"
            @click="selectAnswer(2)"
          >{{questionList[activeQuestion].section_c}}</div>
          <div
            class="answer-item"
            @click="selectAnswer(3)"
          >{{questionList[activeQuestion].section_d}}</div>
        </div>
      </div>
    </div>
    <div class="suc_mask" v-show="suc_show">
      <div :class="['cont_box',{correct: isCorrect == 1} ]">
        <img
          v-if="isCorrect == 1 "
          src="../../assets/img/game/game_correct_header.png"
          class="header"
        >
        <img
          v-else-if="isCorrect == 2 "
          src="../../assets/img/game/answer_all.png"
          class="answer-all"
        >
        <img
          v-else-if="!isCorrect"
          src="../../assets/img/game/game_wrong_header.png"
          class="header"
        >
        <div class="subcnt" v-if="isCorrect == 1">Selamat, jawaban benar!</div>
        <div class="subcnt all" v-else-if="isCorrect == 2">Selamat!</div>
        <div class="subcnt" v-else-if="!isCorrect">Yah, jawaban salah</div>
        <div class="subtitle" v-if="isCorrect == 2">
          Dapat
          <span class="coin">{{reward}}</span> Hi-Koin
        </div>
        <div class="sure_btn" v-if="isCorrect ==1" @click="nextOne()">Halaman berikutnya</div>
        <div class="sure_btn" v-else-if="!isCorrect" @click="selectAgain()">Silahkan pilih ulang</div>
        <div class="sure_btn" v-else-if="isCorrect == 2" @click="backToHome()">Ambil</div>
      </div>
      <!-- <div class="close_btn" @click="suc_show = false"></div> -->
    </div>
  </div>
</template>
<script>
import Vue from "vue";
import { Toast, Dialog } from "vant";
import TopHead from "@/components/TopHead";
let Base64 = require("js-base64").Base64;
import {
  getQuestionList,
  valideAnswer,
  submitAnswer,
  setAd
} from "@/utils/ajax";
Vue.use(Toast).use(Dialog);

export default {
  name: "QuestionGame",
  components: {
    TopHead
  },
  data() {
    return {
      answer: {},
      active: null,
      saveAnser: [],
      mask_type: 1, //1为中奖  2为嗨豆不够  3为未中奖
      isCorrect: 2, //0错误 1当前题答对 2 所有答对
      questionList: [],
      suc_show: false,
      activeQuestion: 0, //当前题目索引
      chance: 1, //拥有一个答题机会
      reward: "",
      adSettings: "",
      isReadAd: false
    };
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    selectAnswer(index) {
      this.active = index;
      let answer = "";
      switch (index) {
        case 0:
          answer = "A";
          break;
        case 1:
          answer = "B";
          break;
        case 2:
          answer = "C";
          break;
        case 3:
          answer = "D";
          break;
      }
   let topic_id=this.questionList[this.activeQuestion].topic_id;
      let data = {
        topic_id: topic_id,
        answer: answer
      };
      valideAnswer(this.$resultParams(data)).then(result => {
        if (result.code == 200) {
          this.isCorrect = result.data.check_status ? 1 : 0;
          if (this.activeQuestion < this.questionList.length - 1) {
            this.suc_show = true;
          } else {
            if (!this.isCorrect) {
              this.suc_show = true;
            }
          }

          if (result.data.check_status) {
  
            this.answer[topic_id] = answer;

            if (this.activeQuestion == this.questionList.length - 1) {
              this.submitAll();
            }
          }
        } else {
          Toast(res.msg);
        }
      });
    },
    submitAll() {
      let data = {
        answerInfo: Base64.encode(JSON.stringify(this.answer)),
        timestamp: new Date().getTime()
      };
      submitAnswer(this.$resultParams(data)).then(result => {
        if (result.code == 200) {
          this.reward = result.data.rewardNum;
          this.isCorrect = 2;
          this.suc_show = true;
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
        }  else if (result.code === 47011) {
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
      });
    },
    getAllQuestion() {
      let data = {
        timestamp: new Date().getTime()
      };
      getQuestionList(this.$resultParams(data)).then(result => {
        if (result.code == 200) {
          this.questionList = result.data.topicList;
        } else {
          Toast(res.msg);
        }
      });
    },
    nextOne() {
      if (this.activeQuestion < this.questionList.length - 1) {
        this.activeQuestion++;
        this.suc_show = false;
      }
    },
    showAd() {
      if (this.adSettings == 1) {
        let isReady = this.$getSystemInfoFromApp(
          "isReadyUnityRewardVideoAnswer"
        );
        if (isReady == "true") {
          this.$getSystemInfoFromApp("showUnityRewardVideoAnswer");
        }
      } else if (this.adSettings == 2) {
        let isReady = this.$getSystemInfoFromApp(
          "isReadyMintegralRewardVideoAnswer"
        );
        if (isReady == "true") {
          this.$getSystemInfoFromApp("showMintegralRewardVideoAnswer");
        }
      }
    },
    selectAgain() {
      if (!this.isReadAd) {
        this.showAd();
        this.isReadAd = true;
      }

      this.suc_show = false;
      // if (this.chance > 0) {
      //   this.chance = 0
      //   // this.activeQuestion++
      //
      // }else {
      //   this.$toast({message:"没有答题机会了哦"})
      // }
    },
    getAdSettings() {
      let data = {
        timestamp: new Date().getTime()
      };
      setAd(this.$resultParams(data)).then(result => {
        if (result.code == 200) {
          this.adSettings = result.data.questionOperator;
        }
      });
    },
    backToHome() {
      this.$getSystemInfoFromApp("closeWebPage");
    }
  },
  mounted() {
    this.getAllQuestion();
    this.getAdSettings();
  }
};
</script>
<style lang="less" scoped src="../../assets/css/game.less">
</style>
