import Vue from "vue";
import Router from "vue-router";

// 邀请好友
const Invite = () => import("@/views/team/Invite.vue");
// 邀请奖励
const InviteAward = () => import("@/views/team/InviteAward.vue");

// 分享
const Share = () => import("@/views/team/Share.vue");

const NoticeIndex = () => import("@/views/notice/NoticeIndex.vue");

// 任务
const ScrollList = () => import("@/views/scroll/ScrollList.vue");

// 商学院 场景问题
const Question = () => import("@/views/common/Question.vue");

// 交易所
const BusinessHome = () => import("@/views/business/BusinessHome.vue");
const WantBuy = () => import("@/views/business/WantBuy.vue");
const SellOut = () => import("@/views/business/SellOut.vue");
const SellResult = () => import("@/views/business/SellResult.vue");
const GoBuy = () => import("@/views/business/GoBuy.vue");
const BeansDetail = () => import("@/views/business/BeansDetail.vue");
const BusinessList = () => import("@/views/business/BusinessList.vue");
const BusinessNotice = () => import("@/views/business/BusinessNotice.vue");
const DetailSuccess = () => import("@/views/business/DetailSuccess.vue");
const DetailBuyin = () => import("@/views/business/DetailBuyin.vue");
const DetailSalein = () => import("@/views/business/DetailSalein.vue");
const PaySuccess = () => import("@/views/business/PaySuccess.vue");
const KLine = () => import("@/views/business/KLine.vue");
const RecycleInput = () => import("@/views/business/RecycleInput.vue");
const SellInput = () => import("@/views/business/SellInput.vue");


// 账户
const Account = () => import("@/views/account/Account");
const Recharge = () => import("@/views/account/Recharge");
const Cashout = () => import("@/views/account/Cashout");
const RechargeList = () => import("@/views/account/RechargeList");
const CashoutList = () => import("@/views/account/CashoutList");
const Ovo = () => import("@/views/account/Ovo");
const Dana = () => import("@/views/account/Dana");

// 商城
const Shop = () => import("@/views/shop/Shop.vue");
const ShopList = () => import("@/views/shop/ShopList.vue");
const ShopAddress = () => import("@/views/shop/ShopAddress.vue");
const PhoneBill = () => import("@/views/shop/PhoneBill.vue");

//
const GoldDetail = () => import("@/views/account/GoldDetail.vue");
const Skor = () => import("@/views/account/Skor.vue");
// 活跃度不足
const SkorNone = () => import("@/views/account/SkorNone.vue");

// 广告
const AdOne = () => import("@/views/ad/AdOne.vue");

// 签到
const SignIn = () => import("@/views/common/SignIn.vue");
// 抽奖
// 抽奖入口
const Draw = () => import('@/views/draw/Draw.vue')
// 抽奖开始
const DrawStart = () => import('@/views/draw/DrawStart.vue')
// 每日问答
const QuestionStart = () => import('@/views/game/QuestionStart.vue')
// 每日问答游戏页
const QuestionGame = () => import('@/views/game/QuestionGame.vue')

// 充值
const TopUp = () => import('@/views/topup/TopUp.vue')
const TopUpSure = () => import('@/views/topup/TopUpSure.vue')

// 收益详情
const Earnings = () => import('@/views/earnings/Earnings.vue')
// 收益排行
const EarningsRanking = () => import('@/views/earnings/EarningsRanking.vue')


Vue.use(Router);

