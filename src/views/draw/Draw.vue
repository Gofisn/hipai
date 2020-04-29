<template>
  <div class="Draw">
    <top-head title="Roda Hadiah" @leftClick="goBack"></top-head>
    <div class="main_box">
      <i class="coin1"></i>
      <i class="coin2"></i>
      <i class="coin3"></i>
      <div class="boll1"></div>
      <div class="mainword">
        <img src="../../assets/img/draw/draw_choose_title.png" alt>
      </div>
      <div class="draw_main">
        <div class="item low" @click="goDraw(low)">
          <div class="notice">1X main butuh {{low.pay_bean}} Hi-Koin</div>
        </div>
        <div class="item high" @click="goDraw(high)">
          <div class="notice">1X main butuh {{high.pay_bean}} Hi-Koin</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Vue from "vue";
import { Toast } from "vant";
import TopHead from "@/components/TopHead";
import { randomString } from "utils/tools";
import { getPrizeCategory } from "@/utils/ajax";
Vue.use(Toast);

export default {
  name: "Draw",
  data() {
    return {
      low: {},
      high: {}
    };
  },
  components: {
    TopHead
  },
  created() {
    this.getCategory();
  },
  methods: {
    goBack() {
      this.$getSystemInfoFromApp("closeWebPage");
    },
    getCategory() {
      let param = {
        key: randomString()
      };
      getPrizeCategory(this.$resultParams(param))
        .then(res => {
          if (res.code == 200) {
            this.low = res.data.level_junior;
            this.high = res.data.level_tinggi;
          }
        })
        .catch(err => {});
    },
    goDraw(info) {
      this.$store.dispatch("changeDrawType", info);
      this.$router.push('/draw-start')
    }
  }
};
</script>

<style lang="less" scoped src="../../assets/css/draw.less"></style>
