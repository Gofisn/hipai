const path = require('path');

function resolve (dir) {
  return path.join(__dirname, dir)
}

// const isProduction = process.env.NODE_ENV === 'production';
// const cdn = {
//   css: [],
//   js: [ 
//     'https://static01.hipaiapp.net/static/vueall.min.js',
//     'https://static01.hipaiapp.net/static/jsrsasign-plus-min.js'
//   ]
// }


module.exports = {
  assetsDir: "static",
  //axios域代理，解决axios跨域问题
  // publicPath: '',// 需要区分生产环境和开发环境
  lintOnSave:false, //去掉eslint代码检查
  devServer: {
    proxy: {
      '/': {
        target: 'http://idnhipai.jiajiahebao.com/', //设置你调用的接口域名和端口号 别忘了加http
        // target: process.env.NODE_ENV === 'development' ? 'http://192.168.81.101:8993': 'http://hipai.jiajiahebao.com/',
        changeOrigin: true,
        ws: false,
        pathRewrite: {
          '^/': '' //这里理解成用‘/api’代替target里面的地址，后面组件中我们掉接口时直接用api代替 比如我要调用'http://40.00.100.100:3002/user/add'，直接写‘/api/user/add’即可
        }
      }
    }
  },
  productionSourceMap: false,
  chainWebpack: config => {

    // alias
    config.resolve.alias
      .set('@', resolve('src'))
      .set('assets', resolve('src/assets'))
      .set('views', resolve('src/views'))
      .set('components', resolve('src/components'))
      .set('utils', resolve('src/utils'))

    // // 生产环境配置
    // if (isProduction) {
    //   // 生产环境注入cdn
    //   config.plugin('html')
    //     .tap(args => {
    //       args[0].cdn = cdn;
    //       return args;
    //     });

    //   // 移除 prefetch 插件
    //   config.plugins.delete('prefetch')
    //   // 移除 preload 插件
    //   config.plugins.delete('preload')
    // }
  },
  // configureWebpack: config => {
  //   if (isProduction) {
  //     // 用cdn方式引入
  //     config.externals = {
  //       'vue': 'Vue',
  //       'vuex': 'Vuex',
  //       'vue-router': 'VueRouter',
  //       'axios': 'axios',
  //       'jsrsasign': 'jsrsasign'
  //     }
  //   }
  // },
}
