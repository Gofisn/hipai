import {
  POST,
  GET,
  POSTFORMAT
} from './service'
let base = '/api'

// 用户信息
export const getUserInfo = (data) => GET(base + '/user/info', data)

// 通知tab是否存在未读通知
export const noticeTabIsRead = (data) => GET(base + '/notice/check-has-read', data)
// 系统通知列表
export const noticeSystem = (data) => GET(base + '/notice/list', data)
// 评论通知列表
export const noticeComment = (data) => GET(base + '/notice/comment-list', data)
// 点赞通知列表
export const noticePrize = (data) => GET(base + '/notice/like-list', data)
// 提现首页
export const outCashData = (data) => POST(base + '/redeem/cash', data)
// 用户信息
export const userInfo = (data) => GET(base + '/user/info', data)
// 用户全信息
export const userInfoData = (data) => GET(base + '/redeem/user', data)

// 是否实名认证
export const isOcrInfo = (data) => GET(base + '/ocr/info', data)


// 邀请好友获取用户信息
export const shareInfo = (data) => GET(base + '/invite/user-info', data)


// 卷轴列表
export const scrollList = (data) => GET(base + '/scroll/list', data)
// 卷轴进行中
export const scrollIn = (data) => GET(base + '/scroll/task-ing', data)
// 卷轴已完成
export const scrollComplete = (data) => GET(base + '/scroll/task-complete', data)
// 兑换卷轴
export const scrollExchange = (data) => POST(base + '/scroll/exchange-scroll', data)
// 判断卷轴中是否存在进行中的卷轴
export const checkHasScroll = (data) => POST(base + '/scroll/check-has-scroll', data)


// 上报广告观看结果
export const adResult = (data) => POST(base + '/adv/post-res', data);
// 我的团队 （邀请好友）
export const teamInfo = (data) => GET(base + '/activity/my-team', data);
// 团队用户收益系数
export const teamAwardInfo = (data) => GET(base + '/activity/contribute-detail', data);
// 用户团队分享得奖励
export const teamAwardShare = (data) => POST(base + '/activity/share', data);


// 交易所
// 挂单列表
export const getBusinessBuyList = (data) => GET(base + '/transv1/sales/get-list', data)
// 申请挂单
export const goSellOut = (data) => POST(base + '/transv1/sales/create-order', data)
// 买入嗨豆
export const goBuyHiBean = (data) => POST(base + '/transv1/trans/buy', data)

//  交易所订单列表
export const businessList = (data) => GET(base + '/transv1/order/list', data)
//  交易所订单详情
export const businessDetail = (data) => GET(base + '/transv1/order/detail', data)
// 获取交易买卖相关配置信息
export const getBusinessConfig = (data) => GET(base + '/conf/get-trans-conf', data)
// 申请撤回销售订单
export const businessApplyDown = (data) => POST(base + '/transv1/sales/apply-down', data)

// 撤销订单退单数量试算
export const businessCalculatin = (data) => GET(base + '/transv1/sales/return-calculation', data)
// 嗨豆明细
export const beanDetail = (data) => GET(base + '/user/bean-log', data)

// 收购列表
export const getRecycleList= (data)=>GET(base+'/transv1/recycle/get-list',data)
// 发起收购
export const creatRecycle=(data)=>POST(base+'/transv1/recycle/create-order',data)
// 撤销收购订单
export const recycleApplyDown=(data)=>POST(base+'/transv1/recycle/apply-down',data)
// 收购订单详情
export const getRecycleDetail= (data)=>GET(base+'/transv1/order/recycle-detail',data)
// 卖出嗨豆
export const goSellHiBean = (data) => POST(base + '/transv1/trans/sell', data)
// 收购历史订单列表
export const getRecycleOrderList= (data)=>GET(base+'/transv1/order/recycle-list',data)
// 当前用户等级
export const getUserLevel= (data)=>GET(base+'/vip/user',data)


// 交易通知接口
export const businessNotice = (data) => GET(base + '/notice/list', data)
// 是否存在未读通知
export const businessCheckNotice = (data) => GET(base + '/notice/check-has-read', data)


// 账户
// 充值信息
export const rechargeInfo = (data) => GET(base + '/recharge/pay-method', data)
// 获取充值码
export const getRechargeCode = (data) => POST(base + '/recharge/generate-code', data)
//  充值记录
export const rechargeList = (data) => GET(base + '/recharge/record', data)
// 获取支付渠道
export const getPayType = (data) => GET(base + '/recharge/pay-type', data);

//  提现信息
export const cashoutInfo = (data) => GET(base + '/redeem/bank-list', data)
// 提现申请
export const cashoutGo = (data) => POST(base + '/redeem/index', data)
// 提现列表
export const cashoutList = (data) => GET(base + '/redeem/list', data)



// 商城
export const shopGoods = (data) => GET(base + '/shop/goods-list', data)
// 兑换商品
export const shopExchange = (data) => POST(base + '/shop/exchange', data)
// 商城购买列表
export const shopList = (data) => GET(base + '/shop/order-list', data)
// 嗨豆单价
export const shopBeanPrice = (data) => POST(base + '/shop/bean-price', data)
// 获取话费充值详情
export const shopPhoneBill = (data) => POST(base + '/shop/phone-bill', data)


// 分享facebook
export const invitShareInfo = (data) => POST(base + '/invite/share-info', data)
// 金币明细
export const goldDetail = (data) => GET(base + '/user/gold-detail', data)
// 活跃度
export const activityInfo = (data) => GET(base + '/user/activity-info', data)

// K线图
// 嗨豆日线
export const getLineDate = (data) => GET(base + '/transv1/data/bean-day-line', data)
// 嗨豆日线
export const getLineHour = (data) => GET(base + '/transv1/data/bean-hour-line', data)
// 嗨豆分钟线
export const getLineMinute = (data) => GET(base + '/transv1/data/bean-minute-line', data)
// 交易最新列表
export const getTransList = (data) => GET(base + '/transv1/data/trans-list', data)




// 用户限制参数
export const getUserLimit = (data) => GET(base + '/user/limit', data)

// 签到
// 签到请求
export const signInMake = (data) => POST(base + '/user-sign-in/make', data)
export const getAdConfig = (data) => POST(base + '/conf/ad-conf', data)
// 签到跑马灯详情
export const signInDetail = (data) => GET(base + '/user-sign-in/tips', data)


//今日是否已答题
export const getQuestionChance = (data) => GET(base + '/question/check-today-log', data)
//获取答题内容
export const getQuestionList = (data) => GET(base + '/question/list', data)
//提交答题结果
export const valideAnswer = (data) => POST(base + '/question/check', data)
//提交答题结果
export const submitAnswer = (data) => POST(base + '/question/user-log', data)

//看广告获取抽奖机会
export const getChange = (data) => POST(base + '/prize/watch-advert', data)
//抽奖跑马灯
export const getTipsList = (data) => GET(base + '/prize/tips', data)
//奖品列表
export const getPrizeList = (data) => GET(base + '/prize/list', data)
//用户抽奖
export const draw = (data) => POST(base + '/prize/make', data)
//广告配置
export const setAd = (data) => POST(base + '/conf/ad-conf', data)
// 抽奖消耗嗨豆
export const getPrizeCategory = (data) => GET(base + '/prize/category', data)

// 昨日收益信息
export const getYesterdayEarnings = (data) => GET(base + '/user/yesterday-earnings', data)
// 收益排行
export const getEarningsRank = (data) => GET(base + '/user/earnings-rank', data)














