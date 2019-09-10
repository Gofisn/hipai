<template>
  <div class='out_cash_detail'>
    <div class="out_cash_detail_title">提现详情</div>
    <div class="out_cash_detail_box">
      <div class="detail">
        <div class="top_icon"></div>
        <div class="top_text">提现申请已提交，等待银行处理</div>
      </div>
      <div class="center">
        <div class="process">
          <div class="load"></div>
        </div>
      </div>
      <div class="detail">
        <div class="bottom_icon"></div>
        <div class="bottom_text">预计2个小时内到账</div>
      </div>
    </div>
    <div class="finshed_btn"
         @click="handleClick">完成</div>
  </div>
</template>
<script>
export default {
  name: '',
  components: {

  },
  data () {
    return {

    }
  },
  methods: {
    handleClick () {
      this.$router.push('/cash-idx')
    }
  },
  mounted () {

  }
}
</script>
<style lang='less' scoped>
.out_cash_detail {
  width: 100%;
  height: 100%;
  background: rgba(244, 244, 244, 1);
  .out_cash_detail_title {
    width: 100%;
    height: 92px;
    background: #fff;
    text-align: center;
    font-size: 36px;
    font-family: PingFangSC-Medium;
    font-weight: 500;
    color: rgba(34, 34, 34, 1);
    line-height: 92px;
  }
  .out_cash_detail_box {
    padding: 40px 157px 42px 100px;
    background: #fff;
    .detail {
      height: 50px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .top_icon {
        width: 50px;
        height: 50px;
        margin-right: 20px;
        background: url(../../assets/img/yes_btn.png) no-repeat center;
        background-size: 100% 100%;
      }
      .top_text {
        flex: 1;
        line-height: 50px;
        text-align: left;
        font-size: 28px;
        font-family: PingFangSC-Regular;
        font-weight: 400;
        color: rgba(246, 26, 99, 1);
      }
      .bottom_icon {
        width: 50px;
        height: 50px;
        margin-right: 20px;
        background: url(../../assets/img/cash_icon.png) no-repeat center;
        background-size: 100% 100%;
      }
      .bottom_text {
        flex: 1;
        line-height: 50px;
        text-align: left;
        font-size: 28px;
        font-family: PingFangSC-Regular;
        font-weight: 400;
        color: rgba(33, 33, 33, 1);
      }
    }
    .center {
      height: 118px;
      .process {
        width: 8px;
        height: 118px;
        background: rgba(197, 197, 197, 1);
        margin: -1px 21px;
        .load {
          width: 100%;
          height: 60px;
          background: rgba(247, 24, 87, 1);
        }
      }
    }
  }
  .finshed_btn {
    margin: 70px auto 0;
    width: 600px;
    height: 90px;
    text-align: center;
    background: rgba(255, 255, 255, 1);
    border-radius: 20px;
    border: 1px solid rgba(197, 197, 197, 0.8);
    font-size: 34px;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: rgba(89, 89, 89, 1);
    line-height: 90px;
  }
}
</style>