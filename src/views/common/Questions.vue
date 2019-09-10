<template>
  <div class="Questions">
    <top-head title="常见问题" @leftClick="goBack"></top-head>
    <div class="list">
        <div class="item" v-for="(item,index) in list" :key="index">
            <div class="title">{{item.title}}</div>
            <div class="content">{{item.content}}</div>
        </div>
    </div>
  </div>
</template>
<script>
// import { getSystemInfoFromApp } from "@/assets/js/utils.js";
import TopHead from "@/components/TopHead";
export default {
  name: "Questions",
  data() {
    return {
      list: [
        {
          title: "怎么参与话题创作",
          content:
            "用户在发布动态时，只需要附带上今日话题的标签，发布成功后就算是成功参与了话题创作咯。"
        },
        {
          title: "为什么我发布的动态没被展示出来？",
          content:
            "新发布的动态不会立马被展示在首页，只有通过审核且发布的图片中没有夹杂模板图片的动态才有机会被展示在首页。"
        },
        {
          title: "在Hi拍怎么快速获得嗨豆？",
          content:
            "连续参与话题创作达到一定的天数后，即可获得嗨豆。邀请好友或去交易所购买别人出售的嗨豆也是快速获得嗨豆的途径。"
        },
        {
          title: "嗨豆有什么作用？",
          content:
            "嗨豆是Hi拍APP对创作用户的奖励凭证，用户通过创作，为平台做出贡献，所以持有嗨豆的用户，可以每周获得平台方的分红收益或在商城中兑换实物。"
        },
        {
          title: "嗨豆可以交易吗？有什么要求限制吗？",
          content:
            "嗨豆是可以交易的。用户可以将自己持有的嗨豆在交易所中出售，获得的收益100%归用户自己所有。想交易嗨豆的用户需要提前完成实名认证，没有实名认证的用户，无法获得分红或去交易所买卖嗨豆。"
        },
        {
          title: "什么时候获得分红？",
          content:
            "Hi拍APP的分红为每周日的23:59:59结算，对于处在冻结期的嗨豆将不参与本期分红。"
        },
        {
          title: "什么情况下嗨豆会被冻结？",
          content:
            "对于刚交易完成的嗨豆，平台会保留24小时的冻结期。冻结期主要用于防止交易双方发生经济纠纷。对于卖家主动确认收到款的订单交易将不存在冻结期。"
        },
        {
          title: "分红怎么提现？",
          content: "在APP中“我的”页面，点击“提现”按钮，选择提现金额并提现。"
        }
      ]
    };
  },
  created() {},
  components: {
    TopHead
  },
  methods: {
    goBack() {
        this.$getSystemInfoFromApp("closeWebPage");
    }
  }
};
</script>

<style lang="less" scoped  src="../../assets/css/style.less">
</style>
