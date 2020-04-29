import Vue from "vue";
import Vuex from "vuex";
import business from './modules/business';
export const CHANGE_USERINFO = 'CHANGE_USERINFO';
export const RECHARGE_INFO = 'RECHARGE_INFO';
export const ROUTE_FROM = 'ROUTE_FROM';
export const SHOP_INFO = 'SHOP_INFO';
export const DRAW_TYPE = 'DRAW_TYPE';
export const SKOR_NEED_INFO = 'SKOR_NEED_INFO'

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    userInfo: {},
    appInfo: {},
    rechargeInfo: {}, //要充值的信息
    routeFrom: '', //从APP进入还是某个页面进入
    shopInfo: {}, //商城购买信息
    drawType: {}, //抽奖类型
    skorNeedInfo: {}, //skor不足需要信息
  },
  mutations: {
    [CHANGE_USERINFO](state, obj) {
      state.userInfo = obj
    },
    SET_APP_Info(state, data) {
      state.appInfo = data
    },
    [RECHARGE_INFO](state, obj) {
      state.rechargeInfo = obj
    },
    [ROUTE_FROM](state, obj) {
      state.routeFrom = obj;
    },
    [SHOP_INFO](state, obj) {
      state.shopInfo = obj;
    },
    [DRAW_TYPE](state, obj) {
      state.drawType = obj;
    },
    [SKOR_NEED_INFO](state, obj) {
      state.skorNeedInfo = obj;
    },
  },
  actions: {
    changeUserInfo({
      commit
    }, obj) {
      commit(CHANGE_USERINFO, obj)
    },
    updateAppInfo({
      commit
    }, data) {
      commit('SET_APP_Info', data)
    },
    changeRechargeInfo({
      commit
    }, obj) {
      commit(RECHARGE_INFO, obj)
    },
    changeRouteFrom({
      commit
    }, obj) {
      commit(ROUTE_FROM, obj)
    },
    changeShopInfo({
      commit
    }, obj) {
      commit(SHOP_INFO, obj)
    },
    changeDrawType({
      commit
    }, obj) {
      commit(DRAW_TYPE, obj)
    },
    changeSkorNeedInfo({
      commit
    }, obj) {
      commit(SKOR_NEED_INFO, obj)
    },
  },
  modules: {
    business,
  }
});