import Vue from "vue"
import router from './router'

import store from "./store"


router.beforeEach(async(to, from, next) => {

    var u = navigator.userAgent;
    var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
    var query = to.query;
    if (isiOS && query.Authorization) {
        var params = {};
        params.Authorization = query.Authorization;
        params.Source = query.Source;
        params.MobileModel = query.MobileModel;
        params.AppVersion = query.AppVersion;
        params.OS = 1;
        store.dispatch("updateAppInfo", params);
    }
    // console.log(to.path)
    Vue.prototype.$getSystemInfoFromApp('getH5Url', to.path, true)

    next();
})
router.afterEach(() => {})
