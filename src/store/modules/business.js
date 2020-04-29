export const HOME_ACTIVE = 'HOME_ACTIVE';
export const LIST_ACTIVE = 'LIST_ACTIVE';
export const APPEAR_BACK = 'APPEAR_BACK';
export const SELLOUT_ORDER = 'SELLOUT_ORDER';
export const BUY_BUSINESS = 'BUY_BUSINESS';
export const BUSINESS_PAYID = 'BUSINESS_PAYID';
export const BUSINESS_PAYSUCCESS = 'BUSINESS_PAYSUCCESS';
export const BUSINESS_CONFIT = 'BUSINESS_CONFIT';

export default {
    state: {
        homeActive: 0, //交易首页标签页位置
        listActive: 0, //交易历史标签页位置
        appearBack: '', //申诉返回页面
        sellOrder: {}, //挂单结果
        buyBusiness: {}, //买入商家信息
        businessPayId: '', //待支付订单id
        businessPaySuccess: {}, //确认支付成功返回信息
        businessConfig: {}, //交易配置
    },
    mutations: {
        [HOME_ACTIVE](state, num) {
            state.homeActive = num;
        },
        [LIST_ACTIVE](state, num) {
            state.listActive = num;
        },
        [APPEAR_BACK](state, name) {
            state.appearBack = name;
        },
        [SELLOUT_ORDER](state, obj) {
            state.sellOrder = obj;
        },
        [BUY_BUSINESS](state, obj) {
            state.buyBusiness = obj;
        },
        [BUSINESS_PAYID](state, id) {
            state.businessPayId = id;
        },
        [BUSINESS_PAYSUCCESS](state, obj) {
            state.businessPaySuccess = obj;
        },
        [BUSINESS_CONFIT](state, obj) {
            state.businessConfig = obj;
        },

    },
    actions: {
        changeBusinessActive({
            commit
        }, num) {
            commit(HOME_ACTIVE, num);
        },
        changeBusinessListActive({
            commit
        }, num) {
            commit(LIST_ACTIVE, num)
        },
        changeAppearBack({
            commit
        }, name) {
            commit(APPEAR_BACK, name)
        },
        businessSellOutOrder({
            commit
        }, obj) {
            commit(SELLOUT_ORDER, obj)
        },
        buyBusinessMsg({
            commit
        }, obj) {
            commit(BUY_BUSINESS, obj)
        },
        changeBusinessPayId({
            commit
        }, id) {
            commit(BUSINESS_PAYID, id)
        },
        changeBusinessPaySuccess({
            commit
        }, obj) {
            commit(BUSINESS_PAYSUCCESS, obj)
        },
        changeBusinessConfig({
            commit
        }, obj) {
            commit(BUSINESS_CONFIT, obj)
        },

    }
}