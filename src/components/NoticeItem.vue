<template>
  <div class="rings_list">
    <div class="item">
      <div class="item_title">
        <img src="../assets/img/rings_tab.png"
             class="item_icon" />
        <div class="item_title_text">{{notice.title}}</div>
        <div class="item_title_no_reading"
             v-if="notice.isNoRead"></div>
      </div>
      <div class="item_centent">
        <div class="item_centent_text">{{notice.content}}</div>
        <div class="item_date">{{notice.date}}</div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "",
  components: {},
  props: {
    notice: Object
    // icon:String, 图标地址
    // title:String,
    // isNoRead:Boolean, 没有阅读true 阅读false
    // content:String, 
    // date:String
  },
  data () {
    return {};
  },
  methods: {

  },
  mounted () { }
};
</script>
<style lang="less" scoped>
.item {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 10px;
  .item_title {
    display: flex;
    width: 100%;
    flex-direction: row;
    justify-content: flex-start;
    .item_icon {
      width: 62px;
      height: 62px;
    }
    .item_title_text {
      flex: 1;
      margin: 12px 0px 10px 14px;
      height: 40px;
      font-size: 28px;
      font-family: PingFangSC-Regular;
      font-weight: 400;
      color: rgba(51, 51, 51, 1);
      line-height: 40px;
      letter-spacing: 1px;
    }
    .item_title_no_reading {
      display: inline-block;
      margin: 5px 20px;
      width: 16px;
      height: 16px;
      background: rgba(247, 23, 80, 1);
      border-radius: 50%;
    }
  }
  .item_centent {
    margin: 0px 0px 0px 76px;
    width: 88%;
    padding-bottom: 20px;
    border-bottom: rgba(229, 229, 229, 1) solid 1px;
    .item_centent_text {
      font-size: 26px;
      font-family: PingFangSC-Regular;
      font-weight: 400;
      color: rgba(145, 145, 145, 1);
      line-height: 37px;
      word-wrap: break-word;
      word-break: break-all;
    }
    .item_date {
      margin-top: 10px;
      font-size: 22px;
      font-family: PingFangSC-Regular;
      font-weight: 400;
      color: rgba(153, 153, 153, 1);
      line-height: 30px;
      letter-spacing: 1px;
    }
  }
}
.no_notice {
  margin: 215px auto 0px;
  width: 100%;
  text-align: center;
  .no_notice_img {
    width: 254px;
    height: 270px;
  }
  .text {
    margin-top: 20px;
    height: 40px;
    font-size: 28px;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: rgba(153, 153, 153, 1);
    line-height: 40px;
    letter-spacing: 1px;
  }
}
</style>