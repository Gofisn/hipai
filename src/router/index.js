import Vue from "vue";
import Router from "vue-router";

// 交易所
const BusinessHome = () => import('@/views/business/BusinessHome.vue')
const WantBuy = () => import('@/views/business/WantBuy.vue')
const SellOut = () => import('@/views/business/SellOut.vue')
const SellResult = () => import('@/views/business/SellResult.vue')
const GoBuy = () => import('@/views/business/GoBuy.vue')
const BuySubmit = () => import('@/views/business/BuySubmit.vue')
const GiveBeans = () => import('@/views/business/GiveBeans.vue')
const BusinessAppeal = () => import('@/views/business/BusinessAppeal.vue')
const BeansDetail = () => import('@/views/business/BeansDetail.vue')
const BusinessList = () => import('@/views/business/BusinessList.vue')
const BusinessNotice = () => import('@/views/business/BusinessNotice.vue')
// 邀请好友
const Invite = () => import('@/views/common/Invite.vue')
// 常见问题
const Questions = () => import('@/views/common/Questions.vue')
// 分享
const Share = () => import('@/views/common/Share.vue')

const OutCashIndex = () => import('@/views/out-cash/OutCashIndex.vue')
const CashRecord = () => import('@/views/out-cash/CashRecord.vue')
const CashDetail = () => import('@/views/out-cash/OutCashDetail.vue')
const CashRule = () => import('@/views/out-cash/CashRule.vue')
const NoticeIndex = () => import('@/views/notice/NoticeIndex.vue')
const Contact = () => import('@/views/contact/Contact.vue')
const Strategy = () => import('@/views/Strategy.vue')

Vue.use(Router);

export default new Router({
  mode: process.env.NODE_ENV === 'development' ? '' : 'history',
  base: process.env.NODE_ENV === 'development' ? '' : '/web/',
  linkActiveClass: "active",
  routes: [
    // {
    //   //交易页面-首页
    //   path: "/",
    //   name: "GoBuy",
    //   component: GoBuy,
    // },

    {
      path: "/bs-home", //交易页面-首页
      name: "BusinessHome",
      component: BusinessHome,
      redirect: '/wantbuy',
      children: [{
        path: "wantbuy", //求购子页面
        name: "WantBuy",
        alias: '/wantbuy',
        component: WantBuy,
      }, {
        path: "sellout", //卖出子页面
        name: "SellOut",
        alias: '/sellout',
        component: SellOut,
      },]
    },

    {
      // 交易-卖出-提交订单
      path: "/sellresult",
      name: "SellResult",
      component: SellResult
    },
    {
      // 交易-买入
      path: "/gobuy",
      name: "GoBuy",
      component: GoBuy
    },
    {
      // 交易-买入-提交订单
      path: "/buysubmit",
      name: "BuySubmit",
      component: BuySubmit
    },
    {
      // 交易-发放嗨豆
      path: "/givebeans",
      name: "GiveBeans",
      component: GiveBeans
    },
    {
      // 交易-交易申诉
      path: "/bs-appeal",
      name: "BusinessAppeal",
      component: BusinessAppeal
    },
    {
      // 交易-嗨豆明细
      path: "/beansdetail",
      name: "BeansDetail",
      component: BeansDetail
    },
    {
      // 交易-交易记录
      path: "/bs-list",
      name: "BusinessList",
      component: BusinessList
    },
    {
      // 交易-系统通知
      path: "/bs-notice",
      name: "BusinessNotice",
      component: BusinessNotice
    },




    // 提现首页
    {
      path: "/cash-idx",
      name: "OutCashIndex",
      component: OutCashIndex
    },
    // 金币明细
    {
      path: "/cash-record",
      name: "CashRecord",
      component: CashRecord
    },
    // 提现详情
    {
      path: "/cash-detail",
      name: "CashDetail",
      component: CashDetail
    },
    // 提现说明
    {
      path: "/cash-rule",
      name: "CashRule",
      component: CashRule
    },
    // 通知
    {
      path: "/notice-idx",
      name: "NoticeIndex",
      component: NoticeIndex
    },
    // 联系客服 
    {
      path: "/contact",
      name: "Contact",
      component: Contact
    },
    // 玩法攻略 
    {
      path: "/strategy",
      name: "Strategy",
      component: Strategy
    },

    // 邀请好友 
    {
      path: "/invite",
      name: "Invite",
      component: Invite
    },
    // 常见问题 
    {
      path: "/question",
      name: "Questions",
      component: Questions
    },
    // 分享 
    {
      path: "/share",
      name: "Share",
      component: Share
    },
  ]
})