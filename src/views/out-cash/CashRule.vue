<template>
  <div class='cash_rule'>
    <TopHeader title="分红及金币提现说明"
               @leftClick="goBack" />
    <div class="layout"></div>
    <div class="content">
      <div class="question">
        <img src="../../assets/img/wen_btn.png"
             class="question_icon">
        <div class="text_box">
          <div class="text_title">什么是金币，金币有什么作用？</div>
          <div class="text_content">金币是由上海斐栎科技有限公司根据用户当周持有的嗨豆数赠与用户的分红奖励，以每周日晚23:59:59结算。</div>
        </div>
      </div>
      <div class="rules">
        <div class="rules_title">提现规则</div>
        <div class="rules_item">1. 用户每次每天提现不得超过50000金币；</div>
        <div class="rules_item">2. 首次提现需要抵扣人脸识别所产生的费用，共100金币； </div>
        <div class="rules_item">3. 每周每个嗨豆兑换的金币数不是恒定的，根据当周的实际收益额按比例分成。故，每次的金币数量也是不定的；</div>
        <div class="rules_item">4. 只有用户完成了实名认证才可以提现。</div>
      </div>
    </div>
  </div>
</template>
<script>
import TopHeader from "@/components/TopHead";
// import { getSystemInfoFromApp } from "@/assets/js/utils"
export default {
  name: 'cash-rule',
  components: {
    TopHeader
  },
  data () {
    return {

    }
  },
  methods: {
    goBack () {
      this.$router.replace('/cash-idx');
    },
  },
  mounted () {

  }
}
</script>
<style lang='less' scoped>
.cash_rule {
  width: 100%;
  .layout {
    height: 90px;
  }
  .question {
    margin: 30px 30px 0px;
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    border-bottom: 1px solid rgba(229, 229, 229, 0.6);
    .question_icon {
      width: 40px;
      height: 46px;
      margin-right: 10px;
    }
    .text_box {
      flex: 1;
      .text_title {
        font-size: 30px;
        font-family: PingFangSC-Medium;
        font-weight: 500;
        color: rgba(33, 33, 33, 9);
        line-height: 46px;
        letter-spacing: 1px;
      }
      .text_content {
        margin: 10px 7px 0px 12px;
        font-size: 26px;
        font-family: PingFangSC-Regular;
        font-weight: 400;
        color: rgba(89, 89, 89, 0.8);
        line-height: 37px;
        margin-bottom: 20px;
      }
    }
  }
  .rules {
    margin: 10px 30px;
    .rules_title {
      height: 42px;
      font-size: 30px;
      font-family: PingFangSC-Medium;
      font-weight: 500;
      color: rgba(33, 33, 33, 0.9);
      line-height: 42px;
      letter-spacing: 1px;
      padding: 10px 0;
    }
    .rules_item {
      font-size: 26px;
      font-family: PingFangSC-Regular;
      font-weight: 400;
      color: rgba(89, 89, 89, 0.8);
      line-height: 42px;
    }
  }
}
</style>