export default new Router({
  mode: process.env.NODE_ENV === "development" ? "" : "history",
  base: process.env.NODE_ENV === "development" ? "" : "/web/",
  linkActiveClass: "active",
  routes: [
    // 任务列表
    {
      path: "/scroll-li",
      name: "ScrollList",
      component: ScrollList
    },

    // 通知
    {
      path: "/notice-idx",
      name: "NoticeIndex",
      component: NoticeIndex
    },
    // 邀请好友
    {
      path: "/invite",
      name: "Invite",
      component: Invite
    },
    // 邀请好友奖励
    {
      path: "/invite-award",
      name: "InviteAward",
      component: InviteAward
    },

    // 分享
    {
      path: "/share",
      name: "Share",
      component: Share
    },
    // 商学院
    {
      path: "/question",
      name: "Question",
      component: Question
    },
    {
      path: "/bs-home", //交易页面-首页
      name: "BusinessHome",
      component: BusinessHome,
      redirect: "/wantbuy",
      children: [{
          path: "wantbuy", //求购子页面
          name: "WantBuy",
          alias: "/wantbuy",
          component: WantBuy
        },
        {
          path: "sellout", //卖出子页面
          name: "SellOut",
          alias: "/sellout",
          component: SellOut
        }
      ]
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
    {
      //已完成
      path: "/bsd-success",
      name: "DetailSuccess",
      component: DetailSuccess
    },
    {
      //出售中
      path: "/bsd-salein",
      name: "DetailSalein",
      component: DetailSalein
    }, {
      //求购中
      path: "/bsd-buyin",
      name: "DetailBuyin",
      component: DetailBuyin
    },
    {
      // 交易-支付成功
      path: "/paysuc",
      name: "PaySuccess",
      component: PaySuccess
    },
    {
      // K线图
      path: "/kline",
      name: "KLine",
      component: KLine
    }, {
      // 输入想买信息
      path: "/recycle-input",
      name: "RecycleInput",
      component: RecycleInput
    }, {
      // 输入想卖信息
      path: "/sell-input",
      name: "SellInput",
      component: SellInput
    },
    {
      path: "/account", //账户
      name: "Account",
      component: Account
    },
    {
      path: "/cashout", //提现
      name: "Cashout",
      component: Cashout
    },
    {
      path: "/recharge", //充值
      name: "Recharge",
      component: Recharge
    },
    {
      path: "/reg-list", //充值列表
      name: "RechargeList",
      component: RechargeList
    },
    {
      path: "/cash-list", //提现列表
      name: "CashoutList",
      component: CashoutList
    },
    {
      path: "/ovo", //Ovo充值
      name: "Ovo",
      component: Ovo
    },
    {
      path: "/dana", //dana充值
      name: "Dana",
      component: Dana
    },
    {
      path: "/shop", //商城
      name: "Shop",
      component: Shop
    },
    {
      path: "/shop-li", //商城列表
      name: "ShopList",
      component: ShopList
    },
    {
      path: "/shop-address", //商城地址
      name: "ShopAddress",
      component: ShopAddress
    },
    {
      path: "/phone-bill", //话费充值
      name: "PhoneBill",
      component: PhoneBill
    },
    {
      path: "/gold", //Rpc
      name: "GoldDetail",
      component: GoldDetail
    },
    {
      path: "/skor", //Skor
      name: "Skor",
      component: Skor
    },
    {
      path: "/adone", //广告
      name: "AdOne",
      component: AdOne
    }, {

      path: '/skornone', //活跃度不足
      name: 'SkorNone',
      component: SkorNone
    },
    {
      path: '/signin', //签到
      name: 'SignIn',
      component: SignIn
    }, {
      path: '/draw', //抽奖
      name: 'Draw',
      component: Draw
    }, {
      path: '/draw-start', //抽奖
      name: 'DrawStart',
      component: DrawStart
    }, {
      path: '/game-start', //每日问答开始
      name: 'QuestionStart',
      component: QuestionStart

    },
    {
      path: '/game', //每日问答首页
      name: 'QuestionGame',
      component: QuestionGame
    },
    {
      path: '/topup', //充值
      name: 'TopUp',
      component: TopUp
    },
    {
      path: '/topup-sure', //充值
      name: 'TopUpSure',
      component: TopUpSure
    },
    {
      path: '/earnings', //收益详情
      name: 'Earnings',
      component: Earnings
    },
    {
      path: '/earnings-rank', //收益排行
      name: 'EarningsRanking',
      component: EarningsRanking
    }
  ]
})