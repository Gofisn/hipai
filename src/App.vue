<template>
  <div id="app">
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive"></router-view>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive"></router-view>
  </div>
</template>
<script>
export default {
  name: "App",
  created() {
    //在页面加载时读取sessionStorage里的状态信息
    if (sessionStorage.getItem("store")) {
      this.$store.replaceState(
        Object.assign(
          {},
          this.$store.state,
          JSON.parse(sessionStorage.getItem("store")),
          { appInfo: this.$store.state.appInfo }
        )
      );
    }

    //在页面刷新时将vuex里的信息保存到sessionStorage里
    window.addEventListener("beforeunload", () => {
      sessionStorage.setItem("store", JSON.stringify(this.$store.state));
    });
    var u = navigator.userAgent;
    var isAndroid = u.indexOf("Android") > -1 || u.indexOf("Linux") > -1;
    //android终端或者uc浏览器
    var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
    let params = {};
    var flag;
    var myFunction;
    //ios终端
    if (isAndroid) {
      if (window.android && window.android.getAppHeader) {
        var data = JSON.parse(window.android.getAppHeader());
        params.Authorization = data.Authorization;
        params.Source = data.Source;
        params.MobileModel = data.MobileModel;
        params.AppVersion = data.AppVersion;
        params.OS = 0;
      }
    } else if (isiOS) {
      var query = this.getCookie();
      if (query.Authorization) {
        params.Authorization = query.Authorization;
        params.Source = query.Source;
        params.MobileModel = query.MobileModel;
        params.AppVersion = query.AppVersion;
        params.OS = 1;
      }

      document.body.addEventListener("focusin", () => {
        //软键盘弹起事件
        flag = true;
        clearTimeout(myFunction);
      });
      document.body.addEventListener("focusout", () => {
        //软键盘关闭事件
        flag = false;
        if (!flag) {
          myFunction = setTimeout(function() {
            window.scrollTo({ top: 0, left: 0, behavior: "smooth" }); //重点  =======当键盘收起的时候让页面回到原始位置(这里的top可以根据你们个人的需求改变，并不一定要回到页面顶部)
          }, 200);
        } else {
          return;
        }
      });
    }
    if (params.Authorization) {
      this.$store.dispatch("updateAppInfo", params);
    }
  },
  methods: {
    getCookie() {
      var obj = new Object();
      const arr = document.cookie.split(";");
      arr.forEach(item => {
        let sp = item.split("=");
        obj[sp[0].trim()] = sp[1];
      });
      return obj;
    }
  }
};
</script>

<style lang="less">
html,
body,
#app {
  width: 100vw;
  height: 100vh;
  margin: 0;
  padding: 0;
  font-family: "PingFang SC", "Microsoft YaHei", "SimSun";
  input {
    font-family: "PingFang SC", "Microsoft YaHei", "SimSun";
  }
}
</style>
