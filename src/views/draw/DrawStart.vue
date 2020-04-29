<template>
  <div class="DrawStart">
    <top-head :title="title" @leftClick="goBack"></top-head>
    <div class="main_box" :class="'draw_type_'+drawType.category">
      <i class="coin1"></i>
      <i class="coin2"></i>
      <i class="coin3"></i>
      <div class="background"></div>
      <div class="mainword">
        <img :src="draw_title" alt>
      </div>
      <div class="draw_main">
        <div class="draw_top_box">
          <div class="itm">
            <transition name="add" mode="out-in">
              <div class="award_suc" v-if="money_add">+{{award.num}}</div>
            </transition>

            <div class="tit">Hi-koin</div>
            <div class="num">{{money|numFormatD}}</div>
          </div>
          <div class="itm">
            <transition name="add" mode="out-in">
              <div class="award_suc" v-if="rpc_add">+{{award.num}}</div>
            </transition>

            <div class="tit">Rpc</div>
            <div class="num">{{rpc|numFormatD}}</div>
          </div>
        </div>
        <div class="draw_box">
          <div v-if="awards.length">
            <div
              v-for="(item, index) in awards"
              class="item"
              :key="item.key"
              :class="['item' + index, { active: index == current }]"
            >
              <!-- 奖品图片110x78px -->
              <img class="product" :src="item.images">
              <div class="name_box">
                <span class="num">{{item.num}}</span>
                {{item.title}}
              </div>
              <!-- {{ item.id }} {{ index }} -->
            </div>
            <div class="item btn" @click="start">Mulai</div>
          </div>
        </div>
        <div class="note_box" v-if="tipsList.length">
          <transition name="fade" mode="out-in">
            <div
              key="last"
              v-if="circleshow"
            >{{tipsList[circleIndex].username}} Dapat hadiah {{ tipsList[circleIndex].prize_title }}</div>
            <div
              key="index"
              v-else
            >{{tipsList[circleIndex].username}} Dapat hadiah {{ tipsList[circleIndex].prize_title }}</div>
          </transition>
        </div>
      </div>
    </div>
    <div class="suc_mask" v-show="suc_show" :class="'draw_type_'+drawType.category">
      <div :class="['cont_box ', {reward : mask_type == 1} ]">
        <div class="cnt" v-if="mask_type == 1">Selamat!</div>
        <div class="cnt" v-else-if="mask_type == 2">Tidak ada lagi kacang!</div>
        <div class="cnt" v-else-if="mask_type == 3">Maaf! Tidak terjawab</div>
        <div class="draw_img">
          <img v-if="mask_type == 1" :src="award.images" alt>
          <img v-else src="../../assets/img/draw/draw_face.png" alt>
        </div>
        <div class="subcnt" v-if="mask_type == 1">Dapat bonus {{award.num}}{{award.title}}</div>
        <div class="subcnt" v-else-if="mask_type == 2"></div>
        <div class="subcnt" v-else-if="mask_type == 3">Terima kasih telah berpartisipasi</div>
        <div class="sure_btn" v-if="mask_type == 1" @click="showAddPrize">Oke</div>
        <div
          class="sure_btn"
          v-else-if="mask_type == 2"
          @click="jumpRechargePage()"
        >Hasilkan kacang hi</div>
        <div class="sure_btn" v-else-if="mask_type == 3" @click="drawAgain()">Oh lagi!</div>
      </div>
      <div class="close_btn" @click="showAddPrize"></div>
    </div>
  </div>
</template>
<script>
import Vue from "vue";
import { Toast, Dialog } from "vant";
import TopHead from "@/components/TopHead";
import default_header from "@/assets/img/share_header.png";
import high_word from "@/assets/img/draw/draw_high_word.png";
import low_word from "@/assets/img/draw/draw_low_word.png";
import { base64Encode, randomString, reverseString } from "utils/tools";
import { getChange, getTipsList, getPrizeList, draw } from "@/utils/ajax";
Vue.use(Toast).use(Dialog);

