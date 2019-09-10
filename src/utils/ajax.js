import {
  POST,
  GET,
  POSTFORMAT
} from './service'
let base = '/api'
// 挂单列表
export const getBusinessBuyList = (data) => GET(base + '/transv1/sales/get-list', data)
// 用户信息
export const getUserInfo = (data) => GET(base + '/user/info', data)
// 申请挂单
export const goSellOut = (data) => POST(base + '/transv1/sales/create-order', data)
// 买入嗨豆
export const goBuyHiBean = (data) => POST(base + '/transv1/trans/buy', data)
// 待支付订单详情
export const businessPayDetail = (data) => GET(base + '/transv1/trans/pay-detail', data)
// 买家取消订单
export const businessCancleOrder = (data) => POST(base + '/transv1/trans/cancel-order', data)
// 买家确认付款
export const businessPaySure = (data) => POST(base + '/transv1/trans/buyer-pay', data)
//  待支付订单列表
export const businessWaitPay = (data) => GET(base + '/transv1/order/wait-pay-list', data)
//  出售中订单列表
export const businessSellList = (data) => GET(base + '/transv1/order/sale-list', data)
//  待确认订单列表
export const businessWaitSure = (data) => GET(base + '/transv1/order/wait-sure-list', data)
//  历史订单列表
export const businessHistoryOrder = (data) => GET(base + '/transv1/order/order-list', data)
// 获取交易买卖相关配置信息
export const getBusinessConfig = (data) => GET(base + '/conf/get-trans-conf', data)
// 申请撤回销售订单
export const businessApplyDown = (data) => POST(base + '/transv1/sales/apply-down', data)
// 确认收款
export const businessGetSure = (data) => POST(base + '/transv1/trans/seller-sure', data)
// 撤销订单退单数量试算
export const businessCalculatin = (data) => GET(base + '/transv1/sales/return-calculation', data)
// 嗨豆明细
export const beanDetail = (data) => GET(base + '/user/bean-log', data)
// 交易申诉接口
export const businessAppeal = (data) => POSTFORMAT(base + '/transv1/trans/appeal', data)
// 交易通知接口
export const businessNotice = (data) => GET(base + '/notice/list', data)
// 是否存在未读通知
export const businessCheckNotice = (data) => GET(base + '/notice/check-has-read', data)

// 通知tab是否存在未读通知
export const noticeTabIsRead = (data) => GET('/api/notice/check-has-read', data)
// 系统通知列表
export const noticeSystem = (data) => GET('/api/notice/list', data)
// 评论通知列表
export const noticeComment = (data) => GET('/api/notice/comment-list', data)
// 点赞通知列表
export const noticePrize = (data) => GET('/api/notice/like-list', data)
// 提现首页
export const outCashData = (data) => POST('/api/redeem/cash', data)
// 用户信息
export const userInfo = (data) => GET('/api/user/info', data)
// 用户全信息
export const userInfoData = (data) => GET('/api/redeem/user', data)
// 获取银行卡
export const bankCard = (data) => GET('/api/ocr/bank-info', data)
// 添加银行卡
export const addBankCard = (data) => POST('/api/ocr/bankcard', data)
// 获取开户行
export const bankName = (data) => POST('/api/ocr/bank-name', data)
// 提现金币明细
export const outCashDetail = (data) => GET('/api/redeem/list', data)
// 获取提现次数
export const outCashNumber = (data) => GET('/api/redeem/cash-count', data)
// 是否实名认证
export const isOcrInfo = (data) => GET('/api/ocr/info', data)

// 邀请用户进度
export const inviteInfo = (data) => GET(base + '/invite/info', data)
// 邀请好友获取用户信息
export const shareInfo = (data) => GET(base + '/invite/user-info', data)
// 邀请好友列表
export const inviteList = (data) => GET(base + '/invite/invite-list', data)



