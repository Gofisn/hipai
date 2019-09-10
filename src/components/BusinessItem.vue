<template>
  <div class="BusinessItem">
    <div class="main_cnt">
      <img :src="gitImgIcon(content.imgTyp)" alt>
      <div class="item">
        <div class="tit">{{content.leftTit}}</div>
        <div class="tit">{{content.rightTit}}</div>
      </div>
      <div class="item">
        <div class="sub_tit" :style="{color:content.leftsubcolor}">{{content.leftSub}}</div>
        <div class="sub_tit" :style="{color:content.rightsubcolor}">{{content.rightSub}}</div>
      </div>
      <div class="item">
        <div class="thr_tit" :style="{color:content.leftthrcolor}">{{content.leftThr}}</div>
        <div class="thr_tit" :style="{color:content.rightthrcolor}">{{content.rightThr}}</div>
      </div>
      <!-- <div class="tm lt">
        <div class="tit">{{content.leftTit}}</div>
        <div class="sub_tit">{{content.leftSub}}</div>
      </div>
      <div class="tm rt">
        <div class="tit">{{content.rightTit}}</div>
        <div class="sub_tit">{{content.rightSub}}</div>
        <div class="thr_tit">{{content.rightThr}}</div>
        <div class="not_tit">{{content.rightNot}}</div>
      </div>-->
    </div>
    <div class="btn_box">
      <span v-show="content.oneBtn" @click="oneClick">{{content.oneBtn}}</span>
      <span v-show="content.twoBtn" @click="twoClick">{{content.twoBtn}}</span>
    </div>
  </div>
</template>
<script>
import imgbuy from "@/assets/img/buy_btn.png";
import imgget from "@/assets/img/get_btn.png";
import imgsell from "@/assets/img/sell_btn.png";
export default {
  name: "BusinessItem",
  props: {
    // imgTyp: {
    //   default: 0
    // },
    content: Object
    // leftTit: String,
    // leftSub: String,
    // rightTit: String,
    // rightSub: String,
    // rightThr: String,
    // rightNot: String,
    // oneBtn: String,
    // twoBtn: String
  },
  mounted() {},

  methods: {
    gitImgIcon(img) {
      if (img === 0) {
        return imgbuy;
      } else if (img === 2) {
        return imgget;
      } else {
        return imgsell;
      }
    },
    oneClick() {
      this.$emit("oneClick");
    },
    twoClick() {
      this.$emit("twoClick");
    }
  }
};
</script>
<style lang="less" scoped >
.ellipsis {
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}
.BusinessItem {
  background: #fff;

  .main_cnt {
    color: #212121;
    font-size: 28px;
    // display: flex;
    padding: 20px;
    // justify-content: space-between;
    position: relative;
    img {
      width: 50px;
      height: 50px;
      margin-top: 20px;
      position: absolute;
      top: 20px;
      left: 20px;
    }
    .item {
      // flex: 1;
      margin: 0;
      left: 0;
      margin-left: 70px;
      display: flex;
      justify-content: space-between;
      .tit {
        line-height: 36px;
        padding: 8px 0;
      }
      .sub_tit {
        font-size: 22px;
        color: #595959;
        line-height: 36px;
      }
      .thr_tit {
        font-size: 22px;
        line-height: 36px;
        color: #999;
      }
    }

    // .tm {
    //   max-width: 500px;
    //   padding-left: 20px;
    //   &.lt {
    //     padding-left: 70px;
    //   }
    //   &.rt {
    //     text-align: right;
    //   }
    //   .tit {
    //     line-height: 36px;
    //     padding: 8px 0;
    //   }
    //   .sub_tit {
    //     font-size: 22px;
    //     color: #595959;
    //     line-height: 36px;
    //   }

    //   .thr_tit {
    //     font-size: 22px;
    //     line-height: 36px;
    //     color: #999;
    //   }
    //   .not_tit {
    //     font-size: 22px;
    //     line-height: 36px;
    //     color: #ff0044;
    //   }
    // }
  }

  .btn_box {
    text-align: right;
    padding: 30px 20px;
    padding-top: 0;
    span {
      color: #595959;
      font-size: 26px;
      line-height: 30px;
      padding: 8px 20px;
      margin-left: 20px;
      border-radius: 20px;
      border: 1px solid rgba(197, 197, 197, 1);
    }
  }
}
</style>

