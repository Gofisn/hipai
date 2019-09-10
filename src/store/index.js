import Vue from "vue";
import Vuex from "vuex";
import business from './modules/business';
export const CHANGE_USERINFO = 'CHANGE_USERINFO';
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    userInfo: {},
    appInfo: {},
  },
  mutations: {
    [CHANGE_USERINFO] (state, obj) {
      state.userInfo = obj
    },
    SET_APP_Info (state, data) {
      state.appInfo = data
    }
  },
  actions: {
    changeUserInfo ({ commit }, obj) {
      commit(CHANGE_USERINFO, obj)
    },
    updateAppInfo ({ commit }, data) {
      commit('SET_APP_Info', data)
    }
  },
  modules: {
    business,
  }
});