export default {
  name: "DrawStart",
  data() {
    return {
      head_img: default_header,
      draw_title: high_word,
      title: "",
      tipsList: [],
      chance: 0, //抽奖机会
      suc_show: false,
      show: true,
      circleIndex: 0,
      circleshow: true,
      node_timer: null, //提示的定时器
      draw_timer: null, //抽奖的定时器
      current: 0,
      awards: [],
      speed: 200, // 速度
      diff: 12, // 速度增加的值
      award: {}, // 抽中的奖品
      time: 0, // 记录开始抽奖时的时间
      mask_type: 1, //1为中奖  2为嗨豆不够  3为未中奖
      money: 0, //嗨豆量
      unit: 0, //抽奖消耗嗨豆
      isReward: false,
      isComplete: false,
      rpc: 0,
      money_add: false, //中奖嗨豆
      rpc_add: false, //中奖rpc
      reward_info: null //中奖信息
    };
  },
  components: {
    TopHead
  },
  computed: {
    drawType() {
      let info = this.$store.state.drawType;
      if (info.category == 1) {
        this.draw_title = low_word;
        this.title = "Level Junior";
      } else if (info.category == 2) {
        this.draw_title = high_word;
        this.title = "Level Tinggi";
      }
      return info;
    }
  },
  created() {
    this.timeCircle();
    this.getPrizeData();
    this.getTipsData();
  },
  beforeDestroy() {
    if (this.node_timer) {
      clearTimeout(this.node_timer);
    }
    if (this.draw_timer) {
      clearTimeout(this.draw_timer);
    }
  },
  methods: {
    goBack() {
      this.$router.push("/draw");
    },
    jumpRechargePage() {
      this.$getSystemInfoFromApp("h5Business", "", true);
    },
    getKey(str) {
      let token = this.$store.state.appInfo.Authorization;
      return base64Encode(this.$md5(str + token + "-" + reverseString(token)));
    },
    signClick() {
      this.sign_show = true;
    },
    showAddPrize() {
      this.suc_show = false;
      this.money = this.reward_info.bean_amount;
      this.rpc = this.reward_info.gold_amount;
      if (this.reward_info.reward_type == 2) {
        this.money_add = true;
        setTimeout(() => {
          this.money_add = false;
        }, 700);
      } else if (this.reward_info.reward_type == 3) {
        this.rpc_add = true;
        setTimeout(() => {
          this.rpc_add = false;
        }, 700);
      }
    },
    timeCircle() {
      this.circleIndex += 1;
      if (this.circleIndex >= this.tipsList.length) {
        this.circleIndex = 0;
      }
      this.circleshow = !this.circleshow;
      this.node_timer = setTimeout(() => {
        clearTimeout(this.node_timer);
        this.timeCircle();
      }, 3000);
    },
    start() {
      // 开始抽奖

      if (!this.isComplete) {
        this.award = {};
        this.reward_info = null;
        this.drawHandle();
        this.isComplete = true;
      }
    },
    drawAward() {
      // 请求接口
      this.time = Date.now();
      this.speed = 200;
      this.move();
    },
    move() {
      this.draw_timer = setTimeout(() => {
        clearTimeout(this.draw_timer);
        this.current++;
        if (this.current > 7) {
          this.current = 0;
        }

        // 若抽中的奖品id存在，则开始减速转动
        if ((Date.now() - this.time) / 1000 > 2) {
          this.speed += this.diff; // 转动减速
          // 若转动时间超过4秒，并且奖品id等于小格子的奖品id，则停下来！
          if (
            (Date.now() - this.time) / 1000 > 4 &&
            this.award.id == this.awards[this.current].id
          ) {
            setTimeout(() => {
              this.suc_show = true;
              this.isComplete = false;
            }, 500);
            return;
          }

          // 若抽中的奖品不存在，则加速转动
        } else {
          this.speed -= this.diff; // 转动加速
          if (this.speed < this.diff) {
            this.speed = this.diff;
          }
        }

        this.move();
      }, this.speed);
    },
    getTipsData() {
      let data = {
        key: this.getKey("prize-tips-"),
        category: this.drawType.category
      };
      getTipsList(this.$resultParams(data)).then(result => {
        if (result.code == 200) {
          this.tipsList = result.data.list;
        }
      });
    },
    getPrizeData() {
      let data = {
        key: randomString(),
        category: this.drawType.category
      };
      getPrizeList(this.$resultParams(data)).then(result => {
        if (result.code == 200) {
          //// TODO:
          this.awards = result.data.list;
          this.money = result.data.bean_amount;
          this.unit = result.data.single_prize;
          this.rpc = result.data.gold_amount;
          if (!result.data.watch_advert) {
            this.sendDrawChance();
          }
        }
      });
    },
    sendDrawChance() {
      let data = {
        key: this.getKey("prize-watch-advert-"),
        category: this.drawType.category
      };
      getChange(this.$resultParams(data)).then(result => {
        if (result.code == 200) {
          //// TODO:
          this.chance = result.data.num;
        }
      });
    },
    drawHandle() {
      let data = {
        key: this.getKey("prize-start-"),
        hideloading: true,
        category: this.drawType.category
      };
      draw(this.$resultParams(data)).then(result => {
        if (result.code == 200) {
          this.award = result.data.result;
          this.isReward = result.data.isReward;
          this.reward_info = result.data;
          if (result.data.isReward) {
            this.mask_type = 1;
          } else {
            this.mask_type = 3;
          }
          //如果数据正常开始抽奖
          this.drawAward();
        } else if (result.code == 41008) {
          this.suc_show = true;
          this.mask_type = 2;
          this.isComplete = false;
        } else if (result.code === 20009) {
          //活跃度不足
          Dialog.confirm({
            cancelButtonText: "Batalkan",
            confirmButtonText: "Niakkan Skor",
            message: `Skor Anda tidak cukup untuk berpartisipasi, silahkan tingkatkan skor Anda terlebih dahulu`
          })
            .then(() => {
              this.$store.dispatch("changeRouteFrom", "/draw");
              this.$store.dispatch("changeSkorNeedInfo", result.data);
              this.$router.push("/skornone");
            })
            .catch(() => {
              this.isComplete = false;
            });
        } else if (result.code === 47011) {
          Dialog.confirm({
            cancelButtonText: "batal",
            confirmButtonText: "mulai",
            message: "Anda harus selesaikan verifikasi wajah untuk melanjutkan"
          })
            .then(() => {
              Vue.prototype.$getSystemInfoFromApp("goVerifiedYn");
            })
            .catch(() => {
              this.isComplete = false;
              // on cancel
            });
          this.isComplete = false;
        } else {
          this.isComplete = false;
          Toast(result.msg);
        }
      });
    },
    drawAgain() {
      this.suc_show = false;
    }
  }
};
</script>

<style lang="less" scoped src="../../assets/css/draw.less"></style>
