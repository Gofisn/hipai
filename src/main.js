import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import md5 from 'js-md5';


// 移动端适配
import 'lib-flexible/flexible.js';

import '@/filters' // filters
import '@/permission' // permission

import * as native from 'utils/native'
import  'assets/css/global.less';
// Vue.prototype.$resultParams, Vue.prototype.$getSystemInfoFromApp
Object.keys(native).forEach(k => Vue.prototype[`$${k}`] = native[k])
Vue.prototype.$md5 = md5

import "utils/vant";  //vant 默认修改

// 手机调试控制台
// import Vconsole from 'vconsole';
// const vConsole = new Vconsole();
// Vue.use(vConsole)

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
