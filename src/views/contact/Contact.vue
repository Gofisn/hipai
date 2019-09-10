<template>
  <div class='contact'>
    <TopHeader title="联系客服"
               @leftClick="goBack" />
    <div class="layout"></div>
    <textarea class="question"
              cols="30"
              rows="10"
              v-model="value"
              placeholder="输入您的问题，我们会尽快回复您！"></textarea>
    <div class="submit"
         :class="value?'active':'noactive'"
         @click="handleSubmit">提交</div>
  </div>
</template>
<script>
import TopHeader from "@/components/TopHead";
import { Dialog } from "vant";
export default {
  name: '',
  components: {
    TopHeader
  },
  data () {
    return {
      value: ''
    }
  },
  methods: {
    goBack () {
      alert("goBack")
    },
    handleSubmit () {
      Dialog.setDefaultOptions({
        confirmButtonText: '提交成功',
        confirmButtonColor: 'rgba(51, 123, 208, 1)',
      })
      Dialog.alert({
        title: '',
        message: '&nbsp;<br/>您的问题已经提交客服，为你带来的不便，敬请谅解！<br/>&nbsp;'
      }).then(() => {
      });
    }
  },
  mounted () {

  }
}
</script>
<style lang="less" scoped>
.contact {
  width: 100%;
  height: 100%;
  background: rgba(244, 244, 244, 1);
  .layout {
    height: 90px;
  }
  .question {
    margin: 30px 30px 40px;
    display: inline-block;
    font-family: PingFangSC-Regular;
    width: 690px;
    padding: 20px;
    height: 260px;
    background: rgba(255, 255, 255, 1);
    border-radius: 20px;
    resize: none;
    border: 1px solid rgba(197, 197, 197, 1);
    box-sizing: border-box;
    text-indent: 50px;
    line-height: 37px;
    color: #666;
    &::placeholder {
      font-size: 26px;
      font-family: PingFangSC-Regular;
      font-weight: 400;
      color: rgba(197, 197, 197, 1);
      line-height: 37px;
    }
  }
  .submit {
    margin: 0 auto;
    width: 600px;
    height: 90px;
    text-align: center;
    font-size: 36px;
    font-family: PingFangSC-Medium;
    font-weight: 500;
    line-height: 90px;
    color: rgba(255, 255, 255, 1);
    border-radius: 20px;
  }
  .active {
    background: linear-gradient(
      85deg,
      rgba(247, 23, 80, 1) 0%,
      rgba(248, 23, 80, 1) 100%
    );
    box-shadow: 0px 6px 16px 0px rgba(175, 0, 0, 0.25);
  }
  .noactive {
    background: rgba(197, 197, 197, 1);
  }
}
</style>